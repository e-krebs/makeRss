import moment from "moment";
import 'moment/locale/fr';

import { RssItem } from "../../typings";

const retry = (doc: Document, win: Window, callback: (item?: RssItem) => void, nb: number): void => {
  nb++;
  setTimeout(() => {
    getRssItem(doc, win, callback);
  },
    1000 * nb);
}

export const getRssItem = (doc: Document, win: Window, callback: (item?: RssItem) => void, nb: number = 0): void => {

  try {
    console.log('I\'m here');
    const title = doc.querySelector<HTMLElement>('span[itemtype="http://schema.org/Thing"]')?.innerText;
    if (!title) return retry(doc, win, callback, nb);

    const description = doc.querySelector<HTMLElement>('article .article-wrapper.article-body')?.innerText;
    if (!description) return retry(doc, win, callback, nb);

    moment.locale('fr');
    const textDate = doc.querySelector<HTMLTimeElement>('article time')?.dateTime
    if (!textDate) return retry(doc, win, callback, nb);
    const date = moment(textDate);

    const audioUrl = doc.querySelector<HTMLAnchorElement>('article a.play-action')?.href;
    if (!audioUrl) return retry(doc, win, callback, nb);

    const item: RssItem = {
      title,
      description,
      link: win.location.href,
      date,
      audioUrl
    };
    callback(item);

  } catch (e) {
    console.warn('catched an error in asi', e);
    callback();
  }
}

