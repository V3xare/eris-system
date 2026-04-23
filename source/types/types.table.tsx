import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { Card, List, Icons, LangContext, Common, Cookie, Row, Icon, Button, useAsync, Select, Column, Props, Space, Modal, useDelta } from "v-eris";
import { Types } from "./types";
import { TypeTableParams } from "./types.table.params";
import { useStorage, StorageContext, StorageInitType } from "../utility/use.storage";
import { ParseWhere } from "./types.appendix";
import { Pagination } from "./types.pagination";
import { BuildContext, BuildContextType } from "../components/Build/build";
import { TypeRemove } from "./types.remove";


export const TypeTable = ( props: any ) => {

	let { 
		params,
		icon,
		value,
		lang,
		inactive,
		dynamic,
		qs,
		route,
		nested,
		filter,
		onChange,
		...rest 
	} = props;	

	const [ selectedLine, setSelectedLine ] = useState( null );
	const [ selectedToken, setSelectedToken ] = useState( null );
	const [ offset, setOffset ] = useState( 0 );
	const [ limit, setLimit ] = useState( 20 );
	const routeStorage: StorageInitType = useContext( StorageContext );
	const build: BuildContextType = useContext( BuildContext );

	const whereAny = props.group ? { token: props.value } : {};
	
	let where: {[key: string]: any} = useMemo(() => {
		return ParseWhere( filter, routeStorage );;
	}, [ route, filter, routeStorage.it ]);

	useDelta(() => {
		setOffset( 0 );
		setSelectedLine( null );
		setSelectedToken( null );
	}, [ where ], where );
	useEffect(() => {
		setOffset( 0 );
		setSelectedLine( null );
		setSelectedToken( null );
	}, [ route] );	
	useEffect(() => {
		setSelectedLine( null );
		setSelectedToken( null );
	}, [ offset, limit ] );

	let storage = useStorage({ 
		token: selectedToken,
		where: where,
		whereAny: whereAny,
		section: route, 
		offset: offset,
		limit: limit,
		pagination: true,
		current: selectedToken ? true : false,
	});

	let inList = selectedToken && storage.list.findIndex(( f ) => f.token == selectedToken ) > -1;

	let paramsOverride = {
		redirectConfiguration: {
			onChange: ( e: any, params: any ) => {
				e.stopPropagation();
				build.setQueryString( "/settings" + build.buildQuery({ token: route + ":" + params.token }) );
			}
		}
	} as any;

	return (
	<div className={ Props.className( "settings-type-table", { mini: nested } ) }>
		<table>
			<thead>
				<tr className={ "settings-type-table-header" }>
					<th>
						<Button className={ inactive || dynamic === false ? "hidden" : "" } onClick={() => {
							setOffset( 0 );
							storage.add({ name: "", description: "" }, ( data ) => {
								setSelectedToken( data.token );
							});
						}}>+</Button>	
					</th>
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
					let isSelectedToken = selectedToken == line.token;
					return (
						<tr 
							key={ line.key } 
							className={ Props.className( "settings-type-table-row", { selected: isSelected, hovered: isSelectedToken } ) }
							onClick={( e ) => {
								
								if( inactive )
									return;

								if( Common.insideClass( e.target as any, "button" ) )
									return;
								
								//setSelectedLine( line.token );
								setSelectedToken( line.token );
							}}
						>

							{
							<td className={ "settings-type-table-cell" } key={ "index" }>
								{ line.index }
							</td>
							}

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
							<td className={ "settings-type-table-cell" + (inactive ? " hidden" : "") } key={ "remove" }>
								<TypeRemove onClick={ () => storage.remove({ token: line.token }) }/>
							</td>
							}

							{ 

//								<td colSpan={ isSelected ? 99 : 0 }>
//									<TypeTableParams
//										selected={ isSelected }
//										mini={ true }
//										inactive={ true }
//										title={ line.name } 
//										value={ line } 
//										icon={ icon } 
//										lang={ lang } 
//										system={ line.system }
//										qs={ qs }
//										route={ route }
//										params={ params }
//										nested={ true }
//										token={ line.token }
//										paramsOverride={ paramsOverride }
//										onEdit={() => {
//											setSelectedToken( line.token );
//											//storage.async.get.fetch({ token: line.token });
//											//nav( Common.setQuery( location, { section: qs.section, token: line.token } ) );
//										}}	
//										onRemove={() => {
//											storage.remove({ token: line.token });
//										}}	
//									/>
//								</td>

							}

						</tr>
					)
				})
			}		
			</tbody>
		</table>
		<Pagination offset={ offset } limit={ limit } length={ storage.length } autoHide={ inactive } onChange={( e ) => { 
			setOffset( e.offset ); 
		}}/>
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