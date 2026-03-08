const express =require("express");
const supabase = require("../supabaseClient");
const ValidateEntrollment=require("./middlware/validateEntrollment");

const router =express.Router();

//get all courses
router.get("/", async(req,res)=>{
    const {data, error}=await supabase.from("courses").select("*");
    if (error) return res.status(500).json({
        error:error.message
    });
    res.json(data);
})

//entroll  a student
const enrollStudent=[
    validateEntrollment,
    async (req,res)=>{
        const {
            student_name,course_id
        }=req.body;
        const{
            data,error
        }=await supabase
        .from("enrollments")
        .insert([{ student_name,course_id}]);

        if (error) return res.status(400).json({error:error.message});
        res.status(201).json(data);
    }
];
//get entrollemts for a course

router.get("/:id/enrollments", async (req,res)=>{
    const {id}=req.params;
    const {data,error}=await supabase
    .from("enrollments")
    .select("student_name,course_id")
    .eq("course_id",id);

    if (error) return res.status(500).json({error:error.message})
});

module.exports=router;
module.exports.enrollStudent=enrollStudent;