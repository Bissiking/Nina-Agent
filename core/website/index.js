const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const WebsiteConfig = require('./config.json');
const {UsersName} = require('./functions');
const fs = require('fs');

var public = path.join(__dirname, 'public');
var update = path.join(__dirname, 'update');

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// AXIOS
const axios = require("axios");
const { users } = require('node-os-utils');
// Variables
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// ROUTE
app.use('/', express.static(public));
app.use('/update', express.static(update));
app.get('/', function(req, res) {
	var AgentData = {};
	if(fs.existsSync("./docs/agent_data.json")){
		var AgentData = require('../../docs/agent_data.json');
	}
	const configWebsite = require('./config.json');
	const AgentVersion = require('../../agent.json');
	
	if (AgentData.name_agent == undefined || AgentData.name_agent  == null || AgentData.name_agent == "") {
		AgentData.name_agent = 'Invité';
	}
	if (AgentData.token == undefined || AgentData.token  == null || AgentData.token == "") {
		AgentData.token = null;
	}
	if (AgentData.id_agent == undefined || AgentData.id_agent  == null || AgentData.id_agent == "") {
		AgentData.id_agent = null;
	}
	let options = {
		title: "Dashboard",
		user: AgentData.name_agent,
		tokenAgent: AgentData.token,
		id_agent: AgentData.id_agent,
		websiteName: configWebsite.name,
		websiteDescription: configWebsite.description,
		websiteVersion: configWebsite.version,
		websiteBuild: configWebsite.build,
		AgentVersion: AgentVersion.version
	}
	res.render('main', options);
});

app.get('/count-module-installed', function(req, res) {
	const dir = './docs/fork_data';
	// Listing des modules
	fs.readdir(dir, (err, files) => {
		console.log(err);
		console.log(files);
		let countDATA = Object.keys(files).length;
		console.log(countDATA);
		// Récupération du status du module
		// fs.readFile(dir+'', "utf8", (err, data) => {
		//     data = JSON.stringify(data);
		//     data = JSON.parse(data);
		//     if(!err){
		//         if (data.id_agent == true) {
		//             // Si l'agent a un ID
		//         }else{
		//             // Si l'agent n'a pas d'ID
		//             AgentNotAuth();
		//         }
		//     }else{
		//         console.warn('ok_docker.json introuvable ...');
		//         setTimeout(() => {
		//             console.error('Arrêt de l\'agent. Une erreur fatale s\'est produite.');
		//             process.exit(1);
		//         }, 5000);
		//     }
		// })
		res.json(countDATA);
	});
});

app.post('/api-clone', function(req, res) {
	const { CloneAPI } = require('./update');
	CloneAPI();
	setTimeout(function() {
		res.send('installed');
	})
});

app.post('/add-agent-config', function(req, res) {

	var agent_data = req.body.data;
	const datainfoJSON = JSON.stringify(agent_data);
	const datainfoObject = JSON.parse(datainfoJSON);
	const datainfoObject2 = JSON.parse(datainfoObject);
	// Ecriture du fichier
	fs.writeFileSync("./docs/agent_data.json", datainfoObject);

	setTimeout(() => {
		if(fs.existsSync("./docs/agent_data.json")){
			res.send('succes');
		}else{
			res.send('error');
		}

	}, 500);
});

// Start server WEB
server.listen(WebsiteConfig.port, () => {
	console.log('HTTP:' + WebsiteConfig.port);
});