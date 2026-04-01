import React, { useReducer, useState, useEffect, useMemo, useContext, useRef } from "react";
import { Common, LangContext, Props, Space, useAnimation, Icons } from "v-eris";

import "./notifications.scss"

export interface NotificationsMessage{
	code?: number,
	desc?: string,
	description?: string,
	tokens?: string[], //Error codes
};

export function NotificationsReducer( state: any, [ type, data, lang ] : any ){

	if( type == "alert" ){

		let appended: any = [];
		let index = state.index;

		if( !Array.isArray( data ) )
			data = [ data ];

		for( let line of data ){

			if( !line )
				continue;
			
			if( Array.isArray( line.tokens ) ){

				for( let item of line.tokens ){
					appended.push({
						token: Common.token(),
						type: "alert",
						code: line.code || 406,
						desc: lang.get( item ),
						readed: false,
						index: index++
					});
				};

			}else{
				appended.push({
					token: Common.token(),
					type: "alert",
					code: line.code || 406,
					desc: line.desc || line.description || "",
					readed: false,
					index: index++
				});
			};

		};

		let list = [ ...(appended.reverse()), ...state.list ];

		list = list.splice( 0, 5 );

		return {
			...state,
			index: index,
			list: list
		};
	}else if( type == "read" ){
		let list = [ ...state.list ];
		let index = list.findIndex(( f ) => f.token == data );

		if( index > -1 )
			list[ index ].readed = true;

		return {
			...state,
			list: list
		};
	}else if( type == "emptyReaded" ){
		let list: any = [];

		for( let item of state.list ){

			if( item.readed )
				continue;

			list.push( item );
		};

		return {
			...state,
			list: list
		};
	};

	return state;
};

export const NotificationsContext = React.createContext({
	state: {},
	list: [],
	dispatch: () => {},
	alert: ( data: NotificationsMessage[] ) => {},
	read: ( token: string ) => {},
	emptyReaded: () => {},
});

export const NotificationsModuleInit = () => {

	const [ state, dispatch ] = useReducer( NotificationsReducer, {
		index: 1,
		list: [],
	});
	const lang: any = useContext( LangContext );

	const alert = ( data: NotificationsMessage[] ) => {
		dispatch([ "alert", data, lang ]);		
	};
	const read = ( token: string ) => {
		dispatch([ "read", token, lang ]);		
	};	
	const emptyReaded = ( token: any ) => {
		dispatch([ "emptyReaded", lang ]);		
	};

	return { state, dispatch, list: state.list, alert: alert, read: read, emptyReaded: emptyReaded, context: NotificationsContext };
};

export const Notifications = ( props: { container: boolean } ) => {
	const lang: any = useContext( LangContext );
	const module: any = useContext( NotificationsContext );
	const [ hovered, setHovered ] = useState( false );
	const childrenElem = useAnimation.Expand( hovered );
	const asyncSaveRef = useRef( module.state.index );
	const asyncSaveRefTimer : any = useRef( undefined );

	useEffect(() => {

		if( asyncSaveRef.current == module.state.index )
			return;

		setHovered( true );

		clearTimeout( asyncSaveRefTimer.current );
		asyncSaveRefTimer.current = setTimeout(() => {
			asyncSaveRef.current = module.state.index;
			setHovered( false );
		}, 3500 );

	}, [ module.state.index ]);

	let freshNotices = useMemo(() => {

		let result = 0;

		for( let item of module.state.list ){

			if( item.readed )
				continue;

			result++;
		};

		return result;
	}, [ module.state.list ]);

	let content = useMemo(() => {
		return (
		<div className={ Props.className( "eris-notifications", { hovered: hovered, hidden: !module.state.list.length }) } 
			onMouseOver={( e ) => { 
				clearTimeout( asyncSaveRefTimer.current ); 
				setHovered( true );
			}} 
			onMouseOut={( e ) => { 
				clearTimeout( asyncSaveRefTimer.current ); 
				setHovered( false ); 
			}} 
		>
			<div className={ "eris-notifications-frame" } ref={ childrenElem }>
			{
				module.state.list.map(( item: any ) => {
					return (
					<div className={ Props.className( "eris-notifications-line", { alert: !item.readed }) } key={ item.token } onMouseOver={( e ) => { module.read( item.token ) }} >
						<div className={ "eris-notifications-line-index" }>{ item.index }</div>
						<div className={ "eris-notifications-line-desc" }>{ item.desc }</div>
						<div className={ "eris-notifications-line-code" }><span>{ "code" }</span><span>{ item.code }</span></div>
					</div>
					);
				})
			}
			</div>
			<div className={ "eris-notifications-button" }>
				<Icons.notification/>
				<Space/>
				{ lang.get( "Core::Notifications" ) }
				<Space/>
				<span className={ Props.className( "eris-notifications-length", { alert: freshNotices > 0 }) }>{ "( " + (freshNotices) +  " )" }</span>
			</div>
		</div>);
	}, [ module.state.list, hovered ]);

	return (
		props.container ? (<div className={ "eris-notifications-container" }>{ content }</div>) : (content)
	);
};