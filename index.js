
require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();

const app = require('./app');

const config = require('./utils/config');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
});
