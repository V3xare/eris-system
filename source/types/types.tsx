import React, { useReducer, useState, useEffect, useMemo, useContext, useRef } from "react";
import { Card, List, Icons, LangContext, Common, Cookie, Row, Icon, Button, useAsync, Input, Select, Number, Toggle, MultiSelect, Editable, VMath, useDelta, usePrevious, Column, Tooltip, Time, Space, Props } from "v-eris";
import { Ranges } from "./types.ranges";
import { ZoomParams } from "./types.zoom";
import { TypeTable } from "./types.table";
import { TypeTheme } from "./types.theme";

import "./types.scss"
import { StorageContext, useStorage } from "../utility/use.storage";
import { ParseWhere } from "./types.appendix";
import { Color, ColorPicker } from "./types.color";

export const TypeEnum = ( props: any ) => {

	let { 
		params,
		paramsOverride,
		icon,
		value,
		lang,
		inactive,
		extra,
		settings,
		secure,
		feedback,
		...rest 
	} = props;	

	if( !params )
		params = {};

	if( !extra )
		extra = {};

	let list = paramsOverride || props.params || [];

	if( !Array.isArray( list ) )
		list = [];

	useEffect(() => {

		if( !feedback )
			return;

		feedback( value === undefined && list[ 0 ] ? (list[ 0 ].token || list[ 0 ].value || "") : value, list );
	}, [ list ]);

	let secureList = settings && secure ? settings.getSecureValue( secure ) : null;

	if( secureList && secureList.list )
		secureList = secureList.list;
	else
		secureList = null;

	return (
		<Select 
			value={ value } 
			inactive={ inactive }
			icon={ icon }
			list={ (secureList || list).map(( item: any ) => {

				if( secureList )
					item = list.find(( f: any ) => f.value == item );

				if( item && (item.value || item.token || item.title) )
					item = { value: item.token || item.value || "", title: item.title || item.name || "", icon: item.icon };
				else
					item = { value: item || "", title: item || "" };

				item.title = lang.get( item.title );

				return { icon: item.icon || icon, value: item.value, title: item.title };
			})} 
			onChange={ props.onChange }
			{ ...extra }
		/>
	);
};
export const TypeSelectConfiguration = ( props: any ) => {
	const routeStorage = useContext( StorageContext );
	let paramsOverride = routeStorage.getValue( "configurations" ) || [];
	return <TypeEnum { ...props } paramsOverride={ paramsOverride }/>
};
export const TypeSelectRole = ( props: any ) => {
	const routeStorage = useContext( StorageContext );
	let paramsOverride = routeStorage.getValue( "roles" ) || [];
	let configurations = routeStorage.getValue( "configurations" ) || [];
	let params = props.params || {};
	let filter = params.filter;

	let where = useMemo(() => {
		return ParseWhere( filter, props.storage );
	}, [ filter, routeStorage.it, props.storage ? props.storage.it : 0 ]);

	if( where.configuration )
		paramsOverride = paramsOverride.filter(( f: any ) => f.configuration == where.configuration );

	for( let item of paramsOverride ){
		let configuration = configurations.find(( f: any ) => f.token == item.configuration );
		item.title = (configuration ? configuration.name : "default") + "." + item.name;
	};

	return <TypeEnum { ...props } paramsOverride={ paramsOverride }/>
};
export const TypeSelectPolicy = ( props: any ) => {
	const routeStorage = useContext( StorageContext );
	let paramsOverride = routeStorage.getValue( "policy" ) || [];
	return <TypeEnum { ...props } paramsOverride={ paramsOverride }/> 
};

export const TypeSelectTableQuery = ( props: any ) => {
	const routeStorage = useContext( StorageContext );
	let params = props.params || {};
	let filter = params.filter;
	let route = params.route || "";

	let where = useMemo(() => {
		return ParseWhere( filter, routeStorage );
	}, [ route, filter, routeStorage.it ]);

	let storage = useStorage({ 
		where: where,
		section: route, 
		current: false
	});

	useDelta(() => {

		if( filter && Object.keys( filter ).length && !Object.keys( where ).length )
			return;

		storage.async.list.fetch();
	}, [ route, where ], where );

	let paramsOverride = params.none ? [ { key: "", token: "none", name: "None" }, ...storage.list || [] ] : storage.list;
	
	return <TypeEnum { ...props } paramsOverride={ paramsOverride }/>
};
export const TypeButton = ( props: any ) => {

	let { 
		params,
		paramsOverride,
		value,
		lang,
		...rest 
	} = props;	

	if( !params )
		params = {};
	if( !paramsOverride )
		paramsOverride = {};

	return (
	<div className={ "settings-type-button" }>
		<Button onClick={( e: any ) => {
			if( paramsOverride.onChange )
				paramsOverride.onChange( e.event, props );
		}}>{ lang.get( params.title ) }</Button>
	</div>
	);
};
export const TypeText = ( props: any ) => {

	let { 
		params,
		value,
		lang,
		inactive,
		...rest 
	} = props;	

	if( !params )
		params = {};
	let conditions = Array.isArray( params.conditions ) ? 
		params.conditions.map(( item: any ) => { return { ...item, ["desc"]: lang.get( item.desc ) } }) 
		: 
		[];

	return (
	<div className={ "settings-type-text" }>
		<Input inactive={ inactive } { ...params } conditions={ conditions } onChange={( e: any ) => { props.onChange({ value: e.value }) }}>{ value === 0 ? "0" : value }</Input>
	</div>
	);
};
export const TypeJSON = ( props: any ) => {

	let { 
		params,
		value,
		lang,
		inactive,
		...rest 
	} = props;	

	if( !params )
		params = {};
	let conditions = Array.isArray( params.conditions ) ? 
		params.conditions.map(( item: any ) => { return { ...item, ["desc"]: lang.get( item.desc ) } }) 
		: 
		[];

	try{
		if( typeof value == "string" ){
			//let object = JSON.parse( value );
			//value = JSON.stringify( object, null, 3 );
		}else{
			value = JSON.stringify( value, null, 3 );
		};
	}catch( e ){
		value = typeof value == "string" ? value : "";
	};

	if( params.editable ){
		return (
		<Editable value={ value === 0 ? "0" : value } stretch={ params.stretch } conditions={ conditions } inactive={ inactive } onChange={( e: any ) => { props.onChange({ value: e.target.value }) }}/>
		);
	};

	return (
	<div className={ Props.className( "settings-type-code", { small: params.small } ) }>
			<div>{ value || "" }</div>
	</div>
	);
};
export const TypeTextarea = ( props: any ) => {

	let { 
		params,
		value,
		inactive,
		lang,
		...rest 
	} = props;	

	if( !params )
		params = {};
	let conditions = Array.isArray( params.conditions ) ? 
		params.conditions.map(( item: any ) => { return { ...item, ["desc"]: lang.get( item.desc ) } }) 
		: 
		[];

	return (
		<Editable value={ value === 0 ? "0" : value } inactive={ inactive } stretch={ params.stretch } conditions={ conditions } onChange={( e: any ) => { props.onChange({ value: e.target.value }) }}/>
	);
};

export const TypeBool = ( props: any ) => {

	let { 
		params,
		value,
		inactive,
		...rest 
	} = props;	

	return (
	<div className={ "settings-type-bool" }>
		<Toggle inactive={ inactive } value={ props.value } onChange={ props.onChange }/>
	</div>
	);
};
export const TypeCheckbox = ( props: any ) => {

	let { 
		params,
		value,
		inactive,
		...rest 
	} = props;	

	return (
	<div className={ "settings-type-checkbox" }>
		<input type="checkbox" checked={ value ? true : false } 
			onClick={( e ) => {
				e.stopPropagation();
			}}
			onChange={( e ) => { 

				if( !props.onChange )
					return;

				props.onChange({ value: e.target.checked });
			}}
		>
		</input>
	</div>
	);
};

export const TypeStacking = ( props: any, jsx: Function ) => {

	let { 
		stack,
		k,
		value,
		settings,
		pairs,
		...rest 
	} = props;	

	let refValue = settings ? settings.getValue( stack ) : undefined;
	let array: any[] = [];

	if( Common.type( refValue ) == "number" ){

		refValue = VMath.clamp( Common.uint( refValue ), 0, 999 );
		let override = settings.getOverride( k );

		if( !Array.isArray( value ) || !override )
			return array;

		for( let n = 0; n < refValue; n++ ){
			const newKey = k + ":" + n;
			array.push( jsx( newKey, n < value.length ? value[ n ] : (override[ 0 ].value[ 0 ]), n, undefined ) );
		};

		return array;
	}else if( Common.type( refValue ) == "array" ){

		let override = settings.getOverride( k );

		if( !Array.isArray( value ) || !override )
			return array;

		let refLength = refValue.length;

		for( let n = 0; n < refLength; n++ ){
			const newKey = k + ":" + n;

			if( pairs ){
				
				if( (n + 1) < refValue.length ){
					array.push( jsx( newKey, n < value.length ? value[ n ] : (override[ 0 ].value[ 0 ]), n, [ refValue[ n ], refValue[ n + 1 ] ] ) );
				}else{
					break;
				};

			}else{
				array.push( jsx( newKey, n < value.length ? value[ n ] : (override[ 0 ].value[ 0 ]), n, refValue[ n ] ) );
			};

		};

		return array;
	};

	return [ jsx( k, value, undefined ) ];
};

export const TypeNumber = ( props: any ) => {

	let { 
		params,
		value,
		stack,
		k,
		settings,
		inactive,
		...rest 
	} = props;	

	if( !params )
		params = {};

	return TypeStacking( props, ( key: string, value: any, index: number, arrayValue: any ) => 
	<div key={ key } className={ "settings-type-number" }>
		<Number inactive={ inactive } value={ value || 0 } min={ params.min } max={ params.max } step={ params.step } onChange={( e: any ) =>{ props.onChange( e, index ) }}/>
	</div>
	);
};

export const TypeFloat = ( props: any ) => {

	let { 
		params,
		value,
		stack,
		k,
		settings,
		inactive,
		...rest 
	} = props;	

	if( !params )
		params = {};

	return TypeStacking( props, ( key: string, value: any, index: number, arrayValue: any ) => 
	<div key={ key } className={ "float input" }>
		<input type={ "number" } disabled={ inactive } value={ value || 0 } min={ params.min } max={ params.max } onChange={( e ) =>{ props.onChange({ value: e.target.value }, index ) }}/>
	</div>
	);
};

export const TypeRanges = ( props: any ) => {

	let { 
		params,
		value,
		stack,
		k,
		settings,
		inactive,
		...rest 
	} = props;	

	if( !params )
		params = {};

	return TypeStacking( props, ( key: string, value: any, index: number, arrayValue: any ) => 
		<Ranges key={ key } inactive={ inactive } value={ value } { ...params } onChange={( e: any ) =>{ props.onChange( e, index ) }}/>
	);
};
export const TypeZoom = ( props: any ) => {

	let { 
		params,
		value,
		stack,
		k,
		settings,
		...rest 
	} = props;	

	if( !params )
		params = {};

	return <Column className={ "settings-type-list" }>{

		TypeStacking({ ...props, pairs: true }, ( key: string, value: any, index: number, arrayValue: any ) => 
			<ZoomParams key={ key } value={ value || [] } range={ arrayValue } onChange={( e: any ) =>{ props.onChange( e, index ) }}/>
		)

	}</Column>;
};

export const TypeList = ( props: any ) => {

	let { 
		params,
		value,
		lang,
		extra,
		settings,
		secure,		
		icon,
		...rest 
	} = props;	

	if( !params )
		params = {};
	if( !extra )
		extra = {};
	
	let secureList = settings && secure ? settings.getSecureValue( secure ) : null;

	if( secureList && secureList.list && Array.isArray( secureList.list ) )
		secureList = secureList.list;
	else
		secureList = null;

	let paramsList = props.params || [];

	if( secureList )
		paramsList = paramsList.filter(( item: any ) => secureList.findIndex(( f: any ) => f == item.value ) > -1 );

	return (
	<div className={ "settings-type-list" }>
		<MultiSelect 
			value={ extra.hasDefault || extra.sortable || (value && value.list) ? ((value ? value.list : value) || []) : (value || []) } 
			defaultValue={ extra.hasDefault ? (value ? value.defaultValue : null) : (null) } 
			sort={ extra.sortable || (value && value.sort) ? (value ? value.sort : null) : (null) } 
			prefix={ extra.prefix }
			suggestions={ paramsList.map(( item: any ) => {

				if( item && (item.value || item.token || item.title) )
					item = { value: item.token || item.value || "", title: item.title || item.name || "", prefix: item.prefix, icon: item.icon, defaultIgnored: item.defaultIgnored };
				else
					item = { value: item || "", title: item || "" };

				item.title = lang.get( item.title );
				item.prefix = lang.get( item.prefix );

				return { value: item.value, prefix: item.prefix, icon: icon || item.icon, title: item.title, defaultIgnored: item.defaultIgnored };
			})} 
			onChange={( event: any ) => { 
				props.onChange( extra.hasDefault || extra.sortable || (value && value.list) ? { value: { list: event.value, defaultValue: event.defaultValue, sort: event.sort } } : { value: event.value });
			}} { ...extra }></MultiSelect>
	</div>
	);
};
export const TypeListBinary = ( props: any ) => {

	let { 
		params,
		value,
		lang,
		...rest 
	} = props;	

	if( !params )
		params = {};

	let val: any[] = [];
	value = Common.uint( value );
	
	for( const item of props.params ){

		if( (value & item.value) != item.value )
			continue;

		val.push( item.value );
	};

	return (
	<div className={ "settings-type-list" }>
		<MultiSelect value={ val } suggestions={( props.params || []).map(( item: any ) => {

			if( item && (item.value || item.token || item.title) )
				item = { value: item.token || item.value || "", title: item.title || item.name || "" };
			else
				item = { value: item || "", title: item || "" };

			item.title = lang.get( item.title );

			return { value: item.value, title: item.title };
		})} onChange={( e: any ) => {

			let result = 0;

			for( let item of e.value ){
				result |= item;
			};

			props.onChange({ ...e, value: result });
		}}></MultiSelect>
	</div>
	);
};

export const TypeFile = ( props: any ) => {
	let multiple = props.params ? props.params.multiple : undefined;

	let ref = useRef<HTMLInputElement>( null );
	let prev = usePrevious( props.value );
	let [ searchData, setSearchData ] = useState<any[]>([]);

	useEffect(() => {

		if( !ref.current )
			return;

		if( prev && !props.value ){
			ref.current.value = "";
			list.fetch();
		};

	}, [ props.value ]);

	const list = useAsync({
		method: "GET",
		url: "./filesystem/search/"
	}, { 
		module: props.route,
		field: props.k,
		line: props.token,
		groupBy: 0
	});
	list.onResponse(( response: any ) => {

		if( !response.data || !response.data || !response.data.length )
			return;

		let files: any[] = [];

		for( let link of response.data ){

			if( !link.list )
				continue;

			files.push( ...link.list );
		};

		setSearchData( files );
	});	
	useEffect(() => {
		list.fetch();
	}, [ props.route, props.k, props.token ]);	

	return (
	<Tooltip className={ "type-file-tooltip" } content={ 
		<div>
			<div>Files: { searchData.length }</div>
			<div>{
				searchData.map(( file: any ) => {
					return (
					<Card key={ file.token } className={ "type-file-tooltip-card" }>
						<Row>Name: { file.name }</Row>
						<Row>Type: { file.mime }</Row>
						<Row>Date: { new Date( Common.float( file.date ) * 1000 ).toUTCString() }</Row>
						<Row>User:<Space/>
							{ <TypeSelectTableQuery inactive lang={ props.lang } params={{ route: "users", filter: { token: file.user_token } }}/> }
						</Row>
						<Row>User Configuration:<Space/>
							{ <TypeSelectTableQuery inactive lang={ props.lang } params={{ route: "configurations", filter: { token: file.user_configuration } }}/> }
						</Row>
					</Card>
					)
				})
			}</div> 
		</div>
	}>
		<input type="file" ref={ ref } multiple={ multiple } onChange={( e ) => props.onChange({ value: e.target.files }) }/>
	</Tooltip>
	);
};

export const TypeNone = () => {
	return <span></span>;
};

export const Types = {
	enum: <TypeEnum/>,
	theme: <TypeTheme/>,
	select: <TypeEnum/>,
	text: <TypeText/>,
	textarea: <TypeTextarea/>,
	number: <TypeNumber/>,
	float: <TypeFloat/>,
	ranges: <TypeRanges/>,
	zoom: <TypeZoom/>,
	bool: <TypeBool/>,
	toggle: <TypeBool/>,
	list: <TypeList/>,
	listbinary: <TypeListBinary/>,
	button: <TypeButton/>,
	table: <TypeTable/>,
	checkbox: <TypeCheckbox/>,
	configuration: <TypeSelectConfiguration/>,
	role: <TypeSelectRole/>,
	policy: <TypeSelectPolicy/>,
	querytable: <TypeSelectTableQuery/>,
	json: <TypeJSON/>,
	file: <TypeFile/>,
	none: <TypeNone/>,
};
