import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InfoContext } from "../../contextProvider/ProviderInfo";

const SideBar = () => {

  const { userData, setAuthUser, setAuth } = useContext(InfoContext);
  const [status, setStatus] = useState(500);
  // const roleid = userData.get("userData").roleid;
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
    setAuthUser("false");
    setAuth("false");
    setStatus("500");
    navigateLogout("/");
  };

  return (
    <div class="profile_nav">
      <ul>
        <li><Link to="/Profile">Thông tin cá nhân</Link></li>
        <li><Link to="/UpdatePass">Cập nhật mật khẩu</Link></li>
        <li><Link to="/MyBooking">Xe đã thuê</Link></li>
        <li><Link to="/kygui"> Ký gửi Xe</Link> </li>
        <li>
          <Link to="/MyCarKyGui">Xe ký gửi</Link></li>
        <li>  <button
          className="btn"
          style={{ textAlign: "center" }}
          onClick={() => Signout()}
        >
          Đăng xuất
        </button>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;

