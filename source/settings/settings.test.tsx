import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableTest = [
	{
		title: "Settings::Module::RoutesToggles", key: "Toggles", icon: <Icons.aircraft1/>,
		list: [
			{ key: "LayersModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Layers:LayersModuleDefault", type: "bool", value: true },
			{ key: "AircraftModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Aircraft:AircraftModuleDefault", type: "bool", value: true },
			{ key: "Aircraft2ModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Aircraft2:Aircraft2ModuleDefault", type: "bool", value: true },
			{ key: "AirwaysModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Airways:AirwaysModuleDefault", type: "bool", value: true },
			{ key: "AirportsModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Airports:AirportsModuleDefault", type: "bool", value: true },
			{ key: "SectorsModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Sectors:SectorsModuleDefault", type: "bool", value: true },
			{ key: "RunwaysModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Runways:RunwaysModuleDefault", type: "bool", value: true },
			{ key: "RaimModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Raim:RaimModuleDefault", type: "bool", value: true },
			{ key: "MobileADSBModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:MobileADSB:MobileADSBModuleDefault", type: "bool", value: true },
			{ key: "BookmarksModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Bookmarks:BookmarksModuleDefault", type: "bool", value: true },
			{ key: "RulerModule", title: "Показывать строку в меню слои", desc: "Accessibility:Ruler:RulerModule", type: "bool", value: true },
			{ key: "DayNightModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:DayNight:DayNightModuleDefault", type: "bool", value: true },
			{ key: "GraticuleModuleDefault", title: "Показывать строку в меню слои", desc: "Accessibility:Graticule:GraticuleModuleDefault", type: "bool", value: true },
		]
	},
];