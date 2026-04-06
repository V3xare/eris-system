import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Card, List, Icons, LangContext, Common, Cookie, Row, Icon, Button, useAsync, Select, Column, Props, Space, Modal, useDelta } from "v-eris";
import { Types } from "./types";
import { TypeTableParams } from "./types.table.params";
import { useStorage, StorageContext, StorageInitType } from "../utility/use.storage";
import { ParseWhere } from "./types.appendix";
import { BuildContext, BuildContextType } from "../components/Build/build";


export const TypeTable = ( props: any ) => {

	let { 
		params,
		icon,
		value,
		lang,
		inactive,
		qs,
		route,
		nested,
		filter,
		onChange,
		...rest 
	} = props;	

	const [ selectedLine, setSelectedLine ] = useState( null );
	const [ selectedToken, setSelectedToken ] = useState( null );
	const routeStorage: StorageInitType = useContext( StorageContext );
	const build: BuildContextType = useContext( BuildContext );
	const nav = useNavigate();
	const location = useLocation();

	const whereAny = props.group ? { token: props.value } : {};
	
	let where = useMemo(() => {
		return ParseWhere( filter, routeStorage );
	}, [ route, filter, routeStorage.it ]);

	let storage = useStorage({ 
		token: selectedToken,
		where: where,
		whereAny: whereAny,
		section: route, 
		current: selectedToken ? true : false
	});

	let inList = selectedToken && storage.list.findIndex(( f ) => f.token == selectedToken ) > -1;

	useEffect(() => {
		
		if( filter )
			return;

		storage.async.list.fetch();
	}, [ route ]);	

	useEffect(() => {

		if( (!filter && !whereAny) || (!Object.keys( where ).length && !Object.keys( whereAny ).length) )
			return;

		storage.async.list.fetch();
	}, [ route, where, whereAny.token ]);

	let paramsOverride = {
		redirectConfiguration: {
			onChange: ( e: any, params: any ) => {
				e.stopPropagation();
				nav( "/settings" + Common.setQuery( location, { token: route + ":" + params.token } ) );
			}
		}
	} as any;

	return (
	<div className={ Props.className( "settings-type-table", { mini: nested } ) }>
		<Button className={ inactive ? "hidden" : "" } onClick={() => {
			storage.add({ name: "", description: "" });
		}}>+</Button>	
		<table>
			<thead>
				<tr className={ "settings-type-table-header" }>
					{
						params.map(( cell: any ) => {
						
							if( !cell.mini || cell.mini > 1 )
								return null;
							
							return <th key={ cell.key }>{ lang.get( cell.title ) || cell.title }</th>
						})
					}		
				</tr>
			</thead>
			<tbody className={ "settings-type-table-content" }>
			{
				storage.list.map(( line ) => {
					let isSelected = selectedLine == line.token;
					return (
						<tr 
							key={ line.key } 
							className={ Props.className( "settings-type-table-row", { selected: isSelected } ) }
							onClick={() => {
								
								if( inactive )
									return;
								
								setSelectedLine( line.token );
							}}
						>
							{
								(params.map(( cell: any ) => {

									if( isSelected )
										return null;
								
									if( !cell.mini || cell.mini > 1 )
										return null;

									return <td className={ "settings-type-table-cell" } key={ cell.key }>{ 
										React.cloneElement( build.types[ cell.type ], { 
											value: cell.controlled ? (Array.isArray( value ) ? !!value.find(( f ) => f == line.token ) : false) : (line[ cell.key ] === undefined ? cell.value : line[ cell.key ]), 
											k: cell.key, 
											params: cell.params, 
											lang: lang, 
											stack: cell.stack, 
											permissions: null,
											qs: qs,
											route: route,
											inactive: true,
											token: line.token,
											paramsOverride: paramsOverride[ cell.key ], 
											onChange: ( e: any ) => {
												
												if( !onChange )
													return;

												let list = value ? [ ...value ] : [];
												list = list.filter(( f ) => f != line.token );

												if( e.value )
													list.push( line.token );

												onChange({ value: list });
											}
										}) 										
									}</td>
								}))
							}

							{ 

								<td colSpan={ isSelected ? 99 : 0 }>
									<TypeTableParams
										selected={ isSelected }
										mini={ true }
										inactive={ true }
										title={ line.name } 
										value={ line } 
										icon={ icon } 
										lang={ lang } 
										system={ line.system }
										qs={ qs }
										route={ route }
										params={ params }
										nested={ true }
										token={ line.token }
										paramsOverride={ paramsOverride }
										onEdit={() => {
											setSelectedToken( line.token );
											//storage.async.get.fetch({ token: line.token });
											//nav( Common.setQuery( location, { section: qs.section, token: line.token } ) );
										}}	
										onRemove={() => {
											storage.remove({ token: line.token });
										}}	
									/>
								</td>

							}

						</tr>
					)
				})
			}		
			</tbody>
		</table>
		<Modal className={ "settings-type-params-modal" } bg active={ selectedToken && inList } onClose={() => {
			setSelectedToken( null );
			//nav( Common.setQuery( location, { section: qs.section, token: undefined } ) );
		}}>{
			selectedToken ? (
				<TypeTableParams
					title={ storage.getValue( "name" ) || storage.getValue( "token" ) } 
					storage={ storage } 
					icon={ icon } 
					lang={ lang } 
					params={ params }
					system={ storage.getValue( "system" ) }
					qs={ qs }
					route={ route }	
					nested={ true }
					token={ selectedToken }
					paramsOverride={ paramsOverride }
					onChange={( e: any ) => {
						//setSelectedData( e.value );
					}}
					onSave={( e: any ) => {
						storage.save();
					}}					
					onRemove={( e: any ) => {
						storage.remove({ token: selectedToken }, () => { 
							setSelectedToken( null );
							//nav( Common.setQuery( location, { section: qs.section, token: undefined } ) );
						});
					}}
				/>)
				:
				null
		}</Modal>
	</div>
	);
};