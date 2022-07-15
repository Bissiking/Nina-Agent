const { exec } = require("child_process");

// FUNCTION PULL
function CloneCore() {
    exec('git clone https://github.com/BissiGIT/agent-core.git', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

function CloneFork() {
    exec('cd modules && git clone https://github.com/BissiGIT/agent-fork.git', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

function CloneWebsite() {
    exec('cd modules && git clone https://github.com/BissiGIT/agent-website.git', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

function Test() {
    exec('dir', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

module.exports = { CloneCore, CloneFork, CloneWebsite, Test }