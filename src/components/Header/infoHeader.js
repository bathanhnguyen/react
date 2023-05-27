import React, { useState, useEffect, useContext } from "react";
import logo from "../../images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImMail4 } from "react-icons/im";
import { FiPhone } from "react-icons/fi";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import styled from "styled-components";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { links } from "../utils/listMenu";
import "./index.css";
import Booking from "./usevoice"



const InfoHeader = () => {
  const { userData, setAuthUser, setAuth, searchValue } = useContext(InfoContext);
  const location = useLocation();
  const [status, setStatus] = useState("500");
  const [info, setInfo] = useState("");
  const searchRedirect = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const navigateLogout = useNavigate();
  useEffect(() => {
    if (
      userData.get("userData") !== "" &&
      userData.get("userData") !== undefined
    ) {
      setStatus(userData.get("userData").status);
    } else {
      setStatus("");
    }
  }, [userData, status]);
  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost/car/KLTN/carrentalAPI/conponents/contactusinfo.php',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setInfo(response.data.info)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  const getNameCarSearch = () => {
    searchValue.set(
      "searchValue",
      { search: valueSearch },
      { path: "/" }

    );

    if (location.pathname === "/Carlisting") {
      window.location.reload();
    } else {
      searchRedirect("/Carlisting");
    }
  };

  //sign out
  const Signout = () => {
    //delete cookie when sign out

    userData.set(
      "userData",
      {
        id: "",
        token: "",
        roleId: "",
        email: "",
        status: "500",
      },
      { path: "/" }
    );
    setAuthUser(false);
    setAuth(false);
    setStatus("500");
    navigateLogout("/");
  };


  return (
    <NavDiv>
      <div className="default-header">
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-md-2">
              <div className="logo">
                <Link to="/">
                  <img src={logo} style={{ width: "200px" }} alt="imgLogo"></img>
                </Link>
              </div>
            </div>

            <div className="col-sm-9 col-md-10">
              <div className="header_info">
                <div className="header_widgets">
                  <div className="circle_icon">
                    <ImMail4 />
                  </div>
                  <p className="uppercase_text">Email :</p>
                  <p>{info.EmailId}</p>
                </div>
                <div className="header_widgets">
                  <div className="circle_icon">
                    <FiPhone />
                  </div>
                  <p className="uppercase_text">SỐ ĐIỆN THOẠI: </p>
                  <p> {info.ContactNo}</p>
                </div>

                <div className="social-follow"></div>

                <div className="login_btn">


                  {status === "200" ? (
                    <>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="btn btn-xs uppercase"
                      data-toggle="modal"
                      data-dismiss="modal"
                    >
                      Đăng nhập / Đăng ký
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav id="navigation_bar" className="navbar navbar-default">
        <div className="container">
          <div>
            <Navbar expand="lg" variant="dark" className="navbar-custom" >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {links.map((link, index) => {
                  const { text, url } = link;
                  return (
                    <Nav className="mr-auto" key={index}>
                      <NavItem>
                        <Nav.Link>
                          <Link className="link-to"
                            to={url}
                            onClick={() => {
                              searchValue.set(
                                "searchValue",
                                { search: "", cate: "" },
                                { path: "/" }
                              );
                            }}>
                            {text}
                          </Link>
                        </Nav.Link>
                      </NavItem>

                    </Nav>
                  );
                })}
              </Navbar.Collapse>
            </Navbar>
          </div>

          <div className="header_wrap">



            {status === "200" ? (
              <div className="user_login">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-button-dark-example1"
                      variant="secondary"
                    >
                      <FaUserCircle
                        className="fa fa-user-circle"
                        aria-hidden="true"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu ariant="light">
                      <Dropdown.Item>
                        <Link to="/Profile">
                          <button>Thông tin cá nhân</button>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Link to="/UpdatePass">
                          <button>Cập nhật mật khẩu</button>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/MyBooking">
                          <button>Xe đã thuê</button>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/kygui">
                          <button>Ký gửi xe</button>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/MyCarKyGui">
                          <button>Xe đã ký gửi</button>
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Divider />
                      <Dropdown.Item className="dropdown-btn">
                        <button
                          className="btn"
                          style={{ textAlign: "center" }}
                          onClick={() => Signout()}
                        >
                          Đăng xuất
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="header_search">
              <div id="search_toggle">
                <FaSearch className="fa fa-search" aria-hidden="true" />

              </div>
              <form id="header-search-form" >
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  name="searchdata"
                  className="form-control"
                  required={true}
                  onChange={(e) => {
                    setValueSearch(e.target.value);
                  }}
                />



                <button type="submit" onClick={getNameCarSearch} style={{ marginTop: "-10px" }}>
                  <FaSearch className="fa fa-search" aria-hidden="true" />
                </button>



              </form>
              <Booking />

            </div>
          </div>
        </div>
      </nav>
    </NavDiv>
  );
};


const NavDiv = styled.div`
  font-family: "Helvetica", sans-serif;

  .navbar-custom {
    background-color: #e55b22 none repeat scroll 0 0;
    color: white;
    margin-left: 50px;
  }

  .navbar-custom .navbar-brand {
    color: white;
  }

  .navbar-custom .nav-link {
    margin-left: 50px;
    color: white;
    font-weight: 600;
    font-size: 13px;
  }
  .link-to {
    color: white;
    &:hover {
      color: black;
    }
  }
  
`;
export default InfoHeader;
