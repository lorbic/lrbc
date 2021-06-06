function generateValidUrl(url) {
  if (url.startsWith("http") || url.startsWith("https")) {
  } else {
    url = "http://" + url;
  }
  return url;
}

module.exports.generateValidUrl = generateValidUrl;
