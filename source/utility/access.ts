export const AdminAccess = {
	"access::1": "Admin::Table::Users::AccessSelect::registered",
	"access::3": "Admin::Table::Users::AccessSelect::guest",
	"access::5": "Admin::Table::Users::AccessSelect::user",
	"access::7": "Admin::Table::Users::AccessSelect::moderator",
	"access::9": "Admin::Table::Users::AccessSelect::admin"
} as {[key: string]: string};
export const AdminStatus = {
	"access::0": "Admin::Table::Users::AccessSelect::banned", 
	"access::1": "Admin::Table::Users::AccessSelect::archived",
	"access::7": "Admin::Table::Users::AccessSelect::active",
} as {[key: string]: string};
