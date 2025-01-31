import React, { useState } from "react";
import { Form, Checkbox, Row, Col, InputNumber, Select } from "antd";

const DatetimeSettings: React.FC = () => {
  const [calendar, setDataType] = useState<string>("1");
  const [dateFormat, setDateFormat] = useState<string>("6");
  const [timeFormat, setTimeFormat] = useState<string>("2");
  return (
    <Form
      layout="vertical"
      initialValues={{
        calendar: calendar,
        dateFormat: dateFormat,
        timeFormat: timeFormat,
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Calendar" name="calendar">
            <Select
              placeholder="Please choose the data type"
              onChange={(value) => setDataType(value)}
              options={[
                { label: <span>Gregorian Calendar</span>, value: "1" },
                { label: <span>Persian Calendar</span>, value: "2" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Date Format" name="dateFormat">
            <Select
              placeholder="Please choose the Date Format"
              onChange={(value) => setDateFormat(value)}
              options={[
                { label: <span>Don't Show Date</span>, value: "1" },
                { label: <span>ddmonyy</span>, value: "2" },
                { label: <span>ddmonyyyy</span>, value: "3" },
                { label: <span>mm/dd/yy</span>, value: "4" },
                { label: <span>mm-dd-yyyy</span>, value: "5" },
                { label: <span>yyyy-mm-dd</span>, value: "6" },
                { label: <span>yy-mm-dd</span>, value: "7" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Time Format" name="timeFormat">
            <Select
              placeholder="Please choose the time format"
              onChange={(value) => setTimeFormat(value)}
              options={[
                { label: <span>Don't Show Time</span>, value: "1" },
                { label: <span>23:59</span>, value: "2" },
                { label: <span>11:59 PM</span>, value: "3" },
                { label: <span>23:59:59</span>, value: "4" },
                { label: <span>11:59:59 PM</span>, value: "5" },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DatetimeSettings;
