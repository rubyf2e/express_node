const { GoogleSpreadsheet } = require('google-spreadsheet');
async function getSheet(docID, sheetID, credentialsPath = process.env['GOOGLE_SPREADSHEET_CREDENTIALS_PATH']) {
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];

  return sheet;
};

async function getIngredients() {
	const sheet = await getSheet(process.env['DISHES_DOC_ID'], process.env['INGREDIENTS_SHEET_ID']);
	const rows = await sheet.getRows();
	const data = [];

	for (row of rows) {
		let ingredient = [];
		ingredient.src = process.env['STATIC_URL']+'/public/images/ingredients/' + row._rawData[0] + '.jpeg';
		ingredient.name = row._rawData[0];
		ingredient.quantity = row._rawData[1];
		ingredient.unit = row._rawData[2];
		ingredient.price = row._rawData[3];
		data.push(ingredient);
	}

	return data;
};

async function getDishes() {
 		const ingredients = await getIngredients();
    const dishesSheet = await getSheet(process.env['DISHES_DOC_ID'], process.env['DISHES_SHEET_ID']);
    const dishesSheetRows = await dishesSheet.getRows();
    const data = [];
    let dishKey = 0;

    dishesSheetRows.forEach(function(row, key){
      if (row._rawData[0] !== undefined && row._rawData[0] !== '') {
        let dish = []; 
        dish.src = process.env['STATIC_URL']+'/public/images/dishes/' + row._rawData[0] + '.jpeg';
        dish.name = row._rawData[0];
        dish.price = 0;
        dish.ingredients = [];

        data[dishKey] = dish;

        dishKey ++;
      } 

      if (row._rawData[1] !== undefined && row._rawData[1] !== ''){
        let ingredient = [];

        ingredient.src = process.env['STATIC_URL']+'/public/images/ingredients/' + row._rawData[1] + '.jpeg';
        ingredient.name = row._rawData[1];

        let findIngredient = ingredients.find(function(value, index) {
          if (value.name === row._rawData[1]) {
            return value;
          }
        });

        ingredient.price = row._rawData[2] * findIngredient.price;
        ingredient.quantity = row._rawData[2] * findIngredient.quantity;
        ingredient.unit = findIngredient.unit;
        data[dishKey-1]['ingredients'].push(ingredient);
        data[dishKey-1].price += ingredient.price;
      }
    });

    return data;
};


module.exports = {
  getSheet, getIngredients, getDishes 
};