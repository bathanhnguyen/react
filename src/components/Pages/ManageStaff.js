import React, { useEffect, useState } from "react";
import "./css/style.css";
import LeftBar from "../Menu/LeftBar";
import HeaderAdmin from "../Header/HeaderAdmin";
import axios from "axios";
import { GrClose } from "react-icons/gr"
import { FiEdit } from "react-icons/fi"
import Swal from "sweetalert2";

const ManageStaff = () => {
    const [listUsers, setListUsers] = useState([]);
    let [count, setCount] = useState(0);

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_User_Staff.php`,
            headers: {},
        };

        axios
            .request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.booking));
                setListUsers(response.data.users);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const deleteNV = async (id) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Delete_NhanVien.php?id=${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setCount((count) => count + 1);

                Swal.fire({
                    title: "Bạn đã xóa Nhân viên thành công",
                    type: "Confirm",
                })
            })
            .catch((error) => {
                console.log(error);
            });

    };

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
                                <h2 className="page-title">Quản lý danh sách nhân viên</h2>
                                {/* Zero Configuration Table */}
                                <div className="panel panel-default">
                                    <div className="panel-heading">Danh sách</div>
                                    <div className="panel-body">

                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th> Họ và tên</th>
                                                    <th>Email </th>
                                                    <th>Số điện thoại</th>
                                                    {/* <th>DOB</th>
                                                    <th>Address</th>
                                                    <th>City</th>
                                                    <th>Country</th> */}
                                                    <th>Vai trò</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th> Họ và tên</th>
                                                    <th>Email </th>
                                                    <th>Số điện thoại</th>
                                                    {/* <th>DOB</th>
                                                    <th>Address</th>
                                                    <th>City</th>
                                                    <th>Country</th> */}
                                                    <th>Vai trò</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {listUsers.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{user.id}</td>
                                                        <td>{user.FullName}</td>
                                                        <td>{user.EmailId}</td>
                                                        <td>{user.ContactNo}</td>
                                                        <td>{user.roleid === 0 ? "Admin" : user.roleid === 1 ? "Khách hàng" : "Nhân Viên"}</td>
                                                        {/* <td>{user.Address}</td>
                                                        <td>{user.City}</td>
                                                        <td>{user.Country}</td> */}
                                                        <td><GrClose onClick={() =>
                                                            deleteNV(user.id)
                                                        } />
                                                            {/* <FiEdit /> */}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
export default ManageStaff;
