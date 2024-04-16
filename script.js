document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video");
  initVideos(videos);
});

function initAnimations() {
  let tl = gsap.timeline();
  tl.from(".row1", { x: "150%", duration: 0.5 });
  tl.from(".row2", { x: "-150%", duration: 0.5 }, "<0.3");
  tl.from(".row3", { x: "150%", duration: 0.5 }, "<0.3");
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
        handleVideoEvents(video);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", function () {
        handleVideoEvents(video);
      });
    }
  });

  function handleVideoEvents(video) {
    video.currentTime = 5;
    video.muted = true;

    if (window.innerWidth < 768) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else if (video.paused) {
              video.pause();
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
