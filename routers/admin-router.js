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
  } catch (error) {
    next(error);
  }
});

router.post('/assignTasks', restrict(), async (req, res, next) => {});
module.exports = router;
