const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");
});

module.exports = db;
