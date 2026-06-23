import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/users", userRoutes);

// app.get("/api/users", async (req: Request, res: Response) => {
//   const user = await prisma.user.findMany();
//   console.log(user);
//   res.status(httpStatus.CREATED).json({
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "User registered successfully",
//     data: { user },
//   });
// });

export default app;
