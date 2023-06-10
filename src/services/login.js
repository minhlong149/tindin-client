class LoginService {
  login(credential) {
    return {
      user: {
        account_id:5,
        username: 'John',
        role: 'RECRUITER',
      },
    };
  }

  storeUserToLocalStorage(user) {
  }

  getUserFromLocalStorage() {
  }

  removeUserFromLocalStorage() {
  }

  createNewAccount(credential) {
  }
}

export default new LoginService();
