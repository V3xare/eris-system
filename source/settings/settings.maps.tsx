import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableMaps = [
	{
		title: "Settings::Module::MapsToggles", key: "Toggles", icon: <Icons.map1/>,
		list: [

			{ key: "LayerEnabled", title: "Maps::Toggles::LayerEnabled", desc: "Maps::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			//{ key: "MapEnabled", title: "Maps::Toggles::MapEnabled", desc: "Maps::Toggles::MapEnabled::Desc", type: "bool", value: true },
		
			{ key: "LayerBarEnabled", title: "Maps::Toggles::LayerBarEnabled", desc: "Maps::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "Maps::Toggles::LayerBarList", type: "list", 
				value: { list: [ "None", "OsmLocal", "OsmDark", "GoogleWeb", "YandexWeb" ], defaultValue: "OsmLocal" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
				},
				params: [
					{ title: "Maps::Toggles::LayerBarList::None", value: "None", defaultIgnored: true },
					{ title: "Maps::Toggles::LayerBarList::OsmLocal", value: "OsmLocal" },
					{ title: "Maps::Toggles::LayerBarList::OsmDark", value: "OsmDark" },
					{ title: "Maps::Toggles::LayerBarList::GoogleWeb", value: "GoogleWeb" },
					{ title: "Maps::Toggles::LayerBarList::YandexWeb", value: "YandexWeb" }
				]
			},	
			{ key: "LayerBarCurrent", title: "Maps::Toggles::LayerBarCurrent", desc: "Maps::Toggles::LayerBarCurrent::Desc", type: "select",
				button: "Maps::Toggles::Current::Button",
				value: "OsmLocal",
				secure: "Maps:Toggles:LayerBarList",
				icon: <Icons.map1/>,
				params: [
					{ title: "Maps::Toggles::LayerBarList::None", value: "None", defaultIgnored: true },
					{ title: "Maps::Toggles::LayerBarList::OsmLocal", value: "OsmLocal" },
					{ title: "Maps::Toggles::LayerBarList::OsmDark", value: "OsmDark" },
					{ title: "Maps::Toggles::LayerBarList::GoogleWeb", value: "GoogleWeb" },
					{ title: "Maps::Toggles::LayerBarList::YandexWeb", value: "YandexWeb" }
				]
			},


			{ key: "ZoomIntervalEnabled", title: "Maps::Toggles::ZoomIntervalEnabled", desc: "Maps::Toggles::ZoomIntervalEnabled::Desc", type: "bool", value: true },
			{ key: "ZoomInterval", title: "Maps::Toggles::ZoomInterval", desc: "Maps::Toggles::ZoomInterval::Desc", type: "ranges", value: [ 5, 16 ], params: { min: 1, max: 24, pairs: true, grid: true, single: true } },
			
			{ key: "ZoomShowBar", title: "Maps::Toggles::ZoomShowBar", desc: "Maps::Toggles::ZoomShowBar::Desc", type: "bool", value: true },

			{ key: "SideBarExpand", title: "Maps::Toggles::SideBarExpand", desc: "Maps::Toggles::SideBarExpand::Desc", type: "bool", value: false },
		
		]
	},	
];