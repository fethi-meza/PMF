const fs = require('fs');
const path = require('path');
let data = require('../DB/DB.json');

// Save data function
const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../DB/DB.json'), JSON.stringify(data, null, 2));
};

// Get all examens_sante for a vache
const getAllExamens = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });
    res.json(vache.examens_sante);
};

// Add a new examen_sante to a vache
const addExamen = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });
    vache.examens_sante.push(req.body);
    saveData(data);
    res.json(req.body);
};

// Update an existing examen_sante of a vache
const updateExamen = (req, res) => {
    const id = parseInt(req.params.id);
    const examenDate = req.params.date;
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const index = vache.examens_sante.findIndex(e => e.date_examen === examenDate);
    if (index === -1) return res.status(404).json({ message: 'Examen not found' });

    vache.examens_sante[index] = req.body;
    saveData(data);
    res.json(req.body);
};

// Delete an examen_sante from a vache
const deleteExamen = (req, res) => {
    const id = parseInt(req.params.id);
    const examenDate = req.params.date;
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const index = vache.examens_sante.findIndex(e => e.date_examen === examenDate);
    if (index === -1) return res.status(404).json({ message: 'Examen not found' });

    vache.examens_sante.splice(index, 1);
    saveData(data);
    res.json({ message: 'Examen deleted successfully' });
};

module.exports = { getAllExamens, addExamen, updateExamen, deleteExamen };
