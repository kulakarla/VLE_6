(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            let amPm = h >= 12 ? 'PM' : 'AM';

            h = h % 12;
            h = h ? h : 12; // Adjust 0 to 12

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + amPm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            let hind = 0;

            switch(linn.value) {
                case "tln":
                    hind = 0;
                    break;
                case "trt":
                    hind = 2.5;
                    break;
                case "nrv":
                    hind = 2.5
                    break;
                case "prn":
                    hind = 3
                    break;
                default:
                    break;
            } 

            let kingitus = document.getElementById("v1");
            let kontaktivaba = document.getElementById("v2");
            

            kingitus.checked ? hind += 5 : undefined;
            kontaktivaba.checked ? hind += 1 : undefined;


            let validateForm = validateForms();

            if(!validateForm){
                alert("Palun sisesta korrektne nimi, vali linn ning pakenditüüp")
                e.innerHTML = "XXX &euro;";
                return;
            }
            


            
            e.innerHTML = hind + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

function hasNumber(myString) {
    return /\d/.test(myString);
}

function validateForms(){
    let eesnimi = document.getElementById("fname");
    let perenimi = document.getElementById("lname");

    
    if(hasNumber(eesnimi.value) || hasNumber(perenimi.value) || eesnimi.value.length < 1 || perenimi.value.length < 1 ){
        return false;
    }

    let linn = document.getElementById("linn");

    if(linn.value === ""){
        return false;
    } 

    let kilepakk = document.getElementById("kilepakk");
    let pappkast = document.getElementById("pappkast");
    let kinkekott = document.getElementById("kinkekott");


    if(!kilepakk.checked && !pappkast.checked && !kinkekott.checked){
        return false;
    }

    return true;
}

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

let infobox;

function GetMap() {
    
    "use strict";

    let tartuUlikool = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
    );

    let centerPoint = new Microsoft.Maps.Location(
        58.272791411476035, 
        26.500366733495916
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let tartuKool = new Microsoft.Maps.Pushpin(tartuUlikool, {
        title: 'Tartu Ülikool',
            //description: 'Tartu Ülikool on parim kõrgharidusasutus Eestimaal'
    });

    tartuKool.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikool on parim kõrgharidusasutus Eestimaal'
    }


    let ronguKonsumKordinaadid = new Microsoft.Maps.Location(
        58.14377334856016, 
        26.249094741721226
    );

    let ronguKonsum = new Microsoft.Maps.Pushpin(ronguKonsumKordinaadid, {
        title: 'Rõngu Konsum',
        //description: 'Rõngu konsum on väga kõva pood'
    });

    ronguKonsum.metadata = {
        title: 'Rõngu Konsum',
        description: 'Rõngu Konsum on suurepärase kaubavaliku toidupood Rõngus.'
    };





    //INFOBOX
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox.setMap(map);

    Microsoft.Maps.Events.addHandler(tartuKool, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(ronguKonsum, 'click', pushpinClicked);



    map.entities.push(tartuKool);
    map.entities.push(ronguKonsum);

}

function pushpinClicked(e) {
    console.log("PUSHPINCLICK")
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

