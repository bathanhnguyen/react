import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
import axios from "axios";
import { useEffect } from "react";
import { BiMap } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { AiTwotonePhone } from "react-icons/ai"


const ContactUs = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactno, setContactno] = useState("")
  const [message, setMessage] = useState("")


  const sendMess = (e) => {
    e.preventDefault();
    const qs = require('qs');
    let data = qs.stringify({
      name: name,
      email: email,
      contactno: contactno,
      message: message
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost/car/KLTN/carrentalAPI/AddContactUs.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const [info, setInfo] = useState("");

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost/car/KLTN/carrentalAPI/Get_ContactInfo.php',
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setInfo(response.data.info)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div>
      <Header />
      <section className="page-header contactus_page">
        <div className="container">
          <div className="page-header_wrap">
            <div className="page-heading">
              <h1>Liên hệ</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Liên hệ</li>
            </ul>
          </div>
        </div>

        <div className="dark-overlay"></div>
      </section>

      <section className="contact_us section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Liên lạc bằng cách sử dụng mẫu dưới đây</h3>
              <div className="contact_form gray-bg">
                <form onSubmit={sendMess}>
                  <div className="form-group">
                    <label className="control-label">
                      Họ và tên <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control white_bg"
                      required
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Email <span>*</span>
                    </label>
                    <input
                      type="email"

                      className="form-control white_bg"

                      required
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Số điện thoại <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control white_bg"
                      required
                      maxlength="10"
                      pattern="[0-9]+"
                      onChange={(e) =>
                        setContactno(e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">
                      Lời nhắn <span>*</span>
                    </label>
                    <textarea
                      className="form-control white_bg"
                      rows="4"
                      required
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button className="btn" name="submit"
                      type="submit">
                      Gửi

                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <h3>Thông tin liên hệ</h3>
              <div className="contact_detail">
                <ul>
                  <li>
                    <div className="icon_wrap">
                      <i className="fa fa-phone" aria-hidden="true"><BiMap /></i>
                    </div>
                    <div className="contact_info_m">
                      <p>{info.Address}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon_wrap">
                      <i className="fa fa-phone" aria-hidden="true"><HiOutlineMail /></i>
                    </div>
                    <div className="contact_info_m">
                      <p>{info.ContactNo}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon_wrap">
                      <i className="fa fa-envelope-o" aria-hidden="true"><AiTwotonePhone /></i>
                    </div>
                    <div className="contact_info_m">
                      <p> Liên hệ tới: {info.EmailId}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default ContactUs;
