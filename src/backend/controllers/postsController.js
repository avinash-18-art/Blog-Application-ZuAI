const db = require('../database');

exports.getPosts = (req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getPostById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Post not found" });
        res.json(row);
    });
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    db.run("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
};

exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    db.run("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
};

exports.deletePost = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
};
