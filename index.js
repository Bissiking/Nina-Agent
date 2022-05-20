// CONST IMPORTANTE

// START SCRIPT
console.log("Démarrage de l'Agent ...");
console.log("Récupération des fichiers importants de l'Agent");
// Récupération du .ENV
require('dotenv').config();
console.log("Initialisation des dépendances de l'Agent");
console.log("Chargement des modules de l'Agent");
// CONST
const AgentConfig = require('./functions/config/index');
AgentConfig();

// SYSTEM
const { OsInfo, CpuInfo, SystemInfo } = require('./modules/website/system_setup');
console.log('Récupération des informations machine');
OsInfo()
CpuInfo()
SystemInfo()

// console.log("Nina initialisé. || Version:" + dataConf.version + " || Build:" + dataConf.build);

// FORK Module
const ForkInit = require('./functions/fork/index');

// ------------------------------------------------------ //
// Execute FORK Modules

ForkInit('api');
ForkInit('website');