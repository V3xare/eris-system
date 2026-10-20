
import React, { useRef, useReducer, useContext, useEffect, useMemo } from "react";
import { Common, Cookie, LangContext, Select, useAsync } from "v-eris";

export function CancelListReducer( state: any, [ type, data ] : any ){

	if( type == "add" ){
		return { 
			...state,
			[ "list" ]: [
				...state.list, { cancel: typeof data.cancel == "function" ? data.cancel : (() => {}) }
			]
		};
	}else if( type == "cancel" ){

		if( state.list.length < 1 )
			return state;

		let list = [ ...state.list ];
		let item = list.pop();

		try{
			item.cancel();
		}catch( e ){};

		return { 
			...state,
			[ "list" ]: list
		};
	}else if( type == "clear" ){

		for( let n = state.list.length - 1; n > -1; n-- ){

			let item = state.list[ n ];

			try{
				item.cancel();
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
	list: [],
};
export type CancelListContextType = typeof CancelListContextDefault;
export const CancelListContext = React.createContext( CancelListContextDefault );

export const CancelListModuleInit = () => {

	const [ state, dispatch ] = useReducer( CancelListReducer, {
		list: []
	});

	return { 
		state, 
		dispatch, 
		list: state.list,

		context: CancelListContext
	};
};