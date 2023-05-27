import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import SideBar from "../Menu/SideBar";
import Swal from "sweetalert2";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import { Link } from "react-router-dom";
import imglogo from "../../images/dealer-logo.jpg"

const UpdatePass = () => {

    const { userData } = useContext(InfoContext);
    const [info, setInfo] = useState({});

    const email = userData.get("userData").email;
    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/Get_Profile.php?email=${email}`,
            headers: {},
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.user));
                setInfo(response.data.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [email]);


    const [current, setCurrent] = useState("");
    const [newpassword, setNewPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const FormData = require('form-data');
        let data = new FormData();
        data.append('email', email);
        data.append('current', current);
        data.append('new', newpassword);



        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/UpdatePass.php',
            headers: {
            },
            data: data
        };

        axios.request(config)
            .then((res) => {
                // console.log(JSON.stringify(response.data));
                if (res.data.status === "200") {
                    Swal.fire({
                        title: "Bạn đã cập nhật mật khẩu thành công",
                        type: "Confirm",
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <Header />
            <section className="page-header profile_page">
                <div className="container">
                    <div className="page-header_wrap">
                        <div className="page-heading">
                            <h1>Cập nhật mật khẩu</h1>
                        </div>
                        <ul className="coustom-breadcrumb">
                            <li><Link to="/">Trang chủ</Link></li>
                            <li>Cập nhật mật khẩu</li>
                        </ul>
                    </div>
                </div>
                {/* Dark Overlay*/}
                <div className="dark-overlay" />
            </section>
            {/* /Page Header*/}

            <section className="user_profile inner_pages">
                <div className="container">
                    <div className="user_profile_info gray-bg padding_4x4_40">
                        <div className="upload_user_logo">
                            <img src={imglogo} alt="logo" />

                        </div>
                        <div className="dealer_info">
                            <h5>{info.FullName}</h5>
                            <p>
                                {info.Address}
                                <br />
                                {info.City}
                                {info.Country}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <SideBar />
                        </div>
                        <div className="col-md-6 col-sm-8">
                            <div className="profile_wrap">
                                <form name="chngpwd" method="post" >
                                    <div className="gray-bg field-title">
                                        <h6>Cập nhật mật khẩu</h6>
                                    </div>

                                    <label className="control-label">Mật khẩu hiện tại</label>
                                    <input className="form-control white_bg" type="password"

                                        onChange={(event) => setCurrent(event.target.value)} />



                                    <label className="control-label">Mật khẩu mới</label>
                                    <input className="form-control white_bg" type="password"

                                        onChange={(event) => setNewPassword(event.target.value)} />


                                    {/* <div className="form-group">
                                        <label className="control-label">Confirm Password</label>
                                        <input className="form-control white_bg" type="password" />
                                    </div> */}

                                    <input type="Cập nhật" className="btn btn-block"
                                        onClick={handleSubmit} />

                                </form>
                            </div>
                        </div>
                    </div>
                </div></section>
            <Footer />
        </div>

    )
}
export default UpdatePass;