
import React, { useRef, useReducer, useContext, useEffect, useMemo } from "react";
import { Common, Cookie, LangContext, Select, useAsync } from "v-eris";

export function CancelListReducer( state: any, [ type, data ] : any ){

	if( type == "add" ){
		let token: string = data.token || "";

		if( !token )
			return state;

		let list = [ ...state.list ];
		let index = list.findIndex(( f ) => f.token == token );
		let action = typeof data.action == "function" ? data.action : (() => {});

		if( index > -1 ){
			list.splice( index, 1 );
		};
			
		list.push({ token: token, action: action });

		return { 
			...state,
			[ "list" ]: list
		};
	}else if( type == "remove" ){

		let token: string = data.token || "";

		if( !token )
			return state;

		if( state.list.length < 1 )
			return state;

		let list = [ ...state.list ];
		let index = list.findIndex(( f ) => f.token == token );

		if( index < 0 )
			return state;

		list.splice( index, 1 );

		return { 
			...state,
			[ "list" ]: list
		};
	}else if( type == "set" ){

		let list = [ ...data.list ];

		return { 
			...state,
			[ "list" ]: list
		};
	}else if( type == "empty" ){

		for( let n = state.list.length - 1; n > -1; n-- ){

			let item = state.list[ n ];

			try{
				item.action();
			}catch( e ){};

		};

		return { 
			...state,
			[ "list" ]: []
		};
	};

	return state;
};

const CancelListContextDefault = {
	state: {} as any,
	dispatch: ( args: any ) => {},
	swap: ( token: string, active: boolean , action: Function) => {},
	add: ( token: string, action: Function ) => {},
	remove: ( token: any ) => {},
	empty: () => {},
	exec: () => {},
	list: [],
};
export type CancelListContextType = typeof CancelListContextDefault;
export const CancelListContext = React.createContext( CancelListContextDefault );

export const CancelListModuleInit = () => {

	const [ state, dispatch ] = useReducer( CancelListReducer, {
		list: []
	});

	const exec = () => {

		if( state.list.length < 1 )
			return state;

		let list = [ ...state.list ];
		let success: boolean;

		for( let n = list.length - 1; n > -1; n-- ){

			let item = list.pop();
			success = true;

			try{
				item.action();
			}catch( e ){
				success = false;
			};

			if( success )
				break;

		};
	
		dispatch([ "set", { list: list } ]);
	};

	return { 
		state, 
		dispatch, 

		add: ( token: string, action: Function ) => {
			dispatch([ "add", { token: token, action: action } ]);
		},		
		swap: ( token: string, active: boolean , action: Function ) => {

			if( active ){
				dispatch([ "add", { token: token, action: action } ]);
			}else{
				dispatch([ "remove", { token: token } ]);
			};

		},
		remove: ( token: string ) => {
			dispatch([ "remove", { token: token } ]);
		},
		empty: () => {
			dispatch([ "empty" ]);
		},
		exec: exec,

		list: state.list,	
		context: CancelListContext
	};
};


export const useCancelList = ( token: string, state: boolean | any, setState: Function ) => {

	const cancelList: CancelListContextType = useContext( CancelListContext );

	useEffect(() => {

		cancelList.swap( token, !!state, () => {

			if( typeof state == "boolean" )
				setState( false );
			else
				setState( null );

		});

	}, [ state ]);

	useEffect(() => {
		return () => {
			cancelList.remove( token );			
		};
	}, []);	

};