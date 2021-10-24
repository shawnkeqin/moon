import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { HeartTwoTone } from "@ant-design/icons";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  CryptoDetails,
  Cryptocurrencies,
  News,
  Homepage,
  Stocks,
  Options,
  Insiders,
  Sentiment,
  RecommendationTrends,
  Schedule,
  LoginButton,
  LogoutButton,
} from "./components";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/Loader";
const buttonsStyle = {
  marginLeft: "250px",
};
const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loader />;
  return (
    <div className="app">
      <div>
        Make more informed Investing Decisions with moon.
        <div style={buttonsStyle}>
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
      {isAuthenticated && (
        <div>
          <div className="navbar">
            <Navbar />
          </div>
          <div className="main">
            <Layout>
              <div className="routes">
                <Switch>
                  <Route exact path="/">
                    <Homepage />
                  </Route>
                  <Route exact path="/exchanges">
                    <Exchanges />
                  </Route>
                  <Route exact path="/cryptocurrencies">
                    <Cryptocurrencies />
                  </Route>
                  <Route exact path="/crypto/:coinId">
                    <CryptoDetails />
                  </Route>
                  <Route exact path="/news">
                    <News />
                  </Route>
                  <Route exact path="/stocks">
                    <Stocks />
                  </Route>
                  <Route exact path="/options">
                    <Options />
                  </Route>
                  <Route exact path="/insiders">
                    <Insiders />
                  </Route>
                  <Route exact path="/sentiment">
                    <Sentiment />
                  </Route>
                  <Route exact path="/recommendation-trends">
                    <RecommendationTrends />
                  </Route>
                  <Route exact path="/schedule">
                    <Schedule />
                  </Route>
                </Switch>
              </div>
            </Layout>

            <div className="footer">
              <Typography.Title level={5} style={{ textAlign: "center" }}>
                <HeartTwoTone />
                moon
                <br />
                All rights reserved
              </Typography.Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                <Link to="/stocks">Stocks</Link>
                <Link to="/insiders">Insiders</Link>
                <Link to="/news">News</Link>
              </Space>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default App;
