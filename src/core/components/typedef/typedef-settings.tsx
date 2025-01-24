import { Card, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";

const TypedefSettings: React.FC = () => {
  return (
    <Card
      style={{ minWidth: 100 }}
      size="small"
      type="inner"
      title={"Typedef Settings"}
    >
      <Form
        layout="vertical"
        // form={form}
        style={{ maxWidth: 1400 }}
        // onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="TitleField" name="titleField">
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="TitleField" name="titleField">
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6} lg={4}>
            <Form.Item label="View" name="view">
              <Select
                showSearch
                placeholder="select a view"
                // onSearch={onSearch}
                // options={systemOptions}
                // loading={searchLoading}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TypedefSettings;
