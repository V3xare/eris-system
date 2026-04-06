import "./auth.scss";

import React, { useRef, useReducer, useContext, useEffect, useMemo } from "react";
import { Login } from "../../utility/login";
import { Common, Cookie, LangContext, Select, useAsync } from "v-eris";
import { NotificationsContext } from "../Notifications/notifications";
import { useNavigate } from "react-router-dom";

export function AuthReducer( state: any, [ type, data ] : any ){

	if( type == "tab" ){
		const type = Common.uint( data.type );
		let errors = { ...state.errors };

		if( type != state.type ){
			errors[ "name" ] = state.name ? (Login.checkLogin( state.name ) || {}).description : "";
			errors[ "email" ] = state.email ? (Login.checkEmail( state.email ) || {}).description : "";
			errors[ "oldPassword" ] = state.oldPassword ? (Login.checkPass( state.oldPassword, state.policyList[ 0 ] ) || {}) : "";
			errors[ "password" ] = state.password ? (Login.checkPass( state.password, state.policyList[ 0 ] ) || {}) : "";
			errors[ "password2" ] = state.password2 ? (Login.checkPass( state.password2, state.policyList[ 0 ] ) || {}) : "";
			errors[ "server" ] = "";
		};

		return { ...state, type: type, errors: errors };
	}else if( type == "access" ){
		return { ...state, [ "access" ]: data.value || 0 };
	}else if( type == "name" ){
		return { ...state, [type]: data.value,
			[ "errors" ]: {
				...state.errors, [ "login" ]: (Login.checkLogin( data.value ) || {}).description
			}
		};	
	}else if( type == "email" ){
		return { ...state, [type]: data.value,
			[ "errors" ]: {
				...state.errors, [ "email" ]: (Login.checkEmail( data.value ) || {}).description
			}
		};
	}else if( type == "configuration" ){
		return { 
			...state, 
			configuration: data.value,
		};		
	}else if( type == "password" ){
		return { ...state, [type]: data.value,
			[ "errors" ]: {
				...state.errors, [ "password" ]: (Login.checkPass( data.value, state.policyList[ 0 ] ) || "")
			}
		};	
	}else if( type == "oldPassword" ){
		return { ...state, [type]: data.value,
			[ "errors" ]: {
				...state.errors, [ "oldPassword" ]: (Login.checkPass( data.value, state.policyList[ 0 ] ) || "")
			}
		};
	}else if( type == "password2" ){
		return { ...state, [type]: data.value,
			[ "errors" ]: {
				...state.errors, [ "password2" ]: (Login.checkPass( data.value, state.policyList[ 0 ] ) || "")
			}
		};
	}else if( type == "match" ){
		return { ...state,
			[ "errors" ]: {
				...state.errors, [ "password2" ]: (Login.checkPassMatch( state.password, state.password2 ) || {}).description
			}
		};	
	}else if( type == "init" ){
		return {
			...state, 
			[ "access" ]: data.access || 0, 
			["configurationsList"]: data.configurations,
			["policyList"]: data.policy,
			[ "configuration" ]: data.configuration,
			[ "configurationName" ]: data.configurationName,
			[ "role" ]: data.role,
			[ "roleName" ]: data.roleName,
			["passwordAlert"]: data.passwordAlert,
			["passwordNotify"]: data.passwordNotify,
		};	
	}else if( type == "data" ){
		return { ...state,
			[ "access" ]: data.access || 0, 
			[ "name" ]: data.name, 
			[ "token" ]: data.token, 
			[ "role" ]: data.role, 
			[ "login" ]: data.login, 
			[ "email" ]: data.email,
			[ "configuration" ]: data.configuration,
			[ "policy" ]: data.policy,
			[ "persona" ]: data.persona,
		};		
	}else if( type == "server-error" ){
		return { ...state,
			[ "errors" ]: {
				...state.errors, [ "server" ]: data.description || ""
			}
		};
	}

	return state;
};

const AuthContextDefault = {
	state: {} as any,
	dispatch: ( args: any ) => {},

	persona: true,
	access: 0, 
	name: "", 
	token: "", 
	configuration: "default", 
	configurationsList: [], 		
	configurationName: "default",
	roleName: "",				
	policy: "", 
	policyList: [], 
	role: "", 
	login: "", 
	email: "",

	relogin: () => {},

	async: {
		login: {} as any,
		changePassword: {} as any,
		register: {} as any,
		init: {} as any,
		logout: {} as any,
	}
};
export type AuthContextType = typeof AuthContextDefault;
export const AuthContext = React.createContext( AuthContextDefault );

export const AuthModuleInit = () => {

	const [ state, dispatch ] = useReducer( AuthReducer, {
		access: 0,
		type: 0,
		token: "",
		role: "",
		loading: false,
		name: "",
		email: "",
		oldPassword: "",
		password: "",
		password2: "",
		configuration: "default",
		configurationsList: [],
		policy: "",
		policyList: [],
		logout: false,
		persona: false,
		configurationName: "",
		roleName: "",		
		errors: {
			login: "",
			email: "",
			oldPassword: "",
			password: "",
			password2: "",
			configuration: "",
			server: ""
		}
	});

    const lang: any = useContext( LangContext );
	const cookies = Cookie.parse( document.cookie );
	const notifications = useContext( NotificationsContext );
	const nav = useNavigate();
	
	let data: any = {};

	try{
		data = JSON.parse( cookies.data );
	}catch( e ){};

	useEffect(() => {
		dispatch([ "data", { 
			access: data.access, 
			name: data.name, 
			token: data.token, 
			role: data.role, 
			login: data.login, 
			configuration: state.configuration,
			policy: data.policy,
			email: data.email,
			persona: data.persona
		}]);
	}, [ data.access, data.name, data.token, data.role ]);

	const login = useAsync({
		method: "POST",
		url: "./users/login"
	}, {
		login: state.name,
		password: state.password,
		configuration: state.configuration
	});
	const register = useAsync({
		method: "POST",
		url: "./users/register"
	}, {
		name: state.name,
		email: state.email,
		login: (state.name || "").toLowerCase(),
		configuration: state.configuration,
		password: state.password,
		password2: state.password2,
	});

	login.onResponse(( item: any ) => {
		dispatch([ "access", { value: item.access } ]);
		init.fetch();
		nav( "/" );
	}, ( e: any ) => {
		dispatch([ "server-error", { description: e.description } ]);
		notifications.alert( e.errors );
	});

	register.onResponse(( item: any ) => {
		dispatch([ "access", { value: item.access } ]);
		init.fetch();
	}, ( e: any ) => {
		dispatch([ "server-error", { description: e.description } ]);
		notifications.alert( e.errors );
	});

	const changePassword = useAsync({
		method: "POST",
		url: "./users/changePassword"
	}, {
		oldPassword: state.oldPassword,
		password: state.password,
		password2: state.password2,
	});	
	changePassword.onResponse(( item: any ) => {
		init.fetch();
	}, ( e: any ) => {
		dispatch([ "server-error", { description: e.description } ]);
		notifications.alert( e.errors );
	});

	useEffect(() => {
		init.fetch();
	}, []);	

	const logout = useAsync({
		method: "GET",
		url: "./users/logout"
	}, {});
	logout.onResponse(( response: any ) => {
		init.fetch();
		nav( "/" );
	}, ( e: any ) => {
		dispatch([ "server-error", { description: e.description } ]);
		notifications.alert( e.errors );
	});

	const init = useAsync({
		method: "GET",
		url: "./users/init"
	}, {});
	init.onResponse(( response: any ) => {

		for( let key in response.configurations ){
			response.configurations[ key ].value = response.configurations[ key ].token;
			response.configurations[ key ].title = response.configurations[ key ].name;
		};

		response.configurations.reverse();

		dispatch([ "init", { 
			access: response.access,
			configuration: response.configuration, 
			configurations: response.configurations, 
			configurationName: response.configurationName,
			role: response.role,
			roleName: response.roleName,
			policy: response.policy,
			passwordAlert: response.passwordAlert,
			passwordNotify: response.passwordNotify,
		}]);

		if( response.passwordNotify < 0 && response.passwordAlert > 0 && !data.persona ){

			let day = 24 * 60 * 60;
			let delta = Common.uint( (response.passwordAlert - response.passwordNotify) / day );

			notifications.alert([{ desc: "Password is too old, you have " + delta + " days left to change it" }]);
		};

	}, ( e: any ) => {});

	const relogin = () =>{
		if( state.persona ){
			dispatch([ "access", { value: 0 } ]);
		}else{
			logout.fetch();
		};		
	};

	return { 
		state, dispatch, 
		access: state.access, 
		name: state.name, 
		token: state.token, 
		configuration: state.configuration, 
		configurationsList: state.configurationsList, 		
		configurationName: state.configurationName,
		roleName: state.roleName,				
		policy: state.policy, 
		policyList: state.policyList, 
		role: state.role, 
		login: state.login, 
		email: state.email,
		persona: state.persona,
		relogin: relogin,

		async: {
			login,
			changePassword,
			register,
			init,
			logout
		},

		context: AuthContext
	};
};

export const Auth = ( props: any ) => {
	const module = useContext( AuthContext );
    const { state, dispatch, async } = module;
    const lang: any = useContext( LangContext );
	const cookies = Cookie.parse( document.cookie );
	const notifications = useContext( NotificationsContext );
	const nav = useNavigate();
	
	let data: any = {};

	try{
		data = JSON.parse( cookies.data );
	}catch( e ){};

	//
	if( state.access >= 1 && (state.passwordAlert >= 0 || data.persona || state.access >= 9) ){
		return (
			<div></div>
		);
	};

	let type = state.access >= 0 && (state.passwordAlert < 0 && !data.persona) ? 2 : state.type;

	return (
		<div className={ "eris-auth-wrap fullscreen" }>
			<div className={ "eris-auth-sun" }></div>
			<div className={ "eris-auth-ground" }></div>
			<div className={ "eris-auth" }>
				<div className={ "eris-auth-line" }>
					{
						type == 2 ? (
							<React.Fragment>
								<div
									className={ "eris-auth-tab" + (type == 2 ? " eris-auth-tab-selected" : "") }
									onClick={() => { dispatch([ "tab", { "type": 2 }]) }}>{ lang.get( "Auth::PasswordMustChange" ) }
								</div>
							</React.Fragment>
						) : (
							<React.Fragment>
								<div
									className={ "eris-auth-tab" + (type == 0 ? " eris-auth-tab-selected" : "") }
									onClick={() => { dispatch([ "tab", { "type": 0 }]) }}>{ lang.get( "Auth::Login" ) }
								</div>
								<div
									className={ "eris-auth-tab" + (type == 1 ? " eris-auth-tab-selected" : "") }
									onClick={() => { dispatch([ "tab", { "type": 1 }]) }}>{ lang.get( "Auth::Register" ) }
								</div>				
							</React.Fragment>							
						)
					}

				</div>
				<div className={ "eris-auth-content" }>

					{
						type == 2 ? (
						<React.Fragment>
							<div className={ "eris-auth-password" }></div>
							<input placeholder={ lang.get( "Auth::OldPassword" ) }
								type={ "password" }
								onKeyUp={( e: any ) => {

									if( e.keyCode == 13 ){
										(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
									}else{
										dispatch([ "oldPassword", { value: e.target.value }]);
									};

								}}>{}
							</input>
						</React.Fragment>							
						)
						:
						(
						<React.Fragment>
							<span className={ "eris-auth-configurations" }></span>
							<select
								value={ state.configuration }
								onChange={( e: any ) => {
									dispatch([ "configuration", { value: e.target.value }]);
								}}
							>{
								state.configurationsList.map(( item: any ) => {
									return <option value={ item.token } key={ item.token }>{ item.name }</option>
								})
							}
							</select>	

							<div className={ "eris-auth-name" }></div>
							<input placeholder={ lang.get( "Auth::Name" ) }
								type={ "name" }
								onKeyUp={( e: any ) => {

									if( e.keyCode == 13 ){
										(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
									}else{
										dispatch([ "name", { value: e.target.value }]);
									};

								}}>{}
							</input>
							<div className={ "eris-auth-notice" + (state.errors.login ? "" : " hidden") }>{ state.errors.login }</div>		

						</React.Fragment>
						)
					}			

					{
					type == 1 ?
						(<React.Fragment>
							<div className={ "eris-auth-email" }></div>
							<input placeholder={ lang.get( "Auth::Email" ) }
								type={ "email" }
								onKeyUp={( e: any ) => {

									if( e.keyCode == 13 ){
										(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
									}else{
										dispatch([ "email", { value: e.target.value }]);
									};

								}}>{}
							</input>
							<div className={ "eris-auth-notice" + (state.errors.email ? "" : " hidden") }>{ state.errors.email }</div>							
						</React.Fragment>)
						:
						(null)
					}

					<div className={ "eris-auth-password" }></div>
					<input placeholder={ lang.get( "Auth::Password" ) }
						type={ "password" }
						onKeyUp={( e: any ) => {

							if( e.keyCode == 13 ){
								(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
							}else{
								dispatch([ "password", { value: e.target.value }]);
								dispatch([ "match" ]);
							};

						}}>{}
					</input>
					<div className={ "eris-auth-notice" + (state.errors.password ? "" : " hidden") }>{ 
						Array.isArray( state.errors.password ) ?
							state.errors.password.map(( error: any, index: number ) => 
								<div key={ index }>{ error.description }</div>
							)
							:
							state.errors.password
					}</div>				
					{
					type == 1 || type == 2 ?
					(<React.Fragment>
						<div className={ "eris-auth-password" }></div>
						<input placeholder={ lang.get( "Auth::Confirmation" ) }
							type={ "password" }
							onKeyUp={( e: any ) => {
								
								if( e.keyCode == 13 ){
									(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
								}else{
									dispatch([ "password2", { value: e.target.value }]);
									dispatch([ "match" ]);
								};

							}}>{}
						</input>
						<div className={ "eris-auth-notice" + (state.errors.password2 ? "" : " hidden") }>{
							Array.isArray( state.errors.password2 ) ?
								state.errors.password2.map(( error: any, index: number ) => 
									<div key={ index }>{ error.description }</div>
								)
								:
								state.errors.password2
						}</div>
						<div className={ "eris-auth-notice" + (state.errors.server ? "" : " hidden") }><div className={ "eris-auth-notice-error" }>{ lang.get( "Auth::ServerError" )  }</div>{ state.errors.server }</div>
						<div className={ "eris-auth-button" + (state.loading ? " eris-auth-loading" : "") } onClick={() => {
							(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
						}}>{ lang.get( type == 2 ? "Auth::ChangePassword" : "Auth::RegisterNow" ) }</div>
						<div className={ "eris-auth-button" + (state.loading ? " eris-auth-loading" : "") + (type == 2 ? "" : " hidden") } onClick={() => {
							async.logout.fetch();
						}}>{ data.persona ? lang.get( "Auth::PersonaReLogin" ) : lang.get( "Auth::LogOut" ) }</div>						
					</React.Fragment>) :
					(<React.Fragment>
						<div className={ "eris-auth-notice" + (state.errors.server ? "" : " hidden") }><div className={ "eris-auth-notice-error" }>{ lang.get( "Auth::ServerError" )  }</div>{ state.errors.server }</div>
						<div className={ "eris-auth-button" + (state.loading ? " eris-auth-loading" : "") } onClick={() => {
							(type == 0 ? async.login : (type == 2 ? async.changePassword : async.register)).fetch();
						}}>{ lang.get( "Auth::LoginNow" ) }</div>						
					</React.Fragment>)
					}
				</div>
			</div>
		</div>
	);
};