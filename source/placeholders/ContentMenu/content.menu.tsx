import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";

import "./content.menu.scss"

export const ContentMenu = ( props: any ) => {

	return (
	<div className={ "eris-content-menu" }>
		<div  className={ "eris-content-menu-inside" }>
			<div  className={ "eris-content-menu-bg" }></div>
			{ props.children }
		</div>
	</div>
	);
};
