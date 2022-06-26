import { Request, Response } from 'express';
import db from '../models/index';

export async function create(req: Request, res: Response) {
  const { applicationId, date, notes } = req.body;
  let message = '';
  // validate request
  if (!applicationId || !date) {
    message = 'applicationId and date/time cannot be empty';
    res.status(400).send({ message });
    return;
  }
  // create the interview, updating the application
  // TODO: use transactions to do this properly
  try {
    const [count] = await db.applications.update(
      { updated: Date.now() },
      { where: { id: applicationId } }
    );
    if (count === 0) {
      message = `Cannot find parent application with id=${applicationId}`;
      res.status(404).send({ message });
      return;
    }
    const data = db.interviews.create({ applicationId, date, notes });
    res.send(data);
  } catch (err: any) {
    message = 'An error occurred while creating interview';
    res.status(500).send({ message: err?.message || message });
  }
}

export async function findAll(req: Request, res: Response) {
  const message = 'An error occurred while fetching interviews';
  const applicationId = req.query.application;
  const condition = applicationId ? { applicationId } : null;
  db.interviews
    .findAll({
      where: { ...condition, '$Application.userId$': req.params.userId },
      include: { model: db.applications },
    })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function findOne(req: Request, res: Response) {
  let message = 'An error occurred while fetching interview';
  const { interviewId, userId } = req.params;
  db.interviews
    .findByPk(interviewId, {
      include: { model: db.applications },
    })
    .then((data) => {
      if (data && data.Application.userId === userId) {
        res.send(data);
        return;
      }
      message = `Cannot find interview with id=${interviewId} for user ${userId}`;
      res.status(404).send({ message });
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function update(req: Request, res: Response) {
  let message = '';
  const { date, notes } = req.body;
  const { interviewId, userId } = req.params;
  if (!notes && !date) {
    message = 'Request cannot be empty';
    res.status(400).send({ message });
    return;
  }
  message = 'An error occurred while updating interview';
  db.interviews
    .findByPk(interviewId, {
      include: { model: db.applications },
    })
    .then((data) => {
      if (data && data.Application.userId === userId) {
        data
          .update({ date, notes })
          .then(() => {
            message = 'Interview updated successfully';
            res.send({ message });
          })
          .catch((err) =>
            res.status(500).send({ message: err.message || message })
          );
        return;
      }
      message = `Cannot find interview with id=${interviewId} for user ${userId}`;
      res.status(404).send({ message });
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}

export function deleteOne(req: Request, res: Response) {
  let message = 'An error occurred while deleting interview';
  const { interviewId, userId } = req.params;
  db.interviews
    .findByPk(interviewId, {
      include: { model: db.applications },
    })
    .then((data) => {
      if (data && data.Application.userId === userId) {
        data
          .destroy()
          .then(() => {
            message = 'Interview deleted successfully';
            res.send({ message });
          })
          .catch((err) =>
            res.status(500).send({ message: err.message || message })
          );
        return;
      }
      message = `Cannot find interview with id=${interviewId} for user ${userId}`;
      res.status(404).send({ message });
    })
    .catch((err) => res.status(500).send({ message: err.message || message }));
}
