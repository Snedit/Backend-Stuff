class APIresponse{
    constructor(statusCode, data, message="success"){
this.statusCode = statusCode;
this.message = message;
this.success = statusCode<400;
    }
}
export {APIresponse};