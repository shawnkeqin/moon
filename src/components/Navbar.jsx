import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar, Image, Modal, Tag } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CalendarOutlined,
  RadarChartOutlined,
  BulbOutlined,
  StockOutlined,
  MenuOutlined,
  FileDoneOutlined,
  EyeOutlined,
  DollarOutlined,
  HeartTwoTone,
  FormOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import icon from "../images/moon1.png";
import StripeContainer from "./StripeContainer";
const { Title } = Typography;

const PayButton = {
  width: "calc(100% - 30px)",
  backgroundColor: "#f6a4eb",
  borderRadius: "4px",
  cursor: "pointer",
  border: "none",
};

const titleStyle = {
  marginTop: "15px",
  marginRight: "30px",
  color: "#000000",
};

const buttonStyle = {
  marginLeft: "10px",
  width: "100px",
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const hasUserPaid = useSelector((state) => state.payment.success);
  const { user } = useAuth0();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <div style={titleStyle}>
          <Link to="/">
            <div class="grid-container-2">
              <div class="grid-child purple">
                <Image src={icon} size width="90%" height="90%" />
              </div>
              <div class="grid-child green">
                <Title italic="true">moon</Title>
              </div>
            </div>
          </Link>
        </div>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(true)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="light">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<DollarOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">Crypto News</Link>
          </Menu.Item>
          <Menu.Item icon={<StockOutlined />}>
            {/* <Link to="/stocks" onClick={hasUserPaid ? null : showModal}> */}
            <Link to="/stocks">
              WSB Stocks Insights
            </Link>
            <Button
              style={buttonStyle}
              type="primary"
              onClick={hasUserPaid ? null : showModal}
            >
              Premuim
            </Button>

            <Modal
              title="Subscribe to gain access"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {showItem ? (
                <StripeContainer />
              ) : (
                <>
                  <h3>$10.00</h3>
                  <Button style={PayButton} onClick={() => setShowItem(true)}>
                    Purchase Subscription
                  </Button>
                </>
              )}
            </Modal>
          </Menu.Item>
          {/* <Menu.Item icon={<FileDoneOutlined />}>
            <Link to="/options">Options</Link>
          </Menu.Item> */}
          <Menu.Item icon={<FileDoneOutlined />}>
            <Link to="/insiders">Insiders</Link>
          </Menu.Item>
          <Menu.Item icon={<RadarChartOutlined />}>
            {/* <Link to="/sentiment" onClick={hasUserPaid ? null : showModal}> */}
            <Link to="/sentiment" >
              Sentiment
            </Link>
            <Button
              style={buttonStyle}
              type="primary"
              onClick={hasUserPaid ? null : showModal}
            >
              Premuim
            </Button>
            <Modal
              bodyStyle={{ height: "300px" }}
              title="Subscribe to gain access"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {showItem ? (
                <StripeContainer />
              ) : (
                <>
                  <h3>$10.00</h3>
                  <Button style={PayButton} onClick={() => setShowItem(true)}>
                    Purchase Subscription
                  </Button>
                </>
              )}
            </Modal>
          </Menu.Item>
          <Menu.Item icon={<EyeOutlined />}>
            {/* <Link
              to="/recommendation-trends"
              onClick={hasUserPaid ? null : showModal}
            > */}
              <Link
              to="/recommendation-trends"
            >
              Recommendations
            </Link>
            <Button
              style={buttonStyle}
              type="primary"
              onClick={hasUserPaid ? null : showModal}
            >
              Premuim
            </Button>
            <Modal
              bodyStyle={{ height: "300px" }}
              title="Subscribe to gain access"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {showItem ? (
                <StripeContainer />
              ) : (
                <>
                  <h3>$10.00</h3>
                  <Button style={PayButton} onClick={() => setShowItem(true)}>
                    Purchase Subscription
                  </Button>
                </>
              )}
            </Modal>
          </Menu.Item>
          <Menu.Item icon={<CalendarOutlined />}>
            <Link to="/schedule">Schedule</Link>
          </Menu.Item>
          <Menu.Item icon={<FormOutlined />}>
            Feedback
            <a href="https://docs.google.com/forms/d/1pSQI1GbYd0IE-HDeVxMi0WnEQGwYLJxhDf_l-lwPsWM/prefill"></a>
          </Menu.Item>
        </Menu>
      )}
      <Tag color="processing">
        Logged in as:
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ width: 45 }}
        />
        {user.name} <HeartTwoTone />
      </Tag>
    </div>
  );
};

export default Navbar;
