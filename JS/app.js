window.addEventListener('load', ()=> {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturadescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-Animado')

    let vientoVelocidad = document.getElementById('viento-Velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
        // console.log(posicion)
        lon = posicion.coords.longitude
        lat = posicion.coords.latitude
        
        //Ubicacion actual
        //const url  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={8673ecf85a61f25a00745d95979c4c04}`

        //UbicacionPorCiudad
        const url = `https://api.openweathermap.org/data/2.5/weather?q=bogota&lang=es&units=metrisc&appid=8673ecf85a61f25a00745d95979c4c04`
            //console.log(url)

            //Peticiones a la API
        fetch(url)
        .then( Response => { return Response.json() })
        .then( data =>  {

            //Mostar Temperatura
            
            console.log(data.main.temp)// mostrar datos 
            let temp = Math.round(data.main.temp)
            temperaturaValor.textContent = `${temp} °C` 


            //Mostrar estado del clima

            let desc = data.weather[0].description
            temperaturadescripcion.textContent = desc.toUpperCase()


            //Mostrar Ubicacion de La Ciudad

            ubicacion.textContent = data.name 
        
            //Mostrar Velocidad
            vientoVelocidad.textContent = `${data.wind.speed} m/s`
            //console.log(data.wind.speed)

                /*Para iconos estaticos
                console.log(data.weather[0].icon)
                let iconCode = data.weather[0].icon
                const urlIcono = `https://openweathermap.org/img/wn/${iconCode}.png`
                console.log(urlIcono) */

            //Para Iconos Animados
            console.log(data.weather[0].main)
            switch(data.weather[0].main){
            case 'Thunderstrom':
                iconoAnimado.src ='Icons/animated/thunder.svg'
                console.log('TORMENTA');
                break;
            case 'Drizzle':
                iconoAnimado.src = 'Icons/animated/rainy-7.svg'
                console.log('LLOVIZNA');
                break;
            case 'Rain':
                iconoAnimado.src = 'Icons/animated/rainy-7.svg'
                console.log('LLUVIA');
                break;
            case 'Snow':
                iconoAnimado.src = 'Icons/animated/snowy.svg'
                console.log('NIEVE');
                break;
            case 'clear':
                iconoAnimado.src = 'Icons/animated/day.svg'
                console.log('LIMPIO');
                break;
            case 'Atmosphere':
                iconoAnimado.src = 'Icons/animated/weather.svg'
                console.log('ATMOSFERA');
                break;
            case 'Clouds':
                iconoAnimado.src = 'Icons/animated/cloudy-day-1.svg'
                console.log('NUBES');
                break;
            }
        })
        .catch( error => {
            console.log(error) // por si sale algun error 
        })
    })

    }
})