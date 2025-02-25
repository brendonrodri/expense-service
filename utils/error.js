function errorMessage(error, response, message){
  if(error){
    return response.status(500).json({error: message});
  }
}

module.exports = {
  errorMessage
}