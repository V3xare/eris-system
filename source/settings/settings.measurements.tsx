import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../icons/icons.extend";

export const SettingsTableMeasurements = [
	{
		title: "Settings::Module::MeasurementsToggles", key: "Toggles", icon: <Icons.measurements1/>,
		list: [

			{ key: "LayerEnabled", title: "Measurements::Toggles::LayerEnabled", desc: "Measurements::Toggles::LayerEnabled::Desc", type: "bool", value: true },
			{ key: "LayerSettingsEnabled", title: "Measurements::Toggles::LayerSettingsEnabled", desc: "Measurements::Toggles::LayerSettingsEnabled::Desc", type: "bool", value: true },
		
			{ key: "LayerBarEnabled", title: "Measurements::Toggles::LayerBarEnabled", desc: "Measurements::Toggles::LayerBarEnabled::Desc", type: "bool", value: true },
			{ key: "LayerBarList", title: "Measurements::Toggles::LayerBarList", type: "list", 
				value: { list: [ "altitude", "verticalSpeed", "flightSpeed", "distance" ] },
				extra: {
					sortable: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Toggles::LayerBarList::altitude", prefix: <Icons.heightUnits/>, value: "altitude" },
					{ title: "Measurements::Toggles::LayerBarList::verticalSpeed", prefix: <Icons.verticalSpeed/>, value: "verticalSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::flightSpeed", prefix: <Icons.flightSpeed/>, value: "flightSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::groundSpeed", prefix: <Icons.groundSpeed/>, value: "groundSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::distance", prefix: <Icons.distance/>, value: "distance" }
				]
			},	

			{ key: "TopBar", title: "Measurements::Toggles::TopBar", desc: "Measurements::Toggles::TopBar::Desc", type: "select", 
				value: "auto",
				params: [
					{ title: "Measurements::Toggles::TopBar::never", value: "never" },
					{ title: "Measurements::Toggles::TopBar::always", value: "always" },
					{ title: "Measurements::Toggles::TopBar::auto", value: "auto" },
				]
			},			
			{ key: "BottomBar", title: "Measurements::Toggles::BottomBar", desc: "Measurements::Toggles::BottomBar::Desc", type: "select", 
				value: "never",
				params: [
					{ title: "Measurements::Toggles::TopBar::never", value: "never" },
					{ title: "Measurements::Toggles::TopBar::always", value: "always" },
					{ title: "Measurements::Toggles::TopBar::auto", value: "auto" },
				]
			},
			{ key: "TopBarList", title: "Measurements::Toggles::TopBarList", type: "list", 
				value: { list: [ "altitude", "verticalSpeed", "flightSpeed" ] },
				extra: {
					sortable: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Toggles::LayerBarList::altitude", prefix: <Icons.heightUnits/>, value: "altitude" },
					{ title: "Measurements::Toggles::LayerBarList::verticalSpeed", prefix: <Icons.verticalSpeed/>, value: "verticalSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::flightSpeed", prefix: <Icons.flightSpeed/>, value: "flightSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::groundSpeed", prefix: <Icons.groundSpeed/>, value: "groundSpeed" },
					{ title: "Measurements::Toggles::LayerBarList::distance", prefix: <Icons.distance/>, value: "distance" }
				]
			},				
			
		]
	},	
	{
		title: "Settings::Module::MeasurementsSettings", key: "Settings", tab: "Settings::Module::MeasurementsSettings::Tab", icon: <Icons.cog/>,
		list: [

			{ key: "SwitchType", title: "Measurements::Settings::SwitchType", desc: "Measurements::Settings::SwitchType::Desc", type: "select", 
				value: "cycle",
				params: [
					{ title: "Measurements::Settings::SwitchType::cycle", value: "cycle" },
					{ title: "Measurements::Settings::SwitchType::dropdown", value: "dropdown" },
				]
			},

			{ key: "HeightUnits", title: "Measurements::Settings::HeightUnits", desc: "Measurements::Settings::HeightUnits::Desc", 
				type: "list", 
				value: { list: [ "meters", "feet" ], defaultValue: "meters" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Settings::HeightUnits::meters", prefix: "Measurements::Settings::HeightUnits::meters::prefix", value: "meters" },
					{ title: "Measurements::Settings::HeightUnits::feet", prefix: "Measurements::Settings::HeightUnits::feet::prefix", value: "feet" },
				]
			},			
			{ key: "CurrentHeightUnits", title: "Measurements::Settings::CurrentHeightUnits", desc: "Measurements::Settings::CurrentHeightUnits::Desc", type: "select", 
				value: "meters",
				button: "Measurements::Settings::CurrentHeightUnits::Button",
				icon: <Icons.heightUnits/>,
				secure: "Measurements:Settings:HeightUnits",
				params: [
					{ title: "Measurements::Settings::HeightUnits::meters", prefix: "Measurements::Settings::HeightUnits::meters::prefix", value: "meters" },
					{ title: "Measurements::Settings::HeightUnits::feet", prefix: "Measurements::Settings::HeightUnits::feet::prefix", value: "feet" },
				]
			},

			{ key: "VerticalSpeedUnits", title: "Measurements::Settings::VerticalSpeedUnits", desc: "Measurements::Settings::VerticalSpeedUnits::Desc", 
				type: "list", 
				value: { list: [ "meters", "feet" ], defaultValue: "meters" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Settings::VerticalSpeedUnits::meters", prefix: "Measurements::Settings::VerticalSpeedUnits::meters::prefix", value: "meters" },
					{ title: "Measurements::Settings::VerticalSpeedUnits::feet", prefix: "Measurements::Settings::VerticalSpeedUnits::feet::prefix", value: "feet" },
				]
			},			
			{ key: "CurrentVerticalSpeedUnits", title: "Measurements::Settings::CurrentVerticalSpeedUnits", desc: "Measurements::Settings::CurrentVerticalSpeedUnits::Desc", type: "select", 
				value: "meters",
				button: "Measurements::Settings::CurrentVerticalSpeedUnits::Button",
				icon: <Icons.verticalSpeed/>,
				secure: "Measurements:Settings:VerticalSpeedUnits",
				params: [
					{ title: "Measurements::Settings::VerticalSpeedUnits::meters", prefix: "Measurements::Settings::VerticalSpeedUnits::meters::prefix", value: "meters" },
					{ title: "Measurements::Settings::VerticalSpeedUnits::feet", prefix: "Measurements::Settings::VerticalSpeedUnits::feet::prefix", value: "feet" },
				]
			},

			{ key: "AirspeedUnits", title: "Measurements::Settings::AirspeedUnits", desc: "Measurements::Settings::AirspeedUnits::Desc", 
				type: "list", 
				value: { list: [ "kilometers", "knots", "mach" ], defaultValue: "kilometers" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Settings::AirspeedUnits::kilometers", prefix: "Measurements::Settings::AirspeedUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::AirspeedUnits::knots", prefix: "Measurements::Settings::AirspeedUnits::knots::prefix", value: "knots" },
					{ title: "Measurements::Settings::AirspeedUnits::mach", prefix: "Measurements::Settings::AirspeedUnits::mach::prefix", value: "mach" },
				]
			},			
			{ key: "CurrentAirspeedUnits", title: "Measurements::Settings::CurrentAirspeedUnits", desc: "Measurements::Settings::CurrentAirspeedUnits::Desc", type: "select", 
				value: "kilometers",
				button: "Measurements::Settings::CurrentAirspeedUnits::Button",
				icon: <Icons.flightSpeed/>,
				secure: "Measurements:Settings:AirspeedUnits",
				params: [
					{ title: "Measurements::Settings::AirspeedUnits::kilometers", prefix: "Measurements::Settings::AirspeedUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::AirspeedUnits::knots", prefix: "Measurements::Settings::AirspeedUnits::knots::prefix", value: "knots" },
					{ title: "Measurements::Settings::AirspeedUnits::mach", prefix: "Measurements::Settings::AirspeedUnits::mach::prefix", value: "mach" },
				]
			},

			{ key: "GroundSpeedUnits", title: "Measurements::Settings::GroundSpeedUnits", desc: "Measurements::Settings::GroundSpeedUnits::Desc", 
				type: "list", 
				value: { list: [ "kilometers", "miles"  ], defaultValue: "kilometers" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Settings::GroundSpeedUnits::kilometers", prefix: "Measurements::Settings::GroundSpeedUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::GroundSpeedUnits::miles", prefix: "Measurements::Settings::GroundSpeedUnits::miles::prefix", value: "miles" },
					{ title: "Measurements::Settings::GroundSpeedUnits::knots", prefix: "Measurements::Settings::GroundSpeedUnits::knots::prefix", value: "knots" },
				]
			},			
			{ key: "CurrentGroundSpeedUnits", title: "Measurements::Settings::CurrentGroundSpeedUnits", desc: "Measurements::Settings::CurrentGroundSpeedUnits::Desc", type: "select", 
				value: "kilometers",
				button: "Measurements::Settings::CurrentGroundSpeedUnits::Button",
				icon: <Icons.groundSpeed/>,
				secure: "Measurements:Settings:GroundSpeedUnits",
				params: [
					{ title: "Measurements::Settings::GroundSpeedUnits::kilometers", prefix: "Measurements::Settings::GroundSpeedUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::GroundSpeedUnits::miles", prefix: "Measurements::Settings::GroundSpeedUnits::miles::prefix", value: "miles" },
					{ title: "Measurements::Settings::GroundSpeedUnits::knots", prefix: "Measurements::Settings::GroundSpeedUnits::knots::prefix", value: "knots" },
				]
			},			
			
			{ key: "DistanceUnits", title: "Measurements::Settings::DistanceUnits", desc: "Measurements::Settings::DistanceUnits::Desc", 
				type: "list", 
				value: { list: [ "kilometers", "miles" ], defaultValue: "kilometers" },
				extra: {
					sortable: true,
					hasDefault: true,
					headerless: true,
					prefix: true,
				},
				params: [
					{ title: "Measurements::Settings::DistanceUnits::kilometers", prefix: "Measurements::Settings::DistanceUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::DistanceUnits::miles", prefix: "Measurements::Settings::DistanceUnits::miles::prefix", value: "miles" },
				]
			},			
			{ key: "CurrentDistanceUnits", title: "Measurements::Settings::CurrentDistanceUnits", desc: "Measurements::Settings::CurrentDistanceUnits::Desc", type: "select", 
				value: "kilometers",
				button: "Measurements::Settings::CurrentDistanceUnits::Button",
				icon: <Icons.distance/>,
				secure: "Measurements:Settings:DistanceUnits",
				params: [
					{ title: "Measurements::Settings::DistanceUnits::kilometers", prefix: "Measurements::Settings::DistanceUnits::kilometers::prefix", value: "kilometers" },
					{ title: "Measurements::Settings::DistanceUnits::miles", prefix: "Measurements::Settings::DistanceUnits::miles::prefix", value: "miles" },
				]
			},

		]
	}	

];