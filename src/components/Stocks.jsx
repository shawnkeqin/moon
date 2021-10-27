import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetStocksQuery } from "../services/stockApi";
import { counterActions } from "../app/store";
import {
  Col,
  Row,
  Typography,
  Card,
  Input,
  Menu,
  Dropdown,
  Button,
  Avatar,
} from "antd";
import { useSelector } from "react-redux";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";
import Loader from "./Loader";
import icon from "../images/wsb.png";
const { Search } = Input;
const { Title } = Typography;

const cardsStyle = {
  marginTop: "15px",
};

const Stocks = () => {
  const [wsbStocks, setWsbStocks] = useState(undefined);
  const [sentiment, setSentiment] = useState("");
  const hasUserPaid = useSelector((state) => state.payment.success);
  // const [bullOrBear, setBullOrBear] = useState("");
  const { data: stocksData, isFetching } = useGetStocksQuery();
  console.log(stocksData);
  const onSearch = (value) => {
    setSentiment(value);
  };

  // const menu = (
  //   <Menu>
  //     <Menu.Item onClick={setBullOrBear("Bullish")}>Bullish</Menu.Item>
  //     <Menu.Item onClick={setBullOrBear("Bearish")}>Bearish</Menu.Item>
  //   </Menu>
  // );

  useEffect(() => {
    setWsbStocks([]);
    const filterMinSentiment = stocksData?.filter(
      (stockData) => stockData.sentiment_score >= sentiment
    );

    // const filterBullishOrBearish = stocksData?.filter(
    //   (stockData) => stockData.sentiment === bullOrBear
    // );

    // setWsbStocks(filterBullishOrBearish);
    setWsbStocks(filterMinSentiment);
  }, [stocksData, sentiment]);

  if (isFetching) return <Loader />;
  // if (isFetching) return <Loader />;

  // if (isFetching) return <Loader />;
  // const incrementHandler = () => {
  //   dispatch(counterActions.increment());
  // };

  // const increaseHandler = () => {
  //   dispatch(counterActions.increase(10));
  // };

  // const decrementHandler = () => {
  //   dispatch(counterActions.decrement());
  // };

  // const toggleCounterHandler = () => {
  //   dispatch(counterActions.toggleCounter());
  // };
  return (
    <>
    {hasUserPaid ? <div><Title>
        <Avatar src={icon} size="large" />
        Trending r/wallstreetbets Stocks
      </Title>
      <div className="grid-container">
        <Search
          placeholder="Search Sentiment Score"
          allowClear
          enterButton="Search"
          size="medium"
          onSearch={onSearch}
        />
      </div>
      {/* <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>Filter Sentiment</Button>
      </Dropdown> */}
      <div style={cardsStyle}>
        <Row gutter={[32, 32]} className="crypto-card-container">
          {wsbStocks?.map((stockData) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={stockData.ticker}
            >
              <Card
                title={`${stockData.ticker}`}
                extra={
                  <Typography>
                    Sentiment: {stockData.sentiment}
                    {stockData.sentiment === "Bullish" ? (
                      <RiseOutlined />
                    ) : (
                      <FallOutlined />
                    )}
                  </Typography>
                }
              >
                <p>Sentiment Score: {stockData.sentiment_score}</p>
                <p>No. of comments: {stockData.no_of_comments}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {/* {show && <div>{counter}</div>}
      <div>
        <Button onClick={incrementHandler}>Increment</Button>
        <Button onClick={increaseHandler}>Increase by 10</Button>
        <Button onClick={decrementHandler}>Decrement</Button>
      </div>
      <Button onClick={toggleCounterHandler}>Toggle Counter</Button> */}</div> : <>
      <Title>Purchase Premium Subscription to gain access</Title>
      </>}
      
    </>
  );
};

export default Stocks;
