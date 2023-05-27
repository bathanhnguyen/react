import React, { useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
import Swal from "sweetalert2";

const CreateNV = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [sdt, setSdt] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();

        const qs = require('qs');
        let data = qs.stringify({
            email: email,
            password: pass,
            fullname: fullName,
            contactno: sdt
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/admin/Create_NhanVien.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                if (response.data.status === "200") {
                    Swal.fire({
                        title: "Bạn đã thêm nhân viên thành công",
                        type: "Confirm",
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });


    };
    return (
        <div className="container-fluid">
            <HeaderAdmin />

            <div className="row">
                <div className="col-4">
                    <LeftBar />
                </div>

                <div className="col-8" style={{ marginTop: "100px" }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="page-title">Thêm nhân viên</h2>
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Tạo nhân viên</div>
                                            <div className="panel-body">
                                                <form method="post" name="chngpwd" className="form-horizontal">

                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label">Họ và tên</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" name="brand"
                                                                onChange={(e) => {
                                                                    setFullName(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label">Email</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" name="brand"
                                                                onChange={(e) => {
                                                                    setEmail(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label">Số điện thoại</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" name="brand"
                                                                onChange={(e) => {
                                                                    setSdt(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label">Mật khẩu</label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" name="brand"
                                                                onChange={(e) => {
                                                                    setPass(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="hr-dashed" />
                                                    <div className="form-group">
                                                        <div className="col-sm-8 col-sm-offset-4">
                                                            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Tạo</button>
                                                        </div>
                                                    </div>
                                                </form>
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
export default CreateNV;
