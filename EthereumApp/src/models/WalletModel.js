import namespace_config from '../../config/namespace_config.json';

class Wallet{
    constructor(id,account_name,account_address,private_key,created,creator,ether_balance,token_balance){
        this.$class=namespace_config.namespace+".Wallet";
        this.id=id;
        this.account_name=account_name;
        this.account_address=account_address;
        this.private_key=private_key;
        this.created=created;
        this.creator=creator;
        this.ether_balance=ether_balance;
        this.token_balance=token_balance;
    }
}

module.exports=Wallet;