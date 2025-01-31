import React, { createContext, useContext, useState, useEffect } from "react";
import { getRequest } from "../core/services/apiService.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface System {
  key: string;
  name: string;
}

interface SystemContextType {
  selectedSystem: System | null;
  setSelectedSystem: (system: System) => void;
  systems: System[];
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
  const [systems, setSystems] = useState<System[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await getRequest<System[]>("/api/systems");
        setSystems(response.data);

        // ✅ خواندن `systemKey` از `URL`
        const pathParts = location.pathname.split("/");
        const systemKeyFromURL = pathParts.length > 2 ? pathParts[2] : null;

        // ✅ بررسی کنیم که این `systemKey` در لیست سیستم‌ها وجود دارد یا نه؟
        const systemFromURL = response.data.find(
          (sys) => sys.key === systemKeyFromURL
        );

        if (systemFromURL) {
          setSelectedSystem(systemFromURL);
        } else if (response.data.length > 0 && !selectedSystem) {
          // ✅ اگر `URL` سیستمی نداشت، اولین سیستم را انتخاب کنیم و `URL` را تغییر دهیم
          setSelectedSystem(response.data[0]);
          navigate(`/system/${response.data[0].key}`);
        }
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    };

    fetchSystems();
  }, []);

  // ✅ وقتی `selectedSystem` تغییر کرد، `URL` را تغییر دهیم
  useEffect(() => {
    if (selectedSystem) {
      navigate(`/system/${selectedSystem.key}`);
    }
  }, [selectedSystem]);

  return (
    <SystemContext.Provider
      value={{ selectedSystem, setSelectedSystem, systems }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystemContext = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystemContext must be used within a SystemProvider");
  }
  return context;
};
