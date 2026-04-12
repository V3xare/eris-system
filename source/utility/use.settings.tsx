import React, { useReducer, useState, useEffect, useMemo, useContext, useRef } from "react";
import { Card, List, Icons, LangContext, Common, Request, useAsync, RequestInit, VMath } from "v-eris";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import QueryString from "qs";

import { NotificationsContext } from "../components/Notifications/notifications";
import { Socket } from "./socket";
import { Channels, Channel } from "./channel";

const SettingsGetValue = ( table: any, changed: any, key: string ) => {

	if( changed[ key ] === null ){ //force inherit
		return table[ key ] && table[ key ].override.length > 1 ? 
			(table[ key ].override[ table[ key ].override.length - 2 ].value) 
			: 
			(table[ key ] ? table[ key ].value : undefined);
	};

	return changed[ key ] === undefined ? (table[ key ] ? table[ key ].value : undefined) : changed[ key ];	
};
const SettingsGetSecureValue = ( table: any, changed: any, key: string ) => {

	if( changed[ key ] === null ){ //force inherit
		return table[ key ] && table[ key ].override.length > 1 ? 
			(table[ key ].override[ table[ key ].override.length - 2 ].valueSecure) 
			: 
			(table[ key ] ? table[ key ].valueSecure : undefined);
	};

	if( changed[ key ] === undefined )
		return table[ key ] ? table[ key ].valueSecure : undefined;

	if( table[ key ].query ){
		return { ...table[ key ].valueSecure, [ "table" ]: changed[ key ] };
	};

	return changed[ key ];	
};
const SettingsGetExclusionValue = ( table: any, changed: any, key: string ) => {

	if( changed[ key ] === null ){ //force inherit
		return table[ key ] && table[ key ].override.length > 1 ? 
			(table[ key ].override[ table[ key ].override.length - 2 ].value) 
			: 
			(table[ key ] ? table[ key ].value : undefined);
	};

	return changed[ key ] === undefined ? (table[ key ] ? table[ key ].value : undefined) : changed[ key ];	
};
const SettingsSetValue = ( it: number, table: any, systemData: any, changed: any, key: string, value: any, keyIndex?: number ) => {

	if( value === undefined ){
		delete changed[ key ];
	}else if( table[ key ].stack ){

		if( value === null ){
			changed[ key ] = value;
		}else{

			let refValue = SettingsGetValue( table, changed, table[ key ].stack );
			let type = Common.type( refValue );

			if( type == "number" ){
				refValue = VMath.clamp( Common.uint( refValue ), 0, 255 );
			}else if( type == "array" ){
				refValue = refValue.length;
			}else{
				refValue = 0;
			};

			let object = keyIndex === undefined ? 
				(changed[ key ] ? 
					{ ...table[ key ].value, ...changed[ key ] } 
					:
					{ ...table[ key ].value }
				) 
				: 
				(changed[ key ] ? 
					{ ...table[ key ].value, ...changed[ key ], [ Common.uint( keyIndex ) ]: value } 
					:
					{ ...table[ key ].value, [ Common.uint( keyIndex ) ]: value }
				);

			changed[ key ] = [];

			for( let n = 0; n < refValue; n++ ){
				changed[ key ].push( object[ n ] === undefined ? table[ key ].systemValue : object[ n ] );
			};

		};

	}else{
		changed[ key ] = value;	
	};

	if( table[ key ].secureCrossRef ){
		let crossRef = table[ table[ key ].secureCrossRef ];
		
		if( crossRef ){
			SettingsCheckValue( 
				crossRef.key, 
				SettingsGetValue( table, changed, crossRef.key ),
				table, systemData,
				SettingsGetValue( table, changed, key )
			);
		};

	};

	if( it > 50 )
		return;

	let refs: any = [];

	for( let k in table ){

		if( table[ k ].stack != key )
			continue;

		refs.push( table[ k ].key );
	};

	for( let refKey of refs ){
		SettingsSetValue( it + 1, table, systemData, changed, refKey, table[ refKey ].value, undefined );
	};

};

const SettingsCheckValueInherit = ( key: string, value: any, table: any, systemData: any, crossRefValue?: any ) => {

	if( !systemData.value[ key ].secure )
		return;

	let secureRef = table[ systemData.value[ key ].secure ];

	if( !secureRef ){
		table[ key ].valueSecure = value;
		return;
	};

	let ref = [];
	let defaultValue = "";

	if( crossRefValue !== undefined ){
		secureRef = { valueSecure: crossRefValue };
	};

	//console.log( 444, key, crossRefValue );

	if( Array.isArray( secureRef.valueSecure ) ){
		ref = secureRef.valueSecure;
	}else if( secureRef.valueSecure && Array.isArray( secureRef.valueSecure.list ) ){
		ref = secureRef.valueSecure.list;
		defaultValue = secureRef.valueSecure.defaultValue;
	};

	let isSubArray = value && Array.isArray( value.list );

	if( Array.isArray( value ) || isSubArray ){

		let list = isSubArray ? value.list : value;
		table[ key ].valueSecure = isSubArray ? { list: [], defaultValue: value.defaultValue, sort: value.sort } : [];

		for( const item of list ){

			if( ref.findIndex(( f: any ) => f.key ? (f.key == item) : (f == item) ) < 0 ){
				//table[ key ].autoCorrected
				continue;
			};

//			if( ref.indexOf( item ) < 0 ){
//				//table[ key ].autoCorrected
//				continue;
//			};

			if( isSubArray )
				table[ key ].valueSecure.list.push( item );
			else
				table[ key ].valueSecure.push( item );

		};

	}else{		

		if( ref.findIndex(( f: any ) => f == value ) < 0 ){
			table[ key ].valueSecure = defaultValue && ref.findIndex(( f: any ) => f == defaultValue ) > -1 ? defaultValue : ref[ 0 ];
			table[ key ].autoCorrected = value;
		}else{
			table[ key ].autoCorrected = null;
		};

	};

};
const SettingsCheckValue = ( key: string, value: any, table: any, systemData: any, crossRefValue?: any ) => {
//table[ key ].valueSecure = value;	
//return;
	//#Check if arrayValue still exist in system array
	//console.log( 333, key );

	if( systemData.value[ key ].query ){

		//if( !systemData.value[ key ].secure ){

			table[ key ].valueSecure = { list: [], table: {}, ref: {} };

			if( !Array.isArray( table[ key ].query ) )
				return;

			let secureRef = systemData.value[ key ].secure && table[ systemData.value[ key ].secure ] ? table[ systemData.value[ key ].secure ] : null;

			if( secureRef && secureRef.valueSecure )
				secureRef = secureRef.valueSecure.table ? { ...secureRef.valueSecure.table } : [ ...secureRef.valueSecure.list ];
			else 
				secureRef = null;

			let isArray = secureRef && Array.isArray( secureRef );
			let index = -1;

			for( let query of table[ key ].query ){
			
				index++;
				let r = { ...query };
				r.key = r.token;
				let config = {};

				//console.log( key, value, query.token, secureRef );

				if( value[ query.token ] && typeof value[ query.token ] == "object" ){
					config = { ...value[ query.token ] };
				}else if( table[ key ].systemValue && typeof table[ key ].systemValue == "object" ){
					config = { ...table[ key ].systemValue };
				}else{
					config = {};
				};

				if( secureRef ){
					table[ key ].valueSecure.ref[ query.token ] = (isArray ? secureRef[ index ] : secureRef[ query.token ]);
				};

				table[ key ].valueSecure.table[ query.token ] = config;
				table[ key ].valueSecure.list.push( r );
			};

		//};

		return;
	};

	if( Array.isArray( systemData.value[ key ].params ) ){

		if( Array.isArray( value ) ){

			table[ key ].valueSecure = [];

			for( const item of value ){

				if( systemData.value[ key ].params.findIndex(( f: any ) => f.value == item ) < 0 )
					continue;

				table[ key ].valueSecure.push( item );
			};

		}else if( Common.type( value ) == "object" && value.list ){

			table[ key ].valueSecure = { list: [], defaultValue: value.defaultValue, sort: value.sort };

			for( const item of value.list ){

				if( systemData.value[ key ].params.findIndex(( f: any ) => f.value == item ) < 0 )
					continue;

				table[ key ].valueSecure.list.push( item );
			};

			if( systemData.value[ key ].extra && systemData.value[ key ].extra.hasDefault && table[ key ].valueSecure.list.findIndex(( f: any ) => f == table[ key ].valueSecure.defaultValue ) < 0 ){
				table[ key ].valueSecure.defaultValue = table[ key ].valueSecure.list[ 0 ];
				table[ key ].autoCorrected = value;
			}else{
				table[ key ].autoCorrected = null;
			};

			SettingsCheckValueInherit( key, value, table, systemData, crossRefValue );

		}else{

			if( systemData.value[ key ].params.findIndex(( f: any ) => f.value == value ) < 0 ){
				table[ key ].valueSecure = systemData.value[ key ].params[ 0 ] ? systemData.value[ key ].params[ 0 ].value : "";
				table[ key ].autoCorrected = value;
			}else{
				table[ key ].valueSecure = value;
				table[ key ].autoCorrected = null;
			};

			SettingsCheckValueInherit( key, value, table, systemData, crossRefValue );

		};

	}else{
		table[ key ].valueSecure = value;
	};

};

const SettingsStacking = ( table: any, defaultData: any, systemData: any, key: string, queries: any ) => {

	let value;
	let isSystem = true;

	if( systemData.value[ key ].bindless ){
		value = systemData.value[ key ].value;
	}else{

		if( defaultData && defaultData.value && defaultData.value[ key ] !== undefined ){
			isSystem = false;
			value = defaultData.value[ key ];
		}else{
			value = systemData.value[ key ].value;
		};

	};

	table[ key ] = {
		value: value, 
		valueSecure: null, 
		key: key,
		stack: systemData.value[ key ].stack,
		query: queries.table[ key ] ? queries.table[ key ] : null,
		secureCrossRef: null,
		bindless: systemData.value[ key ].bindless,
		overrideToken: "default", 
		desc: systemData.value[ key ].desc, 
		title: systemData.value[ key ].title, 
		systemValue: systemData.value[ key ].value,
		override: [ 
			{ 
				token: "default", 
				name: "default", 
				isSystem: isSystem,
				type: systemData.value[ key ].type, 
				params: systemData.value[ key ].params, 
				value: value,
				valueSecure: null
			} 
		] 
	};
	SettingsCheckValue( key, value, table, systemData );
	table[ key ].override[ 0 ].valueSecure = table[ key ].valueSecure;

	if( systemData.value[ key ].secure && table[ systemData.value[ key ].secure ] )
		table[ systemData.value[ key ].secure ].secureCrossRef = key;

};
const SettingsExclusionStacking = ( table: any, defaultData: any, systemData: any, key: string, subKey?: string ) => {

	let value;
	let isSystem = true;

	if( defaultData && defaultData.exclusion && defaultData.exclusion[ key ] !== undefined ){
		isSystem = false;
		value = defaultData.exclusion[ key ];
	}else{
		value = systemData.exclusion[ key ];
	};

	table[ subKey || key ] = {
		value: value, 
		key: subKey || key,
		overrideToken: "default", 
		systemValue: true,
		override: [ 
			{ 
				token: "default", 
				name: "default", 
				isSystem: isSystem,
				value: value
			} 
		] 
	};
};
const SettingsInheritance = ( tree: any, full?: boolean ) => {
	
	let result: any = {};

	if( !tree )
		tree = {};

	for( let sectionKey in tree ){
		const section = tree[ sectionKey ];

		for( let inside of section ){

			if( !inside.list )
				continue;

			for( let parameter of inside.list ){
				let key = SettingsParamToKey( sectionKey, inside.key, parameter.key );
				result[ key ] = full ? parameter : parameter.value;
			};	

		};

	};

	return result;
};
const SettingsExclusionInheritance = ( tree: any, full?: boolean ) => {

	let result: any = {};

	if( !tree )
		tree = {};

	for( let sectionKey in tree ){
		const section = tree[ sectionKey ];

		result[ sectionKey ] = true;

		for( let inside of section ){

			if( !inside.list )
				continue;

			result[ SettingsParamToKey3( sectionKey, inside.key ) ] = true;

			for( let parameter of inside.list ){
				let key = SettingsParamToKey( sectionKey, inside.key, parameter.key );
				result[ key ] = true;
			};	

			};

	};

	return result;	
};

const SettingsReducer = ( state: any, [ type, data, data2, queries, tree ] : any ) => {

	if( type == "construct" ){
		let table: any = {};
		let exclusionTable: any = {};
		let array = [ 
			...(Array.isArray( data ) ? data : []) 
		];
		let inheritanceStack: any = [];
		let systemData = { token: "system", name: "system", value: SettingsInheritance( tree, true ), exclusion: SettingsExclusionInheritance( tree, true ) };
		let defaultData = array[ 0 ];
		let self = data2 ? data2 : false;
		let changed: any = {};

		for( let item of array ){
			inheritanceStack.push({
				type: item.type,
				name: item.name,
				token: item.token,
				inherit: item.inherit,
				description: item.description,
			});

			if( typeof item.value == "string" ){
				try{
					item.value = JSON.parse( item.value );
				}catch( e ){};
			};			
			
			if( typeof item.exclusion == "string" ){
				try{
					item.exclusion = JSON.parse( item.exclusion );
				}catch( e ){};
			};
			
		};

		//if( !defaultData || !defaultData.value )
		//	defaultData = systemData;

		for( let key in systemData.value ){
			SettingsStacking( table, defaultData, systemData, key, queries );
		};		
		for( let key in systemData.exclusion ){
			SettingsExclusionStacking( exclusionTable, defaultData, systemData, key );
		};

		let n = 1;
		let length = array.length;

		for( ; n < length; n++ ){

			let settings = array[ n ];
			let override = array[ n ].value || {};

			for( let key in systemData.value ){

				if( systemData.value[ key ].bindless )
					continue;

				if( override[ key ] === undefined || override[ key ] === null ){
					
					if( systemData.value[ key ].secure ){
						SettingsCheckValue( key, table[ key ].value, table, systemData ); 
					};
					
					continue;
				};

				table[ key ].value = override[ key ];
				SettingsCheckValue( key, override[ key ], table, systemData ); 

				table[ key ].desc = systemData.value[ key ].desc, 
				table[ key ].title = systemData.value[ key ].title, 				
				table[ key ].overrideToken = settings.token;
				table[ key ].override.push({ 
					token: settings.token, 
					type: systemData.value[ key ].type, 
					params: systemData.value[ key ].params, 
					name: settings.name, 
					value: override[ key ],
					valueSecure: table[ key ].valueSecure
				});
			};

			override = array[ n ].exclusion || {};

			for( let key in systemData.exclusion ){

				if( override[ key ] === undefined || override[ key ] === null )
					continue;

				exclusionTable[ key ].value = override[ key ];
				exclusionTable[ key ].overrideToken = settings.token;
				exclusionTable[ key ].override.push({ 
					token: settings.token, 
					name: settings.name, 
					value: override[ key ] 
				});			

			};

		};

		for( let key in systemData.value ){	

			//bindless
			if( systemData.value[ key ].bindless ){
				changed[ key ] = state.changed[ key ];
			};
			//^
		
			if( !systemData.value[ key ].stack )
				continue;			
			
			if( !table[ key ].override[ 0 ].isSystem )
				continue;

			let array: any = [];
			let refValue = SettingsGetValue( table, state.changed, systemData.value[ key ].stack );
			let type = Common.type( refValue );

			if( type == "number" ){
				refValue = VMath.clamp( Common.uint( refValue ), 0, 999 );

				for( let n = 0; n < refValue; n++ ){
					array.push( table[ key ].systemValue );
				};

			}else if( type == "array" ){

				let refLength = refValue.length;

				for( let n = 0; n < refLength; n++ ){
					array.push( table[ key ].systemValue );
				};

			};

			table[ key ].override[ 0 ].value = array;
		
			if( table[ key ].override.length > 1 )
				continue;		

			table[ key ].value = array;
		};

		return {
			...state,
			iteration: ++state.iteration,
			table: table,
			systemData: systemData,
			exclusionTable: exclusionTable,
			inheritanceStack: inheritanceStack,
			self: self,
			changed: changed,
			reconstructData: {
				data: data, data2: data2, queries: queries
			},
			exclusionChanged: {},
		};
	}else if( type == "change" ){

		let changed = { ...state.changed };

		SettingsSetValue( 0, state.table, state.systemData, changed, data.key, data.value, data.keyIndex );

		return {
			...state,
			iteration: ++state.iteration,
			changed: changed
		};	
	}else if( type == "changeExclusion" ){

		let exclusionChanged = { ...state.exclusionChanged };

		if( data.value === undefined ){
			delete exclusionChanged[ data.key ];
		}else{
			exclusionChanged[ data.key ] = data.value;
		};

		return {
			...state,
			iteration: ++state.iteration,
			exclusionChanged: exclusionChanged
		};
	}else if( type == "revert" ){

		let changed = { ...state.changed };
		delete changed[ data.key ];

		return {
			...state,
			iteration: ++state.iteration,
			changed: changed
		};
	}else if( type == "revertExclusion" ){

		let exclusionChanged = { ...state.exclusionChanged };
		delete exclusionChanged[ data.key ];

		return {
			...state,
			iteration: ++state.iteration,
			exclusionChanged: exclusionChanged
		};
	};

    return state;
};

export const SettingGetAllParameters = ( tree: any ) => {

	let list: any = [];

	for( let sectionKey in tree ){
		const section = tree[ sectionKey ];

		for( let inside of section ){

			if( !inside.list )
				continue;

			for( let parameter of inside.list ){
				let key = SettingsParamToKey( sectionKey, inside.key, parameter.key );
				list.push({ ...parameter, key: key });
			};

		};

	};

	return list;
};

export const SettingGetAllQueries = async ( tree: any ) => {

	let params: any[] = SettingGetAllParameters( tree );
	let table: any = {};
	let tableKeys: any = {};

	for( let parameter of params ){

		if( !parameter.query )
			continue;

		if( !table[ parameter.query.route ] )
			table[ parameter.query.route ] = [];
		
		table[ parameter.query.route ].push({ key: parameter.key, data: null });
	};

	for( let route in table ){

		let cfg: RequestInit = { 
			method: "POST",
			url: route + "/list/", 
			data: null 
		};

		await Request.fetch( cfg )
		.then( response => {
			return response.data;
		}).then(( response ) => {

			for( let item of table[ route ] ){
				tableKeys[ item.key ] = response.data;
				item.data = response.data;
			};
			
		}).catch(() => {});

	};

	return { queries: table, table: tableKeys };
};

export type SettingsInitType = {
	state: any,
	dispatch: Function,
	table: any, 
	exclusionTable: any, 
	isChanged: any, 
	isExclusionChanged: any, 
	isInherit: any, 
	isExclusionInherit: any, 
	isCleared: any, 
	isExclusionCleared: any, 
	isOverride: any, 
	isExclusionOverride: any, 
	checkValue: Function,
	getValue: Function,
	keyExist: Function,
	setValueAsync: Function,
	getSecureValue: Function,
	getExclusionValue: Function,
	getOverride: Function,
	getExclusionOverride: Function,
	autoCorrected: Function,
	isSelf: Function,
	getSystemData: Function,
	getDesc: Function,
	getTitle: Function,
	change: Function,
	changeExclusion: Function,
	revert: Function,
	revertExclusion: Function,
	clearOverride: Function,
	clearExclusionOverride: Function,
	save: Function,
	iteration: number,
	it: number,
	inheritanceStack: any,
	async: { get: any, add: any, edit: any, remove: any, list: any }
};
export const SettingsParamToKey3 = ( sectionItem: string, partitionKey: string ) => {
	//return (sectionKey || "") + ":" + (sectionItem || "") + ":" + partitionKey;
	return (sectionItem || "") + "::" + partitionKey;
};
export const SettingsParamToKey = ( sectionItem: string, partitionKey: string, itemKey: string ) => {
	//return (sectionKey || "") + ":" + (sectionItem || "") + ":" + partitionKey + ":" + itemKey;
	return (sectionItem || "") + "::" + partitionKey + "::" + itemKey;
};
export const useSettings = ( props: any ) => {

	let { token, connectionless, access, replicate, watch, user, ...rest } = props;
	const constructTable = props.table;
	const [ state, dispatch ] = useReducer( SettingsReducer, {
		table: {},
		systemData: {},
		changed: {},
		inheritanceStack: [],
		exclusionTable: {},
		exclusionChanged: {},		
		iteration: 0,
		self: true,
		reconstructData: {
			data: [], data2: false, queries: null
		},		
		inherit: [
			{ token: "system", name: "system", value: SettingsInheritance( constructTable ) }
		]
	});
	
	const notifications = useContext( NotificationsContext );
	const asyncSaveRef = useRef<any>( 0 );
	const asyncSaveRefTimer = useRef<any>( null );
	const connection = useRef<any>( null );
	const reconstructData = useRef<any>( state.reconstructData );
	const changedData = useRef<any>( state.changed );
	const liveUpdates = useRef<any>( false );

	let tokenSplit = (token || "").split( /\:/g );
	let tokenParsed = (tokenSplit.length > 1 ? tokenSplit[ tokenSplit.length - 1 ] : tokenSplit[ 0 ]) || "";

	if( tokenParsed == "self" && state.self && typeof state.self == "string" ){
		tokenParsed = state.self;
	};

	reconstructData.current = state.reconstructData;
	changedData.current = state.changed;
	liveUpdates.current = SettingsGetSecureValue( state.table, state.changed, "General:Others:LiveUpdates" ) !== false;

	useEffect(() => {

		if( connectionless || !user )
			return () => {};

		if( connection.current && connection.current.__user != user ){
			Channels.leaveAll();
			connection.current.destroy();
			connection.current.__user = "";
			connection.current = null;
		};

		if( !connection.current ){
			const socket = new Socket();
			socket.connect( location.host + "/ws", window.location.protocol == "https:" );
			(socket as any).__user = user;
			Channels.attach( socket );
			connection.current = socket;
		};

		Channels.on( "events", ( channel: Channel, action: string, value: any ) => {

			//console.log( channel.token, action, value );

			if( action == "config" ){

				if( value.value == "refresh" )
					refresh();
				else
					reconstruct( channel.token, value.value, value.exclusion, value.merge );

			}else if( action == "refresh" ){
				//refresh();
			};

		});

		return () => {
			//connection.close();
		};
	}, [ token, access, connectionless, user ]);
	useEffect(() => {

		if( watch === undefined )
			return;

	}, [ watch ]);

	useEffect(() => {

		if( !asyncSaveRef.current )
			return;

		clearTimeout( asyncSaveRefTimer.current );
		asyncSaveRefTimer.current = setTimeout(() => {
			let s = asyncSaveRef.current;
			asyncSaveRef.current = 0;
			save( s > 1 ? true : false );
		}, 100 );

	}, [ state.changed ]);

	const list = useAsync({
		method: "POST",
		url: "./configurations/list/"
	}, {});

	const add = useAsync({
		method: "POST",
		url: "./configurations/createEmpty/"
	}, {});

	const edit = useAsync({
		method: "POST",
		url: "./configurations/commit/"
	}, {});
	edit.onResponse(( response: any ) => {

		get.fetch({ token: token }, { 
			ignore: true,
			success: async ( response: any ) => {
				let queries = await SettingGetAllQueries( constructTable );
				dispatch([ "construct", response.data, response.self, queries, constructTable ]);
			},
			failure: ( e: any ) => {
				notifications.alert( e.errors );
			}
		});

	});

	const remove = useAsync({
		method: "POST",
		url: "./configurations/remove/"
	}, {});

	const get = useAsync({
		method: "POST",
		url: "./configurations/fetch/"
	}, {});

	useEffect(() => {

		if( !token || (access !== undefined && access < 1) )
			return;

		get.fetch({ token: token }, { 
			ignore: true,
			success: async ( response: any ) => {
				let queries = await SettingGetAllQueries( constructTable );
				dispatch([ "construct", response.data, response.self, queries, constructTable ]);
			} 
		});

	}, [ token, access ]);

	const reconstruct = ( token: string, value: any, exclusion: any, merge: boolean ) => {

		if( !reconstructData.current )
			return;

		let data = [ ...reconstructData.current.data ];
		let t = (token || "").split( /\:/g );
		let tp = (t.length > 1 ? t[ t.length - 1 ] : t[ 0 ]) || "";
		let type = (t.length > 1 ? t[ 0 ] : "") || "";

		try{
			value = typeof value == "string" ? JSON.parse( value ) : value; 
		}catch( e ){};		
		try{
			exclusion = typeof exclusion == "string" ? JSON.parse( exclusion ) : exclusion; 
		}catch( e ){};
		
		for( let item of data ){

			let line: any = null;

			if( token == "users" ){
				line = item.type == "users" ? item : null;
			}else if( type == item.type && tp == item.token ){
				line = item;
			};

			if( !line )
				continue;

			if( merge )
				line.value = { ...line.value, ...value };
			else
				line.value = { ...value };			
			
			if( merge )
				line.exclusion = { ...line.exclusion, ...exclusion };
			else
				line.exclusion = { ...exclusion };

		};

		let queries = {
			queries: {},
			table: {},
		};

		try{
			queries.queries = reconstructData.current.queries && reconstructData.current.queries.queries ? { ...reconstructData.current.queries.queries } : {};
			queries.table = reconstructData.current.queries && reconstructData.current.queries.table ? { ...reconstructData.current.queries.table } : {};
		}catch( e ){};

		dispatch([ 
			"construct", 
			data, 
			reconstructData.current.data2, 
			queries, 
			constructTable
		]);

	};

	const change = ( key: string, value: any, keyIndex?: number ) => {
		dispatch([ "change", { key: key, value: value, keyIndex: keyIndex } ]);
	};		
	const revert = ( key: string, value: any ) => {
		dispatch([ "change", { key: key, value: value } ]);
	};		
	const changeExclusion = ( key: string, value: any, keyIndex?: number ) => {
		dispatch([ "changeExclusion", { key: key, value: value, keyIndex: keyIndex } ]);
	};		
	const revertExclusion = ( key: string, value: any ) => {
		dispatch([ "revertExclusion", { key: key, value: value } ]);
	};	
	const save = ( silent?: boolean, callback?: Function ) => {

		let saveData: any = {};
		let saveExclusionData: any = {};

		if( !silent ){

			for( let key in state.table ){
				let item = state.table[ key ];

				if( state.systemData.value[ key ].bindless )
					continue;

				if( item.overrideToken != tokenParsed )
					continue;

				saveData[ key ] = item.value;
			};

		};

		for( let key in state.changed ){
			let item = state.changed[ key ];
			
			if( item === null ){
				delete saveData[ key ];
				continue;
			};

			if( state.systemData.value[ key ].bindless )
				continue;			
			
			saveData[ key ] = item;
		};

		if( !silent ){
				
			for( let key in state.exclusionTable ){
				let item = state.exclusionTable[ key ];

				if( item.overrideToken != tokenParsed )
					continue;

				saveExclusionData[ key ] = item.value;
			};

		};

		for( let key in state.exclusionChanged ){
			let item = state.exclusionChanged[ key ];
			
			if( item === null ){
				delete saveExclusionData[ key ];
				continue;
			};
			
			saveExclusionData[ key ] = item;
		};

		let result = "";
		let resultExclusion = "";

		try{ 
			result = JSON.stringify( saveData );
			resultExclusion = JSON.stringify( saveExclusionData );
		}catch( e ){};

		//console.log( saveData, state );
		//return;

		edit.fetch({ token: token, value: result, exclusion: resultExclusion, silent: silent }, { 
			ignore: true,
			success: () => {

				if( silent ){
					
					if( callback )
						callback();
					
					return;
				};

				get.fetch({ token: token }, { 
					ignore: true,
					success: async ( response: any ) => {
						let queries = await SettingGetAllQueries( constructTable );						
						dispatch([ "construct", response.data, response.self, queries, constructTable ]);

						if( callback )
							callback();

						if( !Array.isArray( replicate ) )
							return;

						for( let item of replicate ){
							item.dispatch([ "construct", response.data, response.self, queries, constructTable ]);
						};

					} 
				});

			},
			failure: ( e: any ) => {
				notifications.alert( e.errors );
			}
		});

	};
	const checkValue = ( key: string ) => {
		SettingsCheckValue( key, 
			SettingsGetValue( state.table, state.changed, key ), 
			state.table, state.systemData 
		);
	};
	const getValue = ( key: string ) => {
		return SettingsGetValue( state.table, state.changed, key );
	};		
	const getSecureValue = ( key: string ) => {
		return SettingsGetSecureValue( state.table, state.changed, key );
	};	
	const getExclusionValue = ( key: string ) => {
		return SettingsGetExclusionValue( state.exclusionTable, state.exclusionChanged, key );
	};
	const getDesc = ( key: string ) => {
		return state.table[ key ] ? state.table[ key ].desc : "";
	};	
	const getTitle = ( key: string ) => {
		return state.table[ key ] ? state.table[ key ].title : "";
	};	
	const getSystemData = ( key: string ) => {
		return state.systemData && state.systemData.value ? state.systemData.value[ key ] : undefined;
	};
	const isChanged = ( key: string ) => {
		return state.changed[ key ] === undefined ? false : true;
	};		
	const isExclusionChanged = ( key: string ) => {
		return state.exclusionChanged[ key ] === undefined ? false : true;
	};	
	const isCleared = ( key: string ) => {
		return state.changed[ key ] === null ? true : false;
	};	
	const isExclusionCleared = ( key: string ) => {
		return state.exclusionChanged[ key ] === null ? true : false;
	};
	const getOverride = ( key: string ) => {
		return state.table[ key ] ? state.table[ key ].override : [];
	};	
	const getExclusionOverride = ( key: string ) => {
		return state.exclusionTable[ key ] ? state.exclusionTable[ key ].override : [];
	};	
	const isOverride = ( key: string ) => {

		if( key == "default" )
			return false;

		let list = getOverride( key );

		if( !list.length )
			return false;

		return list[ list.length -1 ].token == tokenParsed; 
	};	
	const isExclusionOverride = ( key: string ) => {

		if( key == "default" )
			return false;

		let list = getExclusionOverride( key );

		if( !list.length )
			return false;

		return list[ list.length -1 ].token == tokenParsed; 
	};		
	const isInherit = ( key: string ) => {

		if( state.changed[ key ] === null ){ //force inherit
			return state.table[ key ] && state.table[ key ].override.length > 1 ? 
				(state.table[ key ].override[ state.table[ key ].override.length - 2 ].value) 
				: 
				(state.table[ key ] ? state.table[ key ].value : undefined);
		};

		if( key == "default" )
			return false;

		let list = getOverride( key );

		if( !list.length )
			return false;

		return list[ list.length - 1 ].token != tokenParsed;
	};	
	const isExclusionInherit = ( key: string ) => {

		if( state.changedExclusion[ key ] === null ){ //force inherit
			return state.exclusionTable[ key ] && state.exclusionTable[ key ].override.length > 1 ? 
				(state.exclusionTable[ key ].override[ state.exclusionTable[ key ].override.length - 2 ].value) 
				: 
				(state.exclusionTable[ key ] !== undefined ? state.exclusionTable[ key ] : undefined);
		};

		if( key == "default" )
			return false;

		let list = getExclusionOverride( key );

		if( !list.length )
			return false;

		return list[ list.length - 1 ].token != tokenParsed;
	};
	const clearOverride = ( key: string ) => {
		//dispatch([ "clearOverride", { key: key, token: token } ]);
		dispatch([ "change", { key: key, value: null } ]);
	};	
	const clearExclusionOverride = ( key: string ) => {
		//dispatch([ "clearOverride", { key: key, token: token } ]);
		dispatch([ "changeExclusion", { key: key, value: null } ]);
	};
	const keyExist = ( key: string ) => {
		return state.table.hasOwnProperty( key );
	};	
	const isSelf = ( key: string ) => {
		return state.self ? true : false;
	};
	const autoCorrected = ( key: string ) => {
		return state.table[ key ] ? state.table[ key ].autoCorrected : null;
	};
	const setValueAsync = ( key: string, value: any, silent?: boolean ) => {

		if( !keyExist( key ) )
			return;

		asyncSaveRef.current = silent ? 2 : 1;
		change( key, value );

	};

	const refresh = () => {

		if( !token || (access !== undefined && access < 1) )
			return;

		get.fetch({ token: token }, { 
			ignore: true,
			success: async ( response: any ) => {
				let queries = await SettingGetAllQueries( constructTable );
				dispatch([ "construct", response.data, response.self, queries, constructTable ]);
			} 
		});

	};

    return { 
		state, 
		dispatch, 
		table: state.table, 
		exclusionTable: state.exclusionTable, 
		checkValue: checkValue,
		getValue: getValue,
		getSecureValue: getSecureValue,
		getExclusionValue: getExclusionValue,
		getTitle: getTitle,
		getSystemData: getSystemData,
		getDesc: getDesc,
		getOverride: getOverride,
		getExclusionOverride: getExclusionOverride,
		isChanged: isChanged,
		isExclusionChanged: isExclusionChanged,
		isOverride: isOverride,
		isExclusionOverride: isExclusionOverride,
		isInherit: isInherit,
		isExclusionInherit: isExclusionInherit,
		isCleared: isCleared,
		isExclusionCleared: isExclusionCleared,
		autoCorrected: autoCorrected,
		keyExist: keyExist,
		setValueAsync: setValueAsync,
		change: change,
		changeExclusion: changeExclusion,
		revert: revert,
		revertExclusion: revertExclusion,
		refresh: refresh,
		clearOverride: clearOverride,
		clearExclusionOverride: clearExclusionOverride,
		save: save,
		isSelf: isSelf,
		it: state.iteration,
		iteration: state.iteration,
		inheritanceStack: state.inheritanceStack,
		async: { get, add, edit, list, remove } 
	} as SettingsInitType;
};
