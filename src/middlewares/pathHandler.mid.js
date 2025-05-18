const pathHandler = (req, res, next)=>{
    const error = "Not found URL"
    const { method, originalUrl: URL }= req
    res.status(404).json({ error, method, URL})
};

export default pathHandler;