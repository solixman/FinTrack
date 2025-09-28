const {Category} = require('../models')


module.exports={


    async  create(req,res) {
        
        try {
            
            const {name,description,type}=req.body;
        await Category.create({name:name},{description:description},{type:type});

            
           res.send('done')
        } catch (error) {
            console.log(error);   
            res.send('something went wrong')
        }

    }


}