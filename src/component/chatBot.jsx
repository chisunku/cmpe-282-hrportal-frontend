import React, { Component } from 'react';
import './chat.css';
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

class Chat extends Component {
  state = {
    messages: [
      { id: 1, text: "Hello, how can I help you?" }
    ],
    userInput: "",
    response: "",
    isLoading: false
  };

  handleUserInput = (event) => {
    this.setState({ userInput: event.target.value });
  };

  handleUserSubmit = (event) => {
    event.preventDefault();
    const newMessage = { id: this.state.messages.length + 1, text: this.state.userInput };
    const messages = [...this.state.messages, newMessage];
    this.setState({ messages, userInput: "" });
    this.setState({isLoading: true});

    axios
      .post("https://api.openai.com/v1/completions",
      {
        "model": "text-davinci-003",
        "prompt": this.state.userInput,
        "temperature": 0.1,
        "max_tokens": 256
      },{
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        const newMessage = { id: this.state.messages.length + 1, text: response.data["choices"][0]["text"] };
        const messages = [...this.state.messages, newMessage];
        this.setState({ messages, response: response.data["choices"][0]["text"] });
        this.setState({isLoading: false});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {

    const messageList = this.state.messages.map(message => (
      <li key={message.id} className={message.id%2===0 ? "message-right" : "message-left"}>
        {message.id%2!==0 ? (
          <React.Fragment>
            <span className="icon"><FontAwesomeIcon icon={faRobot} style={{ marginRight: '10px' }}/></span>
            {message.text}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {message.text}
            <span className="icon"><FontAwesomeIcon icon={faUser} style={{ marginLeft: '10px' }}/></span>
          </React.Fragment>
        )}
      </li>
    ));

    return (
      <React.Fragment>
      <h2 id="role-title">Bot</h2>
        <div style={{ padding: '20px' }} className="chat-container" >
          <ul className="message-list fa-ul">{messageList}</ul>
          <div style={{ padding: '20px' }}>
            <Form className="search-form">
              <div className="input-with-icon">
              {this.state.isLoading && <div className="loading-message">Loading...</div>}
                <Form.Group className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Enter your search prompt here..."
                    value={this.state.userInput}
                    onChange={this.handleUserInput}
                  />
                  <Button type="submit" onClick={this.handleUserSubmit}>Search</Button>
                </Form.Group>
              </div>
            </Form>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
