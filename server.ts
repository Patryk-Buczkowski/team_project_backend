import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_URI || "";
// const dbName = process.env.DB_NAME || "";

const startServer = async () => {
  try {
    // await , // connect to sql db
    console.log("Database connection successful");
    console.log("Indexes created for User model");
    app.listen(PORT, () => {
      console.log(`
        Server running port: ${PORT}
        `);
    });
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

startServer();