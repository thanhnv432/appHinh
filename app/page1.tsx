
"use client";

import React, { useState } from "react";
import { ConfigProvider, Layout, theme as antdTheme, Switch } from "antd";
import { Content } from "antd/es/layout/layout";
import { BulbFilled, CloudFilled } from "@ant-design/icons";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = (checked:any) => {
    setIsDarkMode(prevValue => !prevValue);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
          <Switch
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<CloudFilled />}
            onChange={handleClick}
          />
        <Content>{children}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export default PublicLayout;