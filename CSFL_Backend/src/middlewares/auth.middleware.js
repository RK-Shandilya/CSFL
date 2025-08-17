import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}