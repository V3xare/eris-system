
import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../../icons/icons.extend";
import { SettingsTableGeneral } from "../../settings/settings.general";
import { SettingsTablePorts } from "../../settings/settings.ports";
import { SettingsTableRoutes } from "../../settings/settings.routes";
import { SettingsTableSectors } from "../../settings/settings.sectors";
import { SettingsTableADSBTracking } from "../../settings/settings.adsbtracking";
import { SettingsTableADSBLocators } from "../../settings/settings.adsblocators";
import { SettingsTableADSBMobile } from "../../settings/settings.adsbmobile";
import { SettingsTableSatellites } from "../../settings/settings.satellites";
import { SettingsTableGrid } from "../../settings/settings.grid";
import { SettingsTableMeasurements } from "../../settings/settings.measurements";
import { SettingsTableMeasurementsTools } from "../../settings/settings.measurements.tools";
import { SettingsTableForma } from "../../settings/settings.forma";
import { SettingsTableDayNight } from "../../settings/settings.daynight";
import { SettingsTableMaps } from "../../settings/settings.maps";

export const SettingsTable = {
	General: SettingsTableGeneral,
	Ports: SettingsTablePorts,
	Routes: SettingsTableRoutes,
	Sectors: SettingsTableSectors,
	ADSBTracking: SettingsTableADSBTracking,
	ADSBLocators: SettingsTableADSBLocators,
	ADSBMobile: SettingsTableADSBMobile,
	Satellites: SettingsTableSatellites,
	Grid: SettingsTableGrid,
	MeasurementsTools: SettingsTableMeasurementsTools,
	Measurements: SettingsTableMeasurements,
	Forma: SettingsTableForma,
	DayNight: SettingsTableDayNight,
	Maps: SettingsTableMaps,	
};

export const SettingsList = [
	{ title: "Settings::Module::Appearance", key: "Appearance", icon: <Icons.image/>, list: [
		{ title: "Settings::Module::General", key: "General", icon: <Icons.command/> },
		{ title: "Settings::Module::Ports", key: "Ports", icon: <Icons.office/> },
		{ title: "Settings::Module::Routes", key: "Routes", icon: <Icons.road2/> },
		{ title: "Settings::Module::Sectors", key: "Sectors", icon: <Icons.sectors/> },
		{ title: "Settings::Module::ADSBTracking", key: "ADSBTracking", icon: <Icons.airplane/> },
		{ title: "Settings::Module::ADSBLocators", key: "ADSBLocators", icon: <Icons.receiver2/> },
		{ title: "Settings::Module::ADSBMobile", key: "ADSBMobile", icon: <Icons.receiver6/> },
		{ title: "Settings::Module::Satellites", key: "Satellites", icon: <Icons.satellite2/> },
		{ title: "Settings::Module::Grid", key: "Grid", icon: <Icons.sphere/> },
		{ title: "Settings::Module::MeasurementsTools", key: "MeasurementsTools", icon: <Icons.measurements4/> },
		{ title: "Settings::Module::Measurements", key: "Measurements", icon: <Icons.measurements1/> },
		{ title: "Settings::Module::Forma", key: "Forma", icon: <Icons.form/> },
		{ title: "Settings::Module::DayNight", key: "DayNight", icon: <Icons.dayNight/> },
		{ title: "Settings::Module::Maps", key: "Maps", icon: <Icons.map1/> },
		//{ title: "Settings::Module::Test", key: "Test", icon: <Icons.pacman/>, live: <ToolsModule list={ Tools1 } />, table: SettingsTableTest },
	]},
//	"Zones": { title: "Settings::Module::Zones", key: "Zones", icon: <Icons.accessibility/>, list: [
//		{ title: "Settings::Module::Zones", key: "Zones", icon: <Icons.stack/> },
//	]},
//	"Scale": { title: "Settings::Module::Scale", key: "Scale", icon: <Icons.airplane/>, list: [
//		{ title: "Settings::Module::Scale", key: "Scale", icon: <Icons.stack/> },
//	]},	
];
