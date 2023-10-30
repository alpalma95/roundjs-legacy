import { ReactiveWC } from "../round";

export type Track = Registry[];

export interface Registry {
  component: ReactiveWC;
  event: any;
  options: {};
}
