import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import DashboardCard from "../card/dashboard-card.tsx";
import LottieMapper from "../../../assets/lottie/lottie-mapper.ts";
import { Column, Line } from "@ant-design/charts";

const Dashboard: React.FC = () => {
  // const [open, setOpen] = useState(false);

  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpen(newOpen);
  // };
  const DATA = [
    1, 11, 4, 3, 8, 6, 12, 7, 18, 9, 13, 14, 27, 15, 16, 17, 28, 29, 19, 22,
  ];

  const configCol = {
    data: DATA.map((value) => ({
      index: value.toString(),
      value,
    })),
    xField: "index",
    yField: "value",
    height: 300,
  };
  const data = [
    { year: "2017", value: 3 },
    { year: "2018", value: 4 },
    { year: "2019", value: 3.5 },
    { year: "2020", value: 5 },
    { year: "2021", value: 4.9 },
    { year: "2022", value: 6 },
    { year: "2023", value: 7 },
    { year: "2024", value: 9 },
    { year: "2025", value: 13 },
  ];

  const config = {
    data,
    height: 300,
    xField: "year",
    yField: "value",
  };

  return (
    <div>
      <Row gutter={{ xs: 24 }}>
        <Col className="gutter-row" xs={24}>
          <div style={{ padding: "10px" }}> System Managment Dashboard</div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 12 }}>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("system")}
            title="Systems"
            numberContent={3}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("typedef")}
            title="Typedefs"
            numberContent={31}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("report")}
            title="Reports"
            numberContent={51}
          ></DashboardCard>
        </Col>

        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("users")}
            title="Users"
            numberContent={88}
          ></DashboardCard>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 12 }}>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("user")}
            iconSize={60}
            title="Online Users"
            numberContent={1}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("audit")}
            title="Audit Count"
            iconSize={54}
            numberContent={8145}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("fingerprint")}
            iconSize={54}
            title="Failed login"
            numberContent={75}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("error")}
            title="Errors Count"
            numberContent={11}
          ></DashboardCard>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 12 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Card
            style={{
              minWidth: 100,
              margin: 10,
              maxHeight: "320px",
              borderRadius: 0,
              boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Column {...configCol} />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Card
            style={{
              minWidth: 100,
              margin: 10,
              maxHeight: "320px",
              borderRadius: 0,
              boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Line {...config} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
