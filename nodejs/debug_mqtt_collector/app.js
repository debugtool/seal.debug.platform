// app.js
const util = require('util');
const mqtt = require('mqtt');
const fs = require('fs');
const ctx = require('./ut/ut-topic-0000.js');
//const ctx = require('./ut/ut-vars-0000.js');
const wrapper = require('./device.js');
const { verify } = require('crypto');
// 'mqtt://mqtt.seneca.it';
// 'mqtt://cloud01.seneca.it';
let datetime = new Date();
const _serverMinuteOffset = -datetime.getTimezoneOffset();
function leadzero(n)
{
    if(n < 10)
    {
        return '0' + n;
    }
    else
    {
        return n  + "";
    }
}
function reportAppend(message)
{
    fs.appendFileSync('report.txt', message + "\n");
    console.log(message);
}
function reportDeviceMessage(name, message, tms)
{
    let log = {};
    //log["servertime"] = Date.now();
    //log["tms"] = tms;
    log["src"] = name;
    log["msg"] = message;
    client.publish(broker.SUPERVISOR_LOG_TOPIC, JSON.stringify(log), {qos:1});
    if(tms <= 0)
    {
        let time = Date.now();
        let datetime = new Date(time);
        if(_serverMinuteOffset == 0) 
        {
            reportAppend(util.format("UTC %s-%s-%s %s:%s:%s --- %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message));
        }
        else
        {
            reportAppend(util.format("%s-%s-%s %s:%s:%s --- %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message));
        }
    }
    else
    {
        let datetime = new Date(tms * 1000);
        if(_serverMinuteOffset == 0) 
        {
            reportAppend(util.format("#UTC %s-%s-%s %s:%s:%s : %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message));
        }
        else
        {
            reportAppend(util.format("# %s-%s-%s %s:%s:%s : %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message));
        }
    }
}
function logMessage(message)
{
    let ts = Date.now();
    let datetime = new Date(ts);
    console.log("%s-%s-%s %s:%s:%s --- %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), message);
}
function logDeviceMessage(name, message, tms)
{
    let log = {};
    //log["servertime"] = Date.now();
    //log["tms"] = tms;
    log["src"] = name;
    log["msg"] = message;
    client.publish(broker.SUPERVISOR_LOG_TOPIC, JSON.stringify(log), {qos:1});
    if(tms <= 0)
    {
        let time = Date.now();
        let datetime = new Date(time);
        if(_serverMinuteOffset == 0) 
        {
            console.log("UTC %s-%s-%s %s:%s:%s --- %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message);
        }
        else
        {
            console.log("%s-%s-%s %s:%s:%s --- %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message);
        }
    }
    else
    {
        let datetime = new Date(tms * 1000);
        if(_serverMinuteOffset == 0) 
        {
            console.log("#UTC %s-%s-%s %s:%s:%s : %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message);
        }
        else
        {
            console.log("# %s-%s-%s %s:%s:%s : %s - %s", leadzero(datetime.getUTCFullYear()), leadzero(datetime.getMonth() + 1), leadzero(datetime.getDate()), leadzero(datetime.getHours()),leadzero(datetime.getMinutes()),leadzero(datetime.getSeconds()), name, message);
        }
    }
}
// device:4Q0%X@z&^qYu
// collector:RyVTB&3tRLp@
// application:G%QTm6JF&xT!
// supervisor:OAAJlAbUW*Zq
const broker =
{
    "SERVER_NAME": 'mqtt://lab.seneca.it', // 'mqtt://188.10.245.254'
    "options":
    {
        keepalive: 60,
        //port:1883,
        //protocol:'mqtt',
        port:8883,
        protocol:'mqtts',
        //clientId: 'mydevice',
        //username: 'device',
        //password:'4Q0%X@z&^qYu',
        //clientId: 'collector',
        //username: 'collector',
        //password:'RyVTB&3tRLp@',
        clientId: 'collector1',
        key: fs.readFileSync('collector1-private.pem.key'), 
        cert: fs.readFileSync('collector1.pem.cer'),
        //ca: [ fs.readFileSync('rootCA.pem') ],
        rejectUnauthorized: false,
    },
    "SUPERVISOR_STATUS_TOPIC": 'ut/sts',
    "SUPERVISOR_DEVICE_TOPIC": 'ut/dev',
    "SUPERVISOR_LOG_TOPIC": 'ut/log',
    "SUPERVISOR_COMMAND_TOPIC": 'ut/cmd',
    "publish": {},
    "subscribe": {},
    "device":[]
}

logMessage('CONNECTING TO ' + broker.SERVER_NAME);
var client  = mqtt.connect(broker.SERVER_NAME, broker.options);

client.on("error",function(error){ 
    logMessage('CONNECTION ERROR ' + error);
})

client.on("connect", function(){	
    logMessage('CONNECTED TO ' + broker.SERVER_NAME);
    for(topic in broker.subscribe)
    {
        logMessage('SUBSCRIBE TO ' + topic);
        client.subscribe(topic);
    }
    client.publish(broker.SUPERVISOR_STATUS_TOPIC, JSON.stringify({"collector:":'online'}));
})

client.on('message', function(topic, message){
    logMessage('RECEIVED ' + topic + ' ' + message);
    if(topic === broker.SUPERVISOR_COMMAND_TOPIC)
    {

    }
    else if(broker.subscribe.hasOwnProperty(topic))
    {
        //try 
        {
            let payload = JSON.parse(message);
            let sublist = broker.subscribe[topic];
            for(var i = 0; i < sublist.length; i++)
            {
                sublist[i].tagref.parse(payload, sublist[i].tagref);
            }
        } 
        //catch(err) 
        //{
        //console.error(err);
        //}
    }
})

function handleAppExit (options, err) {
  if (err) {
    logMessage(err.stack);
  }

  if (options.cleanup) {
    client.publish(broker.SUPERVISOR_STATUS_TOPIC, JSON.stringify({"collector:":'offline'}));
  }

  if (options.exit) {
    process.exit();
  }
}

//Handle the different ways an application can shutdown
process.on('exit', handleAppExit.bind(null, {
  cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
  exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
  exit: true
}))
//
//
//
function getThingValue(device, tag) 
{
    if(!device.thing.hasOwnProperty(tag))
    {
        console.log(tag);
        return 0;
    }
    else
    {
        return device.thing[tag].val;
    }
}
function setThingValue(device, tag, value) 
{
    if(!device.thing.hasOwnProperty(tag))
    {
        console.log("ERROR tag " + tag);
    }
    else
    {
        let message = {};
        device.thing[tag].val = value;
        //message["tms"] = Date.now();
        message["val"] = value;
        let payload = JSON.stringify(message);
        logMessage('SEND ' + device.thing[tag].topic + ' ' + payload);
        client.publish(device.thing[tag].topic, payload);
    }
}
function publishDeviceStatusToSupervisor(device) 
{
    let message = {};
    //message["servertime"] = Date.now();
    message["dev"] = device.imei;
    message["tags"] = device.update;
    let payload = JSON.stringify(message);
    device.update = null;
    //logMessage('SEND ' + broker.SUPERVISOR_DEVICE_TOPIC + ' ' + payload);
    client.publish(broker.SUPERVISOR_DEVICE_TOPIC, payload, {qos:1});
}
function intervalFunc() 
{
    if(client.connected)
    {
        //let time0 = Date.now();
        for(device of broker.device)
        {
            if(device.update != null)
            {
                publishDeviceStatusToSupervisor(device);
            }
        }
        ctx.ut.run(broker.device[0]);
        //let time1 = Date.now();
        //console.log("Timer Elapsed ", (time1-time0));
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
ctx.ut.broker = broker;
ctx.ut.logDeviceMessage = logDeviceMessage;
ctx.ut.reportDeviceMessage = reportDeviceMessage;
ctx.ut.setThingValue = setThingValue;
ctx.ut.getThingValue = getThingValue;
// unit, name, imei, root topic, topic schema
wrapper.Create(ctx.ut,"utdev","868926034403409","utdev/");
/////////////////////////////////////////////////////////////////////////////////////////////////////
// 10sec
setInterval(intervalFunc, 1000);

console.log(broker.device[0]);
