import { Moment } from "moment";

export interface RssItem {
  title: string;
  description: string;
  link: string;
  date: Moment;
  audioUrl: string;
  audioLength?: number;
}
