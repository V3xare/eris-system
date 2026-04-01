import React, { useState, useMemo, useRef, useEffect } from "react";
import { Common, Modal, Props, Space, Tooltip, VMath } from "v-eris";

import { CoordHSVA2RGBA, ParseColor, RGBA2CoordHSVA } from "../utility/colors";

import "./types.color.scss"

export const Color = ( props: { className?: string, value?: string, simple?: boolean, onClick?: any } ) => {
	let { className, value, simple, onClick, ...rest } = props;

	return (
	<div className={ Props.className( "color", { simple: simple } ) } onClick={ onClick } style={{ cursor: onClick ? "pointer" : undefined }}>
		<div 
			className={ "color-bg" } 
			style={{ backgroundColor: value }} 
		>
		</div>
		<div className={ "color-title" }>hex: { value }</div>
	</div>
	);
};

const LerpVec3 = ( a: number[], b: number[], t: number ) : number[] => {
	return [
		(a[ 0 ] + (b[ 0 ] - a[ 0 ]) * t),
		(a[ 1 ] + (b[ 1 ] - a[ 1 ]) * t),
		(a[ 2 ] + (b[ 2 ] - a[ 2 ]) * t),
		1.0,
	];
};

export const ColorPicker = ( props: any ) => {
	let { className, value, onChange, onClick, inactive, ...rest } = props;
	const [ expanded, setExpanded ] = useState( false );
	const drag = useRef({
		dragging: false,
		type: "gradient",
		offset: { x: 0, y: 0, hue: 0 }
	});	
	const [ colors, setColors ] = useState({
		rgba: ParseColor( value ),
		hsva: RGBA2CoordHSVA( ParseColor( value ) ),
	});
	useEffect(() => {
		let rgba: { r: number, g: number, b: number, a: number } = ParseColor( value );
		let hsva: { h: number, s: number, v: number, a: number } = RGBA2CoordHSVA( rgba );
		setColors({ rgba, hsva });
	}, [ expanded ]);

	const gradientRef = useRef( null );
	const hueRef = useRef( null );
	const alphaRef = useRef( null );

	const stopDragging = ( e: any ) => {

		if( !drag.current.dragging )
			return;

		drag.current.dragging = false;
	};
	const moveDragging = ( e: any ) => {

		if( !drag.current.dragging )
			return;

		let ref = drag.current.type == "hue" ? hueRef.current : (drag.current.type == "alpha" ? alphaRef.current : gradientRef.current);
		let offset = Common.offset( ref as any );
		let x = VMath.clamp( e.clientX - offset.x, 0, offset.width ) / (offset.width * 1.0);
		let y = VMath.clamp( e.clientY - offset.y, 0, offset.height ) / (offset.height * 1.0);		

		x = VMath.clamp( x, 0.0, 1.0 );
		y = VMath.clamp( y, 0.0, 1.0 );

		if( drag.current.type == "hue" && y >= 1.0 )
			y = 0.9999;

		let hsva = drag.current.type == "hue" ? 
			{ h: y, s: colors.hsva.s, v: colors.hsva.v, a: colors.hsva.a } 
			: 
			(drag.current.type == "alpha" ?
				{ h: colors.hsva.h, s: colors.hsva.s, v: colors.hsva.v, a: Common.float( x.toFixed( 2 ) ) }
				:
				{ h: colors.hsva.h, s: x, v: 1.0 - y, a: colors.hsva.a }
			);
		let rgba = CoordHSVA2RGBA( hsva );
		setColors({ rgba, hsva });

		if( !onChange )
			return;

		onChange({ value: "rgba( " + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + " )" });
	};

	useEffect(() => {
		window.document.addEventListener( "mouseup", stopDragging );
		return () => {
			window.document.removeEventListener("mouseup", stopDragging );
		}
	}, []);
	useEffect(() => {
		window.document.addEventListener( "mousemove", moveDragging );
		return () => {
			window.document.removeEventListener("mousemove", moveDragging );
		}
	}, [ colors, value, onChange ]);

	let tooltip = useMemo(() => {

		let bg = "rgb( " + (colors.rgba.r) + ", " + (colors.rgba.g) + ", " + (colors.rgba.b) + " )";
		let x = colors.hsva.s;
		let y = 1.0 - colors.hsva.v;
		let hue = colors.hsva.h;

		let index = Math.floor( colors.hsva.h * 6.0 );

		if( index > 5 )
			index = 5;
		let it = (colors.hsva.h * 6.0) - index;
		let huecolors : number[] = [];

		if( index == 0 )
			huecolors = LerpVec3([ 1.0, 0.0, 0.0, 1.0 ], [ 1.0, 1.0, 0.0, 1.0 ], it );
		else if( index == 1 )
			huecolors = LerpVec3([ 1.0, 1.0, 0.0, 1.0 ], [ 0.0, 1.0, 0.0, 1.0 ], it );
		else if( index == 2 )
			huecolors = LerpVec3([ 0.0, 1.0, 0.0, 1.0 ], [ 0.0, 1.0, 1.0, 1.0 ], it );
		else if( index == 3 )
			huecolors = LerpVec3([ 0.0, 1.0, 1.0, 1.0 ], [ 0.0, 0.0, 1.0, 1.0 ], it );
		else if( index == 4 )
			huecolors = LerpVec3([ 0.0, 0.0, 1.0, 1.0 ], [ 1.0, 0.0, 1.0, 1.0 ], it );
		else if( index == 5 )
			huecolors = LerpVec3([ 1.0, 0.0, 1.0, 1.0 ], [ 1.0, 0.0, 0.0, 1.0 ], it );

		let gradient = "rgba( " + (huecolors[ 0 ] * 255.0) + ", " + (huecolors[ 1 ] * 255.0) + ", " + (huecolors[ 2 ] * 255.0) + ", " + huecolors[ 3 ] + " )";

		let r = 0;
		let g = 0;
		let b = 0;
		let a = colors.hsva.a;

		return (
		<div className="color-picker" onMouseDown={( e ) => { e.stopPropagation(); }}>
			<div className="color-picker-result" style={{ backgroundColor: bg }}></div>
			<div className="color-picker-wrap">
				<div className="color-picker-content">
					<div className="color-picker-gradient" style={{ backgroundColor: gradient }}
						onMouseDown={( e ) => {

							if( inactive )
								return;

							drag.current.dragging = true;
							drag.current.type = "gradient";
							moveDragging( e );
							//e.stopPropagation();
						}}
						ref={ gradientRef }
					>
						<div className="color-picker-gradient1"></div>
						<div className="color-picker-gradient2"></div>
						<div className="color-picker-gradient-target" style={{ left: (x * 100.0) + "%", top: (y * 100.0) + "%" }}></div>
					</div>
				</div>
				<div className="color-picker-hue" ref={ hueRef }
					onMouseDown={( e ) => {

						if( inactive )
							return;

						drag.current.dragging = true;
						drag.current.type = "hue";
						moveDragging( e );
						//e.stopPropagation();
					}}				
				>
					<div className="color-picker-hue-1"></div>
					<div className="color-picker-hue-2"></div>
					<div className="color-picker-hue-3"></div>
					<div className="color-picker-hue-4"></div>
					<div className="color-picker-hue-5"></div>
					<div className="color-picker-hue-6"></div>
					<div className="color-picker-hue-target" style={{ top: (hue * 100.0) + "%" }}></div>
				</div>
			</div>
			<div className="color-picker-alpha" ref={ alphaRef }
				onMouseDown={( e ) => {

					if( inactive )
						return;

					drag.current.dragging = true;
					drag.current.type = "alpha";
					moveDragging( e );
				}}							
			>
				<div className="color-picker-alpha-overlay" style={{ backgroundImage: "linear-gradient(270deg, " + bg + ", transparent)" }}></div>
				<div className="color-picker-alpha-target" style={{ left: (a * 100.0) + "%" }}></div>
			</div>			
		</div>
		);
	}, [ expanded, colors, onChange ]);

	return (
	<div>
		{
			inactive ? (
				<Color value={ value }/>
			) 
			: 
			(
			<Modal className={ "color-picker-modal" } trigger={ <Color value={ value }/> } attach margin={{ y: 30 }} snap={{ x: 0.5, y: 0.0 }} auto={ false }>
				{ tooltip }		
			</Modal>	
			)
		}
	
	</div>
	);
};