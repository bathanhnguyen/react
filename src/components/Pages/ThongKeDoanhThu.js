import React, { useState, useEffect } from "react";
import "./css/style.css";
import LeftBar from "../Menu/LeftBar";
import HeaderAdmin from "../Header/HeaderAdmin";

import Chart from '../ThongKe/Ngay';

const ThongKeDoanhThu = () => {

  return (
    <div className="container-fluid">

      <HeaderAdmin />
      <div className=" row" >
        <div className="col-4">
          <LeftBar />
        </div>
        <div className="col-8" style={{ marginTop: "100px" }}>
          <div className="container-fluid">
            <div className="row">

              <Chart />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default ThongKeDoanhThu;
