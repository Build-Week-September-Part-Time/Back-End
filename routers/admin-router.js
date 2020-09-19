const express = require('express');
const Admin = require('../models/admin-model');
const Volunteer = require('../models/volunteers-model');
const Task = require('../models/tasks-model');
const router = express.Router();
const restrict = require('../auth/restrict');
const secret = '../auth/secret.js';

router.get('/assignTasks', async (req, res, next) => {
  try {
    res.json(await Task.find());
  } catch (error) {
    next(error);
  }
});

router.get('/assignTasks/volunteers', async (req, res, next) => {
  try {
    res.json(await Volunteer.find());
  } catch (error) {
    next(error);
  }
});

router.get('/assignTasks/volunteers/:id', async (req, res, next) => {
  try {
    res.json(await Volunteer.findById(req.params.id).first());
  } catch (error) {
    next(error);
  }
});

router.post('/assignTasks', async (req, res, next) => {
  try {
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();

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

    const newTask = await Task.add({
      title: req.body.title,
      description: req.body.description,
      volunteer_id: emailVolunteer.id,
      volunteer_email: req.body.email,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/assignTasks/:id', async (req, res, next) => {
  try {
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();

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

    const changes = {
      title: req.body.title,
      description: req.body.description,
      volunteer_id: emailVolunteer.id,
      volunteer_email: req.body.email,
    };

    const newTask = await Task.update(changes, req.params.id);

    res.status(201).json({ message: 'Change success', changes });
  } catch (error) {
    next(error);
  }
});

router.post('/assignTasks', restrict(), async (req, res, next) => {});
module.exports = router;
