export function home(req, res) {
  res.render("index", {
    title: "Homepage",
    content: "This is homepage",
    user: req.user,
  });
}

export function about(req, res) {
  res.render("about", {
    title: "About us",
    content: "This is about us",
    user: req.user,
  });
}
