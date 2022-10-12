import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../../api/note-apis';
import AuthContext from '../../store/auth-context';
import classes from '../Form.module.css';


const NoteForm = () => {
  
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentBody, setCurrentBody] = useState('')
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    const submitFormHandler = e => {
        e.preventDefault();
          createNote(ctx.url, ctx.token, ctx.userId, {
						title: currentTitle,
						body: currentBody,
					})
						.then((data) => {
							console.log(data);
							navigate(`/${data.id}`);
						})
						.catch((err) => {
							console.log(err);
							navigate('/new-note');
						});
        }
    
  
    const titleChangeHandler = e => {
        setCurrentTitle(e.target.value)
    }

    const bodyChangeHandler = e => {
        setCurrentBody(e.target.value)
    }
  

  return (
    <>
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
          <label
            htmlFor="body"
          >
            Note
          </label>
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
    </>
  );
}

export default NoteForm