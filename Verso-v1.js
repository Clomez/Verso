let mqtt = require('mqtt');
let Topic = 'tasSensor/SENSOR'; 
let Broker_URL = 'mqtt://192.168.33.232';

// MySql
table_name = "xxx"

host = '127.0.0.1',
user= "xxx",
port= 7723,
password= "xxx",
database= "xxx"

// MQTT QUEUE
let options = {
        clientId: 'nodeMQTT',
        port: 1883,
        username: 'xxx',
        password: 'xxx',
        keepalive : 60
};

let client  = mqtt.connect(Broker_URL, options);

let mqtt_connect = () => {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
};

let mqtt_subscribe = (err, granted) => {
    console.log("Subscribed to " + Topic);
    if (err) {console.log(err);}
};


let mqtt_reconnect = (err) => {
    console.log("Reconnecting MQTT");
    if (err) {console.log(err);}
        client  = mqtt.connect(Broker_URL, options);
};

let mqtt_error = (err) => {
    console.log("Error!");
        if (err) {console.log(err);}
};

let after_publish = () => {
        //do nothing
};

let mqtt_close = () => {
        console.log("Close MQTT");
};

let mqtt_messsageReceived = (topic, message, packet) => {
    console.log("message received");
    var message_str = message; //convert byte array to string
    try {
        let msg_obj = JSON.parse(message)
        insert(msg_obj);
        console.log("message: " + message_str);
    }
    catch (e) {
        console.error(e);
    }
};

let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: host,
    user: user,
    //port: port,
    password: password,
    database: database
});

connection.connect((err) =>  {
        if (err) throw err;
        console.log("Database Connected!");
});

let insert = (msg_obj) => {
    var sql = `INSERT INTO ${table_name} (Time, Temperature, Humidity, DewPoint, Pressure, Gas, GrdMoisture) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let GrdMoisture = msg_obj.ANALOG.A0 !== undefined ? msg_obj.ANALOG.A0 : "404";

    var params = [
        msg_obj.Time,
        msg_obj.BME680.Temperature,
        msg_obj.BME680.Humidity,
        msg_obj.BME680.DewPoint,
        msg_obj.BME680.Pressure,
        msg_obj.BME680.Gas,
        GrdMoisture
    ];

    sql = mysql.format(sql, params);

    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log("Message added: " + JSON.stringify(msg_obj));
    });
}

client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);
