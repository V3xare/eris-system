import React, { useMemo, useContext, useEffect, useRef, useState } from "react";
import { Row, Tooltip, Icons, Column, Props, Text, LangContext, Select, MultiSelect, Common, Space, Icon, LangContextType } from "v-eris";
import { Color } from "../../types/types.color";
import { BuildContext, BuildContextType } from "../Build/build";
import { SettingsInitType } from "../../utility/use.settings";
import { AuthContext, AuthContextType } from "../../components/Auth/auth";

import "./tools.scss"

export const Tools = ( props: any ) => {
	let { className, column, cycle, simple, style, onChange, value, list, ...rest } = props;
	const lang: LangContextType = useContext( LangContext );
	const wrapElem: any = useRef( null );
	const build: BuildContextType = useContext( BuildContext );
	const auth: AuthContextType = useContext( AuthContext );
	const [ state, setState ] = useState({});
	let settings: SettingsInitType = build.settings;

	if( !list )
		list = [];

	const elemsWidthChildren: any[] = [];	
	const standAlone = onChange ? false : true;
	const mapApiState = standAlone ? state : value;

	let getToolValue = ( key: string ) => {

		if( standAlone ){

			let needle = list.find(( f: any ) => f.key == key );

			if( needle && needle.children )
				return true;

			return mapApiState[ key ];
		};

		return mapApiState[ key ];
	};	
	let setToolValue = ( data: any, type?: string ) => {

		if( standAlone ){
			mapApiState[ data.key ] = data.value;
			return;
		};

		onChange({ type: type || data.type, key: data.key, value: data.value });
	};	
	let setSettings = ( settingsSource: string ) => {
		setToolValue({ key: settingsSource }, "settings" );
	};

	let clickout = () => {

		for( const item of elemsWidthChildren ){

			if( !getToolValue( item.key ) )
				continue;

			let data = { ...item, value: !getToolValue( item.key ) };
			setToolValue( data );
		};

	};

	useEffect(() => {
		let fn = ( event: any ) => {

			if( !wrapElem.current )
				return;

			const inside = wrapElem.current.contains( event.target );	

			if( inside )
				return;

			clickout();
		};
		document.addEventListener( "mousedown", fn );
		return () => {
			document.removeEventListener( "mousedown", fn );
		}
	}, [ mapApiState, lang.current ]);	

	const makeEvent = ( e: any, item: any, depth: number, forceValue?: any ) => {
			
		if( e.defaultPrevented )
			return;

		if( !depth )
			clickout();

		let key = item.redirect ? item.redirect : item.key;
		let v = settings.keyExist( item.key ) ? settings.getSecureValue( key ) : getToolValue( key );
		let value = (item.type == "toggle" || item.type == "selector") ? !v : v;

		if( forceValue !== undefined )
			value = forceValue;

		let event = { 
			event: e, 
			target: item,
			value: value,
			redirect: item.redirect,
			feedback: null,
			preventDefault: function(){
				this.defaultPrevented = true;
			},
			defaultPrevented: false
		};

		if( event.defaultPrevented )
			return;

		let data = { ...item, value: event.value };
		data.key = key;

		if( settings.keyExist( key ) ){
			if( auth.access < 5 ){
				settings.change( key, data.value );
			}else{
				settings.setValueAsync( key, data.value, true );
			};
		}else
			setToolValue( data );

	};
	const makeTool = ( item: any, index: number, depth: number ) => {

		let children: any[] | null = item.children && Array.isArray( item.children ) && item.children.length ? [] : null;
		let visibleElements = 0;

		if( children ){

			elemsWidthChildren.push( item );

			let n = 0;

			for( const child of item.children ){
				let temp = makeTool( child, n, depth + 1 );
				visibleElements += temp.hidden ? 0 : 1;
				children?.push( temp.elem );
				n++;
			};

		};

		let value: any = null;
		let secureRef = settings.getSecureValue( item.secure );
		let secureValue = settings.getSecureValue( item.key );
		let secureTable = secureValue && secureValue.table ? { ...secureValue.table } : {};
		let systemData = settings.getSystemData( item.key );
		let inheritedTitle = "";
		let params: any = false;
		let inheritedDesc = settings.getDesc( item.key );
		let settingsVisibility = settings.getSecureValue( item.settingsVisibility ) ? true : false;
		let subVisibility = settings.getSecureValue( item.subVisibility );
		let visibilityKey = settings.keyExist( item.visibilityKey ) ? settings.getSecureValue( item.visibilityKey ) : true;
		let itemVisible = settings.keyExist( item.visibility ) ? settings.getSecureValue( item.visibility ) : true;
		let extra = item.extra || {};
		let itemHidden = itemVisible !== true;
		let disabled = item.disabled;
		let icon = item.icon || (systemData ? systemData.icon : null);
		let offParam = "";

		if( !systemData ){
			inheritedTitle = settings.keyExist( item.key ) ? settings.getTitle( item.key ) : lang.get( item.key );
		}else if( extra.query ){
			inheritedTitle = systemData.button || settings.getTitle( item.key );
			params = [ ...secureValue.list ];
			secureValue = { list: [] };

			for( let item of params ){

				if( !secureTable[ item.token ] || !secureTable[ item.token ].Active )
					continue;

				secureValue.list.push( item.token );
			};

		}else{
			inheritedTitle = systemData.button || settings.getTitle( item.key );
			params = systemData.params && Array.isArray( systemData.params ) ? [ ...systemData.params ] : false;
			let secureArray = settings.getSecureValue( systemData.secure );

			if( params && secureArray && Array.isArray( secureArray.list ) ){
				params = params.filter(( f: any ) => secureArray.list.indexOf( f.value ) > -1 );
			};

			if( params ){

				let f = params.findIndex(( f: any ) => f.defaultIgnored );

				if( f > -1 )
					offParam = params[ f ].value;

			};

		};

		if( !itemHidden && visibilityKey && Array.isArray( visibilityKey.list ) && item.visibilityValue ){

			if( visibilityKey.list.indexOf( item.visibilityValue ) < 0 )
				itemHidden = true;
			else
				itemHidden = false;

		};

		if( Array.isArray( params ) && !params.length )
			itemHidden = true;
		if( children && !visibleElements )
			itemHidden = true;

		if( item.type == "display" ){
			value = settings.keyExist( item.key ) ? secureValue : getToolValue( item.key );
		}else if( item.type == "newline" ){
			return { 
				hidden: itemHidden, 
				elem: (<div 
					className={ "tools-module-newline" + (itemHidden ? " hidden" : "") } 
					key={ item.key || index }
				></div>)
			};
		}else if( extra.query ){
			value = (
				<div className={ (depth > 0 ? "column" : "row") }>
					<MultiSelect 
						value={ secureValue ? (secureValue.list || secureValue) : [] }
						headerless
						stretch
						style={{ display: subVisibility === false ? "none" : null }}
						className={ (params || []).length < 2 ? "hidden" : "" }
						onChange={( event: any ) => { 

							let v = { ...secureTable };

							for( let item of params ){
								v[ item.token ].Active = false;
							};

							for( let token of event.value ){
								v[ token ].Active = true;
							};

							makeEvent( {}, item, depth, v ) 
						}} 
						suggestions={ (params || []).map(( item: any ) => {
							return { 
								value: item.token, 
								icon: (

								<Tooltip 
									content={ item.name } 
								>
									<Icon style={{ fontFamily: "inherit" }}>
										<Color simple value={ (((secureRef || {}).table || {})[ item.token ] || {}).MarksColor }/>
										{ Common.paddingLeft( item.sac, 3, "0" ) + ":" + Common.paddingLeft( item.sic, 3, "0" ) }
									</Icon>
								</Tooltip>

								), 
							};
						})}
					/>									
				</div>
			);					
		}else if( item.type == "list" ){
			value = (
				<div className={ (depth > 0 ? "column" : "row") }>
					<Row 
						className={ "tools-module-text tools-module-clickable" + (depth > 0 && ((systemData && systemData.button) || item.button) ? "" : " hidden") } 
						key={ item.key || index }
						onClick={() => {

							if( !secureRef )
								return;	

							makeEvent( {}, item, depth, { ...secureValue, list: secureValue && secureValue.list && !secureValue.list.length ? [ secureRef.defaultValue ] : [] } );
						}}
					>
						{ icon }
						<Text>
							{ lang.get( inheritedTitle ) }
							<span 
								className={ Props.className( "tools-module-line-settings", { hidden: !item.settings || !settingsVisibility }) } 
								onClick={( e ) => { e.stopPropagation(); setSettings( item.settings ); }
							}>
								<Icons.cog/>
							</span>							
						</Text>						
					</Row>
					<MultiSelect 
						value={ secureValue ? (secureValue.list || secureValue) : [] }
						headerless
						stretch
						style={{ display: subVisibility === false ? "none" : null }}
						className={ (params || []).length < 2 ? "hidden" : "" }
						{ ...extra }
						onChange={( v: any ) => makeEvent( {}, item, depth, { list: v.value, sort: v.sort, defaultValue: v.defaultValue } ) } 
						suggestions={(Array.isArray( params ) ? params : []).map(( child ) => {
							return { 
								title: simple ? (lang.get( child.prefix ) || lang.get( child.title )) : lang.get( child.title ), 
								value: child.value, 
								icon: (!simple && child.icon ? (
									<Tooltip 
										content={ lang.get( child.title ) } 
									>
										{ child.icon }
									</Tooltip>
								) : (child.icon)) 
							};
						})}
					/>									
				</div>
			);		
		}else if( item.type == "slider" ){
			value = (
				<div className={ (depth > 0 ? "column" : "row") }>
					<Row 
						className={ "tools-module-text tools-module-clickable" + (depth > 0 && ((systemData && systemData.button) || item.button) ? "" : " hidden") } 
						key={ item.key || index }
						onClick={() => {

							if( !secureRef || !secureRef.defaultValue || !offParam )
								return;	

							makeEvent( {}, item, depth, secureValue == offParam ? secureRef.defaultValue : offParam );
						}}
					>
						{ icon }
						<Text>
							{ lang.get( inheritedTitle ) }
							<span 
								className={ Props.className( "tools-module-line-settings", { hidden: !item.settings || !settingsVisibility }) } 
								onClick={( e ) => { e.stopPropagation(); setSettings( item.settings ); }
							}>
								<Icons.cog/>
							</span>							
						</Text>						
					</Row>
					<Select 
						icon={ icon } cycle={ cycle } stretch={ depth > 0 } headerless={ depth > 0 } row={ depth > 0 } 
						minWidth={ depth > 0 ? undefined : "20px" } 
						value={ secureValue } 
						style={{ display: subVisibility === false ? "none" : null }}
						className={ (params || []).length < 2 ? "hidden" : "" }
						{ ...extra }
						onSelect={( v: any ) => makeEvent( {}, item, depth, v.value ) } 
						list={(Array.isArray( params ) ? params : []).map(( child ) => {
							return { title: simple ? (lang.get( child.prefix ) || lang.get( child.title )) : lang.get( child.title ), value: child.value, icon: child.icon };
						})}
					/>		
				</div>
			);		
		}else if( item.type == "buttons" ){
			value = (
			<Row className={ "tools-module-text tools-module-buttons" } key={ item.key || index }>
				{ icon }
				<Text>
					{ lang.get( inheritedTitle ) }
					<span 
						className={ Props.className( "tools-module-line-settings", { hidden: !item.settings || !settingsVisibility }) } 
						onClick={( e ) => { e.stopPropagation(); setSettings( item.settings ); }
					}>
						<Icons.cog/>
					</span>
				</Text>
			</Row>
		);
		}else if( item.type == "settings" ){
			value = (
				<Row className={ "tools-module-line-simple" } key={ item.key || index }>
					<span 
						onClick={( e ) => { e.stopPropagation(); setSettings( item.settings ); }
					}>
						{ icon }
					</span>
				</Row>
			);
		}else if( item.type == "selector" ){
			value = (<Row className={ "tools-module-line"} key={ item.key || index }>{
				(<React.Fragment>{ icon }<Text>{ 
					((settings.keyExist( item.link ) ? settings.getSecureValue( item.link ) : getToolValue( item.link )) || "") + (item.appendix || "") 
				}</Text></React.Fragment>) 
			}</Row>);
		}else{
			value = (<Row className={ "tools-module-line" + (simple && depth < 1 ? " tools-module-line-simple" : "") } key={ item.key || index }>
				{ icon }
				<Text>
					{ lang.get( inheritedTitle ) }
					<span 
						className={ Props.className( "tools-module-line-settings", { hidden: !item.settings || !settingsVisibility }) } 
						onClick={( e ) => { e.stopPropagation(); setSettings( item.settings ); }
					}>
						<Icons.cog/>
					</span>
				</Text>
			</Row>);
		};

		let hidden = depth > 0 ? (!lang.get( inheritedDesc )) : (!lang.get( inheritedTitle ));
		let active = false;

		if( (item.type == "slider" || item.type == "toggle") && offParam ){
			active = secureValue != offParam;
		}else if( item.type == "list" ){
			active = secureValue && secureValue.list && secureValue.list.length;
		}else{
			active = (item.type == "toggle") && (settings.keyExist( item.key ) ? secureValue : getToolValue( item.key ));
		};

		return { hidden: itemHidden, elem: (

				<div 
				className={ 
					Props.className( "tools-module-item", { 
						hidden: itemHidden,
						display: item.type == "display",
						disabled: disabled,
						extraPadding: item.extraPadding,
						selector: item.type == "selector",
						active: active
					})
				} 
				key={ (item.key || index) + ":" + item.secure } 
				onClick={( e ) => {

					if( depth < 1 && secureRef && secureRef.defaultValue && offParam ){
						makeEvent( {}, item, depth, secureValue == offParam ? secureRef.defaultValue : offParam );
						return;
					};

					if( item.type != "toggle" )
						return;

					makeEvent( e, item, depth );
				}}
				>

					<Tooltip 
						content={ depth > 0 ? lang.get( inheritedDesc ) : lang.get( inheritedTitle ) } 
						key={ (item.key || index) + ":" + item.secure } 
						free={ depth > 0 ? false : true }
						style={{ 
							opacity: hidden ? "0" : null,
							pointerEvents: hidden ? "none" : null,
						}}
					>
						{ value }
					</Tooltip>


					<div className={
						Props.className( "tools-module-children", { 
							active: children && (settings.keyExist( item.key ) ? secureValue : getToolValue( item.key ))
						})
					} onClick={( e ) => {
						e.preventDefault();
					}}>{ children }</div>
				</div>
		)};
	};	

	const elements = useMemo(() => {
		let length = 0;
		let p = list.map(( item: any, index: number ) => {
			let temp = makeTool( item, index, 0 );
			length += temp.hidden ? 0 : 1;
			return temp.elem;
		});

		return { length: length, list: p };
	}, [ mapApiState, lang.current, settings.it ]);

	return (
		<div className={ Props.className( "tools-module", { hidden: elements.length < 1, simple: simple }) } ref={ wrapElem } style={ style }>
			{
				column ? ( <Column gap={ simple ? 5 : 14 }>{ elements.list }</Column>) : ( <Row gap={ simple ? 5 : 14 }>{ elements.list }</Row>)
			}
		</div>
	);
};