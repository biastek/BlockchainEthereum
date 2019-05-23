
class FileUitility{
    constructor(){};

    uploadFile(_image,_setImageName){
        let method="FileUtility/uploadFile()";
        console.log(method+" -->start");
        
        return new Promise((resolve,reject)=>{
            if (_image.mimetype === 'image/png' || _image.mimetype === 'image/jpeg' || _image.mimetype === 'image/gif') {
                _image.mv(`public/assets/upload/images/${_setImageName}`, (error,result) => {
                    if (error) {
                        console.log(method+ " -->fail");
                        return reject(new Error(error));
                    }
                    console.log(method+ " -->success");
                    return resolve(result);
                });
            }
        });    
    }
}


module.exports=FileUitility;