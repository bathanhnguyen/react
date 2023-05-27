import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

const ManageContactUs = () => {


    const [listContactUs, setListContactUs] = useState([])



    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_ContactUs.php`,
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(res.data));


                if (res.data.status === "200") {
                    setListContactUs(res.data.contactus)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, [setListContactUs]);


    const read = (id) => {

        if (window.confirm('Do you really want to Confirm this booking')) {
            // xử lý khi người dùng xác nhận

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost/car/KLTN/carrentalAPI/admin/Update_ContactUs.php?id=${id}`,
                headers: {
                    'Content-Type': 'application/json'
                },

            };

            axios.request(config)
                .then((res) => {
                    if (res.data.status === "200") {

                        window.location.reload();

                        console.log("okee")
                    }
                })
                .catch((error) => {
                    console.log(error);
                });


        };
    }

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
                                <h2 className="page-title">Quản lý Truy vấn Liên hệ</h2>
                                {/* Zero Configuration Table */}
                                <div className="panel panel-default">
                                    <div className="panel-heading">Truy vấn của người dùng</div>
                                    <div className="panel-body">
                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>Email</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Lời nhắn</th>
                                                    <th>Ngày gửi</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>Email</th>
                                                    <th>Số điện thoại</th>
                                                    <th>Lời nhắn</th>
                                                    <th>Ngày gửi</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {listContactUs.map((contact, index) => (
                                                    <tr key={index}>
                                                        <td>{contact.id}</td>
                                                        <td>{contact.name}</td>
                                                        <td>{contact.EmailId}</td>
                                                        <td>{contact.ContactNumber}</td>
                                                        <td>{contact.Message}</td>
                                                        <td>{contact.PostingDate}</td>

                                                        {contact.status === "1" ? (<td className="btn">Đã đọc</td>
                                                        ) : (
                                                            <td>
                                                                <button onClick={() => read(contact.id)} className="btn">Chưa đọc</button>
                                                            </td>)}

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
export default ManageContactUs;
