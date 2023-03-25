// const mongoose=require('mongoose');
// // const autoIncrement=require('mongoose-auto-increment');

// // autoIncrement.initialize(mongoose.connection)

// const statusSchema=new mongoose.Schema({
//     Location:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     Contract:{
//         type:String,
//         required:true,
//         trim:true,
//         enum:['full-time','part-time','contractor']
//     },
//     FullTime:{
//         type:Boolean,
//         default:false,
//         required:true
//     }
// })
// const employeeSchema=new mongoose.Schema({
//     EmpID:{
//         type:Number,
//         // unique:true
//         required:true
//     },
//     empName:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     address:{
//         type:String,
//         required:true,
//         minLength:10,
//         trim:true
//     },
//     Age:{
//         type:Number,
//         required:true
//     },
//     Department:{
//         type:String,
//         required:true
//     },
//     status:statusSchema
// },{versionKey:false,timestamps:true});

// // employeeSchema.plugin(autoIncrement.plugin,{model:'employee',field:'EmpID',startAt:1});

// module.exports=mongoose.model('employee',employeeSchema);


const mongoose=require('mongoose');

const statusSchema=new mongoose.Schema({
    Location:{
        type:String,
        required:true,
        trim:true
    },
    Contract:{
        type:String,
        required:true,
        trim:true,
        enum:['full-time','part-time','contractor']
    },
    FullTime:{
        type:Boolean,
        default:false,
        required:true
    }
});
statusSchema.pre('validate', function(next) {
    if (!this.Location || !this.Contract) {
      this.invalidate('status', 'Location and Contract fields are required');
    }
    next();
  });
const employeeSchema=new mongoose.Schema({
    EmpID:{
        type:Number,
        required:true
    },
    empName:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        minLength:10,
        trim:true
    },
    Age:{
        type:Number,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    status:{
         type:statusSchema,
         required:true
    }
},{versionKey:false,timestamps:true});

module.exports=mongoose.model('employee',employeeSchema);
