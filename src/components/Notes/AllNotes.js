import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import classes from "./Notes.module.css";
import { dateString } from "../../UI/utils";

const AllNotes = (props) => {
  return (
    <>
      {props.notes.length === 0 && (
        <p className={classes.noNotes}>Seems you have no notes yet. Why not create some?</p>
      )}
      <ul className={classes.notes}>
        {props.notes.map((note) => (
          <li key={note.id}>
            <Card>
              <Link
                to={`/${note.id}`}
              >
                <h3>{note.title}</h3>
              </Link>
              <p>
                {note.body.length > 19
                  ? `${note.body.slice(0, 20)} ...`
                  : note.body}
              </p>
              <p className={classes.date}>{dateString(note.created_at)}</p>
              <p className={classes.edit}><Link to={`/${note.id}/edit`}>Edit Note</Link></p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllNotes;
