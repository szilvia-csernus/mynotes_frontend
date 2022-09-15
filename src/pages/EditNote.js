import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import { getNote, updateNote } from "../api/note-apis";
import AuthContext from "../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from '../components/Form.module.css'

function EditNote() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const ctx = useContext(AuthContext);
  const url = ctx.url;
  const token = ctx.token;
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentBody, setCurrentBody] = useState('')
  const [isLoading, setIsLoading] = useState(true);   

  useEffect(() => {
    setIsLoading(true);
    getNote(url, token, noteId)
      .then((note) => {
        setCurrentTitle(note.title);
        setCurrentBody(note.body)
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      })
      .finally(setIsLoading(false));
  }, [url, token, noteId, navigate]);

  
  const submitFormHandler = (e) => {
    e.preventDefault();
    updateNote(
      ctx.url,
      ctx.token,
      {
        note: {
          title: currentTitle,
          body: currentBody,
        },
      },
      noteId
    )
      .then((data) => {
        navigate(`/${data.id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const titleChangeHandler = (e) => {
    setCurrentTitle(e.target.value);
  };

  const bodyChangeHandler = (e) => {
    setCurrentBody(e.target.value);
  };


  return (
    <div className="board">
      {isLoading && <LoadingSpinner />}
      <Card>
        {!isLoading && (
          <form className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={currentTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="body">Note</label>
              <textarea
                name="body"
                id="body"
                onChange={bodyChangeHandler}
                value={currentBody}
              />
            </div>
            <div className={classes.actions}>
              <button className="btn">Save</button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

export default EditNote;
