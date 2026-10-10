// ============================================================================
// CONTENT CONFIG - the ONLY file he needs to touch.
// Structure:
//   AVATARS  - the cast section: one prompt each, 3 models' generated avatars
//   PRODUCTS - per category: emma's 3 prompts+images first, then jake's 3.
//              UGC rounds (people) first, product-only rounds (perfume) last.
// Image conventions:
//   "" in any shot field renders the "waiting for upload" sticky placeholder.
//   competitor shots live in /uploads/gemini|chatgpt/, ours in /images/.
// ============================================================================

export type Shot = {
  gemini: string;   // /uploads/gemini/... or "" for placeholder
  chatgpt: string;  // /uploads/chatgpt/... or "" for placeholder
  ours: string;     // /images/... or "" for placeholder
};

export type Scenario = {
  prompt: string;   // the exact prompt used, shown above the 3 outputs
  shots: Shot;
};

export type AvatarKey = "emma" | "jake";

export type AvatarSpec = {
  key: AvatarKey;
  name: string;       // "emma"
  prompt: string;     // the exact avatar-generation prompt
  shots: Shot;        // the 3 models' generated avatars
};

export type Product = {
  slug: string;
  round: string;      // "01"
  brand: string;      // NORDMARK
  title: string;      // "the watch"
  verdict: string;    // one-line verdict, may contain *highlight* markers
  kind: "ugc" | "product";
  status?: "live" | "midnight";
  emma: Scenario[];   // ugc rounds: exactly 3
  jake: Scenario[];   // ugc rounds: exactly 3
  solo?: Shot;        // product-only rounds (perfume): one showcase trio
  tags: string[];
};

// ---------------------------------------------------------------------------
// THE CAST - avatar creation prompts + the three models' outputs
// ---------------------------------------------------------------------------
export const AVATARS: AvatarSpec[] = [
  {
    key: "emma",
    name: "emma",
    prompt:
      "Candid photo taken on an iPhone, a 25 year old American woman, AVERAGE-LOOKING face, not model-like, shoulder-length wavy brown hair slightly frizzy and unstyled, no makeup, faint blemishes on skin, tired friendly eyes, wearing a slightly wrinkled oversized beige sweater, sitting on an unmade bed in a normal apartment, cluttered nightstand with a water bottle and books behind, ordinary flat indoor light, amateur selfie framing, film grain, realistic skin texture with pores, looks like an ordinary girl's casual selfie",
    shots: {
      gemini: "/uploads/gemini/avatar-emma.avif",
      chatgpt: "/uploads/chatgpt/avatar-emma.avif",
      ours: "/images/avatar-emma.avif",
    },
  },
  {
    key: "jake",
    name: "jake",
    prompt:
      "Candid photo taken on an iPhone, a 26 year old American man, AVERAGE-LOOKING face, not model-like, slightly asymmetric features, flat messy brown hair with no styling, light patchy stubble, faint acne marks on cheeks, tired eyes, wearing a slightly wrinkled plain white t-shirt, standing in a normal apartment bedroom with a cluttered wardrobe and unmade bed, ordinary flat indoor light, no flattering lighting, amateur selfie framing, film grain, realistic skin texture, looks like an ordinary guy's casual selfie",
    shots: {
      gemini: "/uploads/gemini/avatar-jake.avif",
      chatgpt: "/uploads/chatgpt/avatar-jake.avif",
      ours: "/images/avatar-jake.avif",
    },
  },
];

// ---------------------------------------------------------------------------
// THE ROUNDS
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    slug: "watch",
    round: "01",
    brand: "NORDMARK",
    title: "the watch",
    verdict: "same face in every frame, dial readable, nothing posed - *personal agent takes the round.*",
    kind: "ugc",
    status: "live",
    emma: [
      {
        prompt:
          "The same woman from the reference selfie, face clearly visible, gym mirror selfie holding phone in one hand, wearing this exact watch on the other wrist raised slightly, oversized grey sweatshirt, messy bun, gym equipment blurred behind, harsh tube-light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-emma-1.avif",
          chatgpt: "/uploads/chatgpt/watch-emma-1.avif",
          ours: "/images/watch-emma-1-gym.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, sitting at a café table laughing looking away from camera, this exact watch visible on the wrist resting near a latte, photo taken by a friend, slight blur, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-emma-2.avif",
          chatgpt: "/uploads/chatgpt/watch-emma-2.avif",
          ours: "/images/watch-emma-2-cafe.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, sitting at a restaurant table mid-conversation, this exact watch on the wrist holding a water glass, warm dim lighting, friend's phone photo, slight motion blur, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-emma-3.avif",
          chatgpt: "/uploads/chatgpt/watch-emma-3.avif",
          ours: "/images/watch-emma-3-dinner.avif",
        },
      },
    ],
    jake: [
      {
        prompt:
          "The same man from the reference selfie, face clearly visible, gym mirror selfie holding phone in one hand, wearing this exact watch on the other wrist, wrinkled grey t-shirt, gym equipment blurred behind, harsh tube-light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-jake-1.avif",
          chatgpt: "/uploads/chatgpt/watch-jake-1.avif",
          ours: "/images/watch-jake-1-gym.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, sitting at a café table laughing looking away from camera, this exact watch visible on the wrist resting near a coffee mug, photo taken by a friend, slight blur, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-jake-2.avif",
          chatgpt: "/uploads/chatgpt/watch-jake-2.avif",
          ours: "/images/watch-jake-2-cafe.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, walking on a sunny street with a backpack, this exact watch on the wrist, photo taken by a friend from slightly behind, motion in hair, hard daylight, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/watch-jake-3.avif",
          chatgpt: "/uploads/chatgpt/watch-jake-3.avif",
          ours: "/images/watch-jake-3-street.avif",
        },
      },
    ],
    tags: ["street", "candid", "product close-up"],
  },
  {
    slug: "headphones",
    round: "02",
    brand: "AURIX",
    title: "the headphones",
    verdict: "brand mark locked to the headband, frizz over the band, zero wig energy - *personal agent.*",
    kind: "ugc",
    status: "live",
    emma: [
      {
        prompt:
          "The same woman from the reference selfie, face visible, wearing this exact headphone around her neck, sitting at a desk with a laptop and notebook, looking at the screen NOT at camera, candid iPhone photo, film grain, indoor light",
        shots: {
          gemini: "/uploads/gemini/headphones-emma-1.avif",
          chatgpt: "/uploads/chatgpt/headphones-emma-1.avif",
          ours: "/images/hp-emma-1-desk-v3.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, wearing this exact headphone over her ears, sitting by a café window with a coffee, looking outside, daylight, photo taken by a friend, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/headphones-emma-2.avif",
          chatgpt: "/uploads/chatgpt/headphones-emma-2.avif",
          ours: "/images/hp-emma-2-cafe.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, walking on a street wearing this exact headphone, frizzy hair over the headband, looking away from camera, sunny day, friend's phone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/headphones-emma-3.avif",
          chatgpt: "/uploads/chatgpt/headphones-emma-3.avif",
          ours: "/images/hp-emma-3-street.avif",
        },
      },
    ],
    jake: [
      {
        prompt:
          "The same man from the reference selfie, face visible, wearing this exact headphone around his neck, sitting at his cluttered desk, looking at the laptop screen NOT at camera, candid iPhone photo, film grain, indoor light",
        shots: {
          gemini: "/uploads/gemini/headphones-jake-1.avif",
          chatgpt: "/uploads/chatgpt/headphones-jake-1.avif",
          ours: "/images/hp-jake-1-desk-v2.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, wearing this exact headphone over his ears, sitting by a train window, looking outside, daylight, photo taken by a friend, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/headphones-jake-2.avif",
          chatgpt: "/uploads/chatgpt/headphones-jake-2.avif",
          ours: "/images/hp-jake-2-train-v2.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, walking on a street wearing this exact headphone, looking away from camera, sunny day, friend's phone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/headphones-jake-3.avif",
          chatgpt: "/uploads/chatgpt/headphones-jake-3.avif",
          ours: "/images/hp-jake-3-street.avif",
        },
      },
    ],
    tags: ["desk", "logo placement", "natural light"],
  },
  {
    slug: "honey",
    round: "03",
    brand: "WILDFLOWER",
    title: "the honey",
    verdict: "the drip folds like real honey, not water - *personal agent, easily.*",
    kind: "ugc",
    status: "live",
    emma: [
      {
        prompt:
          "The same woman from the reference selfie, face visible, drizzling honey from this exact jar onto toast at a kitchen table, looking at the toast NOT at camera, morning light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-emma-1.avif",
          chatgpt: "/uploads/chatgpt/honey-emma-1.avif",
          ours: "/images/honey-emma-1-toast.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, stirring honey into a mug of tea with this exact jar open beside, cozy kitchen evening light, looking at the mug, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-emma-2.avif",
          chatgpt: "/uploads/chatgpt/honey-emma-2.avif",
          ours: "/images/honey-emma-2-tea.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, holding this exact honey jar showing it to the camera at a farmers market stall, sunny outdoor light, friend's phone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-emma-3.avif",
          chatgpt: "/uploads/chatgpt/honey-emma-3.avif",
          ours: "/images/honey-emma-3-market.avif",
        },
      },
    ],
    jake: [
      {
        prompt:
          "The same man from the reference selfie, face visible, holding this exact honey jar reading the label in a kitchen, morning light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-jake-1.avif",
          chatgpt: "/uploads/chatgpt/honey-jake-1.avif",
          ours: "/images/honey-jake-1-kitchen.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, spreading honey on a pancake stack with this exact jar beside, weekend breakfast table, looking at the food NOT at camera, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-jake-2.avif",
          chatgpt: "/uploads/chatgpt/honey-jake-2.avif",
          ours: "/images/honey-jake-2-pancakes.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, adding honey to a protein smoothie bowl at a kitchen counter, gym bag in background, morning light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/honey-jake-3.avif",
          chatgpt: "/uploads/chatgpt/honey-jake-3.avif",
          ours: "/images/honey-jake-3-smoothie.avif",
        },
      },
    ],
    tags: ["kitchen", "thick ribbon", "morning light"],
  },
  {
    slug: "pillow",
    round: "04",
    brand: "CLOUDREST",
    title: "the pillow",
    verdict: "rumpled sheets, real yawn, zero hotel-ad polish - *personal agent.*",
    kind: "ugc",
    status: "live",
    emma: [
      {
        prompt:
          "The same woman from the reference selfie, face visible, lying on this exact pillow in bed, eyes closed with a relaxed smile, morning light, photo taken by someone from the side, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-emma-1.avif",
          chatgpt: "/uploads/chatgpt/pillow-emma-1.avif",
          ours: "/images/pillow-emma-1-lying.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, hugging this exact pillow sitting up in bed, messy hair, sleepy eyes, morning light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-emma-2.avif",
          chatgpt: "/uploads/chatgpt/pillow-emma-2.avif",
          ours: "/images/pillow-emma-2-hugging.avif",
        },
      },
      {
        prompt:
          "The same woman from the reference selfie, face visible, fluffing/adjusting this exact pillow while making the bed, looking at the pillow, daylight, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-emma-3.avif",
          chatgpt: "/uploads/chatgpt/pillow-emma-3.avif",
          ours: "/images/pillow-emma-3-fluffing.avif",
        },
      },
    ],
    jake: [
      {
        prompt:
          "The same man from the reference selfie, face visible, lying on this exact pillow in bed scrolling phone, evening lamp light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-jake-1.avif",
          chatgpt: "/uploads/chatgpt/pillow-jake-1.avif",
          ours: "/images/pillow-jake-1-phone.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, waking up stretching on this exact pillow, messy hair, morning light, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-jake-2.avif",
          chatgpt: "/uploads/chatgpt/pillow-jake-2.avif",
          ours: "/images/pillow-jake-2-stretch.avif",
        },
      },
      {
        prompt:
          "The same man from the reference selfie, face visible, tossing this exact pillow onto a freshly made bed, looking at the bed, daylight, candid iPhone photo, film grain",
        shots: {
          gemini: "/uploads/gemini/pillow-jake-3.avif",
          chatgpt: "/uploads/chatgpt/pillow-jake-3.avif",
          ours: "/images/pillow-jake-3-toss.avif",
        },
      },
    ],
    tags: ["bedroom", "rumpled", "candid"],
  },
  {
    slug: "perfume",
    round: "05",
    brand: "VELOUR",
    title: "the perfume",
    verdict: "product-only round - and the bottle still lands on the same two faces. *personal agent.*",
    kind: "product",
    status: "live",
    emma: [],
    jake: [],
    solo: {
      gemini: "/uploads/gemini/perfume-1.avif",
      chatgpt: "/uploads/chatgpt/perfume-1.avif",
      ours: "/images/perfume-emma-1-spray.avif",
    },
    tags: ["vanity", "amber glass", "velour"],
  },
];

// Full reel: every generated image, used by the gallery clothesline.
export const REEL: { src: string; caption: string }[] = [
  { src: "/images/honey-emma-1-toast.avif", caption: "honey drizzle" },
  { src: "/images/honey-jake-2-pancakes.avif", caption: "pancakes" },
  { src: "/images/hp-emma-2-cafe.avif", caption: "aurix, cafe" },
  { src: "/images/hp-jake-2-train-v2.avif", caption: "aurix, train" },
  { src: "/images/pillow-emma-1-lying.avif", caption: "dozing" },
  { src: "/images/pillow-jake-1-phone.avif", caption: "doomscroll" },
  { src: "/images/honey-emma-2-tea.avif", caption: "evening tea" },
  { src: "/images/hp-emma-3-street.avif", caption: "street" },
  { src: "/images/pillow-emma-3-fluffing.avif", caption: "bed-making" },
  { src: "/images/honey-jake-3-smoothie.avif", caption: "smoothie" },
  { src: "/images/hp-jake-3-street.avif", caption: "street 2" },
  { src: "/images/pillow-jake-3-toss.avif", caption: "pillow toss" },
  { src: "/images/watch-emma-2-cafe.avif", caption: "nordmark, cafe" },
  { src: "/images/watch-jake-3-street.avif", caption: "street check" },
  { src: "/images/watch-emma-1-gym.avif", caption: "gym mirror" },
  { src: "/images/watch-jake-2-cafe.avif", caption: "morning coffee" },
];

export const TICKER = ["Gemini", "ChatGPT", "Personal Agent"];
