import {pool} from "../db.js"

/*______________________________________________________________*/
export const getCustomers = async (req, res) => /*res.send ('obteniendo clientes')*/{
   const [rows] = await pool.query('SELECT*FROM brand')
   res.json(rows)
}

/*______________________________________________________________*/
export const getCustomersId = async (req, res) => {
    const [rows] = await pool.query('SELECT*FROM brand WHERE id_brand=?', [req.params.id_brand])
    console.log(rows)

    if (rows.length <=0) return res.status(404).json({
        message: 'brand not found'
    })
    res.json(rows[0])/*Para observar en el navegador localhost */
}

/*______________________________________________________________*/
export const createCustomers = async (req, res) => { /*Ver los datos que el cliente envía al realizar la petición*/
    const {name_brand, description} = req.body /*Extraer los datos para pasarlo a la consulta INSERT INTO */
    const [rows] = await pool.query('INSERT INTO brand(name_brand, description) VALUES (?, ?)', [name_brand, description])/*Biblioteca: (?, ?) Se buscaran en el orden de las ?, se realizará una consullta en orden. Const rows se guarda la respuesta. */
    res.send({/*Al recibir la respuesta se crea un insertId, se coloca el id:rows.insertId para que se muestre el id auto-incrementado y name, salary para toda la información.*/ 
        id:rows.insertId,
        name_brand,
        description,
    })
}

/*______________________________________________________________*/
export const deleteCustomers = async (req, res) => {
    const [result] = await pool.query('DELETE FROM brand WHERE id_brand = ?', [req.params.id_brand])
    console.log(result);
    
    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Brand not found'
    })

    res.send('Brand deleted')
}

/*______________________________________________________________*/
export const updateCustomers = async (req, res) => {
    /*Actualizar datos */
    const {id_brand} = req.params
    const {name_brand, description} = req.body 
    
    const [result] = await pool.query('UPDATE brand SET name_brand = IFNULL(?, name_brand), description = IFNULL(?, description) WHERE id_brand = ?', [name_brand, description, id_brand])

    console.log(result);

    if (result.affectedRows === 0) return res.status(404).json({
        message:('Brand not found')
    })

    /*Ver los datos actualizados */
    const [rows] = await pool.query('SELECT*FROM brand WHERE id_brand = ?', [id_brand])/*Va a pasar el id actualizado */
    res.json(rows[0])/*[0] para quitar el arreglo y solo obtener el objeto con la información */

}


