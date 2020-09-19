const express = require('express');
const Admin = require('../models/admin-model');
const Volunteer = require('../models/volunteers-model');
const Student = require('../models/students-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = '../auth/secret.js';

router.post('/register', async (req, res, next) => {
  try {
    const emailAdmin = await Admin.findByEmail(req.body.email).first();
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();
    const emailStudent = await Student.findByEmail(req.body.email).first();

    if (
      !req.body.email ||
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.password ||
      !req.body.accountType
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 14),
        accountType: req.body.accountType,
      });
      res.status(201).json(admin);
    } else if (req.body.accountType === 'volunteer') {
      const volunteer = await Volunteer.add({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 14),
        accountType: req.body.accountType,
        state: req.body.state,
      });
      res.status(201).json(volunteer);
    } else if (req.body.accountType === 'student') {
      const student = await Student.add({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 14),
        accountType: req.body.accountType,
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

router.post('/login', async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({
        message: 'Missing attributes',
      });
    }

    const emailAdmin = await Admin.findByEmail(req.body.email).first();
    const emailVolunteer = await Volunteer.findByEmail(req.body.email).first();
    const emailStudent = await Student.findByEmail(req.body.email).first();

    // console.log(emailAdmin);
    // console.log(emailVolunteer);
    // console.log(emailStudent);

    if (emailAdmin != undefined) {
      user = await Admin.findByEmail(req.body.email).first();
    } else if (emailVolunteer != undefined) {
      user = await Volunteer.findByEmail(req.body.email).first();
    } else if (emailStudent != undefined) {
      user = await Student.findByEmail(req.body.email).first();
    }

    const passwordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Invalid Credentials',
      });
    }

    const token = generateToken(user);

    res.cookie('token', token);

    res.json({
      message: `Welcome ${user.email}!`,
    });
  } catch (error) {
    next(error);
  }
});

function generateToken(user) {
  const payload = {
    userID: user.id,
    userRole: user.accountType,
  };
  const secret = process.env.JWT_SECRET || 'Fly you fools';

  return jwt.sign(payload, secret);
}

module.exports = router;
