const fs = require('fs');
const path = require('path');
let data = require('../DB/DB.json');

// Helper function to save the database
const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../DB/DB.json'), JSON.stringify(data, null, 2));
};

// Get all production_lait for a vache
const getAllProductions = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });
    res.json(vache.production_lait);
};

// Add a new production_lait to a vache
const addProduction = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });
    vache.production_lait.push(req.body);
    saveData(data);
    res.json(req.body);
};

// Update an existing production_lait of a vache
const updateProduction = (req, res) => {
    const id = parseInt(req.params.id);
    const productionDate = req.params.date;
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const index = vache.production_lait.findIndex(p => p.date_production === productionDate);
    if (index === -1) return res.status(404).json({ message: 'Production not found' });

    // Update both fields
    vache.production_lait[index].date_production = req.body.date_production;
    vache.production_lait[index].litres_lait = req.body.litres_lait;

    saveData(data);
    res.json(vache.production_lait[index]); // Return updated production object
};

// Delete a production_lait from a vache
const deleteProduction = (req, res) => {
    const id = parseInt(req.params.id);
    const productionDate = req.params.date;
    const vache = data.vaches.find(v => v.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const index = vache.production_lait.findIndex(p => p.date_production === productionDate);
    if (index === -1) return res.status(404).json({ message: 'Production not found' });

    vache.production_lait.splice(index, 1);
    saveData(data);
    res.json({ message: 'Production deleted successfully' });
};

module.exports = { getAllProductions, addProduction, updateProduction, deleteProduction };
