import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";

import Banner from "./Banner";
import Footer from "./Footer";
import "./static/style";

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
      <Banner
        key="banner"
        isMobile={this.state.isMobile}
        navToShadow={this.navToShadow}
      />,
      <Footer />,
    ];
  }
}
export default LandingPage;
