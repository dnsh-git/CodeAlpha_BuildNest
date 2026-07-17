const dotenv = require('dotenv');
const app = require('./app');
const { connectDB } = require('./config/database');

const result = dotenv.config();
console.log(result);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`BuildNest API is listening on port ${PORT}`);
  });
};

startServer();
