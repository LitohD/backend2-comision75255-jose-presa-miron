import { petsRepository } from "../repositories/repository.js";

class PetsController {
    getAllPets = async (req, res, next) => {
        try {
            const pets = await petsRepository.readAll();
            res.status(200).json(pets);
        } catch (error) {
            next(error);
        }
    };
}

const petsController = new PetsController();
export default petsController;