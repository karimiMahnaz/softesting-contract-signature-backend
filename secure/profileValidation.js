const yup = require("yup");

exports.profileUISchema = yup.object().shape({
    userName: yup.string()
        .required("fullName is required!")
        .min(4, 'Please enter more than 4 letters in fullName!')
        .max(120,'Please enter less than 120 letters in fullName!'),
    email: yup.string()
        .required("email address is not valid!"), 
    phone: yup.string().required("phone is not valid!"),
    country: yup.string()
    .min(3,'Please enter more than 3 letters in country!')
    .max(50,'Please enter less than 50 letters in country!')
    .required('country is required!'),
    education: yup.string()
    .min(3,'Please enter more than 3 letters in education!')
    .max(100,'Please enter less than 100 letters in education!')
    .required('education is required!'), 
    companyName: yup.string()
    .min(3,'Please enter more than 3 letters in companyName!')
    .max(100,'Please enter less than 100 letters in companyName!')
    .required('companyName is required!'), 

});
