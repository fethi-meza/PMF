const express = require('express');
const router = express.Router({ mergeParams: true });
const velagesController = require('../Controller/vêlageController');

router.get('/getAllVelages', velagesController.getAllVelages);
router.post('/addVelage', velagesController.addVelage);
router.put('/:id/updateVelage/:date_vêlage', velagesController.updateVelage);
router.delete('/:id/deleteVelage/:date_vêlage', velagesController.deleteVelage);

module.exports = router;
