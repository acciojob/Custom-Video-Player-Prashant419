document.addEventListener('DOMContentLoaded', function () {
  // Selecting elements
  const player = document.querySelector('.player');
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggleBtn = player.querySelector('.toggle');
  const volumeSlider = player.querySelector('input[name="volume"]');
  const playbackSpeedSlider = player.querySelector('input[name="playbackRate"]');
  const skipButtons = player.querySelectorAll('[data-skip]');

  // Functions
  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggleBtn.textContent = icon;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // Event listeners
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggleBtn.addEventListener('click', togglePlay);

  skipButtons.forEach(button => button.addEventListener('click', skip));

  volumeSlider.addEventListener('input', handleRangeUpdate);
  playbackSpeedSlider.addEventListener('input', handleRangeUpdate);

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
});