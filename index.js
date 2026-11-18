
import express from "express";
import userAnalyze from "./routes/userAnalyze.js";

const app = express();

app.use(express.json());

app.use("/users", userAnalyze);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
