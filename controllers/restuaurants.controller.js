import pool from "../config/db.js";

export const getRestaurants = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const addRestaurant = async (req, res) => {
  const { name, location } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO restaurants (name, location) VALUES ($1,$2) RETURNING *",
      [name, location]
    );
    res.status(200).json({ message: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const check = await pool.query("SELECT * FROM restaurants WHERE id = $1", [
      id,
    ]);

    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const result = await pool.query(
      "UPDATE restaurants SET name = $1, location = $2 WHERE id = $3 RETURNING *",
      [name, location, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM restaurants WHERE id = $1", [id]);
    res.status(200).json({ message: "Restaurant successfully deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};
