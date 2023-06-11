// import React, { useState } from 'react';
// import {
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControl,
//   FormControlLabel
// } from '@mui/material';
// import loginServices from '../../services/login.js';
// import './SignupForm.css';

// const SignupForm = ({ switchForm, updateUser }) => {
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');

//   const handleSignup = async (event) => {
//     event.preventDefault();
//     const {
//       username: { value: username },
//       password: { value: password },
//       email: { value: email },
//       firstName: { value: firstName },
//       lastName: { value: lastName },
//       dob: { value: dob },
//       gender: { value: gender },
//       role: { value: role }
//     } = event.target;

//     const [day, month, year] = dob.split('-');
//     const dateOfBirth = new Date(year, month - 1, day);

//     const credential = {
//       username,
//       password,
//       email,
//       firstName,
//       lastName,
//       dateOfBirth,
//       gender,
//       role
//     };
//     console.log('Signup detail: ', credential);
//     const returnedUser = await loginServices.createNewAccount(credential);
//     updateUser(returnedUser);
//   };

//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   return (
//     <div className="formContainer">
//       <form className="form" onSubmit={handleSignup}>
//         <Typography variant="h2" className="title">
//           Register
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               type="text"
//               name="firstName"
//               required
//               className="input"
//               placeholder="Firstname"
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               type="text"
//               name="lastName"
//               required
//               className="input"
//               placeholder="Surname"
//             />
//           </Grid>
//         </Grid>
//         <TextField
//           type="text"
//           name="username"
//           required
//           className="input"
//           placeholder="Enter your username"
//         />
//         <TextField
//           type="email"
//           name="email"
//           required
//           className="input"
//           placeholder="Enter your email"
//         />
//         <TextField
//           type="password"
//           name="password"
//           required
//           onChange={({ target }) => setPassword(target.value)}
//           className="input"
//           placeholder="Create new password"
//         />
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography className="label">Date of birth</Typography>
//             <TextField type="date" name="dob" required className="input" />
//           </Grid>
//         </Grid>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography className="label">Gender:</Typography>
//             <RadioGroup name="gender" row>
//               <FormControlLabel value="male" control={<Radio />} label="Male" />
//               <FormControlLabel value="female" control={<Radio />} label="Female" />
//             </RadioGroup>
//           </Grid>
//         </Grid>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography className="label">Role:</Typography>
//             <RadioGroup name="role" row value={role} onChange={handleRoleChange}>
//               <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
//               <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
//             </RadioGroup>
//           </Grid>
//         </Grid>
//         <Button className="button" type="submit" variant="contained">
//           Sign Up
//         </Button>
//         <p className="switchForm">
//           Already have an account?{' '}
//           <a href="#" onClick={switchForm}>
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;


import { Button } from '@mui/material';
import React from 'react';

export function SignupForm({ signup }) {
  const handleSignup = () => {
    const credential = getCredentialsFromForm();
    signup(credential);
  };

  const getCredentialsFromForm = () => {};

  return (
    <section>
      <Button variant='contained' onClick={handleSignup}>
        Sign up
      </Button>
    </section>
  );
}