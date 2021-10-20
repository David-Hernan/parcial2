const platillos = [
    {nombre: "sopes", descripcion: "Tortilla, frijol, queso, salsa, pollo"},
    {nombre: "chilaquiles", descripcion: "Tortilla, salsa, frijol, queso, pollo"},
    {nombre: "tacos", descripcion: "Tortilla, carne, salsa"},
    {nombre: "pambazo", descripcion: "Bolillo con carne remojado en salsa"}
];

const requestHandler = (request, response) => {
    console.log(request.url);

    //Reaccionar de acuerdo a la ruta
    if (request.url === "/hola") {
        response.setHeader('Content-Type', 'text/html');
        response.write('<head><meta charset="UTF-8"></head>');
        response.write('<h1>¡Hola mundo!</h1>');
        response.end();
    } else if (request.url === "/menu") {
        //Mostrar la lista de platillos
        response.setHeader('Content-Type', 'text/html');
        response.write('<head><meta charset="UTF-8"></head>');
        response.write('<h1>Menú</h1>');
        response.write('<ul>');
        for (let platillo of platillos) {
            response.write('<li>' + platillo.nombre + ": " + platillo.descripcion + "</li>");
        }
        response.write("</ul>");
        response.write('<a href="/menu/add">Agregar platillo</a>');
        response.end();
    } else if (request.url === "/menu/add" && request.method === "GET") {
        console.log(request.method);
        //Agregar un platillo a la lista
        response.setHeader('Content-Type', 'text/html');
        response.write('<head><meta charset="UTF-8"></head>');
        response.write('<h1>Agregar platillo al menú</h1>');
        response.write('<form action="/menu/add" method="POST">');
        response.write('<label for="nombre">Nombre de platillo: </label>');
        response.write('<input type="text" id="nombre" name="nombre" placeholder="tacos" required>');
        response.write('<br/>');
        response.write('<br/>');
        response.write('<label for="descripcion">Descripción del platillo: </label>');
        response.write('<input type="text" id="descripcion" name="descripcion" placeholder="Este platillo es delicioso, lleva...">');
        response.write('<br/>');
        response.write('<br/>');
        response.write('<input type="submit" id="enviar" name="enviar" value="Enviar">');
        response.write('</form>');
        response.end();
    } else if (request.url === "/menu/add" && request.method === "POST") {
        console.log(request.method);
        
        const datos = [];

        //Recibir datos del cliente
        request.on('data', (dato) => {
            //console.log(dato);
            datos.push(dato);
        });
        
        //Procesar los datos del cliente
        return request.on('end', () => {
            const datos_completos = Buffer.concat(datos).toString();
            console.log(datos);
            console.log(datos_completos);
            const nombre = datos_completos.split('=')[1].split('&')[0];
            const descripcion = datos_completos.split('=')[2].split('&')[0];
            console.log(nombre);
            console.log(descripcion);
            
            //Agregar el nuevo platillo
            platillos.push({nombre: nombre, descripcion: descripcion});

            //Redireccionar hacia /menu
            response.statusCode = 302;
            response.setHeader('Location', '/menu');
            response.end();
        });

    }  else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write('<head><meta charset="UTF-8"></head>');
        response.write('<h1>Esta página no existe...</h1>');
        response.end();
    }
}

//Exportar la variable
module.exports = requestHandler;