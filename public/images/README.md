# Real photos for the prototype

Drop image files into these two folders using the **exact base filenames**
below (any of `.jpg`, `.jpeg`, `.png`, `.webp` — the app tries each in turn).
Nothing else needs to change in the code: the app looks for these paths at
runtime and falls back to the current emoji/gradient automatically when a
file isn't there yet, so files can be added incrementally.

## `menu/` — one photo per menu item

| Filename (any ext) | Item |
| --- | --- |
| `m1` | Subway — 6-inch Veggie Delite Sub |
| `m2` | Subway — Chicken Teriyaki Sub Combo |
| `m3` | McDonald's — McSpicy Chicken Meal |
| `m4` | McDonald's — McAloo Tikki Combo |
| `m5` | Taco Bell — Crunchy Taco Supreme |
| `m6` | Taco Bell — Loaded Nacho Fries |
| `m7` | Wow! Momo — Chicken Steam Momo |
| `m8` | Wow! Momo — Peri Peri Fried Momo |
| `m9` | California Burrito — Chicken Burrito Bowl |
| `t1` | TiffinX — Veg Thali Express |
| `t2` | TiffinX — Filter Coffee + Sandwich |
| `t3` | TiffinX — Choco Chip Cookies |
| `t4` | TiffinX — Instant Maggi + Cheese |
| `t5` | TiffinX — Curd Rice Bowl |
| `t6` | TiffinX — Masala Chai + Rusk |

Example: `public/images/menu/m1.jpg`

## `occasions/` — one background photo per home-banner context

| Filename (any ext) | Occasion |
| --- | --- |
| `default` | For You (default home banner) |
| `exam` | Exam Eve |
| `nightshift` | Night Shift |
| `freshers` | Freshers Week |
| `fest` | Fest / Farewell |
| `latenight` | Late-Night Coffee |

Example: `public/images/occasions/exam.jpg`
