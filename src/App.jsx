import "./App.scss";
import { AppRouter as Router } from "./components/router/AppRouter.component";
import { I18nextProvider, useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import moment from "moment";
import i18n from "./services/language.serivce";
import { Provider as UserProvider, useUserContext } from "./context/user";

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
          <Router />
        </UserProvider>
      </I18nextProvider>
    </div>
  );
};

export default App;
