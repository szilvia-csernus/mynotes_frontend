import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Card from '../UI/Card';
import { deleteNote, getNote } from '../api/note-apis';
import AuthContext from '../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import { dateString } from '../UI/utils'
import classes from '../components/Notes/Notes.module.css'


function Note() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const ctx = useContext(AuthContext)
  const url = ctx.url;
  const token = ctx.token;
  const [ note, setNote ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    getNote(url, token, noteId)
      .then((data) => {
        setNote(data)
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      })
      .finally(
        setIsLoading(false)
      );
  }, [url, token, noteId, navigate])

  const deleteNoteHandler = () => {
    deleteNote(url, token, noteId)
      .then((data) => {
        console.log(data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="board">
      {isLoading && <LoadingSpinner />}
      <Card>
        {!isLoading &&  (
          <>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p className={classes.date}>Created: {dateString(note.created_at)}</p>
            <p className={classes.date}>Last modified: {dateString(note.updated_at)}</p>
            <p className={classes.edit} ><Link to={`/${noteId}/edit`}>Edit Note</Link></p>
            <p className={classes.delete} onClick={deleteNoteHandler}>Delete Note</p>
          
          </>
        )}
        
      </Card>
    </div>
  );
}

export default Note