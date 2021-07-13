// dichiarazione variabili
var nodoImmagini;
var pulsanteAvanti;
var pulsanteIndietro;
var scambio;
var count;
var nodoTermini;
var nodoEsempiLing;
var nodoParoleIta;
var nodoParoleFra;
var nodoCambiaTesto;
var nodoAbbreviazioni;
var nodoEspansioni;
var nodoCancellature;
var nodoOriginali;
var nodoNormalizzazioni;

function gestoreLoad() {
    try {
        count = 1;
        scambio = true;
        nodoImmagini = document.getElementsByClassName("Immagini");
        pulsanteAvanti = document.getElementById("avanti");
        pulsanteIndietro = document.getElementById("indietro");
        nodoTermini = document.getElementsByClassName("TermFR");
        nodoEsempiLing = document.getElementsByClassName("MentFR");
        nodoParoleFra = document.getElementsByClassName("ParoleFra");
        nodoParoleIta = document.getElementsByClassName("ParoleIta");
        nodoCambiaTesto = document.getElementById("bottoneEdizioni");
        nodoAbbreviazioni = document.getElementsByClassName("abbreviazioni");
        nodoEspansioni = document.getElementsByClassName("espansioni");
        nodoCancellature = document.getElementsByClassName("cancellature");
        nodoOriginali = document.getElementsByClassName("originale");
        nodoNormalizzazioni = document.getElementsByClassName("normalizzazioni");
        var a = 1;
        //richiamo la funzione che nasconde le espansioni 
        Nascondi(a);
        //evento pulsanti per la gestione della galleria
        pulsanteAvanti.onclick = gestorePulsantePiu;
        pulsanteIndietro.onclick = gestorePulsanteMeno;
        //evento per modificare la visualizzazione del testo
        nodoCambiaTesto.onclick = function(e) {
                cambiaEdizione(e.target.id);

            }
            //scorro i termini e richiamo le funzioni 
        for (var i = 0; i < nodoTermini.length; i++) {
            nodoTermini[0].onmouseover = gestoreEvidenzia;
            nodoTermini[0].onmouseout = gestoreNonEvidenzia;
        }
        //scooro gli esempi linguistici e richiamo le funzioni
        for (var i = 0; i < nodoEsempiLing.length; i++) {
            nodoEsempiLing[0].onmouseover = gestoreEvidenziaEsL;
            nodoEsempiLing[0].onmouseout = gestoreNonEvidenziaEsL;
        }
        //scorro le parole francesi, associo un un id e richiamo la funzione associarosso
        for (var i = 0; i < nodoParoleFra.length; i++) {
            nodoParoleFra[i].setAttribute('id', [i]);
            nodoParoleFra[i].onmouseover = function(e) {
                gestoreAssociaRosso(e.target.id);
            }
            nodoParoleFra[i].onmouseout = gestoreDecolora;
        }
        //scorro le parole italiane, associo un un id e richiamo la funzione associarosso1
        for (var i = 0; i < nodoParoleIta.length; i++) {
            nodoParoleIta[i].setAttribute('id', [i + "b"]);
            nodoParoleIta[i].onmouseover = function(e) {
                gestoreAssociaRosso1(e.target.id);
            }
            nodoParoleIta[i].onmouseout = gestoreDecolora1;
        }
    } catch (e) {
        alert("gestoreLoad" + e);
    }
}

function Nascondi(a) {
    try {
        //scorro le parole francesi
        for (var i = 0; i < nodoParoleFra.length; i++) {
            // nel caso termini tecnici, nascondo le espansioni
            if (i == 8) {
                var Stringa = nodoParoleFra[i].innerHTML;
                //nascondo completamente l'espansione
                if (a == 1) {
                    var stringaNuova = Stringa.replace('phonétiquement', '');
                    nodoParoleFra[i].innerHTML = stringaNuova;
                    // riduco l'espansione all'abbreviazione
                } else {
                    var stringaNuova = Stringa.replace('phonétiquement', 'phonetiq.');
                    nodoParoleFra[i].innerHTML = stringaNuova;
                }
            }
            // nel caso dei termini tecnici, nascondo le espansioni
            if (i == 16) {
                var StringaM = nodoParoleFra[i].innerHTML;
                //nascondo completamente l'espansione
                if (a == 1) {
                    var stringaNuovaMorf = StringaM.replace('morphologie', '');
                    nodoParoleFra[i].innerHTML = stringaNuovaMorf;
                    // riduco l'espansione all'abbreviazione
                } else {
                    var stringaNuovaMorf = StringaM.replace('morphologie', 'morfol.');
                    nodoParoleFra[i].innerHTML = stringaNuovaMorf;
                }
            }
        }
    } catch (e) {
        alert("Nascondi" + e);
    }
}

function Mostra() {
    try {
        //scorro le parole francesi
        for (var i = 0; i < nodoParoleFra.length; i++) {
            //nel caso dei termini tecnici espando le abbreviazioni alle espansioni
            if (i == 8) {
                var Stringa = nodoParoleFra[i].innerHTML;
                var stringaNuova = Stringa.replace('phonetiq.', 'phonétiquement');
                nodoParoleFra[i].innerHTML = stringaNuova;
            }
            //nel caso dei termini tecnici espando le abbreviazioni alle espansioni
            if (i == 16) {
                var StringaM = nodoParoleFra[i].innerHTML;
                var stringaNuovaMorf = StringaM.replace('morfol.', 'morphologie');
                nodoParoleFra[i].innerHTML = stringaNuovaMorf;
            }
        }
    } catch (e) {
        alert("Mostra" + e);
    }
}
//cambia edizione del testo interpretativa - diplomatica
function cambiaEdizione(a) {
    try {
        if (a == "bottoneEdizioni") {
            // visualizzo le espansioni
            for (var i = 0; i < nodoAbbreviazioni.length; i++) {
                nodoAbbreviazioni[i].style.display = "none";
                nodoEspansioni[i].style.display = "inline-block";
            }
            //nascondo le cancellature
            for (var i = 0; i < nodoCancellature.length; i++) {
                nodoCancellature[i].style.display = "none";
            }
            //NON visualizzo le parole "Non standard"
            for (var i = 0; i < nodoOriginali.length; i++) {
                nodoOriginali[i].style.display = "none";
            }
            for (var i = 0; i < nodoNormalizzazioni.length; i++) {
                //visulizzo le normalizzazioni 
                nodoNormalizzazioni[i].style.display = "inline-block";
            }
            //cambio id al pulsante cosicche la prossima volta che sarà cliccato potrà indirizzarmi su quale parte delal funzione eseguire
            nodoCambiaTesto.setAttribute('id', "Diplomatico");
            //cambio value della funzione
            nodoCambiaTesto.value = "Passa all'edizione diplomatica";
            //richiamo funzione mostra
            Mostra();
        }
        if (a == "Diplomatico") {
            // visualizzo le abbreviazioni
            for (var i = 0; i < nodoAbbreviazioni.length; i++) {
                nodoAbbreviazioni[i].style.display = "inline-block";
                nodoEspansioni[i].style.display = "none";
            }
            //visualizzo le cancellature
            for (var i = 0; i < nodoCancellature.length; i++) {
                nodoCancellature[i].style.display = "inline-block";
                nodoCancellature[i].style.textDecoration = "line-through";
            }
            //nascondo le normalizzazioni
            for (var i = 0; i < nodoNormalizzazioni.length; i++) {
                nodoNormalizzazioni[i].style.display = "none";
            }
            // visualizzo le parole "Non standard"
            for (var i = 0; i < nodoOriginali.length; i++) {
                nodoOriginali[i].style.display = "inline-block";
            }
            nodoCambiaTesto.setAttribute('id', "bottoneEdizioni");
            nodoCambiaTesto.value = "Passa all'edizione interpretativa";
            var t = 2;
            //richiamo funzione nascondi
            Nascondi(t);
        }
    } catch (e) {
        alert("cambiaEdizione" + e);
    }
}
//associazione parolaIta a parolaFra
function gestoreAssociaRosso(a) {
    try {
        var parolaFra = document.getElementById(a);
        parolaFra.style.backgroundColor = "rgb(98, 207, 0)";
        for (var i = 0; i < nodoParoleIta.length; i++) {
            nodoParoleIta[i].setAttribute('id', [i + "a"]);
        }
        var identificatore = a + "a";
        var parolaIta = document.getElementById(identificatore);
        parolaIta.style.backgroundColor = "rgb(98, 207, 0)";



    } catch (e) {
        alert("gestoreAssociaRosso" + e);
    }
}
//associazione parolaFra a parolaIta
function gestoreAssociaRosso1(a) {
    try {
        var parolaIta = document.getElementById(a);
        parolaIta.style.backgroundColor = "rgb(98, 207, 0)";
        for (var i = 0; i < nodoParoleFra.length; i++) {
            nodoParoleFra[i].setAttribute('id', [i]);
        }
        len = a.length;
        // dal parametro a, composto da uno o più numeri e una o più lettere, tolgo le lettere tramite substring
        identificatore = a.substring(0, len - 1);
        var parolaFra = document.getElementById(identificatore);
        parolaFra.style.backgroundColor = "rgb(98, 207, 0)";



    } catch (e) {
        alert("gestoreAssociaRosso" + e);
    }
}

/*De evidenza le parole francesi e le parole italiane*/
function gestoreDecolora() {
    try {
        for (var i = 0; i < nodoParoleFra.length; i++) {
            nodoParoleFra[i].style.backgroundColor = "white";
            nodoParoleIta[i + "a"].style.backgroundColor = "white";

        }
    } catch (e) {
        alert("gestoreDecolora" + e);
    }
}

/*De evidenza le parole ita e le parole fra dopo che si toglie il mouse da esse*/
function gestoreDecolora1() {
    try {
        for (var i = 0; i < nodoParoleIta.length; i++) {
            nodoParoleIta[i].style.backgroundColor = "white";
            nodoParoleFra[i].style.backgroundColor = "white";

        }
    } catch (e) {
        alert("gestoreDecolora" + e);
    }
}



/*evidenza i termini tecnici di rosso*/
function gestoreEvidenzia() {
    try {
        for (var i = 0; i < nodoTermini.length; i++) {
            nodoTermini[i].style.backgroundColor = "red";
            nodoTermini[i].style.color = "white";

        }
    } catch (e) {
        alert("gestoreEvidenzia" + e);
    }
}
/*smette di evidenziare i termini tecnci*/
function gestoreNonEvidenzia() {
    try {
        for (var i = 0; i < nodoTermini.length; i++) {
            nodoTermini[i].style.backgroundColor = "white";
            nodoTermini[i].style.color = "black";
        }
    } catch (e) {
        alert("gestoreNonEvidenzia" + e);
    }
}
//evidenzia gli esempi linguistici
function gestoreEvidenziaEsL() {
    try {
        for (var i = 0; i < nodoEsempiLing.length; i++) {
            nodoEsempiLing[i].style.backgroundColor = "blue";
            nodoEsempiLing[i].style.color = "white";

        }
    } catch (e) {
        alert("gestoreEvidenziaEsL" + e);
    }
}
//smette di evidenziare gli esempi linguistici
function gestoreNonEvidenziaEsL() {
    try {
        for (var i = 0; i < nodoEsempiLing.length; i++) {
            nodoEsempiLing[i].style.backgroundColor = "white";
            nodoEsempiLing[i].style.color = "black";

        }
    } catch (e) {
        alert("gestoreNonEvidenziaEsL" + e);
    }
}

//scorre a dx la galleria
function gestorePulsantePiu() {
    try {
        var n = 1;
        if (scambio) {
            mostraSlide(count += n);
        }
    } catch (e) {
        alert("gestorePulsantePiu" + e);
    }
}
//scorre a sx la galleria
function gestorePulsanteMeno() {
    try {
        var n = -1;
        if (scambio) {
            mostraSlide(count += n);
        }
    } catch (e) {
        alert("gestorePulsanteMeno" + e);
    }
}
//funzione galleria
function mostraSlide(n) {
    try {
        if (n > nodoImmagini.length) {
            count = 1;
        }
        if (n < 1) {
            count = nodoImmagini.length;
        }
        for (var i = 0; i < nodoImmagini.length; i++) {
            nodoImmagini[i].style.display = "none";
        }
        nodoImmagini[count - 1].style.display = "block";
    } catch (e) {
        alert("mostraSlide" + e);
    }
}
window.onload = gestoreLoad;