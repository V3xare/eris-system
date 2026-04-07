import React, { JSX, useContext, useEffect, useMemo } from "react";
import { LangContext, Lang, LangContextType } from "v-eris";

import "../../../assets/styles/themes.scss"
import "../../../assets/styles/eris.scss"
import "../../../assets/styles/core.scss"
import "../../../assets/styles/components.scss"

import { AuthContext, AuthContextType } from "../Auth/auth";
import { useSettings, SettingsInitType } from "../../utility/use.settings";

export interface BuildTableItem{
	key: string, 
	title?: string, 
	icon?: JSX.Element,
	list?: BuildTableItem[]
};
export interface BuildTable{
	[key: string]: BuildTableItem[]
};

export interface BuildLang{
	[key: string]: string
};
export interface BuildTypes{
	[key: string]: React.JSX.Element
};


export interface BuildSectionItem{ 
	title: string, 
	key: string, 
	route?: string, 
	global?: boolean, 
	icon?: JSX.Element
	list?: BuildSectionItem[]
};
export interface BuildSection{
	[key: string]: BuildSectionItem
};


export interface BuildRoute{
	pathname?: string,
	icon?: any, 
	hidden?: boolean, 
	access: number, 
	title?: any,
	element?: any,
	sections: BuildSection,
	list: BuildSectionItem[],
	table: BuildTable,
};
export interface BuildRouteSimple{
	pathname?: string,
	icon?: any, 
	hidden?: boolean, 
	access: number, 
	title?: any,
	element?: any,
	list?: BuildSectionItem[],
	table?: BuildTable,
};

const BuildContextDefault = {
	routes: {} as { [pathname: string]: BuildRoute },
	settings: {} as SettingsInitType,
	settingsTable: {} as BuildTable,
	currentLang: "",
	currentTheme: "",	
	route: "",
	types: {} as { [typeName: string]: JSX.Element }, 
	denyAccess: false,
};
export type BuildContextType = typeof BuildContextDefault; 
export const BuildContext = React.createContext( BuildContextDefault );

const ParseSectionInside = ( item: BuildSectionItem, sections: BuildSection ) => {

	sections[ item.key ] = item;

	if( !item.list )
		return;

	for( const inside of (item.list || []) ){
		ParseSectionInside( inside, sections );
	};	

};


export class BuildCommands{
	static joinLang( table: BuildLang, append: BuildLang ) : BuildLang{
		let result: any = { ...table, ...append };
		return result;
	};		
	static joinTypes( table: BuildTypes, append: BuildTypes ) : BuildTypes{
		let result: any = { ...table, ...append };
		return result;
	};		
	static joinTable( table: BuildTable | any, append: BuildTable | any ) : BuildTable{
		
		let result: any = { ...table };

		for( let key in append ){

			if( !result[ key ] )
				result[ key ] = append[ key ];
			else{
				let array: BuildTableItem[] = result[ key ].list;
				result[ key ] = append[ key ];
				result[ key ].list = array && append[ key ].list ? [ ...array, ...append[ key ].list ] : append[ key ].list;
			}

		};

		return result;
	};
	static joinList( table: BuildSectionItem[] | any, append: BuildSectionItem[] | any ) : BuildSectionItem[]{
		
		let result: BuildSectionItem[] = [];

		for( let item of table ){
			result.push({ ...item });
		};

		for( let item of append ){

			let needleIndex = result.findIndex(( f: any ) => f.key == item.key );

			if( needleIndex < 0 ){
				result.push( item );
				continue;
			};

			if( result[ needleIndex ].list && item.list )
				result[ needleIndex ].list = [ ...result[ needleIndex ].list, ...item.list ];
			else
				result[ needleIndex ].list = item.list;

			for( let key in item ){

				if( key == "list" )
					continue;

				result[ needleIndex ][ key ] = item[ key ];
			};	

		};

		return result;
	};	
};

export const BuildInside = ( 
	props: { 
		currentLang?: string, 
		currentTheme?: string, 
		languages?: { [langName: string]: {[key: string]: string} }, 
		settingsTable: BuildTable,
		routes?: { [routePath: string]: BuildRouteSimple }, 
		types?: { [typeName: string]: JSX.Element }, 
		children?: any 
	} 
) => {
	const { children, languages, currentLang, routes, types } = props;
	const lang: LangContextType = useContext( LangContext );
	const auth: AuthContextType = useContext( AuthContext );
	const userToken = window.localStorage.getItem( "RoleMirror" ) || "self";
	const settings = useSettings({ 
		token: "users:" + userToken,
		access: auth.access,
		table: props.settingsTable,
		user: auth.token 
	});

	let selectedLang = (currentLang ? currentLang : settings.getSecureValue( "General:Language:CurrentLanguage" )) || "en";
	const currentTheme = (props.currentTheme ? props.currentTheme : settings.getSecureValue( "General:Theme:CurrentTheme" )) || "white";

	useEffect(() => {

		lang.dispatch([ "add", "en", {} ]);

		for( const langName in languages ){
			lang.dispatch([ "add", langName, languages[ langName ] ]);
		};

	}, [ languages ]);

	useEffect(() => {
   		lang.dispatch([ "select", selectedLang ]);
	}, [ selectedLang ]);	
	
	useEffect(() => {
   		document.body.dataset.theme = currentTheme;
	}, [ currentTheme ]);

	let pathname = location.pathname;

	if( pathname && pathname[ 0 ] == "/" )
		pathname = pathname.substring( 1 );

	let firstRoute = "";
	let newRoutes: { [pathname: string]: BuildRoute } = {};

	if( routes ){

		for( let key in routes ){

			if( !firstRoute )
				firstRoute = key;

			let sections: BuildSection = {};

			for( const item of (routes[ key ].list || []) ){
				ParseSectionInside( item, sections );
			};

			newRoutes[ key ] = {
				...routes[ key ],
				sections: sections,
				table: routes[ key ].table || {},
				list: routes[ key ].list || [],
			};

		};

		if( !newRoutes[ "" ] && newRoutes[ firstRoute ] )
			newRoutes[ "" ] = { ...newRoutes[ firstRoute ], hidden: true };

	};

	let route: string = routes && routes[ pathname ] ? pathname : firstRoute;
	let deny = false;

	if( routes && routes[ route ] && (routes[ route ] as any).access > auth.access )
		deny = true;

	return <BuildContext.Provider value={{ 
		routes: newRoutes, 
		currentLang: lang.current, 
		currentTheme: currentTheme, 
		route: route, 
		settings: settings, 
		settingsTable: props.settingsTable, 
		denyAccess: deny, 
		types: types || {} 
	}}>{ children }</BuildContext.Provider>
};
export const Build = ( 
	props: { 
		currentLang?: string, 
		currentTheme?: string, 
		modules: any[], 
		settingsTable: BuildTable,
		routes: { [routePath: string]: BuildRouteSimple }, 
		languages: { [langName: string]: {[key: string]: string} }, 
		types: { [typeName: string]: JSX.Element }, 
		children?: any 
	} 
) => {
	
	const { modules, children, languages, currentLang, settingsTable, routes, types } = props;

	const providersDefault = ( inside: any ) => {
		return <Lang>{ inside }</Lang>
	};

	const providers = (( inside: any ) => {

		let n = modules.length - 1;
		let list: any = providersDefault( <div className={ "eris eris-container" }>{ inside }</div> );

		for( ; n > -1; n-- ){
			const { context, ...r } = modules[ n ]();
			list = <context.Provider value={ r }>{ list }</context.Provider>;
		};

		return list;
	});

	return (
	<>
	{
		providers(<BuildInside currentLang={ currentLang } currentTheme={ props.currentTheme } settingsTable={ settingsTable } languages={ languages } routes={ routes } types={ types }>{ children }</BuildInside>)
	}
	</>
	);
};

export const BuildModules = (
	props: { 
		modules: any[], 
		children?: any 
	} 
) => {
	
	const { modules, children } = props;

	const providers = (( inside: any ) => {

		let n = modules.length - 1;
		let list: any = <>{ inside }</>;

		for( ; n > -1; n-- ){
			const { context, ...r } = modules[ n ]();
			list = <context.Provider value={ r }>{ list }</context.Provider>;
		};

		return list;
	});

	return (
	<>
	{
		providers( children )
	}
	</>
	);
};
