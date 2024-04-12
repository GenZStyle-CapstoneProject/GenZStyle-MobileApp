export const validateUrl = (inputUrl) => {
  // Biểu thức chính quy kiểm tra URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(inputUrl);
};
