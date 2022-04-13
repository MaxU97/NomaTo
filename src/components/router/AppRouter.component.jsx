import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../views/Home/Home.view";
import Login from "../../views/Login/Login.view";
import NotFound from "../../views/NotFound";
import Header from "../Header/Header.component";
import { useUserContext } from "../../context/user";
import AddNews from "../../views/AddNews/AddNews.view";
import UploadTest from "../../views/UploadTest";
import ListItem from "../../views/ListItem/ListItem.view";
export const AppRouter = () => {
  const { state } = useUserContext();
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/", "/home"]} exact component={() => <Home />} />
        <Route path={["/login"]} exact component={() => <Login />}>
          {state.user && <Redirect to="/"></Redirect>}
        </Route>

        <Route path={["/add-news"]} exact>
          {state.user.admin ? <AddNews /> : <NotFound />}
        </Route>
        <Route path={["/list-an-item"]} exact>
          {state.user ? <ListItem /> : <NotFound />}
        </Route>
        <Route
          path={["/test-upload"]}
          exact
          component={() => <UploadTest />}
        ></Route>
        <Route component={() => <NotFound />} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};
