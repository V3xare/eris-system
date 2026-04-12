import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, LangContext, Column, Row, Props, Select } from "v-eris";

import "./sidebar.scss"

export const Sidebar = ( props: { active?: boolean, hidden?: boolean, onClick?: Function, hasSearch?: boolean, children?: any } ) => {
	return (
		<div className={ Props.className( "eris-sidebar", { active: props.active && !props.hidden, hasSearch: props.hasSearch }) }>
			<div className={ Props.className( "eris-sidebar-toggle", { static: props.hasSearch, active: props.active }) } 
				onClick={ (props.onClick || (() => {})) as any }
			></div>
			<div className={ "eris-sidebar-content" }>
				{ props.children }
			</div>
		</div>
	);
};