import React, { useEffect, useState } from "react";
import "./sys-menu.css";
import { AppstoreOutlined } from "@ant-design/icons";
import { getRequest } from "../../services/apiService.ts";

interface System {
  key: string;
  name: string;
  icon: string;
}

const SystemMenu: React.FC = () => {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSystems = async () => {
    try {
      setLoading(true);
      debugger;
      const data = await getRequest<System[]>("/api/systems");
      setSystems(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  if (loading) return <div>Loading systems...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="system-grid">
      {systems.map((system) => (
        <div title={system.name} key={system.key} className="system-item">
          <AppstoreOutlined />
          <span style={{ fontSize: "9px" }}>{system.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SystemMenu;
