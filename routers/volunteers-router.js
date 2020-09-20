const express = require('express');
const Volunteer = require('../models/volunteers-model');
const Task = require('../models/tasks-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const restrict = require('../auth/restrict');
const secret = '../auth/secret.js';

router.get('/volunteers', async (req, res, next) => {
  try {
    res.status(201).json(await Volunteer.find());
  } catch (error) {
    next(error);
  }
});

router.get('/volunteers/:id', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).first();

    if (volunteer === undefined) {
      return res.status(401).json({
        message: 'volunteer doesnt exist',
      });
    }

    res.status(201).json(volunteer);
  } catch (error) {
    next(error);
  }
});

router.get('/volunteers/:id/tasks', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).first();

    if (volunteer === undefined) {
      return res.status(401).json({
        message: 'volunteer doesnt exist',
      });
    }

    const tasks = await Volunteer.getTasks(req.params.id);

    if (tasks === undefined) {
      return res.status(401).json({
        message: 'no tasks',
      });
    }

    res.status(201).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.put('/volunteers/:id', async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).first();
    const emailTaken = volunteer.email;

    if (volunteer === undefined) {
      return res.status(409).json({
        message: 'Email doesnt exist',
      });
    }

    let changes;

    if (req.body.email === emailTaken) {
      changes = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: await bcrypt.hash(req.body.password, 14),
        availability: req.body.availability,
        state: req.body.state,
      };
    } else {
      changes = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 14),
        availability: req.body.availability,
        state: req.body.state,
      };
    }

    const updateVolunteer = await Volunteer.update(changes, req.params.id);

    res.status(201).json(changes);
  } catch (error) {
    next(error);
  }
});

router.delete('/volunteers/:id', restrict(), async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(401).json({
        message: 'volunteer doesnt exist',
      });
    }
    res.json(await Volunteer.remove(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
