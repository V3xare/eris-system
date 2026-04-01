import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableMeasurementsTools = [
	{
		title: "Settings::Module::MeasurementsToolsToggles", key: "Toggles", icon: <Icons.measurements4/>,
		list: [

			{ key: "LayerEnabled", title: "MeasurementsTools::Toggles::LayerEnabled", desc: "MeasurementsTools::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "MeasurementsTools::Toggles::LayerSettingsEnabled", desc: "MeasurementsTools::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarEnabled", title: "MeasurementsTools::Toggles::LayerBarEnabled", desc: "MeasurementsTools::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "MeasurementsTools::Toggles::LayerBarList", type: "list", 
				value: { list: [ "Ruler", "Square", "Off" ], defaultValue: "Ruler" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
				},
				params: [
					{ title: "MeasurementsTools::Toggles::LayerBarList::Ruler", value: "Ruler" },
					{ title: "MeasurementsTools::Toggles::LayerBarList::Square", value: "Square" },
					{ title: "MeasurementsTools::Toggles::LayerBarList::Off", value: "Off", defaultIgnored: true },
				]
			},	
			{ key: "LayerBarCurrent", title: "MeasurementsTools::Toggles::LayerBarCurrent", desc: "MeasurementsTools::Toggles::LayerBarCurrent::Desc", type: "select",
				button: "MeasurementsTools::Toggles::LayerBarCurrent::Button",
				value: "Off",
				secure: "MeasurementsTools:Toggles:LayerBarList",
				bindless: true,
				icon: <Icons.map1/>,
				params: [
					{ title: "MeasurementsTools::Toggles::LayerBarList::Ruler", value: "Ruler" },
					{ title: "MeasurementsTools::Toggles::LayerBarList::Square", value: "Square" },
					{ title: "MeasurementsTools::Toggles::LayerBarList::Off", value: "Off", defaultIgnored: true },
				]
			},

			{ key: "TopBar", title: "MeasurementsTools::Toggles::TopBar", desc: "MeasurementsTools::Toggles::TopBar::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "MeasurementsTools::Toggles::TopBar::never", value: "never" },
					{ title: "MeasurementsTools::Toggles::TopBar::always", value: "always" },
					{ title: "MeasurementsTools::Toggles::TopBar::auto", value: "auto" },
				]
			},			

		]
	},	
	{
		title: "Settings::Module::MeasurementsToolsSettings", key: "Settings", tab: "Settings::Module::MeasurementsToolsSettings::Tab", icon: <Icons.cog/>,
		list: [

			{ key: "ExpandedForma", title: "MeasurementsTools::Settings::ExpandedForma", desc: "MeasurementsTools::Settings::ExpandedForma::Desc", type: "bool", value: true },
			{ key: "SideBarMoreInfo", title: "MeasurementsTools::Settings::SideBarMoreInfo", desc: "MeasurementsTools::Settings::SideBarMoreInfo::Desc", type: "bool", value: true },
		
		]
	}	

];