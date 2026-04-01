
import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons } from "../../icons/icons.extend";
import { SettingsTableGeneral } from "../../settings/settings.general";

export const SettingsTable = {
	General: SettingsTableGeneral,
};

export const SettingsList = [
	{ title: "Settings::Module::Appearance", key: "Appearance", icon: <Icons.image/>, list: [
		{ title: "Settings::Module::General", key: "General", icon: <Icons.command/> },
	]}
];
