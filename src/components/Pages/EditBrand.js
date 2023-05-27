import React from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";




const EditBrand = () => {

    const { id } = useParams();



    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Get_Brand_Id.php?id=${id}`,
            headers: {}
        };

        axios.request(config)
            .then((res) => {
                console.log(JSON.stringify(res.data.brand));
                if (res.data.status === "200") {
                    setBrand(res.data.brand)
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    const [brand, setBrand] = useState('');





    const handleSubmit = async e => {
        e.preventDefault();

        const qs = require('qs');
        let data = qs.stringify({
            'brand': brand
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/admin/Update_Brand.php?id=11',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(response.data));
                if (res.data.status === "200") {
                    setBrand(res.data.brand)
                    Swal.fire({
                        title: "Cập nhật thông tin thương hiệu xe thành công",

                        type: "Confirm"
                    });
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
                                <h2 className="page-title">Cập nhật thương hiệu</h2>
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Cập nhật thương hiệu</div>
                                            <div className="panel-body">
                                                <form className="form" onSubmit={handleSubmit}>

                                                    <div className="form-group">
                                                        <label className="control-label">Tên thương hiệu</label>

                                                        <input type="text" className="form-control" value={brand.BrandName}
                                                            onChange={(event) => setBrand(event.target.value)} />

                                                    </div>


                                                    <div className="form-group">

                                                        <button className="btn btn-primary" type="submit">Cập nhật</button>

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
export default EditBrand;
