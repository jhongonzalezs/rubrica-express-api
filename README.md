# rubrica-express-api
Esto contiene la API REST de personajes de OnePiece.

Deployment: https://api-onepiece-6m7v.onrender.com/
Swaggger: https://api-onepiece-6m7v.onrender.com/api-docs/
Obtiene todos los personajes: https://api-onepiece-6m7v.onrender.com/api/items

Instale el paquete en su pc: git clone https://github.com/jhongonzalezs/rubrica-express-api.git
instale todos los paquetes: npm install
Ejecute en la terminal: node app.js

Una vez le apareceran dos routes:
1. Server running on http://localhost:3000/api/items  --> Aqui se muestra todos los items que tiene actualmente la API en MongoBd sin embargo al estar cifrada por JWT no aparecera nada, solamente el mensaje: Token Requerido.
2. Server DocSwagger on http://localhost:3000/api-docs/  --> Aqui encontrara la forma correcta de usar la API, ya sea para (Insertar, Actualizar, Borrar, Mostrar)


##Como usar las rutas JWT:
1. Ingrese a Postman
2. Coloca POST y agrega http://localhost:3000/api/login y en el apartado de body, raw coloque un archivo json de esta forma con estos datos: {"user": "admin", "password": "1234"} --> Esto creara un Token que se usara para dar acceso a toda la API
3. Despues de crear el token lo copiara y cambiara la ruta a GET http://localhost:3000/api/items se ira a la parte de Header donde en key colocara: Authorization y en value: Bearer su_token, una vez colocado eso, le da en enviar y le debe dar acceso a toda la API
4. Si quiere agregar un items coloca la ruta http://localhost:3000/api/items con POST que es para enviar y agrega la informacion en formato JSON: en Body, Raw:
   {
        "id": 1,
        "image": "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20240306200817",
        "name": "Monkey D. Luffy",
        "nickname": "Sombrero de Paja",
        "age": "19 años",
        "crew": "Piratas de Sombrero de Paja",
        "rank": "Capitán",
        "currentBounty": "3.000.000.000"
   }
5. Y asi sucesivamente con todas las rutas teniendo en cuenta la documentacion de swagger
6. Si decea buscar un nombre que se encuentra seapara lo busca de la siguiente forma: http://localhost:3000/api/items/name/Nico%20Robin y si es un solo nombre es http://localhost:3000/api/items/name/Franky



##Validar WebSocket:
1. Primero recuerde que debe estar corriendo node app.js
2. Despues que este corriendo Ejecute el archivo node client.js en una consola diferente




#Nota:
Recuerda que  estos ejemplos son usando: http://localhost:3000/api/login en forma local de tu pc pero tambien lo puedes hacer de forma online usando el siguiente enlace:  https://api-onepiece-6m7v.onrender.com cabe recordar que funciona igual que el otro, solamente ahi que agregar el https://api-onepiece-6m7v.onrender.com/api/login para obtener el toker y validar
