import namespace_config from '../../config/namespace_config.json';


/**declare class */
class User{
    constructor(username,password,firstname,lastname,birthday,address,phone,enabled,registerdate){
        this.$class=namespace_config.namespace+".Seller";
        this.username=username;
        this.password=password;
        this.firstname=firstname;
        this.lastname=lastname;
        this.birthday=birthday;
        this.address=address;
        this.phone=phone;
        this.enabled=enabled;
        this.registerdate=registerdate;

    }
}

/**export module */
module.exports=User;