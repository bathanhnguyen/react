
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import "../../App.css";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import SideBar from "../Menu/SideBar";
import { Link } from "react-router-dom";
import imglogo from "../../images/dealer-logo.jpg"
import Swal from "sweetalert2";

const MyBooking = () => {
  const { userData } = useContext(InfoContext);
  const [info, setInfo] = useState({});
  const [listBoooking, setListBooking] = useState([]);
  const email = userData.get("userData").email;
  let [count, setCount] = useState(0);

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


  console.log(currentDate + "ngày hiện tại")

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
      url: `http://localhost/car/KLTN/carrentalAPI/MyBooking.php?email=${email}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.booking));
        setListBooking(response.data.booking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, count]);

  const traxe = (vid) => {
    if (window.confirm('Bạn đang muốn trả xe?')) {
      // xử lý khi người dùng xác nhận
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost/car/KLTN/carrentalAPI/Traxe.php?vid=${vid}`,
        headers: {
          'Content-Type': 'application/json'

        },
      };

      axios.request(config)
        .then((res) => {
          if (res.data.status === "200") {
            Swal.fire({
              title: "Bạn đã đăng ký trả xe thành công",
              text: "Vui lòng đợi chúng tôi xác nhận",
              type: "Confirm"
            })
              .then(function () {
                window.location.reload();
              });


          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const delbooking = async (id) => {
    // setConfirmCancel(true);
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
          setCount((count) => count + 1);

          Swal.fire({
            title: "Bạn đã hủy đặt xe thành công",
            type: "Confirm"
          }).then(function () {
            // bookingSucsess("/");
          });
        }

      })
      .catch((error) => {
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
              <h1>Xe đã thuê</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Xe đã thuê</li>
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
            {/* <div className="col-md-6 col-sm-8">
              <div className="profile_wrap">
                <h5 className="uppercase underline">Genral Settings</h5>

                <form>
                  <div className="form-group">
                    <label className="control-label">Reg Date -</label>
                    {info.RegDate}
                  </div>

                  <div className="form-group">
                    <label className="control-label">Last Update at -</label>
                    {info.UpdationDate !== "" ? info.UpdationDate : ""}
                  </div>
                  <div className="form-group">
                    <label className="control-label">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={info.FullName}
                      onChange={(event) => setName(event.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Email Address</label>
                    <input
                      class="form-control white_bg"
                      value={info.EmailId}
                      name="emailid"
                      id="email"
                      type="email"
                      readonly
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Phone Number</label>
                    <input
                      type="tel"
                      name="mobilenumber"
                      value={info.ContactNo}
                      onChange={(event) =>
                        setMobileNumber(event.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Date of Birth (dd/mm/yyyy)
                    </label>
                    <input
                      value={info.dob}
                      name="dob"
                      placeholder="dd/mm/yyyy"
                      type="date-time"
                      onChange={(event) =>
                        setMobileNumber(event.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Your Address</label>
                    <textarea
                      class="form-control white_bg"
                      name="address"
                      rows="4"
                      defaultValue={info.Address}
                      onChange={(event) => setAddress(event.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="control-label">City</label>
                    <input
                      class="form-control white_bg"
                      id="city"
                      name="city"
                      value={info.City}
                      onChange={(event) => setCity(event.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Country</label>
                    <input
                      class="form-control white_bg"
                      id="country"
                      name="country"
                      value={info.Country}
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
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
            <div className="col-md-8 col-sm-8">
              <div className="profile_wrap">
                <h5 className="uppercase underline">Xe đã thuê </h5>
                <div className="my_vehicles_list">
                  {listBoooking.map((booking, index) => (

                    <ul className="vehicle_listing" key={index}>
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
                            <p><b>Lời nhắn:</b> {booking.message}</p>
                          </div>
                          <br />

                        </div>

                        {booking.Status === "0" ?
                          <div>
                            {currentDate < booking.ToDate ? <div>
                              {/* {booking.is_rental === "1" ?
                                (<div>
                                  <div className="vehicle_status">
                                    <button className="btn outline btn-xs active-btn">Đang thuê</button>
                                    <div className="clearfix" />
                                  </div>

                                  <div className="vehicle_status" style={{ marginTop: "10px" }}>
                                    <button className="btn outline btn-xs "

                                      onClick={() => { traxe(booking.vid) }}
                                    >Yêu cầu trả xe</button>
                                    <div className="clearfix" />
                                  </div>
                                </div>)
                                :
                                booking.is_rental === "0" ? <div className="vehicle_status"> <button className="btn outline btn-xs">Đã trả xe</button>
                                  <div className="clearfix" />
                                </div> :

                                  booking.is_rental === "2" ? (
                                    <div className="vehicle_status"> <button className="btn outline btn-xs">Đang chờ duyệt trả xe</button>
                                      <div className="clearfix" />
                                    </div>) :
                                     booking.is_rental === "3" ?
                                    (
                                      <div className="vehicle_status"> <button className="btn outline btn-xs">Đang chờ xác nhận thanh toán</button>
                                        <div className="clearfix" />
                                      </div>) :
                                       <></>
                              } */}
                              <div className="vehicle_status"> <button className="btn outline btn-xs active-btn"

                                style={{ marginTop: "10px" }}>Đã thanh toán</button>
                                <div className="clearfix" />
                              </div>
                            </div>
                              :
                              <div className="vehicle_status"> <button className="btn outline btn-xs active-btn">Đã hoàn thành</button>
                                <div className="clearfix" />
                              </div>
                            }
                          </div>
                          :
                          booking.Status === "1" ?
                            <>
                              <div className="vehicle_status">
                                <button style={{ backgroundColor: "#fff", color: "red", fontWeight: "700", fontSize: "25px" }}>Xe chưa được thanh toán</button>
                                <div className="clearfix" />
                              </div>
                              <div className="vehicle_status">
                                <button style={{ backgroundColor: "#fff", color: "red", fontWeight: "700" }}>Vui lòng chọn phương thức thanh toán trong 24h</button>
                                <div className="clearfix" />
                              </div>
                              <div className="vehicle_status">
                                <Link
                                  to={`/order`}
                                  state={booking}
                                >
                                  <button className="btn outline btn-xs active-btn" style={{ marginTop: "10px" }}>
                                    Thanh toán
                                  </button>
                                </Link>

                                <div className="clearfix" />
                              </div>
                              <div className="vehicle_status"> <button className="btn outline btn-xs" onClick={() => delbooking(booking.id)}

                                style={{ marginTop: "10px" }}>Hủy booking</button>
                                <div className="clearfix" />
                              </div>
                            </> : <>




                              <div className="vehicle_status">
                                <button style={{ backgroundColor: "#fff", color: "red", fontWeight: "700" }}>Chờ xác nhận</button>
                                <div className="clearfix" />
                              </div>
                              <div className="vehicle_status">
                                <Link
                                  to={`/order`}
                                  state={booking}
                                >
                                  <button className="btn outline btn-xs active-btn" style={{ marginTop: "10px" }}>
                                    Đã thanh toán
                                  </button>
                                </Link>

                                <div className="clearfix" />
                              </div>
                              <div className="vehicle_status"> <button className="btn outline btn-xs" onClick={() => delbooking(booking.id)}

                                style={{ marginTop: "10px" }}>Hủy booking</button>
                                <div className="clearfix" />
                              </div>


                            </>}



                      </li>
                      <h5 style={{ color: 'blue' }}>Hóa đơn
                      </h5>
                      <table>
                        <tbody><tr>
                          <th>Tên xe</th>
                          <th>Từ ngày</th>
                          <th>tới ngày</th>
                          <th>Tổng ngày</th>
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
                            <th>{booking.totaldays * booking.PricePerDay}</th>
                          </tr>
                        </tbody>
                      </table>
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
export default MyBooking;

