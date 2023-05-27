import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../App.css";



export const RecentCar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost/car/KLTN/carrentalAPI/RecentlyListedNewCars.php?isconfirm=0",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.users));
        setData(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="section-padding gray-bg">
      <div className="container">
        <div className="section-header text-center">
          <h2>
            <span>Xe dành cho bạn</span>
          </h2>
          <p>
            Có rất nhiều biến thể của các đoạn Lorem Ipsum có sẵn, nhưng
            phần lớn đã bị thay đổi trong một số hình thức, bằng cách tiêm
            hài hước hoặc những từ ngẫu nhiên trông không giống chút nào
            đáng tin cậy. Nếu bạn định sử dụng một đoạn văn của Lorem Ipsum, bạn
            cần phải chắc chắn rằng không có bất cứ điều gì đáng xấu hổ ẩn trong
            giữa văn bản.
          </p>
        </div>
        <div className="row">
          <div className="recent-tab">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active">
                <a href="#resentnewcar" role="tab" data-toggle="tab">
                  Xe mới                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="resentnewcar">
              {data.map((car, index) => (
                <div className="col-list-3" key={index}>
                  <Link to={`/VehicaldDetails/${car.id}`}>
                    <div className="recent-car-list">
                      <div className="car-info-box">
                        <Link to={`/VehicaldDetails/${car.id}`}>
                          <img
                            src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${car.Vimage1}`}
                            className="img-responsive"
                            alt="imagerr"
                            style={{ width: "100%" }}
                          ></img>
                        </Link>
                        <ul>
                          <li>
                            <i className="fa fa-car" aria-hidden="true"></i>
                            Loại nhiên liệu: {car.FuelType}
                          </li>
                          <li>
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                            Năm sản xuất: {car.ModelYear}
                          </li>
                          <li>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            Số chổ: {car.SeatingCapacity}
                          </li>


                        </ul>
                      </div>
                      <div className="car-title-m">
                        <h6>{car.VehiclesTitle}</h6>
                        <span className="price">{car.PricePerDay} VNĐ/ Ngày</span>
                      </div>
                      <div className="inventory_info_m">
                        <p style={{
                          wordWrap: "break-word",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis"
                        }}

                        >{car.VehiclesOverview}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
