import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";
import Loader from "./Loader";
import {
  DollarOutlined,
} from "@ant-design/icons";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Title } = Typography;

const searchBarStyle = {
  marginBottom: "20px",
};
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <>
      <div>
        <Title><DollarOutlined /> Cryptocurrencies</Title>
       
        <div id="inner">
    <Typography>
   Click on a Cryptourrency to view more details. Investing in crypto assets is risky but also potentially extremely profitable. Cryptocurrency is a good investment if you want to gain direct exposure to the demand for digital currency, while a safer but potentially less lucrative alternative is to buy the stocks of companies with exposure to cryptocurrency.
        </Typography>
        </div>
        <br />
      </div>
      {!simplified && (
        <div style={searchBarStyle}>
          <Input
            placeholder="Search Cyptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    hoverable
                  />
                }
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
