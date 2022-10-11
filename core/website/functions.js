const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

function UsersName() {

	var fileName = './docs/agent-info.json';
	const result = readFile(fileName, ('utf-8'));
	console.log(result);

	// result.then(valeur => { console.log(valeur) })
	result.then(valeur => { return valeur.users + ' et truc'; });

	// if(result !== undefined){
	// 	data = JSON.stringify(result);
	// 	data = JSON.parse(data);
	// 	users = data.users;
	// }else{
	// 	users = 'Invité';
	// }



	// fs.readFile('./docs/agent-info.json', "utf8", (err, data) => {
	// 	let dataUsers, users;
	// 	dataUsers = data;
	// 	if(dataUsers !== undefined){
	// 		data = JSON.stringify(dataUsers);
	// 		data = JSON.parse(dataUsers);
	// 		users = data.users;
	// 	}else{
	// 		users = 'Invité';
	// 	}
	// });
}

module.exports = { UsersName }