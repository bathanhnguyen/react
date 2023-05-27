
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import "../../App.css";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import SideBar from "../Menu/SideBar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import imglogo from "../../images/dealer-logo.jpg"
const MyCarKyGui = () => {
  const { userData } = useContext(InfoContext);
  const [info, setInfo] = useState({});
  const [listCarKyGui, setListCarKyGui] = useState([]);

  const email = userData.get("userData").email;
  const iduser = userData.get("userData").id;


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
        // console.log(JSON.stringify(response.data.user));
        setInfo(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Get_MyCarKyGui.php?id=${iduser}`,

    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setListCarKyGui(response.data.carDetail);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [iduser]);


  const huyKyGui = async (id) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Update_HuyKyGui.php?id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
    };

    await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        if (response.data.status === "200") {

          Swal.fire({
            title: "Xe ký gửi được hủy",

            type: "Confirm"
          });
        }
      })
      .catch(function (error) {
        console.log(error);

      });

  };

  const Comfirmkygui = async (id) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/admin/ComfirmKygui.php?id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'

      },
    };

    await axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.status));

        if (response.data.status === "200") {

          Swal.fire({
            title: "Xe ký gửi đã được công khai",

            type: "Confirm"
          });
        }
      })
      .catch(function (error) {
        console.log(error);

      });

  };
  return (


    <div>
      <Header />

      <section className="page-header profile_page">
        <div className="container">
          <div className="page-header_wrap">
            <div className="page-heading">
              <h1>Xe đã ký gửi</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Xe đã ký gửi</li>
            </ul>
          </div>
        </div>
        <div className="dark-overlay"></div>
      </section>

      <section className="user_profile inner_pages">
        <div className="container">
          <div className="user_profile_info gray-bg padding_4x4_40">
            <div class="upload_user_logo">
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
            <div className="col-md-8 col-sm-8">
              <div className="profile_wrap">
                <h5 className="uppercase underline">Xe ký gửi </h5>
                <div className="my_vehicles_list">
                  {listCarKyGui.map((car, index) => (

                    <ul className="vehicle_listing" key={index}>
                      <li>
                        {/* <h4 style={{ color: 'red' }} /> */}
                        <div className="vehicle_img">
                          <a href="lll">
                            <img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${car.Vimage1}`} alt="car" />
                          </a>
                        </div>
                        <div className="vehicle_title">
                          <h6><a href="lll"> </a>
                            {car.BrandName}, {car.VehiclesTitle}
                          </h6>


                        </div>
                        {car.isconfirm === "0" ? (<div> <div className="vehicle_status"> <button className="btn outline btn-xs active-btn">Đã ký gửi</button>
                          <div className="clearfix" />
                        </div>
                          <div className="vehicle_status" style={{ marginTop: "10px" }}>
                            <button className="btn outline btn-xs active-btn" key={car.id} onClick={() => huyKyGui(car.id)} o>Hủy Ký gửi</button>
                            <div className="clearfix" />
                          </div>

                        </div>
                        ) :
                          car.isconfirm === "2" ? (<div>

                            <div className="vehicle_status"> <button className="btn outline btn-xs">Đã hủy ký gửi</button>
                              <div className="clearfix" />
                            </div>
                            <div className="vehicle_status" style={{ marginTop: "10px" }}>
                              <button className="btn outline btn-xs active-btn" key={car.id} onClick={() => Comfirmkygui(car.id)} o>Ký gửi Lại</button>
                              <div className="clearfix" />
                            </div>
                          </div>


                          )

                            :
                            <div className="vehicle_status"> <button className="btn outline btn-xs">Chưa được chấp thuận</button>
                              <div className="clearfix" />

                            </div>
                        }






                      </li>
                      {/* <h5 style={{ color: 'blue' }}>Hóa đơn</h5> */}
                      <table>
                        <tbody><tr>
                          <th>Tên xe</th>
                          <th>Thương hiệu</th>
                          <th>Tổng quan xe</th>
                          <th>Số chổ</th>
                          <th>VND / Ngày</th>
                        </tr>
                          <tr>
                            <td>{car.VehiclesTitle}</td>
                            <td>{car.BrandName}</td>
                            <td>{car.VehiclesOverview}</td>
                            <td>{car.SeatingCapacity}</td>
                            <td> {car.PricePerDay}</td>

                          </tr>

                        </tbody></table>
                      <hr />
                    </ul>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default MyCarKyGui;

