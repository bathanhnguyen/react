import React, { useState, useEffect } from "react";
// import { InfoContext } from "../../contextProvider/ProviderInfo";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
const Order = () => {

    // const { userData } = useContext(InfoContext);
    const bookingSucsess = useNavigate();

    const [booking, setBooking] = useState({});
    const amount = (booking.totaldays * booking.PricePerDay)
    // const email = userData.get("userData").email;
    const location = useLocation();
    const bookingnew = location.state
    const BookingNumber = bookingnew.BookingNumber
    const id = booking.id
    console.log(id)

    const [confirmCancel, setConfirmCancel] = useState(false);


    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/Get_BookingId.php?bookingnumber=${BookingNumber}`,
            headers: {},
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.booking));
                setBooking(response.data.booking);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [BookingNumber]);

    const handleSubmit = async () => {
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/Update_Booking.php?bookingnumber=${BookingNumber}&idcar=${booking.vid}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };



        await axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(response.data));
                if (res.data.status === "200") {
                    setBooking(res.data.booking)
                    Swal.fire({
                        title: "Bạn đã đặt xe thành công",
                        text: "vui lòng đợi chúng tôi xác nhận",
                        type: "Confirm"
                    }).then(function () {
                        bookingSucsess("/");
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            });

    };
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "Bạn có chắc chắn muốn thoát khỏi trang?";
    // });

    // useEffect(() => {
    //     console.log('Component mounted');

    //     return () => {
    //         if (window.confirm('Hủy booking?')) {
    //             let config = {
    //                 method: 'post',
    //                 maxBodyLength: Infinity,
    //                 url: `http://localhost/car/KLTN/carrentalAPI/Delete_Booking.php?del=${id}`,
    //                 headers: {}
    //             };

    //             axios.request(config)
    //                 .then((res) => {
    //                     console.log(JSON.stringify(res));
    //                     if (res.data.status === 200) {
    //                         Swal.fire({
    //                             title: "Bạn đã hủy đặt xe thành công",
    //                             type: "Confirm"
    //                         }).then(function () {
    //                             bookingSucsess("/");
    //                         });
    //                     }

    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });


    //         }
    //     }
    // }, []);

    const delbooking = async () => {
        setConfirmCancel(true);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/Delete_Booking.php?del=${id}`,
            headers: {}
        };

        await axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res));
                if (res.data.status === 200) {
                    Swal.fire({
                        title: "Bạn đã hủy đặt xe thành công",
                        type: "Confirm"
                    }).then(function () {
                        bookingSucsess("/");
                    });
                }

            })
            .catch((error) => {
                console.log(error);
            });

    };



    const paymomo = async () => {
        const qs = require('qs');
        let data = qs.stringify({
            'amount': amount,
            'idxe': booking.id,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/momo/PayMomo.php`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };


        await axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res.data.payUrl));
                window.location.href = res.data.payUrl;

            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>


            <div className="col-md-8 col-sm-8">
                <div className="profile_wrap">
                    <h5 className="uppercase underline">Đơn thuê xe của tôi </h5>
                    <div className="my_vehicles_list">


                        <ul className="vehicle_listing" >
                            <li>
                                {/* <h4 style={{ color: 'red' }} /> */}
                                <div className="vehicle_img">
                                    <a href="vehical-details.php?vhid=<?php echo htmlentities($result->vid); ?>">
                                        <img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${booking.Vimage1}`} alt="car" />
                                    </a>
                                </div>
                                <div className="vehicle_title">
                                    <h6><a href="vehical-details.php?vhid=<?php echo htmlentities($result->vid); ?>"> </a>
                                        {booking.BrandName}, {booking.VehiclesTitle}
                                    </h6>

                                    <p><b>Từ ngày </b> {booking.FromDate} <b>Tới ngày </b> {booking.ToDate}</p>

                                    <div style={{ float: 'left' }}>
                                        <p><b>Tới ngày:</b> {booking.message}</p>
                                    </div>
                                </div>
                                {/* {booking.Status === 1 ? <div className="vehicle_status"> <a href="#sdf" className="btn outline btn-xs active-btn">Confirmed</a>
                                    <div className="clearfix" />
                                </div> :
                                    booking.Status === 2 ? <div className="vehicle_status"> <a href="#sdf" className="btn outline btn-xs">Cancelled</a>
                                        <div className="clearfix" />
                                    </div> :
                                        <div className="vehicle_status"> <a href="#dfg" className="btn outline btn-xs">Not Confirm yet</a>
                                            <div className="clearfix" />
                                        </div>
                                } */}





                            </li>
                            <h5 style={{ color: 'blue' }}>Hóa đơn</h5>
                            <table>
                                <tbody>

                                    <tr>
                                        <th>Tên xe</th>
                                        <th>Từ ngày</th>
                                        <th>Tới ngày</th>
                                        <th> Tổng số ngày</th>
                                        <th>Giá / Ngày</th>
                                    </tr>
                                    <tr>
                                        <td>{booking.VehiclesTitle}, {booking.BrandName}</td>
                                        <td>{booking.FromDate}</td>
                                        <td>{booking.ToDate}</td>
                                        <td>{booking.totaldays}</td>
                                        <td> {booking.PricePerDay}</td>

                                    </tr>
                                    <tr>
                                        <th colSpan={4} style={{ textAlign: 'center' }}> Tổng tiền</th>
                                        <th

                                        >{booking.totaldays * booking.PricePerDay}</th>
                                    </tr>
                                    <tr>
                                        <th>  <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Thanh toán tiền mặt</button></th>
                                        <th>     <button className="btn btn-primary" onClick={paymomo}> Thanh toán chuyển khoản</button></th>
                                        <th>     <button className="btn btn-primary" onClick={delbooking}> Hủy booking</button></th>


                                    </tr>

                                </tbody>
                            </table>





                            <hr />
                        </ul>


                    </div>
                </div>
            </div>
        </div >
    );
}
export default Order;