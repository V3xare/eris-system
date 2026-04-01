import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableADSBMobile = [

	{
		title: "Settings::Module::ADSBMobileToggles", key: "Toggles", icon: <Icons.receiver6/>,
		list: [

			{ key: "LayerEnabled", title: "ADSBMobile::Toggles::LayerEnabled", desc: "ADSBMobile::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "ADSBMobile::Toggles::LayerSettingsEnabled", desc: "ADSBMobile::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "Current", title: "ADSBMobile::Toggles::Current", desc: "ADSBMobile::Toggles::Current::Desc", type: "bool", button: "ADSBMobile::Toggles::Current::Button", value: true, icon: <Icons.receiver6/> },

		]
	},

	{
		title: "Settings::Module::ADSBMobileSelections", key: "Selections", icon: <Icons.cog/>,
		list: [

			{ key: "Identifier", title: "ADSBMobile::Selections::Identifier", desc: "ADSBMobile::Selections::Identifier::Desc", type: "enum", 
				value: "CES243",
				params: [
					{ title: "ADSBMobile::Selections::Identifier::CES243", value: "CES243" },
				]
			},

		]
	},

	{
		title: "Settings::Module::ADSBMobileSettings", key: "Settings", tab: "Settings::Module::ADSBMobileSettings::Tab", icon: <Icons.cog/>,
		list: [

			{ key: "Positioning", title: "ADSBMobile::Settings::Positioning", desc: "ADSBMobile::Settings::Positioning::Desc", type: "bool", value: true },
			{ key: "ShowMarks", title: "ADSBMobile::Settings::ShowMarks", desc: "ADSBMobile::Settings::ShowMarks::Desc", type: "bool", value: true },
			{ key: "AutoZoom", title: "ADSBMobile::Settings::AutoZoom", desc: "ADSBMobile::Settings::AutoZoom::Desc", type: "bool", value: true },

		]
	}

];