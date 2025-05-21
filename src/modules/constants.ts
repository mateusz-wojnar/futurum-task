export enum Town {
  KRAKOW = "KRAKOW",
  WARSZAWA = "WARSZAWA",
  KATOWICE = "KATOWICE",
  WROCLAW = "WROCLAW",
  BYDGOSZCZ = "BYDGOSZCZ",
}

export const TOWN_DISPLAY_NAMES: Record<Town, string> = {
  [Town.KRAKOW]: "Kraków",
  [Town.WARSZAWA]: "Warszawa",
  [Town.KATOWICE]: "Katowice",
  [Town.WROCLAW]: "Wrocław",
  [Town.BYDGOSZCZ]: "Bydgoszcz",
};

export const KEYWORD_SUGGESTIONS = [
  "meta",
  "facebook",
  "google",
  "ads",
  "linkedin",
  "indeed",
  "close",
  "waiting",
];
