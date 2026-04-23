import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, LangContext, Column, Row, Props, Select } from "v-eris";
import { BuildContextType, BuildContext } from "../../components/Build/build";
import { SettingsInitType } from "../../utility/use.settings";

import "./sidebar.scss"

export const Sidebar = ( props: { active?: boolean, hidden?: boolean, onClick?: Function, hasSearch?: boolean, children?: any } ) => {
	const build: BuildContextType = useContext( BuildContext );
	const [ state, setState ] = useState({});
	let settings: SettingsInitType = build.settings;

	const hidden = props.hidden === undefined ? !settings.getSecureValue( "General::SideBar::SideBarExpand" ) : props.hidden;

	return (
		<div className={ Props.className( "eris-sidebar", { active: props.active && !props.hidden, hasSearch: props.hasSearch, hidden: hidden}) }>
			<div className={ Props.className( "eris-sidebar-toggle", { static: props.hasSearch, active: props.active }) } 
				onClick={ (props.onClick || (() => {})) as any }
			></div>
			<div className={ "eris-sidebar-content" }>
				{ props.children }
			</div>
		</div>
	);
};