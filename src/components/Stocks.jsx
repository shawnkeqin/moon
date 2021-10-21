import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../app/store";
import { Col, Row, Typography, Select, Card, Input } from "antd";
import { useGetStocksQuery } from "../services/stockApi";
import Loader from "./Loader";
import axios from "axios";
const { Title, Text } = Typography;
const { Option } = Select;

const cardsStyle = {
  marginTop: "15px",
};

const Stocks = () => {
  const [date, setDate] = useState("today");
  const [wsbStocks, setWsbStocks] = useState(undefined);
  const [mentions, setNumMentions] = useState(0);
  const [votes, setNumVotes] = useState(0);
  // const { data, isFetching } = useGetStocksQuery(date);
  // const counter = useSelector((state) => state.counter.counter);
  // const show = useSelector((state) => state.counter.showCounter);
  var options = {
    method: "GET",
    url: "https://wallstreetbets.p.rapidapi.com/",
    params: { date: date },
    headers: {
      "x-rapidapi-host": "wallstreetbets.p.rapidapi.com",
      "x-rapidapi-key": "20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setWsbStocks(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    const filterMinMentions = wsbStocks?.wsb_stocks?.filter(
      (stockData) => stockData.mentions >= mentions
    );

    const filterMinVotes = wsbStocks?.wsb_stocks?.filter(
      (stockData) => stockData.votes >= votes
    );

    setWsbStocks(filterMinMentions);
    setWsbStocks(filterMinVotes);
  }, [date, mentions, votes]);
  // if (isFetching) return <Loader />;
  const dates = [
    "today",
    "yesterday",
    "this_week",
    "last_week",
    "this_month",
    "last_month",
  ];

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
      <Title>Trending r/wallstreetbets Stocks</Title>
      <div className="grid-container">
        <div>
          <Select
            defaultValue={date}
            className="select-timeperiod"
            placeholder="Select Time Period"
            onChange={(value) => setDate(value)}
          >
            {dates.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </div>
        <div className="filter-min">
          <Input
            placeholder="Filter Min Mentions"
            onChange={(e) => setNumMentions(e.target.value)}
          />
        </div>
        <div className="filter-min">
          <Input
            placeholder="Filter Min Votes"
            onChange={(e) => setNumVotes(e.target.value)}
          />
        </div>
      </div>
      <div style={cardsStyle}>
        <Row gutter={[32, 32]} className="crypto-card-container">
          {wsbStocks?.wsb_stocks?.map((stockData) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={stockData.stock_detail.id}
            >
              <Card
                title={`${stockData.ticker}`}
                extra={
                  <Typography>
                    Price: ${stockData.stock_detail.price}
                  </Typography>
                }
              >
                <p>No. of mentions: {stockData.mentions}</p>
                <p>No. of Comments: {stockData.comments}</p>
                <p>No. of Votes: {stockData.votes}</p>
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
      <Button onClick={toggleCounterHandler}>Toggle Counter</Button> */}
    </>
  );
};

export default Stocks;
