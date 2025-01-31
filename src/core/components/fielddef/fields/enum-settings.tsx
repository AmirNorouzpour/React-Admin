import React, { useState } from "react";
import { Form, Row, Col, Input, Button, ColorPicker, Select } from "antd";
import "./fields.css";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const EnumSettings: React.FC = () => {
  const [items, setItems] = useState([
    // { id: 1, name: "Red", color: "#f33232" },
    // { id: 2, name: "Green", color: "#777777" },
    // { id: 3, name: "Blue", color: "#ffff" },
  ]);

  const handleNameChange = (id, newName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleColorChange = (id, newColor) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, color: newColor.toHexString() } : item
      )
    );
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      color:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col xs={24} md={20}>
          <Form.Item label="Type" name="type">
            <Select
              placeholder="Please choose the type"
              // onChange={(value) => setDataType(value)}
              options={[
                { label: <span>One Select</span>, value: "1" },
                { label: <span>Multiple Select</span>, value: "2" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item label="Add Item" name="type">
            <Button
              type="primary"
              variant="filled"
              onClick={() => handleAddItem()}
              icon={<PlusOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24}>
          <div className="container">
            {items.map((item) => (
              <div key={item.id} className="list-item">
                <Input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleNameChange(item.id, e.target.value)}
                  className="name-input"
                />
                <ColorPicker
                  defaultValue="#1677ff"
                  size="small"
                  showText
                  format="hex"
                  onChangeComplete={(e) => handleColorChange(item.id, e)}
                  value={item.color}
                />

                <Button
                  type="primary"
                  shape="circle"
                  color="danger"
                  variant="filled"
                  onClick={() => handleRemoveItem(item.id)}
                  icon={<DeleteOutlined />}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default EnumSettings;
