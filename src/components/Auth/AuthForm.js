/* This was a combined authentication form, including sign up, login and changing
passwords. However, from state-management perspective it was necessary to handle
those cases in distinct components. */

// import React, { useContext, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Card from '../../UI/Card';
// import { signupUser, loginUser, updateUser } from '../../api/user-apis';
// import AuthContext from '../../store/auth-context';
// import Modal from '../Modal';

// import classes from '../Form.module.css';

// const AuthForm = () => {
// 	const ctx = useContext(AuthContext);
// 	const params = useParams();

// 	const initialType = params.form ? params.form : 'login';
// 	const [type, setType] = useState(initialType);

// 	const [enteredFirstname, setEnteredFirstName] = useState('');
// 	const [enteredUsername, setEnteredUsername] = useState('');
// 	const [enteredPassword, setEnteredPassword] = useState('');
// 	const [enteredNewPassword1, setEnteredNewPassword1] = useState('');
// 	const [enteredNewPassword2, setEnteredNewPassword2] = useState('');
// 	const [passwordError, setPasswordError] = useState('');

// 	const navigate = useNavigate();

// 	const firstNameChangeHandler = (event) => {
// 		setEnteredFirstName(event.target.value);
// 	};

// 	const usernameChangeHandler = (event) => {
// 		setEnteredUsername(event.target.value);
// 	};

// 	const passwordChangeHandler = (event) => {
// 		setEnteredPassword(event.target.value);
// 	};

// 	const newPasswordChangeHandler1 = (event) => {
// 		setEnteredNewPassword1(event.target.value);
// 	};

// 	const newPasswordChangeHandler2 = (event) => {
// 		setEnteredNewPassword2(event.target.value);
// 	};

// 	function submitFormHandler(event) {
// 		event.preventDefault();

// 		if (enteredNewPassword1 !== enteredNewPassword2) {
// 			setPasswordError("Passwords don't match!");
// 			setEnteredNewPassword2('');
// 			return;
// 		}

// 		let userData;
// 		switch (type) {
// 			case 'change-password':
// 				userData = {
// 					username: ctx.username,
// 					password: enteredPassword,
// 					newPassword: enteredNewPassword1,
// 				};
// 				break;
// 			case 'signup':
// 				userData = {
// 					first_name: enteredFirstname,
// 					username: enteredUsername,
// 					password: enteredPassword,
// 				};
// 				break;
// 			case 'login':
// 				userData = {
// 					username: enteredUsername,
// 					password: enteredPassword,
// 				};
// 				break;
// 			default:
// 				userData = {};
// 		}

// 		let actionFunction;
// 		switch (type) {
// 			case 'signup':
// 				actionFunction = signupUser;
// 				break;
// 			case 'login':
// 				actionFunction = loginUser;
// 				break;
// 			case 'change-password':
// 				actionFunction = updateUser; 
// 				break;
// 			default:
// 				actionFunction = () => {};
// 		}

// 		actionFunction(ctx.url, userData)
// 			.then((data) => {
// 				if (data.error) {
// 					ctx.logout();
// 					navigate('/auth/login');
// 					alert(data.error);
// 				} else {
// 					ctx.login(
// 						data.token,
// 						data.user.id,
// 						data.user.username,
// 						data.user.first_name
// 					);
// 					navigate('/dashboard');
// 				}
// 			})
// 			.catch((err) => {
// 				ctx.logout();
// 				navigate('/auth/login');
// 				alert(err);
				
// 			});

// 		setEnteredFirstName('');
// 		setEnteredUsername('');
// 		setEnteredPassword('');
// 		setEnteredNewPassword1('');
// 		setEnteredNewPassword2('');
// 	}

// 	return (
// 		<Modal>
// 			<Card>
// 				<form className={classes.form} onSubmit={submitFormHandler}>
// 					{type === 'signup' && (
// 						<div className={classes.control}>
// 							<label htmlFor="firstname">First Name</label>
// 							<input
// 								type="text"
// 								id="firstname"
// 								placeholder="First Name"
// 								value={enteredFirstname}
// 								onChange={firstNameChangeHandler}
// 							/>
// 						</div>
// 					)}
// 					{type !== 'change-password' && (
// 						<div className={classes.control}>
// 							<label htmlFor="username">Username</label>
// 							<input
// 								type="text"
// 								id="username"
// 								placeholder="username"
// 								value={enteredUsername}
// 								onChange={usernameChangeHandler}
// 							/>
// 						</div>
// 					)}
// 					<div className={classes.control}>
// 						<label
// 							htmlFor={type === 'signup' ? 'new-password' : 'current-password'}
// 						>
// 							{type === 'change-password' && 'Current'} Password
// 						</label>
// 						<input
// 							type="password"
// 							id={type === 'signup' ? 'new-password' : 'current-password'}
// 							placeholder={
// 								type === 'signup' ? 'new-password' : 'password'
// 							}
// 							value={enteredPassword}
// 							onChange={passwordChangeHandler}
// 						/>
// 					</div>
// 					{type === 'change-password' && (
// 						<>
// 							<div className={classes.control}>
// 								<label htmlFor="newPassWord1">New Password</label>
// 								<input
// 									type="password"
// 									id="newPassWord1"
// 									placeholder='new password'
// 									value={enteredNewPassword1}
// 									onChange={newPasswordChangeHandler1}
// 								/>
// 							</div>
// 							<div className={classes.control}>
// 								<label htmlFor="newPassWord2">Repeat New Password</label>
// 								<input
// 									type="password"
// 									id="newPassWord2"
// 									placeholder='repeat new password'
// 									value={enteredNewPassword2}
// 									onChange={newPasswordChangeHandler2}
// 								/>
// 							</div>
// 							{passwordError && (
// 								<p className={classes.error}>{passwordError}</p>
// 							)}
// 						</>
// 					)}
// 					<div className={classes.actionsLayout}>
// 						{type === 'login' && (
// 							<div>
// 								Don't have an account yet?
// 								<span
// 									className={classes.link}
// 									onClick={() => setType('signup')}
// 								>
// 									Sign up here
// 								</span>
// 							</div>
// 						)}
// 						{type === 'signup' && (
// 							<div>
// 								Already have an account?
// 								<span className={classes.link} onClick={() => setType('login')}>
// 									Log in here
// 								</span>
// 							</div>
// 						)}
// 						<div className={classes.actions}>
// 							<button className="btn">
// 								{type === 'login' && 'Login'}
// 								{type === 'signup' && 'Sign Up'}
// 								{type === 'change-password' && 'Confirm'}
// 							</button>
// 						</div>
// 					</div>
// 				</form>
// 			</Card>
// 		</Modal>
// 	);
// };

// export default AuthForm;
