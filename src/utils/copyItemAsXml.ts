import { RssItem } from "../typings";
import { copyToClipboard } from "./clipboard";

export const copyItemAsXml = (item: RssItem): void => {
  item.date.locale('en');
  const itemXml =
    `<item>
    <title>${item.title}</title>
    <description><![CDATA[${item.description}]]></description>
    <link>${item.link}</link>
    <guid>${item.link}</guid>
    <pubDate>${item.date.format('dd, D MMM Y H:mm:ss')} GMT</pubDate>
    <enclosure type="audio/mpeg" url="${item.audioUrl}" length="${item.audioLength ?? 0}"/>
  </item>`;
  copyToClipboard(itemXml);
  alert('RSS item generated and copied to clipboard!');
}
