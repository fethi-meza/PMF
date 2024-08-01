const fs = require('fs');
const path = require('path');
let data = require('../DB/DB.json');

// Save data function
const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../DB/DB.json'), JSON.stringify(data, null, 2));
};

// Get all vaches
const getAllVaches = (req, res) => {
    res.json(data.vaches);
};

// Get one vache by ID
const getOneVache = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });
    res.json(vache);
};

// Create a new vache
const createVache = (req, res) => {
    const newVache = req.body;

    // Calculate the next id_vache
    const maxId = data.vaches.reduce((max, vache) => vache.id_vache > max ? vache.id_vache : max, 0);
    const nextId = maxId + 1;

    // Ensure the new vache has the correct structure
    const completeVache = {
        id_vache: nextId,
        date_entree: newVache.date_entree || "",
        race: newVache.race || "",
        examens_sante: [],
        vêlages: [],
        production_lait: [],
    };

    data.vaches.push(completeVache);
    saveData(data);
    res.status(201).json(completeVache);
};

// Update an existing vache
const updateVache = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedVache = req.body;
    const index = data.vaches.findIndex(v => v.id_vache === id);
    if (index === -1) return res.status(404).json({ message: 'Vache not found' });

    // Preserve the original id_vache and update other fields
    data.vaches[index] = {
        id_vache: data.vaches[index].id_vache,
        date_entree: updatedVache.date_entree || data.vaches[index].date_entree,
        race: updatedVache.race || data.vaches[index].race,
        examens_sante: updatedVache.examens_sante || data.vaches[index].examens_sante,
        vêlages: updatedVache.vêlages || data.vaches[index].vêlages,
        production_lait: updatedVache.production_lait || data.vaches[index].production_lait,
    };

    saveData(data);
    res.json(data.vaches[index]);
};

// Delete a vache
const deleteVache = (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.vaches.findIndex(v => v.id_vache === id);
    if (index === -1) return res.status(404).json({ message: 'Vache not found' });
    data.vaches.splice(index, 1);
    saveData(data);
    res.json({ message: 'Vache deleted successfully' });
};

module.exports = { getAllVaches, getOneVache, createVache, updateVache, deleteVache };
