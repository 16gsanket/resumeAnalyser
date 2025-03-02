class apiError extends Error{
    constructor(statusCode , message = "internal server error" , errors=[]){
        super(message)
        this.statusCode = statusCode;
        this.message = message
        this.errors = errors
        this.success = false
    }
}

export default apiError