'use strict';
const net = require("net");

module.exports = class Cliente {
  constructor(){
    this.socket = new net.Socket();
  };

  conectar(servidor, puerto){
    // socket = new net.Socket();
    var socket = this.socket;
    socket.connect(puerto, servidor, function () {
        console.log("Client: Connected to server");
    });

    // Let's handle the data we get from the server
    socket.on("data", function (data) {
        data = JSON.parse(data);
        console.log("Response from server: %s", data.response);
        // Respond back
        socket.write(JSON.stringify({ response: "Hey there server!" }));
        // Close the connection
        socket.end();
    });
  }

}
