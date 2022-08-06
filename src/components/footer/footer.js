import React from "react";
import logo from "../../images/logo.png";
import "./footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <img style={{ width: "250px", height: "80px" }} src={logo} />
          </div>
          {/* Column1 */}
          <div className="col">
            <h2 className="col1-header">Biscuit Game</h2>
            <h5 className="list-unstyled">
              <li className="col1-list">
                <h5>Phone number</h5>
              </li>
              <li className="col1-list">
                <h5>Address 1</h5>
              </li>
              <li className="col1-list">
                <h5>Address 2</h5>
              </li>
            </h5>
          </div>
          {/* Column2 */}
          <div className="col">
            <h3 className="col2-header">Links</h3>
            <ui className="list-unstyled">
              <li className="col2-list">
                <h6>Link 1</h6>
              </li>
              <li className="col2-list">
                <h6>Link 2</h6>
              </li>
              <li className="col2-list">
                <h6>Link 3</h6>
              </li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h3 className="col3-header">Projects</h3>
            <ui className="list-unstyled">
              <li className="col3-list">
                <h6>Project 1</h6>
              </li>
              <li className="col3-list">
                <h6>Project 2</h6>
              </li>
              <li className="col3-list">
                <h6>Project 3</h6>
              </li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Biscuit | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
