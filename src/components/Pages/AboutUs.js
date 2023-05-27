import React from "react";
import { Link } from "react-router-dom";
import Header from "../Menu/Header";
import Footer from "../Menu/Footer";
const AboutUs = () => {
  return (
    <div>
      <Header />
      <section className="page-header contactus_page">
        <div className="container">
          <div className="page-header_wrap">
            <div className="page-heading">
              <h1>Thông tin liên hệ</h1>
            </div>
            <ul className="coustom-breadcrumb">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Thông tin liên hệ</li>
            </ul>
          </div>
        </div>

        <div className="dark-overlay"></div>
      </section>
      <section className="about_us section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2>Thông tin liên hệ</h2>
            <p>
              Chúng tôi cung cấp một đội xe ô tô đa dạng, từ nhỏ gọn.
              Tất cả các xe của chúng tôi đều có máy lạnh, tay lái trợ lực, cửa sổ điện.
              Tất cả các phương tiện của chúng tôi chỉ được mua và bảo dưỡng tại các đại lý chính thức.
              Ô tô hộp số tự động có sẵn trong mọi tên lớp đặt chỗ.
              Vì chúng tôi không liên kết với bất kỳ hãng xe cụ thể nào nên chúng tôi có thể cung cấp nhiều
              loại xe và mẫu mã cho khách hàng thuê. Nhiệm vụ của chúng tôi là được công nhận là công ty hàng đầu
              toàn cầu về Cho thuê ô tô cho các công ty cũng như khu vực công và tư nhân bằng cách hợp
              tác với khách hàng của chúng tôi để cung cấp các giải pháp Cho thuê xe taxi tốt nhất
              và hiệu quả nhất cũng như đạt được dịch vụ xuất sắc.

            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default AboutUs;
