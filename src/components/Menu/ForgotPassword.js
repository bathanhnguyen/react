import React from "react";
const ForgotPassword = () => {
  return (
    <div className="modal fade" id="forgotpassword">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 className="modal-title">Password Recovery</h3>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="forgotpassword_wrap">
                <div className="col-md-12">
                  <form name="chngpwd" method="post">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email address*"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        placeholder="Your Reg. Mobile*"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="newpassword"
                        className="form-control"
                        placeholder="New Password*"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="confirmpassword"
                        className="form-control"
                        placeholder="Confirm Password*"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Reset My Password"
                        name="update"
                        className="btn btn-block"
                      />
                    </div>
                  </form>
                  <div className="text-center">
                    <p className="gray_text">
                      For security reasons we don't store your password. Your
                      password will be reset and a new one will be send.
                    </p>
                    <p>
                      <a
                        href="#loginform"
                        data-toggle="modal"
                        data-dismiss="modal"
                      >
                        <i
                          className="fa fa-angle-double-left"
                          aria-hidden="true"
                        ></i>{" "}
                        Back to Login
                      </a>
                    </p>
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
export default ForgotPassword;
