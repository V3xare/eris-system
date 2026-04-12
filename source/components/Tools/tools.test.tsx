import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
import {Icons} from "../../icons/icons.extend";

export const Tools1 = [
	{
		key: "ADSBTracking::Toggles::LayerBarCurrent",
		visibility: "ADSBTracking::Toggles::QAButtonEnabled",
		secure: "ADSBTracking::Toggles::LayerBarList",
		type: "toggle",
	},		
	{
		key: "ADSBLocators::Toggles::Current",
		visibility: "ADSBLocators::Toggles::QAButtonEnabled",
		secure: "ADSBLocators::Toggles::LayerBarList",
		type: "toggle",
	},	
	{
		key: "Routes::Toggles::Current",
		visibility: "Routes::Toggles::QAButtonEnabled",
		secure: "Routes::Toggles::LayerBarList",
		type: "toggle",
	},	
	{
		key: "Ports::Toggles::Current",
		visibility: "Ports::Toggles::QAButtonEnabled",
		secure: "Ports::Toggles::LayerBarList",
		type: "toggle",
	},	
	{
		key: "Sectors::Toggles::Current",
		visibility: "Sectors::Toggles::QAButtonEnabled",
		secure: "Sectors::Toggles::LayerBarList",
		type: "toggle",
	},	
	{
		key: "more-1",
		type: "toggle",
		icon: <Icons.stack />,
		children: [

			{
				key: "Maps::Toggles::LayerBarCurrent",
				visibility: "Maps::Toggles::LayerEnabled",
				subVisibility: "Maps::Toggles::LayerBarEnabled",
				settingsVisibility: "Maps::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Maps",
				secure: "Maps::Toggles::LayerBarList",		
				type: "slider"
			},		
			{ type: "newline", visibility: "Maps::Toggles::LayerEnabled" },
			{
				key: "ADSBTracking::Toggles::LayerBarCurrent",
				visibility: "ADSBTracking::Toggles::LayerEnabled",
				subVisibility: "ADSBTracking::Toggles::LayerBarEnabled",
				settingsVisibility: "ADSBTracking::Toggles::LayerSettingsEnabled",
				settings: "Appearance::ADSBTracking",
				secure: "ADSBTracking::Toggles::LayerBarList",
				type: "slider"
			},							
			{ type: "newline", visibility: "ADSBTracking::Toggles::LayerEnabled" },
			

			{
				key: "Routes::Toggles::Current",
				visibility: "Routes::Toggles::LayerEnabled",
				settingsVisibility: "Routes::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Routes",
				type: "toggle",
			},						
			
			{
				key: "Ports::Toggles::Current",
				visibility: "Ports::Toggles::LayerEnabled",
				settingsVisibility: "Ports::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Ports",
				type: "toggle",
			},

			{
				key: "Sectors::Toggles::Current",
				visibility: "Sectors::Toggles::LayerEnabled",
				settingsVisibility: "Sectors::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Sectors",
				type: "toggle",
			},

			//
			{
				key: "ADSBLocators::Toggles::LayerBarCurrent",
				visibility: "ADSBLocators::Toggles::LayerEnabled",
				subVisibility: "ADSBLocators::Toggles::LayerBarEnabled",
				settingsVisibility: "ADSBLocators::Toggles::LayerSettingsEnabled",
				settings: "Appearance::ADSBLocators",
				secure: "ADSBLocators::Toggles::LayerBarList",	
				type: "list",
			},	
			{
				key: "ADSBLocators::Filters::Locators",
				visibility: "ADSBLocators::Toggles::LayerEnabled",
				subVisibility: "ADSBLocators::Toggles::LayerBarEnabled",
				secure: "ADSBLocators::Properties::List",	
				type: "list",
				extra: {
					query: true
				}
			},	
			//

			{
				key: "ADSBMobile::Toggles::Current",
				visibility: "ADSBMobile::Toggles::LayerEnabled",
				settingsVisibility: "ADSBMobile::Toggles::LayerSettingsEnabled",
				settings: "Appearance::ADSBMobile",
				type: "toggle",
			},		

			{ type: "newline", visibility: "Satellites::Toggles::LayerEnabled" },
			{
				key: "Satellites::Toggles::LayerBarCurrent",
				visibility: "Satellites::Toggles::LayerEnabled",
				subVisibility: "Satellites::Toggles::LayerBarEnabled",
				settingsVisibility: "Satellites::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Satellites",
				secure: "Satellites::Toggles::LayerBarList",	
				type: "slider"
			},				
			{ type: "newline", visibility: "Satellites::Toggles::LayerEnabled" },
			
			{
				key: "MeasurementsTools::Toggles::LayerBarCurrent",
				visibility: "MeasurementsTools::Toggles::LayerEnabled",
				subVisibility: "MeasurementsTools::Toggles::LayerBarEnabled",
				settingsVisibility: "MeasurementsTools::Toggles::LayerSettingsEnabled",
				settings: "Appearance::MeasurementsTools",
				secure: "MeasurementsTools::Toggles::LayerBarList",	
				type: "slider"
			},				
			{ type: "newline", visibility: "MeasurementsTools::Toggles::LayerEnabled" },

			{
				key: "Grid::Toggles::Current",
				visibility: "Grid::Toggles::LayerEnabled",
				settingsVisibility: "Grid::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Grid",
				type: "toggle",
			},	

			{
				key: "DayNight::Toggles::Current",
				visibility: "DayNight::Toggles::LayerEnabled",
				settingsVisibility: "DayNight::Toggles::LayerSettingsEnabled",
				settings: "Appearance::DayNight",
				type: "toggle",
			},	

			//
		],
	},
];

export const Tools2 = [
	//{key: "feed", type: "toggle", icon: <Icons.feed/>},
	{
		key: "more-2",
		type: "toggle",
		icon: <Icons.cog />,
		children: [

			{ type: "newline", visibility: "General::Language::CurrentLanguage" },
			{
				key: "General::Language::CurrentLanguage",
				type: "slider"
			},				
			{ type: "newline", visibility: "General::Language::CurrentLanguage" },

			{
				key: "Forma::Toggles::LayerBarList",
				visibility: "Forma::Toggles::LayerEnabled",
				settingsVisibility: "Forma::Toggles::LayerSettingsEnabled",
				settings: "Appearance::Forma",
				type: "buttons"
			},	

			{
				key: "Measurements::Settings::CurrentHeightUnits",
				visibility: "Measurements::Toggles::LayerBarEnabled",
				visibilityKey: "Measurements::Toggles::LayerBarList",
				visibilityValue: "altitude",
				type: "slider"
			},		
			{
				key: "Measurements::Settings::CurrentVerticalSpeedUnits",
				visibility: "Measurements::Toggles::LayerBarEnabled",
				visibilityKey: "Measurements::Toggles::LayerBarList",
				visibilityValue: "verticalSpeed",
				type: "slider"
			},					
			{
				key: "Measurements::Settings::CurrentAirspeedUnits",
				visibility: "Measurements::Toggles::LayerBarEnabled",
				visibilityKey: "Measurements::Toggles::LayerBarList",
				visibilityValue: "flightSpeed",
				type: "slider"
			},					
			{
				key: "Measurements::Settings::CurrentGroundSpeedUnits",
				visibility: "Measurements::Toggles::LayerBarEnabled",
				visibilityKey: "Measurements::Toggles::LayerBarList",
				visibilityValue: "groundSpeed",
				type: "slider"
			},					
			{
				key: "Measurements::Settings::CurrentDistanceUnits",
				visibility: "Measurements::Toggles::LayerBarEnabled",
				visibilityKey: "Measurements::Toggles::LayerBarList",
				visibilityValue: "distance",
				type: "slider"
			},		

		],
	},
];

export const MeasurementsTools = [

	{
		key: "Measurements::Settings::CurrentHeightUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "altitude",
		type: "slider"
	},		
	{
		key: "Measurements::Settings::CurrentVerticalSpeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "verticalSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentAirspeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "flightSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentGroundSpeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "groundSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentDistanceUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "distance",
		type: "slider"
	},		

	{
		key: "Measurements::Toggles::Current",
		settings: "Appearance::Measurements",
		icon: <Icons.cog />,
		type: "settings"
	},

];

export const MeasurementsBottomTools = [

	{
		key: "Measurements::Settings::CurrentHeightUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "altitude",
		type: "slider"
	},		
	{
		key: "Measurements::Settings::CurrentVerticalSpeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "verticalSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentAirspeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "flightSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentGroundSpeedUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "groundSpeed",
		type: "slider"
	},					
	{
		key: "Measurements::Settings::CurrentDistanceUnits",
		visibilityKey: "Measurements::Toggles::TopBarList",
		visibilityValue: "distance",
		type: "slider"
	},		

	{
		key: "Measurements::Toggles::Current",
		settings: "Appearance::Measurements",
		icon: <Icons.cog />,
		type: "settings"
	},

];

export const RaimTools = [

	{
		key: "Satellites::Toggles::LayerBarCurrent",
		type: "slider",
		icon: " ",
	},		
	{
		key: "Satellites::Toggles::AngleCurrent",
		secure: "Satellites::Toggles::AngleList",
		type: "slider",
		icon: "∠",
	},	
	{
		key: "Satellites::Toggles::LayerBarCurrent",
		secure: "Satellites::Toggles::LayerBarList",
		icon: <Icons.raim />,
		type: "toggle",
	},		
	

];

export const MeasurementsPanelTools = [

	{
		key: "MeasurementsTools::Toggles::LayerBarCurrent",
		type: "slider",
		icon: " ",
		extra: {
			headerless: true,
			row: true
		},		
	},		

];
