import { Icons } from "../icons/icons.extend";
import React, {} from "react";
import { Button, Modal } from "v-eris";

export const TypeRemove = ( props: { onClick: Function, isText?: boolean } ) => {

	return 	(
		<Modal className={ "settings-type-table-modal" } 
			attach 
			margin={{ y: 10 }} snap={{ x: 0.5, y: 0.0 }} auto={ false }
			trigger={
				props.isText ?
				(<Button danger>Remove</Button>) 
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
					{ "Delete line ?" }
			</Button>		
		</Modal>	
	)
};