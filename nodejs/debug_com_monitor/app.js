// app.js

const ctx = require('./ut/modbus-server-0000.js');

// --------------------------------------------------------------------------------
// SERIAL PORT
// --------------------------------------------------------------------------------
//const DEBUG_PORT = "/dev/ttyUSB0";
const DEBUG_PORT = "COM3";
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort(DEBUG_PORT, {baudRate: 115200});
// Read data that is available but keep the stream in "paused mode"
/*
port.on('readable', function () {
    console.log('Data1:', port.read())
  })
  
  // Switches the port into "flowing mode"
  port.on('data', function (data) {
    console.log('Data2:', data)
  })
 */
// Pipe the data into another stream (like a parser or standard out)
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', ctx.ut.callback.parser);
//
// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------
// MODBUS CLIENT
// --------------------------------------------------------------------------------
const REMOTE_MODBUS_SERVER_UNIT_ID = 1;
const REMOTE_MODBUS_SERVER_NAME = "192.168.1.1";
const REMOTE_MODBUS_SERVER_PORT = 502;
const Modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket, REMOTE_MODBUS_SERVER_UNIT_ID);
const options = {'host' : REMOTE_MODBUS_SERVER_NAME,'port' : REMOTE_MODBUS_SERVER_PORT};

socket.on('connect', ctx.ut.callback.connect);
socket.on('close', ctx.ut.callback.close);
function connectToRemoteServer(host, port)
{
    options.host = host;
    options.port = port;
    socket.connect(options);
    //socket.connect(port, host);
}
function sendRequest(respcallback, errcallback)
{
    client.readHoldingRegisters(0, 10).then(respcallback, errcallback);
}
// 
ctx.ut.action.connectToRemoteServer = connectToRemoteServer;
ctx.ut.action.sendRequest = sendRequest;
