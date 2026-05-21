import { Icons } from "../icons/icons.extend";
import React, { useContext } from "react";
import { Button, LangContext, LangContextType, Modal } from "v-eris";

export const TypeRemove = ( props: { onClick: Function, isText?: boolean } ) => {
	const lang: LangContextType = useContext( LangContext );

	return 	(
		<Modal className={ "settings-type-table-modal" } 
			attach 
			margin={{ y: 10 }} snap={{ x: 0.5, y: 0.0 }} auto={ false }
			trigger={
				props.isText ?
				(<Button danger>{ lang.get( "Remove" ) }</Button>) 
				: 
				(<Button>
					<Icons.bin2/>
				</Button>
				)
			} 
			>
			<Button 
				danger 
				onClick={ props.onClick }
				>
					{ lang.get( "RemoveLine?" ) }
			</Button>		
		</Modal>	
	)
};