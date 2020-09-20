const db = require('../database/dbConfig');

function find() {
  return db('volunteers');
}

function findById(id) {
  return db('volunteers').where('id', id).first();
}

function findByEmail(email) {
  return db('volunteers').where('email', email).first();
}

function findByAvailability(avail) {
  return db('volunteers').where('availability', avail);
}

function findByState(state) {
  return db('volunteers').where('state', state);
}

function getTasks(id) {
  return db('tasks').where('volunteer_id', id);
}

function add(volunteer) {
  return db('volunteers')
    .insert(volunteer, 'id')
    .then(([id]) => findById(id));
}

function update(changes, id) {
  return db('volunteers').where({ id }).update(changes);
}

function remove(id) {
  return db('volunteers').where({ id }).delete();
}

module.exports = {
  find,
  findById,
  findByEmail,
  findByAvailability,
  findByState,
  getTasks,
  add,
  update,
  remove,
};
