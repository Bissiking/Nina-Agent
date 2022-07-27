const { exec } = require("child_process");
const fs = require('fs');
const { Logs } = require("./LogCore");
const Mod = 'DockerCore';

function VerifFileOrDocs(PathAndFile) { // Vérifie des dossiers
    if(fs.existsSync(PathAndFile)){
        return true;
    }else{
        return false;
    }
}

function Exec(cmd) { // Exécute les commandes
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            Logs(Mod, "fatal", `Echec de l'éxecution de la commande: "${cmd}" || error: ${error} || stdout: ${stdout} || stderr: ${stderr}`)
            return false;
        } else {
            return true
        }
    });
}

// Vérification de l'existance du ok_docker
function VerifDockerFile() { // Verification de la présence du fichier docker
    Logs(Mod, 'info', 'Vérification de la présence du fichier "ok_docker"');
    let PathAndFileDocker = "./ok_docker";
    let Var_VerifFileOrDocs = VerifFileOrDocs(PathAndFileDocker);
    if(Var_VerifFileOrDocs == true){   
        Logs(Mod, 'info', '"ok_docker" trouvé, lancement du téléchargement du noyau docker');
        return true 
    }else{
        Logs(Mod, 'fatal', '"ok_docker" non trouvé, lancement du téléchargement du noyau docker impossible');
        return false
    }
}

// Verification de l'existance du socket
function ExistDockerSock() { // Installation DockerCore
    Logs(Mod, 'info', 'Vérification de la présence du fichier "docker.sock"');
    let PathAndFileDocker = "/var/run/docker.sock";
    let Var_VerifFileOrDocs = VerifFileOrDocs(PathAndFileDocker);
    if(Var_VerifFileOrDocs == true){
        Logs(Mod, 'info', 'Socket docker trouvé');
        return true 
    }else{
        Logs(Mod, 'fatal', 'Socket docker non trouvé');
        return false
    }
}

function DockerNpmInstall() { // Installation DockerCore
    Logs(Mod, 'info', 'Installation du module npm "dockerode"');
        let cmd = 'npm i dockerode';
        let Exec = Exec(cmd);
        if(Exec == true){
            Logs(Mod, 'info', 'Installtion du module réussi');
            return true 
        }else{
            Logs(Mod, 'warn', 'Echec de l\'installation du module');
            return false
        }
}

function VerifDockerCoreDir() { // Vérification de la présence du noyau
    Logs(Mod, 'info', 'Verification de la précense du noyaux');
    let PathAndFileDocker = "../agent-docker-core";
    let Var_VerifFileOrDocs = VerifFileOrDocs(PathAndFileDocker);
    if(Var_VerifFileOrDocs == true){
        Logs(Mod, 'info', 'Le noyau docker existe déjà');
        return true 
    }else{
        Logs(Mod, 'warn', 'Noyau docker non trouvé');
        return false
    }
}

function DockerCoreInstall() { // Installation du noyau docker
    Logs(Mod, 'info', 'Installation du noyau');
    // Lancement de l'installation du noyau
    let cmd = 'git clone https://github.com/BissiGIT/agent-docker-core.git';
    Exec(cmd);
    // Verification de la présence du noyau
    let PathAndFileDocker = "../agent-docker-core";
    let Var_VerifFileOrDocs = VerifFileOrDocs(PathAndFileDocker);
    // Réponse du noyau
    if(Var_VerifFileOrDocs == true){
        Logs(Mod, 'info', 'Le noyau docker existe déjà');
        return true 
    }else{
        Logs(Mod, 'warn', 'Noyau docker non trouvé');
        return false
    }

}

module.exports = { ExistDockerSock, VerifDockerFile, DockerNpmInstall, VerifDockerCoreDir, DockerCoreInstall }