const yup = require("yup");

exports.contractUISchema = yup.object().shape({
    contractName: yup.string()
        .required("contractName is required!")
        .min(4, 'Please enter more than 4 letters in contractName!')
        .max(120,'Please enter less than 120 letters in contractName!'),
    email: yup.string()
        .required("email address is not valid!"), 

});
