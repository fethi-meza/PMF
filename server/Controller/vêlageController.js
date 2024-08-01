const fs = require('fs');
const path = require('path');
let data = require('../DB/DB.json');

// Save data function
const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../DB/DB.json'), JSON.stringify(data, null, 2));
};




// Get all vêlages for a vache
const getAllVelages = (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`Fetching vêlages for vache ID: ${id}`);
  const vache = data.vaches.find(v => v.id_vache === id);
  if (!vache) {
      console.log('Vache not found');
      return res.status(404).json({ message: 'Vache not found' });
  }
  console.log('Vêlages found:', vache.vêlages);
  res.json(vache.vêlages);
};

// Add a vêlage
const addVelage = (req, res) => {
    const id = parseInt(req.params.id);
    const vache = data.vaches.find(vache => vache.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const newVelage = req.body;
    vache.vêlages.push(newVelage);

    const newVache = {
        id_vache: data.vaches.length + 1,
        date_entree: newVelage.date_vêlage,
        race: vache.race,
        mother_id: id,
        examens_sante: [],
        vêlages: [],
        production_lait: []
    };
    data.vaches.push(newVache);

    saveData(data); 
    res.json({ mother: vache, newVache });
};

// Update a vêlage
const updateVelage = (req, res) => {
    const id = parseInt(req.params.id);
    const date_vêlage = req.params.date_vêlage;
    const vache = data.vaches.find(vache => vache.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const velage = vache.vêlages.find(v => v.date_vêlage === date_vêlage);
    if (!velage) return res.status(404).json({ message: 'Vêlage not found' });

    Object.assign(velage, req.body);
    saveData(data);
    res.json(velage);
};

// Delete a vêlage
const deleteVelage = (req, res) => {
    const id = parseInt(req.params.id);
    const date_vêlage = req.params.date_vêlage;
    const vache = data.vaches.find(vache => vache.id_vache === id);
    if (!vache) return res.status(404).json({ message: 'Vache not found' });

    const vêlageIndex = vache.vêlages.findIndex(v => v.date_vêlage === date_vêlage);
    if (vêlageIndex === -1) return res.status(404).json({ message: 'Vêlage not found' });

    vache.vêlages.splice(vêlageIndex, 1);
    saveData(data);
    res.json({ message: 'Vêlage deleted successfully' });
};

module.exports = { getAllVelages, addVelage, updateVelage, deleteVelage };
