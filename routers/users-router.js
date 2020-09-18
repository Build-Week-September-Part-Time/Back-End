const express = require('express');
const Admin = require('../models/admin-model');
const Volunteer = require('../models/volunteers-model');
const Student = require('../models/students-model');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
  try {
    const emailAdmin = await Admin.findByEmail(req.body.email).first();
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();
    const emailStudent = await Student.findByEmail(req.body.email).first();

    if (
      !req.body.firstname ||
      req.body.lastname ||
      req.body.email ||
      req.body.password ||
      req.body.accountType
    ) {
      return res.status(401).json({
        message: 'Missing attributes',
      });
    }

    if (emailAdmin || emailVolunteer || emailStudent) {
      return res.status(409).json({
        message: 'Email taken',
      });
    }

    if (req.body.accountType === 'admin') {
      const admin = await Admin.add({
        firstname,
        lastname,
        email,
        password: await bcrypt.hash(password, 14),
        accountType,
      });
      res.status(201).json(admin);
    } else if (req.body.accountType === 'volunteer') {
      const volunteer = await Volunteer.add({
        firstname,
        lastname,
        email,
        password: await bcrypt.hash(password, 14),
        accountType,
        state,
      });
      res.status(201).json(volunteer);
    } else if (req.body.accountType === 'student') {
      const student = await Student.add({
        firstname,
        lastname,
        email,
        password: await bcrypt.hash(password, 14),
        accountType,
      });
      res.status(201).json(student);
    } else {
      res.status(403).json({
        message: 'The account type you are trying to create is invalid',
      });
    }
  } catch (err) {
    next(err);
  }
});
