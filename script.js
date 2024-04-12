document.addEventListener("DOMContentLoaded", function () {
  initVideos();
});

function initAnimations() {
  gsap.from(".video-wrapper", { scale: 0, duration: 0.3 });
}

function initVideos() {
  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    video.muted = true;

    if (window.innerWidth < 768) {
      console.log(true);
      let playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {
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
        });
      }
    }
  });
}
