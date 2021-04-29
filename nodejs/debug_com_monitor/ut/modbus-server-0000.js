//ut-modbus-server-0000.js
//
// TEST: affidabilità del MODBUS SERVER
//
// session: è la sessione di test (un test può essere composto da più sessioni ma ognuna ha un json diverso?)
// target: è il dispositivo sottoposto al test
// log: fa riferimento all'oggetto del test, in questo caso una sessione ci collegamento del client modbus 
// report:
// ogni log raccoglie i dati aggregati (AGGREGATE, METRICS, DIMENSIONS)
//      per sessione del test (RUN)
//      per sessione del target (SLOT)
//      giornalmente (o altra periodicizzazione) 
//
const fs = require('fs');
//
const unit = 
{
    state:0, 
    time: 0, 
    nextime: 0,
    host: "0.0.0.0",
    port: 502,
    last_session:{
        // session == target modbus server socket connection
        count: 0,
        start_epoch_ms: Date.now(),
        end_epoch_ms: Date.now(),
    },
    data: {
        session:[],
        thing:
        {
            sid: 'undef',
            reset_count: 0,
            gsm:
            {
                imei: 'undef',
                iccid: 'undef',
                imsi: 'undef',
                rev: 'undef',
                reset_count: 0,
            },
            ppp:
            {
                max_run_ms: 60000,
                max_off_ms: 0,
                run_minutes: 0,
                off_minutes: 0,
                run_count: 0,   
                off_count: 0, 
            },
            srv:
            {
                max_run_ms: 0,
                min_run_ms: 600000,
                max_off_ms: 0,
                run_minutes: 0,
                off_minutes: 0,
                run_count: 0,   
                off_count: 0, 
            },
        },
        debug_cli:
        {
            // modbus client
            run_count:0,
            req_count:0,
            rsp_count:0, 
            err_count:0, 
        },
    },
    callback:
    {
        parser: debug_com_parser,
        connect: client_connect_handler,
        close: client_close_handler,
    },
    action: {}
}
function client_connect_handler() 
{
    unit.data.debug_cli.run_count++;
};
function client_close_handler() 
{
    unit.data.debug_cli.off_count++;
};
function client_response_handler(resp) 
{
    unit.data.debug_cli.rsp_count++;
    // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
    // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>
    console.log(resp);
};
function client_error_handler(msg) 
{
    unit.data.debug_cli.err_count++;
    console.log("ERROR:" + msg);
};
function debug_com_parser(line)
{
    console.log(line);
    if(line.startsWith("$RTC"))
    {
        if(unit.state == 2)
        {
            unit.data.thing.srv.run_minutes++;
            unit.data.debug_cli.req_count++;
            console.log('// Modbus Client Send Request ' + unit.data.debug_cli.req_count);
            unit.action.sendRequest(client_response_handler, console.error);
        }
        else
        {
            unit.data.thing.srv.off_minutes++;
        }
    }
    else if(line.startsWith("$IMEI"))
    {
        //$IMEI 862771040064068
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.data.thing.gsm.imei = token[2];
        }
    }
    else if(line.startsWith("$IMSI"))
    {
        //$IMEI 862771040064068
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.data.thing.gsm.imsi = token[2];
        }
    }
    else if(line.startsWith("$ICCID"))
    {
        //$IMEI 862771040064068
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.data.thing.gsm.iccid = token[2];
        }
    }
    else if(line.startsWith("$CGMR"))
    {
        // $CGMR EG21GGBR07A09M1G_01.002.01.002
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.data.thing.gsm.rev = token[2];
        }
    }
    else if(line.startsWith("$GSM POW RESET"))
    {
        // $GSM POW RESET
        unit.data.thing.gsm.reset_count++;
        /*
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.report.gsm.rev = token[2];
        }
        */
    }
    else if(line.startsWith("$APP.SID"))
    {
        // $APP.SID 20D6F399-6CF5-47C9-B746-0F61F0791059
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.data.thing.sid = token[2];
        }
    }
    else if(line.startsWith("#APP RESET"))
    {
        // #APP RESET SW
        unit.data.thing.reset_count++;
        /*
        let token = line.split(" ");
        if(token.length > 1)
        {
            unit.report.rtu.sid = token[2];
        }
        */
    }
    else if(line.startsWith("@PPP"))
    {
        //@PPP START vtty0:
        //@PPP LINK UP
        //@PPP LADDR 83.224.138.23
        //@PPP LINK DW
        //@PPP STOP
        let token = line.split(" ");
        if(token.length > 1)
        {
            if(token[1] == "START")
            {
                console.log("//----PPP START");
                unit.state = 0;
            }
            else if(token[1] == "STOP")
            {
                console.log("//----PPP STOP");
                unit.state = 0;
            }
            else if(token[1] == "LADDR")
            {
                unit.host = token[2];
                console.log("//----HOST " + token[2]);
                unit.state = 0;
            }
        }
    }
    else if(line.startsWith("@NET.MODBUS.SERVER"))
    {
        //@NET.MODBUS.SERVER LISTEN 502
        let token = line.split(" ");
        if(token.length > 1)
        {
            if(token[1] == "LISTEN")
            {
                if(token.length > 1)
                {
                    logModbusServerSessionStart();               
                    unit.host = token[2];
                    unit.port = token[3];
                    unit.action.connectToRemoteServer(unit.host, unit.port);
                    console.log('// Modbus Client Connect to ' + host +":" + port);
                }
            }
            else if(token[1] == "ACCEPT")
            {
                console.log('// Modbus Client Accepted');
                unit.state = 2;
            }
            else if(token[1] == "RESTART")
            {
                logModbusServerSessionEnd();
            }
        }
    }
    else if(line.startsWith("@GSM.MODBUS.SERVER"))
    {
        //@NET.MODBUS.SERVER LISTEN 127.0.0502
        let token = line.split(" ");
        if(token.length > 1)
        {
            if(token[1] == "LISTEN")
            {
                if(token.length > 2)
                {
                    logModbusServerSessionStart();
                    unit.host = token[2];
                    unit.port = token[3];
                    unit.action.connectToRemoteServer(unit.host, unit.port);
                    console.log('// Modbus Client Connect to ' + unit.host +":" + unit.port);
                }
            }
            else if(token[1] == "ACCEPT")
            {
                console.log('// Modbus Client Accepted');
                unit.state = 2;
            }
            else if(token[1] == "RESTART")
            {
                console.log('// Modbus Client Restart');
                logModbusServerSessionEnd();
            }
            else if(token[1] == "ERROR")
            {
                console.log('// Modbus Client Error');
                logModbusServerSessionEnd();
            }
        }
    }
}
function logModbusServerSessionStart()
{
    if(unit.state == 0)
    {
        unit.state = 1;
        unit.last_session.start_epoch_ms = Date.now();
        if(unit.last_session.count > 0)
        {
            let elapsed = unit.last_session.start_epoch_ms - unit.last_session.end_epoch_ms;
            if(elapsed > unit.data.thing.srv.max_off_ms)
            {
                unit.data.thing.srv.max_off_ms = elapsed;
            }
        }
        unit.last_session.count++;
        unit.data.thing.srv.run_count++;
    }
}
function logModbusServerSessionEnd()
{
    if(unit.state != 0)
    {
        unit.data.thing.srv.off_count++;
        unit.last_session.end_epoch_ms = Date.now();
        if(unit.last_session.count > 0)
        {
            let elapsed = unit.last_session.end_epoch_ms - unit.last_session.start_epoch_ms;
            if(elapsed < unit.data.thing.srv.min_run_ms)
            {
                unit.data.thing.srv.min_run_ms = elapsed;
            }
            if(elapsed > unit.data.thing.srv.max_run_ms)
            {
                unit.data.thing.srv.max_run_ms = elapsed;
            }
        }
        let item = {};
        item["start"] =  unit.last_session.start_epoch_ms;
        item["end"] =  unit.last_session.end_epoch_ms;
        unit.data.session.push(item);
    }
}
function intervalFunc() 
{
    unit.data[update] = new Date.now();
    let data = JSON.stringify(unit.data, null, 2);
    fs.writeFile('/var/www/html/ut/report/report_modbus_server_0000.json', data, (err) => {
        if (err) throw err;
        console.log('// Report written to file');
    });
}
setInterval(intervalFunc, 600000);
exports.ut = unit;