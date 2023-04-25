class CommonService {

    constructor(){}
    generateImageName(oldName){
        return new Promise(function(resolve,reject){
            console.log("execute generateImageName",oldName)
            let oldNameArr = oldName.split('.');
            console.log("oldNameArr",oldNameArr);
            const filesExtension = oldNameArr.splice(-1).toString();
            console.log("filesExtension",filesExtension);
            const currentDate = new Date();
            let imageNewName = currentDate.getTime()+ Math.round(Math.random(11111,99999)*10000)+"."+ filesExtension;
            console.log("imageNewName",imageNewName);
            resolve(imageNewName);
        });
    }
    uploadImage(filesInfo){
        return new Promise(function(resolve,reject){
            const uploadPath =__dirname + '/../public/product_Images/'+ filesInfo.name;
            filesInfo.mv(uploadPath,function(error){
                if(error){
                    reject(error)
                } else{
                    resolve(true);
                }
            });
        });
    }
}
module.exports = new CommonService();