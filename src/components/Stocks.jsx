import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../app/store";
import { Col, Row, Typography, Select, Card, Input } from "antd";
import Loader from "./Loader";

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const cardsStyle = {
  marginTop: "15px",
};


const Stocks = () => {

  const [wsbStocks, setWsbStocks] = useState([]);
  const [sentiment, setSentiment] = useState(undefined);


  

  const onSearch = (value) => {
    setSentiment(value);
  };

 
  // const counter = useSelector((state) => state.counter.counter);
  // const show = useSelector((state) => state.counter.showCounter);

  useEffect(() => {

    async function fetchData() {
      try {
        const stocksData = await axios.get("https://dashboard.nbshare.io/api/v1/apps/reddit");
        setWsbStocks(stocksData);
      } catch (error) {
        console.log(error);
      }
    }

   
    fetchData();
    const filterMinSentiment = wsbStocks?.data?.filter(
      (stockData) => stockData.sentiment_score >= sentiment
    );
   
    console.log(filterMinSentiment);
  
    setWsbStocks(filterMinSentiment);
  

  
    // setWsbStocks(filterMinVotes);
  }, [sentiment]);
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
      <Title>Trending r/wallstreetbets Stocks</Title>
      <div className="grid-container">

        <Search
        placeholder="Search Sentiment Score"
        allowClear
        enterButton="Search"
        size="medium"
        onSearch={onSearch}
      />
 
      </div>
      <div style={cardsStyle}>
        <Row gutter={[32, 32]} className="crypto-card-container">
          {wsbStocks?.data?.map((stockData) => (
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
      <Button onClick={toggleCounterHandler}>Toggle Counter</Button> */}
    </>
  );
};

export default Stocks;
