const fs = require('fs');
const { Logs } = require('../logs');
const { ConnexionCheck } = require('../data');
const { ForkApiCore } = require("./ForkCore");

const Mod = "Core";
var Echec = 0;
// const NinaConf = require('./docs/NinaConf.json');
// system_faststart

// ASSETS
function DocsCreate(DocsCreate) {
	let docs = './'+DocsCreate;
	if(!fs.existsSync(docs)){
		fs.mkdirSync(docs);
	}
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

// NINA START 

function NinaOnlineFisrtStart(timer){
	// console.log('Récupération de la configuration ...');
	// ConfigNinaExtract();
	setTimeout(() => {
		console.log('Activation des logs');
		setTimeout(() => {
			Logs('info', Mod, 'Service de logs activé');
			setTimeout(() => {
				Logs('info', Mod, 'Démarrage de l\'API Interne');
				API();
			}, timer);
		}, timer);
	}, timer);
}

function NinaOfflineFisrtStart(){
	console.log('En attente de la connexion à la base de donnée.');
	setTimeout(() => {
		ConnexionCheck();
		fs.readFile('./docs/connection.json', "utf8", (err, data) => {
			data = JSON.parse(data);
			if (data.connect == true) {
				NinaOnlineFisrtStart();
			}else{
				Echec = Echec +1;
				if (Echec > 5) {
					console.log('Echec de la connexion. Arrêt de l\'Agent');
					process.exit(1);
				}
				setTimeout(() => {
					console.log('Echec de la connexion ... Nouvelle tentative');
					NinaOfflineFisrtStart();
				}, 10000);
			}
		});
	}, 1000);
}

function FirstStart() {
	// Recherche du fichier ok_docker
	console.log('Recherche du fichier ok_docker');
	setTimeout(() => {
		fs.readFile('./ok_docker.json', "utf8", (err, data) => {
			data = JSON.stringify(data);
			data = JSON.parse(data);
			if(!err){
				if (data.id_agent == true) {
					// Si l'agent a un ID
				}else{
					// Si l'agent n'a pas d'ID
					AgentNotAuth();
				}
			}else{
				console.warn('ok_docker.json introuvable ...');
				setTimeout(() => {
					console.error('Arrêt de l\'agent. Une erreur fatale s\'est produite.');
					process.exit(1);
				}, 5000);
			}
		})
	}, 5000);

	// Core(20000);
}
// CORE

function Core(timer) {
	timer = timer;
	// Création du dossier Docs
	console.log('Initialisation de l\'Agent');
	setTimeout(() => {
		console.log('Test de connexion à Nina');
		ConnexionCheck();
		setTimeout(() => {
			console.log('Validation de la connexion à Nina');
			fs.readFile('./docs/connection.json', "utf8", (err, data) => {
				data = JSON.parse(data);
				if (data.connect == true) {
					NinaOnlineFisrtStart(timer);
				}else{
					NinaOfflineFisrtStart(timer);
				}
			});
		}, timer);
	}, timer);
}

// START

function Start() {
	DocsCreate('docs');
	DocsCreate('docs/fork_data');
	if(fs.existsSync('./docs/AgentConf.json')){
		fs.readFile('./docs/AgentConf.json', "utf8", (err, data) => {
			data = JSON.parse(data);
			if (data.system_faststart == 0) {
				Core(15000);
			}else{
				Core(2500);
			}
		});
	}else{
		FirstStart();
	}
	
}

// Write Token


// AGENT AUTH
function AgentNotAuth() {
	console.log('Attente de récupération d\'un Token auprès de Nina ...');
	console.log(makeid(20));
	ForkApiCore("api");
	ForkApiCore("website");
}


module.exports = { FirstStart, Start }