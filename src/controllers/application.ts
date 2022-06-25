import { Request, Response } from 'express';
import db from '../models/index';

export function create(req: Request, res: Response) {
  const { company } = req.body;
  const { userId } = req.params;

  let message = '';
  // validate request
  if (!company) {
    message = 'Company name cannot be empty';
    res.status(400).send({ message });
    return;
  }
  message = 'An error occurred while creating application';
  // create the application
  db.applications
    .create({ userId, company })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function findAll(req: Request, res: Response) {
  const message = 'An error occurred while fetching applications';
  db.applications
    .findAll({ where: { userId: req.params.userId } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function findOne(req: Request, res: Response) {
  let message = 'An error occurred while fetching application';
  const { userId, applicationId } = req.params;
  db.applications
    .findByPk(applicationId)
    .then((data) => {
      if (data && data.userId === userId) {
        res.send(data);
      } else {
        message = `Cannot find application with id=${applicationId} for user=${userId}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function update(req: Request, res: Response) {
  let message = '';
  const { notes } = req.body;
  if (!notes) {
    message = 'Request cannot be empty';
    res.status(400).send({ message });
    return;
  }
  message = 'An error occurred while updating application';
  db.applications
    .update({ notes, updated: Date.now() }, { where: { id: req.params.id } })
    .then(([count]) => {
      if (count === 1) {
        message = 'application updated successfully';
        res.send({ message });
      } else if (count === 0) {
        message = `Cannot update application with id=${req.params.id}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export async function deleteOne(req: Request, res: Response) {
  let message = 'An error occurred while deleting application';
  db.applications
    .destroy({ where: { id: req.params.id } })
    .then((count) => {
      if (count === 1) {
        message = 'application deleted successfully';
        res.send({ message });
      } else if (count === 0) {
        message = `Cannot delete application with id=${req.params.id}`;
        res.status(404).send({ message });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}
