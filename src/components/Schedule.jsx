import React, { useState, useEffect } from "react";
import { Input, Typography, Table } from "antd";
import axios from "axios";
import { FileDoneOutlined, AlertOutlined } from "@ant-design/icons";
import Loader from "./Loader";
const token = "c5q7oa2ad3iaqkueije0";
const Schedule = () => {
  const { Search } = Input;
  const { Title } = Typography;
  const [events, setEvents] = useState(undefined);
  const [ipo, setIPO] = useState(undefined);
  const [startDate, setStartDate] = useState("2021-10-10");
  const [endDate, setEndDate] = useState("2021-10-30");
  const [startDateIPO, setStartDateIPO] = useState("2021-10-10");
  const [endDateIPO, setEndDateIPO] = useState("2021-10-30");

  const onSearchStartDateEarnings = (value) => {
    setStartDate(value);
  };

  const onSearchEndDateEarnings = (value) => {
    setEndDate(value);
  };

  const onSearchStartDateIPO = (value) => {
    setStartDateIPO(value);
  };

  const onSearchEndDateIPO = (value) => {
    setEndDateIPO(value);
  };
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Revenue Estimate",
      dataIndex: "revenueEstimate",
      key: "revenueEstimate",
    },
    {
      title: "Revenue Actual",
      dataIndex: "revenueActual",
      key: "revenueActual",
    },
    {
      title: "EPS Estimate",
      dataIndex: "epsEstimate",
      key: "epsEstimate",
    },
    {
      title: "EPS Actual",
      dataIndex: "epsActual",
      key: "epsActual",
    },
  ];

  const columnsOne = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Exchange",
      dataIndex: "exchange",
      key: "exchange",
    },
    {
      title: "Number of Shares",
      dataIndex: "numberOfShares",
      key: "numberOfShares",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Shares Value",
      dataIndex: "totalSharesValue",
      key: "totalSharesValue",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const eventCalendar = await axios.get(
          `https://finnhub.io/api/v1/calendar/earnings?from=${startDate}&to=${endDate}&token=${token}`
        );
        setEvents(eventCalendar);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchIPOData() {
      try {
        const IPOCalendar = await axios.get(
          `https://finnhub.io/api/v1/calendar/ipo?from=${startDateIPO}&to=${endDateIPO}&token=${token}`
        );
        setIPO(IPOCalendar);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchIPOData();
    console.log(ipo?.data?.ipoCalendar);
  }, [startDate, endDate, startDateIPO, endDateIPO]);
  if (!ipo) return <Loader />;
  if (!events) return <Loader />;
  return (
    <>
      <Title>
        <FileDoneOutlined /> Earnings Schedule
      </Title>
      <div id="inner">
        <Typography>
          Earnings season is the period when publicly traded companies release
          their most recent quarter???s financial information in a report called
          Form 10-Q. During this time, many companies also host conference calls
          to discuss the results and field questions from analysts on Wall
          Street. The information shared during earnings season can offer
          specific details about a company in addition to trends in various
          industries and the pace of economic growth more broadly. The data
          released is then compared with analyst estimates from before earnings
          season to determine how a company did versus how it was expected to
          do.
        </Typography>
      </div>
      Start Date:
      <Search
        placeholder="Search Start Date (YYYY-MM--DD) - Start Date Must Be Before End Date"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearchStartDateEarnings}
      />
      End Date:
      <Search
        placeholder="Search End Date (YYYY-MM--DD) - End Date Must Be After Start Date"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearchEndDateEarnings}
      />
      <Table dataSource={events?.data?.earningsCalendar} columns={columns} />;
      <Title>
        <AlertOutlined /> IPO Schedule
      </Title>
      <div id="inner">
        <Typography>
          An IPO is an initial public offering. In an IPO, a privately owned
          company lists its shares on a stock exchange, making them available
          for purchase by the general public. Many people think of IPOs as big
          money-making opportunities???high-profile companies grab headlines with
          huge share price gains when they go public.
        </Typography>
      </div>
      Start Date:
      <Search
        placeholder="Search Start Date (YYYY-MM--DD) - Start Date Must Be Before End Date"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearchStartDateIPO}
      />
      End Date:
      <Search
        placeholder="Search End Date (YYYY-MM--DD) - End Date Must Be After Start Date"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearchEndDateIPO}
      />
      <Table dataSource={ipo?.data?.ipoCalendar} columns={columnsOne} />;
    </>
  );
};

export default Schedule;
