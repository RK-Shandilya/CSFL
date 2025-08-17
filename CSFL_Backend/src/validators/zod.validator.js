export const zodValidator = (schema) => 
    (req, res, next) => {
        try {
            schema.parse({...req.body,});
            next();
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error
            });
            return;
        }
    };