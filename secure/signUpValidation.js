const yup = require("yup");

exports.signUpSchema = yup.object().shape({
    userName: yup.string()
        .required("fullName is required!")
        .min(4, 'Please enter more than 4 letters in fullName!')
        .max(120,'Please enter less than 120 letters in fullName!'),
    email: yup.string()
        .required("email address is not valid!"), 
    phone: yup.string().required("phone is not valid!"),
    password: yup.string()
    .min(6,'Please enter more than 6 letters in password!')
    .max(30,'Please enter less than 30 letters in password!')
    .required('password is required!'),
    coPassword: yup.string()
        .required('password confirm is required!')
        .oneOf([yup.ref("password"), null],'password confirm is not valid!'),
        
});
