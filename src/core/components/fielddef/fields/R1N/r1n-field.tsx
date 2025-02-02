import React, { useEffect, useState } from "react";
import { Form, Row, Col, TreeSelect, Checkbox } from "antd";
import TypeDefTreeSelect from "../../../typedef/lookup/typedef-tree-select.tsx";
import ReportTreeSelect from "../../../report/lookup/report-tree-select.tsx";

const R1NSettings: React.FC = () => {
  const [typedefValue, setTypedefValue] = useState<string | undefined>();
  const [reportValue, setReportValue] = useState<string | undefined>(undefined);
  const [hasReport, setHasReport] = useState(Boolean);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Relation Type" name="relationType">
            <TypeDefTreeSelect
              value={typedefValue}
              onChange={setTypedefValue}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item
            label="Use Report"
            name="hasReport"
            valuePropName="checked"
          >
            <Checkbox
              checked={hasReport}
              onChange={(e) => setHasReport(e.target.checked)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Report" name="reportId">
            <ReportTreeSelect
              value={reportValue}
              onChange={setReportValue}
              isDisabled={!hasReport}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={6}>
          <Form.Item
            label="Include Relationship"
            name="include"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="One to One" name="onetoone" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Allow New" name="allowNew" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            label="Allow Edit"
            name="allowEdit"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default R1NSettings;
