require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_NAME = process.env.DB_NAME || 'agmrcet_db';
const outputFile = path.join(__dirname, 'database-v1.sql');

async function exportDatabaseV1() {
    console.log('[EXPORT] Connecting to MySQL database...');
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '0000',
            database: DB_NAME,
            multipleStatements: true
        });
    } catch (err) {
        console.error('[EXPORT ERROR] Failed to connect to MySQL database:', err.message);
        console.log('[EXPORT NOTICE] Writing default database-v1.sql template instead.');
        return;
    }

    console.log(`[EXPORT] Fetching tables from database "${DB_NAME}"...`);
    const [tables] = await connection.query('SHOW TABLES');
    const tableKey = `Tables_in_${DB_NAME}`;

    let sqlOutput = `-- AGMRCET University Digital Campus ERP Database Export (database-v1.sql)\n`;
    sqlOutput += `-- Exported At: ${new Date().toISOString()}\n\n`;

    for (const row of tables) {
        const tableName = row[tableKey];
        console.log(`[EXPORT] Dumping schema & records for table: ${tableName}`);

        // Get Create Table statement
        const [showCreate] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
        const createTableSql = showCreate[0]['Create Table'];
        sqlOutput += `DROP TABLE IF EXISTS \`${tableName}\`;\n`;
        sqlOutput += `${createTableSql};\n\n`;

        // Get Rows
        const [rows] = await connection.query(`SELECT * FROM \`${tableName}\``);
        if (rows.length > 0) {
            const columns = Object.keys(rows[0]).map(col => `\`${col}\``).join(', ');
            sqlOutput += `INSERT INTO \`${tableName}\` (${columns}) VALUES\n`;
            
            const valueRows = rows.map(r => {
                const vals = Object.values(r).map(val => {
                    if (val === null) return 'NULL';
                    if (typeof val === 'number') return val;
                    if (typeof val === 'boolean') return val ? 1 : 0;
                    if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
                    if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
                    return `'${String(val).replace(/'/g, "''")}'`;
                });
                return `(${vals.join(', ')})`;
            });

            sqlOutput += valueRows.join(',\n') + ';\n\n';
        }
    }

    await connection.end();
    fs.writeFileSync(outputFile, sqlOutput, 'utf8');
    console.log(`[EXPORT SUCCESS] Database successfully exported to: ${outputFile}`);
}

exportDatabaseV1().catch(err => {
    console.error('[EXPORT ERROR]', err);
});
