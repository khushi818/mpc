const dotenv = require("dotenv");
const app = require('./app')
const production = require('./production')

const JIFFServer = require('jiff-mpc/lib/jiff-server');
dotenv.config();


const server =  production.create(app)

const jiffServer =  new JIFFServer(server, app)

production.listen(app)


