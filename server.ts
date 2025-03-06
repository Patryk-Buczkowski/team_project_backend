/* eslint-disable no-console */
import dotenv from "dotenv";
import app from "./app";
import sequelize from "utils/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log("Połączono z bazą danych ✅"))
      .catch((err) => console.error("Błąd połączenia z bazą ❌", err));

    await sequelize.sync();
    console.log("Database synchronized");
    console.log("Database connection successful");
    console.log("Indexes created for User model");

    app.listen(PORT, () => {
      console.log(`
        Server running port: ${PORT}
        `);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Server not running. Error message: ${err.message}`);
    } else {
      console.error("Server not running. Unknown error.");
    }
    process.exit(1);
  }
};

startServer();
