module.exports=async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
  }
  