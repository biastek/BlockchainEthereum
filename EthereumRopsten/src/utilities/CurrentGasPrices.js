import rq from "request-promise";


class CurrentGasPrices {
  constructor() { };
  
  /* async getCurrentGasPrices() {
    return new Promise(function (resolve, reject) {
      // send the signed transaction
      try {
        let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
        let prices = {
          low: response.data.safeLow / 10,
          medium: response.data.average / 10,
          high: response.data.fast / 10
        }
        console.log(JSON.stringify(prices));

        return resolve(prices);
      } catch (error) {
        reject(error+"");
      }
    })
  } */

  async getCurrentGasPrices() {
    let method = "CurrentGasPrices/getCurrentGasPrices()";
    console.log(method+" -->start");

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        uri: 'https://ethgasstation.info/json/ethgasAPI.json',
        json: true
    };

    return new Promise((resolve,reject)=>{
         rq(options, function (error, result) {
            if(error){
                console.log(method+" -->fail");
                return reject(new Error(error));
            }else{
                console.log(method+ "-->success");               
                return resolve(result.body);
            };
        });
    });        
  };

}


module.exports = CurrentGasPrices;