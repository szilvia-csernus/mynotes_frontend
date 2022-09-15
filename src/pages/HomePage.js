import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Dashboard from './Dashboard';

const HomePage = (props) => {
  const ctx = useContext(AuthContext);

  let content = <Dashboard/>;

  if (!ctx.token) {
    content = (<Navigate to="/auth/login" repalce={true}/>)
  }
  

  return content
}

export default HomePage