import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Input, Timeline, List, Card, Avatar } from "antd";
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
  const { data: sentiment, isFetching } = useGetSentimentQuery(stock);
  const onSearch = (value) => {
    setStock(value);
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
  }, []);

  if (isFetching) return <Loader />;

  return (
    <>
      <div>
        <Search
          placeholder="Search Stock"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        <div style={timeLineStyle}>
          <Title>Social Media Sentiment for: {stock} </Title>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={sentiment}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.date}>
                  <p>Sentiment Score: {item.score}</p>
                  <p>Positive Score: {item.positive_score}</p>
                  <p>Negative Score: {item.negative_score}</p>
                  <p>Average 7 Days: {item.avg_7_days}</p>
                  <p>Activity: {item.activity}</p>
                </Card>
              </List.Item>
            )}
          />
        </div>
        <Title>
          <Avatar src={reddit} size="large" /> Reddit Sentiment for:{stock}
        </Title>
        {
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={socialSentiment?.data?.reddit}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.atTime}>
                  <p>Sentiment Score: {item.score}</p>
                  <p>Positive Mention: {item.positiveMention}</p>
                  <p>Negative Mention: {item.negativeMention}</p>
                  <p>Positive Score: {item.positiveScore}</p>
                  <p>Negative Score: {item.negativeScore}</p>
                  <p>Average 7 Days: {item.avg_7_days}</p>
                  <p>Mentions: {item.mention}</p>
                </Card>
              </List.Item>
            )}
          />
        }
        <Title>
          <Avatar src={twitter} size="large" /> Twitter Sentiment for: {stock}
        </Title>
        {
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={socialSentiment?.data?.twitter}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.atTime}>
                  <p>Sentiment Score: {item.score}</p>
                  <p>Positive Mention: {item.positiveMention}</p>
                  <p>Negative Mention: {item.negativeMention}</p>
                  <p>Positive Score: {item.positiveScore}</p>
                  <p>Negative Score: {item.negativeScore}</p>
                  <p>Average 7 Days: {item.avg_7_days}</p>
                  <p>Mentions: {item.mention}</p>
                </Card>
              </List.Item>
            )}
          />
        }
      </div>
    </>
  );
};

export default Sentiment;
