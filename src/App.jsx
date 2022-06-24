import "./App.scss";
import { AppRouter as Router } from "./components/router/AppRouter.component";
import { I18nextProvider, useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import moment from "moment";
import i18n from "./services/language.service";
import { Provider as UserProvider, useUserContext } from "./context/user";
import { Provider as UtilityProvider } from "./context/utility";
import { Provider as ItemProvider } from "./context/item";
import { NotificationHandler } from "./components/NotificationHandler/NotificationHandler.component";
moment.locale(i18n.language);

const App = () => {
	const { t, i18n } = useTranslation();
	return (
		<div className="App">
			<I18nextProvider i18n={i18n}>
				<Helmet>
					<title>NomaTo</title>
				</Helmet>
				<UserProvider>
					<UtilityProvider>
						<ItemProvider>
							<NotificationHandler>
								<Router />
							</NotificationHandler>
						</ItemProvider>
					</UtilityProvider>
				</UserProvider>
			</I18nextProvider>
		</div>
	);
};

export default App;
