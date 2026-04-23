import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AdminAccess } from "../../utility/access";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Auth, AuthContext,AuthModuleInit } from "../Auth/auth";
import { BuildContext } from "../Build/build";
import { Button, LangContext, Column, Row, Props, Select } from "v-eris";

import "./routes.wrap.scss"

export const RoutesWrap = ( props: any ) => {

	const auth = useContext( AuthContext );
	const lang: any = useContext( LangContext );
	const build = useContext( BuildContext );

	const tryAccess = ( element: any ) => {
		return auth.access < 3 ? 
		(<div className={ "core-deny" }>{ lang.get( auth.access < 1 ? "Server::Banned" : "Server::NeedConfirmation" ) }</div>) 
		: 
		(build.denyAccess ? (<div className={ "core-deny" }>{ lang.get( "Server::Deny" ) }</div>) : element)
	};

	const content = useMemo(() => {

		const list: any[] = [];

		for( let key in build.routes ){
			list.push( <Route key={ key } path={ key } element={ tryAccess( build.routes[ key ].element ) } /> );
		};

		return list;
	}, [ build.routes, auth.access ]);

	return (
		<div className={ "eris-routes-wrap-container" }>

			<Routes>
				{ content }
			</Routes>

		</div>
	);
};