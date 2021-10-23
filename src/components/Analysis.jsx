import React, { useState, useEffect } from "react";
import { useGetInsidersQuery } from "../services/insiderApi";
import { Table, Typography, Input } from "antd";
import Loader from "./Loader";
const { Title, Text } = Typography;
const Analysis = () => {
  const [insiders, setInsider] = useState([]);
  const [insiderTrxs, setInsiderTrxs] = useState([]);
  const [titles, setTitle] = useState([]);
  const [region, setRegion] = useState("US");
  const [searchTerm, setSearchTerm] = useState("AAPL");
  const [ticker, setTicker] = useState("");
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

    data?.insiderTransactions.transactions.map((trx) => {
      let obj = {};
      obj["filerName"] = trx.filerName;
      obj["filerRelation"] = trx.filerRelation;
      obj["trxText"] = trx.transactionText;
      obj["trxShares"] = trx.shares.raw;

      setInsiderTrxs((oldArray) => [...oldArray, obj]);
    });
    setTicker(searchTerm);
  }, [data, searchTerm, ticker]);
  if (isFetching) return <Loader />;

  return (
    <>
      <div className="search-crypto">
        <Input
          placeholder="Search Stock Ticker"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Title>Insider Transactions</Title>
      <Table dataSource={insiderTrxs} columns={columns} />;
    </>
  );
};

export default Analysis;
