/**
 * @swagger
 *  components:
 *      schemas:                     
 *          User:
 *              type: object
 *              properties:
 *                  userName:
 *                      type: string
 *                      description: the userName of user
 *                      example: Erfan Yousefi
 *                  Password:
 *                      type: string
 *                      description: the Password of user
 *                      example: [A-Z,a-z,0-9]
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: erfanyousefi@gmail.com
 *                  phone:
 *                      type: string
 *                      description: the phone of user
 *                      example: 999999999999               
 */
/**
 * @swagger
 *  tags:
 *   name: UserApi
 *   description: User Section
 */
/** 
 *  @swagger
 * /user/resetPassword/{token}:
 *  post: 
 *    summary: resetPassword 
 *    tags: [UserApi]
 *    description: resetPassword
 *    parameters:
 *        -   in: header
 *            name: oldPassword
 *            required : true
 *            example:  oldPassword...
 *        -   in: header
 *            name: newPassword
 *            required : true
 *            example:  newPassword...
 *        -   in: header
 *            name: repeatNewPassword
 *            required : true
 *            example:  repeatNewPassword...
 *        -   in: header
 *            name: email
 *            required : true
 *            example: erfanyousefi@gmail.com
 *    responses :
 *      200:
 *        description: success
 *      401:
 *        description: failed
 *      
 */
/** 
 *  @swagger
 * /user/changePassword:
 *  post: 
 *    summary: changePassword 
 *    tags: [UserApi]
 *    description: changePassword
 *    parameters:
 *        -   in: header
 *            name: enter email
 *            required : true
 *            example:  email...
 *        
 *    responses :
 *      200:
 *        description: success
 *      401:
 *        description: failed
 *      
 */
/**
 * @swagger
 *  /user/signIn:
 *      post:
 *          tags: [UserAPI]
 *          summary: SignIn
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/SignInUser'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/SignInUser'
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: failed
 */
/**
 * @swagger
 *  /user/signUp:
 *      post:
 *          tags: [UserAPI]
 *          summary: SignUp
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: success
 *              401:
 *                  description: failed
 */

/** 
 *  @swagger
 * /user/reCaptcha:
 *  post: 
 *    summary: reCaptcha 
 *    tags: [UserApi]
 *    description: reCaptcha
 *    parameters:
 *        -   in: header
 *            name: access-reCaptcha
 *            example:  reCaptcha...
 *        
 *    responses :
 *      200:
 *        description: success
 *      401:
 *        description: failed
 *      
 */
 /**
 *  @swagger
 * /user/rememberMe:
 *  get: 
 *    summary: rememberMe 
 *    tags: [UserApi]
 *    description: rememberMe
 *    responses :
 *      200:
 *        description: success
 *      500:
 *        description: failed    
 */
/**
 *  @swagger
 * /user/signOut:
 *  get: 
 *    summary: signOut 
 *    tags: [UserApi]
 *    description: signOut
 *    responses :
 *      200:
 *        description: success
 *      500:
 *        description: failed    
 */
 /**
 *  @swagger
 * /user/login:
 *  get: 
 *    summary: login 
 *    tags: [UserApi]
 *    description: Login
 *    responses :
 *      200:
 *        description: success
 *      500:
 *        description: failed    
 */
 