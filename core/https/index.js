// VARIABLES 
var dirData = './data';
var dirCerts = './core/https/certs';
// CONST
const fs = require('fs');
const { exec } = require("child_process");
// Function
function CreateDocsCerts() {
    if (!fs.existsSync(dirCerts)) {
        fs.mkdirSync(dirCerts);
    }
}

function CreateDocsData() {
    if (!fs.existsSync(dirData + '/agent_data')) {
        fs.mkdirSync(dirData + '/agent_data');
    }
    if (!fs.existsSync(dirData + '/fork_data')) {
        fs.mkdirSync(dirData + '/fork_data');
    }
    if (!fs.existsSync(dirData + '/logs')) {
        fs.mkdirSync(dirData + '/logs');
    }
}

function CreateCerts(Agent) {
    if (fs.existsSync(dirCerts)) {
        exec('apt install openssl', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            setTimeout(() => {
                exec('openssl req -nodes -new -passout pass:' + Agent.id_agent + ' -subj "/C=FR/ST=Paris/L=Paris/O=NinaIndustries/OU=Nina/CN="' + Agent.ip_agent + ' -x509 -keyout ./core/https/AgentCerts.key -out ./core/https/AgentCerts.cert', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                    console.error(`stderr: ${stderr}`);
                });
            }, 3000);
        });
    } else {
        fs.mkdirSync(dirCerts);
        CreateCerts();
    }
}


// FUNCTION
module.exports = {
    CreateDocsCerts,
    CreateDocsData,
    CreateCerts
}