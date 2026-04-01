import React, { useState, useRef, useEffect, useMemo, Fragment, useContext } from "react";
import { Button, Card, Column, Common, Props, Row, Space, Text, Toggle, Tooltip, useAnimation, VMath } from "v-eris";
import { BuildContext } from "../components/Build/build";

import "./types.table.params.scss"

export const TypeTableParams = ( props: any ) => {
	let { value, token, storage, icon, title, params, lang, roles, policy, inactive, selected, mini, onChange, onEdit, onSave, onRemove, paramsOverride, qs, route, system, ...rest } = props;
	let [ forceSelected, setForceSelected ] = useState( selected );
	let timeout = useRef<NodeJS.Timeout>( 0 as any );
	const childrenElem = useAnimation.Expand( 
		selected ? forceSelected : false, //only approve animation if content already inside div
		{ title: title, minHeight: "1px" } 
	);

	const build: BuildContext = useContext( BuildContext );

	if( !value )
		value = {};	
	if( !params )
		params = [];

	let change = ( key: string, valueArg: any ) => {

		if( storage ){
			storage.change( key, valueArg );
			return;
		};

		let v = { ...value };
		v[ key ] = valueArg;

		if( !onChange )
			return;
		
		onChange({ value: v });
	};

	useEffect(() => {

		clearTimeout( timeout.current );

		if( !forceSelected && selected ){
			setForceSelected( true );
			return;
		};

		if( forceSelected && !selected ){
			timeout.current = setTimeout(() => {
				timeout.current = 0 as any;
				setForceSelected( false );
			}, 1000 );
			return;
		};

	}, [ selected ]);
	useEffect(() => {
		return () => {
			clearTimeout( timeout.current );
		}
	}, []);

	const content = useMemo(() => {

		if( mini && !forceSelected ){
			return <div></div>;
		};

		return (
		<Card header={ <span>{ icon }<Space/>{ title }</span> } headerless={ true }>
			{
				params.map(( item: any ) => {

					if( mini && !item.mini )
						return null;

					let title = lang.get( item.title );
					let element = React.cloneElement( build.types[ item.type ], { 
						value: storage && storage.getValue( item.key ) !== undefined ? storage.getValue( item.key ) : (value[ item.key ] === undefined ? item.value : value[ item.key ]), 
						k: item.key, 
						params: item.params, 
						storage: storage,
						lang: lang, 
						stack: item.stack, 
						permissions: null,
						qs: qs,
						route: item.route ? item.route : route,
						group: item.group,
						inactive: item.inactive === undefined ? inactive : item.inactive,
						nested: true,
						roles: roles,
						policy: policy,
						token: token,
						paramsOverride: paramsOverride[ item.key ],
						onChange: ( e: any, keyIndex: number ) => {
							change( item.key, e.value );
						} 
					});

					return item.newLine && (!mini || item.type == "table") ? 
					(
						<Fragment key={ item.key }>
							<Row>{ title }{ title ? ":" : "" }{ title ? <Space/> : null }</Row>
							<Row>{ element }</Row>
						</Fragment>
					)
					:
					(
						<Row key={ item.key }>
							<div className={ "settings-type-params-left" }>{ title }{ title ? ":" : "" }</div>
							<div className={ "settings-type-params-right" }>{ element }</div>
						</Row>
					)
				})			
			}
			<Row className={ "settings-type-params-tools-mini" }>
				<Text success onClick={ onEdit }>Edit</Text>
				<Text alert onClick={ onRemove }>Remove</Text>
			</Row>		
			<Row className={ "settings-type-params-tools" }>
				<Button success onClick={() => { onSave({ value: value }) }}>Save</Button>
				<Button danger onClick={ onRemove }>Remove</Button>
			</Row>
		</Card>
		);
	}, [ lang, params, icon, title, forceSelected, mini, selected, value, storage ? storage.changed : null ]);

	return (
	<div className={ Props.className( "settings-type-params", { mini: mini, system: system } ) } ref={ mini ? childrenElem : null }>
		{ content }
	</div>
	);
};