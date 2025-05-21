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

export const CAMPAIGN_KEYWORDS = [
  {
    value: "meta",
    label: "Meta",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "google",
    label: "Google",
  },
  {
    value: "ads",
    label: "Ads",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "indeed",
    label: "Indeed",
  },
  {
    value: "close",
    label: "Close",
  },
  {
    value: "waiting",
    label: "Waiting",
  },
];

export const KEYWORD_SUGGESTIONS = [
  { value: "meta", label: "Meta" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "google", label: "Google" },
  { value: "ads", label: "Ads" },
  { value: "seo", label: "SEO" },
  { value: "ppc", label: "PPC" },
  { value: "analytics", label: "Analytics" },
  { value: "clicks", label: "Clicks" },
  { value: "sale", label: "Sale" },
  { value: "discount", label: "Discount" },
  { value: "offer", label: "Offer" },
  { value: "buy_now", label: "Buy Now" },
  { value: "best_price", label: "Best Price" },
  { value: "limited_time", label: "Limited Time" },
  { value: "free_shipping", label: "Free Shipping" },
  { value: "new_arrival", label: "New Arrival" },
  { value: "top_rated", label: "Top Rated" },
  { value: "trending", label: "Trending" },
  { value: "style", label: "Style" },
  { value: "tech", label: "Tech" },
  { value: "gadgets", label: "Gadgets" },
  { value: "organic", label: "Organic" },
  { value: "local", label: "Local" },
  { value: "fresh", label: "Fresh" },
];
