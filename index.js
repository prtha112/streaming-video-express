const fs = require("fs");

const videoFirstByte = (path) => {
    const bytes = path.replace(/bytes=/, "").split("-")
    return parseInt(bytes[0], 10)
}

const videoSize = (pathfile) => {
    const size = fs.statSync(pathfile).size;
    return size
}

const chunkSize = (basesize, persensize) => {
    const chunkSize = parseInt((basesize * persensize) / 100)
    return chunkSize
}

const videoEnd = (bytestart, chunksize, videosize) => {
    const end = Math.min(bytestart + chunksize, videosize - 1);
    return end 
}

const contentLength = (end, start) => {
    const contentLength = end - start + 1
    return contentLength
}

const videoStream = (start, end, videoSize, videoPath, contentLength, contentType, response) => {
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": contentType,
    };

    // HTTP Status 206 for Partial Content
    response.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    return videoStream.pipe(response);
}

module.exports = {
    videoFirstByte,
    videoSize,
    chunkSize,
    videoEnd,
    contentLength,
    videoStream
}
