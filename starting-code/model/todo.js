const pool = require('./database');

exports.create = (description) => pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);

exports.get = () => pool.query('SELECT * FROM todo');

exports.remove = (id) => pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
