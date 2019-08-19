const { createGzip, createDeflate } = require('zlib');

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)/)) {
    return;
  } else if (acceptEncoding.match(/\bgzip/)) {
    res.setHeader('content-encoding', 'gzip');

    return rs.pipe(createGzip());
  } else if (acceptEncoding.match(/\bdeflate/)) {
    res.setHeader('content-encoding', 'deflate');
    return rs.pipe(createDeflate());
  }

  return true;
};
