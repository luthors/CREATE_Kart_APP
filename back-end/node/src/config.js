import {config} from "dotenv"

config()

export const PORT = process.env.PORT || 3001/*PORT: Es el servidor */
export const DB_USER = process.env.DB_USER || 'root'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'compras_create'
export const DB_PORT = process.env.DB_PORT || 3306/*Puerto de la base de datos */
export const DB_PASSWORD = process.env.DB_PASSWORD || ''/*Puerto de la base de datos */





//host: 'localhost',
//user: 'root',
//password: "root",
//port: 3306,
//database: 'compras_create'