import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
import { Link } from "react-router-dom";
const CancelBooking = () => {
    const [listCancel, setListCancel] = useState([])

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_CancelBooking.php`,
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res.data.comfirm));


                if (res.data.status === "200") {
                    setListCancel(res.data.comfirm)
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
                                <h2 className="page-title">Hủy thuê xe</h2>

                                <div className="panel panel-default">
                                    <div className="panel-heading">Thông tin thuê xe</div>
                                    <div className="panel-body">

                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Họ và tên</th>
                                                    <th> Mã số thuê xe</th>
                                                    <th>Xe</th>
                                                    <th>Từ ngày</th>
                                                    <th>Tới ngày</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày đăng
                                                    </th>
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
                                                    <th>Ngày đăng
                                                    </th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {listCancel.map((cancel, index) => (
                                                    <tr>

                                                        <td key={index}>{cancel.id}</td>
                                                        <td>{cancel.FullName}</td>
                                                        <td>{cancel.BookingNumber}</td>
                                                        <td><a href="edit-vehicle.php?id=<?php echo htmlentities($result->vid);?>">{cancel.BrandName} , {cancel.VehiclesTitle}</a></td>
                                                        <td>{cancel.FromDate}</td>
                                                        <td>{cancel.ToDate}</td>
                                                        <td>
                                                            {cancel.satus === "0" ? <span>Đã thanh toán</span> :
                                                                cancel.satus === "1" ? <span>Chưa xác nhận</span> :
                                                                    <span>Đã hủy đơn</span>
                                                            }
                                                        </td>
                                                        <td>{cancel.PostingDate}</td>
                                                        <td>
                                                            <Link to={`/BookingDetail/${cancel.id}`}> Chi tiết</Link>
                                                        </td>



                                                    </tr>))}

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
export default CancelBooking;
