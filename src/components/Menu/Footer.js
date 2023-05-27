import React from "react";
// import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6>Liên hệ</h6>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="newsletter-form">

                <p className="subscribed-text">
                  * Chúng tôi gửi những ưu đãi tuyệt vời và tin tức ô tô mới nhất đến những người đã đăng ký của chúng tôi
                  người dùng rất tuần.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-push-6 text-right">
              <div className="footer_widget">
                <p></p>
              </div>
            </div>
            <div className="col-md-6 col-md-pull-6">
              <p className="copy-right">
                Sinh viên thực hiện: Nguyễn Thanh Ba, MSSV: 19504051, Lê Nhật Huy, MSSV: 19505691
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
