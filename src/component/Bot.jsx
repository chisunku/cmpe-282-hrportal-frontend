import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

class Bot extends Component {

      constructor(props) {
        super(props);

        this.state = {
          searchTerm: '',
          response: [],
        };
      }

        handleSearch = (event) => {
          this.setState({ searchTerm: event.target.value });
        };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    console.log(searchTerm);
  axios
        .post("https://api.openai.com/v1/completions",
        {
            "model": "text-davinci-003",
            "prompt": "give a 500 tokens response for: "+this.state.searchTerm,
            "temperature": 0.1,
            "max_tokens": 1000
        },{
          headers: {
                  Authorization: 'Bearer <API key>',
                  'Content-Type': 'application/json'
                },
        })
        .then(response => {
          this.setState({ response: response.data["choices"][0]["text"] });
          console.log("he response : ", this.state.response);
        })
        .catch(error => {
          console.log(error);
        });
  };

  render() {
    return (
      <React.Fragment>
        <h2 id="role-title">Bot</h2>
        <div style={{ padding: '20px' }}>
<Form className="search-form">
      <div className="input-with-icon">
      <Form.Group className="input-group">
        <Form.Control
          type="text"
          placeholder="Enter your search prompt here..."
                     value={this.state.searchTerm}
                      onChange={this.handleSearch}
        />
        <Button type="submit" onClick={this.handleSubmit}>Search</Button>
      </Form.Group>
      </div>
    </Form>
    <p>{this.state.response}</p>
    </div>
      </React.Fragment>
    );
  }



}

export default Bot;