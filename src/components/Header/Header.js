import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import AuthContext from "../../store/auth-context";

const Header = () => {
  const ctx = useContext(AuthContext)
  const navigate = useNavigate()

  const onLogOut = () => {
    ctx.logout();
    navigate('/')
  }
  
  return (
		<header className={classes.header}>
			<div className={classes.frame}>
				<h1 className={classes.logo}>
					<Link to={'/'}>{ctx.token ? `${ctx.firstName}'s ` : 'My '} notes</Link>
				</h1>
				<nav className={classes.nav}>
					<ul>
						{ctx.token && (
							<>
								<li>
									<NavLink
										to="/dashboard"
										className={(navData) =>
											navData.isActive ? classes.active : undefined
										}
									>
										All Notes
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/new-note"
										className={(navData) =>
											navData.isActive ? classes.active : undefined
										}
									>
										New Note
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/auth/change-password"						
										className={(navData) =>
											navData.isActive ? classes.active : undefined
										}
									>
										Change Password
									</NavLink>
								</li>
								<li className={classes.logout} onClick={onLogOut}>
									Sign Out
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
