import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Card, List, LangContext, Common, Button, useAsync, Space, Column, Row, Props, LangContextType, Overlay, Loading } from "v-eris";
import { useNavigate, useLocation } from "react-router-dom";
import { BuildContext, BuildContextType, BuildRoute, BuildSectionItem } from "../../components/Build/build";
import { Tools } from "../../components/Tools/tools";
import { Loader } from "../../components/Loader/loader";
import { MeasurementsTools, Tools1, Tools2 } from "../../components/Tools/tools.test";
import { SettingsInitType } from "../../utility/use.settings";
import { Sidebar } from "../../components/Sidebar/sidebar";
import { Search } from "../../components/Search/search";
import { Templates } from "../../components/Templates/templates";
import { TemplatesTable } from "@components/Templates/templates.table";

export const AppRoute = () => {
	const nav = useNavigate();
	const location = useLocation();
	const qs = Common.parseQuery( location );
	const build: BuildContextType = useContext( BuildContext );
	const route: BuildRoute = build.routes[ "admin" ];
	const settings: SettingsInitType = build.settings;
	const [ tools, setToolsRef ] = useState({});
	const [ sidebarActive, setSidebarActive ] = useState( true );

	const setTools = ( data: { key: string, value: any } ) => {
		console.log( data );
		setToolsRef({ ...tools, [data.key]: data.value });
	};

	const templatesList = {
		"aircrafts": [
			{ list: [ 1, 2, 3 ] }
		],
	};

	return (
		<Row style={{ height: "100%" }}>

			<Search active={ sidebarActive }/>
			<Sidebar active={ sidebarActive } hasSearch onClick={() => { console.log( sidebarActive ); setSidebarActive( !sidebarActive ) }}>
				<Templates templates={ TemplatesTable } value={ templatesList }/>
			</Sidebar>

			<Overlay margin={[ 70, 19 ]} direction={[ 1, 1 ]} style={{ zIndex: 2 }}>
				<Row gap={ 12 }>
					<Tools list={ MeasurementsTools }
						simple
						value={ tools }
						onChange={ setTools }
						cycle={ settings.getSecureValue( "Measurements:Settings:SwitchType" ) == "cycle"}
						style={{ display: settings.getSecureValue( "Measurements:Toggles:TopBar" ) != "never" ? "flex" : "none" }}
					/>
					<Tools list={ Tools1 } value={ tools } onChange={ setTools }/>
					<Tools list={ Tools2 } value={ tools } onChange={ setTools }/>
				</Row>
			</Overlay>			

			<Loader active container/>
		</Row>
	);
};