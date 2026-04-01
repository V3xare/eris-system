import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableDayNight = [
	{
		title: "Settings::Module::DayNightToggles", key: "Toggles", icon: <Icons.dayNight/>,
		list: [
			{ key: "LayerEnabled", title: "DayNight::Toggles::LayerEnabled", desc: "DayNight::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "Current", title: "DayNight::Toggles::Current", desc: "DayNight::Toggles::Current::Desc", type: "bool", button: "DayNight::Toggles::Current::Button", value: true, icon: <Icons.dayNight/> },
			{ key: "LayerSettingsEnabled", title: "DayNight::Toggles::LayerSettingsEnabled", desc: "DayNight::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
		]
	},	
	{
		title: "Settings::Module::DayNightSettings", key: "Settings", tab: "Settings::Module::DayNightSettings::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "ZoomOnStart", title: "DayNight::Settings::ZoomOnStart", desc: "DayNight::Settings::ZoomOnStart::Desc", type: "bool", value: true },
			{ key: "ZoomIntervalStart", title: "DayNight::Settings::ZoomIntervalStart", desc: "DayNight::Settings::ZoomIntervalStart::Desc", type: "ranges", value: [ 3, 6 ], params: { min: 1, max: 24, pairs: true, grid: true, single: true } },
			{ key: "ZoomBreak", title: "DayNight::Settings::ZoomBreak", desc: "DayNight::Settings::ZoomBreak::Desc", type: "bool", value: true },
			{ key: "ZoomIntervalBreak", title: "DayNight::Settings::ZoomIntervalBreak", desc: "DayNight::Settings::ZoomIntervalBreak::Desc", type: "ranges", value: [ 3, 9 ], params: { min: 1, max: 24, pairs: true, grid: true, single: true } },
		]
	}
];