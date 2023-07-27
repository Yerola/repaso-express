const { v4 } = require('uuid');

class Database {
  #users = []

  createUser(data) {
    const user = { ...data, id: v4() };
    this.#users.push(user)
    return user;
  }

  getAllUsers() {
    return this.#users;
  }

  getAllUsersFromCountry(country) {
    return this.#users.filter((user) => user.country === country)
  }

  findById(id) {
    return this.#users.find((user) => user.id === id)
  }

  updateUser(data) {
    const indexToUpdate = this.#users.findIndex((user) => user.id === data.id);

    if (indexToUpdate >= 0) {
      const deleted = this.#users.splice(indexToUpdate, 1, data)
      return deleted[0];
    }

    return null
  }

  deleteUser(id) {
    const userToDelete = this.#users.find((user) => user.id === id)
    this.#users = this.#users.filter((user) => user.id !== id);
    return userToDelete;
  }
};

module.exports = Database;
