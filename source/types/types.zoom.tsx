import React, { useState, useRef, useEffect } from "react";
import { Card, Column, Common, Props, Row, Space, Toggle, Tooltip, VMath, Icons } from "v-eris";
import { Color, ColorPicker } from "./types.color";

import "./types.zoom.scss"

export const ZoomParams = ( props: any ) => {
	let { className, range, value, onChange, ...rest } = props;

	if( !range || !Array.isArray( range ) )
		range = [ 0, 0 ];
	if( !value )
		value = {};

	let change = ( key: string, valueArg: any ) => {
		let v = { ...value };
		v[ key ] = valueArg;

		if( !onChange )
			return;
		
		onChange({ value: v });
	};

	return (
	<Card header={ <span>{ <Icons.road/> }<Space/>{ "Маштаб" } { range[ 0 ] + "-" + range[ 1 ] }</span> }>
		<Row>{ "Отображать метки" }:<Space/><Toggle value={ value.marks } onChange={( e: any ) => { change( "marks", e.value ) }}/></Row>
		<Row>{ "Обьеденять метки в класстеры" }:<Space/><Toggle value={ value.clusters } onChange={( e: any ) => { change( "clusters", e.value ) }}/></Row>
		<Row>{ "Цвет метки" }:<Space/><ColorPicker value={ value.marksColor } onChange={( e: any ) => { change( "marksColor", e.value ) }}/></Row>
		<Row>{ "Цвет тени метки" }:<Space/><ColorPicker value={ value.marksShadow } onChange={( e: any ) => { change( "marksShadow", e.value ) }}/></Row>
		<Row>{ "Отображать формуляр неактивной метки" }:<Space/><Toggle value={ value.tooltipInactive } onChange={( e: any ) => { change( "tooltipInactive", e.value ) }}/></Row>
		<Row>{ "Использовать интерактивный формуляр" }:<Space/><Toggle value={ value.tooltipInteractive } onChange={( e: any ) => { change( "tooltipInteractive", e.value ) }}/></Row>
	</Card>
	);
};