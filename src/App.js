import "./App.css";
import Home from "./views/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./views/NotFound";
import { I18nextProvider, useTranslation } from "react-i18next";
import Header from "./components/Header/Header.component";
import Helmet from "react-helmet";
import moment from "moment";
import i18n from "./services/language.serivce";
moment.locale(i18n.language);

const App = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <Helmet>
          <title>NomaTo</title>
        </Helmet>
        <Router>
          <Header />
          <Switch>
            <Route path={["/", "/home"]} exact component={() => <Home />} />
            <Route component={() => <NotFound />} />
          </Switch>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          <div>{t("home.bechef")}</div>
          {/* <Footer /> */}
        </Router>
      </I18nextProvider>
    </div>
  );
};

export default App;
