/*Api destacados */
import { pool } from "../db.js"

export const featuredProducts = async (req,res)=>{
    
    const [rows] = await pool.query('SELECT product,title,descrip,color,price,category,url FROM orders_detail INNER JOIN products ON orders_detail.product = products.id_product GROUP BY product ORDER BY SUM(orders_detail.quantify) DESC LIMIT 5')
    res.json(rows)
}