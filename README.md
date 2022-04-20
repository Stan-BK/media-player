# video-player
Learning custom ways of  media-player.
# Usage
Call global function `VideoPlay` as a constructor or function-call, it would return an origin video element object for more custom expand implementation.
```js
const video = CustomVideo({
  onloaded() {
    // video loaded handler
  },
  onerror() {
    // video error handler
  },
  rateList: [] // validated rate
})
```
