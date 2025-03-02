function asyncHandler(requestHandler){
  
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>{
            console.log(err);
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || 'Internal Server Error',
                
            });
            //  next(err)
            
            });
      };
}


export default asyncHandler