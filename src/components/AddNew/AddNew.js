import { Button, IconButton, Input } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./AddNew.css";
function AddNew({ onAddNote, onClose, titleToEdit, contentToEdit }) {
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
  const reset = (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");
  };
  const close = (e) => {
    e.preventDefault();
    onClose(true);
  };
  useEffect(() => {
    setTitle(titleToEdit);
    setContent(contentToEdit);
  }, [titleToEdit, contentToEdit]);

  return (
    <div className="addnote">
      <div className="addNote__wrapper">
        <div className="addNote__header">
          <h1>Add New Idea</h1>
          <div className="closeBtn">
            <IconButton onClick={(e) => close(e)}>
              <Close />
            </IconButton>
          </div>
        </div>

        <form className="addnote__input">
          <Input
            className="title__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            multiline
          />

          <Input
            value={content}
            className="content__input"
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Note"
            multiline
          />
          <div className="addnote__btnContainer">
            <Button
              type="submit"
              className="addBtn"
              onClick={(e) => handleAddnote(e)}
            >
              Add
            </Button>
            <Button type="reset" className="resetBtn" onClick={(e) => reset(e)}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNew;
