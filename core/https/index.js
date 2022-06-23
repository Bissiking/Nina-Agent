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
        exec('apt install letsencrypt', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            setTimeout(() => {
                exec('certbot certonly --standalone --agree-tos --preferred-challenges http -d ' + Agent.ip_agent + ' --register-unsafely-without-email', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    setTimeout(() => {
                        exec('cp /etc/letsencrypt/live/' + Agent.ip_agent + '/cert.pem ./core/https/certs/custom.crt' + Agent.ip_agent + ' --register-unsafely-without-email', (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return;
                            }
                            console.log(`stdout: ${stdout}`);
                            console.error(`stderr: ${stderr}`);
                            setTimeout(() => {
                                exec('cp /etc/letsencrypt/live/' + Agent.ip_agent + '/cert.pem ./core/https/certs/custom.key' + Agent.ip_agent + ' --register-unsafely-without-email', (error, stdout, stderr) => {
                                    if (error) {
                                        console.error(`exec error: ${error}`);
                                        return;
                                    }
                                    console.log(`stdout: ${stdout}`);
                                    console.error(`stderr: ${stderr}`);
                                });
                            }, 1000);
                        });
                    }, 1000);
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