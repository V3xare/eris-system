import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableADSBTracking = [
	{
		title: "Settings::Module::ADSBTrackingToggles", key: "Toggles", icon: <Icons.airplane/>,
		list: [

			{ key: "LayerEnabled", title: "ADSBTracking::Toggles::LayerEnabled", desc: "ADSBTracking::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "ADSBTracking::Toggles::LayerSettingsEnabled", desc: "ADSBTracking::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "QAButtonEnabled", title: "ADSBTracking::Toggles::QAButtonEnabled", desc: "ADSBTracking::Toggles::QAButtonEnabled::Desc", type: "bool", value: true },
			//{ key: "Current", title: "ADSBTracking::Toggles::Current", desc: "ADSBTracking::Toggles::Current::Desc", type: "bool", button: "ADSBTracking::Toggles::Current::Button", value: true },
			{ key: "ExpandedForma", title: "ADSBTracking::Toggles::ExpandedForma", desc: "ADSBTracking::Toggles::ExpandedForma::Desc", type: "bool", value: true },


			{ key: "!!!ExpandedForma", title: "!!!!Уведомить", desc: "", type: "bool", value: true },
		
			{ key: "LayerBarEnabled", title: "ADSBTracking::Toggles::LayerBarEnabled", desc: "ADSBTracking::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "ADSBTracking::Toggles::LayerBarList", type: "list", 
				value: { list: [ "off", "on", "archive" ], defaultValue: "on" },
				extra: {
					sortable: true,
					headerless: true,
					hasDefault: true,
				},
				params: [
					{ title: "ADSBTracking::Toggles::LayerBarList::off", value: "off", defaultIgnored: true },
					{ title: "ADSBTracking::Toggles::LayerBarList::on", value: "on" },
					{ title: "ADSBTracking::Toggles::LayerBarList::archive", value: "archive" },
				]
			},	
			{ key: "LayerBarCurrent", title: "ADSBTracking::Toggles::LayerBarCurrent", button: "ADSBTracking::Toggles::Current::Button", desc: "ADSBTracking::Toggles::LayerBarCurrent::Desc", type: "select",
				value: "on",
				secure: "ADSBTracking:Toggles:LayerBarList",
				icon: <Icons.airplane/>,
				params: [
					{ title: "ADSBTracking::Toggles::LayerBarList::off", value: "off", defaultIgnored: true },
					{ title: "ADSBTracking::Toggles::LayerBarList::on", value: "on" },
					{ title: "ADSBTracking::Toggles::LayerBarList::archive", value: "archive" },
				]
			},


			{ key: "SideBarExpand", title: "ADSBTracking::Toggles::SideBarExpand", desc: "ADSBTracking::Toggles::SideBarExpand::Desc", type: "bool", value: true },
			{ key: "SideBarList", title: "ADSBTracking::Toggles::SideBarList", type: "list", 
				value: { list: [ "position", "route", "track", "more" ], defaultValue: "position" },
				extra: {
					sortable: true,
					headerless: true,
					hasDefault: true,
				},
				params: [
					{ title: "ADSBTracking::Toggles::SideBarList::position", value: "position" },
					{ title: "ADSBTracking::Toggles::SideBarList::route", value: "route" },
					//{ title: "ADSBTracking::Toggles::SideBarList::ADSB", value: "ADSB" },
					{ title: "ADSBTracking::Toggles::SideBarList::track", value: "track" },
					{ title: "ADSBTracking::Toggles::SideBarList::more", value: "more" }
				]
			},				
		]
	},
	{
		title: "Settings::Module::ADSBTrackingSpecialSettings", key: "SpecialSettings", tab: "Settings::Module::ADSBTrackingSpecialSettings::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "LetterMark", title: "ADSBTracking::SpecialSettings::LetterMark", desc: "ADSBTracking::SpecialSettings::LetterMark::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3" ] },
				extra: {
					headerless: true
				},
				params: [
					{ title: "ADSBTracking::SpecialSettings::LetterMark::0", value: "0" },
					{ title: "ADSBTracking::SpecialSettings::LetterMark::1", value: "1" },
					{ title: "ADSBTracking::SpecialSettings::LetterMark::2", value: "2" },
					{ title: "ADSBTracking::SpecialSettings::LetterMark::3", value: "3" },
				]
			},
			{ key: "DetectionMode", title: "ADSBTracking::SpecialSettings::DetectionMode", desc: "ADSBTracking::SpecialSettings::DetectionMode::Desc", type: "list", 
				value: { list: [ "0", "1", "2", "3", "4", "5" ] },
				extra: {
					headerless: true
				},
				params: [
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::0", value: "0" },
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::1", value: "1" },
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::2", value: "2" },
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::3", value: "3" },
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::4", value: "4" },
					{ title: "ADSBTracking::SpecialSettings::DetectionMode::5", value: "5" },
				]
			}
		]
	},				
	{
		title: "Settings::Module::ADSBTrackingSettings", key: "Settings", tab: "Settings::Module::ADSBTrackingSettings::Tab", icon: <Icons.cog/>,
		list: [
		
			{ key: "ADSCATEGORY", title: "ADSBTracking::Settings::ADSCATEGORY", desc: "ADSBTracking::Settings::ADSCATEGORY::Desc", type: "list", 
				value: { 
					list: [ 
						"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
						"10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
						"20", "21", "22", "23", "24"
					]
				},
				extra: {
					headerless: true
				},
				params: [
					{ title: "ADSBTracking::Settings::ADSCATEGORY::0", value: "0" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::1", value: "1" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::2", value: "2" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::3", value: "3" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::4", value: "4" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::5", value: "5" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::6", value: "6" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::7", value: "7" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::8", value: "8" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::9", value: "9" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::10", value: "10" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::11", value: "11" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::12", value: "12" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::13", value: "13" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::14", value: "14" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::15", value: "15" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::16", value: "16" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::17", value: "17" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::18", value: "18" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::19", value: "19" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::20", value: "20" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::21", value: "21" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::22", value: "22" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::23", value: "23" },
					{ title: "ADSBTracking::Settings::ADSCATEGORY::24", value: "24" },
				]
			},
			{ key: "Altitude", title: "ADSBTracking::Settings::Altitude", desc: "ADSBTracking::Settings::Altitude::Desc", type: "ranges", value: [ 3000, 7000 ], params: { min: 0, max: 20000, pairs: true, single: true } },
			{ key: "Heading", title: "ADSBTracking::Settings::Heading", desc: "ADSBTracking::Settings::Heading::Desc", type: "ranges", value: [ 180, 270 ], params: { min: 0, max: 360, pairs: true, single: true } },
			{ key: "GroundSpeed", title: "ADSBTracking::Settings::GroundSpeed", desc: "ADSBTracking::Settings::GroundSpeed::Desc", type: "ranges", value: [ 1, 2 ], params: { min: 0, max: 2, pairs: true, grid: true, single: true } },
			
		]
	},
	{
		//Change to Settings
		title: "Settings::Module::ADSBTrackingPacketSettings", key: "PacketSettings", tab: "Settings::Module::ADSBTrackingPacketSettings::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "ShowFootprint", title: "ADSBTracking::PacketSettings::ShowFootprint", desc: "ADSBTracking::PacketSettings::ShowFootprint::Desc", type: "bool", value: true },
			{ key: "Quantity", title: "ADSBTracking::PacketSettings::Quantity", desc: "ADSBTracking::PacketSettings::Quantity::Desc", type: "ranges", value: [ 10 ], params: { min: 1, max: 24, single: true } },
		]
	},			
];