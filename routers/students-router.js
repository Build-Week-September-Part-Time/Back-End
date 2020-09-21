const express = require('express');
const Volunteer = require('../models/volunteers-model');
const StudentList = require('../models/sv-model');
const router = express.Router();

router.get('/students', async (req, res, next) => {
  try {
    res.status(201).json(await Volunteer.find());
  } catch (error) {
    next(error);
  }
});

// router.post('/students/:studentid/add/:volunteerid', async (req, res, next) => {
//   try {
//     const volunteer = await Volunteer.findById(req.params.volunteerid);

//     if (volunteer === undefined) {
//       return res.status(401).json({
//         message: 'volunteer doesnt exist',
//       });
//     }

//     const addVol = await StudentList.add(
//       req.params.studentid,
//       req.params.volunteerid
//     );

//     res.status(201).json(addVol);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
