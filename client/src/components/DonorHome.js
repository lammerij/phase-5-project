import React from "react";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import styled from "styled-components";

function DonorHome() {
  return (
    <header>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage:
            "url('https://onlinewilder.vcu.edu/images/blog/national-guard-disaster-response_hu8fba000314c3880bee530c29e384f0d9_35470_960x0_resize_q90_lanczos.jpeg')",
          height: "400px",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <Logo>goFundit</Logo>
              <h4 className="mb-3">Make A Difference</h4>
              <Link to="/causes">
                <MDBBtn tag="a" outline size="lg">
                  Call to action
                </MDBBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const Logo = styled.h1`
  font-family: "Fira Sans", serif;
  font-size: 3rem;
  color: white;
  margin: 8px 0 16px;
`;

export default DonorHome;
