import React from "react";
import "../styles/Note.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Button, IconButton } from "@material-ui/core";
import axios from "axios";
import { NoteAdd, Save, TurnedInNot } from "@material-ui/icons";
function Note({ id, title, content, onDelete, onSaved, onCompleted, onEdit }) {
  const handleDelete = (e) => {
    onDelete(id);
  };
  const handleSaved = (e) => {
    onSaved(id);
  };
  const handleCompleted = (e) => {
    onCompleted(id);
  };
  const handleEdit = (e) => {
    onEdit(id);
  };
  return (
    <div className="note">
      <h3>{title}</h3>
      {/* <hr className="note__underline" /> */}
      <div className="note__content">
        <p>{content}</p>
        <hr className="note__underline" />
        <div className="note__buttons">
          <IconButton onClick={handleSaved}>
            <TurnedInNot />
          </IconButton>
          <IconButton>
            <NoteAdd />
          </IconButton>
          <IconButton onClick={handleCompleted}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Note;
