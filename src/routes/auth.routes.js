import { Router } from "express";
import { login, register, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from "../middlewares/validator.middleware.js"
import { registeSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validatorSchema(registeSchema), register);

router.post('/login', validatorSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

router.get('/verify', verifyToken);


export default router;
