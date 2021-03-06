import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Typography, Input, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Search } = Input;
const { Title } = Typography;
const token = "c5q7oa2ad3iaqkueije0";
const RecommendationTrends = () => {
  const [stock, setStock] = useState("TSLA");
  const [recommendations, setRecommendation] = useState(undefined);
  const hasUserPaid = useSelector((state) => state.payment.success);
  const labels = ["Buy", "Hold", "Sell", "Strong Buy", "Strong Sell"];
  const onSearch = (value) => {
    setStock(value);
  };

  let arr = [0, 0, 0, 0, 0];
  recommendations?.data.map((val) => {
    arr[0] += val.buy;
    arr[1] += val.hold;
    arr[2] += val.sell;
    arr[3] += val.strongBuy;
    arr[4] += val.strongSell;
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Recommendation Trend",
        data: arr,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const recommendationTrends = await axios.get(
          `https://finnhub.io/api/v1/stock/recommendation?symbol=${stock}&token=${token}`
        );
        setRecommendation(recommendationTrends);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    console.log(recommendations?.data);
  }, [stock]);

  return (
    <>
 
        <div>
          <Title>
            <EyeOutlined /> Recommendation Trends for: <div style={{marginBottom: '4px'}}><Tag color="cyan">{stock}</Tag></div>
          </Title>
          <div id="inner">
    <Typography>
  Get Professional recommendation trends for a particular company collated and compile from various sources and displayed as one.
        </Typography>
        <br />
        </div>
          <Search
            placeholder="Search Stock Ticker"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <div>
            <Bar
              data={data}
              width={50}
              height={10}
              options={{ maintainAspectRatio: true }}
            />
          </div>
        </div>
      
            {/* {hasUserPaid ? (
        <div>
          <Title>
            <EyeOutlined /> Recommendation Trends for: {stock}
          </Title>
          <Typography>
            Get latest analyst recommendation trends for a company.
          </Typography>
          <Search
            placeholder="Search Stock"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <div>
            <Bar
              data={data}
              width={50}
              height={10}
              options={{ maintainAspectRatio: true }}
            />
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

export default RecommendationTrends;
