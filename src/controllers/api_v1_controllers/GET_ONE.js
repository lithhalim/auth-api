module.exports=async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
  }
  
  