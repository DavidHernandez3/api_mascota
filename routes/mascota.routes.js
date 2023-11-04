import { Router } from 'express';
import fs from 'fs' // file system
import path from 'path'

const mascotaFile = path.join(process.cwd(), "data", "mascotas.json")
const router = Router();

router.get("/", (req, res) => {
    const mascotas = readFile()
    res.json(mascotas)
});


function readFile(){
    const result = fs.readFileSync(mascotaFile, "utf-8")
    const json = JSON.parse(result)
    return json
}
export default router;
