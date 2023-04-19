export const isAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (
    (req.user && req.user.role === "admin") ||
    (req.user && req.user.role === "masteradmin")
  ) {
    next();
  }
};

export const isMasterAdmin = (req, res, next) => {
  if (req.user && req.user.role === "masteradmin") {
    next();
  }
};

export const isAgent = (req, res, next) => {
  if (req.user && req.user.role === "agent") {
    next();
  }
};
