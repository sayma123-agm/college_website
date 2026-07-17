require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_NAME = process.env.DB_NAME || 'agmrcet_db';

async function exportDb() {
    console.log('Connecting to MySQL database...');
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '0000',
        database: DB_NAME
    });

    console.log(`Exporting database "${DB_NAME}"...`);
    let sqlDump = `-- Database dump of ${DB_NAME}\n`;
    sqlDump += `-- Generated at ${new Date().toISOString()}\n\n`;
    sqlDump += `SET FOREIGN_KEY_CHECKS=0;\n\n`;

    // Get list of tables
    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);

    for (const tableName of tableNames) {
        sqlDump += `-- Table structure for table \`${tableName}\`\n`;
        const [createTableResult] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
        const createTableSql = createTableResult[0]['Create Table'];
        sqlDump += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
        sqlDump += `${createTableSql};\n\n`;

        // Get table data
        sqlDump += `-- Dumping data for table \`${tableName}\`\n`;
        const [rows] = await connection.query(`SELECT * FROM \`${tableName}\``);
        if (rows.length > 0) {
            const columns = Object.keys(rows[0]).map(col => `\`${col}\``).join(', ');
            sqlDump += `INSERT INTO \`${tableName}\` (${columns}) VALUES\n`;
            
            const insertValues = rows.map(row => {
                const values = Object.values(row).map(val => {
                    if (val === null) return 'NULL';
                    if (typeof val === 'number') return val;
                    if (val instanceof Date) {
                        return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
                    }
                    if (typeof val === 'object') {
                        // For buffers or other objects, check if it's a buffer
                        if (Buffer.isBuffer(val)) {
                            return `X'${val.toString('hex')}'`;
                        }
                        return connection.escape(JSON.stringify(val));
                    }
                    return connection.escape(val);
                }).join(', ');
                return `(${values})`;
            }).join(',\n') + ';\n\n';
            
            sqlDump += insertValues;
        } else {
            sqlDump += `-- No data to dump\n\n`;
        }
    }

    sqlDump += `SET FOREIGN_KEY_CHECKS=1;\n`;

    const outputPath = path.join(__dirname, 'database_dump.sql');
    fs.writeFileSync(outputPath, sqlDump, 'utf8');
    console.log(`Database exported successfully to ${outputPath}`);
    
    await connection.end();
}

exportDb().catch(err => {
    console.error('Error during database export:', err);
    process.exit(1);
});
