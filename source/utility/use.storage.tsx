import React, { useReducer, useEffect, useContext } from "react";
import { useAsync } from "v-eris";
import { NotificationsContext } from "../components/Notifications/notifications";

const StorageReducer = (state: any, [ type, data, rewrite, sort ] : any ) => {

	if( type == "construct" ){

		let table: any = {};
		let ref = data;

		if( Array.isArray( ref ) )
			ref = ref[ rewrite ? (ref.length > 0 ? (ref.length - 1) : 0) : 0 ] || {};

		for( let key in ref ){
			let item = ref[ key ];

			if( item === undefined )
				continue;

			table[ key ] = item;

		};

		return {
			...state,
			iteration: ++state.iteration,
			table: table,
			changed: {}
		};
	}else if( type == "change" ){

		let changed = { ...state.changed };
		let updated = false;

		if( data.value === undefined && changed[ data.key ] !== undefined ){
			delete changed[ data.key ];
			updated = true;
		}else if( changed[ data.key ] !== data.value ){
			changed[ data.key ] = data.value;
			updated = true;
		};

		if( !updated )
			return state;

		return {
			...state,
			iteration: ++state.iteration,
			changed: changed
		};
	}else if( type == "overwrite" ){

		let overwrite = { ...state.overwrite };

		if( data.value === undefined )
			delete overwrite[ data.key ];
		else
			overwrite[ data.key ] = data.value;

		return {
			...state,
			iteration: ++state.iteration,
			overwrite: overwrite
		};	
	}else if( type == "changeMulti" ){

		let changed = { ...state.changed };
		let skip = true;

		for( let key in data.values ){

			let value = data.values[ key ];

			if( value === undefined && changed[ key ] !== undefined ){
				skip = false;
				delete changed[ key ];
			}else if( value != changed[ key ] && value != state.table[ key ] ){
				skip = false;
				changed[ key ] = value;
			};

		};

		if( skip )
			return state;

		return {
			...state,
			iteration: ++state.iteration,
			changed: changed
		};
	}else if( type == "revert" ){

		let changed = { ...state.changed };
		delete changed[ data.key ];

		return {
			...state,
			iteration: ++state.iteration,
			changed: changed
		};
	}else if( type == "list" ){

		let list: any[] = [];
		let precomputed: any = null;

		for( let it in data ){

			let item = data[ it ];
			let result: any = { key: item.token };

			for( let key in item ){

				result[ key ] = item[ key ];

				if( typeof rewrite[ key ] == "function" ){
					precomputed = rewrite[ key ]( key, item[ key ] );

					if( precomputed ){
						result[ precomputed.key ] = precomputed.value;
					};

				}else if( rewrite[ key ] ){
					result[ rewrite[ key ] ] = item[ key ];
				};

			};

			list.push( result );

		};

		if( sort )
			list = sort( list );

		return {
			...state,
			iteration: ++state.iteration,
			list: list
		};
	};

    return state;
};

export type StorageInitType = {
	state: any,
	dispatch: Function,
	changed: any, 
	table: any, 
	list: any[], 
	isChanged: any, 
	isCleared: any, 
	getToken: Function,
	getValue: Function,
	requestList: Function,
	change: Function,
	overwrite: Function,
	changeMulti: Function,
	revert: Function,
	save: Function,
	add: Function,
	remove: Function,
	iteration: number,
	it: number,
	async: { get: any, add: any, edit: any, remove: any, list: any }
};

export const useStorage = ( props: any ) => {

	let { token, section, current, getFromLast, params, sort, where, whereAny, ignoreList, rewrite, ...rest } = props;
	const notifications = useContext( NotificationsContext );

	if( !whereAny )
		whereAny = {};

	if( !section )
		section = "";	
	if( !params )
		params = {};	
	if( !rewrite )
		rewrite = {};
	if( current === undefined )
		current = true;	
	if( getFromLast === undefined )
		getFromLast = false;

	const [ state, dispatch ] = useReducer( StorageReducer, {
		list: [],
		table: {},
		changed: {},
		overwrite: {},
		iteration: 0,
	});

	if( current && !ignoreList && !state.list.find(( item: any ) => item.key == token ) ){
		token = state.list[ 0 ] ? state.list[ 0 ].key : "";	
	};

	const list = useAsync({
		method: "POST",
		url: "./" + section + "/list/"
	}, { where: where, whereAny: whereAny });
	list.onResponse(( response: any ) => {
		dispatch([ "list", response.data, rewrite, sort ]);
	});

	const add = useAsync({
		method: "POST",
		url: "./" + section + "/createEmpty/"
	}, { where: where, whereAny: whereAny });

	const edit = useAsync({
		method: "POST",
		url: "./" + section + "/edit/"
	}, {});
	edit.onResponse(( response: any ) => {

		get.fetch({ ...params, token: token }, { 
			ignore: true,
			success: ( response: any ) => {
				dispatch([ "construct", response.data, getFromLast ]);
			} 
		});

	});

	const remove = useAsync({
		method: "POST",
		url: "./" + section + "/remove/"
	}, {});

	const get = useAsync({
		method: "POST",
		url: "./" + section + "/get/"
	}, {});

	useEffect(() => {

		if( !current || ignoreList )
			return;

		//if( where && !Object.keys( where ).length )
		//	return;

		list.fetch({ ...params, ...{ where: where, whereAny: whereAny } });		
	}, []);
	useEffect(() => {

		if( !token || !current )
			return;

		get.fetch({ ...params, token: token }, { 
			ignore: true,
			success: ( response: any ) => {
				dispatch([ "construct", response.data, getFromLast ]);
			} 
		});

	}, [ token, section, current ]);

	const change = ( key: string, value: any ) => {
		dispatch([ "change", { key: key, value: value } ]);
	};
	const overwrite = ( key: string, value: any ) => {
		dispatch([ "overwrite", { key: key, value: value } ]);
	};			
	const changeMulti = ( values: any ) => {
		dispatch([ "changeMulti", { values: values } ]);
	};		
	const revert = ( key: string, value: any ) => {
		dispatch([ "change", { key: key, value: value } ]);
	};	
	const save = ( params?: { parseKeys: boolean } ) => {

		if( !params )
			params = { parseKeys: false };

		let saveData: any = {};

		for( let key in state.table ){
			let item = state.table[ key ];

			if( item === undefined )
				continue;

			saveData[ key ] = item;
		};

		let subArray: string[] = [];

		for( let key in state.changed ){
			let item = state.changed[ key ];
			
			if( item === null )
				continue;

			if( params.parseKeys ){
				subArray = key.split( /\:/g );
				key = subArray && subArray.length ? subArray[ subArray.length - 1 ] : key;
			};
			
			saveData[ key ] = item;
		};

		edit.fetch({ ...saveData, token: token }, { 
			ignore: true,
			success: () => {
				get.fetch({ token: token }, { 
					ignore: true,
					success: ( getResponse: any ) => {

						if( ignoreList ){
							dispatch([ "construct", getResponse.data, getFromLast ]);
							return;
						};

						list.fetch({ token: token }, { 
							ignore: true,
							success: ( listResponse: any ) => {
								dispatch([ "list", listResponse.data, rewrite, sort ]);
								dispatch([ "construct", getResponse.data, getFromLast ]);
							}
						});

					} 
				});
			},
			failure: ( e: any ) => {
				notifications.alert( e.errors );
			}
		});

	};

	const getValue = ( key: string ) => {

		if( state.overwrite[ key ] !== undefined ){
			return state.overwrite[ key ];
		};		
		
		if( state.changed[ key ] === null ){
			return (state.table[ key ] ? state.table[ key ] : undefined);
		};

		return state.changed[ key ] === undefined ? state.table[ key ] : state.changed[ key ];
	};
	const isChanged = ( key: string ) => {
		return state.changed[ key ] === undefined ? false : true;
	};	
	const isCleared = ( key: string ) => {
		return state.changed[ key ] === null ? true : false;
	};
	const addFn = ( data: any, callback: Function ) => {
		add.fetch( { ...data, ...{ where: where, whereAny: whereAny } }, { 
			ignore: true,
			success: ( response: any ) => {

				if( ignoreList ){
					if( callback )
						callback( response );
					return;
				};

				list.fetch({ token: token }, { 
					ignore: true,
					success: ( listResponse: any ) => {
						dispatch([ "list", listResponse.data, rewrite, sort ]);
						if( callback )
							callback( response );
					}
				});

			},
			failure: ( e: any ) => {
				notifications.alert( e.errors );
			}
		});
	};	
	const removeFn = ( data: any, callback: Function ) => {
		remove.fetch( data, { 
			ignore: true,
			success: ( response: any ) => {

				if( ignoreList ){
					if( callback )
						callback( response );
					return;
				};

				list.fetch({ token: token }, { 
					ignore: true,
					success: ( listResponse: any ) => {
						dispatch([ "list", listResponse.data, rewrite, sort ]);
						if( callback )
							callback( response );
					}
				});

			},
			failure: ( e: any ) => {
				notifications.alert( e.errors );
			}
		});
	};
	const getToken = function(){
		return token;
	};

    return { 
		state, 
		dispatch, 
		table: state.table, 
		changed: state.changed, 
		list: state.list,
		getToken: getToken,
		getValue: getValue,
		requestList: () => {},
		isChanged: isChanged,
		isCleared: isCleared,
		change: change,
		overwrite: overwrite,
		changeMulti: changeMulti,
		revert: revert,
		save: save,
		add: addFn,
		remove: removeFn,
		it: state.iteration,
		iteration: state.iteration,
		async: { get, add, edit, list, remove } 
	} as StorageInitType;
};


export const StorageContext = React.createContext({
	...useStorage
} as StorageInitType);
