import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableSectors = [
	{
		title: "Settings::Module::SectorsToggles", key: "Toggles", icon: <Icons.sectors/>,
		list: [
			{ key: "LayerEnabled", title: "Sectors::Toggles::LayerEnabled", desc: "Sectors::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "Sectors::Toggles::LayerSettingsEnabled", desc: "Sectors::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "QAButtonEnabled", title: "Sectors::Toggles::QAButtonEnabled", desc: "Sectors::Toggles::QAButtonEnabled::Desc", type: "bool", value: false },
			{ key: "Current", title: "Sectors::Toggles::Current", desc: "Sectors::Toggles::Current::Desc", type: "bool", button: "Sectors::Toggles::Current::Button", value: true, icon: <Icons.sectors/> },
			{ key: "ExpandedForma", title: "Sectors::Toggles::ExpandedForma", desc: "Sectors::Toggles::ExpandedForma::Desc", type: "bool", value: true },
			{ key: "SideBarExpand", title: "Sectors::Toggles::SideBarExpand", desc: "Sectors::Toggles::SideBarExpand::Desc", type: "bool", value: true },
		]
	},
	{
		title: "Settings::Module::SectorsSettings", key: "Settings", tab: "Settings::Module::SectorsSettings::Tab", icon: <Icons.cog/>,
		list: [
		
			{ key: "SPCCLASS_ID", title: "Тип", desc: "Sectors::Settings::SPCCLASS_ID::Desc", type: "list", 
				value: { 
					list: [ 
						"A", 
						"C", 
						"G",
					]
				},
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Sectors::Settings::SPCCLASS_ID::A", value: "A" },
					{ title: "Sectors::Settings::SPCCLASS_ID::C", value: "C" },
					{ title: "Sectors::Settings::SPCCLASS_ID::G", value: "G" },
				]
			},
			{ key: "ISENGLREADY", title: "Sectors::Settings::ISENGLREADY", desc: "Sectors::Settings::ISENGLREADY::Desc", type: "bool", value: true },
			{ key: "ISOFFAIRWAY", title: "Sectors::Settings::ISOFFAIRWAY", desc: "Sectors::Settings::ISOFFAIRWAY::Desc", type: "bool", value: true },
			{ key: "SECNORMATIV", title: "Sectors::Settings::SECNORMATIV", desc: "Sectors::Settings::SECNORMATIV::Desc", type: "bool", value: true },
			{ key: "SECMAXNORMATIV", title: "Sectors::Settings::SECMAXNORMATIV", desc: "Sectors::Settings::SECMAXNORMATIV::Desc", type: "bool", value: true },
		
		]
	},
	{
		title: "Settings::Module::SectorsSpecialSettings", key: "SpecialSettings", tab: "Settings::Module::SectorsSpecialSettings::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "AREATYPE", title: "Sectors::SpecialSettings::AREATYPE", desc: "Sectors::SpecialSettings::AREATYPE::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3", "4", "5", "6" ] },
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Sectors::SpecialSettings::AREATYPE::0", value: "0" },
					{ title: "Sectors::SpecialSettings::AREATYPE::1", value: "1" },
					{ title: "Sectors::SpecialSettings::AREATYPE::2", value: "2" },
					{ title: "Sectors::SpecialSettings::AREATYPE::3", value: "3" },
					{ title: "Sectors::SpecialSettings::AREATYPE::4", value: "4" },
					{ title: "Sectors::SpecialSettings::AREATYPE::5", value: "5" },
					{ title: "Sectors::SpecialSettings::AREATYPE::6", value: "6" },
				]
			}
		]
	},		
];