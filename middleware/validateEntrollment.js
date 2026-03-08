const supabase=require("../supabaseClient");

async function ValidateEntrollment(req,res,next) {
    const {
        student_name,course_id
    }=req.body;

    if(!student_name || !course_id){
        return res.status(400).json({error :"student_name and course_is are required"});
        
    }

    const {data,error}=await supabase
    .from("courses")
    .select("id")
    .eq("id",course_id)
    .single();

    if (error || !data){
        return res.status(400).json({ error:"Invalid course_id"});
    }
    next();
    
}
module.exports=ValidateEntrollment;