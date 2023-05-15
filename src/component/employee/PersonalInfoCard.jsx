import React, { Component }  from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
// import { Component } from 'ag-grid-community';

export default class PersonalProfile extends Component {
    // export default function PersonalProfile() {
        
    state = {

        personalInfoData: [],
        loading: true,
        rowData: []
    };

   personalInfoObj = [];
   rowDataT = [];
   loadPersonalInfoData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/personal-info/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.personalInfoObj = response.data;
        console.log("response", response.data);
        this.setState({ personalInfoData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        console.log("personalInfoObj", this.personalInfoObj)
        // this.personalInfoObj.map(data => {
        let data = this.personalInfoObj;
        let temp = {
          data,
          FirstName: data["FirstName"] || "Not Avaiable",
          MiddleName: data["MiddleName"] || "Not Avaiable",
          LastName: data["LastName"] || "Not Avaiable",
          Gender: data["Gender"] || "Not Avaiable",
          ContactNo: data["ContactNo"] || "Not Avaiable",
          Email: data["Email"] || "Not Avaiable",
          PANcardNo: data["PANcardNo"] || "Not Avaiable",
          DOB: data["DOB"].slice(0, 10) || "Not Avaiable",
          Hobbies: data["Hobbies"] || "Not Avaiable",
          PresentAddress: data["PresentAddress"] || "Not Avaiable",

        };

        this.rowDataT.push(temp);
        // });
        this.setState({ rowData: this.rowDataT });
        // console.log("rowData",this.state.rowData)

      })
      .catch(error => {
        console.log(error);
      });
  };


componentDidMount() {
    this.loadPersonalInfoData();
  }

  render()
  {
  return (
    <section className="vh-200" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Identification</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">
                            {this.state.personalInfoData.FirstName + " " +
                            this.state.personalInfoData.MiddleName + " " +
                            this.state.personalInfoData.LastName}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.Gender}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birth</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.DOB}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Blood Group</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.BloodGroup}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Contact</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.ContactNo}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Emergency Contact</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.EmergencyContactNo}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.Email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Current Address</MDBTypography>
                        <MDBCardText className="text-muted">{this.state.personalInfoData.PresentAddress}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        <MDBRow className="g-0">
          <Button className="btn-dark" onClick={() => this.props.onEditPersonalInfo(this.state.personalInfoData)}>Edit</Button>
        </MDBRow>
        </MDBRow>
      </MDBContainer>
    </section>
  );
            }
}