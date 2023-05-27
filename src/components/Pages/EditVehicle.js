import React, { useState, useEffect, useContext } from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import LeftBar from "../Menu/LeftBar";
import { useParams } from "react-router-dom";
// import { InfoContext } from "../../contextProvider/ProviderInfo";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "./css/style.css"

const EditVehicle = () => {

    const { id } = useParams();
    console.log(id)

    const [vehical, setVehical] = useState({});




    // const editNavigate = useNavigate();

    const [brandname, setBrandName] = useState([])

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

    useEffect(() => {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/Get_VehicalDetails.php?vhid=${id}`,
            headers: {},
        };

        axios
            .request(config)
            .then((res) => {

                if (res.data.status === "200") {
                    console.log(JSON.stringify(res.data));
                    setVehical(res.data.carDetail);

                }



            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);



    const [vehicletitle, setVehicleTitle] = useState("");
    const [brand, setBrand] = useState(1);
    const [vehicalorcView, setVehicalrcView] = useState("");
    const [priceperday, setPricePerday] = useState("");
    const [fueltype, setFuelType] = useState("");
    const [modelyear, setModelYear] = useState("");
    const [seatingcapacity, setSeatingCapacity] = useState("");

    const [airconditioner, setAirconditioner] = useState("");
    const [powerdoorlocks, setPowerdoorlocks] = useState("");
    const [antilockbrakingsys, setAntilockbrakingsys] = useState("");
    const [brakeassist, setBrakeassist] = useState("");
    const [powersteering, setPowersteering] = useState("");
    const [driverairbag, setDriverairbag] = useState("");
    const [passengerairbag, setPassengerairbag] = useState("");
    const [powerwindow, setPowerwindow] = useState("");
    const [cdplayer, setCdplayer] = useState("");
    const [centrallocking, setCentrallocking] = useState("");
    const [crashcensor, setCrashcensor] = useState("");
    const [leatherseats, setLeatherseats] = useState("");





    const handleSave = (event) => {
        event.preventDefault();
        let data = ({
            vehicletitle: vehicletitle,
            brandname: brand,
            vehicalorcview: vehicalorcView,
            priceperday: priceperday,
            fueltype: fueltype,
            modelyear: modelyear,
            seatingcapacity: seatingcapacity,
            airconditioner: airconditioner,
            powerdoorlocks: powerdoorlocks,
            antilockbrakingsys: antilockbrakingsys,
            brakeassist: brakeassist,
            powersteering: powersteering,
            driverairbag: driverairbag,
            passengerairbag: passengerairbag,
            powerwindow: powerwindow,
            cdplayer: cdplayer,
            centrallocking: centrallocking,
            crashcensor: crashcensor,
            leatherseats: leatherseats


        });
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://localhost/car/KLTN/carrentalAPI/admin/Update_Vehicles.php?id=${encodeURIComponent(id)}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data)
                if (response.data.status === "200") {
                    setVehical(response.data.car);
                    Swal.fire({
                        title: "Bạn đã cập nhật thành công",
                        type: "Confirm"
                    }).then(function () {
                        window.location.reload();

                    });

                }
            })
            .catch(function (error) {
                console.log(error);

            });

    };


    return (
        <div className="container-fluid" >

            <HeaderAdmin />
            <div className=" row">
                <div className="col-4">
                    <LeftBar />

                </div>
                <div className="col-8" style={{ marginTop: "100px" }}>
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="page-title">Chỉnh sửa xe</h2>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">Thông tin cơ bản</div>
                                            <div className="panel-body">

                                                <form >
                                                    <div className="form-group">
                                                        <label className="col-sm-2 control-label"> Tên xe<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">
                                                            <input type="text" name="vehicletitle" className="form-control" defaultValue={vehical.VehiclesTitle}
                                                                onChange={(event) => setVehicleTitle(event.target.value)}

                                                            />
                                                        </div>

                                                        <label className="col-sm-2 control-label">Chọn thương hiệu<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">



                                                            <select
                                                                className="selectpicker"
                                                                name="brandname"
                                                                placeholder="Vehicle brand"
                                                                defaultValue={brandname}
                                                                onChange={(e) => setBrand(e.target.value)}

                                                            >
                                                                {brandname.map((brand, index) => (
                                                                    <option value={brand.id} key={index}>

                                                                        {brand.BrandName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <div className="hr-dashed" />
                                                    <div className="form-group">
                                                        <label className="col-sm-2 control-label">Tổng quan về xe
                                                            <span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" name="vehicalorcview" rows={3} defaultValue={vehical.VehiclesOverview}
                                                                onChange={(event) => setVehicalrcView(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-2 control-label">Giá / 1 ngày(in VNĐ)<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">
                                                            <input type="text" name="priceperday" className="form-control" defaultValue={vehical.PricePerDay}
                                                                onChange={(event) => setPricePerday(event.target.value)}
                                                            />
                                                        </div>
                                                        <label className="col-sm-2 control-label">Chọn loại nhiên liệu<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">

                                                            <select
                                                                className="selectpicker"
                                                                name="fueltype"
                                                                placeholder="Vehicle fueltype"
                                                                defaultValue={vehical.FuelType}
                                                                onChange={(event) => setFuelType(event.target.value)}


                                                            >
                                                                <option value="Petrol">Petrol</option>
                                                                <option value="Diesel">Diesel</option>
                                                                <option value="CNG">CNG</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-sm-2 control-label">Năm sản xuất<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">
                                                            <input type="text" name="modelyear" className="form-control" defaultValue={vehical.ModelYear}
                                                                onChange={(event) => setModelYear(event.target.value)}

                                                            />
                                                        </div>
                                                        <label className="col-sm-2 control-label">Số chổ<span style={{ color: 'red' }}>*</span></label>
                                                        <div className="col-sm-4">
                                                            <input type="text" name="seatingcapacity" className="form-control" value={vehical.SeatingCapacity}
                                                                onChange={(event) => setSeatingCapacity(event.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="hr-dashed" />
                                                    <div className="form-group">
                                                        <div className="col-sm-12">
                                                            <h4><b>Ảnh xe</b></h4>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-sm-4">
                                                            Ảnh 1
                                                            <img
                                                                src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage1}`}
                                                                alt="car"
                                                                style={{ border: 'solid 1px #000', width: "300px" }} />
                                                            <Link>Chỉnh Ảnh 1</Link>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            Ảnh 2<img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage2}`}
                                                                alt="car" style={{ border: 'solid 1px #000', width: "300px" }} />
                                                            <Link>Chỉnh Ảnh 2</Link>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            Ảnh 3<img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage3}`}
                                                                alt="car" style={{ border: 'solid 1px #000', width: "300px" }} />
                                                            <Link>Chỉnh Ảnh 3</Link>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-sm-4">
                                                            Ảnh 4<img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage4}`}
                                                                alt="car" style={{ border: 'solid 1px #000', width: "300px" }} />
                                                            <Link>Chỉnh Ảnh 4</Link>
                                                        </div>
                                                        <div className="col-sm-4">
                                                            Ảnh 5

                                                            <img src={`http://localhost/car/KLTN/carrentalAPI/admin/img/vehicleimages/${vehical.Vimage5}`}
                                                                alt="car" style={{ border: 'solid 1px #000', width: "300px" }} />
                                                            <Link>Chỉnh Ảnh 5</Link>

                                                        </div>
                                                    </div>
                                                    <div className="hr-dashed" />
                                                </form></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* <div className="panel panel-default">
                                            <div className="panel-heading">Accessories</div>
                                            <div className="panel-body">
                                                <div className="form-group">
                                                    <div className="col-sm-3">

                                                        {vehical.AirConditioner === "1" ? (
                                                            <div className="checkbox checkbox-inline">
                                                                <input
                                                                    type="checkbox"
                                                                    id="inlineCheckbox1"
                                                                    name="airconditioner"
                                                                    checked
                                                                    value={1}
                                                                // onChange={handleInputChange}

                                                                />
                                                                <label htmlFor="inlineCheckbox1"> Air Conditioner </label>
                                                            </div>
                                                        ) : (
                                                            <div className="checkbox checkbox-inline">
                                                                <input
                                                                    type="checkbox"
                                                                    id="inlineCheckbox1"
                                                                    name="airconditioner"
                                                                    value={1}
                                                                // onChange={handleInputChange}

                                                                />
                                                                <label htmlFor="inlineCheckbox1"> Air Conditioner </label>
                                                            </div>
                                                        )}


                                                    </div>
                                                    <div className="col-sm-3">
                                                        {vehical.PowerDoorLocks === "1" ? (
                                                            <div className="checkbox checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="powerdoorlocks" checked value={1} />
                                                                <label htmlFor="inlineCheckbox2"> Power Door Locks </label>
                                                            </div>
                                                        ) : (
                                                            <div className="checkbox checkbox-success checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="powerdoorlocks" value={1} />
                                                                <label htmlFor="inlineCheckbox2"> Power Door Locks </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {vehical.AntiLockBrakingSystem === "1" ? (
                                                            <div className="checkbox checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="antilockbrakingsys" checked value={1} />
                                                                <label htmlFor="inlineCheckbox3"> AntiLock Braking System </label>
                                                            </div>
                                                        ) : (
                                                            <div className="checkbox checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="antilockbrakingsys" value={1} />
                                                                <label htmlFor="inlineCheckbox3"> AntiLock Braking System </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {vehical.BrakeAssist === "1" ? (
                                                            <div className="checkbox checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="brakeassist" checked value={1} />
                                                                <label htmlFor="inlineCheckbox3"> Brake Assist </label>
                                                            </div>
                                                        ) : (
                                                            <div className="checkbox checkbox-inline">
                                                                <input type="checkbox" id="inlineCheckbox1" name="brakeassist" value={1} />
                                                                <label htmlFor="inlineCheckbox3"> Brake Assist </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="col-sm-3">
                                                            {vehical.PowerSteering === "1" ? (


                                                                <div className="checkbox checkbox-inline">
                                                                    <input type="checkbox" id="inlineCheckbox1" name="powersteering" checked value={1} />
                                                                    <label htmlFor="inlineCheckbox1"> Power Steering </label>
                                                                </div>
                                                            ) : (
                                                                <div className="checkbox checkbox-inline">
                                                                    <input type="checkbox" id="inlineCheckbox1" name="powersteering" value={1} />
                                                                    <label htmlFor="inlineCheckbox1"> Power Steering </label>
                                                                </div>


                                                            )}
                                                        </div>
                                                        <div className="col-sm-3">
                                                            {vehical.DriverAirbag === "1" ? (

                                                                <div className="checkbox checkbox-inline">
                                                                    <input type="checkbox" id="inlineCheckbox1" name="driverairbag" checked value={1} />
                                                                    <label htmlFor="inlineCheckbox2">Driver Airbag</label>
                                                                </div>
                                                            ) : (
                                                                <div className="checkbox checkbox-inline">
                                                                    <input type="checkbox" id="inlineCheckbox1" name="driverairbag" value={1} />
                                                                    <label htmlFor="inlineCheckbox2">Driver Airbag</label>

                                                                </div>
                                                            )}
                                                            <div className="col-sm-3">
                                                                {vehical.PassengerAirbag === "1" ? (

                                                                    <div className="checkbox checkbox-inline">
                                                                        <input type="checkbox" id="inlineCheckbox1" name="passengerairbag" checked value={1} />
                                                                        <label htmlFor="inlineCheckbox3"> Passenger Airbag </label>
                                                                    </div>
                                                                ) : (
                                                                    <div className="checkbox checkbox-inline">
                                                                        <input type="checkbox" id="inlineCheckbox1" name="passengerairbag" value={1} />
                                                                        <label htmlFor="inlineCheckbox3"> Passenger Airbag </label>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="col-sm-3">
                                                                {vehical.PowerWindows === "1" ? (

                                                                    <div className="checkbox checkbox-inline">
                                                                        <input type="checkbox" id="inlineCheckbox1" name="powerwindow" checked value={1} />
                                                                        <label htmlFor="inlineCheckbox3"> Power Windows </label>
                                                                    </div>
                                                                ) : (
                                                                    <div className="checkbox checkbox-inline">
                                                                        <input type="checkbox" id="inlineCheckbox1" name="powerwindow" value={1} />
                                                                        <label htmlFor="inlineCheckbox3"> Power Windows </label>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-3">
                                                                    {vehical.CDPlayer === "1" ? (

                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="cdplayer" checked value={1} />
                                                                            <label htmlFor="inlineCheckbox1"> CD Player </label>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="cdplayer" value={1} />
                                                                            <label htmlFor="inlineCheckbox1"> CD Player </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    {vehical.CentralLocking === "1" ? (

                                                                        <div className="checkbox  checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="centrallocking" checked value={1} />
                                                                            <label htmlFor="inlineCheckbox2">Central Locking</label>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="checkbox checkbox-success checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="centrallocking" value={1} />
                                                                            <label htmlFor="inlineCheckbox2">Central Locking</label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    {vehical.CrashSensor === "1" ? (

                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="crashcensor" checked value={1} />
                                                                            <label htmlFor="inlineCheckbox3"> Crash Sensor </label>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="crashcensor" value={1} />
                                                                            <label htmlFor="inlineCheckbox3"> Crash Sensor </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    {vehical.LeatherSeats === "1" ? (

                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="leatherseats" checked value={1} />
                                                                            <label htmlFor="inlineCheckbox3"> Leather Seats </label>
                                                                        </div>
                                                                    ) : (

                                                                        <div className="checkbox checkbox-inline">
                                                                            <input type="checkbox" id="inlineCheckbox1" name="leatherseats" value={1} />
                                                                            <label htmlFor="inlineCheckbox3"> Leather Seats </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                          
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="form-group">
                                            <div className="col-sm-8 col-sm-offset-2">
                                                <button className="btn btn-primary" name="submit" type="submit" onClick={handleSave} style={{ marginTop: '4%' }}>Save changes</button>
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
export default EditVehicle;
