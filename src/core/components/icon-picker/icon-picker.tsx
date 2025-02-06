import React, { useState, useEffect } from "react";
import * as Icons from "@ant-design/icons/lib/icons";
import { Input, Spin, Button } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./icon-picker.css"; // ✅ استایل‌های مربوطه

library.add(fas);

const BATCH_SIZE = 50;

const IconPicker: React.FC<{ OnSelect }> = ({ OnSelect }) => {
  const [visibleIcons, setVisibleIcons] = useState<any[]>([]);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ استخراج آیکون‌های `Ant Design`
  const antIcons = Object.keys(Icons)
    .filter((icon) => typeof (Icons as any)[icon] === "function")
    .map((icon) => ({
      name: icon,
      type: "ant",
      component: (Icons as any)[icon],
    }));

  // ✅ استخراج آیکون‌های `FontAwesome`
  const faIcons = Object.keys(library.definitions.fas).map((icon) => ({
    name: `fa-${icon}`,
    type: "fa",
    component: () => <FontAwesomeIcon icon={["fas", icon]} />,
  }));

  const allIcons = [...antIcons, ...faIcons];

  // ✅ لود اولیه آیکون‌ها
  useEffect(() => {
    setVisibleIcons(allIcons.slice(0, BATCH_SIZE));
  }, []);

  const onSelect = (item) => {
    OnSelect(item.name);
  };

  const filteredIcons =
    search.length >= 3
      ? allIcons.filter((icon) =>
          icon.name.toLowerCase().includes(search.toLowerCase())
        )
      : visibleIcons;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <Input
        placeholder="Search in Icons... (min 3 chars)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />

      <div className="main">
        {filteredIcons.map((item, index) => (
          <div key={index} className="icon-body">
            <div
              className="icon"
              title={item.name}
              onClick={() => onSelect(item)}
            >
              {item.type === "ant" ? (
                React.createElement(item.component)
              ) : (
                <FontAwesomeIcon icon={["fas", item.name.replace("fa-", "")]} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconPicker;
