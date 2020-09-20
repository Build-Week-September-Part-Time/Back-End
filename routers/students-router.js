const express = require('express');
const Volunteers = require('../models/sv-model');
const Student = require('../models/students-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const restrict = require('../auth/restrict');
const secret = '../auth/secret.js';

router.get('/students', async (req, res, next) => {
  try {
    res.status(201).json(await Student.find());
  } catch (error) {
    next(error);
  }
});

router.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).first();

    if (student === undefined) {
      return res.status(401).json({
        message: 'student doesnt exist',
      });
    }

    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

router.get('/students/:id/volunteers', async (req, res, next) => {
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

module.exports = router;
