import React, { useContext, useMemo, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Notifications, NotificationsContext, NotificationsModuleInit } from "@components/Notifications/notifications";
import { Auth, AuthContext,AuthModuleInit } from "@components/Auth/auth";
import { Build } from "@components/Build/build";
import { RoutesMenu } from "@components/RoutesMenu/routes.menu";
import { RoutesWrap } from "@components/RoutesWrap/routes.wrap";
import { AdminRoute } from "./routes/AdminRoute/admin.route";
import { SettingsRoute } from "./routes/SettingsRoute/settings.route";
import { Types } from "./types/types";
import { AdminTable, AdminSectionsList } from "./routes/AdminRoute/admin.table";
import { SettingsTable, SettingsList } from "./routes/SettingsRoute/settings.table"
import { Button, LangContext, Column, Row, Props, Select, Icons } from "v-eris";

import "./app.scss"

import EN from "./lang/en"
import RU from "./lang/ru"

const Languages = {
	"ru": RU,
	"en": EN,
};

const Header = Row, Wrap = Row, Footer = Row;

export const BodyContainer = () => {

	return (
		<div className={ "eris-core" }>
			<Wrap flex={ 9 }>
				<RoutesMenu/>
				<RoutesWrap/>
			</Wrap>
		</div>
	);
};

export const App = () => {
	
	return <div>
		<Build 
			languages={{
				"ru": Languages.ru,
				"en": Languages.en,
			}}
			modules={[
				NotificationsModuleInit,
				AuthModuleInit
			]}
			types={ Types }
			settingsTable={ SettingsTable }
			routes={{
				"radar": { icon: <Icons.earth/>, access: 5, title: "Radar", element: (<div>hello 1</div>) },
				"admin": { icon: <Icons.users/>, access: 9, title: "Admin", element: <AdminRoute/>, list: AdminSectionsList, table: AdminTable },
				"settings": { icon: <Icons.cog/>, access: 5, title: "Settings", element: <SettingsRoute/>, list: SettingsList, table: SettingsTable },				
			}}
		>

			<Notifications container/>
			<Auth/>
			<BodyContainer/>
			
		</Build>
	</div>;
};