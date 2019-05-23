import EtherRepo from '../repositories/etherRepo';

/** */
let etherRepo=new EtherRepo();

class EtherService{
    constructor(){};    
    async transferEther(_addressfrom,_privatekey,_addressto,_value){
        const method='EtherService/transferEther';
        console.log(method+' -->start');

        try {
            let result=await etherRepo.transferEther(_addressfrom,_privatekey,_addressto,_value);

            console.log(method+' -->success');
            return result;
        } catch (error) {
            console.log(method+' -->fail');
            return {"errCode":500};
        }
    };


};

module.exports=EtherService;