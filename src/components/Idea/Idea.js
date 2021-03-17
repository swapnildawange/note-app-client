import { Button, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Trash } from "phosphor-react";
import React from "react";
import "./Idea.css";
function Idea() {
  return (
    <div className="idea">
      <div className="idea__left">
        <div className="idea__left__body">
          <div className="idea__left__header">
            <h1>All Ideas</h1>
            <IconButton className="idea__deleteAllBtn">
              <Trash />
            </IconButton>
          </div>
          <div className="idea__left__feed"></div>
          <div className="idea__left__footer">
            <div className="idea__footer__add">
              <Button className="idea__footer__addBtn">
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
