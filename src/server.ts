import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import catchAsync from "./utils/catchAsync";
import apiError from "./utils/apiError";
import router from "./routes";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FixItNow API is running successfully!");
});

app.use("/api", router);

// // সাময়িক টেস্ট রুট — error handler ঠিকমতো কাজ করছে কিনা যাচাই করার জন্য
// app.get(
//     "/test-error",
//     catchAsync(async (req, res) => {
//         throw new apiError(400, "This is a test error");
//     })
// );

// কোনো route match না হলে এটা চলবে (সব route এর নিচে থাকতে হবে)
app.use(notFound);

// error handler সবসময় সবার শেষে বসবে
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});