import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../UI/Card';
import { updateUser } from '../../api/user-apis';
import AuthContext from '../../store/auth-context';
import Modal from '../Modal/Modal';

import classes from '../Form.module.css';

const ChangePassword = () => {
	const ctx = useContext(AuthContext);
	
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredNewPassword1, setEnteredNewPassword1] = useState('');
	const [enteredNewPassword2, setEnteredNewPassword2] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const navigate = useNavigate();

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);
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

		const userData = {
					username: ctx.username,
					password: enteredPassword,
					newPassword: enteredNewPassword1,
				};
		
		updateUser(ctx.url, userData)
			.then((data) => {
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

		setEnteredPassword('');
		setEnteredNewPassword1('');
		setEnteredNewPassword2('');
	}

	return (
		<Modal>
			<Card>
				<form className={classes.form} onSubmit={submitFormHandler}>
					
					<div className={classes.control}>
						<label
							htmlFor='current-password'
						>
							Current Password
						</label>
						<input
							type="password"
							id='current-password'
							placeholder='current password'
							autoComplete='off'
							value={enteredPassword}
							onChange={passwordChangeHandler}
						/>
					</div>
                    <div className={classes.control}>
                        <label htmlFor="newPassWord1">New Password</label>
                        <input
                            type="password"
                            id="newPassWord1"
                            placeholder="new password"
							autoComplete='off'
                            value={enteredNewPassword1}
                            onChange={newPasswordChangeHandler1}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="newPassWord2">Repeat New Password</label>
                        <input
                            type="password"
                            id="newPassWord2"
                            placeholder="repeat new password"
							autoComplete='off'
                            value={enteredNewPassword2}
                            onChange={newPasswordChangeHandler2}
                        />
                    </div>
                    {passwordError && (
                        <p className={classes.error}>{passwordError}</p>
                    )}
                
					
					<div className={classes.actionsLayout}>
						
						<div className={classes.actions}>
							<button className="btn">
								Confirm
							</button>
						</div>
					</div>
				</form>
			</Card>
		</Modal>
	);
};

export default ChangePassword;
