import { Common, VMath } from "v-eris";

export enum SocketState{
	Failed,
	Closed,
	Connecting,
	Awaiting,
	Ready,
};

export class Socket{

	private pingInterval: any;
	private pingIntervalValue: number;
	private pingIntervalDelay: number;
	private connection: WebSocket | null;
	private state: SocketState;
	private pinged: boolean;
	private initParams: {
		url: string;
		proto: string;
		secure?: boolean;
	};
	private listeners: {
		connect: Function,
		disconnect: Function,
		message: Function,
		create: Function,
		destroy: Function
	};	

	constructor(){
		this.state = SocketState.Closed;
		this.pingInterval = null;
		this.initParams = {
			url: location.host,
			proto: window.location.protocol == "https:" ? "wss" : "ws",
			secure: window.location.protocol == "https:",
		};
		this.pingIntervalValue = 8000;
		this.pingIntervalDelay = 4000;
		this.connection = null;
		this.pinged = false;
		this.listeners = {
			connect: () => {},
			disconnect: () => {},
			message: () => {},
			create: () => {},
			destroy: () => {},
		};
	};

	private stopPinging(){
		clearInterval( this.pingInterval );
		this.pingInterval = null;
	};
	private startPinging( interval: number ){

		clearInterval( this.pingInterval );
		this.pingIntervalValue = interval;
		this.pingInterval = setInterval(() => {

			if( !this.connection ){
				clearInterval( this.pingInterval );
				return;
			};

			if( this.pinged ){
				this.pinged = false;
				return;
			};
			
			console.log( "Timeouted: " + this.initParams.url );
			this.tryReconnect();

		}, this.pingIntervalValue );
		
	};

	public connect( url?: string, secure?: boolean ){

		this.initParams.url = url === undefined ? this.initParams.url : url;
		this.initParams.secure = secure === undefined ? this.initParams.secure : secure;
		this.initParams.proto = this.initParams.secure ? "wss" : "ws"
		this.disconnect();
		this.state = SocketState.Connecting;
		this.connection = new WebSocket( this.initParams.proto + "://" + this.initParams.url );
		this.startPinging( 16000 );
		this.pinged = false;

		this.connection.onopen = () => {
			this.state = SocketState.Awaiting;
		};
		this.connection.onclose = () => {
			this.state = SocketState.Closed;
			//this.disconnect();
		};
		this.connection.onerror = () => {
			this.state = SocketState.Failed;
			this.tryReconnect();
		};
		this.connection.onmessage = ( event ) => {

			let connectionIndex = event.data.indexOf( "connect:" );

			if( connectionIndex == 0 ){
				this.state = SocketState.Ready;
				const p: number = VMath.clamp( Common.uint( event.data.substr( 8 ) ) + this.pingIntervalDelay, 1000, 30000 );
				this.startPinging( p );
				console.log( "Connected: " + this.initParams.proto + "://" + this.initParams.url );
				this.listeners.connect();
				return;
			};			
			if( event.data == "ping" ){
				this.pinged = true;
				this.send( "pong" );
				return;
			};

			let data: any = null;

			try{
				data = JSON.parse( event.data );
			}catch( e ){
				data = { type: "broken", value: data };
			};

			this.listeners.message( data );

		};

	};
	public tryReconnect(){
		console.log( "Reconnecting: " + this.initParams.proto + "://" + this.initParams.url );
		this.connect();
	};	
	public reconnect(){
		this.disconnect();
		this.connect();
	};
	public disconnect(){

		if( !this.connection )
			return;

		this.stopPinging();
		this.state = SocketState.Closed;
		console.log( "Disconnected: " + this.initParams.proto + "://" + this.initParams.url );
		try{
			this.connection.close();
		}catch( e ){};
	};	
	public destroy(){
		this.disconnect();
	};
	
	public on( name: string, fn: Function ){

		if( !(this.listeners as any)[ name ] )
			return;

		(this.listeners as any)[ name ] = fn;
	};
	public send( message: string | any ){

		if( !this.connection || this.state != SocketState.Ready )
			return;

		try{
			message = typeof message == "string" ? message : JSON.stringify( message );
		}catch( e ){
			message = "{}";
		};

		this.connection.send( message );

	};

};
