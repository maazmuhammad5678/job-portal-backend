require("dotenv").config();

const express = require("express");
const { connectMongoDb} = require("./connection");

const authRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");

const app = express();

// connection

connectMongoDb(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb Connected");
})
.catch((error)=>{
    console.log(error);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Job Portal Backend API is running"
    });
});

// API routes
app.use("/user", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/application", applicationRoutes);

// // Handle unknown routes
// app.use((req, res) => {
//     res.status(404).json({
//         message: "API route not found"
//     });
// });

// Start server after database connection
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
 });