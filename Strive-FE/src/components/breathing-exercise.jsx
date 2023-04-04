import React from "react";
import breathingGif from "../assets/gifs/anxiety.gif";
import "./breathing.css";
class Breath extends React.Component {
  render() {
    return (
      <div className="body">
        <img
                  type="submit"
                  className="breath-gif"
                  src={breathingGif}
                />
                 <button className="done">
      Done
        </button>
      </div>
   
    );
  }
}
export default Breath;
