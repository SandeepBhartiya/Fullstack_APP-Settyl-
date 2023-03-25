const Employee=require('../models/employee.model');

exports.createEmp=async(req,res)=>{
    
    const empObj={
        EmpID:req.body.EmpID,
        empName:req.body.empName,
        address:req.body.address,
        Age:req.body.Age,
        Department:req.body.Department,
        status:{
            Location:req.body.status.Location,
            Contract:req.body.status.Contract,
            FullTime:req.body.status.FullTime,
        }
    }
    try
    {
        
  
        const emp=await Employee.create(empObj );
        console.log(`#### New Employee with EmpID:${emp.EmpID} is Created  ####`)
        res.status(201).send(emp);
    }
    catch(err)
    {
            console.log("Error ",err.message);
            res.status(500).send({
                message:"Internal Server Error"
            })
    }
}

exports.updateEmp=async(req,res)=>{
    try
    {
        
        const reqBody=req.body;
        const emp=await Employee.findOne({EmpID:req.params.id});
        console.log("Employee:",emp.status);
        emp.empName=reqBody.empName?reqBody.empName:emp.empName;
        emp.address=reqBody.address?reqBody.address:emp.address;
        emp.Age=reqBody.Age?reqBody.Age:emp.Age;
        emp.Department=reqBody.Department?reqBody.Department:emp.Department;
        if(reqBody.status)
        {
            
            emp.status.Location=reqBody.status.Location?reqBody.status.Location:emp.status.Location;
            emp.status.Contract=reqBody.status.Contract?reqBody.status.Contract:emp.status.Contract;
            emp.status.FullTime=reqBody.status.FullTime?reqBody.status.FullTime:emp.status.FullTime;
        }
        
        const updateEmp=await emp.save();
        res.status(200).send(updateEmp)
    }
    catch(err){
        console.log("Error while updating Employee",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.getEmp=async(req,res)=>{
    try
    {
        const emp=await Employee.find();
        res.status(200).send(emp);  
    }
    catch(err)
    {
        console.log('Error while loading Employee',err.message);
        res.status(500).send({
            message:"Internal server Error"
        })
    }
}