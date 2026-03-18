import React from "react";
import { createRoot } from 'react-dom/client';

import {
	BrowserRouter,
} from "react-router-dom";
//
console.log( "eris-system" );
//

import { App } from "./app";

const root = createRoot( document.getElementById( "main" ) );
root.render( 
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);
