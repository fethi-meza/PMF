const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const vachesRouter = require('./Router/vachRoute');
const examensRouter = require('./Router/examens_sante_Roter');
const productionsRouter = require('./Router/productionLaitRouter');
const velagesRouter = require('./Router/vêlageRouter');

const app = express();
const port = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/vaches', vachesRouter);
app.use('/api/v1/vaches/:id/examens', examensRouter);
app.use('/api/v1/vaches/:id/productions', productionsRouter);
app.use('/api/v1/vaches/:id/', velagesRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
