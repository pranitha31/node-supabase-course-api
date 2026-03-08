const dotenv =require("dotenv");

dotenv.config();
const express =require("express");
const courseRouter =require("./routes/courses");
const logger =require("./middleware/logger");


const app =express();

app.use(express.json());

app.use(logger);
app.use("/courses",courseRouter);

app.post("/entroll",require("./routes/courses").enrollments);
const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server is running on ${PORT}`));