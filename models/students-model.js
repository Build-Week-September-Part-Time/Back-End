const db = require('../database/dbConfig');

function find() {
  return db('students');
}

function findById(id) {
  return db('students').where('id', id).first();
}

function findByEmail(email) {
  return db('students').where('email', email).first();
}

function add(student) {
  return db('students')
    .insert(student, 'id')
    .then(([id]) => findById(id));
}

function remove(id) {
  return db('students').where({ id }).delete();
}

module.exports = {
  find,
  findById,
  add,
  remove,
};
