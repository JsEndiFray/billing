import OwnersRepository from "../repository/ownersRepository.js";
import {sanitizeString} from "../utils/stringHelpers.js";

export default class OwnersServices {

    //obtener los datos del usuario
    static async getAllUsers() {
        return await OwnersRepository.getAll();
    }

    //MÉTODOS DE BÚSQUEDAS

    //búsqueda por nombre, apellido o nif
    static async getUser(name, lastname, nif) {
        if (!name && !lastname && !nif) return null;

        let user = null;
        if (name) user = await OwnersRepository.findByName(sanitizeString(name));
        if (!user && lastname) user = await OwnersRepository.findByLastname(sanitizeString(lastname));
        if (!user && nif) user = await OwnersRepository.findByNif(sanitizeString(nif));
        return user;
    }

    // Obtener un usuario por ID
    static async getUserId(id) {
        if (!id && isNaN(id)) return null;
        return await OwnersRepository.findById(id);
    }

    //SIGUIENTE MÉTODOS CREATE, UPDATE, DELETE

    //crear usuario
    static async createUser(owner) {
        //verificamos antes si existe antes de crear
        const {nif} = owner;
        const existing = await OwnersRepository.findByNif(nif);
        if (existing) return null;

        const ownerID = await OwnersRepository.create(owner);
        return {ownerID, owner};
    }

    //actualizar usuarios
    static async updateUser(owner) {
        if (!owner.id || !isNaN(owner.id)) return null;
        //verificamos antes si existe antes de actualizar
        const existing = await OwnersRepository.findById(owner.id);
        if (!existing) return null;

        const updated = await OwnersRepository.update(owner);
        return updated ? owner : null;
    }

    //eliminar usuarios
    static async deleteUser(id) {
        if (!id || isNaN(id)) return null;
        //verificamos antes si existe antes de actualizar
        const existing = await OwnersRepository.findById(id);
        if (!existing) return null;

        return await OwnersRepository.delete(id);
    }


}