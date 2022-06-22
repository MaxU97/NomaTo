import React, { useEffect, useState } from "react";
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
import { ItemPage } from "../../views/ItemPage/ItemPage.view";
import { CheckoutPage } from "../../views/CheckoutPage/CheckoutPage.view";
import MyBookings from "../../views/MyBookings/MyBookings.view";
import BookingRequests from "../../views/BookingRequests/BookingRequests.view";
import QRPage from "../../views/QRPage/QRPage.view";
import QRRead from "../../views/QRRead/QRRead.view";
import AddCategories from "../../views/AddCategories/AddCategories.view";
import Register from "../../views/Register/Register.component";
import Profile from "../../views/Profile/Profile.view";
import SearchPage from "../../views/SearchPage/SearchPage.component";
import ForgotPassword from "../../views/ForgotPassword/ForgotPassword.view";
import { PrivateRoute } from "./PrivateRoute.component";
import PublicRoute from "./PublicRoute.component";

export const AppRouter = () => {
  const { state } = useUserContext();
  const [header, showHeader] = useState(true);
  useEffect(() => {
    showHeader(true);
  }, []);
  return (
    <Router>
      {header && <Header />}
      <Switch>
        {/* Regular routes */}
        <Route path={["/", "/home"]} exact>
          <Home />
        </Route>
        <Route path={["/item/:id"]} exact>
          <ItemPage />
        </Route>
        <Route path={["/search"]} exact>
          <SearchPage />
        </Route>
        {/* Public only routes */}
        <PublicRoute path="/login" exact>
          <Login />
        </PublicRoute>
        <PublicRoute path="/register" exact>
          <Register />
        </PublicRoute>
        <PublicRoute path={["/forgot-password"]} exact>
          <ForgotPassword />
        </PublicRoute>
        {/* Admin routes */}
        <PrivateRoute path={["/add-news"]} exact admin>
          <AddNews />
        </PrivateRoute>
        <Route path={["/add-categories"]} exact admin>
          <AddCategories />
        </Route>
        {/* Private Routes */}
        <PrivateRoute path={["/list-an-item"]} exact>
          <ListItem />
        </PrivateRoute>
        <PrivateRoute path={["/requests"]} exact>
          <BookingRequests />
        </PrivateRoute>
        <PrivateRoute path={["/bookings"]} exact>
          <MyBookings />
        </PrivateRoute>
        <PrivateRoute path={["/qr-code/:type?/:booking?"]}>
          <QRPage showHeader={showHeader} />
        </PrivateRoute>
        <PrivateRoute path={["/qr-reader/:booking?"]} exact>
          <QRRead showHeader={showHeader} />
        </PrivateRoute>
        <PrivateRoute path={["/profile"]} exact>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path={["/checkout"]} exact>
          <CheckoutPage />
        </PrivateRoute>
        {/* Test routes */}
        <Route
          path={["/test-upload"]}
          exact
          component={() => <UploadTest />}
        ></Route>
        {/* 404 */}
        <Route component={() => <NotFound />} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};
