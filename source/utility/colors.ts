import { Common, VMath } from "v-eris";


//
export const InlineRGBA2CoordHSVA2 = ( 
	rgba: { r: number, g: number, b: number, a: number } 
) : { h: number, s: number, v: number, a: number } => {

	let { r, g, b, a } = rgba; 
	let max = (r > g && r > b) ? r : (g > b) ? g : b;
	let min = (r < g && r < b) ? r : (g < b) ? g : b;

	if( max < 0.0001 )
		return { h: 0.0, s: 0.0, v: 0.0, a: a };

	let h : number, s : number, v : number;
	h = s = (max + min) / 2.0;
	v = max;

	if( max == min ){
		h = s = 0.0;
	}else{
		let d = max - min;
		s = d / max;
		if( d < 0.0001 )
			return { h, s, v, a };
		if( r > g && r > b )
			h = (g - b) / d + (g < b ? 6.0 : 0.0);
		else if( g > b )
			h = (b - r) / d + 2.0;
		else
			h = (r - g) / d + 4.0;
		h /= 6.0;
		if( h < 0.0 )
			h += 1.0;
	};

	return { h, s, v, a };
};	
//^

export const InlineRGBA2CoordHSVA = ( 
	rgba: { r: number, g: number, b: number, a: number } 
) : { h: number, s: number, v: number, a: number } => {

	let { r, g, b, a } = rgba; 
	let h : number, s : number, v : number;
	let min = (r < g && r < b) ? r : (g < b) ? g : b;
	let max = (r > g && r > b) ? r : (g > b) ? g : b;

	v = max;
	let delta = max - min;

	if( max != 0 )
		s = delta / max;
	else{
		s = 0;
		h = -1;
		return { h, s, v, a };
	};

	if( r == max )
		h = (g - b) / delta;
	else if( g == max ){
		h = 2.0 + (b - r) / delta;
	}else{
		h = 4.0 + (r - g) / delta;
	}

	h *= 60.0;

	if( h < 0 )
		h += 360;

	return { h, s, v, a };
};	

export const RGBA2CoordHSVA = ( 
	rgba: { r: number, g: number, b: number, a: number } 
) : { h: number, s: number, v: number, a: number } => {
	return InlineRGBA2CoordHSVA2({ r: rgba.r / 255.0, g: rgba.g / 255.0, b: rgba.b / 255.0, a: rgba.a });
}


//
export const InlineCoordHSVA2RGBA2 = ( 
	hsva: { h: number, s: number, v: number, a: number } 
) : { r: number, g: number, b: number, a: number } => {

	if( hsva.s < 0.0 )
		return { r: hsva.v, g: hsva.v, b: hsva.v, a: hsva.a };

	let h = VMath.clamp( hsva.h, 0.000, 1.0 );	
	let z = VMath.clamp( hsva.v, 0.000, 1.0 );	
	
	h *= 6.0;
	let index = Common.uint( h );
	let f = h - index;
	let p = z * (1.0 - hsva.s);
	let q = z * (1.0 - (hsva.s * f));
	let t = z * (1.0 - (hsva.s * (1.0 - f)));

	if( index == 0 ){
		return { r: z, g: t, b: p, a: hsva.a };
	}else if( index == 1 ){
		return { r: q, g: z, b: p, a: hsva.a };
	}else if( index == 2 ){
		return { r: p, g: z, b: t, a: hsva.a };
	}else if( index == 3 ){
		return { r: p, g: q, b: z, a: hsva.a };
	}else if( index == 4 ){
		return { r: t, g: p, b: z, a: hsva.a };
	}else if( index == 5 ){
		return { r: z, g: p, b: q, a: hsva.a };
	};

	return { r: z, g: z, b: z, a: hsva.a };
};
//^

export const InlineCoordHSVA2RGBA = ( 
	hsva: { h: number, s: number, v: number, a: number } 
) : { r: number, g: number, b: number, a: number } => {

	let h = hsva.h;	
	let v =  hsva.v;	
	let s =  hsva.s;
	let a =  hsva.a;

	if( s == 0 ){
		return { r: v, g: v, b: v, a: a };
	};
	
	h /= 60.0;
	let index = Math.floor( h );
	let f = h - index;
	let p = v * (1.0 - s);
	let q = v * (1.0 - (s * f));
	let t = v * (1.0 - (s * (1.0 - f)));

	if( index == 0 ){
		return { r: v, g: t, b: p, a: hsva.a };
	}else if( index == 1 ){
		return { r: q, g: v, b: p, a: hsva.a };
	}else if( index == 2 ){
		return { r: p, g: v, b: t, a: hsva.a };
	}else if( index == 3 ){
		return { r: p, g: q, b: v, a: hsva.a };
	}else if( index == 4 ){
		return { r: t, g: p, b: v, a: hsva.a };
	}else if( index == 5 ){
		return { r: v, g: p, b: q, a: hsva.a };
	};

	return { r: v, g: p, b: q, a: hsva.a };
};


export const CoordHSVA2RGBA = ( 
	hsva: { h: number, s: number, v: number, a: number } 
) : { r: number, g: number, b: number, a: number } => {
	let result = InlineCoordHSVA2RGBA2( hsva );
	result.r *= 255.0;
	result.g *= 255.0;
	result.b *= 255.0;

	return { r: Math.round( result.r ), g: Math.round( result.g ), b: Math.round( result.b ), a: result.a };
};

export const HexToInt = ( value: string ) : number => {

	const code = value.charCodeAt( 0 );

	if( code > 96 && code < 103 ){
		return code - 87;
	}else if( code > 64 && code < 71 ){
		return code - 55;
	}else if( code > 47 && code < 58 ){
		return code - 48;
	};

	return 0;
};
export const ParseColor = ( value: number[] | { x: number, y: number, z: number, w: number } | { r: number, g: number, b: number, a: number }  ) : { r: number, g: number, b: number, a: number } => {

	let type: string = Common.type( value );

	if( type == "array" ){
		return { r: Common.uint( (value as any)[ 0 ] ), g: Common.uint( (value as any)[ 1 ] ), b: Common.uint( (value as any)[ 2 ] ), a: Common.float( (value as any)[ 3 ] ) };
	}else if( type == "object" && (value as any).x !== undefined ){
		return { r: Common.uint( (value as any).x ), g: Common.uint( (value as any).y ), b: Common.uint( (value as any).z ), a: Common.float( (value as any).w ) };
	}else if( type == "object" && (value as any).r !== undefined ){
		return { r: Common.uint( (value as any).r ), g: Common.uint( (value as any).g ), b: Common.uint( (value as any).b ), a: Common.float( (value as any).a ) };
	};

	let v: string = Common.string( value ).trim();
	let result = { r: 0, g: 0, b: 0, a: 0.0 };

	if( v.length < 4 )
		return result;

	if( v[ 0 ] == "#" ){

		if( v.length >= 9 ){
			result = {
				r: HexToInt( v[ 1 ] ) * 16 + HexToInt( v[ 2 ] ),
				g: HexToInt( v[ 3 ] ) * 16 + HexToInt( v[ 4 ] ),
				b: HexToInt( v[ 5 ] ) * 16 + HexToInt( v[ 6 ] ),
				a: (HexToInt( v[ 7 ] ) * 16 + HexToInt( v[ 8 ] )) / 255.0
			};
		}else if( v.length >= 7 ){
			result = {
				r: HexToInt( v[ 1 ] ) * 16 + HexToInt( v[ 2 ] ),
				g: HexToInt( v[ 3 ] ) * 16 + HexToInt( v[ 4 ] ),
				b: HexToInt( v[ 5 ] ) * 16 + HexToInt( v[ 6 ] ),
				a: 1.0
			};	
		}else if( v.length >= 4 ){
			result = {
				r: HexToInt( v[ 1 ] ) * 16 + HexToInt( v[ 1 ] ),
				g: HexToInt( v[ 2 ] ) * 16 + HexToInt( v[ 2 ] ),
				b: HexToInt( v[ 3 ] ) * 16 + HexToInt( v[ 3 ] ),
				a: 1.0
			};	
		};

	}else if( v[ 0 ] == "r" && v[ 1 ] == "g" && v[ 2 ] == "b" ){

		let shift = 3;

		if( v[ 3 ] == "a" )
			shift = 4;

		v = v.slice( shift ).trim();
		let s: string[] = v.replace( /\s|\)|\(/g, "" ).split( /,/g );

		result.r = Common.uint( s[ 0 ] );
		result.g = Common.uint( s[ 1 ] );
		result.b = Common.uint( s[ 2 ] );

		if( shift > 3 )
			result.a = Common.float( s[ 3 ] );
		else
			result.a = 1.0;

	};

	return result;
};