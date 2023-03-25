const employeeController=require('../controllers/employee.controller');

module.exports=(app)=>{
    app.post('/Employee/api/v1/create',employeeController.createEmp);
    app.post('/Employee/api/v1/update/:id',employeeController.updateEmp);
    app.get('/Employee/api/v1/',employeeController.getEmp)
}