import React, { Component }  from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
// import { Component } from 'ag-grid-community';

export default class WorkExpCard extends Component {
        
  state = {
    workExperienceData: [],
      loading: true,
      rowData: []
  };

  workExperienceObj = [];
  rowDataT = [];
  loadWorkExperienceData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/work-experience/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.workExperienceObj = response.data;
        this.setState({ rowData: this.workExperienceObj.workExperience});
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onWorkExperienceDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/work-experience/" + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };


componentDidMount() {
    console.log("componentDidMount")
    this.loadWorkExperienceData();
  }

  render()
  {
  return (
    <section className="vh-200" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>

            {this.state.rowData.map(eachRow => (
              <MDBRow className="g-0">
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Work Experience History</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Company Name</MDBTypography>
                        <MDBCardText className="text-muted">
                            {eachRow.CompanyName}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Designation</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.Designation}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Date of Joining</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.FromDate}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Date of Exit</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.ToDate}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <div>
                            <Button className="ml-2 btn-dark" onClick={() => this.props.onEditWorkExperience(eachRow)}>Edit</Button>
                            <Button className="ml-2 btn-dark" onClick={() => this.onWorkExperienceDelete(this.props.data["_id"], eachRow._id) }>Delete</Button>
                        </div>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            ))}

            </MDBCard>
           
          </MDBCol>
          <MDBRow className="g-0">
            <Button className="btn-dark" id="add-button" onClick={this.props.onAddWorkExperience}>
                Add New Experience
            </Button>
            </MDBRow>
        </MDBRow>
      </MDBContainer>
    </section>
  );
            }
}