import React from "react";
import "../styles/Header.css";
import { House, FolderSimplePlus, Lightbulb, Note } from "phosphor-react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import { Archive, ArchiveTwoTone, SaveRounded } from "@material-ui/icons";
import Notes from "./Notes/Notes";
import Saved from "./Saved/Saved";
import Idea from "./Idea/Idea";
function Header() {
  return (
    <BrowserRouter>
      <div className="header">
        <div className="header__title">
          <img src="/images/writing.svg" alt="note icon" />
          <h1>Notes</h1>
        </div>

        <div className="header__menu">
          <ul>
            <li>
              <Link to="/">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <House />
                  </span>
                  <p className="menu__text">Home</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/notes">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Note />
                  </span>
                  <p className="menu__text">Notes</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/idea">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Lightbulb />
                  </span>
                  <p className="menu__text">Idea</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/saved">
                <div className="header__menuItem">
                  <span className="menu__icon">
                    <Archive />
                  </span>
                  <p className="menu__text">Saved</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/notes" component={Notes}></Route>
        <Route exact path="/idea" component={Idea}></Route>
        <Route exact path="/saved" component={Saved}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
