class LoginService {
  login(credential) {
    return {
      user: {
        account_id: 11,
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
