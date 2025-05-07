export const ensureAuthenticated = (req, res, next) => {
  console.log('Request user in ensureAuthenticated:', req.user);
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};