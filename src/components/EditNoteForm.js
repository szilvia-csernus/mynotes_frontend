// import React, { useContext, useState } from "react";

// import classes from "./Form.module.css";
// import { updateNote } from "../api/note-apis";
// import AuthContext from "../store/auth-context";
// import { useNavigate } from "react-router-dom";

// const EditNoteForm = (props) => {
//   const [currentTitle, setCurrentTitle] = useState("");
//   const [currentBody, setCurrentBody] = useState(props.body);
//   const ctx = useContext(AuthContext);
//   const navigate = useNavigate();

//   const submitFormHandler = (e) => {
//     e.preventDefault();
//     updateNote(
//       ctx.url,
//       ctx.token,
//       {
//         note: {
//           title: currentTitle,
//           body: currentBody,
//         },
//       },
//       props.note.id
//     )
//       .then((data) => {
//         navigate(`/${data.id}`);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const titleChangeHandler = (e) => {
//     setCurrentTitle(e.target.value);
//   };

//   const bodyChangeHandler = (e) => {
//     setCurrentBody(e.target.value);
//   };

//   return (
//     <form className={classes.form} onSubmit={submitFormHandler}>
//       <div className={classes.control}>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={currentTitle}
//           onChange={titleChangeHandler}
//         />
//       </div>
//       <div className={classes.control}>
//         <label htmlFor="body">Note</label>
//         <textarea
//           name="body"
//           id="body"
//           onChange={bodyChangeHandler}
//           value={currentBody}
//         />
//       </div>
//       <div className={classes.actions}>
//         <button className="btn">Save</button>
//       </div>
//     </form>
//   );
// };

// export default EditNoteForm;
