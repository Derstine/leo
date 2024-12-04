const app = require("./app")
const pool = require("./models/accountsModel");

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


async function startServer() {
  try {
    const [rows] = await pool.query("SELECT * FROM accounts");
    console.log(rows);
  } catch (err) {
    console.error("Error executing query", err);
  }
}

startServer();