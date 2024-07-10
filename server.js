const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const pool = new Pool({
    user: 'fernandezf',
    host:'172.5.5.81',
    database: 'inaes',
    password: 'Inaes2024.07',
    port: 5432, 
});

app.get('/api/telefonos', async (req, res) => {
    try {
        const query = `
            SELECT 
                t_persona.*, 
                t_areas.descripcion AS area,
                t_ubicacion.edificio AS ubicacion
            FROM dirtel.t_persona
            INNER JOIN dirtel.t_areas ON t_persona.id_area = t_areas.id_area
            INNER JOIN dirtel.t_ubicacion ON t_persona.id_ubicacion = t_ubicacion.id_ubicacion
            ORDER BY apellido ASC, nombre ASC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving contacts');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);  // logs the server's port number to the console
});