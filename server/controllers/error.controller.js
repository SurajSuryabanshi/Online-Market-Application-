function getErrorMessage(err) {
    console.error(err);
    return err.message || 'Something went wrong';
  }
  
  export default {
    getErrorMessage,
  };
  