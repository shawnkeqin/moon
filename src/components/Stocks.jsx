import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../app/store";
import { Col, Row, Typography, Select, Button } from "antd";
const { Title, Text } = Typography;
const { Option } = Select;

const Stocks = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
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
      <Title> Stocks Data </Title>
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
