import React, { useReducer, useState, useEffect, useMemo, useContext } from "react";

import "./content.container.scss"

export const ContentContainer = ( props: any ) => {

	return (
	<div className={ "eris-content-container" }>

		<div className={ "eris-content-container-bg" }>
			<div className={ "eris-content-container-bg-gradient" }></div>
		</div>

		<div className={ "eris-content-container-wrap" }>
			{ props.children }
		</div>

	</div>
	);
};
