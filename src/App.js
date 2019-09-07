import React from "react";
import { Root, Routes, Head } from "react-static";
import { Router } from "./components/Router";
import "reboot.css";
import "antd/dist/antd.css";
import "./app.css";

//moment仅用于antd日期组件的传参，其他处理日期的地方用date-fns
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

export default () => {
  return (
    <Root>
      <Head>
        <title>网站名称</title>
      </Head>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Router className="container">
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
};
