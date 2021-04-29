// ut-vars-0000.js
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
        { option:"root", topic: "var-out-sub", group: "ut", tag: "var_out_sub", idx: -1, callback: testSub},
        { option:"root", topic: "var-out-add", group: "ut", tag: "var_out_add", idx: -1, callback: testAdd},
        { option:"root", topic: "var-out-mul", group: "ut", tag: "var_out_mul", idx: -1, callback: testMul},
        { option:"root", topic: "var-out-div", group: "ut", tag: "var_out_div", idx: -1, callback: testDiv},
        { option:"root", topic: "var-out-cpy", group: "ut", tag: "var_out_cpy", idx: -1},
        { option:"root", topic: "var-flt-xdin", group: "ut", tag: "var_flt_xdin", idx: -1},
        { option:"root", topic: "var-flt-xain", group: "ut", tag: "var_flt_xain", idx: -1},
        { option:"root", topic: "var-log-delta", group: "ut", tag: "var_log_delta", idx: -1},
        { option:"root", topic: "var-scale-xain", group: "ut", tag: "var_scale_xain", idx: -1},
        { option:"root", topic: "var-out-max", group: "ut", tag: "var_out_max", idx: -1},
        { option:"root", topic: "var-out-avg", group: "ut", tag: "var_out_avg", idx: -1},
        { option:"root", topic: "var-out-ampx", group: "ut", tag: "var_out_ampx", idx: -1},
        { option:"root", topic: "var-out-tst-avg", group: "ut", tag: "var_out_tst_avg", idx: -1},
    ],
    publish_schema:
    [
        { option:"root", topic: "var-in-sub1", group: "ut", tag: "var_in_sub1", idx: -1},
        { option:"root", topic: "var-in-sub2", group: "ut", tag: "var_in_sub2", idx: -1},
        { option:"root", topic: "var-in-add1", group: "ut", tag: "var_in_add1", idx: -1},
        { option:"root", topic: "var-in-add2", group: "ut", tag: "var_in_add2", idx: -1},
        { option:"root", topic: "var-in-mul1", group: "ut", tag: "var_in_mul1", idx: -1},
        { option:"root", topic: "var-in-mul2", group: "ut", tag: "var_in_mul2", idx: -1},
        { option:"root", topic: "var-in-div1", group: "ut", tag: "var_in_div1", idx: -1},
        { option:"root", topic: "var-in-div2", group: "ut", tag: "var_in_div2", idx: -1},
        { option:"root", topic: "var-in-cmp1", group: "ut", tag: "var_in_cmp1", idx: -1},
        { option:"root", topic: "var-in-cmp2", group: "ut", tag: "var_in_cmp2", idx: -1},
        { option:"root", topic: "var-in-thr", group: "ut", tag: "var_in_thr", idx: -1},
        { option:"root", topic: "var-in-cpy", group: "ut", tag: "var_in_cpy", idx: -1},
        { option:"root", topic: "var-in-bit", group: "ut", tag: "var_in_bit", idx: -1},
        { option:"root", topic: "var-in-bit1", group: "ut", tag: "var_in_bit1", idx: -1},
        { option:"root", topic: "var-in-bit2", group: "ut", tag: "var_in_bit2", idx: -1},
        { option:"root", topic: "var-in-xdin", group: "ut", tag: "var_in_xdin", idx: -1},
        { option:"root", topic: "var-in-xain", group: "ut", tag: "var_in_xain", idx: -1},
        { option:"root", topic: "reg-in-chk1", group: "ut", tag: "reg_in_chk1", idx: -1},
        { option:"root", topic: "reg-in-chk2", group: "ut", tag: "reg_in_chk2", idx: -1},
        { option:"root", topic: "reg-in-chk3", group: "ut", tag: "reg_in_chk3", idx: -1},
        { option:"root", topic: "reg-in-chk4", group: "ut", tag: "reg_in_chk4", idx: -1},
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
        { topic: "var-in-sub1", group: "ut", tag: "var_in_sub1", idx: -1},
        { topic: "var-in-sub2", group: "ut", tag: "var_in_sub2", idx: -1},
        { topic: "var-in-add1", group: "ut", tag: "var_in_add1", idx: -1},
        { topic: "var-in-add2", group: "ut", tag: "var_in_add2", idx: -1},
        { topic: "var-in-mul1", group: "ut", tag: "var_in_mul1", idx: -1},
        { topic: "var-in-mul2", group: "ut", tag: "var_in_mul2", idx: -1},
        { topic: "var-in-div1", group: "ut", tag: "var_in_div1", idx: -1},
        { topic: "var-in-div2", group: "ut", tag: "var_in_div2", idx: -1},
        { topic: "var-out-sub", group: "ut", tag: "var_out_sub", idx: -1},
        { topic: "var-out-add", group: "ut", tag: "var_out_add", idx: -1},
        { topic: "var-out-mul", group: "ut", tag: "var_out_mul", idx: -1},
        { topic: "var-out-div", group: "ut", tag: "var_out_div", idx: -1},
        { topic: "var-in-cmp1", group: "ut", tag: "var_in_cmp1", idx: -1},
        { topic: "var-in-cmp2", group: "ut", tag: "var_in_cmp2", idx: -1},
        { topic: "var-in-thr", group: "ut", tag: "var_in_thr", idx: -1},
        { topic: "var-in-cpy", group: "ut", tag: "var_in_cpy", idx: -1},
        { topic: "var-out-cpy", group: "ut", tag: "var_out_cpy", idx: -1},
        { topic: "var-in-bit", group: "ut", tag: "var_in_bit", idx: -1},
        { topic: "var-in-bit1", group: "ut", tag: "var_in_bit1", idx: -1},
        { topic: "var-in-bit2", group: "ut", tag: "var_in_bit2", idx: -1},
        { topic: "var-in-xdin", group: "ut", tag: "var_in_xdin", idx: -1},
        { topic: "var-in-xain", group: "ut", tag: "var_in_xain", idx: -1},
        { topic: "var-flt-xdin", group: "ut", tag: "var_flt_xdin", idx: -1},
        { topic: "var-flt-xain", group: "ut", tag: "var_flt_xain", idx: -1},
        { topic: "var-log-delta", group: "ut", tag: "var_log_delta", idx: -1},
        { topic: "var-scale-xain", group: "ut", tag: "var_scale_xain", idx: -1},
        { topic: "var-out-max", group: "ut", tag: "var_out_max", idx: -1},
        { topic: "var-out-min", group: "ut", tag: "var_out_min", idx: -1},
        { topic: "var-out-avg", group: "ut", tag: "var_out_avg", idx: -1},
        { topic: "reg-in-chk1", group: "ut", tag: "reg_in_chk1", idx: -1},
        { topic: "reg-in-chk2", group: "ut", tag: "reg_in_chk2", idx: -1},
        { topic: "reg-in-chk3", group: "ut", tag: "reg_in_chk3", idx: -1},
        { topic: "reg-in-chk4", group: "ut", tag: "reg_in_chk4", idx: -1},
        { topic: "var-out-ampx", group: "ut", tag: "var_out_ampx", idx: -1},
        { topic: "var-out-tst-avg", group: "ut", tag: "var_out_tst_avg", idx: -1},
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
function testSub(payload, tagref)
{
    let op1 = unit.getThingValueValue(tagref.device,"var_in_sub1");
    let op2 = unit.getThingValueValue(tagref.device,"var_in_sub2");
    let result = op1-op2;
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, result, tagref.val);
}
function testAdd(payload, tagref)
{
    let op1 = unit.getThingValueValue(tagref.device,"var_in_add1");
    let op2 = unit.getThingValueValue(tagref.device,"var_in_add2");
    let result = op1 + op2;
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, result, tagref.val);
}
function testMul(payload, tagref)
{
    let op1 = unit.getThingValueValue(tagref.device,"var_in_mul1");
    let op2 = unit.getThingValueValue(tagref.device,"var_in_mul2");
    let result = op1 * op2;
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, result, tagref.val);
}
function testDiv(payload, tagref)
{
    let result = 0
    let op1 = unit.getThingValueValue(tagref.device,"var_in_div1");
    let op2 = unit.getThingValueValue(tagref.device,"var_in_div2");
    if(op2 != 0)
    {
        result = op1/op2;
    }
    assertValue(tagref.unit, tagref.tms, tagref.device.name, tagref.topic, result, tagref.val);
}
function testRun(device)
{
    switch(unit.state)
    {
        case 0:
            {
                unit.state++;
                unit.nextime += 1;
                /*
                unit.setThingValue(device, "var_in_bit", 0);
                unit.setThingValue(device, "var_in_bit1", 0);
                unit.setThingValue(device, "var_in_bit2", 0);

                unit.setThingValue(device, "var_in_sub1", 0);
                unit.setThingValue(device, "var_in_sub2", 0);

                unit.setThingValue(device, "var_in_add1", 0);
                unit.setThingValue(device, "var_in_add2", 0);

                unit.setThingValue(device, "var_in_mul1", 0);
                unit.setThingValue(device, "var_in_mul2", 0);

                unit.setThingValue(device, "var_in_div1", 0);
                unit.setThingValue(device, "var_in_div2", 0);

                unit.setThingValue(device, "var_in_cmp1", 0);
                unit.setThingValue(device, "var_in_cmp2", 0);

                unit.setThingValue(device, "var_in_thr", 0);

                unit.setThingValue(device, "var_in_cpy", 0);
                unit.setThingValue(device, "var_in_xdin", 0);
                unit.setThingValue(device, "var_in_xain", 0);
                unit.setThingValue(device, "reg_in_chk1", 0);
                unit.setThingValue(device, "reg_in_chk2", 0);
                unit.setThingValue(device, "reg_in_chk3", 0);
                unit.setThingValue(device, "reg_in_chk4", 0);
                /*/
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
                    unit.setThingValue(device, "var_in_bit", 65535);
                    unit.setThingValue(device, "var_in_bit1", 65535);
                    unit.setThingValue(device, "var_in_bit2", 65535);
                }
            }
            break;
        case 3:
            {
                if(unit.time >= unit.nextime)
                {
                    unit.state++;
                    unit.nextime += 10;
                    unit.setThingValue(device, "var_in_sub1", 22);
                    unit.setThingValue(device, "var_in_sub2", 12);

                    unit.setThingValue(device, "var_in_add1", 10);
                    unit.setThingValue(device, "var_in_add2", 20);

                    unit.setThingValue(device, "var_in_mul1", 10);
                    unit.setThingValue(device, "var_in_mul2", 20);

                    unit.setThingValue(device, "var_in_div1", 20);
                    unit.setThingValue(device, "var_in_div2", 2);
/*
                    unit.setThingValue(device, "var_in_cmp1", 20);
                    unit.setThingValue(device, "var_in_cmp2", 2);

                    unit.setThingValue(device, "var_in_thr", 10);

                    unit.setThingValue(device, "var_in_cpy", 10);
                    unit.setThingValue(device, "var_in_xdin", 65535);
                    unit.setThingValue(device, "var_in_xain", 33);
                    unit.setThingValue(device, "reg_in_chk1", 8);
                    unit.setThingValue(device, "reg_in_chk2", 1);
                    unit.setThingValue(device, "reg_in_chk3", 30);
                    unit.setThingValue(device, "reg_in_chk4", 12);
                    */

                }
            }
            break;
        case 4:
            {
                if(unit.time >= unit.nextime)
                {
                    unit.state++;
                    unit.nextime += 1;

                    unit.setThingValue(device, "var_in_cmp1", 20);
                    unit.setThingValue(device, "var_in_cmp2", 2);

                    unit.setThingValue(device, "var_in_thr", 10);

                    unit.setThingValue(device, "var_in_cpy", 10);
                    unit.setThingValue(device, "var_in_xdin", 65535);
                    unit.setThingValue(device, "var_in_xain", 33);
                    unit.setThingValue(device, "reg_in_chk1", 8);
                    unit.setThingValue(device, "reg_in_chk2", 1);
                    unit.setThingValue(device, "reg_in_chk3", 30);
                    unit.setThingValue(device, "reg_in_chk4", 12);
                }
            }
            break;

    }
    unit.time++;
}
unit.run = testRun;
exports.ut = unit;