const fs = require('fs');
const path = require('path');

const saveData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../DB/DB.json'), JSON.stringify(data, null, 2));
};



module.exports = { saveData };