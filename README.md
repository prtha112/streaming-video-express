# streaming-video-express
video streaming package for express js.

## Install
```python
npm i streaming-video
```

## Usage back end
```python
const video = require('streaming-video')
...
app.get('/video', function (req, res) {
    const range = req.headers.range
    if (!range) {
        res.status(400).send("Requires Range header")
    }

    const videoPath = "./Lin_Junyi.mp4"
    const videoSize = video.videoSize(videoPath) // Get video size
    const chunkSize = video.chunkSize(videoSize, 10) // Get chunk size from total size 10%
    const start = video.videoFirstByte(range) // First byte to read
    const end = video.videoEnd(start, chunkSize, videoSize) // End byte to read
    const contentLength = video.contentLength(end, start) // Get content size
    video.videoStream(start, end, videoSize, videoPath, contentLength, "video/mp4", res) // Return stream data partial content 206
})
```

## Usage front end
```python
<video id="videoPlayer" width="650" controls muted="muted" autoplay>
    <source src="/video?vip=true&user_id=13442" type="video/mp4" /> <!-- Src for path request to back end. -->
</video>
```