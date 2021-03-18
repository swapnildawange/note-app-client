import React from "react";
import "./IdeaElement.css";
function IdeaElement({ id, title, content }) {
  return (
    <div className="ideaElement">
      <div className="ideaElement__left">
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <div className="ideaElement__right">
        <p>Time</p>
      </div>
    </div>
  );
}

export default IdeaElement;
