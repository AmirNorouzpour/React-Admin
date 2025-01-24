import React, { useState } from "react";
import { Col, Row } from "antd";
import AxCard from "../card/card.tsx";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 12 }}>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 12 }}>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={6}>
          <AxCard></AxCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
