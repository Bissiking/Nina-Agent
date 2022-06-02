$("img.start").click(function(e) {
    $('h3').html('Validation et confirmation de Nina');
    var urlcourante = document.location.href;
    var urlNina = "http://192.168.1.202:6102/new_agent"
    $.ajax({
        type: "POST",
        url: urlNina,
        data: {
            "statut": "new",
        },
        success: function(data) {
            setTimeout(() => {
                $('h3').html('Importation de la configuration dans l\'agent');
                $.ajax({
                    type: "POST",
                    url: urlcourante + "register",
                    data: data,
                    success: function(data) {
                        console.log('stop');
                        setTimeout(() => {
                            $('h3').html('Importation de la configuration dans l\'agent');
                            $.ajax({
                                type: "POST",
                                url: urlNina,
                                data: {
                                    "statut": "register",
                                    "url": urlcourante
                                },
                                success: function(data) {
                                    console.log("ok");
                                    $('h3').html('Veuillez patienter pendant la synchronisation');
                                    setTimeout(() => {
                                        $('h3').html('Redémarrage du module');
                                    }, 1000);
                                },
                                error: function(data) {
                                    console.log('error');
                                    console.log(data);
                                }
                            });
                        }, 5000);
                    },
                    error: function(data) {
                        console.log('error');
                        console.log(data);
                    }
                });
            }, 5000);
        },
        error: function(data) {
            console.log('error');
            console.log(data);
        }
    });
});