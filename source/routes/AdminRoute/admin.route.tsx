import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Card, List, LangContext, Common, Button, useAsync, Space, Column, Row, Props, LangContextType } from "v-eris";
import { ContentMenu } from "../../placeholders/ContentMenu/content.menu";
import { ContentContainer } from "../../placeholders/ContentContainer/content.container";
import { useNavigate, useLocation } from "react-router-dom";
import { useStorage, StorageContext } from "../../utility/use.storage";
import { BuildContext, BuildContextType, BuildRoute, BuildSectionItem } from "../../components/Build/build";

const AdminCreateLine = ( route: BuildRoute, types: any, props: any, updateTable: any ) => {
	let { k, parameter, lang, qs, nav, location, section, value, storage, paramsOverride } = props;
	let storageValue = storage.getValue( k );
	let v = parameter.path ? (qs[ parameter.path ]) : (storageValue === undefined ? value : storageValue);

	if( v === undefined ){
		v = parameter.value;
	};
	
	updateTable[ k ] = v;

	return React.cloneElement( types[ parameter.type ], { 
		lang: lang,
		params: parameter.params,
		extra: parameter.extra,
		filter: parameter.filter,
		dynamic: parameter.dynamic,
		paramsOverride: paramsOverride,
		value: v,
		qs: qs,
		route: route.sections[ section ].route,
		feedback: ( value: any, extra: any ) => {
			storage.change( k, value );
		},		
		onChange: ( e: any ) => {
			storage.change( k, e.value );
		
			if( parameter.path )
				nav( Common.setQuery( location, { [parameter.path]: e.value } ) );
		
		}
	});
};

export const AdminRoute = () => {
	const lang: LangContextType = useContext( LangContext );
	const nav = useNavigate();
	const location = useLocation();
	const qs = Common.parseQuery( location );
	const build: BuildContextType = useContext( BuildContext );
	const route: BuildRoute = build.routes[ "admin" ];

	qs.section = Common.string( qs.section || "" );
	qs.token = Common.string( qs.token || "" );

	if( !route.sections[ Common.string( qs.section ) ] )
		qs.section = "Users";

	const section: string = qs.section as string;
	const sectionItem = route.sections[ section ] || {};
	const sectionTable = route.table[ section ] || [];

	const routeStorage = useStorage({ 
		token: "default",
		section: sectionItem.route || "", 
		current: sectionItem.global,
		ignoreList: true,
	});	

	const roles = useAsync({
		method: "POST",
		url: "./roles/list/"
	}, {});
	roles.onResponse(( response: any ) => {
		routeStorage.overwrite( "roles", response.data );
	});	
	useEffect(() => {
		roles.fetch();
	}, [ qs.section ]);

	const policy = useAsync({
		method: "POST",
		url: "./policy/list/"
	}, {});
	policy.onResponse(( response: any ) => {
		routeStorage.overwrite( "policy", response.data );
	});	
	useEffect(() => {
		policy.fetch();
	}, [ qs.section ]);	
	
	const configurations = useAsync({
		method: "POST",
		url: "./configurations/list/"
	}, {});
	configurations.onResponse(( response: any ) => {
		routeStorage.overwrite( "configurations", response.data );
	});	
	useEffect(() => {
		configurations.fetch();
	}, [ qs.section ]);


	let paramsOverride = {
		save: {
			onChange: ( e: any, params: any ) => {
				e.stopPropagation();
				routeStorage.save({ parseKeys: true });
			}
		}
	} as any;

	let contentList = useMemo(() => {
		let updateTable = {};
		let elements = sectionTable.map(( item: any ) => {
			return (
			<Card className={ "content-line" } key={ item.key } header={ 
				item.title ? (<span>{ item.icon }<Space/>{ lang.get( item.title ) }</span>) : null
			}>{
				(item.list || []).map(( parameter: any ) => {
					let key = parameter.key;//PermissionParamToKey( qs.section as string, item.key, parameter.key );
					return <Card key={ key } header={ 
						parameter.title ? 
						(
						<div>							
							{ lang.get( parameter.title ) }
							<Space/>
						</div>
						)
						: 
						null
					}>{
						<Column className={ "content-parameter" }>
							{ parameter.desc ? 
								(<Row align={ "center" }>
									<Row>{ 
										(parameter.left || []).map(( p1: any ) => {
											let k = p1.key;//PermissionParamToKey( qs.section as string, item.key, p1.key );
											return <React.Fragment key={ k }>
												{
													AdminCreateLine( route, build.types, {
														k: k,
														value: p1.value,
														parameter: p1,
														paramsOverride: paramsOverride[ p1.key ],
														lang: lang,
														qs: qs,
														nav: nav,
														location: location,
														section: section,
														storage: routeStorage
													}, updateTable )
												}
												<Space/>
											</React.Fragment>
										})
									}</Row>
									<Row>{ lang.get( parameter.desc ) }</Row>
									<Row>{ 
										(parameter.right || []).map(( p1: any ) => {
											let k = p1.key;//PermissionParamToKey( qs.section as string, item.key, p1.key );
											return <React.Fragment key={ k }>
												<Space/>
												{
													AdminCreateLine( route, build.types, {
														k: k,
														value: p1.value,
														parameter: p1,
														paramsOverride: paramsOverride[ p1.key ],
														lang: lang,
														qs: qs,
														nav: nav,
														location: location,
														section: section,
														storage: routeStorage
													}, updateTable )
												}
											</React.Fragment>
									})
									}</Row>
								</Row>) : null 
							}
							<Row>{ 
								AdminCreateLine( route, build.types, {
									k: key,
									value: item.value,
									parameter: parameter,
									paramsOverride: paramsOverride[ parameter.key ],
									lang: lang,
									qs: qs,
									nav: nav,
									location: location,
									section: section,
									storage: routeStorage
								}, updateTable )
							}
							</Row>
						</Column>
					}</Card>
				})

			}</Card>
			)
		});

		routeStorage.changeMulti( updateTable );

		return elements;
	}, [ qs.section, qs.token, routeStorage.it, build.currentLang ]);

	return (
		<StorageContext.Provider value={ routeStorage }>
			<div className={ "eris-content eris-content-selector" }>
				<ContentMenu>
					<List value={ Common.setQuery( location, { section: qs.section } ) } onChange={( event: any ) => nav( event.value ) } padding={[ 3, 6, 3, 8 ]}>
						{
							route.list.map(( item: BuildSectionItem ) => {
								let list: BuildSectionItem[] = item.list || [];

								return (
									<List.Item key={ item.key } title={ lang.get( item.title ) } icon={ item.icon } value={ Common.setQuery( location, { section: item.key } ) }>
										{
											list.length ? 
												(list.map(( child ) => 
													<List.Item key={ item.key + ":" + child.key } title={ lang.get( child.title ) } icon={ child.icon } value={ Common.setQuery( location, { section: child.key } ) }>
														{ lang.get( child.title ) }
													</List.Item> 
												)) 
												: 
												(lang.get( item.title ))
										}
									</List.Item>
								);
							})
						}
					</List>
				</ContentMenu>
				<ContentContainer>
					<div className={ "eris-content-header" }><Space/><Space/></div>
					<div className={ "eris-content-wrap" }>
						<Card 
							className={ "eris-content-card" }
						>
							{ contentList }
						</Card>
					</div>			
				</ContentContainer>
			</div>
		</StorageContext.Provider>
	);
};
