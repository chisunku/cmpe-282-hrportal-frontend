import React, { Component }  from 'react';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
// import { Component } from 'ag-grid-community';

export default class DependantsCard extends Component {
        
  state = {
    familyInfoData: [],
      loading: true,
      rowData: []
  };

  familyInfoObj = [];
  rowDataT = [];
  loadFamilyInfoData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/family-info/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.familyInfoObj = response.data;
        // this.setState({ educationData: response.data });
        this.setState({ rowData: this.familyInfoObj.familyInfo});
        console.log("response", response.data);

        this.setState({ loading: false });
       
        console.log("rowData" + JSON.stringify(this.state.rowData));

      })
      .catch(error => {
        console.log(error);
      });
  };

  onFamilyInfoDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/family-info/" + e1 + "/" + e2, {
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
    this.loadFamilyInfoData();
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
                    <MDBTypography tag="h6">Dependents</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">
                            {eachRow.Name}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Relationship</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.Relationship}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Date of Birth</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.DOB}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Occupation</MDBTypography>
                        <MDBCardText className="text-muted">{eachRow.Occupation}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <div>
                            <Button className="ml-2 btn-dark" onClick={() => this.props.onEditFamilyInfo(eachRow)}>Edit</Button>
                            <Button className="ml-2 btn-dark" onClick={() => this.onFamilyInfoDelete(this.props.data["_id"], eachRow._id) }>Delete</Button>
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
            <Button className="btn-dark" id="add-button" onClick={this.props.onAddFamilyInfo}>
                Add New Dependant
            </Button>
            </MDBRow>
        </MDBRow>
      </MDBContainer>
    </section>
  );
            }
}