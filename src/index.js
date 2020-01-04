import moment from 'moment';
import 'moment/locale/fr';

import { SC } from './soundcloud-player-api';
  
const soundcloudIframes = Array
  .from(document.querySelectorAll('article iframe[src]'))
  .filter(i => i.src.includes('soundcloud'));

var generateRss = () => {
  if (!soundcloudIframes) return;
  soundcloudIframes[0].id = "gk2rss";

  moment.locale('fr');
  const textDate = document
    .querySelector('article header time')
    .innerText
    .replace('h', ':')
    .replace('  ', ' ');
  const date = moment(textDate, 'DD MMMM Y à hh:mm');

  date.locale('en')
  const pubDate = date.format('dd, D MMM Y h:mm:ss');
  
  const description = Array
    .from(document.querySelectorAll('article > div p'))
    .map(i => i.innerText)
    .reduce((x, y) => `${x}\n${y}`);

  SC.Widget('gk2rss')
    .getCurrentSound(x => {

    const item =
`<item>
  <title>${x.title}</title>
  <description><![CDATA[${description}]]></description>
  <link>${window.location.href}</link>
  <guid>${window.location.href}</guid>
  <pubDate>${pubDate} GMT</pubDate>
  <enclosure type="audio/mpeg" url="${x.download_url}&client_id=LBCcHmRB8XSStWL6wKH2HPACspQlXg2P" length="${x.full_duration}"/>
</item>`;

      // copy to clipboard
    const copyFrom = document.createElement("textarea");
    copyFrom.textContent = item;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    document.body.removeChild(copyFrom);

    alert('RSS item generated and copied to clipboard!');
  });
}

if (!soundcloudIframes || soundcloudIframes.length <= 0) {
  // no soundcloud player
  chrome.extension.sendRequest('hideIcon');
} else {
  // there is a soundcloud player
  chrome.extension.sendRequest('showIcon');

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === 'generateRss') generateRss();
  });
}
