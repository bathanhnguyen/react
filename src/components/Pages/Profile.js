import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import "../../App.css";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import SideBar from "../Menu/SideBar";
import imglogo from "../../images/dealer-logo.jpg"

import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
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
  }, [setInfo, email]);

  const [name, setName] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");



  const handleSubmit = (event) => {
    event.preventDefault();

    const qs = require('qs');
    let data = qs.stringify({
      name: name,
      mobileno: mobileno,
      dob: dob,
      address: address,
      city: city,
      country: country,
      email: email,
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Update_Profile.php?email=${email}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };
    axios.request(config)
      .then((res) => {
        // Xử lý phản hồi từ máy chủ
        if (res.data.status === "200") {
          console.log(JSON.stringify(res.data.user));
          setInfo(res.data.user);
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
    <div>
      <Header />

      <section className="page-header profile_page">
        <div className="container">
          <div className="page-header_wrap">
            <div className="page-heading">
              <h1>Thông tin người dùng</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Thông tin người dùng</li>
            </ul>
          </div>
        </div>
        <div className="dark-overlay"></div>
      </section>

      <section className="user_profile inner_pages">
        <div className="container">
          <div className="user_profile_info gray-bg padding_4x4_40">
            <div class="upload_user_logo">
              <img src={imglogo} alt="logo" />            </div>

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
                <h5 className="uppercase underline">Cài đặt chung</h5>

                <form>
                  <div className="form-group">
                    <label className="control-label">Ngày đăng ký</label>
                    {info.RegDate}
                  </div>

                  <div className="form-group">
                    <label className="control-label">Cập nhật lần cuối</label>
                    {info.UpdationDate !== "" ? info.UpdationDate : ""}
                  </div>
                  <div className="form-group">
                    <label className="control-label">Họ và tên</label>
                    <input
                      type="text"
                      name="fullname"
                      defaultValue={info.FullName}
                      onChange={(event) => setName(event.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                      className="form-control white_bg"
                      defaultValue={info.EmailId}
                      name="emailid"
                      id="email"
                      type="email"
                      readonly
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Số điện thoại</label>
                    <input
                      type="tel"
                      name="mobileno"
                      defaultValue={info.ContactNo}
                      onChange={(event) =>
                        setMobileno(event.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Ngày sinh (dd/mm/yyyy)
                    </label>
                    <input
                      defaultValue={info.dob}
                      name="dob"
                      placeholder="dd/mm/yyyy"
                      type="text"
                      onChange={(event) =>
                        setDob(event.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Địa chỉ</label>
                    <textarea
                      class="form-control white_bg"
                      name="address"
                      rows="4"
                      defaultValue={info.Address}
                      onChange={(event) => setAddress(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Thành phố</label>
                    <input
                      class="form-control white_bg"
                      name="city"
                      defaultValue={info.City}
                      onChange={(event) => setCity(event.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Quốc gia</label>
                    <input
                      class="form-control white_bg"
                      name="country"
                      defaultValue={info.Country}
                      onChange={(event) => setCountry(event.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      name="updateprofile"
                      className="btn"
                      onClick={handleSubmit}
                    >
                      Lưu thông tin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Profile;
