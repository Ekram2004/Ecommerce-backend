const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.error('MongoDB connection error'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



