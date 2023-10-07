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
		arretRadio : function() {
			stationRadio ("arretRadio", data, client);
					}					
	};
	

	function stationRadio (radio, data, client) {

		if (radio === "franceInfo") {
			Avatar.play('%URL%http://icecast.radiofrance.fr/franceinfo-hifi.aac', data.client);
		}
		if (radio === "nostalgie") {
			Avatar.play('%URL%https://f5-pa6.nrjaudio.fm/fr/30601/mp3_128.mp3?origine=fluxradios&cdn_path=adswizz_lbs10&access_token=be914175275a4ffa80a42a967f924ccf', data.client);
		}
		if (radio === "abcLounge") {
			Avatar.play('%URL%https://streamingv2.shoutcast.com/JamendoLounge', data.client);
		}
		if (radio === "arretRadio") {
			Avatar.speak("J'arréte la radio", data.client, () => {
					 Avatar.Speech.end(data.client, true, () => {
						 Avatar.stop(null, data.client);
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