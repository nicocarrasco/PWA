// @ts-ignore
import YoutubeSansMedium from './YoutubeSans/youtube-sans-medium.ttf';
// @ts-ignore
import YoutubeSansBold from './YoutubeSans/youtube-sans-bold.ttf';
// @ts-ignore
import YoutubeSansLight from './YoutubeSans/youtube-sans-light.ttf';

const fonts = `
  @font-face {
    font-family: 'YoutubeSans';
    font-weight: 300;
    src: local("YoutubeSansLight"),
    url(${YoutubeSansLight}) format("truetype");
  }
  @font-face {
    font-family: 'YoutubeSans';
    font-weight: 500;
    src: local("YoutubeSansMedium"),
    url(${YoutubeSansMedium}) format("truetype");
  }
  @font-face {
    font-family: 'YoutubeSans';
    font-weight: 700;
    src: local("YoutubeSansBold"),
    url(${YoutubeSansBold}) format("truetype");
  }
  `;

export default fonts;
