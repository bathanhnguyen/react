import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { InfoContext } from "../../contextProvider/ProviderInfo";

const LeftBar = () => {
  const { userData } = useContext(InfoContext);

  const roleid = (userData.get("userData").roleid);

  return (

    <LeftBarDiv>
      {roleid === "0" ?
        <ul classname="col-4 left-bar">
          <li>
            <Link to="/admin">
              <i classname="fa fa-dashboard"></i> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/ManageBrand">Quản lý danh mục xe</Link>
          </li>
          <li>
            <Link to="/PostBrand">Thêm danh mục xe</Link>
          </li>
          <li>
            <Link to="/ManagerVehical">Quản lý xe</Link>
          </li>
          <li>
            <Link to="/PostVehical">Thêm xe</Link>
          </li>
          <li>
            <Link to="/ManagerVehicalKyGui">Quản lý xe ký gửi</Link>
          </li>
          <li>
            <Link to="/NewBooking">Đơn hàng mới</Link>
          </li>
          <li>
            <Link to="/ComfirmBooking">Quản lý đơn hàng</Link>
          </li>
          <li>
            <Link to="/CancelBooking">Danh sách đơn đã hủy</Link>
          </li>

          <li>
            <Link to="/ManagerUsersKyGui">
              Quản lý người ký gửi
            </Link>
          </li>

          <li>
            <Link to="/ManagerUsers">
              Quản lý người dùng  </Link>
          </li>
          <li>
            <Link to="/ManageStaff">
              Quản lý nhân viên   </Link>
          </li>
          <li>
            <Link to="/CreateNV">
              Thêm nhân viên   </Link>
          </li>
          <li>
            <Link to="/ThongKeDoanhThu">
              Thống kê doanh thu   </Link>
          </li>
          <li>
            <Link to="/ManageContactUs">
              Liên hệ từ khách hàng
            </Link>
          </li>
          <li>
            <Link to="/UpdateContactInfo">
              Cập nhật thông tin web
            </Link>
          </li>

        </ul>
        :

        <ul classname="col-4 left-bar">
          <li>
            <Link to="/admin">
              <i classname="fa fa-dashboard"></i> Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/ManageBrand">Quản lý danh mục xe</Link>
          </li>
          <li>
            <Link to="/PostBrand">Thêm danh mục xe</Link>
          </li>
          <li>
            <Link to="/ManagerVehical">Quản lý xe</Link>
          </li>
          <li>
            <Link to="/PostVehical">Thêm xe</Link>
          </li>
          <li>
            <Link to="/ManagerVehicalKyGui">Quản lý xe ký gửi</Link>
          </li>
          <li>
            <Link to="/NewBooking">Đơn hàng mới</Link>
          </li>
          <li>
            <Link to="/ComfirmBooking">Đanh sách đơn hàng</Link>
          </li>
          <li>
            <Link to="/CancelBooking">Danh sách đơn đã hủy</Link>
          </li>

          <li>
            <Link to="/ManagerUsersKyGui">
              Quản lý người ký gửi
            </Link>
          </li>

          <li>
            <Link to="/ManagerUsers">
              Quản lý người dùng  </Link>
          </li>
          <li>
            <Link to="/ManageContactUs">
              Liên hệ từ khách hàng
            </Link>
          </li>


        </ul>}

    </LeftBarDiv>
  );
};

const LeftBarDiv = styled.div`
margin-top: 100px;

 li{
  border: 1px solid black;
  height: 30px;
  border-radius: 5px;
  color: red;
  width: 50%;
}

`
export default LeftBar;
