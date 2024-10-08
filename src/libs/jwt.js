import jwt from "jsonwebtoken";

import { TOKEN_SECRET } from "../config.js";

export function createAccesToken(payload) {
    
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: 120,
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}