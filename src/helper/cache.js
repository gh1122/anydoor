const { cache } = require('../config/defaultConfig');

function redresRes(stats, res) {
  const { maxAge, expires, cacheControl, lastModified, etag } = cache;

  if (expires) {
    res.setHeader('Exprires', new Date(Date.now() + maxAge * 1000).toUTCString());
  }

  if (cacheControl) {
    res.setHeader('cache-control', `public,max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }

  if (etag) {
    res.setHeader('Etag', `${stats.size}-${stats.mtime}`);
  }
}

module.exports = function isFresh(stats, req, res) {
  //请求头获取信息
  redresRes(stats, res);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];

  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false;
  }

  if (etag && etag !== res.getHeader('Etag')) {
    return false;
  }
  return true;
};
