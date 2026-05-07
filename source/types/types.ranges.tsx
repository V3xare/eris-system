import React, { useState, useRef, useEffect, useMemo } from "react";
import { Common, Input, Props, Tooltip, VMath, Row, Text, Space } from "v-eris";

import "./types.ranges.scss"

const RangesToArray = ( v: any, isSingle: boolean, isPairs: boolean ) => {

	if( !Array.isArray( v ) ){

		if( typeof v == "number" ){
			v = [ v ];
		}else{
			v = Common.string( v || "" ).split( /\,/g );

			for( let key in v ){

				if( !v[ key ].length )
					continue;

				v[ key ] = Common.uint( v[ key ] );
			};

			if( isPairs ){
				v = [ v ];
			};

		};

	}else if( isPairs ){

		let s: any[] = [];
		let p: any[] = [];

		for( let item of v ){

			if( Array.isArray( item ) ){

				if( p.length ){
					s.push([ ...p ]);
					p = [];
				};

				s.push([ ...item ]);

				continue;
			};

			if( p.length > 1 ){
				s.push([ ...p ]);
				p = [];
			};

			p.push( item );

		};

		if( p.length ){
			s.push([ ...p ]);
			p = [];
		};

		return s;
	};

	if( isSingle && v.length > 2 ){
		v.length = 2;
	};

	if( v.length > 1 && v[ 1 ] < v[ 0 ] ){
		let temp = v[ 0 ];
		v[ 0 ] = v[ 1 ];
		v[ 1 ] = temp;
	};

	return v;
};

export const Ranges = ( props: any  ) => {
	let { className, min, max, single, grid, pairs, input, separated, inactive, onChange, ...rest } = props;

	if( input !== false )
		input = true;

	const isMultiArray = pairs && !single;
	let v = RangesToArray( props.value, single, isMultiArray );

	const [ ranges, setRanges ] = useState( v );
	const [ rangeValue, setRangeValue ] = useState( 0 );
	const wrapRef = useRef( null );
	const [ isFocused, setIsFocused ] = useState( false );
	const [ focusedValue, setFocusedValue ] = useState( "" );
	const drag = useRef({
		dragging: false,
		index: 0,
		value: 0,
		c: 0, //temp value
		offset: { x: 0, y: 0 }
	});	

	min = Common.int( min );
	max = Common.int( max );
	let distance = (max - min) * 1.0;
	const percent = isMultiArray ? 0.0 : ((ranges[ 0 ] || 0) - min) / distance * 100.0;

	const parseArrays = ( array: any[] ) => {

		let result: string = isMultiArray ? "" : array.join( ", " );

		if( isMultiArray ){

			for( let item of array ){
				result = (Array.isArray( item ) ? item : []).join( ", " );
			};

		};

		return result;
	};

	let parsedText: string = parseArrays( ranges );

	useEffect(() => {
		setRanges( v );
	}, [ props.value ]);

	const stopDragging = ( e: any ) => {

		if( !drag.current.dragging )
			return;

		drag.current.dragging = false;
	};
	const computeValue = ( e: any, offset: any ) => {
		let xShift = (offset.width / (distance || 1)) * 0.5;
		let x = VMath.clamp( e.clientX + (0 + xShift) - offset.x, 0, offset.width ) / (offset.width * 1.0);
		let y = VMath.clamp( e.clientY - offset.y, 0, offset.height ) / (offset.height * 1.0);
		let c = Common.uint( x * distance );		
		c += min;
		return { x, y, c };
	};
	const computeRange = ( c: number, remove: boolean, align?: boolean ) => {

		let array = single && !pairs ? [] : [ ...ranges ];
		let index = drag.current.index;

		if( pairs ){

			if( single ){

				let p0 = array[ 0 ] || min;
				let p1 = array[ 1 ] || min;

				if( c < p0 ){
					array = [ c, p1 ];
				}else if( c > p1 ){
					array = [ p0, c ];
				}else{
					array = index < 1 ? [ c, p1 ] : [ p0, c ];
				};

			}else{
				//console.log( c, index );
			};

		}else{

			if( remove && !single )
				array.splice( index, 1 );
			array.push( c );
			array.sort(( a, b ) => a - b );

		};

		drag.current.value = c;
		drag.current.index = array.indexOf( drag.current.value );

		if( drag.current.index < 0 )
			drag.current.index = 0;

		setRanges( array );

		if( onChange )
			onChange({ value: single && !pairs ? array[ 0 ] : array });

	};
	const moveDragging = ( e: any ) => {

		drag.current.offset = Common.offset( wrapRef.current as any );
		let { x, y, c } = computeValue( e, drag.current.offset );
		drag.current.c = c;
		setRangeValue( c );

		if( !drag.current.dragging )
			return;

		computeRange( c, true, true );
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
	}, [ ranges, single ]);

	const computeInput = ( value: string ) => {
		let s = Common.string( value ).split( /([,.\s])/g );
		let p: number[] = [];

		if( isMultiArray ){

		}else{

			for( let item of s ){

				if( !item.match( /^[0-9]+$/g ) )
					continue;

				let v = Common.uint( item );

				if( v < min )
					v = min;
				if( v > max )
					v = max;

				p.push( v );
			};

			setRanges( p );

		};

		return p;
	};

	//console.log( distance, percent, ranges );

	let gridElements = useMemo(() => {

		let lines: any[] = [];

		if( !grid )
			return lines;
		
		for( let n = min, limit = max + 1; n < limit; n++ ){
			lines.push(
				<div key={ n } 
					className={ "ranges-grid-mark" } 
					style={{ 
						left: ((n - min) / distance * 100.0) + "%",
					}}
					>
						<span>{ n }</span>
				</div>
			);
		};

		return lines;
	}, [ min, max ]);

	const createDotElement = ( pair: any, v: any, index: number, subIndex: number ) => {
		return (
			<div className={ "ranges-item" } key={ "range:" + v + ":" + index + ":" + subIndex } style={{ 
				left: ((v - min) / distance * 100.0) + "%",
				width: (((subIndex + 1) < pair.length ? (pair[ subIndex + 1 ] - v) : (0)) / distance * 100.0) + "%",
			}}>
				<div className={ "ranges-item-dot" } 
					onMouseDown={( e ) => {

						e.stopPropagation();
						e.preventDefault();

						if( inactive )
							return;

						drag.current.dragging = true;
						drag.current.index = index;
						drag.current.value = v;
						drag.current.offset = Common.offset( wrapRef.current as any );
					}}	
					onContextMenu={( e ) => {

						if( inactive )
							return;

						e.stopPropagation();
						e.preventDefault();

						if( single )
							return;

						let array = [ ...ranges ];
						array.splice( index, 1 );
						setRanges( array );

						if( onChange )
							onChange({ value: array });

					}}				
				>
					<span></span>
				</div>
				<div className={ "ranges-item-bg" }></div>
			</div>
		)
	};

	return (<div
		className={
			Props.className( "ranges", className, { gridless: !grid, separated: separated, inactive })
		}
	>
		{ input && !inactive ? 
			(<Row>
				<Input className={ "ranges-input" } 
					onChange={( e ) => { 
						setFocusedValue( e.value );
						let v = computeInput( e.value );

						if( !onChange )
							return;

						onChange({ value: v });

					}}
					onKeyDown={( e ) => {

						if( e.event.which == 13 ){
							let v = computeInput( e.value );
							v = RangesToArray( v, single, isMultiArray );
							setFocusedValue( parseArrays( v ) );

							if( onChange )
								onChange({ value: v });

						};

					}}
					onFocus={( e ) => {
						setFocusedValue( parsedText );
						setIsFocused( true );
					}}
					onBlur={( e ) => {
						setIsFocused( false );
						if( !onChange )
							return;
						onChange({ value: ranges });
					}}
				>{ isFocused ? focusedValue : parsedText }
				</Input>
				<Text className={ "ranges-input-params" } >
					{ "[ " + min + ", " + max + " ]" }
				</Text>
			</Row>
			) 
			: 
			null 
		}
		<Tooltip 
			content={(
				<div>
					<div>{ rangeValue }</div>
				</div>
			)}
			style={{ 
				opacity: inactive ? "0" : null,
				pointerEvents: inactive ? "none" : null,
			}}			
		>
		<div className={ "ranges-wrap" }>
			{ inactive ? (<Input inactive>{ parsedText }</Input>) : null }
			<div className={ "ranges-list" } ref={ wrapRef }
				onMouseDown={( e ) => {

					if( inactive ){
						e.stopPropagation();
						e.preventDefault();
						return;
					};
					
					if( e.button != 0 )
						return;
					
					e.preventDefault();
					drag.current.offset = Common.offset( wrapRef.current as any );
					let { x, y, c } = computeValue( e, drag.current.offset );
					computeRange( c, false );
					drag.current.dragging = true;
				}}
				onContextMenu={( e ) => {

					if( inactive ){
						e.stopPropagation();
						e.preventDefault();
						return;
					};

					e.stopPropagation();
					e.preventDefault();
				}}
			>
			<span className={ Props.className( "ranges-value", { hidden: !single || pairs, flip: percent > 80 } ) } style={{ left: (percent) + "%" }}>{ single ? ranges[ 0 ] : null }</span>
			{
				ranges.map(( value: any, index: number ) => { 

					if( isMultiArray ){
						let pair: number[] = value;

						if( pair.length > 1 ){
							return [
								createDotElement( pair, value[ 0 ], index, 0 ),
								createDotElement( pair, value[ 1 ], index, 1 )
							];
						};

						return createDotElement( pair, value[ 0 ], index, 0 );
					};

					return createDotElement( ranges, value, index, 0 );
				})
			}</div>
			<div className={ "ranges-line" }></div>
			<div className={ "ranges-grid" }>{ gridElements }</div>
		</div>
		</Tooltip>
	</div>);
};