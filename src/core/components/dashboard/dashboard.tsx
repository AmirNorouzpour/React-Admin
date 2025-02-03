import React, { useState } from "react";
import { Col, Row } from "antd";
import AxCard from "../card/dashboard-card.tsx";
import DashboardCard from "../card/dashboard-card.tsx";
import LottieMapper from "../../../assets/lottie/lottie-mapper.ts";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div>
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
            icon={LottieMapper.GetFile("enter")}
            title="Online Users"
            numberContent={1}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("audit")}
            title="Audit Count"
            numberContent={8145}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <DashboardCard
            icon={LottieMapper.GetFile("fingerprint")}
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
          <DashboardCard
            icon={LottieMapper.GetFile("enter")}
            title="Online Users"
            numberContent={1}
          ></DashboardCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <DashboardCard
            icon={LottieMapper.GetFile("audit")}
            title="Audit Count"
            numberContent={8145}
          ></DashboardCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
