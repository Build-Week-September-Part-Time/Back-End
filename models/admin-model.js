const db = require('../database/dbConfig');

function find() {
  return db('admins');
}

function findById(id) {
  return db('admins').where('id', id).first();
}

function findByEmail(email) {
  return db('admins').where('email', email).first();
}

function add(admins) {
  return db('admins')
    .insert(admins, 'id')
    .then(([id]) => findById(id));
}

function remove(id) {
  return db('admins').where({ id }).delete();
}

module.exports = {
  find,
  findById,
  findByEmail,
  add,
  remove,
};
