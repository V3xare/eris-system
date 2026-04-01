import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableRoutes = [
	{
		title: "Settings::Module::RoutesToggles", key: "Toggles", icon: <Icons.road2/>,
		list: [
			{ key: "LayerEnabled", title: "Routes::Toggles::LayerEnabled", desc: "Routes::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "Routes::Toggles::LayerSettingsEnabled", desc: "Routes::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "QAButtonEnabled", title: "Routes::Toggles::QAButtonEnabled", desc: "Routes::Toggles::QAButtonEnabled::Desc", type: "bool", value: false },
			{ key: "Current", title: "Routes::Toggles::Current", desc: "Routes::Toggles::Current::Desc", type: "bool", button: "Routes::Toggles::Current::Button", value: true, icon: <Icons.road2/> },
			{ key: "ExpandedForma", title: "Routes::Toggles::ExpandedForma", desc: "Routes::Toggles::ExpandedForma::Desc", type: "bool", value: true },
			{ key: "SideBarExpand", title: "Routes::Toggles::SideBarExpand", desc: "Routes::Toggles::SideBarExpand::Desc", type: "bool", value: true },
		]
	},
	{
		title: "Settings::Module::RoutesSettings", key: "Settings", tab: "Settings::Module::RoutesSettings", icon: <Icons.cog/>,
		list: [
			{ key: "WAYTYPE", title: "Routes::Settings::WAYTYPE", desc: "Routes::Settings::WAYTYPE::Desc", type: "list", 
				value: { list: [ "0", "1", "3", "4", "9" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Routes::Settings::WAYTYPE::0", value: "0" },
					{ title: "Routes::Settings::WAYTYPE::1", value: "1" },
					{ title: "Routes::Settings::WAYTYPE::3", value: "3" },
					{ title: "Routes::Settings::WAYTYPE::4", value: "4" },
					{ title: "Routes::Settings::WAYTYPE::9", value: "9" }
				]
			},		
			{ key: "ISINAIP", title: "Routes::Settings::ISINAIP", desc: "Routes::Settings::ISINAIP::Desc", type: "bool", value: true },
			{ key: "ISCROSPOLAR", title: "Routes::Settings::ISCROSPOLAR", desc: "Routes::Settings::ISCROSPOLAR::Desc", type: "bool", value: true },
			{ key: "ISTRANSPOLAR", title: "Routes::Settings::ISTRANSPOLAR", desc: "Routes::Settings::ISTRANSPOLAR::Desc", type: "bool", value: true },
			{ key: "ISTRANSSIBIR", title: "Routes::Settings::ISTRANSSIBIR", desc: "Routes::Settings::ISTRANSSIBIR::Desc", type: "bool", value: true },
			{ key: "ISTRANSAZIA", title: "Routes::Settings::ISTRANSAZIA", desc: "Routes::Settings::ISTRANSAZIA::Desc", type: "bool", value: true },
			{ key: "ISAZIA", title: "Routes::Settings::ISAZIA", desc: "Routes::Settings::ISAZIA::Desc", type: "bool", value: true },
			{ key: "ISZONAL", title: "Routes::Settings::ISZONAL", desc: "Routes::Settings::ISZONAL::Desc", type: "bool", value: true },
			{ key: "ISCOMPLETION", title: "Routes::Settings::ISCOMPLETION", desc: "Routes::Settings::ISCOMPLETION::Desc", type: "bool", value: true },
			{ key: "MAXCOUNTMAH", title: "Routes::Settings::MAXCOUNTMAH", desc: "Routes::Settings::MAXCOUNTMAH::Desc", type: "bool", value: true },
			{ key: "MINCOUNTMAH", title: "Routes::Settings::MINCOUNTMAH", desc: "Routes::Settings::MINCOUNTMAH::Desc", type: "bool", value: true },
			{ key: "ISTRANSFERPOINT", title: "Routes::Settings::ISTRANSFERPOINT", desc: "Routes::Settings::ISTRANSFERPOINT::Desc", type: "bool", value: true },

			{ key: "ISMVL", title: "Routes::Settings::ISMVL", desc: "Routes::Settings::ISMVL::Desc", type: "list", 
				value: { list: [ "0", "1" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Routes::Settings::ISMVL::0", value: "0" },
					{ title: "Routes::Settings::ISMVL::1", value: "1" },
				]
			},	

			{ key: "ISINARZ", title: "Routes::Settings::ISINARZ", desc: "Routes::Settings::ISINARZ::Desc", type: "bool", value: true },
			{ key: "ISOUTARZ", title: "Routes::Settings::ISOUTARZ", desc: "Routes::Settings::ISOUTARZ::Desc", type: "bool", value: true },
			{ key: "ISPNTRA", title: "Routes::Settings::ISPNTRA", desc: "Routes::Settings::ISPNTRA::Desc", type: "bool", value: true },
			{ key: "ISPNTAIRWAY", title: "Routes::Settings::ISPNTAIRWAY", desc: "Routes::Settings::ISPNTAIRWAY::Desc", type: "bool", value: true },

		]
	}
];