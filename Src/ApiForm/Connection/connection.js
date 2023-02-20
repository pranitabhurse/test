var config = {
    user: 'tron10club_db',
    password:'zs9O29$q4h3tzV89%4',
    server: '148.72.244.71', 
    database: 'tron10club_db' , options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    
      },
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
};

module.exports = config