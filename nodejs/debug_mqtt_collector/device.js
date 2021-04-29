// device.js
function parseSession(payload, tagref)
{
    if(payload.hasOwnProperty("session"))
    {
        let session = payload["session"];
        if(!tagref.hasOwnProperty("session"))
        {
            tagref["session"] = session;
            tagref.device["session"] = session;
            if(session = "online")
            {

            }
        }
        else if( tagref["session"] != session)
        {
            tagref["session"] = session;
            tagref.device["session"] = session;
        }       
        if(payload.hasOwnProperty("tms"))
        {
            tagref["tms"] = payload.tms;
        }
        else
        {
            //tagref["time"] = Date.now();
            tagref["tms"] = -1;
        }
        tagref.unit.logDeviceMessage(tagref.device.name, tagref["session"], tagref["tms"]);
    }
}
function parseAction(payload, tagref)
{
    tagref.unit.logDeviceMessage(tagref.device.name, payload, -1);
    if((payload.hasOwnProperty("tms")) && (payload.hasOwnProperty("act")))
    {
        tagref["tms"] = payload.tms;
        if(!tagref.hasOwnProperty("act"))
        {
            tagref["act"] = payload["act"];
            //tagref["update"] = 1;
        }
        else if( tagref["act"] != payload["act"])
        {
            tagref["act"] = payload["act"];
            //tagref["update"] = 1;
        }       
        //logDevice1Message(payload.tms, payload.val);
    }
}
function parseValue(payload, tagref)
{
    if((payload.hasOwnProperty("tms")) && (payload.hasOwnProperty("val")))
    {
        let tms = payload.tms;
        let val = payload.val;
        tagref.unit.logDeviceMessage(tagref.device.name, tagref.topic + "=" + val, tms);
        tagref["tms"] = tms;
        if((!tagref.hasOwnProperty("val")) || (val != tagref["val"]))
        {
            let obj = {};
            obj["tms"] = tms;
            obj["val"] = val;
            
            tagref["val"] = val;
            tagref.device["session"] = 'ready';
            if(tagref.device.update == null) tagref.device.update = {};
            if(tagref.group != null)
            {
                if(!tagref.device.update.hasOwnProperty(tagref.group)) tagref.device.update[tagref.group] = {};
                tagref.device.update[tagref.group][tagref.tag] = obj;
            }
            else
            {
                tagref.device.update[tagref.tag] = obj;
            }
            if(tagref.callback != null)
            {
                tagref.callback(payload, tagref)
            }
        }     
        //logDevice1Message(payload.tms, payload.val);
    }
}
function updateValue(tagref)
{
    let obj = {};
    if(tagref.hasOwnProperty("tms"))
    {
        obj["tms"] = tagref["tms"];
    }
    else
    {
        obj["tms"] = -1;
    }
    if(tagref.hasOwnProperty("val"))
    {
        obj["val"] = tagref["val"];
    }
    if(tagref.device.update == null) tagref.device.update = {};
    if(tagref.group != null)
    {
        if(!tagref.device.update.hasOwnProperty(tagref.group)) tagref.device.update[tagref.group] = {};
        tagref.device.update[tagref.group][tagref.tag] = obj;
    }
    else
    {
        tagref.device.update[tagref.tag] = obj;
    }
}
function parseConfig(payload, tagref)
{
    /*
    if((payload.hasOwnProperty("tms")) && (payload.hasOwnProperty("val")))
    {
        tagref["tms"] = payload.tms;
        if(!tagref.hasOwnProperty("val"))
        {
            tagref["val"] = payload["val"];
            tagref["update"] = 1;
        }
        else if( tagref["val"] != payload["val"])
        {
            tagref["val"] = payload["val"];
            tagref["update"] = 1;
        }       
        //logDevice1Message(payload.tms, payload.val);
    }
    */
}
function parseEvent(payload, tagref)
{
    /*
    if((payload.hasOwnProperty("tms")) && (payload.hasOwnProperty("val")))
    {
        tagref["tms"] = payload.tms;
        if(!tagref.hasOwnProperty("val"))
        {
            tagref["val"] = payload["val"];
            tagref["update"] = 1;
        }
        else if( tagref["val"] != payload["val"])
        {
            tagref["val"] = payload["val"];
            tagref["update"] = 1;
        }       
        //logDevice1Message(payload.tms, payload.val);
    }
    */
}
function parseLog(payload, logref)
{
    let tms = 0;
    if(payload.hasOwnProperty("dev"))
    {
        if (!payload.dev.hasOwnProperty("imei"))
        {
            logref.unit.logDeviceMessage(logref.device.name, "#LOG IMEI NOT FOUND !!!!!!!!!", tms);
        }
    }
    if(payload.hasOwnProperty("log"))
    {
        for(let logobj of payload.log)
        {
            if (!logobj.hasOwnProperty("tms"))
            {
                logref.unit.logDeviceMessage(logref.device.name, "#LOG TIMESTAMP NOT FOUND !!!!!!!!!", tms);
            }
            else
            {
                tms = logobj.tms;
            }
            if (!logobj.hasOwnProperty("idx"))
            {
                logref.unit.logDeviceMessage(logref.device.name, "#LOG INDEX NOT FOUND !!!!!!!!!", tms);
            }
            for(let tagref of logref.device.logs)
            {
                if (!logobj.hasOwnProperty(tagref.topic))
                {
                    logref.unit.logDeviceMessage(logref.device.name, "#LOG " + tagref.topic + " NOT FOUND !!!!!!!!!", tms);
                }
            }
        }
    }
}
function getFullTopicKey(device, option, topic)
{
    if(option == "full")
    {
        return topic;
    }
    else if(option == "get")
    {
        return device.root + topic + "/get";
    }
    else if(option == "set")
    {
        return device.root + topic + "/set";
    }
    else
    {
        return device.root + topic;
    }
}

function subscribeLogTopic(unit, device, topic)
{
    let refobj = {};
    let tagobj = {};

    let key = getFullTopicKey(device, "root", topic);
    
    if(!device.hasOwnProperty("subs"))
    {
        device["subs"] = []; // lista delle variabili
    }
    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = key;
    tagobj["device"] = device;
    tagobj["parse"] = parseLog;
    //
    refobj["tagref"] = tagobj;
    //
    //updateValue(refobj.tagref);
    //
    //device["subs"].push(refobj.tagref);
    //
    if(!unit.broker.subscribe.hasOwnProperty(key))
    {
        unit.broker.subscribe[key] = [];
    }
    unit.broker.subscribe[key].push(refobj);
}
function pushSubscribeThing(device, group, tag, idx, tagobj)
{
    if(!device.hasOwnProperty("thing"))
    {
        device["thing"] = {}; // valori dei parametri definiti per la APP
    }
    if(!device.hasOwnProperty("subs"))
    {
        device["subs"] = []; // lista delle variabili
    }
    if(idx >= 0)
    {
        if(group != null)
        {
            if(!device["thing"].hasOwnProperty(group)) device["thing"][group] = {};
            if(!device["thing"][group].hasOwnProperty(tag)) device["thing"][group][tag] = [];
            device["thing"][group][tag][idx] = tagobj;
            //refobj["tagref"] = device["thing"][group][tag][idx];
        }
        else
        {
            if(!device["thing"].hasOwnProperty(tag)) device["thing"][tag] = [];
            device["thing"][tag][idx] = tagobj;
            //refobj["tagref"] = device["thing"][tag][idx];
        }
    }
    else
    {
        if(group != null)
        {
            if(!device["thing"].hasOwnProperty(group)) device["thing"][group] = {};
            //if(!device["thing"][group].hasOwnProperty(tag)) device["thing"][group][tag] = {};
            device["thing"][group][tag] = tagobj;
            //refobj["tagref"] = device["thing"][group][tag];
        }
        else
        {
            //if(!device["thing"].hasOwnProperty(tag)) device["thing"][tag] = {};
            device["thing"][tag] = tagobj;
            //refobj["tagref"] = device["thing"][tag];
        }
    }
    //
    //updateValue(refobj.tagref);
    //
    device["thing"][tag] = tagobj;
    device["subs"].push(tagobj);
}
function subscribeTopic(unit, topic, device, group, tag, idx, parserfunction, callback)
{
    let refobj = {};
    let tagobj = {};

    let key = getFullTopicKey(device, "root", topic);

    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = key;
    tagobj["device"] = device;
    tagobj["group"] = group;
    tagobj["tag"] = tag;
    tagobj["idx"] = idx;
    tagobj["parse"] = parserfunction;
    tagobj["callback"] = callback;
    pushSubscribeThing(device, group, tag, idx, tagobj);
    //
    refobj["tagref"] = tagobj; //device["thing"][tag];
    //
    if(!unit.broker.subscribe.hasOwnProperty(key))
    {
        unit.broker.subscribe[key] = [];
    }
    unit.broker.subscribe[key].push(refobj);
}
function subscribeItem(unit, device, item, parserfunction)
{
    let refobj = {};
    let tagobj = {};
    
    let key = getFullTopicKey(device, item.option, item.topic);

    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = key;
    tagobj["device"] = device;
    tagobj["group"] = item.group;
    tagobj["tag"] = item.tag;
    tagobj["idx"] = item.idx;
    tagobj["parse"] = parserfunction;
    if(item.hasOwnProperty("callback"))
    {
        tagobj["callback"] = item.callback;
    }
    pushSubscribeThing(device, item.group, item.tag, item.idx, tagobj);
    //
    refobj["tagref"] = tagobj; //device["thing"][tag];
    //
    if(!unit.broker.subscribe.hasOwnProperty(key))
    {
        unit.broker.subscribe[key] = [];
    }
    unit.broker.subscribe[key].push(refobj);
}
function pushPublishThing(device, tag, tagobj)
{
    if(!device.hasOwnProperty("thing"))
    {
        device["thing"] = {}; // valori dei parametri definiti per la APP
    }
    if(!device.hasOwnProperty("pubs"))
    {
        device["pubs"] = []; // lista delle variabili
    }
    if(device["thing"].hasOwnProperty(tag)) 
    {
        console.log("OVERWRITING TAG " + tag);
    }
    device["thing"][tag] = tagobj;
    device["pubs"].push(tagobj);
}
function publishTopic(unit, topic, device, tag)
{
    let refobj = {};
    let tagobj = {};

    let key = getFullTopicKey(device, "root", topic);
    
    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = key;
    tagobj["device"] = device;
    tagobj["tag"] = tag;
    pushPublishThing(device, tag, tagobj);
    //
    refobj["tagref"] = tagobj; //device["thing"][tag];
    //
    if(!unit.broker.publish.hasOwnProperty(key))
    {
        unit.broker.publish[key] = [];
    }
    unit.broker.publish[key].push(refobj);
}
function publishItem(unit, device, item)
{
    let refobj = {};
    let tagobj = {};    
    
    let key = getFullTopicKey(device, item.option, item.topic);

    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = key;
    tagobj["device"] = device;
    tagobj["tag"] = item.tag;
    pushPublishThing(device, item.tag, tagobj);
    //
    refobj["tagref"] = tagobj; //device["thing"][item.tag];
    //
    if(!unit.broker.publish.hasOwnProperty(key))
    {
        unit.broker.publish[key] = [];
    }
    unit.broker.publish[key].push(refobj);
}
function pushDeviceLogTag(device, tag, tagobj)
{
    if(!device.hasOwnProperty("thing"))
    {
        device["thing"] = {}; // valori dei parametri definiti per la APP
    }
    if(!device["thing"].hasOwnProperty("log"))
    {
        device["thing"]["log"]  = {}; // valori dei parametri definiti per la APP
    }
    if(!device.hasOwnProperty("logs"))
    {
        device["logs"] = []; // lista delle variabili
    }
    if(device["thing"]["log"].hasOwnProperty(tag)) 
    {
        console.log("OVERWRITING TAG " + tag);
    }
    device["thing"]["log"][tag] = tagobj;
    device["logs"].push(tagobj);
}
function logTopic(unit, topic, device, tag)
{
    let tagobj = {};
    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = topic;
    tagobj["device"] = device;
    tagobj["tag"] = tag;
    pushDeviceLogTag(device, tag, tagobj);
}
function logItem(unit, device, item)
{
    let tagobj = {};
    //tagobj["update"] = -1;
    tagobj["unit"] = unit;
    tagobj["topic"] = item.topic;
    tagobj["device"] = device;
    tagobj["tag"] = item.tag;
    pushDeviceLogTag(device, item.tag, tagobj);
}
function createDevice(unit, name, imei, root)
{
    let devobj = {};
    devobj["unit"] = unit;
    devobj["name"] = name;
    devobj["imei"] = imei;
    devobj["root"] = root;              // root topic
    devobj["ACT_TOPIC"] = root + "act"; // act topic for publishing commands
    //devobj["queue"] = {};
    devobj["update"] = null;
    devobj["session"] = "idle";
    devobj["tms"] = -1;
    subscribeTopic(unit, "sts", devobj, null, "session", -1, parseSession);
    subscribeTopic(unit, "act", devobj, null, "last_action", -1, parseAction);
    subscribeTopic(unit, "cfg", devobj, null, "cfg", -1, parseConfig);
    subscribeTopic(unit, "ev", devobj, null, "ev", -1, parseEvent);
    subscribeLogTopic(unit, "log", devobj);
    for(let item of unit.subscribe_schema)
    {
        subscribeItem(unit, devobj, item, parseValue);
    }
    for(let item of unit.publish_schema)
    {
        publishItem(unit, devobj, item);
    }
    for(let item of unit.log_schema)
    {
        logItem(unit, devobj, item);
    }
    for(let tagref of devobj.subs)
    {
        updateValue(tagref);
    }
    unit.broker.device.push(devobj);
}

exports.Create = createDevice;