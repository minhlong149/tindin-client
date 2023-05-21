class LoginService {
  login(credential) {
    return {
      user: {
        username: 'John',
        role: 'CANDIDATE',
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
