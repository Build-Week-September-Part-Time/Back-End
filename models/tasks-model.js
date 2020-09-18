const db = require('../database/dbConfig');

function find() {
  return db('tasks');
}

function findById(id) {
  return db('tasks').where('id', id).first();
}

function findByEmail(email) {
  return db('tasks').where('email', email).first();
}

function add(task) {
  return db('tasks')
    .insert(task, 'id')
    .then(([id]) => findById(id));
}

function update(changes, id) {
  return db('tasks').where({ id }).update(changes);
}

function remove(id) {
  return db('tasks').where({ id }).delete();
}

module.exports = {
  find,
  findById,
  findByEmail,
  add,
  update,
  remove,
};
