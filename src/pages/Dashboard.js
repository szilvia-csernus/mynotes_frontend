import React, { useContext, useEffect, useState } from "react";
import AllNotes from "../components/AllNotes";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthContext from "../store/auth-context";
import { fetchUserNotes } from "../api/note-apis";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const token = ctx.token;
  const url = ctx.url;
  const userId = ctx.userId;

  useEffect(() => {
    setIsLoading(true);
    fetchUserNotes(url, token, userId).then((data) => {
      if (data) {
        const transformedNotes = [];
        for (const key in data) {
          transformedNotes.push(data[key]);
        }
        setNotes(transformedNotes);
        console.log("notes", transformedNotes);
        setIsLoading(false);
      }
    });
  }, [url, token, userId]);

  const newNoteHandler = () => {
    navigate("/new-note", { replace: true});
  };

  return (
    <div className="board">
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <button className="btn" onClick={newNoteHandler}>
            New Note
          </button>
          <AllNotes notes={notes} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
