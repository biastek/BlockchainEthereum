import rq   from    'request-promise';
import ether_ropsten_api from '../../config/ether_ropsten_api.json';


class   EtherRepo{
    constructor(){};
    
    transferEther(_addressfrom,_privatekey,_addressto,_value){
        let method="etherRepo/transferEther";
        console.log(method+" -->start");

        const options={
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:ether_ropsten_api.api_ip+":"+ether_ropsten_api.api_port+ether_ropsten_api.api_url+"transferEther",
            body: {
                "addressfrom":_addressfrom,
                "privatekey":_privatekey,
                "addressto":_addressto,
                "value":_value                
            },
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+" -->failed");
                    return reject(new Error(error));
                }else{
                    console.log(method+" -->success");
                    return resolve(result.body);
                }
            });
        });

    }
    
}

module.exports=EtherRepo;