import React from "react";
import { enquireScreen } from "enquire-js";
import { Layout } from "antd";
import LoginButton from "./LoginButton";
import Banner from "./Banner";
import Footer from "./Footer";
import "./static/style";
const { Header } = Layout;
let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class LandingPage extends React.PureComponent {
  state = {
    isMobile,
    showShadow: false,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === "leave" });
  };
  render() {
    return [
      <>
        <Header>
          <div>
            <LoginButton />
          </div>
        </Header>
        <br/>
        <br/>
        <Banner
          key="banner"
          isMobile={this.state.isMobile}
          navToShadow={this.navToShadow}
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer />
      </>,
    ];
  }
}
export default LandingPage;
