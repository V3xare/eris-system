import React, { useState, useRef, useEffect, useMemo, Fragment, useContext } from "react";
import { Button, Card, Column, Common, Props, Row, Space, Text, Toggle, Tooltip, useAnimation, VMath, Modal } from "v-eris";
import { BuildContext, BuildContextType } from "../components/Build/build";
import { TypeRemove } from "../types/types.remove";

import "./types.table.params.scss"

export const TypeTableParams = ( props: any ) => {
	let { value, token, storage, icon, title, params, lang, roles, policy, inactive, selected, mini, onChange, onCancel, onEdit, onSave, onRemove, paramsOverride, qs, route, system, ...rest } = props;
	let [ forceSelected, setForceSelected ] = useState( selected );
	let timeout = useRef<NodeJS.Timeout>( 0 as any );
	const childrenElem = useAnimation.Expand( 
		selected ? forceSelected : false, //only approve animation if content already inside div
		{ title: title, minHeight: "1px" } 
	);
	const statusWrap = useRef<any>( null );
	const statusInterval = useRef<NodeJS.Timeout>( 0 as any );
	const [ lastSave, setLastSave ] = useState({
		date: new Date(),
		success: 0,
	});

	const build: BuildContextType = useContext( BuildContext );

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

		setLastSave({
			date: new Date(),
			success: 0,
		});

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

	const save = () => {
			
		onSave({ 

			success: ( result: any ) => {
				setLastSave({
					date: new Date(),
					success: 1,
				});
			}, 			

			failure: ( result: any ) => {
				setLastSave({
					date: new Date(),
					success: -1,
				});
			}, 

		});

	};

	const keyListener = ( event: KeyboardEvent ) => {

		if( event.keyCode == 27 ){
			onCancel();
		};
		if( event.keyCode == 13 ){
			save();
		};

	};

	const constructStatusValue = () => {
		return (lastSave.success == 1 ? 
					(lang.get( "Apply::Success", [ Common.uint( ((+(new Date())) - (+lastSave.date)) / 1000.0 ) ] )) 
					: 
				(lastSave.success == -1 ? 
					(lang.get( "Apply::Failure", [ Common.uint( ((+(new Date())) - (+lastSave.date)) / 1000.0 ) ] ))
					: 
					null
				)
		);
	};
	const constructStatus = () => {

		if( !statusWrap.current )
			return;

		statusWrap.current.innerHTML = constructStatusValue();
	};

	useEffect(() => {
		clearInterval( statusInterval.current );
		statusInterval.current = setInterval( constructStatus, 1000 );
		return () => {
			clearInterval( statusInterval.current );
		};
	}, [ lastSave.date ]);

	useEffect(() => {
		return () => {
			clearTimeout( timeout.current );
			document.removeEventListener( "keyup", keyListener );
			clearInterval( statusInterval.current );
		};
	}, []);	

	useEffect(() => {
		document.addEventListener( "keyup", keyListener );
		return () => {
			document.removeEventListener( "keyup", keyListener );
		};
	}, [ value ]);

	const content = useMemo(() => {

		if( mini && !forceSelected ){
			return <div></div>;
		};

		return (
		<Card className={ Props.className( "settings-type-params-content" ) } headerless={ true }>
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
						<Column key={ item.key }>
							<div className={ "settings-type-params-left" }>{ title }{ title ? ":" : "" }</div>
							<div className={ "settings-type-params-right" }>{ element }</div>
						</Column>
					)
				})			
			}
		</Card>
		);
	}, [ lang, params, icon, title, forceSelected, mini, selected, value, storage ? storage.changed : null ]);

	return (
	<div className={ Props.className( "settings-type-params", { mini: mini, system: system } ) } ref={ mini ? childrenElem : null }>
		<div className={ Props.className( "settings-type-params-header" ) }>
			{ title }
			<Button onClick={() => { onCancel(); }}>{ lang.get( "Cancel" ) }</Button>
		</div>
		{ content }
		<div className={ Props.className( "settings-type-params-bottom" ) }>

			<Row className={ "settings-type-params-tools" }>
				<div className={ Props.className( "settings-type-params-status", { success: lastSave.success == 1, failure: lastSave.success == -1 } ) } ref={ statusWrap }>
					{ constructStatusValue() }
				</div>
				<Button success onClick={() => { save(); }}>{ lang.get( "Apply" ) }</Button>
				<TypeRemove onClick={ onRemove } isText/>							
 			</Row>		

		</div>
	</div>
	);
};