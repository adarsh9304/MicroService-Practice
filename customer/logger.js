const winston = require('winston');
const LogstashTransport = require('winston3-logstash-transport');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp() 
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
    new LogstashTransport({
      port: 5000,                 
      host: 'localhost',          
      node_name: 'customer',      
    })
  ]
});

module.exports = logger;
