import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
import { Link } from "react-router-dom";
const ComfirmBooking = () => {
    const [listComfirm, setListComfirm] = useState([])

    const [dateCurent, setDateCurent] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateCurent(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const currentDate = `${dateCurent.getFullYear()}-${(dateCurent.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateCurent.getDate().toString().padStart(2, '0')}`;
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_ComfirmBooking.php`,
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res.data.comfirm));


                if (res.data.status === "200") {
                    setListComfirm(res.data.comfirm)
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
                                <h2 className="page-title">Quản lý đơn hàng</h2>
                                {/* Zero Configuration Table */}
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
                                            <tbody> {listComfirm.map((comfirm, index) => (
                                                <tr>

                                                    <td key={index}>{comfirm.id}</td>
                                                    <td>{comfirm.FullName}</td>
                                                    <td>{comfirm.BookingNumber}</td>
                                                    <td><a href="edit-vehicle.php?id=<?php echo htmlentities($result->vid);?>">{comfirm.BrandName} , {comfirm.VehiclesTitle}</a></td>
                                                    <td>{comfirm.FromDate}</td>
                                                    <td>{comfirm.ToDate}</td>
                                                    {currentDate < comfirm.ToDate ?
                                                        <td>


                                                            {comfirm.is_rental === "0" ? <span>Đã trả xe</span> :
                                                                comfirm.is_rental === "1" ? <span>Đang thuê</span> :
                                                                    <span style={{ color: "red" }}>Đăng ký trả xe</span>
                                                            }
                                                        </td>
                                                        : <td><span>Đã trả xe</span></td>}
                                                    <td>{comfirm.PostingDate}</td>
                                                    <td>
                                                        <Link to={`/BookingDetail/${comfirm.id}`}> Chi tiết</Link>
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
export default ComfirmBooking;
