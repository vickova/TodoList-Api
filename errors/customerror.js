class CustomApIError extends Error{
    constructor(message){
        super(message)
    }
}
module.exports = CustomApIError;