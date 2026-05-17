const socket = io();

const distanceText = document.getElementById('distance');
const bar = document.getElementById('bar');
const statusText = document.getElementById('status');

socket.on('nuevaDistancia', (data) => {

    let distancia = parseFloat(data.distancia);

    distanceText.innerHTML = distancia.toFixed(1) + " cm";

    let porcentaje = 100 - ((distancia / 100) * 100);

    if(porcentaje < 0) porcentaje = 0;
    if(porcentaje > 100) porcentaje = 100;

    bar.style.width = porcentaje + "%";

    if(distancia <= 10){

        bar.style.background = "#ef4444";
        statusText.innerHTML = "⚠️ MUY CERCA";

    }else if(distancia <= 30){

        bar.style.background = "#f59e0b";
        statusText.innerHTML = "🟡 PRECAUCIÓN";

    }else{

        bar.style.background = "#22c55e";
        statusText.innerHTML = "✅ DISTANCIA SEGURA";

    }

});
