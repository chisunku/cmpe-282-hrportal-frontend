import React, { Component }  from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
// import { Component } from 'ag-grid-community';

export default class EducationCard extends Component {
        
    state = {
        educationData: [],
        loading: true,
        rowData: []
    };

   personalInfoObj = [];
   rowDataT = [];
   loadEducationData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/education/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.educationObj = response.data;
        // this.setState({ educationData: response.data });
        this.setState({ rowData: this.educationObj.education});
        console.log("response", response.data);

        this.setState({ loading: false });
       
        console.log("rowData" + JSON.stringify(this.state.rowData));

      })
      .catch(error => {
        console.log(error);
      });
  };

  onEducationDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/education/" + e1 + "/" + e2, {
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
    this.loadEducationData();
  }

  render()
  {
  return (
    <section className="vh-200" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>

            {this.state.rowData.map(eachEduRow => (
              <MDBRow className="g-0">
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Education</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">University</MDBTypography>
                        <MDBCardText className="text-muted">
                            {eachEduRow.SchoolUniversity}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Degree</MDBTypography>
                        <MDBCardText className="text-muted">{eachEduRow.Degree}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Grade</MDBTypography>
                        <MDBCardText className="text-muted">{eachEduRow.Grade}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Passing Year</MDBTypography>
                        <MDBCardText className="text-muted">{eachEduRow.PassingOfYear}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <div>
                            <Button className="ml-2 btn-dark" onClick={() => this.props.onEditEducation(eachEduRow)}>Edit</Button>
                            <Button className="ml-2 btn-dark" onClick={() => this.onEducationDelete(this.props.data["_id"], eachEduRow._id) }>Delete</Button>
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
            <Button className="btn-dark" id="add-button" onClick={this.props.onAddEducation}>
                Add New Education
            </Button>
            </MDBRow>
        </MDBRow>
      </MDBContainer>
    </section>
  );
            }
}