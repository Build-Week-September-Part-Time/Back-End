const db = require('../database/dbConfig');

function find() {
  return db('student_volunteers');
}

function findById(id) {
  return db('student_volunteers').where('student_id', id);
}

function add(studentID, volunteerID) {
  return db('student_volunteers')
    .insert('student_id', studentID)
    .insert('volunteer_id', volunteerID)
    .then(([id]) => findById(id));
}

module.exports = {
  find,
  findById,
  add,
};
