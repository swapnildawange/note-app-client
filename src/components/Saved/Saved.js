import axios from "axios";
import React, { useEffect, useState } from "react";
import Note from "../Note";

function Saved() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  useEffect(() => {
    fetchNotes();
    console.log();
  }, []);

  const fetchNotes = async () => {
    await axios
      .get("http://localhost:3000/saved")
      .then((response) => setNotes(response.data))
      .catch((error) => console.log(error));
  };
  const deleteNote = async (id) => {
    let deletedNote = null;
    await axios
      .delete("http://localhost:3000/delete/" + id)
      .then((response) => {
        fetchNotes();
        deletedNote = response.data.data;
      })
      .catch((error) => {
        console.log("error->", error);
      });
    // console.log(deletedNote);
    return deletedNote;
  };

  const moveToNotes = async (id) => {
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
  const editNote = async (id) => {
    await axios
      .put("http://localhost:3000/edit/" + id)
      .then((response) => {
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
        deleteNote(id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="saved">
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
