import React, { useMemo, useState, useRef, useReducer, useContext, useEffect } from "react";
import { Row, Tooltip, Column, Props, Request, Common, VMath, Time, LangContext, Loading, List, Select, Divider, Card, Text, Space, LangContextType } from "v-eris";
import { TemplatesListType, TemplatesTable, TemplatesTableType } from "./templates.table";
import { TemplatesBlock } from "./templates.block";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

import "./templates.scss"

export const Templates = ( props: { 
	className?: string,
	value: TemplatesListType,
	templates: TemplatesTableType 
}) => {
	let { className, ...rest } = props;
	const lang: LangContextType = useContext( LangContext );
	const location = useLocation();
	const nav = useNavigate();
	const qs = Common.parseQuery( location );

	qs.section = Common.string( qs.section || "" );
	qs.subsection = Common.string( qs.subsection || "" );
	qs.token = Common.string( qs.token || "" );
	let section = props.templates[ qs.section ];

	if( !section || !props.value[ qs.section ] || !props.value[ qs.section ].length ){

		for( const templateKey in props.templates ){

			const item = props.templates[ templateKey ];

			if( !props.value[ item.key ] || !props.value[ item.key ].length )
				continue;

			qs.section = item.key ;
			section = item;
			break;
		};

		if( !section ){

			for( const templateKey in props.templates ){
				qs.section = props.templates[ templateKey ].key;
				section = props.value[ qs.section as string ] || [];				
				break;
			};

		};

	};

	let value = props.value[ qs.section as string ];
	let subsection = (section.children || []).find(( f: any ) => f.name == qs.subsection );

	if( !subsection ){
		qs.subsection = section.children && section.children[ 0 ] ? section.children[ 0 ].name : "";
		subsection = section.children ? (section.children[ 0 ] || []) : [];
	};

	let dynamic = useMemo(() => {
		let list: any = [];
		let dynamicData = value;

		if( !dynamicData || !dynamicData.length || !section )
			return { data: dynamicData, list: list, clusters: !!section.clusters };

		for( const item of dynamicData ){

			if( !item.list || !Array.isArray( item.list ) || !item.list.length )
				continue;

			let cluster = section.clusters ? [] : list;

			for( const itemData of item.list ){
				cluster.push( itemData );
			};

			if( section.clusters )
				list.push({ value: item.type, title: lang.get( item.type ), list: cluster, length: cluster.length || "" });

		};

		return { data: dynamicData, list: list, clusters: !!section.clusters };
	}, [ qs.section, value ]);

	let headerElements = useMemo(() => {

		let result: any = [];

		for( const itemKey in props.templates ){

			const item = props.templates[ itemKey ] ;
			let length = 0;
			let array = props.value[ item.key ] || [];

			for( let part of array ){
				length += (part.list || []).length;
			};

			if( !length )
				continue;

			result.push({ 
				icon: item.icon, 
				value: item.key, 
				title: lang.get( item.name ), 
				length: length || ""
			});
		};

		return result;
	}, [ 
		props.value,
	]);
	let sectionInfo = useMemo(() => {

		if( section.empty ){
			return dynamic.data.map(( item: any, index: number ) => (
				<div key={ item.id  + ":" + index }>{
					React.createElement( section.module, { data: item } )
				}</div>
			));			
		};

		let array = dynamic.list;

		if( !array.length )
			return null;

		if( dynamic.clusters ){
			array = dynamic.list.find(( f: any ) => f.value == qs.cluster );

			if( array )
				array = array.list;
			else
				array = dynamic.list[ 0 ] ? (dynamic.list[ 0 ].list || []) : [];

		};

		let alone = array.length > 1 ? false : true;
		let selected = qs.token ? array.find(( f: any ) => qs.token == f.id ) : null;

		if( selected ){
			array = [ selected ];
		};

		return array.map(( item: any, index: number ) => (
			<TemplatesBlock key={ item.id  + ":" + index } token={ item.id } section={ section } subsection={ subsection } selected={ selected } alone={ alone } qs={ qs } dynamic={ dynamic } data={ item }/>
		));
	}, [ qs, value ]);	

	return (
		<div className={ Props.className( "eris-templates-container" ) }>
			<Select style={{ display: headerElements.length > 1 ? undefined : "none" }} stretch headerless row value={ qs.section } onSelect={( v: any ) => {
				let s = props.templates[ v.value as string ];
				nav( Common.setQuery( location, { section: v.value, subsection: s && s.children && s.children[ 0 ] ? s.children[ 0 ].name : "", cluster: "" } ) );
			}} list={ headerElements }/>
			<Divider style={{ display: headerElements.length > 1 ? undefined : "none" }} ></Divider>	
			{ dynamic.clusters && dynamic.list.length ? 
				(
				<div>
					<Select stretch headerless row value={ qs.cluster } onSelect={( v: any ) => {
						nav( Common.setQuery( location, { section: qs.section, cluster: v.value, token: "" } ) );
					}} list={ dynamic.list }/>
					<Divider></Divider>	
				</div>
				)
				: 
				null 
			}
			<div>

				{

					section.key == "settings" ? 
					( sectionInfo ) 
					: 
					(
					<div className={ Props.className( "eris-templates" ) }>
						<Card header={ 
							<div className={ "eris-templates-title" }>
								{ section.icon }<Space/>{ lang.get( section.name ) }
							</div>
						}>
							{ sectionInfo }
						</Card>
					</div>						
					)

				}
				
			</div>
		</div>
	);
};
