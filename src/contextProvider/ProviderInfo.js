import React, { createContext, useEffect, useState } from "react";
// import { linkApi } from "../components/utils/linkApi";
import Cookies from "universal-cookie";

export const InfoContext = createContext({});
export const InfoProvider = ({ children }) => {
  // userData is cookie storage user
  const userData = new Cookies();
  const searchValue = new Cookies();

  // is cookie storage shoping cart

  const cartCookie = new Cookies();

  // value in cart, if cartData in cookie = undefined, defaul value is "", else get cart data from Cookie
  const [cart, setCart] = useState(() => {
    if (cartCookie.get("cartData") === undefined) {
      return [];
    } else {
      return cartCookie.get("cartData");
    }
  });

  // authUser for Learner, check userData = undefine or "" then default value is "false", else follow conditional bellow for check require auth
  const [authUser, setAuthUser] = useState(() => {
    if (
      userData.get("userData") !== undefined &&
      userData.get("userData") !== ""
    ) {
      if (
        userData.get("userData").id !== "" &&
        userData.get("userData").roleid === '2' &&
        userData.get("userData").status === "200" &&
        userData.get("userData").token !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else return false;
  });
  // auth like authUser, but for all user
  const [auth, setAuth] = useState(() => {
    if (
      userData.get("userData") !== undefined &&
      userData.get("userData") !== ""
    ) {
      if (
        userData.get("userData").status === "200" &&
        userData.get("userData").id !== "" &&
        userData.get("userData").token !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else return false;
  });
  const [authAdmin, setAuthAdmin] = useState(() => {
    if (
      userData.get("userData") !== undefined &&
      userData.get("userData") !== ""
    ) {
      if (
        userData.get("userData").id !== "" &&
        userData.get("userData").roleid === '0' &&
        userData.get("userData").status === "200" &&
        userData.get("userData").token !== ""
      ) {
        return true;
      } else {
        return false;
      }
    } else return false;
  });
  const [authStaff, setAuthStaff] = useState(() => {
    if (
      userData.get("userData") !== undefined &&
      userData.get("userData") !== ""
    ) {
      if (
        userData.get("userData").status === "200" &&
        userData.get("userData").id !== "" &&
        userData.get("userData").token !== "" &&
        userData.get("userData").roleid === '1'
      ) {
        return true;
      } else {
        return false;
      }
    } else return false;
  });

  useEffect(() => {
    // create cookie defaul when user has no cookie
    if (userData.get("userData") === undefined) {
      userData.set(
        "userData",
        {
          id: "",
          token: "",
          roleId: "",
          email: "",
          status: 400,
        },
        { path: "/" }
      );
      if (searchValue.get("searchValue") === undefined) {
        searchValue.set("searchValue", "", { path: "/" });
      }
    }
  }, [userData, searchValue]);

  // useEffect(() => {
  //   if (userData.get("userData") === undefined) {
  //     Swal.fire({
  //       title: "Error",
  //       text: "Bạn cần đăng nhập",
  //       type: "error",
  //     }).then(function () {
  //       // Redirect the user
  //       window.location.href = "/login";
  //     });
  //   } else {
  //     console.log("not null!!!");
  //   }

  // }, []);

  // if (cartCookie.get("cartData") === undefined) {
  //   cartCookie.set("cartData", [], { path: "/" });
  // }

  // useEffect(() => {
  //   if (userData.get("userData") === undefined) {
  //     Swal.fire({
  //       title: "Error",
  //       text: "Bạn cần đăng nhập",
  //       type: "error",
  //     }).then(function () {
  //       // Redirect the user
  //       window.location.href = "/login";
  //     });
  //   } else {
  //     console.log("not null!!!");
  // }, []);

  return (
    <InfoContext.Provider
      value={{
        userData,
        cart,
        setCart,
        cartCookie,
        authUser,
        auth,
        setAuthUser,
        setAuth,
        authAdmin,
        setAuthAdmin,
        authStaff,
        setAuthStaff,
        searchValue,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};
