export const Conditions = {
	login: [
		{ condition: /^[a-zA-Z0-9]+$/i, desc: "Condition::Login::Letters" },
		{ condition: /^(.){3,36}$/g, desc: "Condition::Login::LettersLength" },
	],
	name: [
		{ condition: /^([a-zA-Zа-яА-Я0-9\-\s\.]){0,}$/g, desc: "Condition::Name::Letters" },
		{ condition: /^(.){2,36}$/g, desc: "Condition::Name::LettersLength" },
	],
	nameAccess: [
		{ condition: /^([a-zA-Zа-яА-Я0-9\-\s\.]){0,}$/g, desc: "Condition::NameAccess::Letters" },
		{ condition: /^(.){2,36}$/g, desc: "Condition::NameAccess::LettersLength" },
	],
	nameEx: [
		{ condition: /^([a-zA-Zа-яА-Я0-9\-\s\.]){0,}$/g, desc: "Condition::NameEx::Letters" },
		{ condition: /^(.){2,36}$/g, desc: "Condition::NameEx::LettersLength" },
		{ condition: /^[A-Za-zа-яА-Я]{0,1}/g, desc: "Condition::NameEx::LettersFirst" },
	],
	nameSpecial: [
		{ condition: /^([a-zA-Zа-яА-Я0-9\-\[\]\'\"\!\@\#\$\%\^\&\*\(\)\_\+\-\=\s\.]){0,}$/g, desc: "Condition::NameSpecial::Letters" },
		{ condition: /^(.){2,36}$/g, desc: "Condition::NameSpecial::LettersLength" }
	],
	text: [
		{ condition: /^(.){0,8192}$/g, desc: "Condition::Text::LettersLength" }
	],
	email: [
		{ 
			condition: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			desc: "Condition::Email::Letters"
		},
		{ condition: /^(.){2,128}$/g, desc: "Condition::Email::LettersLength" },
	],
	password: [
		{ condition: /^((.){3,128}|((.){0,0}))$/g, desc: "Condition::Password::LettersLength" }
	],
	json: [
		{ condition: "json", desc: "Condition::JSON::Letters" }
	]
};