import Jimp from 'jimp';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const __dirname = path.resolve();
const PUBLIC_DIR = path.join(__dirname, 'public');
const app = express();
const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.get('/subir', async (req, res) => {
  const { imagen } = req.query;
  console.log(req.query)
  const nombreDeLaImagen = `${uuidv4().slice(30)}.jpeg`;
  const imagePath = path.join(PUBLIC_DIR, nombreDeLaImagen);

  try {
    const IMG = await Jimp.read(imagen);
    await IMG.resize(350, Jimp.AUTO).greyscale().writeAsync(imagePath);
    res.sendFile(imagePath);
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).json({ error: 'Error processing image' });
  }
});
