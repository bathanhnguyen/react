import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { InfoContext } from "../../contextProvider/ProviderInfo";

const HeaderAdmin = () => {

    const { userData, setAuthUser, setAuth } = useContext(InfoContext);
    const [status, setStatus] = useState("500");
    const navigateLogout = useNavigate();


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
        <div className="brand clearfix">
            <Link to="/admin" style={{ fontSize: 25 }}>
                Trang chủ
            </Link>
            <span className="menu-btn">
                <i className="fa fa-bars" />
            </span>
            <ul className="ts-profile-nav">
                <li className="ts-account">
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
                                    <Dropdown.Divider />
                                    <Dropdown.Item className="dropdown-btn" style={{ textAlign: "center" }}
                                    >
                                        <button
                                            className="btn"
                                            onClick={() => Signout()}
                                        >

                                            Đăng xuất
                                        </button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};
export default HeaderAdmin;
