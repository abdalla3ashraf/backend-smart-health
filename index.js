// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// require ("./config/db")()
// // const aiRoutes = require('./routes/ai.routes');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/auth', require("./routes/auth.routes"));





// app.listen(4000, () => console.log(" Server running on PORT 4000"));

import app from "./src/app.js";
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}`)});