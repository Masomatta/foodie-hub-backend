import pool from "../config/db.js";

export const addCustomer = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO customers (name, phone) Values ($1, $2) RETURNING*",
      [name, phone]
    );
    res.status(200).json({ message: result.rows });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: " internal server error!" });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  try {
    const check = await pool.query("SELECT * FROM customers WHERE id=$1", [id]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "customer not found" });
    }
    const result = await pool.query(
      "UPDATE customers SET name = $1, phone = $2 WHERE id = $3 RETURNING *",
      [name, phone, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
  res.status(200).json({ message: "customer deleted successfully" });
};
