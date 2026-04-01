
import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";
import { Icons, IconsExtended } from "../../icons/icons.extend";
import { Conditions } from "../../utility/conditions";
import { PolicyResistance } from "../../utility/policy";

export const AdminSectonsAccess = {
	"access::1": "Admin::Table::Users::AccessSelect::registered",
	"access::5": "Admin::Table::Users::AccessSelect::user",
	"access::7": "Admin::Table::Users::AccessSelect::moderator",
	"access::9": "Admin::Table::Users::AccessSelect::admin"
};
export const AdminSectonsStatus = {
	"access::0": "Admin::Table::Users::AccessSelect::banned", 
	"access::1": "Admin::Table::Users::AccessSelect::archived",
	"access::7": "Admin::Table::Users::AccessSelect::active",
};

export const AdminLocalTable = {
	"Access": {
		params: [
			{ key: "name", title: "Admin::Table::Access::Name", desc: "Admin::Table::Access::NameDesc", type: "text", mini: 1, params: { 
				conditions: Conditions.nameAccess
			}},
			{ key: "description", title: "Admin::Table::Access::Description", desc: "Admin::Table::Access::DescriptionDesc", type: "text", mini: 1, params: {
				conditions: Conditions.text
			}},
			{ key: "list", title: "", desc: "", type: "table", mini: 2, route: "accessgroup", inactive: true, newLine: true, params: [
				{ key: "checkbox", title: "Checkbox", desc: "CheckboxDesc", type: "checkbox", controlled: true, mini: 1 },
				{ key: "name", title: "Name", desc: "Admin::Table::AccessGroup::NameDesc", type: "text", mini: 1 },
				{ key: "description", title: "Description", desc: "Admin::Table::AccessGroup::DescriptionDesc", type: "text", mini: 1 },
			]},
		]
	},
	"AccessGroup": {
		params: [
			{ key: "name", title: "Admin::Table::AccessGroup::Name", desc: "Admin::Table::AccessGroup::NameDesc", type: "text", mini: 1, params: { 
				conditions: Conditions.nameAccess
			}},
			{ key: "description", title: "Admin::Table::AccessGroup::Description", desc: "Admin::Table::AccessGroup::DescriptionDesc", type: "text", mini: 1, params: {
				conditions: Conditions.text
			}},
			{ key: "list", title: "", desc: "", type: "table", mini: 2, route: "access", inactive: true, newLine: true, params: [
				{ key: "checkbox", title: "Checkbox", desc: "CheckboxDesc", type: "checkbox", controlled: true, mini: 1 },
				{ key: "name", title: "Name", desc: "Admin::Table::Access:NameDesc", type: "text", mini: 1 },
				{ key: "description", title: "Description", desc: "Admin::Table::Access::DescriptionDesc", type: "text", mini: 1 },
			]},
		]
	},	
	"Configurations": {
		params: [
			{ key: "redirectConfiguration", title: "Redirect", desc: "Admin::Table::Users::RedirectDesc", type: "button", mini: 1, params: { title: "Redirect" } },
			{ key: "name", title: "Admin::Table::Configurations::Name", desc: "Admin::Table::Configurations::NameDesc", type: "text", mini: 1, params: { 
				conditions: Conditions.name
			}},
			{ key: "description", title: "Admin::Table::Configurations::Description", desc: "Admin::Table::Configurations::DescriptionDesc", type: "text", mini: 1, params: {
				conditions: Conditions.text
			}}
		]
	},	
	"Policy": {
		params: [
			{ key: "name", title: "Admin::Table::Policy::Name", desc: "Admin::Table::Policy::Name", type: "text", mini: 1, params: { 
				conditions: Conditions.name
			}},
			{ key: "min", title: "Admin::Table::Policy::Min", desc: "Admin::Table::Policy::Min", type: "text", mini: 1 },
			{ key: "max", title: "Admin::Table::Policy::Max", desc: "Admin::Table::Policy::Max", type: "text", mini: 1 },
			{ key: "resistance", title: "Admin::Table::Policy::Resistance", desc: "Admin::Table::Policy::Resistance", mini: 2, type: "listbinary", value: 0,
				params: Object.keys( PolicyResistance ).map( key => {
					return { title: key, value: PolicyResistance[ key ] }
				})
			},
			{ key: "cooldown", title: "Admin::Table::Policy::Cooldown", desc: "Admin::Table::Policy::Cooldown", mini: 1, type: "text" },
			{ key: "notify", title: "Admin::Table::Policy::Notify", desc: "Admin::Table::Policy::Notify", type: "text", mini: 1 },
			{ key: "attempts", title: "Admin::Table::Policy::Attempts", desc: "Admin::Table::Policy::Attempts", type: "text", mini: 1 },
			{ key: "block", title: "Admin::Table::Policy::Block", desc: "Admin::Table::Policy::Block", type: "text", mini: 1 },
		]
	},	
	"Logs": {
		params: [
			{ key: "userpair", title: "Admin::Table::Logs::User", desc: "Admin::Table::Logs::UserDesc", type: "text", mini: 1 },
			{ key: "module", title: "Admin::Table::Logs::Module", desc: "Admin::Table::Logs::ModuleDesc", type: "text", mini: 1 },
			{ key: "url", title: "Admin::Table::Logs::Url", desc: "Admin::Table::Logs::UrlDesc", type: "text", mini: 1 },
			{ key: "keys", title: "Admin::Table::Logs::Keys", desc: "Admin::Table::Logs::KeysDesc", type: "text", mini: 1 },
			{ key: "success", title: "Admin::Table::Logs::Success", desc: "Admin::Table::Logs::SuccessDesc", type: "text", mini: 1 },
			{ key: "errors", title: "Admin::Table::Logs::Errors", desc: "Admin::Table::Logs::ErrorsDesc", type: "json", mini: 1, params: { small: true } },
		]
	},	
	"Filesystem": {
		params: [
			{ key: "name", title: "Admin::Table::Name", desc: "Admin::Table::Name", type: "text", mini: 1, params: { 
				conditions: Conditions.nameSpecial
			}},
			{ key: "user_token", title: "Admin::Table::User", desc: "Admin::Table::User", type: "text", mini: 1 },
			{ key: "user_configuration", title: "Admin::Table::Configuration", desc: "Admin::Table::Configuration", type: "text", mini: 1 },
			{ key: "path", title: "Admin::Table::Path", desc: "Admin::Table::Path", type: "text", mini: 1 },
			{ key: "mime", title: "Admin::Table::MimeType", desc: "Admin::Table::MimeType", type: "text", mini: 1 },
			{ key: "encoding", title: "Admin::Table::Encoding", desc: "Admin::Table::Encoding", type: "text", mini: 1 },
			{ key: "list", title: "", desc: "", type: "table", mini: 2, group: true, route: "filesystemlinks", inactive: true, newLine: true, params: [
				{ key: "file_token", title: "FileToken", desc: "Admin::Table::FileTokenDesc", type: "text", mini: 1 },
				{ key: "module_name", title: "ModuleName", desc: "Admin::Table:::ModuleNameDesc", type: "text", mini: 1 },
				{ key: "field_name", title: "FieldName", desc: "Admin::Table:::FieldNameDesc", type: "text", mini: 1 },
				{ key: "line_token", title: "LineToken", desc: "Admin::Table:::LineTokenDesc", type: "text", mini: 1 },
			]},
		]
	},		
	"Users": {
		params: [
			{ key: "redirectConfiguration", title: "Redirect", desc: "Admin::Table::Users::RedirectDesc", type: "button", mini: 1, params: { title: "Redirect" } },
			{ key: "login", title: "Admin::Table::Users::Login", desc: "Admin::Table::Users::LoginDesc", type: "text", params: {
				conditions: Conditions.login
			}},
			{ key: "name", title: "Admin::Table::Users::Name", desc: "Admin::Table::Users::NameDesc", type: "text", mini: 1, value: "New User", params: { 
				conditions: Conditions.nameEx
			}},		
			{ key: "configuration", title: "Admin::Table::Users::Configuration", desc: "Admin::Table::Users::ConfigurationDesc", type: "configuration", mini: 1 },				
			{ key: "email", title: "Admin::Table::Users::Email", desc: "Admin::Table::Users::EmailDesc", type: "text", mini: 2, params: { 
				conditions: Conditions.email
			}},
			{ key: "password", title: "Admin::Table::Users::Password", desc: "Admin::Table::Users::PasswordDesc", type: "text", params: { 
				type: "password",
				conditions: Conditions.password
			}},
			{ 
				key: "access", title: "Admin::Table::Users::Access", 
				desc: "Admin::Table::Users::AccessDesc", 
				type: "select", 
				mini: 1,
				params: [
					{ title: "Admin::Table::Users::AccessSelect::registered", value: 1 }, 
					{ title: "Admin::Table::Users::AccessSelect::user", value: 5 }, 
					{ title: "Admin::Table::Users::AccessSelect::moderator", value: 7 }, 
					{ title: "Admin::Table::Users::AccessSelect::admin", value: 9 }
				] 
			},			
			{ key: "status", title: "Admin::Table::Users::Status", 
				desc: "Admin::Table::Users::StatusDesc", 
				type: "select", 
				mini: 1,
				params: [
					{ title: "Admin::Table::Users::StatusSelect::banned", value: 1 }, 
					{ title: "Admin::Table::Users::StatusSelect::archived", value: 2 }, 
					{ title: "Admin::Table::Users::StatusSelect::active", value: 7 }, 
				] 
			},
			{ key: "role", title: "Admin::Table::Users::Role", desc: "Admin::Table::Users::RoleDesc", type: "role", mini: 1, 
				params: {
					filter: { configuration: ":configuration" },
				},
			},
			{ key: "policy", title: "Admin::Table::Users::Policy", desc: "Admin::Table::Users::PolicyDesc", type: "policy", mini: 1 },
			{ key: "killSessions", title: "Admin::Table::Users::KillSessions", desc: "Admin::Table::Users::KillSessionsDesc", type: "button", params: { title: "Admin::Table::Users::KillSessionsTitle::Kill" } },
		]
	},
	"Roles": {
		params: [
			{ key: "redirectConfiguration", title: "Redirect", desc: "Admin::Table::Users::RedirectDesc", type: "button", mini: 1, params: { title: "Redirect" } },
			{ key: "name", title: "Admin::Table::Roles::Name", desc: "Admin::Table::Roles::NameDesc", type: "text", mini: 1, params: { 
				conditions: Conditions.name
			}},
			{ key: "configuration", title: "Admin::Table::Users::Configuration", desc: "Admin::Table::Users::ConfigurationDesc", type: "configuration", mini: 1 },				
			{ key: "description", title: "Admin::Table::Roles::Description", desc: "Admin::Table::Roles::DescriptionDesc", type: "text", mini: 1, params: {
				conditions: Conditions.text
			}},
			{ key: "list", title: "", desc: "", type: "table", mini: 2, route: "accessgroup", inactive: true, newLine: true, params: [
				{ key: "checkbox", title: "Checkbox", desc: "CheckboxDesc", type: "checkbox", controlled: true, mini: 1 },
				{ key: "name", title: "Name", desc: "Admin::Table::AccessGroup::NameDesc", type: "text", mini: 1 },
				{ key: "description", title: "Description", desc: "Admin::Table::AccessGroup::DescriptionDesc", type: "text", mini: 1 },
			]},
		]
	}
};

export const AdminTable = {
	Access: [{
		key: "Main", title: "Access", icon: <Icons.access1/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.Access.params },
		],
	}],	
	
	AccessGroup: [{
		key: "Main", title: "AccessGroup", icon: <Icons.accessGroups/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.AccessGroup.params },
		],
	}],

	Configurations: [{
		key: "Main", title: "Configurations", icon: <Icons.configurations/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.Configurations.params },
		],
	}],

	Logs: [{
		key: "Main", title: "Logs", icon: <Icons.table/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.Logs.params },
		],
	}],

	Policy: [{
		key: "Main", title: "Policy", icon: <Icons.policy/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.Policy.params },
		],
	}],	
	
	Users: [{
		key: "Main", title: "Users", icon: <Icons.user/>,
		list: [
			{ key: "Filter", type: "configuration", 
				path: "filter",
				extra: {
					headerless: true,
					row: true
				},
				value: "default"
			},
			{ key: "Table", type: "table", params: AdminLocalTable.Users.params, filter: { configuration: ":Filter" } },
		],
	}],

	Roles: [{
		key: "Main", title: "Roles", icon: <Icons.roles/>,
		list: [
			{ key: "Filter", type: "configuration", 
				path: "filter",
				extra: {
					headerless: true,
					row: true
				},
				value: "default"
			},
			{ key: "Table", type: "table", params: AdminLocalTable.Roles.params, filter: { configuration: ":Filter" } },
		],
	}],	

	Applications: [{
		key: "Applications", title: "Applications", icon: <Icons.command/>,
		list: []
	}],	

	Auth: [{
		key: "Auth", title: "Auth", icon: <Icons.enter/>,
		list: [

			{ key: "p1", desc: "Auto login with user: ", type: "none", 
				left: [
					{ key: "persona_autologin", type: "bool", value: false },
				],
				right: [
					{ key: "persona_configuration", title: "Admin::Table::Users::Configuration", type: "querytable", value: "default",
						params: { 
							route: "configurations"
						} 
					},
					{ key: "persona_token", title: "Admin::Table::Global::Guest", type: "querytable", 
						params: { 
							filter: { configuration: ":persona_configuration" },
							route: "users"
						} 
					},					
				],
			},
			{ key: "save", type: "button", mini: 1, params: { title: "save" } },

		]
	}],	

	Filesystem: [{
		key: "Main", title: "Filesystem", icon: <Icons.fileempty/>,
		list: [
			{ key: "Table", type: "table", params: AdminLocalTable.Filesystem.params },
		],
	}],	

};

export const AdminList = [

	{ title: "Admin::Module::Security", key: "SecuritySection", route: "security", icon: <Icons.key2/>, list: [
		{ title: "Admin::Module::Logs", key: "Logs", route: "logs", icon: <Icons.table/> },	
		{ title: "Admin::Module::Policy", key: "Policy", route: "policy", icon: <Icons.policy/> },	
		{ title: "Admin::Module::Access", key: "Access", route: "access", icon: <Icons.access1/> },
		{ title: "Admin::Module::AccessGroup", key: "AccessGroup", route: "accessgroup", icon: <Icons.accessGroups/> },
	]},		
	
	{ title: "Admin::Module::Configurations", key: "ConfigurationsSection", route: "configurations", icon: <Icons.configurations/>, list: [
		{ title: "Admin::Module::List", key: "Configurations", route: "configurations", icon: <Icons.list/> },
		{ title: "Admin::Module::Roles", key: "Roles", route: "roles", icon: <Icons.roles/> },
		{ title: "Admin::Module::Users", key: "Users", route: "users", icon: <Icons.user/> },
	]},			

	{ title: "Admin::Module::Applications", key: "Applications", route: "global", icon: <Icons.command/>, list: [
		{ title: "Admin::Module::Filesystem", key: "Filesystem", route: "filesystem", icon: <Icons.fileempty/> },
		{ title: "Admin::Module::Auth", key: "Auth", route: "global", global: true, icon: <Icons.enter/> },		
	]},

];
