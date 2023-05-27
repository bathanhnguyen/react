import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
import { Link } from "react-router-dom";
const NewBooking = () => {


    const [newBooking, setNewBooking] = useState([])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/admin/Get_NewBooking.php',
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res.data));


                if (res.data.status === "200") {
                    setNewBooking(res.data.newstatus)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                                <h2 className="page-title">Đơn hàng mới</h2>
                                {/* Zero Configuration Table */}
                                <div className="panel panel-default">
                                    <div className="panel-heading">Thông tin đơn hàng</div>
                                    <div className="panel-body">

                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Mã số thuê xe</th>
                                                    <th>Xe</th>
                                                    <th>Từ ngày</th>
                                                    <th>Tới ngày</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th>Mã số thuê xe</th>
                                                    <th>Xe</th>
                                                    <th>Từ ngày</th>
                                                    <th>Tới ngày</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {newBooking.map((booking, index) => (
                                                    <tr key={index}>
                                                        <td>{booking.id}</td>
                                                        <td>{booking.FullName}</td>
                                                        <td>{booking.BookingNumber}</td>
                                                        <td>{booking.BrandName} , {booking.VehiclesTitle}</td>
                                                        <td>{booking.FromDate}</td>
                                                        <td>{booking.ToDate}</td>
                                                        <td>
                                                            {booking.Status === "3" ? (
                                                                <span>Chưa thanh toán</span>
                                                            ) : booking.Status === "0" ? (
                                                                <span>Đã thanh toán</span>
                                                            ) : (
                                                                <span>Đã hủy</span>
                                                            )}
                                                        </td>
                                                        <td>{booking.PostingDate}</td>
                                                        <td>
                                                            <Link to={`/BookingDetail/${booking.id}`}> Chi tiết</Link>
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
export default NewBooking;
