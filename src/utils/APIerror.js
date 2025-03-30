class APIerror extends Error{
    constructor(
        statusCode,
        message =  "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null; //read the docs for more info
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor); // read docs for more info
        }
    }
}

export {APIerror};