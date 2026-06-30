const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'yieldly-db.json');
let db;

async function initializeDatabase() {
  const adapter = new JSONFile(DB_PATH);
  db = new Low(adapter, { users: [], stokvels: [], stokvelMembers: [], payments: [] });
  
  await db.read();
  
  // Ensure default structure
  if (!db.data) {
    db.data = { users: [], stokvels: [], stokvelMembers: [], payments: [] };
    await db.write();
  }
  
  console.log('  💾 Database initialized (JSON file)');
}

function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

module.exports = { initializeDatabase, getDb };