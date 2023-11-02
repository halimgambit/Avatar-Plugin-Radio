exports.action = function(data, callback){
	var tblCommand = {
		franceInfo : function() {
			stationRadio ("franceInfo", data, client);
					},
		nostalgie : function() {
			stationRadio ("nostalgie", data, client);
					},
		abcLounge : function() {
			stationRadio ("abcLounge", data, client);
					},
		europe1 : function() {
			stationRadio ("europe1", data, client);
					},				
		arretRadio : function() {
			stationRadio ("arretRadio", data, client);
					}					
	};
	

	function stationRadio (radio, data, client) {

		if (radio === "franceInfo") {
			Avatar.play(`%URL%${'http://icecast.radiofrance.fr/franceinfo-hifi.aac'}`, client);
		}
		else if (radio === "nostalgie") {
			Avatar.play(`%URL%${'https://f5-pa6.nrjaudio.fm/fr/30601/mp3_128.mp3?origine=fluxradios&cdn_path=adswizz_lbs10&access_token=be914175275a4ffa80a42a967f924ccf'}`, client);
		}
		else if (radio === "abcLounge") {
			Avatar.play(`%URL%${'https://streamingv2.shoutcast.com/JamendoLounge'}`, client);
		}
		else if (radio === "europe1") {
			Avatar.play(`%URL%${'http://stream.europe1.fr/europe1.mp3'}`, client);
		}
		else if (radio === "arretRadio") {
			Avatar.speak("J'arréte la radio", data.client, () => {
			Avatar.Speech.end(data.client, true, () => {
			Avatar.stop(null, client);
			});
		});
		}
		
	}


	let client = setClient(data);
	info("Radio:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}


function setClient(data){
    var client = data.client;
    if (data.action.room)
    client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
    client = data.action.setRoom;
    return client;
}
