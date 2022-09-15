import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
// import AllNotes from './components/AllNotes';
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import NewNote from "./pages/NewNote";
import Note from "./pages/Note";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import EditNote from "./pages/EditNote";

function App() {
  const ctx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auth/:form" element={<AuthPage />} />
        {ctx.token && (<>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/:noteId" element={<Note />} />
          <Route path="/:noteId/edit" element={<EditNote />} />
        </>    
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
