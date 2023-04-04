import React from "react";
import "./chat.css";
import axios from "axios";
import Breath from "../components/breathing-exercise";
import dataResponse from "../data/data";
import chatDelay from "../assets/gifs/typing-animation-3x.gif";
import breathingGif from "../assets/gifs/anxiety.gif";
import jumpingJacks from "../assets/gifs/get_active.gif";
import burpeesTwo from "../assets/gifs/Burpee.gif";
import pushUps from "../assets/gifs/Push-Ups.gif";
import robotAvatar from "../assets/img/Strive.png";
import sendMessage from "../assets/img/send-message.png";
import calmApp from "../assets/img/calm.png";
import happifyApp from "../assets/img/Happify.png";
import wysaApp from "../assets/img/wysa.webp";
import headspaceApp from "../assets/img/headspace.png";
import linkedinResource from "../assets/img/linked.png";
import glassdoorResource from "../assets/img/glassdoor.png";
import indeedResource from "../assets/img/indeed.png";
import totaljobsResource from "../assets/img/total.webp";
import reedResource from "../assets/img/reed1.png";

class Chat extends React.Component {
  //define state variables: chat, msg, username, isUsernameConfirmed, actionButton
  state = {
    chat: [],
    msg: "",
    username: "",
    isUsernameConfirmed: false,
    actionButton: "STARTING",
    showChatDelay: false, // new state variable
    showButton: true,
    showMessage: false,
    showBreathDiv: false,
    selectedEmoji: "",
  };
handleEmojiRating = (emoji) => {
    
  this.setState({ selectedEmoji: emoji });
  
  }
handleSendFeedback = () => {
    // Send feedback to the server here
}
//handle input from user to set the username
  handleAdd = (e) => {
    e.preventDefault();
    this.setState({ username: e.target.value });
  };
//handle submit of username form
  handleSubmitUsername = (e) => {
    e.preventDefault();
    this.setState({ showChatDelay: true }, () => {
      // use setTimeout to set showChatDelay to false after 2 seconds
      setTimeout(() => {
        this.setState({ showChatDelay: false });
      }, 2000);
      this.setState({ isUsernameConfirmed: true });
      
    });
  };
//handle input from user to set the message
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ msg: e.target.value });
  };
//handle send message form submission
handleSendMessageToChatBot = (e, messageToSend) => {
  e.preventDefault();
  if (messageToSend !== "") {
    axios
      //heroku server - https://strive-aibot.herokuapp.com/user
      //local - http://127.0.0.1:5000/user
      .post("https://strive-aibot.herokuapp.com/user", { msg: messageToSend })
      .then((res) => {
        // Get the bot response and type from the server
        const botResponse = res.data;

        // Update chat history with user's message and chatbot's response
        this.setState(
          {
            chat: [
              ...this.state.chat,
              {
                msag: messageToSend,
                from: "our",
                type: "user_message",
              },
              {
                msag: botResponse.message,
                from: "cb",
                type: botResponse.type, // Add the type property from the bot response
              },
            ],
            msg: "",
            actionButton: "",
          },
          () => this.scrollDownChat()
        );
      })
      .catch((err) => {
        console.log(err);
      });

    this.forceUpdate();
  }
};

renderMessageContent = (msg) => {
  switch (msg.type) {
    case "text":
      return <div className="msg-text">{msg.content}</div>;
    case "link":
      return (
        <div className="msg-text">
          {msg.content}
          <a href={msg.url} target="_blank" rel="noopener noreferrer">
            {msg.urlText}
          </a>
        </div>
      );
    case "option_buttons":
      return (
        <div className="msg-text">
          {msg.content}
          <div className="option-buttons">
            {msg.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => this.handleSendMessageToChatBot(null, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    default:
      return <div className="msg-text">Unknown message type</div>;
  }
};

//render action button on chat feed
  renderActionButtonOnFeed = () => {
    if (!this.state.isUsernameConfirmed) {
      return null;
    }
// render button if actionButton state is "STARTING"
    if (this.state.actionButton == "STARTING") {
      return (
        <div className="msg-left-choice">
          <div className="msg-img">
            
          </div>
          <div className="user-choice">
            <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "Career Advice")
              }
            >
              <div className="choice-btn-text">Career Guidance</div>
            </button>
            <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "Well-being Guidance")
              }
            >
              <div className="choice-btn-text">Well-being Guidance</div>
            </button>
          </div>
        </div>
      );
    }
};
handleAnxietyButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-panic", "_blank");
};
handleGetActiveButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://www.mind.org.uk/about-us/our-policy-work/sport-physical-activity-and-mental-health/get-active-feel-good", "_blank");
};
handleStressManagmentButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress", "_blank");
};
handleCoverLetterButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/cover-letters", "_blank");
};
handleInterviewButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://nationalcareers.service.gov.uk/careers-advice/interview-advice/interview-advice", "_blank");
};
handleResumeButtonClick = () => {
  this.setState({ showButton: false, showMessage: true });
  window.open("https://www.themuse.com/advice/43-resume-tips-that-will-help-you-get-hired", "_blank");
};
handleGuidanceChoice = (e, messageToSend) => {
  e.preventDefault();
  this.handleSendMessageToChatBot(e, messageToSend);
};
handleExploreMore = () => {
  this.setState({ showButton: false});
};
renderJobSearchResources = (message) => {
  const lastResponse = message.msag;

  if (lastResponse === "Here are a few online resources that can help you with your job search: LinkedIn, Glassdoor, Indeed, Totaljobs, Reed.co.uk. Remember to tailor your job search to your goals and interests, and consider seeking help from a career coach or mentor if needed.") {
    return (
      <div>
        {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="msg-img"></div>
        <div className="resource-choice">
        <button
            className="link-tiles"
            onClick={(e) => window.open("https://www.linkedin.com/", "_blank")}
          ><div className="float-left">
            <img className="resource-img" src={linkedinResource} alt="" /></div>
            <div className="tile-text">LinkedIn</div>
          </button>
          <button
            className="link-tiles"
            onClick={(e) => window.open("https://www.glassdoor.com/", "_blank")}
          ><div className="float-left">
            <img className="resource-img" src={glassdoorResource} alt="" /></div>
            <div className="tile-text">Glassdoor</div>
          </button>
          <button
            className="link-tiles"
            onClick={(e) => window.open("https://www.indeed.com/", "_blank")}
          ><div className="float-left">
            <img className="resource-img" src={indeedResource} alt="" /></div>
            <div className="tile-text">Indeed</div>
          </button>
          <button
            className="link-tiles"
            onClick={(e) => window.open("https://www.totaljobs.com/", "_blank")}
          ><div className="float-left">
            <img className="resource-img" src={totaljobsResource} alt="" /></div>
            <div className="tile-text">TotalJobs</div>
          </button>
          <button
            className="link-tiles"
            onClick={(e) => window.open("https://www.reed.co.uk/", "_blank")}
          ><div className="float-left">
          <img className="resource-img" src={reedResource} alt="" /></div>
          <div className="tile-text">Reed.co.uk</div>
          </button> 
          <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "explore more career topics")
              }
            >
              <div className="choice-btn-text">Expore More</div>
            </button>
        </div>
      </div>
)}
{!this.state.showButton && <button onClick={handleExploreMore}>Explore More</button>}
      </div>
    );
  }
  // return null if chatbot's last response is not "Here are a few online resources that can help you with your job search: LinkedIn, Glassdoor, Indeed, CareerBuilder, Monster. Remember to tailor your job search to your goals and interests, and consider seeking help from a career coach or mentor if needed."
  return null;
};

linkResumeWritingArticle = (message) => {
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;
  

  if (lastResponse === "A strong resume can help you stand out and land your dream job. To create a winning resume, focus on highlighting your achievements, skills, and experience that are relevant to the position you are applying for. Use action verbs and specific examples to showcase your accomplishments. Keep the format clean and easy to read, and consider including a professional summary or objective statement to introduce yourself and your goals. Don't forget to proofread and have a trusted friend or mentor review your resume before you submit it.") {
    return (
      <div>
         {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={this.handleResumeButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
         )}
        {this.state.showMessage && (
    <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
       I hope that article was useful. If you need further support with this topic or something else, you can always below or type CAREER to explore other topics.
      </div>
    </div>
  </div>
)}
</div>
    );
  }
  // return null if chatbot's last response is not "You are at the right place! I can guide you to the right resource"
  return null;
};

linkInterviewPrepArticle = (message) => {
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;

  if (lastResponse === "Before attending a job interview, read the job description and person specification carefully. Be clear on the skills and qualities the employer is looking for, and check the company website to learn about its products or services and future plans. Review your CV or application form and prepare examples that show you have the right skills, personal qualities, and experience. Consider using the STAR method to structure your examples.") 
  {
    return (
      <div>
        {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={this.handleInterviewButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
          )}
          {this.state.showMessage && (
            <div className="msg left-msg">
            <div className="msg-img">
            </div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">StriveBot</div>
              </div>
              <div className="msg-text">
               Don't forget to tailor your resume to the specific job you are applying for and consider seeking help from a career coach or mentor if needed. If you need further support with this topic or something else, you can always below or type CAREER to explore other topics.
              </div>
            </div>
          </div>
          
          
          
        )}
      </div>
    );
  }
  return null;
};

linkCoverLetterArticle = (message) => {
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;
  

  if (lastResponse === "To write a strong cover letter, it is important to research the employer and the job role you are applying for to understand their needs and expectations. Start by introducing yourself and explaining why you are interested in the position. Next, highlight your relevant skills, experiences, and achievements that make you a strong candidate for the role. Conclude by expressing your enthusiasm for the opportunity and thanking the employer for considering your application.") {
    return (
      <div>
         {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={this.handleCoverLetterButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
         )}
        {this.state.showMessage && (
    <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
       I hope that article was useful. If you need further support with this topic or something else, you can always below or type CAREER to explore other topics.
      </div>
    </div>
  </div>
)}
</div>
    );
  }
  // return null if chatbot's last response is not "You are at the right place! I can guide you to the right resource"
  return null;
};

linkManageStressArticle = (message) => {

  const lastResponse = message.msag;
  
  if (lastResponse === "To manage stress and improve your well-being, try taking breaks, practicing relaxation techniques, getting enough sleep, eating a healthy diet, and seeking support from friends or professionals. Remember to prioritize your mental health and don't hesitate to seek help if you need it.") {
    return (
      <div>
         {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={this.handleStressManagmentButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
         )}
        {this.state.showMessage && (
    <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
       I hope that article was useful. If you need further support with this topic or something else, you can always below or type Well-being to explore other topics.
      </div>
    </div>
  </div>
)}
</div>
    );
  }
  return null;
};
renderAppsforWellBeing = (message) => {
  
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;
  if (lastResponse === "There are many apps available that can help with stress and anxiety management. Here are a few examples: Headspace, Calm, Happify, Pacifica. Remember to speak with a mental health professional if you are experiencing severe or persistent stress or anxiety, and consider seeking professional help if necessary.") {
    return (
      <div>
      {this.state.showButton && (
      <div className="msg-left-choice">
        <div className="app-choice">
        <button
            className="app-tiles"
            onClick={(e) => window.open("https://www.calm.com/", "_blank")}
          >
            <img className="app-img" src={calmApp} alt="" />
            <div className="app-btn-text">Calm</div>
          </button>
          <button
            className="app-tiles"
            onClick={(e) => window.open("https://www.headspace.com/", "_blank")}
          >
            <img className="app-img" src={headspaceApp} alt="" />
            <div className="app-btn-text">Headspace</div>
          </button>
          <button
            className="app-tiles"
            onClick={(e) => window.open("https://www.happify.com/", "_blank")}
          >
            <img className="app-img" src={happifyApp} alt="" />
            <div className="app-btn-text">Happify</div>
          </button>
          <button
            className="app-tiles"
            onClick={(e) => window.open("https://www.wysa.io/", "_blank")}
          >
            <img className="app-img" src={wysaApp} alt="" />
            <div className="app-btn-text">Wysa</div>
          </button>
          
        </div>
        <div className="msg-left-choice"> 
          <div className="user-choice">         
          <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "explore more well-being topics")
              }
            >
              <div className="choice-btn-text">Expore More</div>
            </button>
        </div>
        </div>
      </div>
      
)}
{!this.state.showButton && <button onClick={handleExploreMore}>Explore More</button>}
      </div>
    );
  }
  // return null if chatbot's last response is not "You are at the right place! I can guide you to the right resource"
  return null;
};
getActiveArticleandWorkOuts = (message) => {

  const lastResponse = message.msag;
  

  if (lastResponse === "Getting active is an important aspect of maintaining physical and mental well-being. There are many different ways to be active, including exercising, going for a walk or run, playing sports, dancing, or even gardening. The key is to find activities that you enjoy and that fit into your schedule and lifestyle. Regular physical activity can help reduce stress, improve sleep, boost mood, and strengthen the immune system.") {
    return (
      <div>
         {this.state.showButton && (
          
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
      You can choose to follow a quick workout routine or read more about the benefits of getting active.
      </div>
    </div>
  </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Do workouts")
            }
          >
            <div className="choice-btn-text">Quick Workouts</div>
          </button>
          <button
            className="user-send-choice"
            onClick={this.handleGetActiveButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
         )}
        {this.state.showMessage && (
    <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
       I hope that was useful. If you need further support with this topic or something else, you can always below or type Well-being to explore other topics.
      </div>
    </div>
  </div>
)}
</div>
    );
  }
  return null;
};
handleBreathingExercise = () => {
  this.setState({ showBreathDiv: true});
};
anxietyArticleandBreathing = (message) => {

  const lastResponse = message.msag;
  

  if (lastResponse === "Anxiety is a normal emotion that everyone experiences from time to time, but when it becomes overwhelming, it can interfere with daily life. If you are struggling with anxiety, it is important to remember that you are not alone and that there is help available. You can start by talking to a trusted friend, family member, or mental health professional. Practicing relaxation techniques such as deep breathing and mindfulness can also be helpful. There are also many online resources and support groups available to help you manage your anxiety. Remember to take care of yourself and seek help if needed.") {
    return (
      <div>
         {this.state.showButton && (
          
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
      To manage anxiety, it's important to focus on self-care and relaxation techniques. One simple yet effective technique is deep breathing. Alternatively, you can choose to read more about anxiety and how to manage it by clicking the 'Read More' button below.
      </div>
    </div>
  </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={this.handleBreathingExercise}
            >
        <div className="choice-btn-text">Breathing Exercise</div>
        </button>  
          <button
            className="user-send-choice"
            onClick={this.handleAnxietyButtonClick}
             >
            <div className="choice-btn-text">Read More!</div>
          </button>
        </div>
      </div>
         )}
        {this.state.showMessage && (
    <div className="msg left-msg">
    <div className="msg-img">
    </div>
    <div className="msg-bubble">
      <div className="msg-info">
        <div className="msg-info-name">StriveBot</div>
      </div>
      <div className="msg-text">
       I hope that was useful. If you need further support with this topic or something else, you can always below or type Well-being to explore other topics.
      </div>
    </div>
  </div>
)}
</div>
    );
  }
  return null;
};
renderCareerGuidanceChoiceButtons = (message) => {
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;

  if (lastResponse === "You are at the right place! I can help you find the right guidance to kick start your career or make a career change. Let's discuss your goals and interests, and I can recommend resources and strategies to help you achieve them. Please choose an option from below.") {
    return (
      <div className="msg-left-choice">
        <div className="msg-img">
        </div>
        <div className="user-choice">
        <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Job Search")
            }
          >
            <div className="choice-btn-text">Job Search</div>
          </button>
          <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Interview Preparation")
            }
          >
            <div className="choice-btn-text">Interview Preparation</div>
          </button>
          <button
          className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Resume writing")
            }
          >
            <div className="choice-btn-text">Resume Writing</div>
          </button>
          <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "cover letter")
            }
          >
            <div className="choice-btn-text">Cover Letter</div>
          </button>
        </div>
      </div>
    );
  }
  // return null if chatbot's last response is not "You are at the right place! I can guide you to the right resource"
  return null;
};
renderWellBeingGuidanceChoiceButtons = (message) => {
  // check if chatbot's last response is "You are at the right place! I can guide you to the right resource"
  const lastResponse = message.msag;
  if (lastResponse === "You are in the right place to find guidance for your well-being. Let's discuss your current state of mind and well-being, and I can recommend resources and strategies to help you improve your overall sense of well-being and mental health. Please select on of the following options.") {
    return (
      <div className="msg-left-choice">
        <div className="msg-img">
          <img className="msg-img" src={robotAvatar} alt="" />
        </div>
        <div className="user-choice">
          <button
          className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Stress Management")
            }
          >
            <div className="choice-btn-text">Manage Stress</div>
          </button>
          <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Get Active")
            }
          >
            <div className="choice-btn-text">Get Active</div>
          </button>
          <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "Anxiety")
            }
          >
            <div className="choice-btn-text">Anxiety Help</div>
          </button>
          <button
            className="user-send-choice"
            onClick={(e) =>
              this.handleGuidanceChoice(e, "apps for stress")
            }
          >
            <div className="choice-btn-text">Useful Resources</div>
          </button>
        </div>
      </div>
    );
  }
  // return null if chatbot's last response is not "You are at the right place! I can guide you to the right resource"
  return null;
};
// scroll chat feed down to the latest message
scrollDownChat = () => {
  const elem = document.getElementById("b-container");
  const atBottom = elem.scrollHeight - elem.scrollTop === elem.clientHeight;
  elem.scrollTop = elem.scrollHeight;
  // If the user was already at the bottom, keep them there
  if (atBottom) {
      elem.scrollTop = elem.scrollHeight;
  }
}

componentDidUpdate = ()=>{
  this.scrollDownChat();
  }
// select gif according to chatbot's response
selectGifAccordingToResponse = (response) => {
    let keyAction = "";
    let imgSrc;
    
// find matching response in dataResponse object
    for (const key in dataResponse) {
      if (Object.hasOwnProperty.call(dataResponse, key)) {
        const arraOfResponses = dataResponse[key];
        for (const element of arraOfResponses) {
          const responseData = element;
          if (response === responseData) {
            keyAction = key;
          }
        }
      }
    }
//return null if no matching response found
    if (keyAction === "") {
      return null;
    }
//assign gif according to keyAction value
    switch (keyAction) {
      case "breathing_exercises":
        imgSrc = breathingGif;
        break;
      case "show_exersices":
        imgSrc = jumpingJacks;
        break;
        case "burpees":
        imgSrc = burpeesTwo;
        break;
        case "push_ups":
        imgSrc = pushUps;
        break;
      default:
        break;
    }
  //function to render a message on the chat feed
    return (
      <div>
      <div className="msg left-msg">
        <div className="msg-img">
        </div>
        <div className="msg-bubble">
          <div className="msg-info">
            <div className="msg-info-name">StriveBot</div>
          </div>
          <div className="msg-text">
            <img src={imgSrc} className="gif-chat" alt="my-gif" />
          </div>
        </div>
      </div>
      <div className="msg left-msg">
        <div className="msg-img">
        </div>
        <div className="msg-bubble">
          <div className="msg-info">
            <div className="msg-info-name">StriveBot</div>
          </div>
          <div className="msg-text">
          <p>Would you like to do the rest of quick work outs or explore more well-being support? </p>
          </div>
        </div>
        
      </div>
      <div className="msg-left-choice">
          <div className="msg-img">
            
          </div>
          <div className="user-choice">
            <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "Continue")
              }
            >
              <div className="choice-btn-text">Continue Workout</div>
            </button>
            <button
              className="user-send-choice"
              onClick={(e) =>
                this.handleSendMessageToChatBot(e, "explore more")
              }
            >
              <div className="choice-btn-text">Explore More</div>
            </button>
          </div>
        </div>
      </div>
    );
};
displayBreathExercise = () => {
  return (
  <div className="overlay">
  <Breath />
  </div>
  );
};

endChat = (message) => {
  const lastResponse = message.msag;

  if (lastResponse === "Thank you for using StriveAI") {
  return (
    <div className="msg left-msg">
      <div className="msg-img">
      </div>
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">StriveBot</div>
        </div>
        <div className="msg-text">
          Thank you for chatting with me today! I hope I was able to help. To help me improve, please select an emoji to rate your experience and leave a short message if you have any feedback:
          <div className="emoji-rating">
          <div className="emoji-container">
          <button className={`emoji-btn ${this.state.selectedEmoji === "😊" ? "selected" : ""}`} onClick={() => this.handleEmojiRating("😊")}>😊</button>
          <button className={`emoji-btn ${this.state.selectedEmoji === "😐" ? "selected" : ""}`} onClick={() => this.handleEmojiRating("😐")}>😐</button>
          <button className={`emoji-btn ${this.state.selectedEmoji === "😩" ? "selected" : ""}`} onClick={() => this.handleEmojiRating("😩")}>😩</button>
</div>
          <form className="feedback-text-btn">    
          <textarea
         className="feedback-message"
           name="feedback-message"
           id="feedback-message"
           cols="30"
           rows="3"
           placeholder="Leave a short message..."
           value={this.state.feedbackMessage}
           onChange={this.handleChange}
          ></textarea>
            <button className="send-feedback-btn" onClick={this.handleSendFeedback}>
              Send Feedback
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
  }
};



  // function to render the chatbot UI
  render() {
    return (
      <div className="body">
        <div id="msger" className="msger">
          <div id="b-container" className="bubble-container">
            <div className="msg left-msg">
              <div className="msg-img"></div>
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">StriveBot</div>
                </div>
                <div className="msg-text">
                  Hi, I am Strive. Your Virtual Career and Well-being Guide.
                </div>
              </div>
            </div>
            <div className="msg left-msg">
              <div className="msg-img"></div>
              <div className="msg-bubble">
                <div className="msg-info"></div>
                <div className="msg-text">
                  You can interact with me by selecting one of the options below or by typing your own message in the input box. When you're ready to end the chat, simply type 'end chat' and I'll help you wrap things up.
                </div>
              </div>
            </div>
            <div className="msg left-msg">
              <div className="msg-img"></div>
              <div className="msg-bubble">
                <div className="msg-info"></div>
                <div className="msg-text">Before we get started, may I know your name?</div>
              </div>
            </div>
            {this.state.isUsernameConfirmed ? null : (
              <div className="msg left-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble-input">
                  <form className="user-input-form">
                    <input
                      type="text"
                      name="user-name"
                      className="user-input"
                      placeholder="Enter your name..."
                      value={this.state.username}
                      onChange={this.handleAdd}
                    />
                    <button
                      className="user-send-btn"
                      onClick={(e) => this.handleSubmitUsername(e)}
                    >
                      <img
                        type="submit"
                        className="msger-send-btn"
                        src={sendMessage}
                      />
                    </button>
                  </form>
                </div>
              </div>
            )}
  
            {this.state.showChatDelay ? (
              <div className="msg left-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">StriveBot</div>
                  </div>
                  <div className="msg-text">
                    <img className="chat-delay" src={chatDelay} alt="typing animation" />
                  </div>
                </div>
              </div>
            ) : this.state.isUsernameConfirmed ? (
              <div className="msg left-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info"></div>
                  <div className="msg-text">
                    Hello {this.state.username}, What can I help you with today?
                    <i className="fas fa-paper-plane"></i>
                  </div>
                </div>
              </div>
            ) : null}
  {this.state.chat.map((msg, index) => {
  if (msg.from === "cb") {
    return (
      <div key={index}>
        <div className="msg left-msg">
          <div className="msg-img"></div>
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">StriveBot</div>
            </div>
            <div className="msg-text">
            <div className="msg-text">{msg.msag}</div>
            </div>
          </div>
        </div>
        {this.renderJobSearchResources(msg) }
        {this.renderAppsforWellBeing(msg) }
        {this.getActiveArticleandWorkOuts(msg)}
        {this.anxietyArticleandBreathing(msg) }
        {this.selectGifAccordingToResponse(msg.msag)}
        {this.renderCareerGuidanceChoiceButtons(msg)}
        {this.renderWellBeingGuidanceChoiceButtons(msg)}
        {this.linkInterviewPrepArticle(msg)}
        {this.linkResumeWritingArticle(msg)}
        {this.linkCoverLetterArticle(msg)}
        {this.linkManageStressArticle(msg)}
        {this.endChat(msg)}
      </div>
    );
  } else {
    return (
      <>
        {/* Conditionally render chatDelay gif and user message based on showChatDelay state variable */}
        {this.state.showChatDelay ? (
          <div className="msg right-msg">
            <div className="msg-img">
            </div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{this.state.username}</div>
              </div>
              <div className="msg-text">
                <img className="chat-delay" src={chatDelay} alt="typing animation" />
              </div>
            </div>
          </div>
        )  : this.state.isUsernameConfirmed ?(
          <div className="msg right-msg" key={index}>
            <div className="msg-img">
            </div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{this.state.username}</div>
              </div>
              <div className="msg-text">{msg.msag}</div>
              <i className="fas fa-paper-plane"></i>
            </div>
          </div>
        ): null }
      </>
    )
  }
})}
{this.renderActionButtonOnFeed()}       
</div> 
</div>
{this.state.isUsernameConfirmed ? (
  <form className="msger-inputarea">
    <input
      type="text"
      name="msg"
      className="msger-input"
      placeholder="Enter your message..."
      onChange={(e) => this.handleChange(e)}
      value={this.state.msg}
    />
    <button
      className="container-msger-send-btn"
      onClick={(e) =>
        this.handleSendMessageToChatBot(e, this.state.msg)
      }
    >
      <img
        type="submit"
        className="msger-send-btn"
        src={sendMessage}
      />
    </button>
  </form>
) : null}

      </div>

    );
  }
}
export default Chat;
