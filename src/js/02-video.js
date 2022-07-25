import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onTimeSave, 1000));
function onTimeSave(timeupdate) {
  console.log(timeupdate.seconds);
  localStorage.setItem('videoplayer-current-time', timeupdate.seconds);
}

const getStorageValue = localStorage.getItem('videoplayer-current-time');
if (getStorageValue) {
  player.setCurrentTime(getStorageValue);
}
