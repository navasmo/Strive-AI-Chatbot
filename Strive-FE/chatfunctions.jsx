import React from "react";

// greeting impelementation
class Chat extends React.Component {
  // define state variable for username
  state = {
    username: "",
  };
  // handle input from user to set the username
  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };
  // render greeting with user's name
  renderGreeting = () => {
    return <div>Hello, {this.state.username}!</div>;
  };
  render() {
    return (
      <div>
        {/* input form for user to enter their name */}
        <form onSubmit={this.handleSubmitUsername}>
          <label>
            Name:
            <input type="text" onChange={this.handleAdd} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* render greeting with user's name */}
        {this.renderGreeting()}
      </div>
    );
  }
}

// axios implemetation
import axios from "axios";

class Chat extends React.Component {
  // define state variables for chat history and current message
  state = {
    chat: [],
    msg: "",
  };

  // handle input from user to set the current message
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ msg: e.target.value });
  };

  // handle send message form submission
  handleSendMessageToChatBot = (e) => {
    e.preventDefault();
    // send request to back-end with current message
    axios
      .post("http://example.com/api/send-message", { msg: this.state.msg })
      .then((res) => {
        // update chat history with user's message and chatbot's response
        let ch = this.state.chat;
        ch.push({ from: "user", msg: this.state.msg });
        ch.push({ from: "chatbot", msg: res.data });
        this.setState({ chat: ch, msg: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {/* input form for user to enter a message */}
        <form onSubmit={this.handleSendMessageToChatBot}>
          <label>
            Message:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}
// sample code for axios 

import axios from "axios";

// send request to back-end with current message
axios
  .post("http://127.0.0.1:5000/user", { msg: this.state.msg })
  .then((res) => {
    // update chat history with user's message and chatbot's response
    let ch = this.state.chat;
    ch.push({ from: "our", msag: this.state.msg });
    ch.push({ from: "cb", msag: res.data });
    this.setState({ chat: ch, msg: "", actionButton: "" }, () =>
      this.scrollDownChat()
    );
  })
  .catch((err) => {
    console.log(err);
  });

//# render buttons if actionButton state is "CAREER_ADVICE"
if (this.state.actionButton == "CAREER_ADVICE") {
    return (
    <div className="msg-left-choice">
    <div className="msg-img">
    <img className="msg-img" src={robotAvatar} alt="" />
    </div>
    <div className="user-choice">
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I want to switch careers")
    }
    >
    <div className="choice-btn-text">I want to switch careers</div>
    </button>
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I want to improve in my current career")
    }
    >
    <div className="choice-btn-text">
    I want to improve in my current career
    </div>
    </button>
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I am not sure what career to pursue")
    }
    >
    <div className="choice-btn-text">
    I am not sure what career to pursue
    </div>
    </button>
    </div>
    </div>
    );
    }
    
    //# render buttons if actionButton state is "WELL_BEING_GUIDANCE"
    if (this.state.actionButton == "WELL_BEING_GUIDANCE") {
    return (
    <div className="msg-left-choice">
    <div className="msg-img">
    <img className="msg-img" src={robotAvatar} alt="" />
    </div>
    <div className="user-choice">
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I am feeling anxious")
    }
    >
    <div className="choice-btn-text">I am feeling anxious</div>
    </button>
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I am feeling stressed")
    }
    >
    <div className="choice-btn-text">I am feeling stressed</div>
    </button>
    <button
    className="user-send-choice"
    onClick={(e) =>
    this.handleSendMessageToChatBot(e, "I am feeling depressed")
    }
    >
    <div className="choice-btn-text">I am feeling depressed</div>
    </button>
    </div>
    </div>
    );
    }
    };
    // render chat feed
renderChatFeed = () => {
    return this.state.chat.map((message, index) => {
    if (message.from == "our") {
    return (
    <div className="msg-right" key={index}>
    <div className="msg-img">
    <img className="msg-img" src={meAvatar} alt="" />
    </div>
    <div className="msg-bubble">
    <div className="msg-info">
    <div className="msg-info-name">You</div>
    </div>
    <div className="msg-text">{message.msag}</div>
    </div>
    </div>
    );
    } else {
    return (
    <div className="msg-left" key={index}>
    <div className="msg-img">
    <img className="msg-img" src={robotAvatar} alt="" />
    </div>
    <div className="msg-bubble">
    <div className="msg-info">
    <div className="msg-info-name">Strive</div>
    </div>
    <div className="msg-text">{message.msag}</div>
    </div>
    </div>
    );
    }
    });
    };
    
    // render chat container
    renderChatContainer = () => {
    return (
    <div className="main-msg-container">
    <div className="header">
    <Header />
    </div>
    <div className="msg-container" id="msg-animation">
    {this.renderChatFeed()}
    {this.renderActionButtonOnFeed()}
    </div>
    <div className="footer">
    <form
    onSubmit={(e) => this.handleSendMessageToChatBot(e, this.state.msg)}
    >
    <input
               className="user-input"
               type="text"
               value={this.state.msg}
               onChange={this.handleChange}
             />
    <button type="submit" className="send-button">
    <img src={sendMessage} alt="send message" />
    </button>
    </form>
    <div className="useful-links">
    <usefulLinks />
    </div>
    </div>
    </div>
    );
    };
    
    // render chatbot
    render() {
    return (
    <div>
    {/* input form for user to enter their name */}
    <form onSubmit={this.handleSubmitUsername}>
    <label>
    Name:
    <input type="text" onChange={this.handleAdd} />
    </label>
    <input type="submit" value="Submit" />
    </form>

        {/* render chat container or loading screen depending on whether the username has been confirmed */}
        {this.state.isUsernameConfirmed ? (
      this.renderChatContainer()
    ) : (
      <div className="loading-screen">
        <img src={anxietyGif} alt="loading" />
        <p>Loading...</


        render() {
  return (
    <div className="body">
      <div className="msger">
        <Header />
        <div id="chatt" className="msger-chat">
          <div id="msg-animation" className="msger-animation">
            {this.state.chat.map((msg, index) => {
              if (msg.from == "cb") {
                return (
                  <div key={index}>
                    <div className="msg left-msg">
                      <div className="msg-img">
                        <img className="msg-img" src={robotAvatar} alt="" />
                      </div>
                      <div className="msg-bubble">
                        <div className="msg-info">
                          <div className="msg-info-name">StriveBot</div>
                        </div>
                        <div className="msg-text">{msg.msag}</div>
                      </div>
                    </div>
                    {this.selectGifAccordingToResponse(msg.msag)}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <div className="msg right-msg">
                      <div className="msg-img">
                        <img className="msg-img" src={meAvatar} alt="" />
                      </div>
                      <div className="msg-bubble">
                        <div className="msg-info">
                          <div className="msg-info-name">{this.state.username}</div>
                        </div>
                        <div className="msg-text">{msg.msag}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          {this.renderActionButtonOnFeed()}
          {this.renderCareerGuidanceChoiceButtons()}
        </div>
        {this.renderForm()}
      </div>
    </div>
  );
}
