;(function() {
  function CustomVideo() {
    var videoPlayer = document.getElementsByClassName('video-player')[0]
    var videoControls = document.getElementsByClassName('video-controls')[0]
    var video = document.getElementById('video')
    var progressWrap = document.getElementById('video-progress-wrap')
    var progressShadow = document.getElementById('video-progress-shadow')
    var progress = document.getElementById('video-progress')
    var isPlay = false
    function init() {
      initVideoInfo()
      controlOpacity()
      controlPaly()
      controlVolume()
      controlProgress()
    }
    init()

    function initVideoInfo() {
      var time = document.getElementById('video-time')
      video.addEventListener('loadeddata', function() {
        time.innerHTML = getTime(video.duration)
        progress.style.left = '-5px'
        progressShadow.style.width = '0px'
      })
      video.addEventListener('error', function() {
        alert('视频错误')
      })
    }

    function getTime(sec) {
      var time = [], num, timeset = [60 * 60, 60], i = 0
      while(i < 2) {
        var num = Math.floor(sec / timeset[i])
        sec %= timeset[i++]
        if (i === 1 && num === 0)
          continue
        time.push(String(num).padStart(2, 0))
      }
      time.push(Math.floor(sec).toString().padStart(2, 0))
      time = time.reduce((prev, cur) => {
        return prev + ':' + cur
      })
      return time
    }

    function controlOpacity() {
      var timer = null
      videoPlayer.addEventListener('mousemove', function() {
        clearTimeout(timer)
        videoControls.style.opacity = 1
        if (isPlay)
          timer = setTimeout(() => {
              videoControls.style.opacity = 0
          }, 1000)
      })
    }
    function controlPaly() {
      var playBtn = document.getElementById('video-play-btn')
      var playControl = document.getElementById('video-play')
      var play = '<svg t="1650174798292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2599" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#3D3D3D" p-id="2600"></path></svg>'
      var pause = '<svg t="1650175120628" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3517" width="16" height="16"><path d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z" fill="#5C5C66" p-id="3518"></path></svg>'
      
      playBtn.style.display = "block"
      playControl.innerHTML = play
      video.addEventListener('dblclick', videoPlay)
      playBtn.addEventListener('click', videoPlay)
      playControl.addEventListener('click', videoPlay)
      function videoPlay() {
        isPlay = !isPlay
        if (isPlay) {
          playBtn.style.display = "none"
          playControl.innerHTML = pause
          video.play()
        } else {
          playBtn.style.display = "block"
          playControl.innerHTML = play
          video.pause()
        }
      }
      video.addEventListener('ended', function() {
        isPlay = false
        playBtn.style.display = "block"
        playControl.innerHTML = play
      })
    }

    function controlVolume() {
      var videoMuted = document.getElementById('volume-muted')
      var volumeElem = '<svg t="1650180769994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4811" width="16" height="16"><path d="M260.256 356.576l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM670.784 720.128a32 32 0 0 1-44.832-45.664 214.08 214.08 0 0 0 64.32-153.312 213.92 213.92 0 0 0-55.776-144.448 32 32 0 1 1 47.36-43.04 277.92 277.92 0 0 1 72.416 187.488 278.08 278.08 0 0 1-83.488 198.976zM822.912 858.88a32 32 0 1 1-45.888-44.608A419.008 419.008 0 0 0 896 521.152c0-108.704-41.376-210.848-114.432-288.384a32 32 0 0 1 46.592-43.872c84.16 89.28 131.84 207.04 131.84 332.256 0 127.84-49.76 247.904-137.088 337.728z" p-id="4812"></path></svg>'
      var mutedElem = '<svg t="1650180832785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5069" width="16" height="16"><path d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m548.42 612.42a21.333333 21.333333 0 0 0 0-30.173334L840.833333 512l176.92-176.913333a21.333333 21.333333 0 1 0-30.173333-30.173334L810.666667 481.833333 633.753333 304.913333a21.333333 21.333333 0 0 0-30.173333 30.173334L780.5 512l-176.92 176.913333a21.333333 21.333333 0 0 0 30.173333 30.173334L810.666667 542.166667l176.913333 176.92a21.333333 21.333333 0 0 0 30.173333 0z" fill="#5C5C66" p-id="5070"></path></svg>'
      videoMuted.innerHTML = volumeElem
      videoMuted.addEventListener('click', function() {
        video.muted = !video.muted
        if (video.muted) {
          videoMuted.innerHTML = mutedElem
        } else {
          videoMuted.innerHTML = volumeElem
        }
      })
      
      var volumeBtn = document.getElementById('volume-btn')
      var volumeShadow = document.getElementById('volume-shadow')
      volumeBtn.addEventListener('mousedown', function(e) {
        e.preventDefault()
        volumeBtn.addEventListener('mousemove', changeVolume)

        function changeVolume(e) {
          var target = e.target
          var moveY = e.movementY + target.offsetTop
          if (moveY >= -3 && moveY <= 47) {
            target.style.top = moveY + 'px'
            volumeShadow.style.height = moveY + 3 + 'px'
            video.volume = (50 - (moveY + 3)) / 50
          }
          else
            cancelChangeVolume()
        }
        document.addEventListener('mouseup', cancelChangeVolume)
        function cancelChangeVolume() {
          volumeBtn.removeEventListener('mousemove', changeVolume)
          document.removeEventListener('mouseup', cancelChangeVolume)
        }
      })
    }

    function controlProgress() {
      var time = document.getElementById('video-curtime')
      video.addEventListener('timeupdate', updateProgress)
      function updateProgress() {
        var width = progressWrap.getBoundingClientRect().width
        width = video.currentTime / video.duration * width - 5 + 'px'
        progress.style.left = width
        progressShadow.style.width = width
        time.innerHTML = getTime(video.currentTime)
      }
      progressWrap.addEventListener('mousedown', function(e) {
        var offset = e.offsetX
        var width = e.target.offsetWidth
        progress.style.left = offset + 'px'
        progressShadow.style.width = offset + 'px'
        var curTime = offset / width * video.duration
        time.innerHTML = getTime(curTime)
        video.currentTime = curTime
      })
      progress.addEventListener('mousedown', function(e) {
        e.preventDefault()
        e.stopPropagation()
        var { ofLeft: wrapOfLeft } = getOffset(progressWrap)
        video.removeEventListener('timeupdate', updateProgress)
        document.addEventListener('mousemove', changeProgress) 
        var curTime = video.currentTime
        function changeProgress(e) {
          var width = progressWrap.getBoundingClientRect().width
          var moveX = e.clientX
          var offset = moveX - wrapOfLeft
          if (moveX >= wrapOfLeft - 5 && moveX <= wrapOfLeft + width - 5) {
            progress.style.left = offset + 'px'
            progressShadow.style.width = offset + 'px'
            curTime = (offset + 5) / width * video.duration
            time.innerHTML = getTime(curTime)
          }
        }
        
        document.addEventListener('mouseup', cancelChangeProgress)
        function cancelChangeProgress() {
          document.removeEventListener('mousemove', changeProgress)
          document.removeEventListener('mouseup', cancelChangeProgress)
          video.currentTime = curTime
          video.addEventListener('timeupdate', updateProgress)
        }
      })
    }
  }
  window.CustomVideo = CustomVideo

  function getOffset(elem) {
    var ofLeft = elem.offsetLeft
    var ofTop = elem.offsetTop
    var parent = elem.offsetParent
    while(parent) {
      ofLeft += parent.offsetLeft
      ofTop += parent.offsetTop
      parent = parent.offsetParent
    }
    return {
      ofLeft,
      ofTop
    }
  }
})()
CustomVideo()

var btn1 = document.getElementById('chooseVideo')
var btn2 = document.getElementById('confirmVideo')
btn1.addEventListener('click', function() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = "video/mp4, video/webm"
  input.click()
  input.onchange = function() {
    document.getElementById('video').src = URL.createObjectURL(input.files[0])
  }
})

btn2.addEventListener('click', function() {
  document.getElementById('video').src = document.getElementById('videoUrl').value
})