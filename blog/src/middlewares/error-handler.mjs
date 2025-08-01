export default (error, req, res, next) => {
  console.log(error.message);
  res.status(500).send("Server error");
};
