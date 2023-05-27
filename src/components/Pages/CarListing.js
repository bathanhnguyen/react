import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import axios from "axios";
import { InfoContext } from "../../contextProvider/ProviderInfo";


const CarListing = () => {
  const { userData, setAuthUser, setAuth, searchValue } = useContext(InfoContext);

  const [carList, setCarList] = useState([]);
  const searchRedirect = useNavigate();
  const location = useLocation();

  let search = searchValue.get("searchValue").search;

  if (search === undefined) {
    search = "";
  }
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/CarListing.php?search=${encodeURIComponent(search)}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.status === "200") {
          setCarList(response.data.car);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);


  const [brandname, setBrandName] = useState([])

  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost/car/KLTN/carrentalAPI/conponents/Brand.php',
      headers: {}
    };

    axios.request(config)
      .then((res) => {
        if (res.data.status === "200") {
          setBrandName(res.data.brand)
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getNameCarSearch = () => {
    searchValue.set(
      "searchValue",
      { search: valueSearch },
      { path: "/" }

    );

    if (location.pathname === "/Carlisting") {
      window.location.reload();
    } else {
      searchRedirect("/Carlisting");
    }
  };

  return (
    <div>
      <Header />
      <section className="page-header listing_page">
        <div className="container">
          <div className="page-header_wrap">
            <div className="page-heading">
              <h1>Danh sách xe</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Danh sách xe</li>
            </ul>
          </div>
        </div>
        <div className="dark-overlay"></div>
      </section>
      <section className="listing-page">
        <div className="container">
          <div className="row">
            <div class="col-md-9 col-md-push-3">
              <div class="result-sorting-wrapper">
                <div class="sorting-count">
                  <h4>
                    Kết quả tìm kiếm:
                    <em>
                      {search}
                    </em>
                  </h4>
                </div>
              </div>

              {carList.map((car, index) => (
                <Link to={`/VehicaldDetails/${car.id}`}>

                  <div className="product-listing-m gray-bg" key={index}>
                    <div className="product-listing-img">
                      <img
                        src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${car.Vimage1}`}
                        className="img-responsive"
                        alt="car"
                        style={{ width: "100%" }}

                      />
                    </div>

                    <div className="product-listing-content">
                      <h5>
                        <a href={car.id}>
                          {car.BrandName} , {car.VehiclesTitle}
                        </a>
                      </h5>
                      <p className="list-price">{car.PricePerDay} VND/ Ngày</p>
                      <ul>
                        <li>
                          <i className="fa fa-user" aria-hidden="true"></i>
                          Số chổ: {car.SeatingCapacity}
                        </li>
                        <li>
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                          Năm sản xuất: {car.ModelYear}
                        </li>
                        <li>
                          <i className="fa fa-car" aria-hidden="true"></i>
                          {car.FuelType}
                        </li>
                      </ul>
                      <button className="btn">
                        Xem chi tiết
                      </button>

                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <aside className="col-md-3 col-md-pull-9">
              <div className="sidebar_widget">
                <div className="widget_heading">
                  <h5>
                    <i className="fa fa-filter" aria-hidden="true"></i> Tìm kiếm xe
                  </h5>
                </div>
                <div className="sidebar_filter">
                  <form  >
                    <div className="form-group select">

                      <select className="form-control" name="brand"
                        placeholder="Vehicle brand"
                        defaultValue={brandname}
                        onChange={(e) => setValueSearch(e.target.value)}

                      >
                        {brandname.map((brand, index) => (
                          <option value={brand.BrandName} key={index}>
                            {brand.BrandName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group select">
                      <select className="form-control" name="fueltype"
                        onChange={(e) => setValueSearch(e.target.value)}

                      >
                        <option>Chọn nhiên liệu</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-block" onClick={getNameCarSearch}>
                        Tìm kiếm
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="sidebar_widget">
                <div className="widget_heading">
                  <h5>
                    <i className="fa fa-car" aria-hidden="true"></i> Xe tương tự
                  </h5>
                </div>
                <div className="recent_addedcars">
                  <ul>
                    <li className="gray-bg">
                      <div className="recent_post_img">
                        <img src="#" alt="post_img" />{" "}
                      </div>
                      <div className="recent_post_title">
                        <p className="widget_price"></p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div> */}
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default CarListing;
