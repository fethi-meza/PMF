const express = require('express');
const router = express.Router();
const vachesController = require('../Controller/vachControler');

router.get('/AllVaches', vachesController.getAllVaches);
router.get('/:id', vachesController.getOneVache);
router.post('/addVach', vachesController.createVache);
router.put('/:id', vachesController.updateVache);
router.delete('/:id', vachesController.deleteVache);

module.exports = router;
