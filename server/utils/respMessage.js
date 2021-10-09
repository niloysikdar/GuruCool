const respMessage = (success, data, message) => {
  return {
    success: success,
    data: data,
    message: message,
  };
};
module.exports = respMessage;
