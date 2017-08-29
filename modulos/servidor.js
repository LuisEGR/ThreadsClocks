'use strict';
const net = require('net');

module.exports = class Servidor {
  constructor(puerto) {
       this.port = puerto;
   }

  start() {
    var server = net.createServer(function (conn) {
      console.log("Server: Cliente conectado");

      // Handle data from client
      conn.on("data", function(data) {
          data = JSON.parse(data);
          console.log("Response from client: %s", data.response);
      });

      // Let's response with a hello message
       conn.write(
           JSON.stringify(
               { response: "Hey there client!" }
           )
       );

    });

    server.listen(this.port, "localhost", function () {
        console.log("Server: Listening");
    });
  }
}
