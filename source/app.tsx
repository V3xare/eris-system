import React, { useContext, useMemo, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Notifications, NotificationsContext, NotificationsModuleInit } from "./components/Notifications/notifications";
import { Auth, AuthContext, AuthModuleInit } from "./components/Auth/auth";
import { Build, BuildCommands, BuildSection, BuildSectionItem, BuildTable, BuildTableItem } from "./components/Build/build";
import { BodyContainer } from "./components/Body/body";
import { AppRoute } from "./routes/AppRoute/app.route";
import { AdminRoute } from "./routes/AdminRoute/admin.route";
import { SettingsRoute } from "./routes/SettingsRoute/settings.route";
import { Types } from "./types/types";
import { AdminTable, AdminList } from "./routes/AdminRoute/admin.table";
import { SettingsTable, SettingsList } from "./routes/SettingsRoute/settings.table"
import { Button, LangContext, Column, Row, Props, Select, Icons } from "v-eris";

import "./app.scss"

import EN from "./lang/en"
import ENTest from "./lang/en.test"
import RU from "./lang/ru"

const Languages = {
	"ru": RU,
	"en": EN,
};

export const App = () => {

	const adminSections = useMemo(() => {

		let table = BuildCommands.joinTable( AdminTable, {
			Filesystem2: [{
				key: "Main", title: "Filesystem2", icon: <Icons.fileempty/>,
				list: [
					{ key: "save", type: "button", mini: 1, params: { title: "save" } },
				],
			}],				
		});

		let list = BuildCommands.joinList( AdminList, [
			{ key: "Applications", list: [
				{ title: "Admin::Module::Filesystem2", key: "Filesystem2", route: "filesystem", icon: <Icons.enter/> },		
			]},			
		]);

		return { table: table, list: list };
	}, []);
	
	const settingsSections = useMemo(() => {

		let table = BuildCommands.joinTable( SettingsTable, {
			Lang2: [{ 
					title: "Settings::Module::Language", key: "Lang2", 
					list: [
						{ key: "CurrentLanguage", title: "General::Language::CurrentLanguage", desc: "General::Language::CurrentLanguage::Desc", type: "select", 
							value: "en",
							button: "General::Language::CurrentLanguage::Button",
							params: [
								{ title: "General::Language::CurrentLanguage::ru", value: "ru" },
								{ title: "General::Language::CurrentLanguage::en", value: "en" },
								{ title: "General::Language::CurrentLanguage::kz", value: "kz" }
							]
						},
					]
				},],				
		});

		let list = BuildCommands.joinList( SettingsList, [
			{ title: "Settings::Module::Appearance", key: "Appearance", icon: <Icons.image/>, list: [
				{ title: "Settings::Module::Lang2", key: "Lang2", icon: <Icons.command/> },
			]}	
		]);

		return { table: table, list: list };
	}, []);

	return <div>
		<Build 
			languages={{
				"ru": BuildCommands.joinLang( Languages.ru, {} ),
				"en": BuildCommands.joinLang( Languages.en, ENTest ),
			}}
			modules={[
				NotificationsModuleInit,
				AuthModuleInit
			]}
			types={ BuildCommands.joinTypes( Types, {} ) }
			settingsTable={ settingsSections.table }
			routes={{
				"app": { icon: <Icons.earth/>, access: 5, title: "App", element: (<AppRoute/>) },
				"admin": { icon: <Icons.users/>, access: 9, title: "Admin", element: <AdminRoute/>, list: adminSections.list, table: adminSections.table },
				"settings": { icon: <Icons.cog/>, access: 5, title: "Settings", element: <SettingsRoute/>, list: settingsSections.list, table: settingsSections.table },				
			}}
		>

			<Notifications container/>
			<Auth/>
			<BodyContainer/>
			
		</Build>
	</div>;
};