# Verso
Plant growing monitor

## Hardware
- ESP8266 NodeMCU (or other ESP)
- BME280
- FC-28
- Raspberry (or other server for listening mqtt)

## Required software
- Node
- mysqsl
- mqtt
- grafana

## Mysql setup
For grafana and mqtt usage, you'll need two users
- grafanaReader (for grafana to be able to read data) 
- nodeMQTT (for adding rows from mqtt queue into db)
- Create an accessible table for system to use, example: tables.sql

Grants for users:
```
GRANT SELECT, SHOW VIEW ON xxx.`xxx` to 'grafanaReader';
```
```
GRANT ALL ON xxx.`xxx` to 'nodeMQTT'@`localhost`;
```




## Running
> npm i mqtt mysql2

> node verso-{version}.js

![image](https://github.com/Clomez/Verso/assets/17356557/94def673-8aa2-4c55-bdaf-9f1daf559573)
