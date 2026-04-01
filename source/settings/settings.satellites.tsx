import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableSatellites = [
	{
		title: "Settings::Module::SatellitesToggles", key: "Toggles", icon: <Icons.satellite2/>,
		list: [

			{ key: "LayerEnabled", title: "Satellites::Toggles::LayerEnabled", desc: "Satellites::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			//{ key: "Current", title: "Satellites::Toggles::Current", desc: "Satellites::Toggles::Current::Desc", type: "bool", button: "Satellites::Toggles::Current::Button", value: true },
		
			{ key: "LayerBarEnabled", title: "Satellites::Toggles::LayerBarEnabled", desc: "Satellites::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "Satellites::Toggles::LayerBarList", type: "list", 
				value: { list: [ "Off", "GNSS", "Glonass", "GPS", "BeyDou", "Galileo" ], defaultValue: "Glonass" },
				extra: {
					sortable: true,
					headerless: true,
					hasDefault: true
				},
				params: [
					{ title: "Satellites::Toggles::LayerBarList::Off", value: "Off", defaultIgnored: true },
					{ title: "Satellites::Toggles::LayerBarList::GNSS", value: "GNSS" },
					{ title: "Satellites::Toggles::LayerBarList::Glonass", value: "Glonass" },
					{ title: "Satellites::Toggles::LayerBarList::GPS", value: "GPS" },
					{ title: "Satellites::Toggles::LayerBarList::BeyDou", value: "BeyDou" },
					{ title: "Satellites::Toggles::LayerBarList::Galileo", value: "Galileo" },
				]
			},	
			{ key: "LayerBarCurrent", title: "Satellites::Toggles::LayerBarCurrent", desc: "Satellites::Toggles::LayerBarCurrent::Desc", type: "select", 
				button: "Satellites::Toggles::Current::Button",
				value: "Glonass",
				secure: "Satellites:Toggles:LayerBarList",
				icon: <Icons.satellite2/>,
				params: [
					{ title: "Satellites::Toggles::LayerBarList::Off", value: "Off", defaultIgnored: true },
					{ title: "Satellites::Toggles::LayerBarList::GNSS", value: "GNSS" },
					{ title: "Satellites::Toggles::LayerBarList::Glonass", value: "Glonass" },
					{ title: "Satellites::Toggles::LayerBarList::GPS", value: "GPS" },
					{ title: "Satellites::Toggles::LayerBarList::BeyDou", value: "BeyDou" },
					{ title: "Satellites::Toggles::LayerBarList::Galileo", value: "Galileo" },
				]
			},			
			{ key: "TopBar", title: "Satellites::Toggles::TopBar", desc: "Satellites::Toggles::TopBar::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Satellites::Toggles::TopBar::never", value: "never" },
					{ title: "Satellites::Toggles::TopBar::always", value: "always" },
					{ title: "Satellites::Toggles::TopBar::auto", value: "auto" },
				]
			},		



			{ key: "AngleList", title: "Satellites::Toggles::AngleList", type: "list", 
				value: { list: [ "0", "5", "10", "15" ], defaultValue: "10" },
				extra: {
					headerless: true,
					hasDefault: true
				},
				params: [
					{ title: "Satellites::Toggles::AngleList::0", value: "0" },
					{ title: "Satellites::Toggles::AngleList::5", value: "5" },
					{ title: "Satellites::Toggles::AngleList::10", value: "10" },
					{ title: "Satellites::Toggles::AngleList::15", value: "15" },
				]
			},	
			{ key: "AngleCurrent", title: "Satellites::Toggles::AngleCurrent", desc: "Satellites::Toggles::AngleCurrent::Desc", type: "select", 
				button: "Satellites::Toggles::Current::Button",
				value: "Glonass",
				secure: "Satellites:Toggles:AngleList",
				params: [
					{ title: "Satellites::Toggles::AngleList::0", value: "0" },
					{ title: "Satellites::Toggles::AngleList::5", value: "5" },
					{ title: "Satellites::Toggles::AngleList::10", value: "10" },
					{ title: "Satellites::Toggles::AngleList::15", value: "15" },
				]
			},	


		]
	},	

	{
		title: "Settings::Module::SatellitesSettings", key: "Settings", tab: "Settings::Module::SatellitesSettings", icon: <Icons.cog/>,
		list: [

			{ key: "Constellations", title: "Satellites::Settings::Constellations", desc: "Satellites::Settings::Constellations::Desc", type: "bool", value: true },
			{ key: "ShowForma", title: "Satellites::Settings::ShowForma", desc: "Satellites::Settings::ShowForma::Desc", type: "bool", value: true },
			{ key: "ShowCount", title: "Satellites::Settings::ShowCount", desc: "Satellites::Settings::ShowCount::Desc", type: "bool", value: true },
			{ key: "SideBarExpandSatellites", title: "Satellites::Settings::SideBarExpandSatellites", desc: "Satellites::Settings::SideBarExpandSatellites::Desc", type: "bool", value: true },
			{ key: "SideBarExpandZones", title: "Satellites::Settings::SideBarExpandZones", desc: "Satellites::Settings::SideBarExpandZones::Desc", type: "bool", value: true },

		]
	}

];