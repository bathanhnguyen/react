import React, { useContext, useEffect, useState } from "react";
import { InfoContext } from "../../contextProvider/ProviderInfo";
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

export default function Login() {

  const {
    userData,
    setAuth,
    setAuthUser,
    setAuthAdmin,
    setAuthStaff,
  } = useContext(InfoContext);
  // create redirect with useNavigate
  const loginAdmin = useNavigate();
  // const ActiveAccount = useNavigate();


  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  //check login success
  const [status, setStatus] = useState(false);
  //get fingerprinnnt id


  useEffect(() => {
    if (status === true && userData.userData) {
      if (userData.userData.roleid === '2') {
        setAuth(true);
        setAuthUser(true)
        loginAdmin("/");
      }
      if (userData.userData.roleid === "0") {
        setAuthAdmin(true);
        loginAdmin("/Admin")
      }
      if (userData.userData.roleid === '1') {
        setAuthStaff(true);
        // loginAdmin("/Admin");
      }
    } else {
      return null;
    }
  }, [status, loginAdmin, setAuth, setAuthAdmin, setAuthStaff, setAuthUser, userData.userData]);

  //show messe when login fail
  const [errorMessage, setErrorMessage] = useState("");
  //call api login button

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    loginApi(); // call the loginApi function
  };

  const loginApi = async () => {
    const patternEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (pass === "") {
      setErrorMessage("Mật khẩu không được để trống!");
    }

    if (patternEmail.test(email) === false) {
      setErrorMessage("Email bạn nhập không đúng định dạng");
    }

    if (
      patternEmail.test(email) === true &&
      pass !== ""
    ) {

      const qs = require('qs');
      let data = qs.stringify({
        'email': email,
        'password': pass
      });


      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost/car/KLTN/carrentalAPI/login.php`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };
      await axios(config)
        .then(function (res) {
          // api return status = 200 mean login success and isActive was actived code when register
          if (res.data.status === "200") {
            // set status = true for conditiona redirect

            setStatus(true);

            userData.set(
              "userData",
              {
                id: res.data.user.id,
                roleid: res.data.user.roleid,
                email: res.data.user.EmailId,
                token: res.data.token,
                status: res.data.status,

              },
              { path: "/" },
            );
            if (res.data.user.roleid === "2") {
              setAuth(true);
              setAuthUser(true)
              loginAdmin("/");
            }
            if (res.data.user.roleid === "0") {
              setAuthAdmin(true);
              loginAdmin("/Admin")
            }
            if (res.data.user.roleid === "1") {
              setAuthStaff(true);
              loginAdmin("/Admin");
            }

          }
        })
        .catch(function (err) {
          console.log(JSON.stringify(err))
        })
        .catch(function (error) { });
      setErrorMessage("Sai mật khẩu hoặc email")
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
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >

              <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                id="email"
                className="client-info"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                margin="normal"

                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                className="client-info"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <div style={{ color: "red" }} className="errorMess">{errorMessage}</div>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                id="submit"
                value="Login"
                className="client-info"
                required
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khấu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/Register" variant="body2">
                    {"Chưa có tài khoản? Đăng ký"}
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
