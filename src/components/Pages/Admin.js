import React from "react";
import "./css/style.css";
import LeftBar from "../Menu/LeftBar";
import HeaderAdmin from "../Header/HeaderAdmin";
import { Link } from "react-router-dom";
const Admin = () => {
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
              <div className="col-md-12">
                <h2 className="page-title">Bảng điều khiển</h2>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-primary text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ManagerUsers" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý người dùng
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-success text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ManagerVehical" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý xe                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-info text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ManagerVehicalKyGui" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý xe ký gửi
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-warning text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ComfirmBooking" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý đơn hàng                               </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-primary text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ManagerUsersKyGui" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý người ký gửi
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-success text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/ManageContactUs" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Quản lý liên hệ từ khách hàng
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body bk-info text-light">
                            <div className="stat-panel text-center">
                              <div className="stat-panel-number h1 "></div>
                              <Link to="/UpdateContactInfo" style={{ color: "white", height: "100px" }}>
                                <div className="stat-panel-title text-uppercase" style={{ height: "50px" }}>
                                  Cập nhật thông tin web
                                </div>
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Admin;
