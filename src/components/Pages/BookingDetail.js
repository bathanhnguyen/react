import React from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const BookingDetail = () => {

    const [booking, setBooking] = useState({})
    const goNewBooing = useNavigate();


    const { id } = useParams();
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_NewBooking_Id.php?bid=${id}`,
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(res.data.brand));
                if (res.data.status === "200") {
                    setBooking(res.data.newbookingId)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const confirmBooking = () => {
        if (window.confirm('Xác nhận đã thanh toán')) {
            // xử lý khi người dùng xác nhận
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost/car/KLTN/carrentalAPI/admin/Update_NewBooking_Comfirm.php?id=${id}&idcar=${booking.vid}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            axios.request(config)
                .then((res) => {
                    if (res.data.status === "200") {
                        goNewBooing("/NewBooking");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            console.log('Booking confirmed');
        }
    };

    const cancelBooking = () => {
        if (window.confirm('Hủy booking?')) {
            // xử lý khi người dùng xác nhận
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost/car/KLTN/carrentalAPI/admin/Update_NewBooking_Cancelled.php?id=${id}&idcar=${booking.vid}`,
                headers: {
                    'Content-Type': 'application/json'

                },
            };

            axios.request(config)
                .then((res) => {
                    if (res.data.status === "200") {
                        goNewBooing("/NewBooking");

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log('Booking canceled');
        }
    };
    const comfirmTraXe = () => {
        if (window.confirm('Bạn có muốn chấp thuận trả xe')) {
            // xử lý khi người dùng xác nhận
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost/car/KLTN/carrentalAPI/admin/Comfirm_Traxe.php?vid=${booking.vid}`,
                headers: {
                    'Content-Type': 'application/json'

                },
            };

            axios.request(config)
                .then((res) => {
                    if (res.data.status === "200") {
                        window.location.reload();

                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log('Booking canceled');
        }
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
                                <h2 className="page-title">Chi tiết thuê xe</h2>
                                <div className="panel panel-default">
                                    <div className="panel-heading">Thông tin thuê xe</div>
                                    <div className="panel-body">
                                        <div id="print">
                                            <h3 style={{ textAlign: 'center', color: 'red' }}>{booking.BookingNumber} Thuê xe chi tiết </h3>
                                            <table border={1} className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                                <tbody>


                                                    <tr>
                                                        <th colSpan={4} style={{ textAlign: 'center', color: 'blue' }}>Chi tiết người dùng</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Mã số thuê xe</th>
                                                        <td>{booking.BookingNumber}</td>
                                                        <th>Name</th>
                                                        <td>{booking.FullName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{booking.EmailId}</td>
                                                        <th>Số điện thoại</th>
                                                        <td>{booking.ContactNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Địa chỉ</th>
                                                        <td>{booking.Address}</td>
                                                        <th>City</th>
                                                        <td>{booking.City}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Quốc gia</th>
                                                        <td colSpan={3}>{booking.Country}</td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={4} style={{ textAlign: 'center', color: 'blue' }}>Chi tiết thuê xe</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Tên xe</th>
                                                        <td><a href="edit-vehicle.php?id=<?php echo htmlentities($result->vid);?>">{booking.BrandName} , {booking.VehiclesTitle}</a></td>
                                                        <th>Ngày đặt xe</th>
                                                        <td>{booking.PostingDate}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Từ ngày</th>
                                                        <td>{booking.FromDate}</td>
                                                        <th>Tới ngày</th>
                                                        <td>{booking.ToDate}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tổng ngày thuê</th>
                                                        <td>{booking.totalnodays}</td>
                                                        <th>Giá thuê 1 ngày</th>
                                                        <td>{booking.PricePerDay}</td>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={3} style={{ textAlign: 'center' }}>Tổng tiền</th>
                                                        {/* <td>{booking.amount}</td> */}
                                                        <td>{booking.totalnodays * booking.PricePerDay}</td>
                                                    </tr>
                                                    <tr>
                                                        <th> Trạng thái thanh toán</th>
                                                        <td>
                                                            {booking.Status === "3" ? <span>Chưa thanh toán</span> :
                                                                booking.Status === "0" ? <span>Đã thanh toán </span> :
                                                                    booking.Status === "1" ? <span>Chưa chọn phương thức thanh toán </span> :
                                                                        <span>Hủy đơn </span>
                                                            }
                                                        </td>
                                                        <th>Ngày cập nhật cuối</th>
                                                        <td>{booking.UpdationDate}</td>
                                                    </tr>
                                                    {booking.Status === "3" ? (
                                                        <tr>
                                                            <td style={{ textAlign: 'center', margin: "5px" }} colSpan={4}>
                                                                <button onClick={confirmBooking} style={{ textAlign: 'center', margin: "10px" }} className="btn btn-primary">Xác nhận thanh toán</button>
                                                                <button onClick={cancelBooking} className="btn btn-danger">Hủy bỏ thuê xe</button>

                                                            </td>
                                                        </tr>) :

                                                        booking.Status === "0" ?
                                                            <tr>
                                                                <th>Booking Status</th>
                                                                <td>
                                                                    {/* {booking.is_rental === "2" ?
                                                                        <button onClick={comfirmTraXe} style={{ textAlign: 'center', margin: "10px" }} className="btn btn-primary">Xác nhận trả xe</button> :
                                                                        booking.is_rental === "1" ? */}
                                                                    <button style={{ textAlign: 'center', margin: "10px" }} className="btn btn-primary">Xe đang được thuê</button>
                                                                    {/* : <></>
                                                                    } */}

                                                                </td>
                                                                {/* <td>  {booking.is_rental === "1" ? <button onClick={comfirmTraXe} style={{ textAlign: 'center', margin: "10px" }} className="btn btn-primary">Xác nhận xe đã trả</button>
                                                                    : <></>}
                                                                </td> */}
                                                            </tr> : <></>}
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

        </div>
    );
};
export default BookingDetail;
