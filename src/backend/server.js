const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
