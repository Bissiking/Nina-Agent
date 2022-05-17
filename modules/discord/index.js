require('dotenv').config();

const NinaConfig = require('../../functions/config/index');
NinaConfig();

// VARIABLES / CONST du .ENV
const token = data.token.discord
const URL_ZENVENT = process.env.URL_ZENVENT
    // CONST
const Discord = require('discord.js');
// const { getVoiceConnection } = require('@discordjs/voice');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
// AXIOS
const axios = require('axios');
// JSON SEARCH
const JsonSearch = require('search-array').default
    // Variables
var prefix = "+";

// Rapport de fonctionnement dans discord
client.once("ready", function() {
    // Information console
    console.log(`Connecté au serveur ! ||  ${client.user.tag}!`);

    // MSG EMBED
    var channel = client.channels.cache.get("960932493882687548")
        // client.channels.cache.get("960932493882687548").channel.send(exampleEmbed);
    const Embed = new Discord.MessageEmbed()
        .setColor('#69D02E')
        .setTitle('Nina is back !')
        .setDescription('Je suis opérationnel sur discord')
        .setTimestamp()

    channel.send({ embeds: [Embed] });
});

// COMMANDE

// ZEVENT

async function fetchRequest(urlParam) {

    return axios({
            url: urlParam,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.data)
        .catch(err => console.error(err))
}

client.on('messageCreate', msg => {
    // PREFIX
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'zevent') {
        let arg1 = args[0];
        if (msg.author.bot) return;
        fetchRequest(URL_ZENVENT).then(res => {

            const searcher = new JsonSearch(res.live, {
                indice: {
                    'display': 'display', // search the `title`
                    'twitch': 'twitch' // search the `author` but it's renamed as `name` in queries
                }
            })
            let foundObjects = searcher.query(arg1);
            console.log(foundObjects)
            let data = foundObjects[0];
            msg.channel.send(data.display + ' a récolté ' + data.donationGoal.donationAmount.formatted + ' sur sa cagnotte !! Et est actuellement suivi par ' + data.viewersAmount.formatted + ' viewers !!')
        })

    }
});

// client.on('interactionCreate', interaction => {
//     if (interaction.isSelectMenu()) {
//         if (interaction.customId == "select") {
//             console.log(interaction.values);


//         }
//     }
// });










client.on('messageCreate', msg => {
    // PREFIX
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'etat') {
        let arg1 = args[0];
        let arg2 = args[1];
        msg.channel.send('Opérationnel');
        console.log(command + '|| ARGS = ' + arg1 + ' || ' + arg2);
    }
});

client.on('messageCreate', msg => {
    if (msg.content === 'update' || msg.content === 'mettre a jour' || msg.content === 'mettre à jour') {
        msg.channel.send('Mise à jour indisponible');
    }
});

client.on('messageCreate', msg => {
    if (msg.content === 'stop' || msg.content === 'STOP' || msg.content === 'reboot' || msg.content === 'REBOOT') {
        // MSG EMBED
        var channel = client.channels.cache.get("960932493882687548")
            // client.channels.cache.get("960932493882687548").channel.send(exampleEmbed);
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#8a2019')
            .setTitle('Arrêt du module discord de Nina !')
            .setDescription('Module arrêté manuellement. Aucune interaction avec Nina sera possible avant 10 Secondes via discord.')
            .setTimestamp()

        channel.send({ embeds: [exampleEmbed] });

        // Kill Process
        setTimeout(function() {
            process.exit()
        }, 2000);
    }
});

// COMMANDE de START serveur minecraft
// client.on('messageCreate', msg => {
//     if (msg.content === 'minestart') {
//         msg.channel.send('Lancement du serveur minecraft');
//         // VARIABLES
//         var url = data.link.agent + "/start";
//         var request = require('request');
//         request.get(url, { timeout: 30000, json: false }, function(error, result) {
//             console.log(url);
//         });
//     }
// });

// COMMANDE de START serveur minecraft
client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'stivi') {
        let arg1 = args[1];
        let arg2 = args[0];
        // VARIABLES
        if (arg1 === null ||
            arg2 === null ||
            arg1 === undefined ||
            arg2 === undefined ||
            arg1 === '' ||
            arg2 === '') {
            msg.channel.send('Commande non complète');
        } else {
            var url = data.link.agent + "/containers";
            var request = require('request');
            var options = {
                uri: url,
                method: 'POST',
                json: {
                    "name": arg1,
                    "command": arg2
                }
            };
            request(options, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    msg.channel.send(body) // Print the shortened url.
                } else {
                    msg.channel.send(body);
                }
            });
        }
    }
});


// ARRÉT SERVICES ------------------------------------------------------------------------------------------


// Arrêt du serveur HTTP
client.on('messageCreate', msg => {
    if (msg.content === 'httpstop') {
        // MSG EMBED
        var channel = client.channels.cache.get("960932493882687548")
            // client.channels.cache.get("960932493882687548").channel.send(exampleEmbed);
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#8a2019')
            .setTitle('Arrêt du module HTTP de Nina !')
            .setDescription('Module arrêté manuellement. Mise hors service du mode HTTP')
            .setTimestamp()

        channel.send({ embeds: [exampleEmbed] });

        // Kill Process
        setTimeout(function() {
            'use strict';
            const fs = require('fs');
            let rawdata = fs.readFileSync("./data/http_child.json");
            let httpmodule = JSON.parse(rawdata);
            console.log(httpmodule.node_number);

            process.kill(httpmodule.node_number);
        }, 1000);
    }
});

// Arrêt de l'API
client.on('messageCreate', msg => {
    if (msg.content === 'apistop') {
        // MSG EMBED
        var channel = client.channels.cache.get("960932493882687548")
            // client.channels.cache.get("960932493882687548").channel.send(exampleEmbed);
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#8a2019')
            .setTitle('Arrêt du module HTTP de Nina !')
            .setDescription('Module arrêté manuellement. Mise hors service du mode HTTP')
            .setTimestamp()

        channel.send({ embeds: [exampleEmbed] });

        // Kill Process
        setTimeout(function() {
            'use strict';
            const fs = require('fs');
            let rawdata = fs.readFileSync("./data/api_child.json");
            let httpmodule = JSON.parse(rawdata);
            console.log(httpmodule.node_number);

            process.kill(httpmodule.node_number);
        }, 1000);
    }
});


// CONNEXION + Rish Présence
client.login(token).then(() => {
    client.user.setPresence({ activities: [{ name: 'Nina - ' + data.build, type: 'STREAMING', url: 'https://www.youtube.com/watch?v=sq71SaKxsSg' }], status: 'online' });
});