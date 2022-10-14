import React, { useState, useEffect, createContext, useCallback } from "react";

// This authentication creates localstrorage entries incl. a token and an expiration time.
// The localstorage data will be updated when the user logs in or out, refreshes the
// page or the time runs out set with setTimeout().
// Localstorage data, in general, persists after browser shutdown.

const AuthContext = createContext({
  url: '',
  token: null,
  userId: null,
  username: null,
  firstName: '',
  login: (token) => {},
  logout: () => {},
});

const localStorage = window.localStorage
let logoutTimer;
const calculateRemainingTime = (expirationTime) => expirationTime - Date.now();

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem('username');
  const storedFirstName = localStorage.getItem('firstName');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedUserId,
    username: storedUsername,
    firstName: storedFirstName
  };
};


export const AuthContextProvider = (props) => {
  const localStorageData = retrieveStoredToken();
  let initialToken;
  let initialUserId;
  let initialUsername;
  let initialFirstName;
  if (localStorageData) {
    initialToken = localStorageData.token;
    initialUserId = localStorageData.userId;
    initialUsername = localStorageData.username;
    initialFirstName = localStorage.firstName;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [username, setUsername] = useState(initialUsername);
  const [firstName, setFirstName] = useState(initialFirstName);

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, userId, username, firstName) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setFirstName(firstName);

    const expiresAt = Date.now() + 3600000 // stay logged in for 1 hour
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expiresAt);
    localStorage.setItem("userId", userId);
    localStorage.setItem('username', username);
    localStorage.setItem('firstName', firstName)

    const remainingTime = calculateRemainingTime(expiresAt);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
    
  };

  useEffect(() => {
    if (localStorageData) {
      logoutTimer = setTimeout(logoutHandler, localStorageData.duration);
    }
  }, [localStorageData, logoutHandler]);

  const contextValue = {
		url: "http://localhost:4000",
		// url: 'https://my-notes-rails7.herokuapp.com',
		token,
		userId,
		username,
		firstName,
		login: loginHandler,
		logout: logoutHandler,
	};

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
