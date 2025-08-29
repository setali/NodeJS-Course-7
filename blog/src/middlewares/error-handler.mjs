export default (error, req, res, next) => {
  console.log(error);

  const status = error.status || 500;
  let content,
    stack = "";

  if (process.env.NODE_ENV === "development") {
    stack = error.stack;
    content = error.message;
  } else {
    content = status < 500 ? error.message : "Server Error";
  }

  if (req.url.startsWith("/api")) {
    res.status(status).json({
      title: `Error ${status}`,
      content,
      stack,
    });
  } else {
    res.status(status).render("error", {
      title: `Error ${status}`,
      content,
      stack,
    });
  }
};
