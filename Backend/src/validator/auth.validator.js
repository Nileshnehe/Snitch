import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }

    next();
}

// REGISTER
export const validateRegisterUser = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    body("contactNumber")
        .notEmpty()
        .withMessage("Contact number is required")
        .isLength({ min: 10, max: 10 })
        .withMessage("Contact number must be exactly 10 digits")
        .isNumeric()
        .withMessage("Contact number must contain only numbers"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .trim(),

    body("fullName")
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long")
        .trim(),

    body("isSeller")
        .optional() // 👈 important (warna frontend se na aaye toh fail ho jayega)
        .isBoolean()
        .withMessage("isSeller must be true or false")
        .toBoolean(),

    validateRequest
];

// LOGIN
export const validateLoginUser = [
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .trim(),

    validateRequest
];