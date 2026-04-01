import { Common } from "v-eris";
import { PolicyParams, PolicyResistance } from "./policy";

export class Login{
	static checkLogin( name: string ) : any{

		if( name.length > 32 || name.length < 3 || !name.match( /^[a-z0-9]+$/i ) ){
			return {
				description: "Login name must be between 3 and 32 characters long"
						+ " and can contain any letters from a to z and any numbers from 0 through 9",
				min: 3,
				max: 32,
				code: 411
			};
		};

		return false;
	};	
	static checkEmail( email: string ) : any{

		if( email.length > 128 || email.length < 3 || !email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) ){
			return {
				description: "Email is incorrect",
				code: 411
			};
		};

		return false;
	};
	static checkName( name: string ) : any{

		if( name.length > 32 || name.length < 3 || !name.match( /^[a-z0-9]+$/i ) ){
			return {
				description: "Name must be between 3 and 32 characters long"
						+ " and can contain any letters from a to z and any numbers from 0 through 9",
				min: 3,
				max: 32,
				code: 411
			};
		};

		return false;
	};
	static resistance( state: number, key: number ) : boolean{
		return (state & key) == key;
	};	
	static checkPass( password: string, policy?: PolicyParams ){

		if( !policy )
			return false;

		let value = Common.string( password ).trim();
		let max = Common.uint( policy.max );
		let min = Common.uint( policy.min );
		let resistance = Common.uint( policy.resistance );
		let errors: any = [];

		if( 
			value.length > max
			|| 
			value.length < min
		){
			errors.push({
				description: "Password must be between " + min + " and " + max + " characters long",
				tokens: [ "Admin::Table::Users::PasswordCondition::LettersLength" ],
				min: min,
				max: max
			});
		};
	
		if( 
			this.resistance( resistance, PolicyResistance.Characters ) 
			&&
			!value.match( /[A-Za-zа-яА-Я]/g ) 
		){
			errors.push({
				description: "Password must include at least one character",
				tokens: [ "Admin::Table::Users::PasswordCondition::Characters" ]
			});		
		};		
		
		if( 
			this.resistance( resistance, PolicyResistance.Numbers ) 
			&&
			!value.match( /[0-9]/g ) 
		){
			errors.push({
				description: "Password must include at least one number",
				tokens: [ "Admin::Table::Users::PasswordCondition::Numbers" ]
			});		
		};		
		
		if( 
			this.resistance( resistance, PolicyResistance.Special ) 
			&&
			!value.match( /[!-\/:-@[-`{-~]/g ) 
		){
			errors.push({
				description: "Password must include at least one special character",
				tokens: [ "Admin::Table::Users::PasswordCondition::Special" ]
			});		
		};		
		
		if( 
			this.resistance( resistance, PolicyResistance.NoRepeat ) 
			&&
			value.match( /^(?!.*(\w)\1{1,}).+$/g ) 
		){
			errors.push({
				description: "Password must not include repeating characters",
				tokens: [ "Admin::Table::Users::PasswordCondition::NoRepeat" ]
			});		
		};		
		
		if( 
			this.resistance( resistance, PolicyResistance.DifferentCase ) 
			&&
			(!value.match( /[A-ZА-Я]/g ) || !value.match( /[a-zа-я]/g ))
		){
			errors.push({
				description: "Password must include characters width different cases",
				tokens: [ "Admin::Table::Users::PasswordCondition::DifferentCase" ]
			});		
		};

		return errors.length ? errors : false;
	};

	static checkSalt( salt: string ) : any{

		if( salt.length < 58 ){
			return {
				description: "Password hashing unexpected error",
				code: 413
			};
		};

		return false;
	};
	static checkPassMatch( password1: string, password2: string ) : any{

		if( password1 && password2 && password1 != password2 ){
			return {
				description: "Passwords don't match",
				code: 414
			};
		};

		return false;
	};
};