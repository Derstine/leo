class ReturnObject {
  constructor(status, res = null, errorMessage = null) {
    this.status = status;
    this.res = res;
    this.errorMessage = errorMessage;
  }

  log() {
    console.log('Status: ', this.status);
    console.log('Response: ', this.res);      
    console.log('Error Message: ', this.errorMessage);
  }

  isSuccess() {
    return Boolean(this.status);
  }
}

module.exports = ReturnObject;