import { Common, VMath } from "v-eris";
import { Socket } from "./socket";

export const MemoryDefaultToken = "f";

export interface ChannelData{
	name: string,
	token: string,
	type: string,
};

export class Channel{

	private p_memToken: string;
	private p_token: string;
	private p_data: ChannelData;
	private p_completed: {[ key: string ]: boolean };
	private listeners: {
		events: Function,
	};	

	constructor( token: string, data: ChannelData, memToken?: string ){
		this.p_data = data;
		this.p_token = token;
		this.p_memToken = memToken || MemoryDefaultToken;
		this.listeners = {
			events: () => {},
		};
		this.p_completed = {};				
	};


	public get token() : string{
		return this.p_token;
	};	
	public get name() : string{
		return this.p_data.name;
	};			
	public get type() : string{
		return this.p_data.name;
	};			
	public get memToken() : string{
		return this.p_memToken;
	};

	public events( memToken: string, list: any ){
		this.p_memToken = memToken;

		if( !Array.isArray( list ) )
			return;

		for( const item of list ){

			if( this.p_completed[ item.token ] )
				continue;

			this.p_completed[ item.token ] = true;

			let data: any = {};
			let value: any = {};

			try{
				data = typeof item.value == "string" ? JSON.parse( item.value ) : item.value;
				value = typeof ((data as any).value) == "string" ? JSON.parse( (data as any).value ) : data.value;
			}catch( e ){};

			if( data.type == "join" ){
				Channels.joinAction( data );
				continue;
			}else if( data.type == "leave" ){
				Channels.leaveAction( data );
				continue;
			};

			this.listeners.events( data.action || "", value );
			Channels.listeners.events( this, data.action || "", data );
		};

	};

	public on( name: string, fn: Function ){

		if( !(this.listeners as any)[ name ] )
			return;

		(this.listeners as any)[ name ] = fn;
	};

};

export class ChannelsInstance{

	private channels: { [key: string]: Channel };
	public listeners: {
		events: Function,
	};	

	constructor(){
		this.channels = {};
		this.listeners = {
			events: () => {},
		};		
	};

	public join( token: string, data: ChannelData, memToken?: string ){

		if( this.channels[ token ] )
			return this.channels[ token ];

		let channel = new Channel( token, data, memToken );
		this.channels[ token ] = channel;

		console.log( "Joined channel (" + channel.name + "), sid: " + channel.token );

		return channel;
	};
	public leave( token: string ){

		if( !this.channels[ token ] )
			return;

		let channel = this.channels[ token ];
		console.log( "Leaved channel (" + channel.name + "), sid: " + channel.token );

		delete this.channels[ token ];
	};

	public leaveAll(){

		let list: any = [];

		for( let channelToken in this.channels ){
			list.push( channelToken );
		};
		for( let channelToken of list ){
			this.leave( channelToken );
		};

	};

	public get( token: string ) : Channel | null{
		return this.channels[ token ] || null;
	};

	public on( name: string, fn: Function ){

		if( !(this.listeners as any)[ name ] )
			return;

		(this.listeners as any)[ name ] = fn;
	};

	public leaveAction( event: any ){

		const list = Array.isArray( event.list ) ? event.list : [];

		for( const item of list ){
			Channels.leave( item.channel );
		};

	};
	public joinAction( event: any ){

		const list = Array.isArray( event.list ) ? event.list : [];

		for( const item of list ){
			
			if( !item.data )
				item.data = {};

			let channel = Channels.join( 
				item.channel, 
				{ 
					name: item.data.name || "", type: item.data.type || "", token: item.channel 
				}, 
				item.memToken 
			);

		};

	};

	public attach( socket: Socket ){

		socket.on( "connect", () => {

			for( let channelToken in this.channels ){
				let channel = this.channels[ channelToken ];
				socket.send({ type: "fetch", channel: channel.token, token: channel.memToken });
			};

		});
		socket.on( "message", ( event: any ) => {

			if( event.type == "join" ){
				this.joinAction( event );
				return;
			};

			if( event.type == "leave" ){
				this.leaveAction( event );
				return;
			};

			let channel: Channel | null = Channels.get( event.channel );

			if( !channel )
				return;
			
			if( event.type == "update" ){
				socket.send({ type: "fetch", channel: event.channel, token: channel.memToken });
			}else if( event.type == "events" ){
				let data = event.data;
				channel.events( data.token, data.list );
			};

		});		

	};

};

export const Channels: ChannelsInstance = new ChannelsInstance();