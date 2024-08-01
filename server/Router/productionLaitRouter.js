const express = require('express');
const router = express.Router({ mergeParams: true });
const productionsController = require('../Controller/productionLaitController');

router.get('/', productionsController.getAllProductions);
router.post('/addProduction', productionsController.addProduction);
router.put('/:date', productionsController.updateProduction);
router.delete('/:date', productionsController.deleteProduction);

module.exports = router;
