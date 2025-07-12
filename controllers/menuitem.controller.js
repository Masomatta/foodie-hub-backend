import pool from "../config/db.js";

export const addMenuItem = async (req, res) => {
  const { restaurant_id, name, price, available } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO menu_items(restaurant_id, name, price, available) VALUES ($1,$2,$3,$4) RETURNING *",
      [restaurant_id, name, price, available ?? true]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, available } = req.body;
  try {
    const result = await pool.query(
      "UPDATE menu_items SET name=$1, price=$2, available=$3 WHERE id= $4 RETURNING *",
      [name, price, available, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const removeMenuItem = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM menu_items WHERE id =$1", [id]);
  res.status(200).json({ message: "Menu Item deleted successfully." });
};

export const listMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM menu_items WHERE restaurant_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const markMenuItem = async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;
  try {
    const result = await pool.query(
      "UPDATE menu_items SET available = $2 WHERE id= $3 RETURNING *",
      [available, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};
