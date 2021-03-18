import { Button, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import { Trash } from "phosphor-react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Idea.css";
import AddNew from "../AddNew/AddNew.js";
import IdeaElement from "../IdeaElement/IdeaElement";
function Idea() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetchIdeas();
  }, []);
  const fetchIdeas = async () => {
    await Axios.get("http://localhost:3000/idea")
      .then((response) => setIdeas(response.data))
      .catch((error) => console.log(error));
  };
  const addIdea = async (idea) => {
    await Axios.post("http://localhost:3000/idea/save", idea)
      .then((response) => {
        console.log(response);
        fetchIdeas();
        setContent("");
        setTitle("");
      })
      .catch((err) => console.log(err));
  };
  const closeAddWindow = () => {
    setOpenAdd(false);
  };
  const deleteAllIdeas = async () => {
    await Axios.delete("https://localhost:3000/idea/deleteall")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  console.log(ideas);
  return (
    <div className="idea">
      {openAdd && (
        <AddNew
          onAddNote={(idea) => {
            addIdea(idea);
          }}
          onClose={closeAddWindow}
        />
      )}
      <div className="idea__left">
        <div className="idea__left__body">
          <div className="idea__left__header">
            <h1>All Ideas</h1>
            <IconButton className="idea__deleteAllBtn" onClick={deleteAllIdeas}>
              <Trash />
            </IconButton>
          </div>
          <div className="idea__left__feed">
            <div className="idea__left__feedBody">
              {ideas.map((idea) => (
                <IdeaElement
                  key={idea._id}
                  id={idea._id}
                  title={idea.title}
                  content={idea.content}
                />
              ))}
            </div>
          </div>
          <div className="idea__left__footer">
            <div className="idea__footer__add">
              <Button
                onClick={() => setOpenAdd(true)}
                className="idea__footer__addBtn"
              >
                <AddCircleOutlineIcon />
                <p className="idea__footer__addBtntext"> Add new Ideas</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="idea__right"></div>
    </div>
  );
}

export default Idea;
