import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card';
import { loginUser } from '../../api/user-apis';
import AuthContext from '../../store/auth-context';
import Modal from '../Modal/Modal';

import classes from '../Form.module.css';

const Login = () => {
	const ctx = useContext(AuthContext);

	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');

	const navigate = useNavigate();

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	function submitFormHandler(event) {
		event.preventDefault();

		let userData = {
			username: enteredUsername,
			password: enteredPassword,
		};

		loginUser(ctx.url, userData)
			.then((data) => {
				console.log(userData);
				console.log(data);
				if (data.error) {
					ctx.logout();
					navigate('/auth/login');
					alert(data.error);
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
				alert(err);
			});

		setEnteredUsername('');
		setEnteredPassword('');
	}

	return (
		<Modal>
			<Card>
				<form className={classes.form} onSubmit={submitFormHandler}>
					<div className={classes.control}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							placeholder="username"
							autoComplete="off"
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
							value={enteredPassword}
							onChange={passwordChangeHandler}
						/>
					</div>

					<div className={classes.actionsLayout}>
						<div>
							Don't have an account yet?
							<span
								className={classes.link}
								onClick={() => navigate('/auth/signup')}
							>
								Sign up here
							</span>
						</div>

						<div className={classes.actions}>
							<button className="btn">Login</button>
						</div>
					</div>
				</form>
			</Card>
		</Modal>
	);
};

export default Login;
