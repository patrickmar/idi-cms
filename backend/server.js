const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./src/middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./src/config/db');
const fileupload = require('express-fileupload');
const cors = require('cors');
const exphbs = require('express-handlebars');

connectDB();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use('/api/posts', require('./src/routes/postRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/mail', require('./src/routes/mailRoutes'));
app.use('/api/mail', require('./src/routes/mailRoutes'));
app.use('/api/vlog', require('./src/routes/vlogRoute'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
