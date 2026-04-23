import React, { useState, useMemo, useRef, useEffect } from "react";
import { Button, Common, Input, Props, VMath } from "v-eris";

import { CoordHSVA2RGBA, ParseColor, RGBA2CoordHSVA } from "../utility/colors";

import "./types.pagination.scss"

export const Pagination = ( props: { 
	className?: string, 
	offset: number,
	limit: number,
	length: number,
	autoHide?: boolean,
	onChange?: Function,
}) => {
	let { className, onChange, ...rest } = props;

	const currentLimit = Common.uint( props.limit );
	let currentOffset = Math.floor( Common.uint( props.offset ) / currentLimit ) * currentLimit;
	//const currentLength = Common.uint( props.length );
	const currentLength = Common.uint( props.length );
	const maxPages = Math.floor( currentLength / currentLimit );
	
	if( currentOffset >= currentLength )
		currentOffset = Common.uint( maxPages * currentLimit );
	
	const currentPage = (currentOffset / currentLimit);

	if( !onChange )
		onChange = () => {};

	const tryNext = ( offset: number, limit: number, length: number ) : number => {

		let current = offset + limit;

		if( current >= length )
			return -1;

		return current;
	};
	const tryPrev = ( offset: number, limit: number, length: number ) : number => {

		let current = offset - limit;

		if( current < 0 )
			return -1;

		return current;
	};
	const tryPage = ( page: number, limit: number, length: number ) : number => {

		let current = page - limit;

		if( current < 0 )
			return -1;

		return current;
	};	
	const next = () =>{

		const current = tryNext( currentOffset, currentLimit, currentLength );

		if( current < 0 )
			return;

		onChange({ offset: current });
	};
	const prev = () =>{

		const current = tryPrev( currentOffset, currentLimit, currentLength );

		if( current < 0 )
			return;

		onChange({ offset: current });		
	};
	const setPage = ( value: number ) => {
		let current = Math.floor( Common.uint( value * currentLimit ) / currentLimit ) * currentLimit;

		if( current < 0 )
			current = 0;

		if( current >= currentLength )
			current = Common.uint( maxPages * currentLimit );		

		onChange({ offset: current });		
	};

	const pages = useMemo(() => {

		let pages: number[] = [];
		let power = 3;
		let powerLeft = 0;
		let block = { left: false, right: false };
		let min = currentPage - power;
		let max = currentPage + power;

		if( min < 0 ){
			powerLeft += min * -1;
			min = 0;
			block.left = true;
		};
		if( max > maxPages ){
			powerLeft += max - maxPages;
			max = maxPages;
			block.right = true;
		};

		if( powerLeft && !block.right ){
			max += powerLeft;
		};		
		if( powerLeft && !block.left ){
			min -= powerLeft;
		};
		
		min = VMath.max( 0, min );
		max = VMath.min( maxPages, max );
		max += 1;

		for( let n = min; n < max; n++ ){
			pages.push( n );
		};

		pages[ 0 ] = 0;

		if( pages.length > 1 )
			pages[ pages.length - 1 ] = maxPages;

		if( (pages.length > 2) && (pages[ 1 ] < currentPage) && ((pages[ 1 ] - pages[ 0 ]) > 1) )
			pages[ 1 ] = -1;		
		if( (pages.length > 2) && (pages[ pages.length - 2 ] > currentPage) && ((pages[ pages.length - 1 ] - pages[ pages.length - 2 ]) > 1) )
			pages[ pages.length - 2 ] = -1;

		return pages;
	}, [ currentOffset, currentLimit, currentLength, maxPages ]);

	return (
	<div className={ Props.className( "eris-pagination", { hidden: props.autoHide && maxPages < 1 }) }>

		<Button onClick={ prev } disabled={ tryPrev( currentOffset, currentLimit, currentLength ) < 0 }>Prev</Button>
		{
			pages.map(( value: number, index: number ) => 
				<Button key={ index } warning={ value == currentPage } disabled={ value < 0 } onClick={() => setPage( value ) }>
					{ (value < 0 ? "..." : Common.string( value + 1 )) }
				</Button>
			)
		}
		<Button onClick={ next } disabled={ tryNext( currentOffset, currentLimit, currentLength ) < 0 }>Next</Button>
		<div key={ "carret" } className={ Props.className( "eris-pagination-input" ) }>
			Page: 
			<Input 
				onKeyDown={( e ) => {

					if( e.event.which != 13 )
						return;

					e.event.target.blur();
				}}
				onBlur={( e ) => {
					setPage( Common.uint( e.value ) - 1 );
				}}				
			>{ currentPage + 1 }</Input>
		</div>

	</div>
	);
};
