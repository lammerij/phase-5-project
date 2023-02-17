import React from 'react'
import { Link } from "react-router-dom";
import { MDBBtn } from 'mdb-react-ui-kit';
import styled from 'styled-components';

function Home() {
  return (
    <header>
    <div
    className='p-5 text-center bg-image'
    style={{ backgroundImage: "url('https://teamrubiconusa.org/app/uploads/2017/08/1.1.5-Doctrine_HERO_cropped.jpg')", height: '400px' }}
  >
    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='text-white'>
          <Logo>goFundit</Logo>
          <h4 className='mb-3'>Make A Difference</h4>
          <Link to="/newcause"><MDBBtn tag="a" outline size="lg">
            Create A New Cause
          </MDBBtn></Link>
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

export default Home