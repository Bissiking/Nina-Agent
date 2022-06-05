const { fork, exec } = require("child_process");
const fs = require('fs');
const { Module } = require("module");
const pathCore = './agent-core/';
const pathFork = './modules/agent-fork/';
const pathWebsite = './modules/agent-website/';

function AgentStart() {
    if (fs.existsSync(pathCore)) { // Check du core
        const { CloneFork, CloneWebsite } = require("./agent-core/clone.js");
        if (fs.existsSync(pathFork)) {
            console.log('Fork déjà existant');
        } else {
            CloneFork();
        }
        if (fs.existsSync(pathWebsite)) {
            console.log('Website déjà existant');
        } else {
            CloneWebsite();
        }
        console.log('Lancement du coeur de l\'agent');
        setTimeout(() => {
            const modules = require(pathFork + 'module.json') // Récupération du fichier module
            const { Fork } = require(pathFork + "index.js");
            let ModuleCount = Object.keys(modules).length
            for (let i = 0; i < ModuleCount; i++) {
                let Module = Object.keys(modules)[i];
                Fork(Module);
            }
        }, 5000);
    } else {
        // Téléchargement du module
        exec('git clone https://github.com/BissiGIT/agent-core.git', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            // Téléchargment des modules
            const { CloneFork, CloneWebsite } = require("./agent-core/clone.js");
            if (fs.existsSync(pathFork)) {
                console.log('Fork déjà existant');
            } else {
                CloneFork();
            }
            if (fs.existsSync(pathWebsite)) {
                console.log('Website déjà existant');
            } else {
                CloneWebsite();
            }
        });
        AgentStart();
    }
}

// Lancement du coeur
AgentStart();