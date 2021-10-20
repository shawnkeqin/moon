import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../app/store";
import { Col, Row, Typography, Select, Button } from "antd";
import { useGetStocksQuery } from "../services/stockApi";
import Loader from "./Loader";
const { Title, Text } = Typography;
const { Option } = Select;

const Stocks = () => {
  const dispatch = useDispatch();
  const { data, isFetching } = useGetStocksQuery();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  if (isFetching) return <Loader />;
  const stocksList = data[0]?.symbol;

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
  return (
    <>
      <Title> Stocks Data {stocksList}</Title>
      {show && <div>{counter}</div>}
      <div>
        <Button onClick={incrementHandler}>Increment</Button>
        <Button onClick={increaseHandler}>Increase by 10</Button>
        <Button onClick={decrementHandler}>Decrement</Button>
      </div>
      <Button onClick={toggleCounterHandler}>Toggle Counter</Button>
    </>
  );
};

export default Stocks;
