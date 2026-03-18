import React from "react";
import { Notifications, NotificationsContext, NotificationsModuleInit } from "@components/Notifications/notifications";

export const App = () => {

	return <div>
		<NotificationsContext.Provider value={ NotificationsModuleInit() }>
			<Notifications/>
		</NotificationsContext.Provider>
	</div>;
};