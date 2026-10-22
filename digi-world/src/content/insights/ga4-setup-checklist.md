<!--article
{
  "slug": "ga4-setup-checklist",
  "title": "What to check in your GA4 setup: a 10-point checklist",
  "h1": "What to check in your GA4 setup",
  "short": "What to check in your GA4 setup",
  "topic": "Analytics",
  "description": "A plain-English checklist for Google Analytics 4: key events, data retention, internal traffic, consent, Search Console, and more.",
  "author": "Digi World",
  "date": "2026-10-22",
  "dateText": "22 October 2026",
  "cta": "Want a second pair of eyes on your setup? The free Digi World audit checks all of this and more."
}
-->
**Short answer:** Most GA4 problems come from a few settings that are easy to miss. Check that GA4 records the actions that matter to your business as key events, that your data is kept long enough, that your own visits are filtered out, and that consent is handled correctly. If these are wrong, your reports can look fine while telling you the wrong story.

Google Analytics 4 (GA4) is Google's free tool for measuring what people do on your website. Many businesses moved to it quickly in 2023 and never checked the setup. Here are ten checks you can do yourself in about an hour.

You need "Editor" or "Administrator" access to your GA4 property. The settings below are in the **Admin** area (the gear icon, bottom left).

## 1. Is GA4 installed on every page?

Open a few pages of your website, then open **Reports → Realtime** in GA4. Your visit should appear within a minute or so. If some pages don't show up, the tracking code may be missing from part of your site, such as a booking page. Google's free **Tag Assistant** shows whether the tag fires on each page.

## 2. Are your most important actions marked as key events?

GA4 records many "events": page views, scrolls, clicks, and so on. Only a few matter to your business: a contact form sent, a call button tapped, a booking made, a purchase completed. In GA4, these should be marked as **key events** (Google renamed "conversions" to "key events" in 2024).

Go to **Admin → Data display → Events** and check that your most important actions appear there and are marked as key events. If your contact form isn't tracked at all, that is the first thing to fix. Without it, you can't tell which channels bring you enquiries.

## 3. Is your data kept long enough?

By default, GA4 keeps detailed user-level data for only **2 months**. That affects the detailed reports in the **Explore** section. For a standard GA4 property, you can raise it to **14 months**.

Go to **Admin → Data collection and modification → Data retention** and set it to 14 months. This change is not retroactive, so do it as early as possible.

## 4. Are your own visits filtered out?

You, your staff, and your web developer visit your site often. Those visits are not customers, and they can distort your numbers, especially on a smaller site.

GA4 lets you define internal traffic by IP address and then filter it out:

1. Go to **Admin → Data streams**, choose your web stream, then **Configure tag settings → Define internal traffic**, and add your office IP addresses.
2. Then go to **Admin → Data collection and modification → Data filters**. The internal traffic filter starts in "Testing" mode. Change it to **Active** when you are happy with it.

This works best for fixed office connections, because home and mobile IP addresses change.

## 5. Are unwanted referrals excluded?

If your customers leave your site to pay or log in (for example through a payment provider) and then return, GA4 may record the payment site as the source of the sale. That hides the real source, such as search or email.

In your web stream's tag settings, use **List unwanted referrals** to add those domains.

## 6. Do your campaign links use UTM tags?

UTM tags are short labels added to the end of a link, such as `?utm_source=newsletter&utm_medium=email`. They tell GA4 where a visitor came from. Without them, visits from emails, PDFs, and some social apps often appear as "Direct" or "Unassigned".

Check **Reports → Acquisition → Traffic acquisition**. If a large share of your traffic is "Unassigned" or "Direct", missing or inconsistent UTM tags are a likely cause. Agree a simple naming rule (for example, always lowercase) and use it every time.

## 7. Is Search Console linked?

Google Search Console shows which searches your site appears for and how often people click. Linking it to GA4 lets you see that search data alongside what visitors did next.

Go to **Admin → Product links → Search Console links** to connect them. You need to be a verified owner in Search Console.

## 8. Is consent handled correctly?

In many countries, you need a visitor's permission before you set analytics cookies. If your site has a cookie banner, check that it actually controls GA4. Visit your site in a private browser window, decline cookies, and check that GA4 doesn't load. A banner that doesn't connect to your tracking doesn't protect you.

Google's **Consent Mode** lets GA4 adjust its behaviour based on the visitor's choice. Your banner provider or developer can confirm it is set up. Privacy rules differ by country, so check what applies to you.

## 9. Do cross-domain journeys stay connected?

If customers move between two of your domains (for example from your main site to a separate booking site), GA4 may count them as two different visitors. Under your web stream's tag settings, **Configure your domains** lets you list all the domains that belong to one journey.

## 10. Does someone check the numbers regularly?

A correct setup can still break: a website update can remove the tracking code, or a new form can stop sending its event. Once a month, check that your key events are still recorded and that no traffic source has suddenly dropped to zero. GA4's **DebugView** (under **Admin → Data display**) is useful for testing changes as you make them.

## What to do next

If everything checks out, your GA4 data is in good shape. If several checks fail, fix the key events first (point 2).

## Frequently asked questions

**How long does it take to fix a GA4 setup?**
Simple fixes, such as data retention or Search Console linking, take minutes. Setting up reliable key events for forms and calls can take a few hours to a few days, depending on how your site is built.

**Can GA4 show data from before I fixed it?**
No. Most changes only affect new data, so check your setup early.
