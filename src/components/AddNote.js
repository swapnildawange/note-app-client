import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/AddNote.css";
function AddNote({ onAddNote, titleToEdit, contentToEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleAddnote = async (e) => {
    e.preventDefault();
    if (title && content) {
      onAddNote({ title: title, content: content });
      setTitle("");
      setContent("");
    }
  };
  useEffect(() => {
    setTitle(titleToEdit);
    setContent(contentToEdit);
  }, [titleToEdit, contentToEdit]);

  return (
    <div className="addnote">
      <form className="addnote__input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Note"
        />
        <button type="submit" onClick={(e) => handleAddnote(e)}></button>
      </form>
    </div>
  );
}

export default AddNote;
