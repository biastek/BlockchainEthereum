import namespace_config from "../../config/namespace_config.json";

class EtherAccount{
    constructor(address,ethBalance,tokenBalance){
        this.$class=namespace_config.namespace+".Ethereum";
        this.address=address;
        this.ethBalance=ethBalance;
        this.tokenBalance=tokenBalance;
    }
}

module.exports=EtherAccount;