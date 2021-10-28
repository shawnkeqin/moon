import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Radar, PolarArea } from "react-chartjs-2";
import { Typography, Input, Avatar, Tag } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";
import { useGetSentimentQuery } from "../services/sentimentApi";
import twitter from "../images/twitter.png";
import reddit from "../images/reddit.png";
import Loader from "./Loader";

const token = "c5q7oa2ad3iaqkueije0";
const timeLineStyle = {
  marginTop: "15px",
};
const Sentiment = () => {
  const { Search } = Input;
  const { Title } = Typography;
  const [socialSentiment, setSocialSentiment] = useState(undefined);
  const [stock, setStock] = useState("TSLA");
  const hasUserPaid = useSelector((state) => state.payment.success);
  const { data: sentiment, isFetching } = useGetSentimentQuery(stock);
  const onSearch = (value) => {
    setStock(value);
  };

  let arr = [0, 0, 0, 0, 0, 0, 0];
  let arr2 = [0, 0, 0, 0, 0, 0, 0];
  let arr3 = [0, 0, 0, 0, 0];
  socialSentiment?.data?.reddit.map((val) => {
    arr[0] += val.score;
    arr[1] += val.positiveMention;
    arr[2] += val.negativeMention;
    arr[3] += val.positiveScore;
    arr[4] += val.negativeScore;
    arr[5] += val.avg_7_days;
    arr[6] += val.mention;
  });

  socialSentiment?.data?.twitter.map((val) => {
    arr2[0] += val.score;
    arr2[1] += val.positiveMention;
    arr2[2] += val.negativeMention;
    arr2[3] += val.positiveScore;
    arr2[4] += val.negativeScore;
    arr2[5] += val.avg_7_days;
    arr2[6] += val.mention;
  });

  sentiment?.map((val) => {
    arr3[0] += val.score;
    arr3[1] += val.positive_score;
    arr3[2] += val.negative_score;
    arr3[3] += val.avg_7_days;
    arr3[4] += val.activity;
  });

  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  };

  const dataTwo = {
    labels: [
      "Sentiment Score",
      "Positive Score",
      "Negative Score",
      "Average 7 Days",
      "Activity",
    ],
    datasets: [
      {
        label: "Social Media Sentiment",
        data: arr3,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const dataOne = {
    labels: [
      "Sentiment Score",
      "Positive Mention",
      "Negative Mention",
      "Positive Score",
      "Negative Score ",
      "Average 7 Days",
      "Mentions",
    ],
    datasets: [
      {
        label: "Reddit Sentiment",
        data: arr,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Twitter Sentiment",
        data: arr2,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const socialSentiment = await axios.get(
          `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${stock}&token=${token}`
        );
        setSocialSentiment(socialSentiment);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    console.log(socialSentiment?.data?.reddit);
  }, [stock]);

  if (isFetching) return <Loader />;

  return (
    <>
       
        <div>
          <Title>
            <RadarChartOutlined /> Social Media Sentiment for: <div style={{marginBottom: '4px'}}><Tag color="cyan">{stock}</Tag></div>
          </Title>
          <div id="inner">
    <Typography>
    Stock sentiment analysis can be used to determine investors’ opinions of a specific stock or asset. Sentiment may at times hint at future price action. This is also an example of how trading psychology can affect a market, assisting as a forecasting tool to determine possible future price changes in a particular asset.
        </Typography>
        <br />
        </div>
          <div>
            <Search
              placeholder="Search Stock Ticker"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
            <div style={timeLineStyle}>
              <PolarArea data={dataTwo} />
            </div>
            <Title>
              <Avatar src={reddit} size="large" /> Reddit Sentiment and
              <Avatar src={twitter} size="large" /> Twitter Sentiment for:{" "}
              {stock}
            </Title>

            <Radar data={dataOne} options={options} />
          </div>
        </div>
      
      {/* {hasUserPaid ? (
        <div>
          <Title>
            <RadarChartOutlined /> Social Media Sentiment for: {stock}{" "}
          </Title>
          <div>
            <Search
              placeholder="Search Stock"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
            <div style={timeLineStyle}>
              <PolarArea data={dataTwo} />
            </div>
            <Title>
              <Avatar src={reddit} size="large" /> Reddit Sentiment and
              <Avatar src={twitter} size="large" /> Twitter Sentiment for:{" "}
              {stock}
            </Title>

            <Radar data={dataOne} options={options} />
          </div>
        </div>
      ) : (
        <>
          <Title>Purchase Premium Subscription to gain Access</Title>
        </>
      )} */}
    </>
  );
};

export default Sentiment;
