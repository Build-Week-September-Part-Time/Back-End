const express = require('express');
const Admin = require('../models/admin-model');
const Volunteer = require('../models/volunteers-model');
const Task = require('../models/tasks-model');
const router = express.Router();
const restrict = require('../auth/restrict');
const secret = '../auth/secret.js';

router.get('/assignTasks', async (req, res, next) => {
  try {
    res.status(200).json(await Task.find());
  } catch (error) {
    next(error);
  }
});

router.get('/assignTasks/volunteers', async (req, res, next) => {
  try {
    res.status(200).json(await Volunteer.find());
  } catch (error) {
    next(error);
  }
});

router.get('/assignTasks/volunteers/:id', async (req, res, next) => {
  try {
    res.status(200).json(await Volunteer.findById(req.params.id).first());
  } catch (error) {
    next(error);
  }
});

router.post('/assignTasks', restrict(), async (req, res, next) => {
  try {
    const emailVolunteer = await Volunteer.findByEmail(req.body.volunteer_email).first();

    if (!req.body.volunteer_email || !req.body.title || !req.body.description) {
      return res.status(401).json({
        message: 'Missing attributes',
      });
    }

    if (emailVolunteer === undefined) {
      return res.status(409).json({
        message: 'Email doesnt exist',
      });
    }

    const newTask = await Task.add({
      title: req.body.title,
      description: req.body.description,
      volunteer_id: emailVolunteer.id,
      volunteer_email: req.body.volunteer_email,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/assignTasks/:id', restrict(), async (req, res, next) => {
  try {
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();
    const task = await Task.findById(req.params.id).first();

    if (!req.body.email || !req.body.title || !req.body.description) {
      return res.status(401).json({
        message: 'Missing attributes',
      });
    }

    if (emailVolunteer === undefined) {
      return res.status(409).json({
        message: 'Email doesnt exist',
      });
    }

    if (task === undefined) {
      return res.status(409).json({
        message: 'Task doesnt exist',
      });
    }

    const changes = {
      title: req.body.title,
      description: req.body.description,
      volunteer_id: emailVolunteer.id,
      volunteer_email: req.body.email,
    };

    const newTask = await Task.update(changes, req.params.id);

    res.status(201).json(changes);
  } catch (error) {
    next(error);
  }
});

router.delete('/assignTasks/:id', restrict(), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(401).json({
        message: 'task doesnt exist',
      });
    }
    res.status(204).json(await Task.remove(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
