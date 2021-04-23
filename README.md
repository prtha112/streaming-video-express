# streaming-video-express
video streaming package for express js.

## Install
```python
npm i streaming-video
```

## Usage
```python
const video = require('streaming-video')
...
app.get('/video', function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const videoPath = "./Lin_Junyi.mp4";
    const videoSize = video.videoSize(videoPath);
    const chunkSize = video.chunkSize(videoSize, 10)
    const start = video.videoFirstByte(range)
    const end = video.videoEnd(start, chunkSize, videoSize)
    const contentLength = video.contentLength(end, start);
    video.videoStream(start, end, videoSize, videoPath, contentLength, "video/mp4", res)
})
```