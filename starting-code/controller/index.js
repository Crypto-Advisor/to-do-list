const formidable = require('formidable')
const {create, get, remove} = require('../model/todo')

exports.create = (req, res) =>{
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields) =>{
        const { description } = fields;

        if(!description){
            return res.status(400).json({
                error: 'Description is required',
            });
        }

        try{
            const newTask = await create(description);
            return res.status(201).send({data: newTask.rows[0]});
        } catch(error){
            return res.status(400).json({
                error,
            });
        }
    })
}

exports.read = async(req, res) =>{
    try{
        const data = await get();
        return res.status(201).send({data: data.rows})
    } catch(error){
        return res.status(400).json({
            error
        });
    }
}

exports.removeToDo = async(req, res) =>{
    const id = Number(req.params.id);
    try{
        await remove(id);
        return res.status(200).send({data: id});
    } catch(error){
        return res.status(400).json({
            error
        });
    }
}