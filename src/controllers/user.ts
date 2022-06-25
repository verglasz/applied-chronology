import { Request, Response } from 'express';
import db from '../models/index';

function validatePw(password: string): boolean {
  return true;
}

export function create(req: Request, res: Response) {
  const { username, password } = req.body;
  let code = 200;
  let message = '';
  // validate request
  if (!username) {
    code = 400;
    message = 'Username cannot be empty';
  } else if (!password) {
    code = 400;
    message = 'Password cannot be empty';
  } else if (!validatePw(password)) {
    code = 400;
    message = 'Invalid password';
  }
  if (code !== 200) {
    res.status(code).send({ message });
    return;
  }
  message = 'An error occurred while creating user';
  // create the user
  db.users
    .create({ username, password })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function findAll(req: Request, res: Response) {
  const message = 'An error occurred while fetching users';
  db.users
    .findAll()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function findOne(req: Request, res: Response) {
  let message = 'An error occurred while fetching user';
  db.users
    .findByPk(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        message = `Cannot find user with id=${req.params.id}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function update(req: Request, res: Response) {
  let message = '';
  const { name, password } = req.body;
  if (!name && !password) {
    message = 'Request cannot be empty';
    res.status(400).send({ message });
    return;
  }
  message = 'An error occurred while updating user';
  db.users
    .update({ name, password }, { where: { id: req.params.id } })
    .then(([count]) => {
      if (count === 1) {
        message = 'User updated successfully';
        res.send({ message });
      } else if (count === 0) {
        message = `Cannot update user with id=${req.params.id}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function deleteOne(req: Request, res: Response) {
  let message = 'An error occurred while deleting user';
  db.users
    .destroy({ where: { id: req.params.id } })
    .then((count) => {
      if (count === 1) {
        message = 'User deleted successfully';
        res.send({ message });
      } else if (count === 0) {
        message = `Cannot delete user with id=${req.params.id}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}
