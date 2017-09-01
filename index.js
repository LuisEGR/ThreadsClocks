const cluster = require('cluster');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const moment = require('moment');

const Reloj = require('./modulos/reloj.class.js');



var relojes = [moment(),moment(),moment(),moment()];


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Crear 4 subprocesos.
  for (let i = 0; i < 4; i++) {
    var worker = cluster.fork();
    worker.on('message', function(msg) {
      relojes[msg.workerId] = msg.time;
    });
  }


  // Queda a la escucha de nuevas conexiones
  io.sockets.on('connect', function (socket) {
      console.log("Vista conectada, Socket ID: " + socket.id);

      // En cuanto reciba un evento "newTime", que corresponde al cambiar la hora
      // Se envía un mensaje "Update" al worker correspondiente
      socket.on('newTime', function (reloj) {
          console.log("El reloj " + reloj.id + "pide un cambio a " + reloj.time);
          cluster.workers[reloj.id + 1].send({
            type: 'update',
            newTime: reloj.time
          })
      });

      // A cada segundo se envía el arreglo de relojes a la vista
      setInterval(function(){
          socket.emit('updateTime', relojes);
      }, 1000);
  });

  //Servidor http con el que se conectará la vista
  server.listen(3000,function(){
      // console.log("Servidor iniciado!");
  });



} else {
  console.log(process.pid + " Soy el worker: ", cluster.worker.id - 1);
  // Cada proceso hijo se encarga de procesar 1 reloj
  var workerId = cluster.worker.id - 1;
  var reloj = new Reloj();
  reloj.start(process, workerId);
}
