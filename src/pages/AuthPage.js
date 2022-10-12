import { useParams } from 'react-router-dom';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import ChangePassword from '../components/Auth/ChangePassword';

const AuthPage = () => {
	const params = useParams();
	const formType = params.form ? params.form : 'login';
	switch (formType) {
		case 'login':
			return <Login />
		case 'signup':
			return <SignUp />
		case 'change-password':
			return <ChangePassword />
		default:
			return <Login />
	}
	
};

export default AuthPage;
