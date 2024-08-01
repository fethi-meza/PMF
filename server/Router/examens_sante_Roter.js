const express = require('express');
const router = express.Router({ mergeParams: true });
const examensController = require('../Controller/examens_sante_controller');

router.get('/getAllExamens', examensController.getAllExamens);
router.post('/addExamen', examensController.addExamen);
router.put('/:date', examensController.updateExamen);
router.delete('/:date', examensController.deleteExamen);

module.exports = router;
