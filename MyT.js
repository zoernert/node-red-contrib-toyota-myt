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
                  "Cookie":"iPlanetDirectoryPro="+token
                }
              });
              msgMA = {payload:mileage.data};
              msgAll.payload.push(mileage.data);

              // RC Data
              const rc = await axios.get("https://myt-agg.toyota-europe.com/cma/api/vehicles/"+config.vin+"/remoteControl/status",{
                headers: {
                  "Cookie":"iPlanetDirectoryPro="+token,
                  "uuid":uuid,
                  "X-TME-LOCALE":"de-de"
                }
              });
              msgRC = {payload:rc.data};
              msgAll.payload.push(rc.data);
              node.send([msgAll,msgMA,msgRC]);
          } catch(e) {}
        });
    }
    RED.nodes.registerType("MyT",MyTNode);
}
