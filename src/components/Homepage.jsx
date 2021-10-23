import React from "react";
import millify from "millify";
import { Typography, Statistic, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetFearAndGreedQuery } from "../services/fearAndGreedApi";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Loader from './Loader';
const { Title } = Typography;

const Homepage = () => {
  // const { data, isFetching } = useGetCryptosQuery(10);
  const {data: fgIndex, isFetching }= useGetFearAndGreedQuery();
  // const globalStats = data?.data?.stats;

  if (isFetching) return <Loader/>;

  return (
    <>
    <div id="inner">
    <Title>Market Fear and Greed Index</Title>
    <Typography>The fear and greed index is a tool used by some investors to gauge the market. It is based on the premise that excessive fear can result in stocks trading well below their intrinsic values while, at the same time, unbridled greed can result in stocks being bid up far above what they should be worth.</Typography>
    </div>
      <div className="site-statistic-demo-card">
    <Row gutter={16}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Now"
            value={fgIndex?.fgi.now.value}
            precision={2}
            valueStyle={fgIndex?.fgi.previousClose.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.previousClose.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
  
          />
          <Title style={fgIndex?.fgi.previousClose.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.now.valueText}</Title>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Previous Close"
            value={fgIndex?.fgi.previousClose.value}
            precision={2}
            valueStyle={fgIndex?.fgi.previousClose.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.previousClose.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
     
          />
              <Title style={fgIndex?.fgi.previousClose.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.previousClose.valueText}</Title>
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
            valueStyle={fgIndex?.fgi.oneWeekAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.oneWeekAgo.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
        
          />
          <Title style={fgIndex?.fgi.oneWeekAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.oneWeekAgo.valueText}</Title>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="One Month Ago"
            value={fgIndex?.fgi.oneMonthAgo.value}
            precision={2}
            valueStyle={fgIndex?.fgi.oneMonthAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.oneMonthAgo.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
           
          />
              <Title style={fgIndex?.fgi.oneMonthAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.oneMonthAgo.valueText}</Title>
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
            valueStyle={fgIndex?.fgi.oneWeekAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.oneWeekAgo.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
        
          />
          <Title style={fgIndex?.fgi.oneWeekAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.oneWeekAgo.valueText}</Title>
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="One Year Ago"
            value={fgIndex?.fgi.oneYearAgo.value}
            precision={2}
            valueStyle={fgIndex?.fgi.oneYearAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}
            prefix={fgIndex?.fgi.oneYearAgo.value > 50 ?<ArrowUpOutlined /> : <ArrowDownOutlined />}
           
          />
              <Title style={fgIndex?.fgi.oneYearAgo.value > 50 ? { color: '#3f8600' }: { color: '#cf1322' }}>{fgIndex?.fgi.oneYearAgo.valueText}</Title>
        </Card>
      </Col>
    </Row>
  </div>,
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
