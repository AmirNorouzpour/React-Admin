import React, { useState } from "react";
import { Card } from "antd";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CountUp from "react-countup";

interface DashboardCardModel {
  title: string;
  content: string;
}

interface DashboardCardProps {
  title: string;
  content?: string;
  numberContent: number;
  icon;
  onFetchData?: (params: {
    reportId: string;
  }) => Promise<{ data: DashboardCardModel }>;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  content,
  numberContent,
  icon,
  onFetchData = null,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const fetchData = async () => {
    const params: any = {};

    const response = await onFetchData(params);
  };

  return (
    <Card
      loading={loading}
      style={{ minWidth: 100, margin: 10, background: "#fafafa" }}
    >
      <Card.Meta
        avatar={
          <DotLottieReact
            src={icon}
            loop
            autoplay
            style={{ width: 64, height: 64 }}
          />
        }
        description={
          <div>
            <div
              style={{ color: "#000", fontFamily: "tahoma", fontSize: "14px" }}
            >
              {title}{" "}
            </div>
            <div
              style={{ color: "#000", fontFamily: "cursive", fontSize: "24px" }}
            >
              {content ?? (
                <CountUp
                  decimalPlaces={true}
                  duration={
                    numberContent < 50 ? 2 : numberContent > 500 ? 6 : 3
                  }
                  end={numberContent}
                />
              )}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default DashboardCard;
