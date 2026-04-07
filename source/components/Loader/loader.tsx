import React, { useMemo, useState, useRef, useReducer, useContext, useEffect } from "react";
import { Common, Props } from "v-eris";

import "./loader.scss"

export interface LoaderMessage{
	key?: string,
	module?: string,
	type?: string,
	status?: string,
};

const LoaderModuleReducer = ( state: any, [ type, data ]: any ) => {

	if( type == "start" ){
		let list = [ ...state.list ];
		let key = data.key || ((data.module || "") + ":" + (data.type || ""));
		let index = list.findIndex(( item ) => item.key == key );

		if( index < 0 )
			list.push({ key: key, module: data.module || "", type: data.type || "", status: "Start" });

		return {
			...state,
			list: list,
			active: !!list.length
		};
	};

	if( type == "success" ){
		let list = [ ...state.list ];
		let key = data.key || ((data.module || "") + ":" + (data.type || ""));
		let index = list.findIndex(( item ) => item.key == key );

		if( index < 0 )
			return state;

		list.splice( index, 1 );

		return {
			...state,
			list: list,
			active: !!list.length
		};
	};
	if( type == "failed" ){
		let list = [ ...state.list ];
		let key = data.key || ((data.module || "") + ":" + (data.type || ""));
		let index = list.findIndex(( item ) => item.key == key );

		if( index < 0 )
			return state;

		list.splice( index, 1 );

		return {
			...state,
			list: list,
			active: !!list.length
		};
	};

	return state;
};

const LoaderContextDefault = {
	list: [] as LoaderMessage[],
	active: false,
	dispatch: () => {},
	start: ( data: LoaderMessage ) => {},
	success: ( data: LoaderMessage ) => {},
	failed: ( data: LoaderMessage ) => {},
}
export type LoaderContextType = typeof LoaderContextDefault; 
export const LoaderContext = React.createContext( LoaderContextDefault );


export const LoaderModuleInit = () => {

	const [ state, dispatch ] = useReducer( LoaderModuleReducer, {
		list: [] as LoaderMessage[],
		active: false,
	});

	const start = ( data: LoaderMessage ) => {
		dispatch([ "start", data ]);
	};		
	const failed = ( data: LoaderMessage ) => {
		dispatch([ "failed", data ]);
	};	
	const success = ( data: LoaderMessage ) => {
		dispatch([ "success", data ]);
	};

	return { state, dispatch, active: state.active, list: state.list, start, success, failed, context: LoaderContext };
};

export const Loader = ( props: { active?: boolean, size?: number, container?: boolean } ) => {
	const module: LoaderContextType = useContext( LoaderContext );
	const active = props.active === undefined ? module.active : props.active;
	const size = props.size ? Common.uint( props.size ) : 176;

	return (
		<div className={ Props.className( "eris-loader", { active: active, container: props.container }) } style={{ transform: active ? "scale(calc(" + size + " / 248))" : "scale( 0.0 )" }}>
			<div>
				<div className={ "eris-loader-1" }></div>
				<div className={ "eris-loader-2" }></div>
				<div className={ "eris-loader-3" }></div>
				<div className={ "eris-loader-4" }></div>
				<div className={ "eris-loader-5" }></div>
			</div>
		</div>
	);
};