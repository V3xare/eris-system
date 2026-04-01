import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableADSBLocators = [
	{
		title: "Settings::Module::ADSBLocatorsToggles", key: "Toggles", icon: <Icons.receiver2/>,
		list: [

			{ key: "LayerEnabled", title: "ADSBLocators::Toggles::LayerEnabled", desc: "ADSBLocators::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "ADSBLocators::Toggles::LayerSettingsEnabled", desc: "ADSBLocators::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			//{ key: "QAButtonEnabled", title: "ADSBLocators::Toggles::QAButtonEnabled", desc: "ADSBLocators::Toggles::QAButtonEnabled::Desc", type: "bool", value: false },
			//{ key: "Current", title: "ADSBLocators::Toggles::Current", desc: "ADSBLocators::Toggles::Current::Desc", button: "ADSBLocators::Toggles::Current::Button", type: "bool", value: true, icon: <Icons.receiver2/> },

			{ key: "LayerBarEnabled", title: "ADSBLocators::Toggles::LayerBarEnabled", desc: "ADSBLocators::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "ADSBLocators::Toggles::LayerBarList", type: "list", 
				value: { list: [ "ADSReceiver", "TrackingZone", "OperationalZone", "RangeRings", "Grid" ], defaultValue: "ADSReceiver" },
				extra: {
					//sortable: true,
					hasDefault: true,
					headerless: true,
				},
				params: [
					{ title: "ADSBLocators::Toggles::LayerBarList::ADSReceiver", value: "ADSReceiver", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::TrackingZone", value: "TrackingZone", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::OperationalZone", value: "OperationalZone", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::RangeRings", value: "RangeRings", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::Grid", value: "Grid", icon: <Icons.receiver2/> },
				]
			},	
			{ key: "LayerBarCurrent", title: "ADSBLocators::Toggles::LayerBarCurrent", desc: "ADSBLocators::Toggles::LayerBarCurrent::Desc", type: "list", 
				value: { list: [ "ADSReceiver" ] },
				extra: {
					sortable: true,
					headerless: true,
				},
				icon: <Icons.receiver2/>,
				button: "ADSBLocators::Toggles::Current::Button",
				secure: "ADSBLocators:Toggles:LayerBarList",
				params: [
					{ title: "ADSBLocators::Toggles::LayerBarList::ADSReceiver", value: "ADSReceiver", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::TrackingZone", value: "TrackingZone", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::OperationalZone", value: "OperationalZone", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::RangeRings", value: "RangeRings", icon: <Icons.receiver2/> },
					{ title: "ADSBLocators::Toggles::LayerBarList::Grid", value: "Grid", icon: <Icons.receiver2/> },
				]
			},

		]
	},

	{
		title: "Settings::Module::ADSBLocatorsSettings", key: "Settings", tab: "Settings::Module::ADSBLocatorsSettings::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "SeparateMarks", title: "ADSBLocators::Settings::SeparateMarks", desc: "ADSBLocators::Settings::SeparateMarks::Desc", type: "bool", value: true },		
			{ key: "Measurements", title: "ADSBLocators::Settings::Measurements", desc: "ADSBLocators::Settings::Measurements::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "ADSBLocators::Settings::Measurements::auto", value: "auto" },
					{ title: "ADSBLocators::Settings::Measurements::kilometers", value: "kilometers" },
					{ title: "ADSBLocators::Settings::Measurements::miles", value: "miles" },
				]
			},	
			{ key: "RingStep500", title: "ADSBLocators::Settings::RingStep500", desc: "ADSBLocators::Settings::RingStep500::Desc", type: "select", 
				value: "10",
				params: [
					{ title: "ADSBLocators::Settings::RingStep500::0", value: "0" },
					{ title: "ADSBLocators::Settings::RingStep500::2", value: "2" },
					{ title: "ADSBLocators::Settings::RingStep500::10", value: "10" },
					{ title: "ADSBLocators::Settings::RingStep500::30", value: "30" },
				]
			},				
			{ key: "RingStep250", title: "ADSBLocators::Settings::RingStep250", desc: "ADSBLocators::Settings::RingStep250::Desc", type: "select", 
				value: "5",
				params: [
					{ title: "ADSBLocators::Settings::RingStep250::0", value: "0" },
					{ title: "ADSBLocators::Settings::RingStep250::1", value: "1" },
					{ title: "ADSBLocators::Settings::RingStep250::5", value: "5" },
					{ title: "ADSBLocators::Settings::RingStep250::10", value: "10" },
				]
			},				
			{ key: "Azimuth", title: "ADSBLocators::Settings::Azimuth", desc: "ADSBLocators::Settings::Azimuth::Desc", type: "select", 
				value: "10",
				params: [
					{ title: "ADSBLocators::Settings::Azimuth::0", value: "0" },
					{ title: "ADSBLocators::Settings::Azimuth::2", value: "2" },
					{ title: "ADSBLocators::Settings::Azimuth::10", value: "10" },
					{ title: "ADSBLocators::Settings::Azimuth::30", value: "30" },
				]
			},			
			{ key: "FontSize", title: "ADSBLocators::Settings::FontSize", desc: "ADSBLocators::Settings::FontSize::Desc", type: "ranges", value: 1, params: { min: -3, max: 3, grid: true, single: true } },		
		]
	},	

	{
		title: "Settings::Module::ADSBLocatorsProperties", key: "Properties", tab: "Settings::Module::ADSBLocatorsProperties::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "List", title: "ADSBLocators::Properties::List", type: "locators", 
				query: { route: "locators" },
				value: { 
					LayerEnabled: true, 
					OpacityEnabled: true, 
					Opacity: 50, 
					MarksColorEnabled: true,
					MarksColor: "#be46d1",
					MarksShadowEnabled: true,
					MarksShadow: "#be46d1",
					GridEnabled: true,
				} 
			},					
		]
	},

	{
		title: "Settings::Module::ADSBLocatorsFilters", key: "Filters", tab: "Settings::Module::ADSBLocatorsFilters::Tab", icon: <Icons.cog/>,
		list: [
			{ key: "Locators", title: "ADSBLocators::Filters::Locators", type: "locatorsToggles", 
				query: { route: "locators" },
				value: { 
					Active: false 
				},
				extra: {
					headerless: true,
					prefix: 80,
				},
				secure: "ADSBLocators:Properties:List",
				params: []
			},						
		],
	},

];