const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

connectDB();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors()); 

app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
