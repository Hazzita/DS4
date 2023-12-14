const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

// Middlewares (funciones que se ejecutan antes de que lleguen a las rutas)
app.use(cors());
app.use(express.json());

// Rutas (endpoints) 
app.get('/', (req, res) => {
    res.json({ message: 'Proyecto final DS4 Rubén Jaén 8-947-1049 / Alvan Samudio 4-807-1931' });
});

// Rutas (endpoints)
app.post('/piramide', (req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
// Guardar piramide
    const body = req.body.piramide;
    localStorage.setItem('piramide', body);

    res.json({ message: 'Piramide guardada' });
});


app.get('/piramide', (req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    // Obtener piramide
    const piramide = localStorage.getItem('piramide');
    // Respuesta
    if(piramide != null){
        res.json({ piramide: piramide });
    }else{
        return res.status(400).json({
            ok: false,
            message: 'No se ha encontrado piramide'
        });
    }
        
});

app.delete('/piramide', (req, res) => {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.removeItem('piramide');

    res.json({ message: 'Piramide eliminada' });
});

app.listen(port, () => {
    console.log(`Proyecto final piramide at http://localhost:${port}`);
});


