import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { InfoContext } from "../../contextProvider/ProviderInfo";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import { useNavigate } from "react-router-dom";



const KyGui = () => {
    const { userData } = useContext(InfoContext);

    const id = userData.get("userData").id;
    console.log(id)
    const [brandname, setBrandName] = useState([])
    const kyguisusess = useNavigate();

    useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost/car/KLTN/carrentalAPI/conponents/Brand.php',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                setBrandName(response.data.brand)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // const [vehicletitle, setVehicleTitle] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [file5, setFile5] = useState(null);

    const [vehicletitle, setVehicleTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [vehicleoverview, setVehicleOverview] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("img1", file1);
        formData.append("img2", file2);
        formData.append("img3", file3);
        formData.append("img4", file4);
        formData.append("img5", file5);

        formData.append("vehicletitle", vehicletitle);
        formData.append("brandname", brand);
        formData.append("vehicalorcview", vehicleoverview);
        formData.append("priceperday", priceperday);
        formData.append("id", id);

        formData.append("fueltype", fueltype);
        formData.append("modelyear", modelyear);
        formData.append("airconditioner", airconditioner);
        formData.append("powerdoorlocks", powerdoorlocks);
        formData.append("antilockbrakingsys", antilockbrakingsys);
        formData.append("brakeassist", brakeassist);
        formData.append("seatingcapacity", seatingcapacity);
        formData.append("powersteering", powersteering);
        formData.append("driverairbag", driverairbag);
        formData.append("passengerairbag", passengerairbag);
        formData.append("powerwindow", powerwindow);
        formData.append("passengerairbag", passengerairbag);
        formData.append("cdplayer", cdplayer);
        formData.append("centrallocking", centrallocking);
        formData.append("crashcensor", crashcensor);
        formData.append("leatherseats", leatherseats);

        axios
            .post(
                `http://localhost/car/KLTN/carrentalAPI/Post_xekygui.php`,
                formData,

                {
                    headers:
                        'Content-Type: application/json'
                }


            )
            .then((res) => {
                console.log(res.data.status);
                if (res.data.status === "200") {
                    Swal.fire({
                        title: "Bạn đã ký gửi xe thành công thành công",
                        type: "Confirm",
                    })
                        .then(function () {
                            kyguisusess("/MyCarKyGui");
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
            <div className="ts-main-content">
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="page-title">Ký gửi xe</h2>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">Thông tin cơ bản</div>

                                                    <div className="panel-body">
                                                        <form

                                                        >
                                                            <div className="form-group">
                                                                <label className="col-sm-2 control-label">
                                                                    Tên xe
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        type="text"
                                                                        name="vehicletitle"
                                                                        className="form-control"
                                                                        placeholder="Vehicle title"
                                                                        value={vehicletitle}
                                                                        onChange={(e) =>
                                                                            setVehicleTitle(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                                <label className="col-sm-2 control-label">
                                                                    Thương hiệu
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
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
                                                                <label className="col-sm-2 control-label">
                                                                    Tổng quan về xe

                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-10">
                                                                    <textarea
                                                                        className="form-control"
                                                                        name="vehicleoverview"
                                                                        rows={3}
                                                                        required
                                                                        defaultValue={""}
                                                                        placeholder="Vehicle vehicleoverview"
                                                                        value={vehicleoverview}
                                                                        onChange={(e) =>
                                                                            setVehicleOverview(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="col-sm-2 control-label">
                                                                    Giá / 1 ngày (VNĐ)
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        type="text"
                                                                        name="priceperday"
                                                                        className="form-control"
                                                                        required
                                                                        placeholder="Vehicle price"
                                                                        value={priceperday}
                                                                        onChange={(e) =>
                                                                            setPricePerday(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                                <label className="col-sm-2 control-label">
                                                                    Chọn loại nhieen liệu
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <select
                                                                        className="selectpicker"
                                                                        name="fueltype"
                                                                        required
                                                                        placeholder="Vehicle fueltype"
                                                                        value={fueltype}
                                                                        onChange={(e) =>
                                                                            setFuelType(e.target.value)
                                                                        }
                                                                    >
                                                                        <option value> Chọn </option>
                                                                        <option value="Petrol">Petrol</option>
                                                                        <option value="Diesel">Diesel</option>
                                                                        <option value="CNG">CNG</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="col-sm-2 control-label">
                                                                    Năm sản xuất
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        type="text"
                                                                        name="modelyear"
                                                                        className="form-control"
                                                                        required
                                                                        placeholder="Vehicle modelyear"
                                                                        value={modelyear}
                                                                        onChange={(e) =>
                                                                            setModelYear(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                                <label className="col-sm-2 control-label">
                                                                    Số chổ
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        type="text"
                                                                        name="seatingcapacity"
                                                                        className="form-control"
                                                                        required
                                                                        placeholder="Vehicle seatingcapacity"
                                                                        value={seatingcapacity}
                                                                        onChange={(e) =>
                                                                            setSeatingCapacity(e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="hr-dashed" />
                                                            <div className="form-group">
                                                                <div className="col-sm-12">
                                                                    <h4>
                                                                        <b>Tải ảnh</b>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-4">
                                                                    Ảnh 1{" "}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            setFile1(e.target.files[0])
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    Ảnh 2<span style={{ color: "red" }}>*</span>
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            setFile2(e.target.files[0])
                                                                        }
                                                                    />{" "}
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    Ảnh 3<span style={{ color: "red" }}>*</span>
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            setFile3(e.target.files[0])
                                                                        }
                                                                    />{" "}
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="col-sm-4">
                                                                    Ảnh 4<span style={{ color: "red" }}>*</span>
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            setFile4(e.target.files[0])
                                                                        }
                                                                    />{" "}
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    Ảnh 5{" "}
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) =>
                                                                            setFile5(e.target.files[0])
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="hr-dashed" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="panel panel-default">
                                                    <div className="panel-heading">Phụ kiện</div>
                                                    <div className="panel-body">
                                                        <div className="form-group">
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="airconditioner"
                                                                        name="airconditioner"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle airconditioner"
                                                                        onChange={(e) =>
                                                                            setAirconditioner(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="airconditioner">
                                                                        {" "}
                                                                        Điều hòa{" "}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="powerdoorlocks"
                                                                        name="powerdoorlocks"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle powerdoorlocks"
                                                                        onChange={(e) =>
                                                                            setPowerdoorlocks(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="powerdoorlocks">

                                                                        Khóa cửa điện
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="antilockbrakingsys"
                                                                        name="antilockbrakingsys"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle antilockbrakingsys"
                                                                        onChange={(e) =>
                                                                            setAntilockbrakingsys(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="antilockbrakingsys">
                                                                        {" "}
                                                                        Hệ thống chống bó cứng phanh{" "}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="checkbox checkbox-inline">
                                                                <input
                                                                    type="checkbox"
                                                                    id="brakeassist"
                                                                    name="brakeassist"
                                                                    defaultValue={1}
                                                                    placeholder="Vehicle brakeassist"
                                                                    onChange={(e) =>
                                                                        setBrakeassist(e.target.value)
                                                                    }
                                                                />
                                                                <label htmlFor="brakeassist">
                                                                    {" "}
                                                                    Hỗ trợ phanh
                                                                    {" "}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">

                                                                    <input
                                                                        type="checkbox"
                                                                        id="powersteering"
                                                                        name="powersteering"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle powersteering"
                                                                        onChange={(e) =>
                                                                            setPowersteering(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="powersteering">

                                                                        Tay lái trợ lực

                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="driverairbag"
                                                                        name="driverairbag"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle driverairbag"
                                                                        onChange={(e) =>
                                                                            setDriverairbag(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="driverairbag">
                                                                        Túi khí tài xế
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="passengerairbag"
                                                                        name="passengerairbag"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle passengerairbag"
                                                                        onChange={(e) =>
                                                                            setPassengerairbag(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="passengerairbag">
                                                                        {" "}
                                                                        Túi khí hành khách
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="checkbox checkbox-inline">
                                                                <input
                                                                    type="checkbox"
                                                                    id="powerwindow"
                                                                    name="powerwindow"
                                                                    defaultValue={1}
                                                                    placeholder="Vehicle powerwindow"
                                                                    onChange={(e) =>
                                                                        setPowerwindow(e.target.value)
                                                                    }
                                                                />
                                                                <label htmlFor="powerwindow">
                                                                    {" "}
                                                                    Cửa sổ điện{" "}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="cdplayer"
                                                                        name="cdplayer"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle cdplayer"
                                                                        onChange={(e) =>
                                                                            setCdplayer(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="cdplayer"> Máy nghe nhạc </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox h checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="centrallocking"
                                                                        name="centrallocking"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle centrallocking"
                                                                        onChange={(e) =>
                                                                            setCentrallocking(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="centrallocking">
                                                                        Khóa trung tâm

                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="crashcensor"
                                                                        name="crashcensor"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle crashcensor"
                                                                        onChange={(e) =>
                                                                            setCrashcensor(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="crashcensor">
                                                                        {" "}
                                                                        Cảm biến va chạm
                                                                        {" "}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <div className="checkbox checkbox-inline">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="leatherseats"
                                                                        name="leatherseats"
                                                                        defaultValue={1}
                                                                        placeholder="Vehicle leatherseats"
                                                                        onChange={(e) =>
                                                                            setLeatherseats(e.target.value)
                                                                        }
                                                                    />
                                                                    <label htmlFor="leatherseats">
                                                                        {" "}
                                                                        Ghế da
                                                                        {" "}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="col-sm-8 col-sm-offset-2">
                                                        <button
                                                            className="btn btn-default"
                                                            type="reset"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="btn btn-primary"
                                                            name="submit"
                                                            type="submit"
                                                        >
                                                            Ký gửi xe
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default KyGui;
