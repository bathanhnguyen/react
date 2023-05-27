import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import {
  Home,
  ErrorPage,
  CarListing,
  ContactUs,
  AboutUs,
  Login,
  Register,
  Admin,
  PostVehical,
  ManagerVehical,
  VehicaldDetails,
  Profile,
  MyBooking,
  UpdatePass,
  EditVehicle,
  KyGui,
  NewBooking,
  ComfirmBooking,
  CancelBooking,
  BookingDetail,
  ManageBrand,
  PostBrand,
  EditBrand,
  ManageContactUs,
  Order,
  ManagerUsers,
  UpdateContactInfo,
  ManagerUsersKyGui,
  ManagerVehicalKyGui,
  EditVehicleKyGui,
  MyCarKyGui,
  TinTuc,
  ThongKeDoanhThu,
  ManageStaff,
  CreateNV
} from "./components/Pages";
import { InfoContext } from "./contextProvider/ProviderInfo";

function App() {
  const { authUser, auth, authAdmin, authStaff } = useContext(InfoContext);

  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CarListing" element={<CarListing />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/TinTuc" element={<TinTuc />} />
          <Route path="/VehicaldDetails/:id" element={<VehicaldDetails />} />
          <Route
            path="/Register"
            element={auth === true ? <Home /> : <Register />}
          />
          <Route
            path="/Login"
            element={auth === true ? <Home /> : <Login />}
          />
          <Route
            path="/Profile"
            element={authUser === true || authAdmin === true ? <Profile /> : <Login />}
          />
          <Route
            path="/MyBooking"
            element={authUser === true || authAdmin === true ? <MyBooking /> : <Login />}
          />
          <Route
            path="/MyCarKyGui"
            element={authUser === true || authAdmin === true ? <MyCarKyGui /> : <Login />}
          />
          <Route
            path="/Order"
            element={authUser === true || authAdmin === true ? <Order /> : <Login />}
          />
          <Route
            path="/UpdatePass"
            element={authUser === true || authAdmin === true ? <UpdatePass /> : <Login />}
          />
          <Route
            path="/KyGui"
            element={authUser === true || authAdmin === true ? <KyGui /> : <Login />}
          // element={<KyGui />}
          />

          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/Admin"
            element={authAdmin === true || authStaff === true ? <Admin /> : <Login />}
          />
          <Route
            path="/PostVehical"
            element={authAdmin === true ? <PostVehical /> : <Login />}
          />
          <Route
            path="/CreateNV"
            element={authAdmin === true ? <CreateNV /> : <Login />}
          />
          <Route
            path="/ManageStaff"
            element={authAdmin === true ? <ManageStaff /> : <Login />}
          />
          <Route
            path="/ManagerVehical"
            element={authAdmin === true || authStaff === true ? <ManagerVehical /> : <Login />}
          />
          <Route
            path="/ManagerVehicalKyGui"
            element={authAdmin === true || authStaff === true ? <ManagerVehicalKyGui /> : <Login />}
          />
          <Route
            path="/NewBooking"
            element={authAdmin === true || authStaff === true ? <NewBooking /> : <Login />}
          />
          <Route
            path="/ComfirmBooking"
            element={authAdmin === true || authStaff === true ? <ComfirmBooking /> : <Login />}
          />
          <Route
            path="/CancelBooking"
            element={authAdmin === true || authStaff === true ? <CancelBooking /> : <Login />}
          />
          <Route
            path="/ManageBrand"
            element={authAdmin === true || authStaff === true ? <ManageBrand /> : <Login />}
          />
          <Route
            path="/PostBrand"
            element={authAdmin === true || authStaff === true ? <PostBrand /> : <Login />}
          />
          <Route
            path="/EditBrand/:id"
            element={authAdmin === true || authStaff === true ? <EditBrand /> : <Login />}
          />
          <Route
            path="/ManageContactUs"
            element={authAdmin === true || authStaff === true ? <ManageContactUs /> : <Login />}
          />
          <Route
            path="/BookingDetail/:id"
            element={authAdmin === true || authStaff === true ? <BookingDetail /> : <Login />}
          />

          <Route
            path="/EditVehicle/:id"
            element={authAdmin === true || authStaff === true ? <EditVehicle /> : <Login />}
          />
          <Route
            path="/EditVehicleKyGui/:id"
            element={authAdmin === true || authStaff === true ? <EditVehicleKyGui /> : <Login />}
          />
          <Route
            path="/ManagerUsers"
            element={authAdmin === true || authStaff === true ? <ManagerUsers /> : <Login />}
          />
          <Route
            path="/ManagerUsersKyGui"
            element={authAdmin === true || authStaff === true ? <ManagerUsersKyGui /> : <Login />}
          />
          <Route
            path="/UpdateContactInfo"
            element={authAdmin === true || authStaff === true ? <UpdateContactInfo /> : <Login />}
          />
          <Route
            path="/ThongKeDoanhThu"
            element={authAdmin === true ? <ThongKeDoanhThu /> : <Login />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
