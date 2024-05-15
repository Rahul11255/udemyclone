const {check}  = require('express-validator')

exports.createProductValidator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage(" title is required")
    .isLength({ min: 3 })
    .withMessage("title must be 3 characters or more"),

    check('category')
    .not()
    .isEmpty()
    .withMessage("category is required"),

    check('brand')
    .not()
    .isEmpty()
    .withMessage("brand is required"),

    check('price')
    .not()
    .isEmpty()
    .withMessage("price is required"),
    
    check('discountPercentage')
    .not()
    .isEmpty()
    .withMessage("discountPercentage is required"),
    
    check('rating')
    .not()
    .isEmpty()
    .withMessage("rating is required"),

    check('stock')
    .not()
    .isEmpty()
    .withMessage("stock is required"),

    check('description')
    .not()
    .isEmpty()
    .withMessage("description is required")
    ,
    


];

