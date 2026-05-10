# Deployment Guide — Cal St Francis Shop

## What goes where

```
calstfrancis.github.io (your existing repo)
├── shop.html          ← ADD THIS
├── products.json      ← ADD THIS
└── img/               ← ADD your Printful mockup images here

calstfrancis-shop-backend (NEW repo on GitHub)
├── netlify.toml
├── package.json
└── netlify/functions/
    ├── create-checkout.js
    └── stripe-webhook.js
```

---

## Step 1 — Get your Printful variant IDs

1. Log into Printful → your store → Products
2. Open a product → click a colour/size variant
3. The URL or API shows the **variant ID** (a number like `4012`)
4. Fill these into `products.json` under each size in each colour's `"variants"` object
   - Replace every `0` with the real variant ID
   - If a size/colour combo doesn't exist, remove it from the object

Example filled entry:
```json
"variants": {
  "S":   4010,
  "M":   4011,
  "L":   4012,
  "XL":  4013,
  "2XL": 4014
}
```

**Tip:** Printful's API explorer at https://developers.printful.com lets you browse variant IDs.
Or: Printful Dashboard → Products → click product → open browser devtools network tab → look for `/products/{id}/variants` calls.

---

## Step 2 — Add product images

1. In Printful, go to each product → download the mockup images
2. Put them in an `img/` folder in your GitHub Pages repo
3. Update the `"image"` field in `products.json` to match, e.g.:
   ```json
   "image": "img/liberation-tee-black.jpg"
   ```
4. If you have no image yet, leave `"image": ""` — the glyph placeholder shows instead

---

## Step 3 — Deploy the Netlify backend

1. Create a new GitHub repo (e.g. `calstfrancis-shop-backend`)
2. Add these files to it:
   - `netlify.toml`
   - `package.json`
   - `netlify/functions/create-checkout.js`
   - `netlify/functions/stripe-webhook.js`
3. Push to GitHub
4. Go to https://app.netlify.com → "Add new site" → "Import an existing project"
5. Connect GitHub, select your new backend repo
6. Build settings: leave blank (no build command needed)
7. Click **Deploy**
8. Note your Netlify site URL (e.g. `https://calstfrancis-shop.netlify.app`)

---

## Step 4 — Set environment variables in Netlify

In Netlify Dashboard → your site → **Site configuration → Environment variables**, add:

| Key | Value | Where to find it |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | See Step 5 below |
| `PRINTFUL_API_KEY` | your token | Printful Dashboard → Settings → API → Generate token |

**For testing, use `sk_test_...` instead of `sk_live_...`** — Stripe has a full test mode.

---

## Step 5 — Register the Stripe webhook

1. Go to Stripe Dashboard → Developers → Webhooks → **Add endpoint**
2. Endpoint URL: `https://YOUR-NETLIFY-SITE.netlify.app/api/stripe-webhook`
3. Events to listen to: select **`checkout.session.completed`**
4. Click Add endpoint
5. Copy the **Signing secret** (starts with `whsec_`)
6. Paste it as `STRIPE_WEBHOOK_SECRET` in Netlify environment variables (Step 4)

---

## Step 6 — Update shop.html with your Netlify URL

Open `shop.html` and find this line near the bottom:

```js
const BACKEND_URL = 'https://YOUR-NETLIFY-SITE.netlify.app';
```

Replace `YOUR-NETLIFY-SITE` with your actual Netlify site name. Commit and push.

---

## Step 7 — Add Shop link to index.html

In your `index.html`, find the nav links and add:

```html
<li><a href="shop.html">Shop</a></li>
```

---

## Step 8 — Test end to end

1. In Stripe Dashboard, make sure you're in **Test mode**
2. Open your shop, add a shirt to cart, click checkout
3. Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC
4. After payment, check Netlify Functions logs (Netlify Dashboard → Functions → stripe-webhook)
5. Check Printful Dashboard → Orders — a test order should appear
6. If Printful order appears: everything works. Delete the test order in Printful.

---

## Step 9 — Go live

1. In Stripe Dashboard, switch to **Live mode**
2. Update `STRIPE_SECRET_KEY` in Netlify to your `sk_live_...` key
3. Register a new webhook endpoint in Stripe **Live mode** (repeat Step 5 in live mode)
4. Update `STRIPE_WEBHOOK_SECRET` in Netlify with the live `whsec_...`
5. Redeploy Netlify (push any small change to trigger a redeploy)

---

## Ongoing: adding or changing products

Edit `products.json` in your GitHub Pages repo:
- Add a new object to the array for a new shirt
- Update variant IDs, prices, descriptions as needed
- Commit and push — changes go live immediately

No code changes needed for product updates.

---

## Printful billing note

Printful charges **you** (your saved payment method in Printful) when each order is submitted.
Make sure your Printful account has a valid payment method before going live.
Your Stripe revenue lands in your bank account separately — Stripe pays out on a rolling basis.

---

## If something breaks

- **Checkout button does nothing / error:** Check browser console for CORS or fetch errors. Verify `BACKEND_URL` in `shop.html` matches your Netlify URL exactly.
- **Stripe webhook failing:** Check Netlify Functions logs. Common cause: wrong `STRIPE_WEBHOOK_SECRET`.
- **Printful order not created:** Check Netlify function logs for the error from Printful's API. Common cause: wrong variant ID (still `0` in products.json), or Printful API key not set.
- **Test orders in Printful:** Delete them manually — Printful won't ship test orders but they clutter your dashboard.
