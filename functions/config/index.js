const json = require('./config.json');
const AgentMode = json.mode;
const JsonSearch = require('search-array').default

// Nina config
function AgentConfig(apps) {
    // Récupération Config
    console.log("Récupération de la configuration: " + AgentMode);
    const searcher = new JsonSearch(json.agent, {
        indice: {
            'mode': 'mode',
        }
    })
    let foundObjects = searcher.query(AgentMode);
    return dataConf = foundObjects[0];
}

module.exports = AgentConfig;