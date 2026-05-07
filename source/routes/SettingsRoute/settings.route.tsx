import React, { useReducer, useState, useEffect, useMemo, useContext, useRef } from "react";
import { Card, List, Icons, LangContext, Common, Cookie, Row, Icon, Button, useAsync, Column, Select, Space, Props, Tooltip, Toggle, Text, LangContextType } from "v-eris";
import { ContentMenu } from "../../placeholders/ContentMenu/content.menu";
import { ContentContainer } from "../../placeholders/ContentContainer/content.container";
import { SettingsParamToKey, SettingsParamToKey3, useSettings } from "../../utility/use.settings";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link, NavigateFunction, Location } from "react-router-dom";
import { BuildContext, BuildContextType, BuildRoute, BuildSectionItem, BuildTableItem } from "../../components/Build/build";

export const SettingsRoute = () => {

	const lang: LangContextType = useContext( LangContext );
	const qsRef = useRef({});
	const isSelf = useRef( false );
	const [ altered, setAltered ] = useState( false );
	const build: BuildContextType = useContext( BuildContext );
	const route: BuildRoute = build.routes[ "settings" ];
	const qs = build.query;

	let alterListener = ( e: any ) => {

		if( e.key != "Control" )
			return;

		e.preventDefault();
			
		setAltered( e.type == "keydown" ? true : false );

	};

	useEffect(() => {
		document.addEventListener( "keydown", alterListener );
		document.addEventListener( "keyup", alterListener );
		return () => {
			document.removeEventListener( "keydown", alterListener );
			document.removeEventListener( "keyup", alterListener );
		};
	}, []);

	qs.section = Common.string( qs.section || "" );
	qs.item = Common.string( qs.item || "" );
	qs.type = Common.string( qs.type || "" );
	qs.token = Common.string( qs.token || "" );

	if( !route.sections[ Common.string( qs.section ) ] )
		qs.section = route.list[ 0 ] ? route.list[ 0 ].key : "";
	
	const section: string = qs.section as string;
	const sectionItem = route.sections[ section ] || {};
	let sectionTable: BuildTableItem[] | null = route.table[ qs.item ];

	if( sectionTable && isSelf.current ){

		let length = 0;

		for( let item of sectionTable ){
			let keySection = SettingsParamToKey3( qs.item as string, item.key );
			let visibleSection = build.settings.getExclusionValue( keySection );

			if( !visibleSection )
				continue;

			length++;
		};

		if( !length )
			sectionTable = null;

	};

	if( !sectionTable ){
		qs.item = sectionItem.list && sectionItem.list[ 0 ] ? sectionItem.list[ 0 ].key : "";	
		sectionTable = route.table[ qs.item ] || [];
	};

	qsRef.current = qs;

	let settingsInheritance = useSettings({ 
		token: qs.token || "users:self", 
		table: build.settingsTable,
		connectionless: true,
	});

	let preparedTypes = useMemo(() => {

		let array: any = [];
		let icons: any = {
			"configurations": <Icons.key/>,
			"roles": <Icons.users/>,
			"users": <Icons.user/>,
		};

		for( let stack of settingsInheritance.inheritanceStack ){
			array.push({ 
				token: stack.type + ":" + stack.token, 
				k: stack.token,
				name: stack.name, 
				icon: icons[ stack.type ]
			});
		};

		if( settingsInheritance.inheritanceStack.length )
			isSelf.current = !qs.token || qs.token == "self" ? true : settingsInheritance.isSelf();
		
		if( isSelf.current )
			array = array.length > 0 ? [ array[ array.length - 1 ] ] : [];

		return array;
	}, [ settingsInheritance.iteration, build.settings.iteration ]); 

	let typeNeedle = preparedTypes.find(( f ) => f.token == qs.type );
	let type = typeNeedle ? typeNeedle.token : (preparedTypes.length ? preparedTypes[ preparedTypes.length - 1 ].token : "");

	let settings = useSettings({ 
		token: isSelf.current ? "users:self" : type, 
		table: build.settingsTable,
		connectionless: true,
		replicate: isSelf.current ? [ build.settings ] : null
	});

	let contentList = useMemo(() => {

		return sectionTable.map(( item: any ) => {
			let keySection = SettingsParamToKey3( qs.item as string, item.key );
			let overrideSection = settings.getExclusionOverride( keySection );
			let visibleSection = settings.getExclusionValue( keySection );
			//console.log( keySection, visibleSection, settings );
			return (<Card className={ "eris-line" + (isSelf.current && !visibleSection ? " hidden" : "") } key={ item.key } header={ 
				<div>
					{ item.icon }<Space/>{ lang.get( item.title ) }

					<span className={ "eris-line-toggle" + (isSelf.current ? " hidden" : "") }>
						<span className={ Props.className( "eris-parameter-changed", { active: settings.isExclusionChanged( keySection ) } ) }></span>
						<span className={ Props.className( "eris-parameter-revert", { active: settings.isExclusionChanged( keySection ) } ) } onClick={() => {
							settings.revertExclusion( keySection );
						}}>{ lang.get( "Settings::Revert" ) }</span>
						<Space/>			
						<Icons.redo 
							transition 
							className={ 
								Props.className( "eris-parameter-clear", { 
									active: !settings.isExclusionCleared( keySection ) && settings.isExclusionOverride( keySection ) && overrideSection.length > 1 
								}) 
							}
							onClick={() => settings.clearExclusionOverride( keySection ) }
						/>								
						<Space/>				

						<Tooltip content={
							overrideSection.map(( item ) => 
								<div key={ item.token }>
									<span>{ lang.get( item.name ) } </span>
									{ 
										item.token == "default" ? lang.get( "Settings::HasValue" ) : lang.get( "Settings::OverrideValueSimple" ) 
									}
									{ 
										<Toggle value={ item.value }/>
									}
								</div>
							)
						}>
							<Toggle 
								value={ visibleSection } 
								onChange={( e: any ) => { 
									settings.changeExclusion( keySection, e.value ); 
								}}
							/>						
						</Tooltip>
						
					</span>

				</div> 
			}>{

				item.list.map(( parameter ) => {
					let key = SettingsParamToKey( qs.item as string, item.key, parameter.key );
					let override = settings.getOverride( key );
					let stringify = "";
					try{ stringify = JSON.stringify( settings.getSecureValue( key ), null, " " ) }catch( e ){ stringify = ""; };
			
					if( parameter.bindless )
						return null;

					return <Card key={ key } header={ 
						<div>							
							{ lang.get( parameter.title ) }
							<span className={ Props.className( "eris-parameter-changed", { active: settings.isChanged( key ) } ) }></span>
							<span className={ Props.className( "eris-parameter-revert", { active: settings.isChanged( key ) } ) } onClick={() => {
								settings.revert( key );
							}}>{ lang.get( "Settings::Revert" ) }</span>
							<Tooltip content={
								override.map(( item ) => 
									<div key={ key + ":" + item.name }>
										<span>{ lang.get( item.name ) } </span> 
										{ 
											item.token == "default" ? lang.get( "Settings::HasValue" ) : lang.get( "Settings::OverrideValueSimple" ) 
										} 
										<div>
										{ 
											React.cloneElement( build.types[ item.type ], { 
												value: item.valueSecure, 
												k: key, 
												params: item.params, 
												lang: lang, 
												stack: item.stack, 
												extra: parameter.extra, 
												secure: parameter.secure, 
												settings: settings 
											}) 
										}
										</div>
									</div>
								)
							}>
								<span className={ Props.className( "eris-parameter-override", {  } ) }>{ 
									settings.isInherit( key ) ? 
										lang.get( "Settings::InheritFrom", [ (settings.isCleared( key ) && override.length > 1 ? override[ override.length - 2 ].name : override[ override.length - 1 ].name) ]) 
										: 
										(settings.isOverride( key ) && override.length > 1 ? lang.get( "Settings::IsOverriding", [ override[ override.length - 2 ].name ]) : "") 
								}</span>		
							</Tooltip>
							<Space/>
							<Tooltip content={ lang.get( "Settings::ClearOverride" ) }>
								<Icons.redo 
									transition 
									className={ Props.className( "eris-parameter-clear", { 
										active: !settings.isCleared( key ) && settings.isOverride( key ) && override.length > 1 
									} ) }
									onClick={() => settings.clearOverride( key ) }
								/>
							</Tooltip>						
							<Space/>
							<span className={ altered ? "" : "hidden" }>{ key + " " + stringify }</span>
						</div>
					}>{
						<Column className={ Props.className( "eris-parameter", { booltype: parameter.type == "bool" } ) }>
							<Row>{ lang.get( parameter.desc ) }</Row>
							<Row>{ React.cloneElement( build.types[ parameter.type ], { 
								params: parameter.params, 
								k: key,
								value: settings.getSecureValue( key ), 
								lang: lang,
								icon: parameter.icon,
								stack: parameter.stack, 
								extra: parameter.extra, 
								secure: parameter.secure, 
								settings: settings,
								onChange: ( e, keyIndex ) => {
									settings.change( key, e.value, keyIndex );
								} 
							} ) }
								<span>
									<Space/>
									{ settings.autoCorrected( key ) ? lang.get( "Settings::AutoCorrected", [ settings.autoCorrected( key ) ] ) : null }
								</span>
							</Row>
						</Column>
					}</Card>
				})

			}</Card>)
		});
	}, [ qs.section, qs.item, settings.iteration, altered, lang.current ]);

	const isLive = false;
	let liveContent = useMemo(() => {

		if( !isLive )
			return null;

		return React.cloneElement( <div></div>, { 
			settings: settings
		});
	}, [ isLive, settings.iteration ]);

	const treeList = useMemo(() => {

		return route.list.map(( item ) => {

			if( !item.list )
				return;

			let length: number = 0;

			return (
				<List.Item icon={ item.icon } key={ item.key } title={ lang.get( item.title ) }>{
					item.list.map(( data ) => {
						let sectionTable: BuildTableItem[] = route.table[ data.key ];

						if( !sectionTable )
							return;

						length = 0;

						for( let item of sectionTable ){
							let keySection = SettingsParamToKey3( data.key as string, item.key );
							let visibleSection = settings.getExclusionValue( keySection );

							if( !visibleSection )
								continue;

							length++;
						};

						if( !length && isSelf.current )
							return null;

						return <List.Item icon={ data.icon } title={ lang.get( data.title ) } key={ data.key } value={ build.buildQuery({ section: item.key, item: data.key }) }>{ "" }</List.Item>
					})
				}</List.Item>
			);
		})
	}, [ route.table, route.list, build.currentLang, settings.iteration ]);

	return (
	<div className={ "eris-content eris-content-selector" }>
		<ContentMenu>
			<List value={ build.buildQuery( { section: qs.section, item: qs.item } ) } onChange={( event ) => {
					build.setQueryString( event.value );
				}} padding={[ 3, 6, 3, 8 ]}>
				{ treeList }
			</List>
		</ContentMenu>
		<ContentContainer>
			<div className={ "eris-content-header" }>
				<span>
					<Button onClick={() => {

						if( isSelf.current ){
							build.setQueryString( "/" );
							return;
						};

						let temp = Common.string( qs.token );
						let split = temp.split( ":" );
						let route = split[ 0 ];
						route = String( route ).charAt( 0 ).toUpperCase() + String( route ).slice( 1 );
						let token = split[ 1 ];
						let string = "/admin?section=" + route;

						if( qs.filter )
							string += "&filter=" + qs.filter;

						build.setQueryString( string );
					}}>{ "Back" }</Button>
					<Space/>		
					<Space/>		
					<Space/>		
					<Space/>		
					<Space/>		
					<Select
						className={ isSelf.current ? "hidden" : "" }
						stretch headerless row style={{ maxWidth: 400 }}
						value={ type } 
						list={ (preparedTypes).map(( item ) => {
							return { icon: item.icon, value: item.token, title: item.name };
						})} 
						onChange={( e: any ) => {
							build.setQuery({ type: e.value } );
						}}
					/>					
				</span>
				<div style={{ float: "right" }}>
					<Button className={ (qs.type == "user" && !self ? "" : " hidden") } onClick={() => {
//						let needle = storage.list.find(( f ) => f.token == storage.getToken() );
//
//						if( !needle )
//							return;
//						window.localStorage.setItem( "RoleMirror", needle.token );
//						window.localStorage.setItem( "RoleMirrorName", needle.title );
					}}>{ lang.get( "Settings::Mirror" ) }</Button>
					<Space/>
					<Button onClick={() => {
						settings.save();
					}}>{ lang.get( "Settings::Save" ) }</Button>
				</div>
			</div>
			<div className={ "eris-content-wrap" }>
				{ isLive ? 
					(
					<div className={ "eris-content-live" }>
							<div className={ "eris-content-live-params" }>{ contentList }</div>
							<div className={ "eris-content-live-result" }>
								{ liveContent }
							</div>
					</div>
					) 
					: 
					contentList 
				}
			</div>
		</ContentContainer>
	</div>
	);

	return <div></div>
};
