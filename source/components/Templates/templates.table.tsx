import React from "react";
import { Icons } from "../../icons/icons.extend"

const WidgetSimple = ( props?: any ) => {



	return <div>{ "hello" }</div>
};

export type TemplatesListType = { [key: string]: any[] };
export type TemplatesTableType = { [key: string]: any };

export const TemplatesTable: TemplatesTableType = {
	"aircrafts": {
		key: "aircrafts",
		name: "TemplatesRework::Aircraft",
		icon: <Icons.location />,
		headerParams: {
			module: WidgetSimple, 
			props: {}
		},
		children: [
			{
				name: "TemplatesRework::Position", 
				list: [
					{
						name: "info", 
						module: WidgetSimple,
						props: {}
					},
				]
			},
			{ name: "TemplatesRework::Route", list: [] },
			{
				name: "TemplatesRework::Track", 
				list: [
					{
						name: "info", 
						module: WidgetSimple,
						props: {}
					},
				]
			},
			{
				name: "TemplatesRework::More", 
				list: [
					{
						name: "info", 
						module: WidgetSimple,
						props: {}
					},
				]
			},
		]
	},
	"airways": {
		key: "airways",
		name: "TemplatesRework::Airway",
		icon: <Icons.compass />,
		headerParams: {
			module: WidgetSimple, 
			props: {}
		},
		children: [
			{
				name: "TemplatesRework::ControlPoint", 
				list: [
					{ name: "airwaypoints", module: WidgetSimple },
				]
			},
		]
	},
	"airports": {
		key: "airports",
		name: "TemplatesRework::Port",
		icon: <Icons.compass2 />,
		headerParams: {
			module: WidgetSimple,
			props: {}
		},
		children: [
			{
				name: "ICAO", list: [
					{
						name: "info", title: "Info::tooltip", 
						module: WidgetSimple,
						props: {}
					},
				]
			},
			{
				name: "GNSS", list: [
					{ name: "radar", title: "", module: WidgetSimple },
					{ name: "slider", title: "", module: WidgetSimple },
					{ name: "graph", title: "", module: WidgetSimple },
					{ name: "chart", title: "", module: WidgetSimple },
					{ name: "table", title: "", module: WidgetSimple },
				]
			},
			{
				name: "TemplatesRework::Ecliptic", 
				list: [
					{ name: "table", title: "", module: WidgetSimple },
				]
			},
		]
	},
	"sectors": {
		key: "sectors",
		name: "TemplatesRework::Sector",
		icon: <Icons.statsbars />,
		headerParams: {
			module: WidgetSimple, props: {}
		},
		clusters: true,
		children: [
			{
				name: "params", 
				list: [
					{
						name: "info", 
						module: WidgetSimple, 
						props: {}
					},
				]
			}
		]
	},
	"runways": {
		key: "runways",
		name: "TemplatesRework::Runways",
		icon: <Icons.paypal />,
		headerParams: {
			module: WidgetSimple, 
			props: {}
		},
		children: [
			{
				name: "runwaycodelat", 
				list: [
					{
						name: "info", title: "Info::tooltip", 
						module: WidgetSimple,
						props: {},
					}
				]
			}
		]
	},
	"settings": {
		key: "settings",
		featureless: true,
		module: WidgetSimple
	}
};