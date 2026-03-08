const express =require("express");
const dotenv =require("dotenv");
const courseRouter =require("./routes/courses");
const logger =require("./middleware/logger");


dotenv.config();
const app =express();

app.use(express.json());

app.use(logger);
app.use("/courses",courseRouter);

app.post("/entroll",require("./routes/courses").enrollments);
const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server is running on ${PORT}`));