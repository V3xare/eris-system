import React, { useMemo, useState, useRef, useReducer, useContext, useEffect, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Tooltip, Column, Props, Request, Common, VMath, Time, LangContext, Loading, List, Select, Divider, Card, Text, Space, LangContextType } from "v-eris";
import { Icons } from "../../icons/icons.extend";

export const TemplatesBlock = memo(( props: {
	section?: any, subsection?: any, dynamic?: any, qs?: any, data?: any, alone?: any, selected?: any, token?: any
} ) => {
	let { section, subsection, dynamic, qs, data, alone, selected, token, ...rest } = props;
	const lang: LangContextType = useContext( LangContext );
	const location = useLocation();
	const nav = useNavigate();

	let sectionElements = useMemo(() => {
		let array = (section ? (section.children || []) : []).map(( item: any ) => {
			return { value: item.key || item.name, title: lang.get(item.name), length: "", widgets: item.list };
		});

		if( array.length < 2 )
			return <div key={ "sections" }></div>;

		return (<div key={ "sections" }>
			<Select stretch headerless row value={ qs.subsection } onSelect={( v: any ) => {
				nav( Common.setQuery( location, { section: qs.section, subsection: v.value, token: token } ) );
			}} list={ array }/>
			<Divider></Divider>	
		</div>);
	}, [ section, qs ]);

	let widgetsElements = useMemo(() => {
		let array = subsection && subsection.list ? subsection.list : [];
		let n = 0;
		return array.map(( item: any ) => {
			n++;
			return (
				<div key={ item.name }>
					{ item.title ? (
						<div className={ "eris-templates-header" }>
							<div>{lang.get( item.title ) }</div>
							<Space/>
						</div>
					) : null }
					{ React.createElement( item.module, { ...item.props, data: data } ) }
					{ n >= array.length ? (null) : (<Divider></Divider>) }	
				</div>
			);
		});
	}, [ sectionElements, qs.subsection, dynamic.list ]);

	const elements = useMemo(() => {

		if( !section.headerParams ){
			return (<div></div>);
		};

		if( Array.isArray( section.headerParams ) ){
			return section.headerParams.map(( name: any ) => {
				let value = data[ name ];
				return <Row className={ "eris-templates-item" } key={ name }>
					<Text className={ "eris-templates-item-key" }>{ lang.get( "AeroInfo::" + name ) || name }{ ": " }</Text>
					<Text className={ "eris-templates-item-value" }>{ value }</Text>
				</Row>
			});
		};

		return 	(
			<div>
				{ React.createElement( section.headerParams.module, { ...section.headerParams.props, data: data } ) }
			</div>
		);
	}, [ data, section.headerParams ]);

	return (
	<div className={ Props.className( "eris-templates-block", { selected: selected, alone: alone } ) }>
		<div className={ "eris-templates-back" } onClick={() => {
			nav( Common.setQuery( location, { section: qs.section, subsection: qs.subsection, token: undefined } ) );
		}}><Icons.exit/>{ lang.get( "TemplatesModuleBlock::Back" ) }</div>
		{ elements }
		<Space/>
		<div className={ "eris-templates-select" } onClick={() => {
			nav( Common.setQuery( location, { section: qs.section, subsection: qs.subsection, token: token } ) );
		}}><Icons.info/>{ lang.get( "TemplatesModuleBlock::More" ) }</div>
		{ selected || alone ? (
			[ sectionElements, widgetsElements ]
		) : (null) }
		<Divider></Divider>	
	</div>
	);
});