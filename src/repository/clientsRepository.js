import db from '../db/dbConnect.js';

export default class ClientsRepository {

    //obtener los datos de los clientes
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM clients');
        return rows;
    }

    //MÉTODOS DE BÚSQUEDAS

    //búsqueda por tipo de cliente.
    static async findByType(type_client){
        const [rows] = await db.query('SELECT * FROM clients WHERE type_client = ?', [type_client]);
        return rows;
    }

    //búsqueda por nombre de empresa.
    static async findCompany(company_name){
        const [rows] = await db.query('SELECT * FROM clients WHERE LOWER(TRIM(company_name)) = LOWER(TRIM(?))', [company_name]);
        return rows;
    }

    //búsqueda por nombre y apellido
    static async findByNameOrLastname(name, lastname) {
        let query = 'SELECT * FROM clients WHERE 1=1';
        const values = [];

        if(name){
            query += ' AND LOWER(TRIM(name))';
            values.push(name);
        }
        if(lastname){
            query += ' AND LOWER(TRIM(lastname))';
            values.push(lastname);
        }
        const [rows] = await db.query(query, values);
        return rows;
    }

    //búsqueda por identificación
    static async findByIdentification(identification) {
        const [rows] = await db.query('SELECT * FROM clients WHERE LOWER(TRIM(identification)) = LOWER(TRIM(?))', [identification]);
        return rows;
    }

    //búsqueda por ID
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
        return rows[0];
    }
    //SIGUIENTE MÉTODOS CREATE, UPDATE, DELETE

    //crear usuario
    static async create(client) {
        const {type_client, name, lastname, company_name, identification, address, postal_code, location, province} = client;
        const [result] = await db.query('INSERT INTO clients (type_client, name, lastname, company_name, identification, address, postal_code, location, province, date_create, date_update )' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())', [type_client, name, lastname, company_name, identification, address, postal_code, location, province]);
        return result.insertId;
    }

    //actualizar clientes
    static async update(client) {
        const {id, type_client, name, lastname, company_name, identification, address, postal_code, location, province} = client;
        const [result] = await db.query('UPDATE clients SET type_client = ?, name = ?, lastname = ?, company_name = ?, identification = ?, address = ?, postal_code = ?, location = ?, province = ?, date_update = NOW() WHERE id = ?',
            [type_client, name, lastname, company_name, identification, address, postal_code, location, province, id]
        );
        return result.affectedRows;
    }

    //eliminar usuarios
    static async delete(id) {
        const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
        return result.affectedRows;
    }


}

