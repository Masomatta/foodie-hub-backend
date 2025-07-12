import pool from "../config/db.js";

export const getAllOrders = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      o.id AS order_id,
      o.status,
      o.created_at,
      r.id AS restaurant_id,
      r.name AS restaurant_name,
      c.name AS customer_name
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.id
    JOIN customers c ON o.customer_id = c.id
  `);
  res.json(result.rows);
};

export const placeOrder = async (req, res) => {
  const { customer_id, restaurant_id, items } = req.body;
  try {
    const orderResult = await pool.query(
      `INSERT INTO orders (customer_id, restaurant_id) VALUES ($1, $2) RETURNING *`,
      [customer_id, restaurant_id]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      const { menu_item_id, quantity } = item;
      await pool.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)`,
        [orderId, menu_item_id, quantity]
      );
    }

    res.status(201).json({
      message: "Order placed successfully",
      order_id: orderId,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderByCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM orders WHERE customer_id = $1", [
      id,
    ]);      
      res.status(200).json(result.rows);
   
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM orders WHERE id = $1", [id]);
  res.status(200).json({ message: "Order deleted successfully" });
};
