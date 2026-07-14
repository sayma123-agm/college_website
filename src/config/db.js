const mysql = require('mysql2/promise');

// Create connection pool configuration using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '0000',
    database: process.env.DB_NAME || 'agmrcet_db',
    waitForConnections: true,
    connectionLimit: 150,
    queueLimit: 0
});

// Test connection on launch (logs status but does not block)
pool.getConnection()
    .then(connection => {
        console.log('Database Connected Successfully! Node is running on active MySQL instance.');
        connection.release();
    })
    .catch(err => {
        console.warn('Database Connection Failed! Fallback mock data arrays will be used in development.');
        console.warn('Reason:', err.message);
    });

module.exports = pool;
