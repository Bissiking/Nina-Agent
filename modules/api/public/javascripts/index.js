var lastcpu = 0,
    lastram = 0,
    lastdisk = 0;
var urlAPI = "enerzein.fr";
var urlAPIBis = "annabelle.mhemery.com";

function cpuUse(system) {
    $.ajax({
        type: "GET",
        url: "http://" + urlAPI + ":6100/api/" + system + "-use",
        cache: false,
        success: function(data) {
            let cpuNoVirg = Math.trunc(data);
            animatedArc(system, lastcpu, cpuNoVirg);
            lastcpu = cpuNoVirg;
        },
        error: function(data) {
            console.log('ERROR');
        },
    });
}

function ramUse(system) {
    $.ajax({
        type: "GET",
        url: "http://" + urlAPI + ":6100/api/" + system + "-use",
        cache: false,
        success: function(data) {
            let ramNoVirg = Math.trunc(data);
            animatedArc(system, lastram, ramNoVirg);
            lastram = ramNoVirg;
        },
        error: function(data) {
            console.log('ERROR');
        },
    });
}

function diskUse(system) {
    $.ajax({
        type: "GET",
        url: "http://" + urlAPI + ":6100/api/" + system + "-use",
        cache: false,
        success: function(data) {
            animatedArc(system, lastdisk, data);
            lastdisk = data;
        },
        error: function(data) {
            console.log('ERROR');
        },
    });
}

// Fisrt Start
cpuUse("cpu");
ramUse("ram");
diskUse("disk");

// BOUCLE
setInterval(() => {
    cpuUse("cpu");
    ramUse("ram");
    diskUse("disk");
}, 2500);


// JS ANIM ET CAVNAS


/**
 * Dessine un arc de cercle proportionnel au pourcentage pct dans le canvas d'identifiant id
 * @param id string l'identifiant du canvas
 * @param pct float le pourcentage
 * */
function drawCanvasArc(id, pct) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

    //je calcule la fin de mon arc en radian
    var start = Math.PI;
    var end = pct * Math.PI / 100 + start;

    //on supprime le dessin précédent
    context.clearRect(0, 0, canvas.width, canvas.height);

    //on commence une ligne
    context.beginPath();
    //l'épaisseur de la ligne
    context.lineWidth = 14;
    //La couleur de la ligne
    context.strokeStyle = '#83f954';
    if (pct < 50) {
        context.strokeStyle = '#83f954';
        context.fillStyle = "#000000";
    } else if (pct < 90) {
        context.strokeStyle = 'orange';
        context.fillStyle = "#000000";
    } else {
        context.strokeStyle = 'red';
        context.fillStyle = "#000000";

    }
    //Définition de l'arc de cercle
    //- l'abcisse du centre : 100
    //- l'ordonnée du centre : 100
    //- le rayon de l'arc : 70
    //- l'angle de départ (en radian) : start
    //- l'angle final : end
    //- le sens de rotation : false (aiguille d'une montre)
    context.arc(100, 100, 70, start, end, false);
    // Dessine la ligne
    context.stroke();

    // Définit le style de police de caractère, l'alignement et la couleur
    context.font = "bold 30px Arial";
    context.textAlign = "center";
    // Ecrit pct +" %" à la position (100, 100)
    context.fillText(pct + " %", 100, 100);
}

/**
 * Anime l'affichage de l'arc de cercle
 * @param id string l'identifiant du canvas
 * @param currentpct float le pourcentage courant à afficher au moment t
 * @param pct float le pourcentage final à afficher
 */
/**
 * Anime l'affichage de l'arc de cercle
 * @param id string l'identifiant du canvas
 * @param currentpct float le pourcentage courant à afficher au moment t
 * @param pct float le pourcentage final à afficher
 */
function animatedArc(id, currentpct, pct) {
    //le processus se termine quand currentpct a atteind pct
    if (currentpct <= pct) {
        // On dessine l'arc courant avec la fonction définie au paragraphe précédent
        drawCanvasArc(id, currentpct);
        // On passe au pourcentage suivant
        setTimeout(function() {
            animatedArc(id, currentpct + 1, pct);
        }, 25)
    }
}