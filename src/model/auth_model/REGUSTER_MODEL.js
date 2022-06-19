
const {DataTypes}=require("sequelize")
const LITH_DATABASE=require("../../database/LITH_DATABASE")
module.exports = LITH_DATABASE.define('authetess', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    token: {//VERTUAL MEAN DONT SAVED IN DATABASE YOU CAN USE IN BACL END YOU JUST UNSERTET LIKE PROPERTY IN OBJECT
      type: DataTypes.VIRTUAL,
    },
    role:{//ENUM MEAN YOU NEED TO SELECT ON OF THISE JUST YOU CANT INSERT ANOTHER TYPE
      type:DataTypes.ENUM('admin','writer','editor','user'),
      defaultValue:"user",
    },
    action:{ 
      type: DataTypes.VIRTUAL,
      get(){
        const acl={
          user:['read'],
          writer:['read','create'],
          editor:['read','create','update'],
          admin:['read','create','update']
        }
        return acl[this.role];
      }
    }
  }, {
    // Other model options go here
  });
  