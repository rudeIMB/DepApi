const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'Itachi2002',
        database: process.env.MYSQL_DB || 'Articles',
        port: process.env.MYSQL_PORT || '3306',
        connectTimeout: 60000
    },
    listPerPage: 10,
  };


module.exports = config;