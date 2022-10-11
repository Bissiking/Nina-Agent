const button = document.querySelector('#btn-notif');
const divNotif = document.querySelector('#block-notif');

const activeBtn = document.querySelector('#token-Send');
const button2 = document.querySelector('#btn-notif');

// FUNCTION
function changeid (oldid, newId)
{
	var e = document.getElementById(oldid);
	e.id = newId;
}

button.addEventListener('click', event => {
	let hidden = divNotif.classList.contains('hidden');
	if (hidden == false) {
		divNotif.classList.add("hidden");
	} else {
		divNotif.classList.remove("hidden");
	}
});

activeBtn.addEventListener('click', event => {
	let hidden = activeBtn.classList.contains('hidden');
	let Version = activeBtn.getAttribute('data-version');
	// console.log(Version);
	if (hidden == false) {
		divNotif.classList.add("hidden");
		document.getElementById("token-Send").innerHTML = "Synchronisation avec Nina ...";
		let token_agent = document.getElementById("token_agent").value;
		changeid('token-Send','token-wait');
		setTimeout(() => {
			axios.post('http://192.168.1.201:3000/agent-auth', {
				token: token_agent,
				versionAgent: Version
			})
			.then(function (response) {
				data = JSON.stringify(response.data);
				data = JSON.parse(data);
				// Ecriture de la data
				axios.post('/add-agent-config', {data})
				.then(function (response) {
					console.log(response);
					if (response.data == 'succes'){
						document.getElementById("token-wait").innerHTML = "Synchronisation terminé. Redémarrage nécessaire";
					}else{
						document.getElementById("token-wait").innerHTML = "Echec de la synchronisation";
					}

				})
				.catch(function (error) {
					console.log('ERROR : '+error);
					document.getElementById("token-wait").innerHTML = "Echec de la synchronisation avec Nina";
				}); 

			})
			.catch(function (error) {
				console.log('ERROR : '+error);
				document.getElementById("token-wait").innerHTML = "Echec de la synchronisation avec Nina";
			});           
		}, 1000)
	}
});
