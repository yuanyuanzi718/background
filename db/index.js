import mysql from 'mysql'

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'cjh10695138',
  database: 'background'
})
export default db