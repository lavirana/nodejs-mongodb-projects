const testUserController = (req, res) => {
    try{
        res.status(200).send({
            success:true,
            message:'test url data API'
        })
    }catch(error){
        console.log('error in the API', error)
    }
};


module.exports = {testUserController};