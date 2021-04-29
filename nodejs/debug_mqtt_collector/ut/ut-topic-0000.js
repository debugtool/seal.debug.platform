// ut-topic-0000.js
const unit = 
{
    state:0, 
    time: 0, 
    nextime: 0,
    //"logDeviceMessage": logDeviceMessage,
    //"reportDeviceMessage": reportDeviceMessage,
    //"setThingValue" = setThingValue;
    //broker: broker,
    subscribe_schema:
    [
        { option:"root", topic: "pow", group: null, tag: "pow", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR2/get", group: "ut", tag: "var2", idx: -1, callback: callbackVAR2},
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR4/set", group: "ut", tag: "var4", idx: -1, callback: callbackVAR4},
        { option:"full", topic: "ut_gsm_mqtt/glo-get/VAR6/get", group: "ut", tag: "var6", idx: -1, callback: callbackVAR6},
        { option:"full", topic: "ut_gsm_mqtt/glo-set/VAR8/set", group: "ut", tag: "var8", idx: -1, callback: callbackVAR8},
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR10", group: "ut", tag: "var10", idx: -1, callback: callbackVAR10},
        { option:"full", topic: "ut_gsm_mqtt/glo-get/VAR12", group: "ut", tag: "var12", idx: -1, callback: callbackVAR12},
    ],
    publish_schema:
    [
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR1/set", group: "ut", tag: "var1", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR3/get", group: "ut", tag: "var3", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/glo-set/VAR5/set", group: "ut", tag: "var5", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/glo-get/VAR7/get", group: "ut", tag: "var7", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/utdev/VAR9", group: "ut", tag: "var9", idx: -1},
        { option:"full", topic: "ut_gsm_mqtt/glo-set/VAR11", group: "ut", tag: "var11", idx: -1},
    ],
    log_schema:
    [
        { topic: "pow", group: null, tag: "pow", idx: -1},
        { topic: "vbat", group: null, tag: "vbat", idx: -1},
        { topic: "din1", group: "ut", tag: "din1", idx: -1},
        { topic: "din2", group: "ut", tag: "din2", idx: -1},
        { topic: "din3", group: "ut", tag: "din3", idx: -1},
        { topic: "din4", group: "ut", tag: "din4", idx: -1},
        { topic: "dout1", group: "ut", tag: "dout1", idx: -1},
        { topic: "dout2", group: "ut", tag: "dout2", idx: -1},
        { topic: "dbm", group: "gsm", tag: "dbm", idx: -1},
        { topic: "val1", group: "log", tag: "val1", idx: -1},
        { topic: "avg1", group: "log", tag: "avg1", idx: -1},
        { topic: "min1", group: "log", tag: "min1", idx: -1},
        { topic: "max1", group: "log", tag: "max1", idx: -1},
        { topic: "val2", group: "log", tag: "val2", idx: -1},
        { topic: "avg2", group: "log", tag: "avg2", idx: -1},
        { topic: "min2", group: "log", tag: "min2", idx: -1},
        { topic: "max2", group: "log", tag: "max2", idx: -1},
        { topic: "wrk1", group: "log", tag: "wrk1", idx: -1},
        { topic: "tot1", group: "log", tag: "tot1", idx: -1},
        { topic: "cnt1", group: "log", tag: "cnt1", idx: -1},
        { topic: "delta1", group: "log", tag: "delta1", idx: -1},
        { topic: "wrk2", group: "log", tag: "wrk2", idx: -1},
        { topic: "tot2", group: "log", tag: "tot2", idx: -1},
        { topic: "cnt2", group: "log", tag: "cnt2", idx: -1},
        { topic: "delta2", group: "log", tag: "delta2", idx: -1},
        { topic: "wrk3", group: "log", tag: "wrk3", idx: -1},
        { topic: "tot3", group: "log", tag: "tot3", idx: -1},
        { topic: "cnt3", group: "log", tag: "cnt3", idx: -1},
        { topic: "delta3", group: "log", tag: "delta3", idx: -1},
        { topic: "wrk4", group: "log", tag: "wrk4", idx: -1},
        { topic: "tot4", group: "log", tag: "tot4", idx: -1},
        { topic: "cnt4", group: "log", tag: "cnt4", idx: -1},
        { topic: "delta4", group: "log", tag: "delta4", idx: -1},
        { topic: "wrk5", group: "log", tag: "wrk5", idx: -1},
        { topic: "wrk6", group: "log", tag: "wrk6", idx: -1},
    ],
}
function assertValue(unit, tms, devicename, topic, result, value)
{
    if(result != value)
    {
        unit.reportDeviceMessage(devicename, "### ERROR " + topic + " " + value + " != " + result + "!!!", tms);
    }
    else
    {
        unit.reportDeviceMessage(devicename, "### OK " + topic + " " + value + " == " + result, tms);
    }
}
function callbackVAR2(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var1");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function callbackVAR4(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var3");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function callbackVAR6(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var5");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function callbackVAR8(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var7");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function callbackVAR10(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var9");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function callbackVAR12(payload, tagref)
{
    let value = unit.getThingValue(tagref.device,"var11");
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, value, tagref.val);
}
function testRun(device)
{
    switch(unit.state)
    {
        case 0:
            {
                unit.state++;
                unit.nextime += 1;
            }
            break;
        case 1:
            {
                if(unit.time >= unit.nextime)
                {
                    unit.state++;
                    unit.nextime += 1;

                }
            }
            break;
        case 2:
            {
                if(unit.time >= unit.nextime)
                {
                    unit.state++;
                    unit.nextime += 10;
                    unit.setThingValue(device, "var1", 1);
                    unit.setThingValue(device, "var3", 3);
                    unit.setThingValue(device, "var5", 5);
                    unit.setThingValue(device, "var7", 7);
                    unit.setThingValue(device, "var9", 9);
                    unit.setThingValue(device, "var11", 11);
                }
            }
            break;
    }
    unit.time++;
}
unit.run = testRun;
exports.ut = unit;