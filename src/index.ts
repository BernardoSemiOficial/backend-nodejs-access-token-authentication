import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Request, Response, Router } from "express";
import session from "express-session";
import { authenticationRouter } from "./modules/authentication/controller/authentication.controlller";
import { TokenRepository } from "./modules/authentication/repository/token.repository";
import { TokenService } from "./modules/authentication/services/token.service";
import { userRouter } from "./modules/users/controller/user.controller";
import { UserRepository } from "./modules/users/repository/user.repository";
import { UserService } from "./modules/users/services/user.service";

const app = express();
const route = Router();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
  })
);

export const tokenRepository = new TokenRepository();
export const tokenService = new TokenService(tokenRepository);
export const userRepository = new UserRepository();
export const userService = new UserService(tokenService, userRepository);

app.use(authenticationRouter);
app.use(userRouter);

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

route.get("/login", (req: Request, res: Response) => {
  res.redirect("http://localhost:4200/register");
});

app.use(route);
app.listen(port, () => `server running on port ${port}`);
