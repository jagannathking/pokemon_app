const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5001;


app.listen(PORT, () => {
    if (!process.env.PORT) {
        console.warn(`Warning: PORT environment variable not set, using default ${PORT}`);
    }
    console.log(`Server is running on PORT ${PORT}`);
});