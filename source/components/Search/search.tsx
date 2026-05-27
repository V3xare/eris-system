import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, LangContext, Column, Row, Props, Select, AutoComplete, Input, LangContextType } from "v-eris";

import "./search.scss"

export const Search = ( props: { 
	active?: boolean, hidden?: boolean, placeholder?: string,
	onSelect?: Function, onChange?: Function, onClick?: Function,
	tools?: any[]
}) => {
	const lang: LangContextType = useContext( LangContext );
	const placeholder = props.placeholder ? props.placeholder : lang.get( "Search::input" );
	const expanded = !!props.active;
	const tools = props.tools ? props.tools : [];

	return (
		<div className={ Props.className( "eris-search", { overlay: expanded, hidden: props.hidden, reduced: !expanded }) }>
			<AutoComplete 
				larger 
				onSelect={ props.onSelect } 
				onChange={ props.onChange }
			>
				<Input 
					larger 
					placeholder={ placeholder } 
					tools={ tools } 
					onClick={ props.onClick }
				/>
			</AutoComplete>
		</div>
	);
};