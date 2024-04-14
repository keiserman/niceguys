document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video");
  initVideos(videos);
});

function initAnimations() {
  let tl = gsap.timeline();
  tl.from("[animate='top-row']", { x: "150%", duration: 0.5 });
  tl.from("[animate='middle-row']", { x: "-150%", duration: 0.5 }, "<0.3");
  tl.from("[animate='bottom-row']", { x: "150%", duration: 0.5 }, "<0.3");
  tl.from("[animate='logo1']", { y: "-150%", duration: 0.5 });
  tl.from("[animate='logo2']", { y: "150%", duration: 0.5 }, "<");
}

function initVideos(videos) {
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
    video.currentTime = 5;
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
