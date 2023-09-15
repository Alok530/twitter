const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js");
const postRoute = require("./routes/postRoute.js");
const searchRoute = require("./routes/searchRoute.js");
const path = require("path");

dotenv.config();

const express = require("express");
const app = express();

const dbcoonection=async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });    
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log(error);
  }
}
dbcoonection();


app.use(
  cors({
    origin: ['https://twitter-39bb.onrender.com/'],    
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/search", searchRoute);


//----------------Deployment--------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


//----------------------------------------
const PORT = process.env.PORT  || 8000

app.listen(PORT, () => {
  console.log("Server is running!");
});