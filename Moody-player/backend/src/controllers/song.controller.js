module.exports.storeSong = (req,res) =>{
    try {
        console.log(req.file);
        res.status(201).json({song:req.body,message:"Song stores successfully :"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}