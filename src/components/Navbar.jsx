import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar, Image } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  StockOutlined,
  FundOutlined,
  MenuOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import icon from "../images/moon.png";

const titleStyle = {
  marginTop: "15px",
  marginRight: "30px",
  color: "#000000",
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

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
            {/* <Avatar src={icon} size="large" /> */}
            <Image src={icon} />
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
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item icon={<StockOutlined />}>
            <Link to="/stocks">WSB Stocks</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<FileDoneOutlined />}>
            <Link to="/options">Options</Link>
          </Menu.Item> */}
          <Menu.Item icon={<FileDoneOutlined />}>
            <Link to="/insiders">Insiders</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
