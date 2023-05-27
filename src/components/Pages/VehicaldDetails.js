import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Swal from "sweetalert2";
import Header from "../Menu/Header";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";
import Swal from "sweetalert2";
import Booking from "./test"


const VehicaldDetails = () => {
  const { userData } = useContext(InfoContext);
  const email = userData.get("userData").email;
  const status = userData.get("userData").status;
  const [statusRedirect, setStatusRedirect] = useState(false);
  const { id } = useParams();


  const [vehical, setVehical] = useState({});
  const [booking, setBooking] = useState({});
  // const [vehiclesBrand, setVehiclesBrand] = useState("");
  const branid = (vehical.VehiclesBrand)
  const bookingNavigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [dateCurrent, setDateCurrent] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateCurrent(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = `${dateCurrent.getDate().toString().padStart(2, '0')}/${(dateCurrent.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${dateCurrent.getFullYear()}`;
  // console.log(currentDate + "ngày hiện tại")


  // console.log(JSON.stringify("data" + vehical));
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Get_VehicalDetails.php?vhid=${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response));
        setVehical(response.data.carDetail);
        // setVehiclesBrand(response.data.carDetail[0].VehiclesBrand)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // const [fromdate, setFromDate] = useState("");
  // const [todate, setToDate] = useState("");
  const [message, setMessage] = useState("");


  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Get_DateBooking.php?vid=${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === '200') {
          setBookedDates(response.data.date);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFromDateChange = (date) => {
    setFromDate(date);
    setToDate(null); // Reset toDate when changing fromDate
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleBooking = () => {
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
  };

  const isBookedDate = (date) => {
    return bookedDates.includes(date);
  };

  const renderDay = (day) => {
    const isBooked = isBookedDate(day.toISOString().split('T')[0]);
    const isFutureDay = day > new Date();

    const dayClassName = isBooked ? 'booked-day' : '';
    const additionalClass = isFutureDay ? '' : 'disabled-day';

    return (
      <div className={`custom-day ${dayClassName} ${additionalClass}`}>
        {day.getDate()}
      </div>
    );
  };

  const excludeDates = bookedDates.map((date) => new Date(date));
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // const filterPassedDate = (date) => {
  //   return date > fromDate || !fromDate; // Hiển thị ngày sau fromDate hoặc không có fromDate
  // };
  const filterPassedDate = (date) => {
    return (date > fromDate && date > today) || !fromDate; // Thêm điều kiện date > today
  };






  if (statusRedirect === true) {
    bookingNavigate("/order", { state: booking });
  }
  // const phone = userData.get("userData").phone;

  const handleSubmit = (event) => {

    // if (fromdate > currentDate) {
    //   setErrorMessage("Chọn ngày không đúng!");
    // }


    event.preventDefault();
    let data = {
      fromdate: fromDate,
      todate: toDate,
      message: message,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/Booking.php?vhid=${id}&email=${email}&price=${vehical.PricePerDay}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        if (res.data.status === "200") {
          setBooking(res.data.newBooking)
          Swal.fire({
            title: "Booking thành công vui lòng chọn phương thức thanh toán",
            text: "Nếu bạn không xác nhận phương thức thanh toán, đơn hàng sẽ tự xóa sau 24h",
            type: "Confirm",
          })
            .then(function () {
              setStatusRedirect(true);

            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const [similarCar, setSimilarCar] = useState([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/conponents/Get_SimilarCars.php?brandid=${branid}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.SimilarCar));
        setSimilarCar(response.data.SimilarCar)

      })
      .catch((error) => {
        console.log(error);
      });


  }, [branid]);



  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    Accessibility: true,
    touchMove: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [selectedCase, setSelectedCase] = useState("case1");

  const handleButtonClick = (caseName) => {
    setSelectedCase(caseName);
  };

  return (
    <DetailDiv>
      <div>
        <div>
          <Header />
          <section id="listing_img_slider">
            <Slider {...settings}>
              <div>
                <img
                  src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage1}`}
                  className="img-responsive"
                  alt="car"
                  width={900}
                  height={350}
                />
              </div>
              <div>
                <img
                  src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage2}`}
                  className="img-responsive"
                  alt="car"
                  width={900}
                  height={350}
                />
              </div>
              <div>
                <img
                  src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage3}`}
                  className="img-responsive"
                  alt="car"
                  width={900}
                  height={350}
                />
              </div>
              <div>
                <img
                  src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage4}`}
                  className="img-responsive"
                  alt="car"
                  width={900}
                  height={350}
                />
              </div>

              <div>
                <img
                  src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage5}`}
                  className="img-responsive"
                  alt="car"
                  width={900}
                  height={350}
                />
              </div>
            </Slider>
          </section>
          <section className="listing-detail">
            <div className="container">
              <div className="listing_detail_head row">
                <div className="col-md-9">
                  <h2>
                    {vehical.BrandName} ,{vehical.VehiclesTitle}
                  </h2>
                </div>
                <div className="col-md-3">
                  <div className="price_info">
                    <p>{vehical.PricePerDay} VND/Ngày </p>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  <div className="main_features">
                    <ul>
                      <li>
                        <i className="fa fa-calendar" aria-hidden="true" />
                        <h5>{vehical.ModelYear}</h5>
                        <p>Năm sản xuất</p>
                      </li>
                      <li>
                        <i className="fa fa-cogs" aria-hidden="true" />
                        <h5>{vehical.FuelType}</h5>
                        <p>Nhiên liệu</p>
                      </li>
                      <li>
                        <i className="fa fa-user-plus" aria-hidden="true" />
                        <h5>{vehical.SeatingCapacity}</h5>
                        <p>số chổ</p>
                      </li>
                    </ul>
                  </div>
                  <div className="listing_more_info">
                    <div className="listing_detail_wrap">
                      {/* Nav tabs */}
                      <ul className="nav nav-tabs gray-bg" role="tablist">
                        <li role="presentation" className="active">
                          <button
                            href="#vehicle-overview "
                            aria-controls="vehicle-overview"
                            role="tab"
                            data-toggle="tab"
                            value="option1"
                            onClick={() => handleButtonClick("case1")}
                            style={{ height: "50px" }}
                          >
                            Tổng quan về xe
                          </button>
                        </li>

                        <li role="presentation">
                          <button
                            href="#accessories"
                            aria-controls="accessories"
                            role="tab"
                            data-toggle="tab"
                            value="option2"

                            onClick={() => handleButtonClick("case2")}
                            style={{ height: "50px" }}

                          >
                            Phụ kiện
                          </button>
                        </li>
                      </ul>
                      {selectedCase && (
                        <div>
                          {selectedCase === "case1" && <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="vehicle-overview"
                          >
                            <p>{vehical.VehiclesOverview}</p>
                          </div>}
                          {selectedCase === "case2" && <div
                            role="tabpanel"
                            className="tab-pane"
                            id="accessories"
                          >
                            <table>

                              <tbody>
                                <tr>
                                  <td>Máy điều hòa
                                  </td>
                                  <td>
                                    {vehical.AirConditioner === 1 ? (

                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hệ thống chống bó cứng phanh
                                  </td>
                                  <td>
                                    {vehical.AntiLockBrakingSystem === 1 ? (
                                      <i
                                        className="fa fa-check"
                                        aria-hidden="true"
                                      ><AiOutlineCheckCircle /></i>
                                    ) : (
                                      <i
                                        className="fa fa-close"
                                        aria-hidden="true"
                                      ><AiOutlineCloseCircle /></i>
                                    )}
                                  </td>
                                </tr>

                                <tr>
                                  <td>Tay lái trợ lực
                                  </td>
                                  {vehical.PowerSteering === 1 ? (
                                    <td>
                                      <AiOutlineCheckCircle />
                                    </td>
                                  ) : (
                                    <td>
                                      <AiOutlineCloseCircle />
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <td>Cửa sổ điện
                                  </td>
                                  <td>
                                    {vehical.PowerWindows === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Âm thanh</td>
                                  <td>
                                    {vehical.CDPlayer === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Ghế da
                                  </td>
                                  <td>
                                    {vehical.LeatherSeats === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Khóa trung tâm
                                  </td>
                                  <td>
                                    {vehical.CentralLocking === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Khóa cửa điện
                                  </td>
                                  <td>
                                    {vehical.PowerDoorLocks === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hỗ trợ phanh
                                  </td>
                                  <td>
                                    {vehical.BrakeAssist === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Túi khí người lái
                                  </td>
                                  <td>
                                    {vehical.DriverAirbag === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Túi khí hành khách
                                  </td>
                                  <td>
                                    {vehical.PassengerAirbag === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Cảm biến va chạm
                                  </td>
                                  <td>
                                    {vehical.CrashSensor === 1 ? (
                                      <AiOutlineCheckCircle />
                                    ) : (
                                      <AiOutlineCloseCircle />
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>}

                        </div>
                      )}
                      {/* Tab a
                      nes */}
                      <div className="tab-content">


                      </div>
                    </div>
                  </div>
                </div>
                {/*Side-Bar*/}
                <aside className="col-md-3">

                  <div className="sidebar_widget">
                    <div className="widget_heading">
                      <h5>
                        <i className="fa fa-envelope" aria-hidden="true" />
                        Đặt ngay
                      </h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {/* <div className="form-group">
                        <label>From Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="fromdate"
                          placeholder="From Date"


                          required
                          value={fromdate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>To Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="todate"
                          placeholder="To Date"
                          required
                          value={todate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div> */}
                      <div className="form-group">
                        <label>Từ ngày:</label>

                        <DatePicker
                          selectsStart
                          selected={fromDate}
                          minDate={minDate}
                          startDate={fromDate}
                          endDate={toDate}
                          onChange={handleFromDateChange}
                          renderDay={renderDay}
                          excludeDates={excludeDates}
                          className="form-control"
                          name="fromdate"

                          placeholderText="Chọn ngày nhận xe"
                        />
                      </div>


                      <div className="form-group">
                        <label>Tới ngày:</label>

                        <DatePicker
                          selectsEnd
                          selected={toDate}
                          minDate={fromDate || minDate} // Chỉ cho phép chọn ngày từ fromDate trở đi
                          startDate={fromDate}
                          endDate={toDate}
                          onChange={handleToDateChange}
                          renderDay={renderDay}
                          className="form-control"
                          name="todate"
                          placeholderText="Chọn ngày trả xe"
                          filterDate={filterPassedDate}
                          excludeDates={excludeDates}

                        />
                      </div>


                      <div className="form-group">
                        <textarea
                          rows={4}
                          className="form-control"
                          name="message"
                          placeholder="Lời nhắn"
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      {status === "200" ? (
                        <div className="form-group">

                          <button
                            type="submit"
                            className="btn"
                            name="submit"

                          > Đặt xe
                          </button>


                        </div>
                      ) : (
                        <Link
                          to="/login"
                          className="btn btn-xs uppercase"
                          data-toggle="modal"
                          data-dismiss="modal"
                        >
                          Đăng nhập để thuê xe
                        </Link>
                      )
                      }
                      <div style={{ color: "red" }} className="errorMess">{errorMessage}</div>

                    </form>
                  </div>
                </aside>
                {/*/Side-Bar*/}
              </div>
              <div className="space-20" />
              <div className="divider" />


              <div className="similar_cars">
                <h3>Xe tương tự</h3>
                <div className="row">
                  {similarCar.map((car, index) => {
                    return (
                      <div className="col-md-3 grid_listing">
                        <Link to={`/VehicaldDetails/${car.id}`}>

                          <div className="product-listing-m gray-bg" key={index}>
                            <div className="product-listing-img">


                              <img
                                src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${car.Vimage1}`}
                                className="img-responsive"
                                alt="ddd"
                              />

                            </div>
                            <div className="product-listing-content">
                              <h5>
                                {car.BrandName}
                                , {car.VehiclesTitle}
                              </h5>
                              <p className="list-price">
                                Giá / Ngày {car.PricePerDay} VNĐ
                              </p>
                              <ul className="features_list">
                                <li>
                                  <i className="fa fa-user" aria-hidden="true" />
                                  Số chổ: {car.SeatingCapacity}
                                </li>
                                <li>
                                  <i className="fa fa-calendar" aria-hidden="true" />
                                  sản xuất năm: {car.ModelYear}

                                </li>
                                <li>
                                  <i className="fa fa-car" aria-hidden="true" />
                                  Nhiên liệu: {car.FuelType}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </section>
        </div>
      </div >
    </DetailDiv >
  );
};

const DetailDiv = styled.div`
/* Slider */
.arrow {
    background-color: black;
    position: absolute;
    cursor: pointer;
    z-index: 10;
    font-size: 35px;
    color: #fff;
  }

  .arrow svg {
    transition: color 300ms;
  }

  .arrow svg:hover {
    color: red;
  }

  .next {
    right: 1%;
    top: 45%;
  }

  .prev {
    left: 1%;
    top: 45%;
  }
  .custom-date-time.disabled-date-time {
    background-color: #f8d7da;
    color: #721c24;
    cursor: not-allowed;
    text-decoration: line-through;
    color: red;
  }
.slick-slider
{
    position: relative;

    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}

.slick-list
{
    position: relative;

    display: block;
    overflow: hidden;

    margin: 0;
    padding: 0;
}
.slick-list:focus
{
    outline: none;
}
.slick-list.dragging
{
    cursor: pointer;
    cursor: hand;
}

.slick-slider .slick-track,
.slick-slider .slick-list
{
    -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
         -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}

.slick-track
{
    position: relative;
    top: 0;
    left: 0;

    display: block;
}
.slick-track:before,
.slick-track:after
{
    display: table;

    content: '';
}
.slick-track:after
{
    clear: both;
}
.slick-loading .slick-track
{
    visibility: hidden;
}

.slick-slide
{
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
}
[dir='rtl'] .slick-slide
{
    float: right;
}
.slick-slide img
{
    display: block;
}
.slick-slide.slick-loading img
{
    display: none;
}
.slick-slide.dragging img
{
    pointer-events: none;
}
.slick-initialized .slick-slide
{
    display: block;
}
.slick-loading .slick-slide
{
    visibility: hidden;
}
.slick-vertical .slick-slide
{
    display: block;

    height: auto;

    border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
    display: none;
}
`
export default VehicaldDetails;
