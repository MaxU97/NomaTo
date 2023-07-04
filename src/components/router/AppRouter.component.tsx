import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../views/Home/Home.view";
import Login from "../../views/Login/Login.view";
import NotFound from "../../views/NotFound/NotFound";
import Header from "../Header/Header.component";
import { useUserContext } from "../../context/user";
import AddNews from "../../views/AddNews/AddNews.view";
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
import EditItem from "../../views/EditItem/EditItem.view";
import MyShop from "../../views/MyShop/MyShop.view";
import ChangePassword from "../../views/ChangePassword/ChangePassword.view";
import AccountBalance from "../../views/AccountBalance/AccountBalance.view";
import NewsPage from "../../views/NewsPage/NewsPage.component";
import EditNews from "../../views/EditNews/EditNews.view";
import TermsPage from "../../views/TermsPage/TermsPage.view";
import PrivacyPage from "../../views/PrivacyPage/PrivacyPage.view";
import PaymentRegister from "../../views/PaymentRegister/PaymentRegister.view";
import LeaveReview from "../../views/LeaveReview/LeaveReview.view";
import "./router.scss";
import { SpinnerAnimationIcon } from "../../assets/Icons";
import { CSSTransition } from "react-transition-group";
import ContactSupport from "../ContactSupport/ContactSupport.component";
import Footer from "../Footer/Footer.component";
import UserPage from "../../views/UserPage/UserPage.view";
import UserSearch from "../../views/UserSearch/UserSearch.view";
import AllNews from "../../views/AllNews/AllNews.view";
export const AppRouter = () => {
  const { state, LOGOUT } = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleInvalidToken = (e) => {
      if (e.key === "token" && e.oldValue && !e.newValue) {
        console.log(e);
        LOGOUT();
      }
    };
    window.addEventListener("storage", handleInvalidToken);
    return function cleanup() {
      window.removeEventListener("storage", handleInvalidToken);
    };
  }, [LOGOUT]);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          {/* Regular routes */}
          <Route path={["/", "/home"]} exact>
            <Home />
          </Route>
          <Route path={["/item/:id"]} exact>
            <ItemPage />
          </Route>
          <Route path={["/news/:id"]} exact>
            <NewsPage />
          </Route>
          <Route path={["/search"]} exact>
            <SearchPage />
          </Route>
          <Route path={["/terms-of-service"]} exact>
            <TermsPage />
          </Route>
          <Route path={["/privacy-policy"]} exact>
            <PrivacyPage />
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
          <PrivateRoute path={["/all-news"]}>
            <AllNews></AllNews>
          </PrivateRoute>
          <PrivateRoute path={["/add-news"]} exact admin>
            <AddNews />
          </PrivateRoute>
          <PrivateRoute path={["/edit-news/:id"]} exact admin>
            <EditNews />
          </PrivateRoute>
          <PrivateRoute path={["/add-categories"]} exact admin>
            <AddCategories />
          </PrivateRoute>
          <PrivateRoute path={["/user/:id"]} exact admin>
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path={["/user-search/"]} exact admin>
            <UserSearch />
          </PrivateRoute>
          {/* Private Routes */}
          <PrivateRoute path={["/payment-details"]}>
            <PaymentRegister></PaymentRegister>
          </PrivateRoute>
          <PrivateRoute path={["/list-an-item"]} exact>
            <ListItem />
          </PrivateRoute>
          <PrivateRoute path={["/requests"]} exact>
            <BookingRequests />
          </PrivateRoute>
          <PrivateRoute path={["/edit-item/:id"]} exact>
            <EditItem />
          </PrivateRoute>
          <PrivateRoute path={["/bookings"]} exact>
            <MyBookings />
          </PrivateRoute>
          <PrivateRoute path={["/qr-code/:type?/:booking?"]}>
            <QRPage />
          </PrivateRoute>
          <PrivateRoute path={["/qr-reader/:booking?"]} exact>
            <QRRead />
          </PrivateRoute>
          <PrivateRoute path={["/profile"]} exact>
            <Profile />
          </PrivateRoute>
          <PrivateRoute path={["/checkout"]} exact>
            <CheckoutPage />
          </PrivateRoute>
          <PrivateRoute path={["/my-shop"]} exact>
            <MyShop />
          </PrivateRoute>
          <PrivateRoute path={["/change-password"]} exact>
            <ChangePassword />
          </PrivateRoute>
          <PrivateRoute path={["/review/:id"]} exact>
            <LeaveReview />
          </PrivateRoute>
          <PrivateRoute path={["/account-balance"]} exact>
            <AccountBalance />
          </PrivateRoute>
          {/* Test routes */}
          {/* <Route
          path={["/test-upload"]}
          exact
          component={() => <UploadTest />}
        ></Route> */}
          {/* 404 */}
          <Route component={() => <NotFound />} />
          <Route
            path={["/not-found"]}
            component={() => {
              <NotFound />;
            }}
          />
        </Switch>
        <ContactSupport></ContactSupport>
        <Footer />
      </Router>
    </>
  );
};
