import React, { useState, useEffect } from "react";
import "./css/style.css";
import axios from "axios";
import LeftBar from "../Menu/LeftBar";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Swal from "sweetalert2";
import HeaderAdmin from "../Header/HeaderAdmin";

const ManagerVehical = () => {
  const [listVehical, setListVehical] = useState([]);
  let [count, setCount] = useState(0);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost/car/KLTN/carrentalAPI/admin/GetManagerVehicles.php",
      headers: {}
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.users));
        setListVehical(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  const deletevhi = async (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost/car/KLTN/carrentalAPI/admin/Delete_Vehicles.php?id=${id}`,
      headers: {}
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));

        setCount((count) => count + 1);

        Swal.fire({
          title: "Bạn đã xóa xe thành công",
          type: "Confirm"
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      <HeaderAdmin />
      <div className=" row">
        <div className="col-4">
          <LeftBar />
        </div>
        <div className="col-8" style={{ marginTop: "100px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">Quản lý xe</h2>
                <div className="panel panel-default">
                  <div className="panel-heading">Chi tiết xe</div>
                  <div className="panel-body">
                    <table
                      id="zctb"
                      className="display table table-striped table-bordered table-hover"
                      cellSpacing={0}
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên xe</th>
                          <th>Thương hiệu </th>
                          <th>Giá /Ngày</th>
                          <th>Nhiên liệu</th>
                          <th>Năm sản xuất</th>
                          <th>Tác nhân</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>#</th>
                          <th>Tên xe</th>
                          <th>Thương hiệu </th>
                          <th>Giá /Ngày</th>
                          <th>Nhiên liệu</th>
                          <th>Năm sản xuất</th>
                          <th>Tác nhân</th>
                        </tr>
                      </tfoot>
                      <tbody>
                        {listVehical.map((vehical, index) => (
                          <tr key={index}>
                            <td>{vehical.id}</td>
                            <td>{vehical.VehiclesTitle}</td>
                            <td>{vehical.BrandName}</td>
                            <td>{vehical.PricePerDay}</td>
                            <td>{vehical.FuelType}</td>
                            <td>{vehical.ModelYear}</td>
                            <td>
                              <Link to={`/EditVehicle/${vehical.id}`}>
                                <FaEdit />
                              </Link>
                              &nbsp;&nbsp;
                              <Link>
                                <GrClose
                                  onClick={() => deletevhi(vehical.id)}
                                />
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
    </div>
  );
};
export default ManagerVehical;
