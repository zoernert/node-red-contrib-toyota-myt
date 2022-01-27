# node-red-contrib-toyota-myt

**Retrieve Data from Toyota MyT App**

[![npm](https://img.shields.io/npm/dt/node-red-contrib-toyota-myt.svg)](https://www.npmjs.com/package/node-red-contrib-toyota-myt)
[![npm](https://img.shields.io/npm/v/node-red-contrib-toyota-myt.svg)](https://www.npmjs.com/package/node-red-contrib-toyota-myt)
[![CO2Offset](https://api.corrently.io/v2.0/ghgmanage/statusimg?host=node-red-contrib-myt&svg=1)](https://co2offset.io/badge.html?host=node-red-contrib-myt)[![Code Quality](https://api.codiga.io/project/30556/score/svg)](https://app.codiga.io/public/project/30556/node-red-contrib-myt/dashboard)

Disclaimer: Developer/Maintainer is not afffiliated with Toyota. Nor is this an official implementation. It is designed as-is for demo/lab usgage.

## Sample Output

### Output[0]

msg.payload is array of all objects returned by Toyota server

### Output[1]

```javascript
[{"type":"mileage","value":2937,"unit":"km"},{"type":"Fuel","value":81}]
```

### Output[2]

```javascript
{"VehicleInfo":{"AcquisitionDatetime":"2022-01-25T02:28:01Z","RemoteHvacInfo":{"InsideTemperature":22,"RemoteHvacMode":0,"RemoteHvacProhibitionSignal":1,"Temperaturelevel":29,"SettingTemperature":21,"BlowerStatus":0,"FrontDefoggerStatus":0,"RearDefoggerStatus":0,"LatestAcStartTime":"2022-01-25T01:19:23Z","TemperatureDisplayFlag":0},"ChargeInfo":{"PlugInHistory":41,"RemainingChargeTime":65535,"EvTravelableDistance":63.7,"EvTravelableDistanceSubtractionRate":7,"ChargeRemainingAmount":89,"SettingChangeAcceptanceStatus":0,"ChargeType":15,"ChargeWeek":0,"ChargeStartTime":"42:35","ChargeEndTime":"42:35","ConnectorStatus":5,"BatteryPowerSupplyPossibleTime":16383,"ChargingStatus":"none","EvDistanceWithAirCoInKm":59.24,"GasolineTravelableDistance":537,"PlugStatus":45,"GasolineTravelableDistanceUnit":1,"EvDistanceInKm":63.7}},"ReturnCode":"000000"}
```

## Maintainer / Imprint

<addr>
Thorsten Zoerner  <br/>
Gerhard Weiser Ring 29  <br/>
69256 Mauer  <br/>
Germany  <br/>
  <br/>
+49 6226 968 009 0  <br/>
  <br/>
me@thorsten-zoerner.com  <br/>
</addr>

Project Website: https://co2offset.io/
## LICENSE
[MIT](./LICENSE)
