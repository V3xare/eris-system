import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTablePorts = [
	{
		title: "Settings::Module::PortsToggles", key: "Toggles", icon: <Icons.office/>,
		list: [
			{ key: "LayerEnabled", title: "Ports::Toggles::LayerEnabled", desc: "Ports::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "Ports::Toggles::LayerSettingsEnabled", desc: "Ports::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "QAButtonEnabled", title: "Ports::Toggles::QAButtonEnabled", desc: "Ports::Toggles::QAButtonEnabled::Desc", type: "bool", value: false },
			{ key: "Current", title: "Ports::Toggles::Current", desc: "Ports::Toggles::Current::Desc", type: "bool", button: "Ports::Toggles::Current::Button", value: true, icon: <Icons.office/> },
			{ key: "ExpandedForma", title: "Ports::Toggles::ExpandedForma", desc: "Ports::Toggles::ExpandedForma::Desc", type: "bool", value: true },
			{ key: "SideBarExpand", title: "Ports::Toggles::SideBarExpand", desc: "Ports::Toggles::SideBarExpand::Desc", type: "bool", value: true },
		]
	},
	{
		title: "Settings::Module::PortsSettings", key: "Settings", tab: "Settings::Module::PortsSettings", icon: <Icons.cog/>,
		list: [
			{ key: "RunwayThreshold", title: "Ports::Settings::RunwayThreshold", desc: "Ports::Settings::RunwayThreshold::Desc", type: "bool", value: true },
			{ key: "GOSEXP", title: "Ports::Settings::GOSEXP", desc: "Ports::Settings::GOSEXP::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3", "4" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Ports::Settings::GOSEXP::0", value: "0" },
					{ title: "Ports::Settings::GOSEXP::1", value: "1" },
					{ title: "Ports::Settings::GOSEXP::2", value: "2" },
					{ title: "Ports::Settings::GOSEXP::3", value: "3" },
					{ title: "Ports::Settings::GOSEXP::4", value: "4" }
				]
			},		
			{ key: "CIVMILAPRT", title: "Ports::Settings::CIVMILAPRT", desc: "Ports::Settings::CIVMILAPRT::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Ports::Settings::CIVMILAPRT::0", value: "0" },
					{ title: "Ports::Settings::CIVMILAPRT::1", value: "1" },
					{ title: "Ports::Settings::CIVMILAPRT::2", value: "2" },
					{ title: "Ports::Settings::CIVMILAPRT::3", value: "3" },
				]
			},				
			{ key: "USAGETYPEAPRT", title: "Ports::Settings::USAGETYPEAPRT", desc: "Ports::Settings::USAGETYPEAPRT::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Ports::Settings::USAGETYPEAPRT::0", value: "0" },
					{ title: "Ports::Settings::USAGETYPEAPRT::1", value: "1" },
					{ title: "Ports::Settings::USAGETYPEAPRT::2", value: "2" },
					{ title: "Ports::Settings::USAGETYPEAPRT::3", value: "3" },
				]
			},
		]
	}
];