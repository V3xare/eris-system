import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableForma = [

	{
		title: "Settings::Module::FormaToggles", key: "Toggles", icon: <Icons.form/>,
		list: [

			{ key: "LayerEnabled", title: "Forma::Toggles::LayerEnabled", desc: "Forma::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "DayNight::Toggles::LayerSettingsEnabled", desc: "DayNight::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
		
			{ key: "LayerBarEnabled", title: "Forma::Toggles::LayerBarEnabled", desc: "Forma::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "Forma::Toggles::LayerBarList", button: "Forma::Toggles::LayerBarList::Button", type: "list", 
				value: { list: [ "Avoidance", "Correction" ] },
				icon: <Icons.form/>,
				extra: {
					sortable: true,
					headerless: true
				},
				params: [
					{ title: "Forma::Toggles::LayerBarList::Avoidance", value: "Avoidance" },
					{ title: "Forma::Toggles::LayerBarList::Correction", value: "Correction" },
				]
			},	

			{ key: "TopBar", title: "Forma::Toggles::TopBar", desc: "Forma::Toggles::TopBar::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Forma::Toggles::TopBar::never", value: "never" },
					{ title: "Forma::Toggles::TopBar::always", value: "always" },
					{ title: "Forma::Toggles::TopBar::auto", value: "auto" },
				]
			},			

		]
	},	

	{
		title: "Settings::Module::FormaSettings", key: "Settings", tab: "Settings::Module::FormaSettings", icon: <Icons.cog/>,
		list: [

			{ key: "TooltipCollisionAvoidanceEnabled", title: "Forma::Settings::TooltipCollisionAvoidanceEnabled", desc: "Forma::Settings::TooltipCollisionAvoidanceEnabled::Desc", type: "bool", value: true },
			{ key: "TooltipSmartCorrectionEnabled", title: "Forma::Settings::TooltipSmartCorrectionEnabled", desc: "Forma::Settings::TooltipSmartCorrectionEnabled::Desc", type: "bool", value: true },
			{ key: "TooltipDistance", title: "Forma::Settings::TooltipDistance", desc: "Forma::Settings::TooltipDistance::Desc", type: "ranges", value: 50, params: { min: 1, max: 300, single: true } },
			{ key: "TooltipSmartCorrectionDelay", title: "Forma::Settings::TooltipSmartCorrectionDelay", desc: "Forma::Settings::TooltipSmartCorrectionDelay::Desc", type: "ranges", value: 4, params: { min: 0, max: 20, single: true } },
			{ key: "TooltipSmartCorrectionTime", title: "Forma::Settings::TooltipSmartCorrectionTime", desc: "Forma::Settings::TooltipSmartCorrectionTime::Desc", type: "ranges", value: 3, params: { min: 0, max: 20, single: true } },
			{ key: "TooltipFlipTime", title: "Forma::Settings::TooltipFlipTime", desc: "Forma::Settings::TooltipFlipTime::Desc", type: "ranges", value: 200, params: { min: 0, max: 1000, single: true } },
		
		]
	}

];