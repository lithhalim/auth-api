class COLLECTION_ROUTES{
    constructor(model){
        this.model=model;

    }
   async create(obj){
       try{
        let newRecord=await this.model.create(obj);
        return newRecord
       }catch(e){
           console.error("error in creating a new record",this.model)
       }

    }
   async get(data_id){
       try{
           //IF SEND ID SEARCH ONE CUTOMER
           if(data_id){    
              let record=await this.model.findOne({where:{id:data_id}});
               return record
           }else{
              let record=await this.model.findAll();
               return record;
           }
       }catch(e){
           console.error("error in creating a new record",this.model)
       }
    }
   async update(clothes_id,obj){
       try{
           let record=await this.model.findOne({where:{id:clothes_id}})
           let update=await record.update(obj)
           return update
       }catch{
        console.error("error in creating a new record",this.model)
       }
    }
   async delete(data_id){
       if(!data_id){
           throw new Error("no id provided of model",this.model)
       }
       try{
        let deleted=await this.model.destroy({where:{id:data_id}});
        return deleted
    }catch(e){
        console.error("error in creating a new record",this.model)
    }
    }
}

module.exports=COLLECTION_ROUTES;
