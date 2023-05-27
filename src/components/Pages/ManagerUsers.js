import React, { useEffect, useState } from "react";
import "./css/style.css";
import LeftBar from "../Menu/LeftBar";
import HeaderAdmin from "../Header/HeaderAdmin";
import axios from "axios";
const ManagerUsers = () => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_User_Reg.php`,
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
                                <h2 className="page-title">Người dùng đăng ký</h2>
                                {/* Zero Configuration Table */}
                                <div className="panel panel-default">
                                    <div className="panel-heading">Danh sách người dùng</div>
                                    <div className="panel-body">

                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Email </th>
                                                    <th>Số điện thoại</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Thành phố</th>
                                                    <th>Quốc gia</th>
                                                    <th>Ngày đăng ký</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Email </th>
                                                    <th>Số điện thoại</th>
                                                    <th>Ngày sinh</th>
                                                    <th>Địa chỉ</th>
                                                    <th>Thành phố</th>
                                                    <th>Quốc gia</th>
                                                    <th>Ngày đăng ký</th>
                                                </tr>
                                            </tfoot>
                                            {listUsers.map((user, index) => (<tbody>

                                                {
                                                    user.roleid === "2" ?
                                                        <tr key={index}>

                                                            <td>{user.id}</td>
                                                            <td>{user.FullName}</td>
                                                            <td>{user.EmailId}</td>
                                                            <td>{user.ContactNo}</td>
                                                            <td>{user.dob}</td>
                                                            <td>{user.Address}</td>
                                                            <td>{user.City}</td>
                                                            <td>{user.Country}</td>
                                                            <td>{user.created}</td>
                                                        </tr> : <tr></tr>
                                                }

                                            </tbody>))}
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
export default ManagerUsers;
