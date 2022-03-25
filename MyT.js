module.exports = function(RED) {
    function MyTNode(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        const node = this;

        node.on('input', async function(msg) {
          try {
            let msgAll = {payload:[]};
            let msgMA = null;
            let msgRC = null;
            let msgPP = null;

            const login = await axios.post("https://ssoms.toyota-europe.com/authenticate",{username:config.username,password:config.password},{
                headers: {
                    'Content-Type': 'application/json',
                    'X-TME-BRAND': 'TOYOTA',
                    'X-TME-LC':'de-de',
                    'Accept':'application/json, text/plain, */*',
                    'Sec-Fetch-Dest':'empty'
                }
              });
              msgAll.payload.push(login.data);
              const token = login.data.token;
              const uuid = login.data.customerProfile.uuid;

              // Retrieve Milage
              const mileage = await axios.get("https://myt-agg.toyota-europe.com/cma/api/vehicle/"+config.vin+"/addtionalInfo",{
                headers: {
                  'X-TME-LC': 'de-de',
                  'X-TME-LOCALE': 'de-de',
                  'X-TME-TOKEN': token,
                  'Cookie': 'iPlanetDirectoryPro='+token,
                  'X-TME-APP-VERSION': '4.10.0',
                  'uuid': uuid
                }
              });
              msgMA = {payload:mileage.data};
              msgAll.payload.push(mileage.data);

              // RC Data
              const rc = await axios.get("https://myt-agg.toyota-europe.com/cma/api/vehicles/"+config.vin+"/remoteControl/status",{
                headers: {
                  'X-TME-LC': 'de-de',
                  'X-TME-LOCALE': 'de-de',
                  'X-TME-TOKEN': token,
                  'Cookie': 'iPlanetDirectoryPro='+token,
                  'X-TME-APP-VERSION': '4.10.0',
                  'uuid': uuid
                }
              });

              msgRC = {payload:rc.data};
              msgAll.payload.push(rc.data);
              const parking = await axios.get("https://myt-agg.toyota-europe.com/cma/api/users/"+uuid+"/vehicle/location",{
                  headers: {
                    'X-TME-LC': 'de-de',
                    'X-TME-LOCALE': 'de-de',
                    'X-TME-TOKEN': token,
                    'Cookie': 'iPlanetDirectoryPro='+token,
                    'X-TME-APP-VERSION': '4.10.0',
                    'VIN': config.vin
                  }
              });
              msgPP = {payload:parking.data};
              msgAll.payload.push(parking.data);

              node.send([msgAll,msgMA,msgRC,msgPP]);
          } catch(e) {console.log(e);}
        });
    }
    RED.nodes.registerType("MyT",MyTNode);
}
