import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Notes.css";

import Note from "../Note";
import AddNew from "../AddNew/AddNew";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [openAdd, setOpenAdd] = useState(true);

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
      .post("http://localhost:3000/save", note)
      .then((response) => {
        fetchNotes();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };
  const deleteNote = async (id) => {
    let deletedNote = null;
    await axios
      .delete("http://localhost:3000/delete/" + id)
      .then((response) => {
        deletedNote = response.data.data;
        fetchNotes();
      })
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(deletedNote);
    return deletedNote;
  };

  const addToSaved = async (id) => {
    const savedNote = await deleteNote(id);
    const note = {
      id: savedNote.id,
      title: savedNote.title,
      content: savedNote.content,
    };
    await axios
      .post("http://localhost:3000/saved/save", note)
      .then((response) => fetchNotes())
      .catch((err) => console.log(err));
  };

  const addToCompleted = async (id) => {
    const savedNote = await deleteNote(id);
    const note = {
      id: savedNote.id,
      title: savedNote.title,
      content: savedNote.content,
    };
    await axios
      .post("http://localhost:3000/completed/save", note)
      .then((response) => fetchNotes())
      .catch((err) => console.log(err));
  };
  const editNote = async (id, title, content) => {
    const note = {
      id,
      title,
      content,
    };
    await axios
      .put("http://localhost:3000/edit/" + id, note)
      .then((response) => {
        console.log(response);
        // setTitle(response.data.data.title);
        // setContent(response.data.data.content);
        // setOpenAdd(true);
        // deleteNote(id);
        // fetchNotes();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="notes">
      {openAdd && (
        <AddNew
          onAddNote={(note) => addNote(note)}
          onClose={() => setOpenAdd(false)}
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
          onCompleted={addToCompleted}
          onEdit={editNote}
        />
      ))}
    </div>
  );
}

export default Notes;
