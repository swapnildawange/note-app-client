import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Notes.css";

import Note from "../Note";
import AddNew from "../AddNew/AddNew";
import { Add, PlusOneTwoTone } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios
      .get("http://localhost:3000/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.log(error));
  }
  const addNote = async (note) => {
    await axios
      .post("http://localhost:3000/notes/save", note)
      .then((response) => {})
      .catch(() => {
        console.log("Internal server error");
      });
    fetchNotes();
  };
  const deleteNote = async (id) => {
    await axios
      .delete("http://localhost:3000/notes/delete/" + id)
      .then((response) => {})
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(deletedNote);
    fetchNotes();
  };

  const addToSaved = async (id) => {
    let note = {};
    await axios
      .delete("http://localhost:3000/notes/delete/" + id)
      .then((response) => {
        note = {
          title: response.data.data.title,
          content: response.data.data.content,
        };
      })
      .catch((error) => {
        console.log("error->", error);
      });
    console.log(note);
    await axios
      .post("http://localhost:3000/saved/save", note)
      .then((response) => fetchNotes())
      .catch((err) => console.log(err));
    fetchNotes();
  };

  // const addToCompleted = async (id) => {
  //   const savedNote = await deleteNote(id);
  //   const note = {
  //     id: savedNote.id,
  //     title: savedNote.title,
  //     content: savedNote.content,
  //   };
  //   await axios
  //     .post("http://localhost:3000/completed/save", note)
  //     .then((response) => fetchNotes())
  //     .catch((err) => console.log(err));
  // };
  const editNote = (id, title, content) => {
    setTitle(title);
    setContent(content);
    setIdToEdit(id);
    setOpenEdit(true);
    setOpenAdd(false);
  };
  const saveEditted = async ({ title, content }) => {
    console.log();
    const note = {
      id: idToEdit,
      title,
      content,
    };
    await axios
      .put("http://localhost:3000/notes/edit/" + idToEdit, note)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    fetchNotes();
  };
  const closeWindow = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };
  return (
    <div className="notes">
      <div className="addBtn">
        <IconButton onClick={() => setOpenAdd(true)}>
          <Add />
        </IconButton>
      </div>
      {openAdd && (
        <AddNew
          onAddNote={(note) => addNote(note)}
          onClose={closeWindow}
          titleToEdit={title}
          contentToEdit={content}
        />
      )}
      {openEdit && (
        <AddNew
          onAddNote={(note) => saveEditted(note)}
          onClose={closeWindow}
          titleToEdit={title}
          contentToEdit={content}
        />
      )}
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onSaved={addToSaved}
          // onCompleted={addToCompleted}
          onEdit={editNote}
        />
      ))}
    </div>
  );
}

export default Notes;
