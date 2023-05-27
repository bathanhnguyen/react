import React, { useEffect } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import axios from "axios";
import { useState } from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"
import { GrClose } from "react-icons/gr"
import Swal from "sweetalert2";

const ManageBrand = () => {

    const [listBrand, setListBrand] = useState([])
    let [count, setCount] = useState(0);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/admin/Get_Brand.php',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.brand));
                setListBrand(response.data.brand)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [count]);

    const deletevhi = async (id) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Delete_Brand.php?del=${id}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setCount((count) => count + 1);

                Swal.fire({
                    title: "Bạn đã xóa brand thành công",
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

            <div className="row">
                <div className="col-4">
                    <LeftBar />

                </div>
                <div className="col-8" style={{ marginTop: "100px" }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="page-title">Quản lý thương hiệu</h2>

                                <div className="panel panel-default">
                                    <div className="panel-heading">Danh sách thương hiệu</div>
                                    <div className="panel-body">
                                        <table id="zctb" className="display table table-striped table-bordered table-hover" cellSpacing={0} width="100%">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên thương hiệu</th>
                                                    <th>Ngày taohj</th>
                                                    <th>Ngày chỉnh sửa</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên thương hiệu</th>
                                                    <th>Ngày taohj</th>
                                                    <th>Ngày chỉnh sửa</th>
                                                    <th>Tác nhân</th>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {listBrand.map((brand, index) => (
                                                    <tr key={index}>
                                                        <td>{brand.id}</td>
                                                        <td>{brand.BrandName}</td>
                                                        <td>{brand.CreationDate}</td>
                                                        <td>{brand.UpdationDate}</td>
                                                        <td>
                                                            <Link to={`/EditBrand/${brand.id}`}>
                                                                <FaEdit />
                                                            </Link>
                                                            &nbsp;&nbsp;
                                                            <Link

                                                            >
                                                                <button
                                                                >
                                                                    <GrClose

                                                                        onClick={() =>
                                                                            deletevhi(brand.id)
                                                                        } />

                                                                </button>

                                                            </Link>
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
        </div >
    );
};
export default ManageBrand;
