document.addEventListener("DOMContentLoaded", function () {
  initVideos();
});

function initAnimations() {
  gsap.from(".video-wrapper", { scale: 0, duration: 0.3 });
}

function initVideos() {
  const videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
    let videoSrc = video.src;
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.muted = true;
        handleVideoEvents(video);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.muted = true;
      video.addEventListener("loadedmetadata", function () {
        handleVideoEvents(video);
      });
    }
  });

  function handleVideoEvents(video) {
    if (window.innerWidth < 768) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio !== 1 && !video.paused) {
              video.pause();
            } else if (video.paused) {
              video.play();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
    } else {
      video.addEventListener("mouseenter", () => {
        video.play();
      });
      video.addEventListener("mouseout", () => {
        video.pause();
      });
    }
  }
}
