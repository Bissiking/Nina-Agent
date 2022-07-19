const fs = require("fs");
const axios = require('axios');
const { Logs } = require("../logs/index");
const Mod = "Module (Data)";

function data() {
    fs.readFile('./data/agent_data/agent.json', 'utf8', function(err, data) {
        if (!err) {
            axios.post("http://192.168.1.202:6002/agent", {
                    "dataup": "dataAgent",
                    "AgentData": data
                })
                .then(function(res) {
                    Logs(Mod, 'info', 'Data Send');
                })
                .catch(function(err) {
                    Logs(Mod, 'warn', 'Connexion à Nina impossible');
                });
        } else {
            Logs(Mod, 'warn', 'Data de l\'agent non trouvé');
        }
    });
}


// START
setInterval(() => {
    data();
}, 5000); // 1 Heures - 3600000