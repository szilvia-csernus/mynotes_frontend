import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card';
import { signupUser } from '../../api/user-apis';
import AuthContext from '../../store/auth-context';
import Modal from '../Modal/Modal';

import classes from '../Form.module.css';

const SignUp = () => {
	const ctx = useContext(AuthContext);
	
	const [enteredFirstname, setEnteredFirstName] = useState('');
	const [enteredUsername, setEnteredUsername] = useState('');
	
	const [enteredNewPassword1, setEnteredNewPassword1] = useState('');
	const [enteredNewPassword2, setEnteredNewPassword2] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const navigate = useNavigate();

	const firstNameChangeHandler = (event) => {
		setEnteredFirstName(event.target.value);
	};

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const newPasswordChangeHandler1 = (event) => {
		setEnteredNewPassword1(event.target.value);
	};

	const newPasswordChangeHandler2 = (event) => {
		setEnteredNewPassword2(event.target.value);
	};

	function submitFormHandler(event) {
		event.preventDefault();

		if (enteredNewPassword1 !== enteredNewPassword2) {
			setPasswordError("Passwords don't match!");
			setEnteredNewPassword2('');
			return;
		}

		let userData = {
					first_name: enteredFirstname,
					username: enteredUsername,
					password: enteredNewPassword1
        }
		

		signupUser(ctx.url, userData)
			.then((data) => {
				console.log(userData);
				console.log(data);
				if (data.error) {
					ctx.logout();
					navigate('/auth/login');
					alert(data.error || 'Signing Up Unsuccessful!');
				} else {
					ctx.login(
						data.token,
						data.user.id,
						data.user.username,
						data.user.first_name
					);
					navigate('/dashboard');
				}
			})
			.catch((err) => {
				ctx.logout();
				navigate('/auth/login');
				alert(err || 'Signing Up Unsuccessful!');
			});

		setEnteredFirstName('');
		setEnteredUsername('');
		setEnteredNewPassword1('');
		setEnteredNewPassword2('');
	}

	return (
		<Modal>
			<Card>
				<form className={classes.form} onSubmit={submitFormHandler}>
					<div className={classes.control}>
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							id="firstname"
							placeholder="First Name"
							autoComplete="on"
							value={enteredFirstname}
							onChange={firstNameChangeHandler}
						/>
					</div>

					<div className={classes.control}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							placeholder="username"
							autoComplete='off'
							value={enteredUsername}
							onChange={usernameChangeHandler}
						/>
					</div>

					<div className={classes.control}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="password"
							autoComplete="off"
							value={enteredNewPassword1}
							onChange={newPasswordChangeHandler1}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="repeatPassword">Repeat Password</label>
						<input
							type="password"
							id="repeatPassword"
							placeholder="repeat password"
							autoComplete="false"
							value={enteredNewPassword2}
							onChange={newPasswordChangeHandler2}
						/>
					</div>
					{passwordError && <p className={classes.error}>{passwordError}</p>}

					<div className={classes.actionsLayout}>
						<div>
							Already have an account?
							<span
								className={classes.link}
								onClick={() => navigate('/auth/login')}
							>
								Log in here
							</span>
						</div>

						<div className={classes.actions}>
							<button className="btn">Sign Up</button>
						</div>
					</div>
				</form>
			</Card>
		</Modal>
	);
};

export default SignUp;
