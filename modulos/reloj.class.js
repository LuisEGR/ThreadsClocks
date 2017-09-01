var moment = require('moment');
module.exports = class Reloj{
  constructor(startTime){
    this.time = moment(startTime);
  }

  start(process, workerId, time, speed){
    speed = speed || 1000;
    time = time || moment(time);
    setInterval(function(){// a cada segundo
      // Se resta un segundo a el tiempo de este reloj
      time.subtract(1, 'seconds');
      //Envio mensaje al proceso principal
      process.send({
        workerId:  workerId,
        time: time
      })
    }, speed);

    //Recibo mensaje del proceso master
    process.on('message', function(msg) {
      console.log(msg);
      //si es una actualización de tiempo
      if(msg.type == 'update'){
        //Establezco el tiempo al enviado por el proceso principal
        time = moment(msg.newTime);
      }
    });
  }
}
