var urlAPI = "192.168.1.202:6200";
var urlAPIBis = "annabelle.mhemery.com:6100";

// FONCTION
function sysUse(system, urlAPI) {
    $.ajax({
        type: "GET",
        url: "http://" + urlAPI + "/api/" + system + "-use",
        cache: false,
        success: function(data) {

            switch (system) {
                case "cpu":
                    var cpuJauge = new JustGage({
                        id: system,
                        value: data,
                        min: 0,
                        max: 100,
                    });
                    // BOUCLE
                    setInterval(() => {
                        $.ajax({
                            type: "GET",
                            url: "http://" + urlAPI + "/api/" + system + "-use",
                            cache: false,
                            success: function(data) {
                                cpuJauge.refresh(data);
                            },
                            error: function(data) {
                                cpuJauge.refresh("0");
                            }
                        });
                    }, 2500);

                    break;

                case "ram":
                    var ramJauge = new JustGage({
                        id: system,
                        value: data.usedMemPercentage,
                        min: 0,
                        max: 100,
                    });
                    // BOUCLE
                    setInterval(() => {
                        $.ajax({
                            type: "GET",
                            url: "http://" + urlAPI + "/api/" + system + "-use",
                            cache: false,
                            success: function(data) {
                                ramJauge.refresh(data.usedMemPercentage);
                            },
                            error: function(data) {
                                ramJauge.refresh("0");
                            }
                        });
                    }, 2500);
                    break;

                case "disk":
                    var diskJauge = new JustGage({
                        id: system,
                        value: data.usedPercentage,
                        min: 0,
                        max: 100,
                    });
                    // BOUCLE
                    setInterval(() => {
                        $.ajax({
                            type: "GET",
                            url: "http://" + urlAPI + "/api/" + system + "-use",
                            cache: false,
                            success: function(data) {
                                diskJauge.refresh(data.usedPercentage);
                            },
                            error: function(data) {
                                diskJauge.refresh("0");
                            }
                        });
                    }, 2500);
                    break;

                default:
                    break;
            }
        },
        error: function(data) {
            console.log('ERROR');
        },
    });

}


function sysdata(url, datasys) {
    $.ajax({
        type: "GET",
        url: "http://" + url + "/api/" + datasys + "-use",
        cache: false,
        success: function(data) {
            setInterval(function() {
                cpuJauge.refresh();
            }, 2500);
        },
        error: function(data) {
            console.log('ERROR');
        },
    });
}



// CPU & RAM & DISK
sysUse("cpu", urlAPI);
sysUse("ram", urlAPI);
sysUse("disk", urlAPIBis);

// NETWORK

$.ajax({
    type: "GET",
    url: "http://annabelle.mhemery.com:6100/api/net-use",
    cache: false,
    success: function(data) {
        console.log(data[1]);
    },
    error: function(data) {
        console.log('ERROR');
    },
});