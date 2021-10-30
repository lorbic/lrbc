function generateValidUrl(url) {
  if (url.startsWith("http") || url.startsWith("https") || url.startsWith("ftp")) {
  } else {
    url = "https://" + url;
  }
  return url;
}

module.exports.generateValidUrl = generateValidUrl;
