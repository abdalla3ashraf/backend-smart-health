
// app.listen(4000, () => console.log(" Server running on PORT 4000"));
import dotenv  from "dotenv";
dotenv.config()
import app from "../src/app.js";
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(` Server running on PORT ${PORT}`)});
export default app;