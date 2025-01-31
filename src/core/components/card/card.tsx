import React, { useState } from "react";
import { Avatar, Card } from "antd";

const AxCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Card loading={loading} style={{ minWidth: 100, margin: 10 }}>
      <Card.Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
        }
        title="Card title"
        description={
          <>
            <p>This is the description</p>
            <p>This is the description</p>
          </>
        }
      />
    </Card>
  );
};

export default AxCard;
