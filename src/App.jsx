import React, { useState, useEffect } from 'react';

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import loginServices from './services/login.js';

export const UserContext = React.createContext();

function App() {
   const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const updateUser = async (user) => {
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

  useEffect(() => {
    // Check if there is a logged-in user in local storage
    const loggedUserJSON = loginServices.getUserFromLocalStorage();
    setUser(loggedUserJSON);
  }, []);

  return (
    <>
           {user !== null ? (
        // Render Homepage component if user is logged in
        <UserContext.Provider value={user}>
          <Home user={user} logout={updateUser} />
        </UserContext.Provider>
      ) : (
        // Render Login component if user is not logged in
        <Login updateUser={updateUser} message={message} />
      )}
    </>
  );
}

export default App;


// import React, { useState } from 'react';

// import Home from './components/Home.jsx';
// import Login from './components/Login/Login.jsx';
// import loginServices from './services/login.js';

// export const UserContext = React.createContext();

// function App() {
//   const [user, setUser] = useState(null);

//   const login = (credential) => {
//     const user = loginServices.login(credential);
//     if (user !== null) {
//       setUser(user);
//       loginServices.storeUserToLocalStorage(user);
//     }
//   };

//   const logout = () => {
//     loginServices.removeUserFromLocalStorage();
//     setUser(null);
//   };

//   return (
//     <>
//       {user !== null ? (
//         <UserContext.Provider value={user}>
//           <Home logout={logout} />
//         </UserContext.Provider>
//       ) : (
//         <Login login={login} />
//       )}
//     </>
//   );
// }

// export default App;