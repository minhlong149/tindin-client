import React, { useState, useEffect } from 'react';

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import loginServices from './services/login.js';

export const UserContext = React.createContext();

function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const updateUser = async (user = null) => {
    try {
      if (user == null) {
        // Handle logout
        loginServices.removeUserFromLocalStorage();
        setUser(null);
        return;
      }
      // Handle user login
      const returnedUser = await loginServices.login(user);
      setUser(returnedUser);

      // Save user info if saveInfo is true
      user.saveInfo && loginServices.storeUserToLocalStorage(returnedUser);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  // useEffect(() => {
  //   const loggedUserJSON = loginServices.getUserFromLocalStorage();
  //   setUser(loggedUserJSON);
  // }, []);

  const logout = () => {
    console.log('Logout');
    loginServices.removeUserFromLocalStorage();
    setUser(null);
  };

  return (
    <>
      {user !== null ? (
        // Render Homepage component if user is logged in
        <UserContext.Provider value={user}>
          <Home logout={logout} />
        </UserContext.Provider>
      ) : (
        // Render Login component if user is not logged in
        <Login updateUser={updateUser} message={message} />
      )}
    </>
  );
}

export default App;
