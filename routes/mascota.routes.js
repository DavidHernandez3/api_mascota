import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const mascotaFile = path.join(process.cwd(), 'data', 'mascotas.json');
const router = Router();

// Define la función para leer el archivo
function readFile() {
    const result = fs.readFileSync(mascotaFile, 'utf-8');
    const json = JSON.parse(result);
    return json;
}

// Define la función para guardar en el archivo
function saveFile(data) {
    fs.writeFileSync(mascotaFile, JSON.stringify(data, null, 2));
}

router.get('/', (req, res) => {
    try {
        const mascotas = readFile();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer mascotas' });
    }
});

router.post('/', (req, res) => {
    try {
        const mascota = req.body;
        saveFile(mascota);
        res.status(201).json({ message: 'La mascota ha sido registrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar mascota' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const mascotaId = parseInt(req.params.id);
        if (isNaN(mascotaId)) {
            res.status(400).json({ error: 'ID de mascota no válido' });
            return;
        }

        const mascota = req.body;
        if (!mascota || Object.keys(mascota).length === 0) {
            res.status(400).json({ error: 'Datos de mascota no válidos' });
            return;
        }

        const mascotas = readFile();
        const index = mascotas.findIndex((m) => m.id === mascotaId);
        if (index === -1) {
            res.status(404).json({ error: 'Mascota no encontrada' });
            return;
        }

        mascota.id = mascotaId;
        mascotas[index] = mascota;
        saveFile(mascotas);

        res.json({ message: 'Mascota actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar mascota' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const mascotaId = parseInt(req.params.id);
        if (isNaN(mascotaId)) {
            res.status(400).json({ error: 'ID de mascota no válido' });
            return;
        }

        const mascotas = readFile();
        const index = mascotas.findIndex((m) => m.id === mascotaId);
        if (index === -1) {
            res.status(404).json({ error: 'Mascota no encontrada' });
            return;
        }

        mascotas.splice(index, 1);
        saveFile(mascotas);

        res.json({ message: 'Mascota eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar mascota' });
    }
});

export default router;
