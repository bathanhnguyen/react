import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const registerNavigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [password, setPassWord] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const patternPhone = /^\+?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/im;

    const dateParts = dob.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    // const patternPhone =
    //   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const patternEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formattedDate === "") {
      setErrorMessage("Bạn cần phải nhập ngày sinh!");
    }
    if (password === "") {
      setErrorMessage("Mật khẩu không được để trống!");
    }
    if (address === "") {
      setErrorMessage("Bạn cần phải nhập địa chỉ!");
    }
    if (city === "") {
      setErrorMessage("Bạn cần phải nhập thành phố!");
    }

    if (patternPhone.test(contactno) === false) {
      setErrorMessage("Số điện thoại bạn nhập chưa đúng");
    }
    if (patternEmail.test(email) === false) {
      setErrorMessage("Email bạn nhập không đúng định dạng");
    }

    if (fullName === "") {
      setErrorMessage("Bạn cần phải nhập tên!");
    }

    if (
      fullName !== "" &&
      password !== "" &&
      address !== "" &&
      city !== "" &&
      formattedDate !== "" &&
      patternPhone.test(contactno) === true &&
      patternEmail.test(email) === true
    ) {
      let data = {
        fullname: fullName,
        email: email,
        contactno: contactno,
        password: password,
        dob: formattedDate,
        address: address,
        city: city,
        country: country,

      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost/car/KLTN/carrentalAPI/Register.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios
        .request(config)
        .then((res) => {
          // console.log(JSON.stringify(res.data));

          if (res.data.status === "200") {
            Swal.fire({
              title: "Bạn đã đăng ký tài khoản thành công",
              text: "Vui lòng đăng nhập để sử dụng",
              type: "Confirm",
            }).then(function () {
              registerNavigate("/login");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://static.danhgiaxe.com/data/201525/10-volkswagen-scirocco-based-on-the-fantastic-volkswagen-gti-the-scirocco-offers-a-wide-stance-and-an-aggressive-angular-front-headlight-and-grille-combo_323.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng ký
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Họ và tên"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactno"
                label="Số điện thoại"
                name="contactno"
                autoComplete="contactno"
                autoFocus
                onChange={(e) => {
                  setContactNo(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="dob"
                // label="Ngày sinh"
                name="dob"
                autoComplete="dob"
                type="date"

                autoFocus
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Địa chỉ"
                name="address"
                autoComplete="address"
                autoFocus
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="Thành phố"
                name="city"
                autoComplete="city"
                autoFocus
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassWord(e.target.value);
                }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <div style={{ color: "red" }} className="errorMess">{errorMessage}</div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/Login" variant="body2">
                    {"Bạn đã có tài khoản? Đăng nhập"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
