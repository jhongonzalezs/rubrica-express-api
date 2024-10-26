const express = require('express');
const router = express.Router();
const Personaje = require('../models/Personaje'); // Importa el modelo

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Crea un nuevo personaje
 *     tags: [Personaje]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del personaje
 *               image:
 *                 type: string
 *                 description: URL de la imagen del personaje
 *               name:
 *                 type: string
 *                 description: Nombre del personaje
 *               nickname:
 *                 type: string
 *                 description: Apodo del personaje
 *               age:
 *                 type: string
 *                 description: Edad del personaje
 *               crew:
 *                 type: string
 *                 description: Tripulación del personaje
 *               rank:
 *                 type: string
 *                 description: Rango del personaje
 *               currentBounty:
 *                 type: string
 *                 description: Recompensa actual del personaje
 *             required:
 *               - id
 *               - image
 *               - name
 *               - nickname
 *               - age
 *               - crew
 *               - rank
 *               - currentBounty
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       500:
 *         description: Error al crear el personaje
 */
router.post('/', async (req, res) => {
    try {
        const { id, image, name, nickname, age, crew, rank, currentBounty } = req.body;
        
        const newPersonaje = new Personaje({
            id,
            image,
            name,
            nickname,
            age,
            crew,
            rank,
            currentBounty,
        });

        await newPersonaje.save(); // Guarda el nuevo personaje en MongoDB
        res.status(201).json(newPersonaje);
    } catch (error) {
        res.status(500).json({ message: 'Error creando personaje', error });
    }
});

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Obtiene todos los personajes
 *     tags: [Personaje]
 *     responses:
 *       200:
 *         description: Lista de todos los personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personaje'
 *       500:
 *         description: Error recuperando personajes
 */
router.get('/', async (req, res) => {
    try {
        const personajes = await Personaje.find();
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ message: 'Error recuperando personajes', error });
    }
});

/**
 * @swagger
 * /api/items/id/{id}:
 *   get:
 *     summary: Obtiene un personaje por ID
 *     tags: [Personaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del personaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del personaje
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error recuperando personaje por ID
 */
router.get('/id/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findOne({ id: parseInt(req.params.id) });
        if (!personaje) return res.status(404).json({ message: 'Personaje no encontrado' });
        res.json(personaje);
    } catch (error) {
        res.status(500).json({ message: 'Error recuperando personaje por ID', error });
    }
});

/**
 * @swagger
 * /api/items/name/{name}:
 *   get:
 *     summary: Obtiene un personaje por nombre
 *     tags: [Personaje]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nombre del personaje
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del personaje
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error recuperando personaje por nombre
 */
// Obtener un personaje por nombre (actualizado)

/**
 * @swagger
 * /api/items/name/{name}:
 *   get:
 *     summary: Obtiene un personaje por nombre o todos los personajes si no se proporciona un nombre
 *     tags: [Personaje]
 *     parameters:
 *       - name: name
 *         in: path
 *         required: false
 *         description: Nombre del personaje
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del personaje o lista de todos los personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error recuperando personajes por nombre
 */

router.get('/name/:name?', async (req, res) => {
    try {
        const { name } = req.params;
        
        // Si no se proporciona un nombre, devolver todos los personajes
        if (!name) {
            const personajes = await Personaje.find();
            return res.json(personajes);
        }

        const personaje = await Personaje.findOne({ name });
        if (!personaje) return res.status(404).json({ message: 'Personaje no encontrado' });
        
        res.json(personaje);
    } catch (error) {
        res.status(500).json({ message: 'Error recuperando personaje por nombre', error });
    }
});


/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Actualiza un personaje
 *     tags: [Personaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del personaje
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL de la imagen del personaje
 *               name:
 *                 type: string
 *                 description: Nombre del personaje
 *               nickname:
 *                 type: string
 *                 description: Apodo del personaje
 *               age:
 *                 type: string
 *                 description: Edad del personaje
 *               crew:
 *                 type: string
 *                 description: Tripulación del personaje
 *               rank:
 *                 type: string
 *                 description: Rango del personaje
 *               currentBounty:
 *                 type: string
 *                 description: Recompensa actual del personaje
 *             example:
 *               image: "https://example.com/image.jpg"
 *               name: "Luffy"
 *               nickname: "Sombrero de Paja"
 *               age: "19 años"
 *               crew: "Piratas de Sombrero de Paja"
 *               rank: "Capitán"
 *               currentBounty: "1.500.000.000"
 *     responses:
 *       200:
 *         description: Personaje actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error actualizando personaje
 */
router.put('/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
        if (!personaje) return res.status(404).json({ message: 'Personaje no encontrado' });
        res.json({ message: 'Personaje actualizado', personaje });
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando personaje', error });
    }
});

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Elimina un personaje
 *     tags: [Personaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del personaje
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personaje eliminado
 *       404:
 *         description: Personaje no encontrado
 *       500:
 *         description: Error eliminando personaje
 */
router.delete('/:id', async (req, res) => {
    try {
        const personaje = await Personaje.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!personaje) return res.status(404).json({ message: 'Personaje no encontrado' });
        res.json({ message: 'Personaje eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando personaje', error });
    }
});

module.exports = router;
