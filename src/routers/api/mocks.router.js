import { Router } from 'express';
import { generateMockUsers } from '../../helpers/mockingUsers.helper.js';
import { generateMockPets } from '../../helpers/mockingPets.helper.js';
import { usersService, petsService } from '../../services/service.js';

const router = Router();

router.get('/mockingusers', (req, res) => {
    const amount = Number(req.query.amount) || 50;
    const users = generateMockUsers(amount);
    res.json(users);
});

router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(50);
    res.json(pets);
});

router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;
    const mockUsers = generateMockUsers(Number(users));
    const mockPets = generateMockPets(Number(pets));
    await usersService.bulkInsert(mockUsers);
    await petsService.bulkInsert(mockPets);
    res.json({ users: mockUsers.length, pets: mockPets.length });
});

export default router;