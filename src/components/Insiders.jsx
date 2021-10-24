import React, { useState, useEffect } from "react";
import { useGetInsidersQuery } from "../services/insiderApi";
import { Table, Typography, Input } from "antd";
import Loader from "./Loader";
const { Title } = Typography;
const { Search } = Input;
const Insiders = () => {
  const [insiders, setInsider] = useState([]);
  const [insiderTrxs, setInsiderTrxs] = useState([]);
  const [titles, setTitle] = useState([]);
  const [region, setRegion] = useState("US");
  const [ticker, setTicker] = useState("AAPL");
  const { data, isFetching } = useGetInsidersQuery(ticker, region);

  const columns = [
    {
      title: "Filer Name",
      dataIndex: "filerName",
      key: "filerName",
    },
    {
      title: "Filer Relation",
      dataIndex: "filerRelation",
      key: "filerRelation",
    },
    {
      title: "Transaction Text",
      dataIndex: "trxText",
      key: "trxText",
    },
    {
      title: "Transaction Shares",
      dataIndex: "trxShares",
      key: "trxShares",
    },
  ];

  useEffect(() => {
    data?.insiderHolders.holders.map((val) => {
      setInsider((oldArray) => [...oldArray, val.name]);
      setTitle((oldArray) => [...oldArray, val.relation]);
    });

    setInsiderTrxs([]);
    data?.insiderTransactions.transactions.map((trx) => {
      let obj = {};
      obj["filerName"] = trx.filerName;
      obj["filerRelation"] = trx.filerRelation;
      obj["trxText"] = trx.transactionText;
      obj["trxShares"] = trx.shares.raw;

      setInsiderTrxs((oldArray) => [...oldArray, obj]);
    });
  }, [data, ticker]);
  if (isFetching) return <Loader />;

  const onSearch = (value) => {
    setTicker(value);
  };

  return (
    <>
      <Title>Insider Transactions</Title>
      <Search
        placeholder="Search Stock"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <Typography>Stock: {ticker}</Typography>
      <Table dataSource={insiderTrxs} columns={columns} />;
    </>
  );
};

export default Insiders;
