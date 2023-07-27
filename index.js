const express = require('express');
const Database = require('./database');

const database = new Database();

const app = express();

app.use(express.json());

const USER_ID_REGEX = /[^a-f0-9-]/i

const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  const isValidUserId = !userId.match(USER_ID_REGEX)

  if (!isValidUserId) {
    return res.status(400).json({ message: 'Invalid User ID' })
  }

  next();
}

app.get('/users', (req, res) => {
  const { country } = req.query;

  if (country) {
    const users = database.getAllUsersFromCountry(country);
    return res.json(users);
  }

  const users = database.getAllUsers();
  res.json(users);
});

app.post('/users', (req, res) => {
  const data = req.body;
  const user = database.createUser(data);
  return res.status(201).json(user);
});

app.put('/users', (req, res) => {
  const data = req.body;
  const updatedUser = database.updateUser(data);

  if (updatedUser) {
    return res.json(updatedUser);
  }

  return res.status(404).json({ message: 'Usuario no encontrado' })
});

app.get('/users/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  const foundUser = database.findById(userId);

  if (foundUser) {
    return res.json(foundUser)
  }

  return res.status(404).json({ message: 'Usuario no encontrado' })
});

app.delete('/users/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;

  const deletedUser = database.deleteUser(userId);

  if (deletedUser) {
    res.json(deletedUser)
  }

  return res.status(404).json({ message: 'Usuario no encontrado' });
});

app.listen(1234, () => {
  console.log('Servidor escuchando en http://localhost:1234')
});
