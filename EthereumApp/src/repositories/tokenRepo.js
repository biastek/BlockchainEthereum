import rq   from    'request-promise';
import ether_ropsten_api from '../../config/ether_ropsten_api.json';


class   TokenRepo{
    constructor(){};
    getBalance(_address){
        let method="TokenRepo/getBalance";
        console.log(method+" -->start");

        const options={
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:ether_ropsten_api.api_ip+":"+ether_ropsten_api.api_port+ether_ropsten_api.api_url+"getBalance",
            body: {
                "address": _address                
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

    };

    transferFrom(_addressfrom,_privatekey,_addressto,_value){
        let method="TokenRepo/transferFrom";
        console.log(method+" -->start");

        const options={
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:ether_ropsten_api.api_ip+":"+ether_ropsten_api.api_port+ether_ropsten_api.api_url+"transferFrom",
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

    createAccount(){
        let method="TokenRepo/createAccount";
        console.log(method+" -->start");

        const options={
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:ether_ropsten_api.api_ip+":"+ether_ropsten_api.api_port+ether_ropsten_api.api_url+"createAccount",            
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

    };
}

module.exports=TokenRepo;