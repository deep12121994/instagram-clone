if(process.env.NODE_ENV === 'production')
{
    module.exports = require('./productionfile');
}else {
    module.exports = require('./devlopmentfile')
}