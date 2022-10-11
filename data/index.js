const fs = require('fs');
const axios = require('axios').default;

function WriteConnCheck(val) {
    let fileConnect = "./docs/connection.json";
    let statConnect = { connect: val }
    const dataConn = JSON.stringify(statConnect);
    fs.writeFileSync(fileConnect, dataConn);
}

function ConnexionCheck() {
	axios.get('http://localhost:3001/test')
	.then(function(data) {
        if (data.data == "ok") {
            WriteConnCheck(true);
        }else{
            WriteConnCheck(false) ;
        }
	})
	.catch(function(err) {
		console.log(err);
	})
}


function NinaAuthNoID() { // Authentification auprès de Nina
    axios.post('http://localhost:3001/test')
	.then(function(data) {
        if (data.data == "ok") {
            WriteConnCheck(true);
        }else{
            WriteConnCheck(false) ;
        }
	})
	.catch(function(err) {
		console.log(err);
	})   
	
}

// Récupération de l'ID


// function ConfigNinaExtract() {
//     let fileConfigNina = "./docs/NinaConf.json";
//     connection.query('SELECT * FROM nina_core', function (error, results, fields) {
//         if (error){
//             console.log(error);
//         }else{
//             const dataConn = JSON.stringify(results[0]);
//             fs.writeFileSync(fileConfigNina, dataConn);
//         }
//       });
// }
// [DataLogs]

// function AddLogs(DataLogs) {
// 	fs.readFileSync('./docs/connection.json', function (err, data) {
//         console.log(data);
// 		console.error('[00.00.00][Data -> AddLogs][ERROR] - Impossible de récupérer l\'état de connexion à la BDD');
// 	});
//     console.log(DataLogs);
//     connection.connect(function(err) {
//         if (err){
//             console.error('[00.00.00][Data -> AddLogs][ERROR] - Connexion à la BDD impossible');
//         };
//         console.log("Connected!");
//         let sql = `INSERT INTO nina_logs(type,module,message) VALUES(?,?,?)`;
//         let todo = [DataLogs.type, DataLogs.module, DataLogs.message];
//         var req = connection.query(sql, todo, function (err, result) {
//             if (err){
//                 console.error('[00.00.00][Data -> AddLogs][ERROR] - Echec de l\'ajout du log en BDD');
//                 return true;
//             }else{
//                 return false;
//             };
//         });
//       });
// }

module.exports = { ConnexionCheck}