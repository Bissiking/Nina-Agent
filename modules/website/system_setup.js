const si = require('systeminformation');
const fs = require("fs");

// FUNCTION

function SystemInfo() {
    si.system(function(data) {
        // FUNCTION
        var dataOS = {
                id: "system",
                manufacturer: data.manufacturer,
                model: data.model,
            }
            // Conversion
        const osinfoJSON = JSON.stringify(dataOS);
        const osinfoObject = JSON.parse(osinfoJSON);
        // Converting js object into JSON string
        // and writting to data.json file
        const dataJSON = JSON.stringify(osinfoObject);
        // Ecriture du fichier
        fs.writeFileSync("./data/system_materiel.json", dataJSON);
    })
}

function CpuInfo() {
    si.cpu(function(data) {
        // FUNCTION
        var dataOS = {
                id: "cpu",
                cpuSpeedMax: data.speedMax,
                cpuCores: data.cores,
                cpuModel: data.brand
            }
            // Conversion
        const osinfoJSON = JSON.stringify(dataOS);
        const osinfoObject = JSON.parse(osinfoJSON);
        // Converting js object into JSON string
        // and writting to data.json file
        const dataJSON = JSON.stringify(osinfoObject);
        // Ecriture du fichier
        fs.writeFileSync("./data/system_cpu.json", dataJSON);
    })
}

function OsInfo() {
    si.osInfo(function(data) {
        // FUNCTION
        var dataOS = {
                id: "os",
                platform: data.platform,
                distro: data.distro,
                logofile: data.logofile
            }
            // Conversion
        const osinfoJSON = JSON.stringify(dataOS);
        const osinfoObject = JSON.parse(osinfoJSON);
        // Converting js object into JSON string
        // and writting to data.json file
        const dataJSON = JSON.stringify(osinfoObject);
        // Ecriture du fichier
        fs.writeFileSync("./data/system_os.json", dataJSON);
    })
}

module.exports = {
    OsInfo,
    CpuInfo,
    SystemInfo
};