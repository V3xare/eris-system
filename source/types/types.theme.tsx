import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Column, Common, Props, Row, Space, Toggle, Input, Tooltip, VMath } from "v-eris";

import "./types.theme.scss"

export const TypeTheme = ( props: any ) => {

	let { 
		params,
		value,
		stack,
		k,
		permissions,
		lang,
		...rest 
	} = props;	

	if( !params )
		params = [];

	let selected = params.find(( f: any ) => f.value == value );

	if( !selected )
		selected = "white";
	else
		selected = selected.value;

	return <div className={ "theme" }>{

		params.map(( v: any, index: number ) => {
			return (
			<div 
				key={ v.value } 
				className={ Props.className( "theme-item", { selected: v.value == selected } ) }
				data-theme={ v.value }
			>
				<Card>
					<Row><Toggle/><Space/>{ lang.get( "General::Theme::CurrentTheme" ) }</Row>
					<Row><Input>{ "search" }</Input></Row>
					<div className={ "theme-title" }>{ lang.get( v.title ) }</div>
				</Card>
				<div className={ "theme-bg" } onClick={() => props.onChange({ value: v.value }) }></div>
			</div>
			)
		})

	}</div>;
};