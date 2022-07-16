const { LogWriter } = require("./loggerWriter");

// FUNCTIONS
function LogDate() {
    // Date object initialized as per New Zealand timezone. Returns a datetime string
    let nz_date_string = new Date().toLocaleString("fr-FR", { timeZone: 'Europe/Paris' });
    return nz_date_string;
}

function Logs(module, type, message) {
    let date = LogDate();
    switch (type) {
        case "info":
            console.log('[' + date + '][' + module + '][' + type + '] - ' + message)
            break;

        case "warn":
            console.warn('[' + date + '][' + module + '][' + type + '] - ' + message)
            break;

        case "fatal":
            console.error('[' + date + '][' + module + '][' + type + '] - ' + message)
            break;

        default:
            console.log('[' + date + '][' + module + '][' + type + '] - ' + 'LOGS ERROR')
            break;
    }
    let dataPushLog = {
        "timestamp": date,
        "level": type,
        "loggerName": module,
        "message": message
    }
    LogWriter(dataPushLog);
}


module.exports = { Logs }

// logger.trace('message'); // A voir ...
// logger.debug('message');