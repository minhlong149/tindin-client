import React, { useState } from 'react';
import './LoginForm.css';
import { Typography, Grid, TextField, Button } from '@mui/material';

const LoginForm = ({ switchForm, updateUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const credential = { username, password, saveInfo };
    updateUser(credential);
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleLogin}>
        <Typography variant="h2" className="title">
          Login
        </Typography>
        <div className="input-container">
          <TextField
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your username"
          />
        </div>

        <div className="input-container">
          <TextField
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your password"
          />
        </div>

        <Button className="button" type="submit" variant="contained">
          Login
        </Button>

        <div className="flex justify-between items-center gap-2">
          <label>
            <input
              className="cursor-pointer"
              type="checkbox"
              name="saveInfo"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            Remember me
          </label>

          <a className="switchForm" href="#" onClick={switchForm}>
            Create new account
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

// import { Button } from '@mui/material';
// import React from 'react';

// export function LoginForm({ login }) {
//   const handleLogin = () => {
//     const credential = getCredentialsFromForm();
//     login(credential);
//   };

//   const getCredentialsFromForm = () => {};

//   return (
//     <section>
//       <Button variant='contained' onClick={handleLogin}>
//         Login
//       </Button>
//     </section>
//   );
// }