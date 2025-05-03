import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

async function createAdminUser() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // change if needed
    password: 'Meenam@2925', // change if needed
    database: 'veggietopia' // change if needed
  });

  const name = 'Admin2';
  const email = 'admin2@veggietopia.com';
  const plainPassword = 'Admin2'; // change to desired password

  const saltRounds = 10;
  //const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const sql = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
  await connection.execute(sql, [name, email, plainPassword]);

  console.log('Admin user created successfully');
  await connection.end();
}

createAdminUser().catch(console.error);
