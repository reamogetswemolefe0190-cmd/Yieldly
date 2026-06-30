const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize database then start routes
initializeDatabase().then(() => {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/stokvels', require('./routes/stokvels'));
  app.use('/api/users', require('./routes/users'));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`\n  🚀 Yieldly API Server running\n  📡 Port: ${PORT}\n  💾 Database: JSON file (yieldly-db.json)\n  🔗 API: http://localhost:${PORT}/api\n`);
  });
});
