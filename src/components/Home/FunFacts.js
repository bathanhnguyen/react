import React from "react";

const FunFacts = () => {
  return (
    <section className="fun-facts-section">
      <div className="container div_zindex">
        <div className="row">
          <div className="col-lg-3 col-xs-6 col-sm-3">
            <div className="fun-facts-m">
              <div className="cell">
                <h2>
                  <i className="fa fa-calendar" aria-hidden="true"></i>40+
                </h2>
                <p>Năm kinh doanh
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xs-6 col-sm-3">
            <div className="fun-facts-m">
              <div className="cell">
                <h2>
                  <i className="fa fa-car" aria-hidden="true"></i>1200+
                </h2>
                <p>
                  Xe cho thuê
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xs-6 col-sm-3">
            <div className="fun-facts-m">
              <div className="cell">
                <h2>
                  <i className="fa fa-car" aria-hidden="true"></i>1000+
                </h2>
                <p>Cho thuê ô tô đã qua sử dụng</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xs-6 col-sm-3">
            <div className="fun-facts-m">
              <div className="cell">
                <h2>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>600+
                </h2>
                <p>Khách hàng hài lòng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-overlay"></div>
    </section>
  );
};
export default FunFacts;
