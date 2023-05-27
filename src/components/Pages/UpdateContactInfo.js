import React, { useState, useEffect } from "react";
import "./css/style.css";
import LeftBar from "../Menu/LeftBar";
import HeaderAdmin from "../Header/HeaderAdmin";
import axios from "axios";
import Swal from "sweetalert2";
const UpdateContactInfo = () => {
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [contactno, setContactNo] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/admin/Get_ContactInfo.php',
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


    const handleSubmit = (event) => {
        event.preventDefault();

        const qs = require('qs');
        let data = qs.stringify({
            address: address,
            email: email,
            contactno: contactno
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Update_ContactInfo.php`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        axios.request(config)
            .then((res) => {
                // Xử lý phản hồi từ máy chủ
                if (res.data.status === "200") {
                    // console.log(JSON.stringify(res.data.user));
                    setInfo(res.data.info)
                    Swal.fire({
                        title: "Cập nhật thông tin thành công",

                        type: "Confirm"
                    });
                }
                // setMessage(response.data.message);
                // setInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
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
                                <h2 className="page-title">Cập nhật thông tin liên hệ</h2>
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Biểu mẫu</div>
                                            <div className="panel-body">
                                                <form method="post" name="chngpwd" className="form-horizontal" >


                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label"> Địa chỉ</label>
                                                        <div className="col-sm-8">
                                                            <textarea className="form-control" name="address" id="address" defaultValue={info.Address}
                                                                onChange={(event) => setAddress(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label"> Email</label>
                                                        <div className="col-sm-8">
                                                            <input type="email" className="form-control" name="email" id="email" defaultValue={info.EmailId}
                                                                onChange={(event) => setEmail(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-4 control-label"> Số điện thoại </label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" defaultValue={info.ContactNo} name="contactno" id="contactno"
                                                                onChange={(event) => setContactNo(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/*?php }} ?*/}
                                                    <div className="hr-dashed" />
                                                    <div className="form-group">
                                                        <div className="col-sm-8 col-sm-offset-4">
                                                            <button className="btn btn-primary" name="submit" type="submit" onClick={handleSubmit}>Cập nhật</button>
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
export default UpdateContactInfo;
