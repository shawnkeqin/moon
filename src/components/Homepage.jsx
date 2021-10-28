import React, { useState, useEffect } from "react";
import {
  Typography,
  Statistic,
  Row,
  Col,
  Card,
  Tag,
  Divider,
  List,
  Input,
  Table,
} from "antd";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useGetFearAndGreedQuery } from "../services/fearAndGreedApi";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  GlobalOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Loader from "./Loader";
const token = "c5q7oa2ad3iaqkueije0";
const { Search } = Input;
const { Title, Text } = Typography;

const divStyle = {
  marginTop: "40px",
};

const Homepage = () => {
  // const { data, isFetching } = useGetCryptosQuery(10);
  const { data: fgIndex, isFetching } = useGetFearAndGreedQuery();
  const [peers, setPeers] = useState(undefined);
  const [stock, setStock] = useState("AAPL");
  const [earningsStock, setEarningsStock] = useState("AAPL");
  const [earnings, setEarnings] = useState(undefined);
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Actual",
      dataIndex: "actual",
      key: "actual",
    },
    {
      title: "Estimate",
      dataIndex: "estimate",
      key: "estimate",
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Surprise",
      dataIndex: "surprise",
      key: "surprise",
    },
    {
      title: "Surprise Percent",
      dataIndex: "surprisePercent",
      key: "surprisePercent",
    },
  ];

  const onSearch = (value) => {
    setStock(value);
  };
  const onSearchEarnings = (value) => {
    setEarningsStock(value);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const peersData = await axios.get(
          `https://finnhub.io/api/v1/stock/peers?symbol=${stock}&token=${token}`
        );
        setPeers(peersData.data);
        const earningsData = await axios.get(
          `https://finnhub.io/api/v1/stock/earnings?symbol=${earningsStock}&token=${token}`
        );
        setEarnings(earningsData.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [stock, earningsStock]);
  const labels = [
    "One Year Ago",
    "One Month Ago",
    "One Week Ago",
    "Previous Close",
    "Now",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Market Fear and Greed Index",
        data: [
          fgIndex?.fgi.oneYearAgo.value,
          fgIndex?.fgi.oneMonthAgo.value,
          fgIndex?.fgi.oneWeekAgo.value,
          fgIndex?.fgi.previousClose.value,
          fgIndex?.fgi.now.value,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: true,
  };

  if (isFetching) return <Loader />;

  return (
    <>
      <div id="inner">
        <Title>
          <GlobalOutlined /> Market Fear and Greed Index
        </Title>
        <Typography>
          The fear and greed index is a tool used by some investors to gauge the
          market. It is based on the premise that excessive fear can result in
          stocks trading well below their intrinsic values while, at the same
          time, unbridled greed can result in stocks being bid up far above what
          they should be worth.
        </Typography>
      </div>
      <Line data={data} options={options} />
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Now"
                value={fgIndex?.fgi.now.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.previousClose.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.previousClose.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.previousClose.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.now.valueText}
              </Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Previous Close"
                value={fgIndex?.fgi.previousClose.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.previousClose.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.previousClose.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.previousClose.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.previousClose.valueText}
              </Title>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="One Week Ago"
                value={fgIndex?.fgi.oneWeekAgo.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.oneWeekAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.oneWeekAgo.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.oneWeekAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.oneWeekAgo.valueText}
              </Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="One Month Ago"
                value={fgIndex?.fgi.oneMonthAgo.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.oneMonthAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.oneMonthAgo.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.oneMonthAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.oneMonthAgo.valueText}
              </Title>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="One Week Ago"
                value={fgIndex?.fgi.oneWeekAgo.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.oneWeekAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.oneWeekAgo.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.oneWeekAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.oneWeekAgo.valueText}
              </Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="One Year Ago"
                value={fgIndex?.fgi.oneYearAgo.value}
                precision={2}
                valueStyle={
                  fgIndex?.fgi.oneYearAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
                prefix={
                  fgIndex?.fgi.oneYearAgo.value > 50 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )
                }
              />
              <Title
                style={
                  fgIndex?.fgi.oneYearAgo.value > 50
                    ? { color: "#3f8600" }
                    : { color: "#cf1322" }
                }
              >
                {fgIndex?.fgi.oneYearAgo.valueText}
              </Title>
            </Card>
          </Col>
        </Row>
        <div style={divStyle}>
          <Title>
            <TeamOutlined /> Search Industry Peers of Stock
          </Title>
          <div id="inner">
            <div style={{ marginLeft: "300px" }}>
              <Tag color="cyan">{stock}</Tag>
            </div>
            <br />
            <Typography>
              Peer groups refer to companies that are in the same industry or
              sector. These are competitors that are roughly the same size. Peer
              groups can be found in analyst research reports or an individual
              company's financial statements.
            </Typography>
          </div>
          <br />
          <Search
            placeholder="Search Stock"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Divider orientation="left">Industry Peers of Stock</Divider>
          <List
            size="large"
            bordered
            dataSource={peers}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
        <div style={divStyle}>
          <Title>
            <ThunderboltOutlined /> Earnings Surprises for Stock
          </Title>
          <div id="inner">
            <div style={{ marginLeft: "300px" }}>
              <Tag color="cyan">{earningsStock}</Tag>
            </div>
            <br />
            <Typography>
              An earning surprise occurs when a company reports figures that are
              drastically different from Wall Street estimates. A positive
              surprise will often lead to a sharp increase in the company's
              stock price, while a negative surprise to a rapid decline.
            </Typography>
          </div>
          <br />
          <Search
            placeholder="Search Stock"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearchEarnings}
          />
          <br />
          <br />
          <Table columns={columns} dataSource={earnings} />
        </div>
      </div>
      ,
      {/* <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified /> */}
    </>
  );
};

export default Homepage;
