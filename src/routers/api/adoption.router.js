
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Adoption
 *   description: Endpoints para gestión de adopciones
 */

/**
 * @swagger
 * /api/adoption:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoption]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", (req, res) => {
    
    res.status(200).json([]);
});

/**
 * @swagger
 * /api/adoption:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopción creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/", (req, res) => {
    // Aquí iría la lógica para crear una adopción
    res.status(201).json({ message: "Adopción creada" });
});

/**
 * @swagger
 * /api/adoption/{id}:
 *   put:
 *     summary: Actualizar una adopción
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Adopción actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put("/:id", (req, res) => {
    // Aquí iría la lógica para actualizar una adopción
    res.status(200).json({ message: "Adopción actualizada" });
});

/**
 * @swagger
 * /api/adoption/{id}:
 *   delete:
 *     summary: Eliminar una adopción
 *     tags: [Adoption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/:id", (req, res) => {
    
    res.status(200).json({ message: "Adopción eliminada" });
});

module.exports = router;
