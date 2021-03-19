import axios from "axios";
import React, { useEffect, useState } from "react";
import AddNew from "../AddNew/AddNew";
import Note from "../Note";

function Saved() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    await axios
      .get("http://localhost:3000/saved")
      .then((response) => setNotes(response.data))
      .catch((error) => console.log(error));
  };
  const deleteNote = async (id) => {
    await axios
      .delete("http://localhost:3000/saved/delete/" + id)
      .then((response) => {})
      .catch((error) => {
        console.log("error->", error);
      });

    fetchNotes();
  };

  const moveToNotes = async (id) => {
    let note = {};
    await axios
      .delete("http://localhost:3000/saved/delete/" + id)
      .then((response) => {
        note = {
          title: response.data.data.title,
          content: response.data.data.content,
        };

        // fetchNotes();
      })
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(note);

    await axios
      .post("http://localhost:3000/notes/save", note)
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
  };
  const saveEditted = async ({ title, content }) => {
    console.log();
    const note = {
      id: idToEdit,
      title,
      content,
    };
    await axios
      .put("http://localhost:3000/saved/edit/" + idToEdit, note)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    fetchNotes();
  };
  const closeWindow = () => {
    setOpenEdit(false);
  };
  return (
    <div className="saved">
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
          onSaved={moveToNotes}
          onEdit={editNote}
        />
      ))}
    </div>
  );
}

export default Saved;
