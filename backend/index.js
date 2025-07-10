import express from "express"; // MODULE JS
import cors from "cors";
import path from "path";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/api/:data", (request, response) => {
  try {
    console.log(request.params.data);
    var sql;
    switch (request.params.data) {
      case "malware":
        sql = `SELECT * FROM malware`;
        break;
      case "email":
        sql = `SELECT * FROM email`;
        break;
      case "users-mfa":
        sql = `SELECT * FROM users_mfa`;
        break;
      case "general":
        sql = `SELECT * FROM general`;
        break;
      case "user-fail-login":
        sql = `SELECT * FROM user_fail_login`;
        break;
      case "attacks-by-country":
        sql = `SELECT * FROM attacks_by_country`;
        break;
      default:
        break;
    }
    db.query(sql, (error, results) => {
      if (error) {
        response.status(200).json({ message: error });
      }
      if (results.length !== 0) {
        response.status(200).json({ message: results });
      } else {
        response.status(404).json({ message: "No RESULTS found" });
      }
    });
  } catch (err) {
    response.status(404).json({ message: err.message });
  }
});

console.log(process.env.NODE_ENV);
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/cyber-vista-ts/dist")));
  app.get(/(.*)/, (request, response) => {
    try {
      response.sendFile(
        path.join(__dirname, "/cyber-vista-ts", "dist", "index.html")
      );
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  });
}

// PORT CONFIGURATION & DB CONNECTION
app.listen(5000, () => {
  console.log("SERVER IS RUNNING AT 5000");

  db.connect((err) => {
    if (err) {
      console.error("Connection error:", err);
      return;
    } else {
      console.log("DB CONNECTED");
    }
  });
});
