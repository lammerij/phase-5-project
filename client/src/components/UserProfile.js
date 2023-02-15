import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer
} from "mdb-react-ui-kit";

function UserProfile() {
  const [user, setUser] = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);



  console.log(user);

  return (
    <div>
      <MDBContainer style={{width: '20rem'}} >
       <MDBCard alignment='center' >
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={user.image} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{user.display_name}</MDBCardTitle>
        <MDBCardText>
        {user.type}
        </MDBCardText>
        <MDBBtn href='#'>Edit</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default UserProfile;
