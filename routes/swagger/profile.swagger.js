/**
 * @swagger
 *  components:
 *      schemas:                     
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  country:
 *                      type: string
 *                      description: the country of user
 *                      example: Erfan
 *                  company:
 *                      type: string
 *                      description: the company of user
 *                      example: Yousefi
 *                  education:
 *                      type: string
 *                      description: the education of user
 *                      example: Master          
 */

/**
 * @swagger
 *  /user/getprofile:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get user profile
 *          responses :
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/updateProfile:
 *      post:
 *          tags: [Users(AdminPanel)]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/Update-Profile'
 */