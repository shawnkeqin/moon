import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Typography } from "antd";
const { Title } = Typography;
const Options = () => {
  const [option, setOptions] = useState(undefined);
  var options = {
    method: "GET",
    url: "https://mboum-finance.p.rapidapi.com/op/option",
    params: { expiration: "1705622400", symbol: "AAPL" },
    headers: {
      "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
      "x-rapidapi-key": "20730420dbmsh28abee5c5b29b4bp1445a8jsn4dd93beb48c1",
    },
  };
  useEffect(() => {
    axios
      .request(options)
      .then(function(response) {
        setOptions(response.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

  const dataSource = option?.optionChain?.result[0]?.options[0]?.puts;

  const columns = [
    {
      title: "Contract Symbol",
      dataIndex: "contractSymbol",
      key: "contractSymbol",
    },
    {
      title: "Strike",
      dataIndex: "strike",
      key: "strike",
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
    },
    {
      title: "Ask",
      dataIndex: "ask",
      key: "ask",
    },
  ];

  return (
    <>
      <Title>Options</Title>
      <Table dataSource={dataSource} columns={columns} />;
    </>
  );
};

export default Options;
