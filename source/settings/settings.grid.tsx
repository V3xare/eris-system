import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableGrid = [
	{
		title: "Settings::Module::GridToggles", key: "Toggles", icon: <Icons.sphere/>,
		list: [

			{ key: "LayerEnabled", title: "Grid::Toggles::LayerEnabled", desc: "Grid::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "Grid::Toggles::LayerSettingsEnabled", desc: "Grid::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
			{ key: "Support", title: "Grid::Toggles::Support", desc: "Grid::Toggles::Support::Desc", type: "bool", value: true },
			{ key: "Current", title: "Grid::Toggles::Current", desc: "Grid::Toggles::Current::Desc", type: "bool", button: "Grid::Toggles::Current::Button", value: true, icon: <Icons.sphere/> },
		
			{ key: "LayerBarEnabled", title: "Grid::Toggles::LayerBarEnabled", desc: "Grid::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "Grid::Toggles::LayerBarList", type: "list", 
				value: { list: [ "Support", "Geo" ] },
				extra: {
					sortable: true,
					headerless: true,
				},
				params: [
					{ title: "Grid::Toggles::LayerBarList::Support", value: "Support" },
					{ title: "Grid::Toggles::LayerBarList::Geo", value: "Geo" },
					{ title: "Grid::Toggles::LayerBarList::Lines", value: "Lines" },
				]
			},	

			{ key: "TopBar", title: "Grid::Toggles::TopBar", desc: "Grid::Toggles::TopBar::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Grid::Toggles::TopBar::never", value: "never" },
					{ title: "Grid::Toggles::TopBar::always", value: "always" },
					{ title: "Grid::Toggles::TopBar::auto", value: "auto" },
				]
			},			

		]
	},	
	{
		title: "Settings::Module::GridSettings", key: "Settings", tab: "Settings::Module::GridSettings::Tab", icon: <Icons.cog/>,
		list: [

			{ key: "Lines", title: "Grid::Settings::Lines", desc: "Grid::Settings::Lines::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Grid::Settings::Lines::never", value: "never" },
					{ title: "Grid::Settings::Lines::conditions", value: "conditions" },
					{ title: "Grid::Settings::Lines::auto", value: "auto" },
				]
			},		

			{ key: "Circles", title: "Grid::Settings::Circles", desc: "Grid::Settings::Circles::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Grid::Settings::Circles::never", value: "never" },
					{ title: "Grid::Settings::Circles::conditions", value: "conditions" },
					{ title: "Grid::Settings::Circles::auto", value: "auto" },
				]
			},					
			
			{ key: "Parallels", title: "Grid::Settings::Parallels", desc: "Grid::Settings::Parallels::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Grid::Settings::Parallels::never", value: "never" },
					{ title: "Grid::Settings::Parallels::conditions", value: "conditions" },
					{ title: "Grid::Settings::Parallels::auto", value: "auto" },
				]
			},		

			{ key: "Meridians", title: "Grid::Settings::Meridians", desc: "Grid::Settings::Meridians::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Grid::Settings::Meridians::never", value: "never" },
					{ title: "Grid::Settings::Meridians::conditions", value: "conditions" },
					{ title: "Grid::Settings::Meridians::auto", value: "auto" },
				]
			},		
			
			{ key: "Points", title: "Grid::Settings::Points", desc: "Grid::Settings::Points::Desc", type: "ranges", value: [ 5, 7, 10, 15, 20, 25 ], params: { min: 5, max: 25, grid: true, separated: true } },
			{ key: "PointsSize", title: "Grid::Settings::PointsSize", desc: "Grid::Settings::PointsSize::Desc", type: "ranges", value: 2, params: { min: 1, max: 24, grid: true, single: true } },


		]
	}	
];