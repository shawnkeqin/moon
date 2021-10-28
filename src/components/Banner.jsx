import React from "react";
import PropTypes from "prop-types";
import QueueAnim from "rc-queue-anim";
import { LoginButton } from "./";
import { Typography } from "antd";
import { Element } from "rc-scroll-anim";
import BannerImage from "./BannerImage";
import { assets } from "./data";

const { Title } = Typography;

const titleStyle = {
  marginTop: "230px",
};

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isMobile: PropTypes.bool,
    navToShadow: PropTypes.func,
  };
  static defaultProps = {
    className: "banner",
  };
  render() {
    const { className, isMobile, navToShadow } = this.props;
    return (
      <Element
        component="section"
        className={`${className}-wrapper page`}
        onChange={navToShadow}
      >
        <div class="grid-container">
          <div class="grid-child purple" style={titleStyle}>
            <Title>🚀 moon</Title>
            <Title level={3}>
              🚀 moon is a financial platform that provides investors with
              better insights to make more informed decisions
              <div>
                <LoginButton />
              </div>
            </Title>
          </div>

          <div class="grid-child green">
            <div className={className}>
              <div className={`${className}-img-wrapper`}>
                {isMobile ? (
                  <img
                    width="100%"
                    src={`${assets}/image/home/intro-landscape-3a409.svg`}
                    alt=""
                  />
                ) : (
                  <>
                    <BannerImage />
                  </>
                )}
              </div>
              <QueueAnim
                type={isMobile ? "bottom" : "right"}
                className={`${className}-text-wrapper`}
                delay={300}
              ></QueueAnim>
            </div>
          </div>
        </div>
      </Element>
    );
  }
}

export default Banner;
