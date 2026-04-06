import React, { useContext, useMemo, useRef, useState } from "react";
import { RoutesMenu } from "../RoutesMenu/routes.menu";
import { RoutesWrap } from "../RoutesWrap/routes.wrap";
import { Button, LangContext, Column, Row, Props, Select, Icons } from "v-eris";

const Header = Row, Wrap = Row, Footer = Row;

export const BodyContainer = () => {

	return (
		<div className={ "eris-core" }>
			<Wrap flex={ 9 }>
				<RoutesMenu/>
				<RoutesWrap/>
			</Wrap>
		</div>
	);
};
