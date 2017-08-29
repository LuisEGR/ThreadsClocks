var Servidor = require("./servidor.js");
var Cliente = require("./cliente.js");

var miServer = new Servidor(9999);
miServer.start();
// servidor.start(9999);
// cliente.conectar("localhost", 9999);
var miCiente = new Cliente();
miCiente.conectar("localhost", 9999);

var miCiente2 = new Cliente();
miCiente2.conectar("localhost", 9999);
