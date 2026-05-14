import React, { useState, useRef, useEffect, useMemo } from "react";
import { Common, Input, Props, Tooltip, VMath, Row, Text, Space } from "v-eris";

import "./types.ranges.scss"

const RangesFloatType = ( value: any, isFloat: boolean ) => {
	return isFloat ? (Common.float( value )) : Common.int( value );
};


const RangesToString = ( array: any[], isSingle: boolean ) => {
	let result: string = "";

	if( isSingle )
		return Common.string( array[ 0 ] );

	for( let item of array ){
		result += item[ 0 ] + "-" + item[ 1 ] + ", ";
	};
	
	if( result.length > 2 )
		result = result.substring( 0, result.length - 2 );

	return result;
};

const RangesToArray = ( v: any, isSingle: boolean, isMulti: boolean, min: number, max: number, isFloat: boolean ) => {

	let value = v;

	if( !Array.isArray( value ) ){

		if( typeof value == "number" ){
			value = [ v ];
		}else if( typeof v == "string" ){
			let s: any[] = [];
			let pairs = Common.string( v || "" ).split( /\,/g );

			for( let key in pairs ){

				pairs[ key ] = pairs[ key ].trim();

				if( !pairs[ key ].length )
					continue;

				if( !isMulti ){
					s.push( RangesFloatType( pairs[ key ], isFloat ) );
					continue;
				};

				let subPair = Common.string( pairs[ key ] ).split( /\-/g );
				let subPairParsed = [
					RangesFloatType( subPair[ 0 ], isFloat ),
					RangesFloatType( subPair[ 1 ], isFloat ),
				];

				if( subPairParsed[ 1 ] < subPairParsed[ 0 ] )
					subPairParsed[ 1 ] = subPairParsed[ 0 ];

				s.push( subPairParsed );
			};

			value = s;
		}else{
			value = [];
		};

	};
	
	if( isSingle )
		return [ VMath.clamp( RangesFloatType( Array.isArray( value ) ? value[ 0 ] : value, isFloat ), min, max ) ];

	let s: any[] = [];
	let p: any[] = [];

	for( let item of value ){

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

	if( !isMulti && s.length > 1 ){
		s.length = 1;
	};

	for( let item of s ){

		item[ 0 ] = VMath.clamp( item[ 0 ], min, max );
		item[ 1 ] = VMath.clamp( item[ 1 ], min, max );

		if( item.length > 1 && item[ 1 ] < item[ 0 ] ){
			let temp = item[ 0 ];
			item[ 0 ] = item[ 1 ];
			item[ 1 ] = temp;
		};

	};

	s.sort(( a, b ) => a[ 0 ] - b[ 0 ] );

	let prev = null;

	for( let item of s ){

		if( prev && prev[ 1 ] > item[ 0 ] )
			prev[ 1 ] = prev[ 0 ];

		prev = item;
	};

	return s;
};

export const Ranges = ( props: any ) => {
	let { className, min, max, step, grid, input, separated, inactive, onChange, ...rest } = props;

	if( input !== false )
		input = true;

	if( !onChange )
		onChange = () => {};

	const isSingle = props.single;
	const isMulti = props.multi;
	const isFloat = props.float;
	min = RangesFloatType( min, isFloat );
	max = RangesFloatType( max, isFloat );	
	let v = RangesToArray( props.value, isSingle, isMulti, min, max, isFloat );

	const [ ranges, setRanges ] = useState( v );
	const [ hovered, setHovered ] = useState( false );
	const [ rangeValue, setRangeValue ] = useState( 0 );
	const wrapRef = useRef( null );
	const [ isFocused, setIsFocused ] = useState( false );
	const [ focusedValue, setFocusedValue ] = useState( "" );
	const drag = useRef({
		dragging: false,
		index: 0,
		subIndex: 0,
		value: 0,
		c: 0, //temp value
		offset: { x: 0, y: 0 }
	});	
	
	step = step === undefined ? 1 : RangesFloatType( step, isFloat );
	let distance = (max - min) * 1.0;
	const percent = ((ranges[ 0 ] || 0) - min) / distance * 100.0;

	let parsedText: string = RangesToString( ranges, isSingle );

	useEffect(() => {
		setRanges( v );
	}, [ props.value ]);

	const stopDragging = ( e: any ) => {

		if( !drag.current.dragging )
			return;

		drag.current.dragging = false;
	};
	const computeValue = ( e: any, offset: any ) => {
		let xShift = (offset.width / (distance || 1)) * (isFloat ? 0.0 : 0.5);
		let x = VMath.clamp( e.clientX + (0 + xShift) - offset.x, 0, offset.width ) / (offset.width * 1.0);
		let y = VMath.clamp( e.clientY - offset.y, 0, offset.height ) / (offset.height * 1.0);
		let c = RangesFloatType( x * distance, isFloat );

		if( isFloat ){
			c = Common.int( (c * 100000.0) / (step * 100000.0) ) * step;
			c = +c.toFixed( 4 );
		}else{
			c = Common.int( (c / step) ) * step;
		};

		c += min;
		return { x, y, c };
	};
	const computeRange = ( c: number, alter: boolean, align?: boolean ) => {

		let array = isSingle ? [] : [ ...ranges ];
		let index = drag.current.index;
		let subIndex = drag.current.subIndex;

		if( isSingle ){

			if( alter )
				array.splice( index, 1 );
			array.push( c );

			drag.current.value = c;
			drag.current.index = array.indexOf( drag.current.value );

			if( drag.current.index < 0 )
				drag.current.index = 0;

			setRanges( array );

		}else{

			if( isMulti && !alter ){

				let length = array.length;
				let inside = false;

				for( let n = 0; n < length; n++ ){

					const item = array[ n ];

					if( c > item[ 0 ] && c < item[ 1 ] ){
						inside = true;
						index = n;
						break;
					};

					if( c > item[ 1 ] ){
						index = n + 1;
					};

				};

				if( index >= length ){
					array.push([ c, c ]);
				}else if( !inside ){
					array.splice( index, 0, [ c, c ] );
				};

			};

			let subArray = [ ...(isMulti ? (array[ index ] || array[ 0 ]) : array[ 0 ]) ];
			let p0 = subArray[ 0 ] || min;
			let p1 = subArray[ 1 ] || min;

			if( c < p0 ){
				subArray = [ c, p1 ];
				drag.current.subIndex = 0;
			}else if( c > p1 ){
				subArray = [ p0, c ];
				drag.current.subIndex = 1;
			}else{
				subArray = subIndex < 1 ? [ c, p1 ] : [ p0, c ];
				drag.current.subIndex = subIndex < 1 ? 0 : 1;
			};

			if( array[ index ] )
				array[ index ] = [ ...subArray ];

			drag.current.index = index;
			drag.current.value = c;

			setRanges( array );
		};

		onChange({ value: isSingle ? array[ 0 ] : (isMulti ? array : array[ 0 ]) });

	};
	const moveDragging = ( e: any ) => {

		if( !wrapRef.current )
			return;

		if(	!hovered && !drag.current.dragging )
			return;

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
	}, [ ranges, isSingle, hovered ]);

	let gridElements = useMemo(() => {

		let lines: any[] = [];

		if( !grid )
			return lines;

		let s = isFloat ? (Common.uint( step ) || 1) : step;
		
		for( let n = min, limit = max + 1; n < limit; n += s ){
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
						drag.current.subIndex = subIndex;
						drag.current.value = v;
						drag.current.offset = Common.offset( wrapRef.current as any );
					}}	
					onContextMenu={( e ) => {

						if( inactive )
							return;

						e.stopPropagation();
						e.preventDefault();

						if( isSingle )
							return;

						let array = [ ...ranges ];
						array.splice( index, 1 );
						setRanges( array );
						onChange({ value: isSingle ? array[ 0 ] : (isMulti ? array : array[ 0 ]) });

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
						let array = RangesToArray( e.value, isSingle, isMulti, min, max, isFloat );
						setRanges( array );
						onChange({ value: isSingle ? array[ 0 ] : (isMulti ? array : array[ 0 ]) });
					}}
					onKeyDown={( e ) => {

						if( e.event.which == 13 ){
							let array = RangesToArray( e.value, isSingle, isMulti, min, max, isFloat );
							setRanges( array );
							setFocusedValue( RangesToString( array, isSingle ) );
							onChange({ value: isSingle ? array[ 0 ] : (isMulti ? array : array[ 0 ]) });
						};

					}}
					onFocus={( e ) => {
						setFocusedValue( parsedText );
						setIsFocused( true );
					}}
					onBlur={( e ) => {
						setIsFocused( false );
						let array = [ ...ranges ];
						onChange({ value: isSingle ? array[ 0 ] : (isMulti ? array : array[ 0 ]) });
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
		<div className={ "ranges-wrap" } onMouseEnter={() => setHovered( true ) } onMouseLeave={() => setHovered( false ) }>
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
			<span className={ Props.className( "ranges-value", { hidden: !isSingle, flip: percent > 80 } ) } style={{ left: (percent) + "%" }}>{ isSingle ? ranges[ 0 ] : null }</span>
			{
				ranges.map(( value: any, index: number ) => { 

					if( !isSingle ){
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