import moment from "moment";
import 'moment/locale/fr';

import { SC } from '../../soundcloud-player-api';
import { RssItem } from "../../typings";

export const getRssItem = (doc: Document, win: Window, callback: (item?: RssItem) => void): void => {
  try {
    const soundcloudIframes = Array
      .from(doc.querySelectorAll<HTMLIFrameElement>('article iframe[src]'))
      .filter((i: HTMLIFrameElement) => i.src.includes('soundcloud'));

    if (!soundcloudIframes || !doc) {
      callback();
      return;
    }
    soundcloudIframes[0].id = "gk2rss";

    moment.locale('fr');
    const textDate = doc
      .querySelector<HTMLElement>('article header time')
      ?.innerText
      .replace('h', ':')
      .replace('  ', ' ');
    const date = moment(textDate, 'DD MMMM Y à HH:mm');

    const description = Array
      .from(doc.querySelectorAll<HTMLElement>('article > div p'))
      .map(i => i.innerText)
      .reduce((x, y) => `${x}\n${y}`);

    SC.Widget('gk2rss')
      .getCurrentSound((x: any): void => {
        const item: RssItem = {
          title: x.title,
          description,
          link: win.location.href,
          date,
          audioUrl: `${x.download_url}&client_id=LBCcHmRB8XSStWL6wKH2HPACspQlXg2P`,
          audioLength: x.full_duration
        };
        callback(item);
      });
  } catch (e) {
    console.warn('catched an error in gamekult', e);
    callback();
  }
}
