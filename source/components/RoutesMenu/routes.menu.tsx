import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AdminAccess } from "../../utility/access";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Auth, AuthContext,AuthModuleInit } from "../Auth/auth";
import { BuildContext, BuildContextType } from "../Build/build";
import { Button, LangContext, Column, Row, Props, Select } from "v-eris";

import "./routes.menu.scss"

export const RoutesMenu = ( props: any ) => {

	const [ profileExpanded, setProfileExpanded ] = useState( false );
	const coreListWrap = useRef<HTMLDivElement>( null );
	const auth = useContext( AuthContext );
	const lang: any = useContext( LangContext );
	const build: BuildContextType = useContext( BuildContext );
	const nav = useNavigate();

	let routesList = Object.keys( build.routes ).map(( key ) => {
		const item = build.routes[ key ];

		if( item.access > auth.access || item.hidden )
			return null;

		return { icon: item.icon, value: key, title: item.title };
	});	

	useEffect(() => {
		let fn = ( event ) => {

			if( !coreListWrap.current )
				return;

			const inside = coreListWrap.current.contains( event.target );	

			if( inside )
				return;

			setProfileExpanded( false );
		};
		document.addEventListener( "mousedown", fn );
		return () => {
			document.removeEventListener( "mousedown", fn );
		}
	}, [ profileExpanded ]);	

	return (
		<div className={ "eris-routes-menu-container" }>

			<div className={ "eris-routes-menu-profile" }>
				<div className={ "eris-routes-menu-profile-user" } onClick={() => { setProfileExpanded( !profileExpanded ) }}></div>
			</div>

			<div className={ Props.className( "eris-routes-menu-list", { expanded: profileExpanded } ) } ref={ coreListWrap }>
				<div className={ "eris-routes-menu-list-bg" }></div>
				<Column className={ "eris-routes-menu-list-line" }>
					<Row>
						<span className={ "eris-routes-menu-list-line-title" }>{ lang.get( "Admin::Table::Users::Name" ) }:</span>
						<span className={ "eris-routes-menu-list-line-value" }>{ auth.name }</span>
					</Row>
					<Row>
						<span className={ "eris-routes-menu-list-line-title" }>{ lang.get( "Admin::Table::Users::Role" ) }:</span>
						<span className={ "eris-routes-menu-list-line-value" }>{ auth.roleName }</span>
					</Row>									
					<Row>
						<span className={ "eris-routes-menu-list-line-title" }>{ lang.get( "Admin::Table::Users::Configuration" ) }:</span>
						<span className={ "eris-routes-menu-list-line-value" }>{ auth.configurationName }</span>
					</Row>							
					<Row>
						<span className={ "eris-routes-menu-list-line-title" }>{ lang.get( "Admin::Table::Users::Access2" ) }:</span>
						<span className={ "eris-routes-menu-list-line-value" }>{ lang.get( AdminAccess[ "access::" + auth.access ] ) }</span>
					</Row>
				</Column>
				<Select
					headerless
					value={ build.route } 
					onChange={( event: any ) => nav( event.value ) }
					list={ routesList }
				/>
				<Row className={ "eris-routes-menu-list-line eris-routes-menu-list-bottom" } reverse>
					<Button onClick={() => {
						if( auth.persona ){
							auth.dispatch([ "access", { value: 0 } ]);
						}else{
							auth.async.logout.fetch();
						};
					}}>{ auth.persona ? lang.get( "Auth::PersonaReLogin" ) : lang.get( "Auth::LogOut" ) }</Button>	
				</Row>
			</div>

		</div>
	);
};