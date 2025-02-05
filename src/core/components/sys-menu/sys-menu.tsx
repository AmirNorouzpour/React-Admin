import React, { useEffect, useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { getRequest } from "../../services/apiService.ts";
import { useSystemContext } from "../../../context/SystemContext.tsx";
import "./sys-menu.css";

interface SystemProps {
  setSystemMenu;
}

const SystemMenu: React.FC<SystemProps> = ({ setSystemMenu }) => {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedSystem } = useSystemContext();

  const fetchSystems = async () => {
    try {
      setLoading(true);
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
        <div
          title={system.name}
          key={system.key}
          className="system-item"
          onClick={() => {
            setSelectedSystem(system);
            setSystemMenu(false);
          }} // ذخیره سیستم در Context
        >
          <AppstoreOutlined />
          <span style={{ fontSize: "9px" }}>{system.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SystemMenu;
