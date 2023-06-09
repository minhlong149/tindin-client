// class LoginService {
//   async login(credential) {
//     try {
//       const response = await axios.post('/api/login', credential);
//       const returnedUser = response.data;
//       console.log(`Logged ${credential ? 'in' : 'out'} successfully: `, returnedUser);
//       return returnedUser;
//     } catch (error) {
//       console.log(error);
//       throw new Error(error);
//     }
//   }

//   storeUserToLocalStorage(user) {
//     localStorage.setItem('loggedInUser', JSON.stringify(user));
//   }

//   getUserFromLocalStorage() {
//     const user = localStorage.getItem('loggedInUser');
//     return JSON.parse(user);
//   }

//   removeUserFromLocalStorage() {
//     localStorage.removeItem('loggedInUser');
//   }

//   async createNewAccount(credential) {
//     try {
//       const response = await axios.post('/api/users', credential);
//       const newUser = response.data;
//       console.log('Create new user', newUser);
//       return newUser;
//     } catch (error) {
//       console.log(error);
//       throw new Error(error);
//     }
//   }
// }

// export default new LoginService();

class LoginService {
  login(credential) {
    if (credential.username !== 'admin') {
      return {
        user: {
          account_id: 4,
          username: 'John',
          role: 'CANDIDATE',
          profile_url: 'https://robohash.org/set_set4/Lucien.png',
        },
      };
    }

    return {
      user: {
        account_id: 5,
        username: 'John',
        role: 'RECRUITER',
      },
    };
  }

  storeUserToLocalStorage(user) {}

  getUserFromLocalStorage() {}

  removeUserFromLocalStorage() {}

  createNewAccount(credential) {}
}

export default new LoginService();
