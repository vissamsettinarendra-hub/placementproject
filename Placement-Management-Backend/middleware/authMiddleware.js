import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {

    try {

        // Read authorization header
        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success:false,
                message:"Access Denied"
            });

        }


        // Extract token
        const token = authHeader.split(" ")[1];


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Store user information
        req.user = decoded;


        // Continue
        next();


    } catch(error) {


        return res.status(401).json({
            success:false,
            message:"Invalid Expired Token"
        });


    }

};