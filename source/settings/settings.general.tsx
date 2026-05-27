
import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableGeneral = [
	{ 
		title: "Settings::Module::Language", key: "Language", icon: <Icons.language/>, 
		list: [
			{ key: "EnabledLanguages", title: "General::Language::EnabledLanguages", desc: "General::Language::EnabledLanguages::Desc", type: "list", 
				value: { list: [ "ru", "en" ], defaultValue: "en" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
				},
				params: [
					{ title: "General::Language::EnabledLanguages::ru", value: "ru" },
					{ title: "General::Language::EnabledLanguages::en", value: "en" },
					{ title: "General::Language::EnabledLanguages::kz", value: "kz" }
				]
			},			
			{ key: "CurrentLanguage", title: "General::Language::CurrentLanguage", desc: "General::Language::CurrentLanguage::Desc", type: "select", 
				value: "en",
				button: "General::Language::CurrentLanguage::Button",
				secure: "General::Language::EnabledLanguages",
				icon: <Icons.language/>,
				params: [
					{ title: "General::Language::CurrentLanguage::ru", value: "ru" },
					{ title: "General::Language::CurrentLanguage::en", value: "en" },
					{ title: "General::Language::CurrentLanguage::kz", value: "kz" }
				]
			},
			{ key: "AllowLanguageSelection", title: "General::Language::AllowLanguageSelection", desc: "General::Language::AllowLanguageSelection::Desc", type: "bool", value: true },
		]
	},
	{
		title: "Settings::Module::Theme", key: "Theme", icon: <Icons.paintformat/>,
		list: [
			{ key: "CurrentTheme", title: "General::Theme::CurrentTheme",
				desc: "General::Theme::CurrentTheme::Desc",
				type: "theme",
				value: "default",
				icon: <Icons.paintformat/>,
				params: [
					{ title: "General::Theme::CurrentTheme::white", value: "white" },
					{ title: "General::Theme::CurrentTheme::dark", value: "dark" },
					{ title: "General::Theme::CurrentTheme::cold", value: "cold" },
					{ title: "General::Theme::CurrentTheme::purple", value: "purple" },
					{ title: "General::Theme::CurrentTheme::marine", value: "marine" },
				]
			},
		]
	},	
	{
		title: "Settings::Module::Mouse", key: "Mouse", icon: <Icons.mousewheel/>, 
		list: [
			{ key: "MouseWheelOrientationEnabled", title: "General::Mouse::MouseWheelOrientationEnabled",
				desc: "General::Mouse::MouseWheelOrientationEnabled::Desc",
				type: "list",
				value: { list: [ "Standart", "Inverse" ], defaultValue: "Standart" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
				},
				params: [
					{ title: "General::Mouse::MouseWheelOrientationEnabled::Standart", value: "Standart" },
					{ title: "General::Mouse::MouseWheelOrientationEnabled::Inverse", value: "Inverse" }
				]
			},
			{ key: "CurrentMouseWheelOrientation",
				title: "General::Mouse::CurrentMouseWheelOrientation",
				desc: "General::Mouse::CurrentMouseWheelOrientation::Desc", type: "select", 
				value: "Standart",
				secure: "General::Mouse::MouseWheelOrientationEnabled",
				icon: <Icons.mousewheel/>,
				params: [
					{ title: "General::Mouse::CurrentMouseWheelOrientation::Standart", value: "Standart" },
					{ title: "General::Mouse::CurrentMouseWheelOrientation::Inverse", value: "Inverse" }
				]
			},			
		] 
	},
	{
		title: "Settings::Module::SideBar", key: "SideBar", icon: <Icons.paintformat/>,
		list: [
			{ key: "SideBarExpand", title: "General::SideBar::SideBarExpand", desc: "General::SideBar::SideBarExpand::Desc", type: "bool", value: true },
			{ key: "SearchBarEnabled", title: "General::SideBar::SearchBarEnabled", desc: "General::SideBar::SearchBarEnabled::Desc", type: "bool", value: true },
		]
	},
	{
		title: "Settings::Module::Others", key: "Others", icon: <Icons.other/>,
		list: [
			{ key: "Version", title: "General::Others::Version", desc: "General::Others::Version::Desc", type: "bool", value: false },
			{ key: "LiveUpdates", title: "General::Others::LiveUpdates", desc: "General::Others::LiveUpdates::Desc", type: "bool", value: true },
			//{ key: "Points", title: "Grid::Settings::Points", desc: "Grid::Settings::Points::Desc", type: "ranges", value: [ 1.0 ], params: { min: 0, max: 10, step: 0.01, grid: true, float: true, single: true } },
			//{ key: "Points1", title: "Grid::Settings::Points", desc: "Grid::Settings::Points::Desc", type: "ranges", value: [ [ 1.0, 3.0 ], [ 5.0, 9.0 ] ], params: { min: 0, max: 10, step: 0.01, grid: true, float: true } },
			//{ key: "Points2", title: "Grid::Settings::Points", desc: "Grid::Settings::Points::Desc", type: "ranges", value: [ [ 4.0, 6.0 ], [ 5.0, 10.0 ], [ 1.0, 2.0 ] ], params: { min: 0, max: 10, step: 0.01, grid: true, float: true, multi: true } },
		]
	}
];