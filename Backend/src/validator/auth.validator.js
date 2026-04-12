import { body, validationResult } from "express-validator"


function validateRequest(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export const validateRegisterUser = [
    body("email")
        .isEmail().withMessage("Invalid email format"),
    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("contact must be a 10-digit number"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be a 6 character long"),
    body("fullname")
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("full name must be at least 3 character long"),
    body("isSeller")
        .isBoolean().withMessage("is Seller must be a boolean =value"),
        
        validateRequest
]