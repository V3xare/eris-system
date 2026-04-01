import React, { useState, useRef, useEffect } from "react";
import { Card, Column, Common, Modal, Text, Props, Row, Space, Toggle, Tooltip, VMath, Icons } from "v-eris";
import { Color, ColorPicker } from "./types.color";
import { Ranges } from "./types.ranges";

import "./types.zoom.scss"
import { TypeJSON } from "./types";

export const LocatorsParams = ( props: any ) => {
	let { className, config, value, onChange, inactive, lang, ...rest } = props;
	let [ active, setActive ] = useState( false );

	if( !value )
		value = {};
	if( !config )
		config = {};

	let change = ( key: string, valueArg: any ) => {
		let v = { ...config };
		v[ key ] = valueArg;

		if( !onChange )
			return;
		
		onChange({ value: v });
	};

	return (
	<Card header={ <span>{ <Icons.sphere/> }<Space/>{ value.name }</span> }>
		<Row>{ lang.get( "Types::Locators::SAC:SIC" ) }: { value.sac + ":" + value.sic }<Space/></Row>
		<Row>{ lang.get( "Types::Locators::LayerEnabled" ) }:<Space/><Toggle value={ config.LayerEnabled } inactive/></Row>
		<Row>{ lang.get( "Types::Locators::MarksColor" ) }:<Space/><ColorPicker value={ config.MarksColor } inactive/></Row>
		<Row>{ lang.get( "Types::Locators::MarksShadow" ) }:<Space/><ColorPicker value={ config.MarksShadow } inactive/></Row>
		<Row>{ lang.get( "Types::Locators::Opacity" ) }:<Space/>{ config.Opacity }%</Row>
		<Row>{ lang.get( "Types::Locators::Grid" ) }:<Space/><Toggle value={ config.Grid } inactive/></Row>
		<Row className={ "settings-type-params-tools" }>
			<Text success onClick={() => { setActive( true ) }}>Edit</Text>
		</Row>			
		<Modal className={ "settings-type-params-modal" } bg active={ active } onClose={() => {
				setActive( false );
			}}>
				<Card header={ <span>{ value.name }</span> } headerless={ true }>

					<Row>
						{ lang.get( "Types::Locators::SAC:SIC" ) }
						<Space/>
						{ value.sac + ":" + value.sic }
					</Row>					
					
					<Row>
						<Toggle value={ config.LayerEnabled } onChange={( e: any ) => change( "LayerEnabled", e.value ) }/>
						<Space/>
						<Row>{ lang.get( "Types::Locators::LayerEnabled" ) }</Row>
						<Space/>
					</Row>							

					<Row>
						<Toggle value={ config.MarksColorEnabled } onChange={( e: any ) => change( "MarksColorEnabled", e.value ) }/>
						<Space/>
						<Row>{ lang.get( "Types::Locators::MarksColor" ) }:</Row>
						<Space/>
						<ColorPicker value={ config.MarksColor } onChange={( e: any ) => change( "MarksColor", e.value ) }/>
					</Row>			

					<Row>
						<Toggle value={ config.MarksShadowEnabled } onChange={( e: any ) => change( "MarksShadowEnabled", e.value ) }/>
						<Space/>
						<Row>{ lang.get( "Types::Locators::MarksShadow" ) }:</Row>
						<Space/>
						<ColorPicker value={ config.MarksShadow } onChange={( e: any ) => change( "MarksShadow", e.value ) }/>
					</Row>

					<div>
						<Row>
							<Toggle value={ config.OpacityEnabled } onChange={( e: any ) => change( "OpacityEnabled", e.value ) }/>
							<Space/>
							<Row>{ lang.get( "Types::Locators::Opacity" ) }:<Space/><span>{ config.Opacity }%</span><Space/></Row>
						</Row>
						<Row>
							<Ranges value={ config.Opacity } min={ 0 } max={ 100 } single={ true } onChange={( e: any ) => change( "Opacity", e.value ) }/>
						</Row>
					</div>

					<Row>
						<Toggle value={ config.GridEnabled } onChange={( e: any ) => change( "GridEnabled", e.value ) }/>
						<Space/>
						<Row>{ lang.get( "Types::Locators::Grid" ) }</Row>
						<Space/>
					</Row>

				</Card>
		</Modal>
	</Card>
	);
};