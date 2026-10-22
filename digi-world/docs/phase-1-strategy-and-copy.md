# Digi World — Phase 1: Strategy and Copy

Status: **for your approval**. No design or code has been changed. The current live site stays as it is until Phase 3.

Anything in `[PLACEHOLDER: …]` is a fact only you can supply. The copy is written to read correctly once each is filled in.

---

## 0. Assumptions (correct any of these when you approve)

| # | Assumption | Why it matters |
|---|---|---|
| A1 | **Ideal client:** owner-led small and mid-sized businesses that already have a website but can't tell how well it performs. (You left this as a placeholder, so I used your example.) | Shapes every headline and the "Who it's for" sections. |
| A2 | **Hosting stays on GitHub Pages.** Netlify Forms only works on Netlify, so the forms will use **Formspree**, delivering to wealthop202@gmail.com. | Sets the form setup steps in Phase 3. If you move to Netlify, we can switch to Netlify Forms instead. |
| A3 | **Public email:** until you supply a domain email, the site shows a contact form and no public address. wealthop202@gmail.com is used only as the place form submissions are delivered. | Your brief says not to display the Gmail address if a domain email exists. Showing no address until then avoids a free-mail address on a premium site. |
| A4 | **"We" voice.** The copy says "we" and makes no claim about team size. | No invented team. Change it to "I" if you'd prefer a solo-consultant voice. |
| A5 | **Free or paid audit:** unknown, so the audit copy has a placeholder and works either way. | Decides the audit page headline and FAQ. |
| A6 | **Tools:** I list the tools a consultancy like this usually uses, all marked "confirm". None will be published until you confirm them. | Your brief says to name only tools you confirm. |

---

## 1. Positioning, headlines, tone

### Positioning statement

> For owner-led small and mid-sized businesses that have a website but can't tell what it is doing for them, Digi World is a digital growth consultancy that starts with measurement. Instead of selling a standard package, we review your own data first, then recommend only the work that data supports, across search, AI answers, analytics, and conversion.

### Headline options

**Option A (recommended)**
- **Headline:** Know what's working. Fix what isn't.
- **Subheadline:** Digi World measures how your website performs today, then gives you a clear plan to get more of the right visitors and turn more of them into customers.
- **Why it's recommended:** it is short and concrete, and it states the measure-first difference without a claim we can't prove.

**Option B**
- **Headline:** Growth decisions based on your data, not guesswork.
- **Subheadline:** We start by measuring your website, your search visibility, and how visitors behave. Then we recommend the few changes most likely to make a difference.

**Option C**
- **Headline:** Turn website noise into clear next steps.
- **Subheadline:** Traffic reports, rankings, AI answers, contact forms. We sort out which numbers matter for your business and show you what to do first.
- **Note:** this one ties directly to the "noise into signal" design idea in Phase 2.

### Tone of voice

Digi World writes like a calm expert explaining something across a desk: short sentences, plain words, and specific nouns instead of big promises. We say what we will do, what we won't do, and what we don't know yet. We never inflate results, borrow hype, or make the reader feel behind.

| Do | Don't |
|---|---|
| "We check whether GA4 records your enquiries correctly." | "We unlock the full power of your analytics." |
| "Most clients start with an audit. It shows what to fix first." | "Supercharge your growth with our game-changing audit!" |
| "No one can guarantee rankings. We can show you what changed and why." | "Get to #1 on Google, guaranteed." |
| "AI tools such as ChatGPT now answer questions directly." | "The AI revolution is here and you can't afford to miss it." |

**Banned words:** unlock, supercharge, game-changing, cutting-edge, revolutionary, leverage, synergy, seamless, best-in-class, skyrocket, guarantee (except to say we don't give one).

---

## 2. Sitemap

**Header navigation (6 items plus the audit button):** Services · Audit · Process · Insights · About · Contact · **[Request a Website Audit]**

The logo links to Home. The footer adds Privacy, Terms, and a "Book a Consultation" link. Case Studies, Thank-you, and 404 are not in the navigation.

| Page | URL | Goal | Primary CTA | Section order |
|---|---|---|---|---|
| **Home** | `/` | Explain what we do and who it's for in 10 seconds; send people to the audit | Request a Website Audit | 1. Hero (H1, subheadline, audit button, "Book a Consultation" link) → 2. Who it's for / not for → 3. The problem: too much data, not enough answers → 4. How we're different: measure first → 5. Services overview (8 cards) → 6. Four-step process → 7. Your first 30 days → 8. Inside the audit (outline preview) → 9. FAQ (5 questions) → 10. Closing CTA band |
| **Audit** | `/audit/` | Turn interest into an audit request | Request my audit (form on page) | 1. Hero → 2. What we review (6 areas) → 3. Sample report outline → 4. What you receive → 5. What we need from you → 6. Timeline → 7. Cost → 8. What happens after → 9. Audit FAQ → 10. Request form |
| **Services** | `/services/` | Let buyers find their problem and see the deliverables | Request a Website Audit | 1. Hero with jump links → 2. Eight service sections (anchors) → 3. Ways to work with us (Audit / Project / Ongoing) → 4. In scope / not in scope → 5. FAQ → 6. CTA band |
| **Our Process** | `/process/` | Build trust through method; this is also the methodology page | Request a Website Audit | 1. Hero → 2. Four steps, each with "you provide / you receive" → 3. How we measure (methodology rules) → 4. Tools we use → 5. Your first 30 days → 6. How we report → 7. CTA band |
| **Insights** | `/insights/` + 3 articles | Show expertise by being useful; capture search and AI-answer traffic | Request a Website Audit (end of each article) | Index: hero → 3 article cards. Article: H1 → short answer → contents → sections → FAQ → CTA |
| **About** | `/about/` | Show the people and principles behind the work | Book a Consultation | 1. Hero → 2. Why we work this way → 3. Principles → 4. Founder (placeholders) → 5. Who we work with → 6. CTA |
| **Contact** | `/contact/` | Capture general enquiries and consultation requests | Send message (form) | 1. Hero → 2. Form → 3. Side panel: booking note, response time, privacy |
| **Thank-you** | `/thank-you/` (noindex) | Confirm the request; set expectations | Read an article while you wait | Confirmation → what happens next (3 steps) → suggested reading |
| **404** | `/404.html` | Recover lost visitors | Request a Website Audit | Message → links to Home, Services, Audit |
| **Privacy** | `/privacy/` | Legal transparency (draft, needs legal review) | none | Draft policy |
| **Terms** | `/terms/` | Legal (draft, needs legal review) | none | Draft terms |
| **Case Studies** | `/case-studies/` (hidden, noindex, not linked) | Ready to switch on later | Request a Website Audit | Template: challenge → approach → outcome |

---

## 3. Audit offer (full page copy)

**Page title (SEO):** Website Audit: GA4, SEO, AI Search and Conversion Review | Digi World
**Meta description:** A Digi World website audit reviews your analytics, technical SEO, content, AI-answer readiness, and conversion path, then gives you a prioritised list of fixes.

**H1:** A website audit that tells you what to fix first

**Subheadline:** We review your analytics, search visibility, content, and conversion path. You get a clear report that ranks every issue by how much it matters and how hard it is to fix.

**Button:** Request my audit
**Note under the button:** [PLACEHOLDER: "Free for qualifying businesses" / "Fixed fee of [amount]"] · Report delivered in [PLACEHOLDER: e.g. 5–10 working days]

### What we review

1. **GA4 setup and data quality:** whether your analytics records the actions that matter (enquiries, calls, sales) and whether you can trust the numbers.
2. **Technical SEO:** whether search engines can find, crawl, and index your important pages. We also look at speed, mobile use, and errors.
3. **On-page SEO:** whether each key page clearly matches what people search for, with good titles, headings, and internal links.
4. **Content and AI-answer readiness (AEO and GEO):** whether your pages answer real customer questions clearly enough to be shown by search engines, voice assistants, and AI tools.
5. **Conversion path:** how easy it is for a visitor to understand your offer, trust you, and contact you or buy. We look at forms, calls to action, and mobile use.
6. **Tracking of marketing channels:** whether you can tell which channels (search, social, email, ads) bring visitors who turn into customers.

### Sample report outline

*This is the structure of the report. Your findings will be specific to your site.*

1. Summary: the five most important findings, in plain language
2. Your baseline: the key numbers today, so we can measure change later
3. Analytics and tracking findings
4. Technical SEO findings
5. On-page and content findings
6. AI-answer readiness (AEO/GEO) findings
7. Conversion path findings
8. Prioritised action list: each fix ranked by impact and effort, with who should do it
9. Suggested next steps

### What you receive

- A written report, about [PLACEHOLDER: e.g. 15–25 pages], in plain language
- A prioritised action list you can share with your team or developer
- A [PLACEHOLDER: e.g. 45-minute] video call to walk through the findings and answer questions
- **Delivery:** [PLACEHOLDER: e.g. within 10 working days of receiving access]

### What we need from you

- Your website address and your main business goal (for example: more enquiries, more sales, more bookings)
- Read-only access to Google Analytics 4 and Google Search Console, if you have them. Don't worry if you don't: we will note it in the report.
- 20 minutes to answer a short questionnaire about your customers and offer

### Cost

[PLACEHOLDER: choose one]
- **If free:** "The audit is free for businesses that meet our criteria: [PLACEHOLDER: criteria, e.g. an existing website with some monthly traffic]. There is no obligation to work with us afterwards."
- **If paid:** "The audit is a fixed fee of [PLACEHOLDER: amount and currency]. You keep the report and action list whether or not you work with us afterwards."

### What happens after

1. We send the report and book the walkthrough call.
2. You decide what to do. You can fix things yourself, give the list to your developer, or ask us for a proposal.
3. If you ask us, we send a written proposal with scope, timeline, and cost. There is no pressure and no automatic follow-on contract.

### Audit FAQ

- **How long does the audit take?** About [PLACEHOLDER: e.g. 5–10 working days] from when we receive access.
- **Do I need GA4 already?** No. If you don't have it, or it isn't set up correctly, that becomes one of the findings.
- **Will you change anything on my website?** No. The audit only reads data. Nothing on your site changes unless you ask us to make changes later.
- **Is my data kept private?** Yes. We use read-only access, we don't share your data, and you can remove our access at any time. [PLACEHOLDER: confirm whether you sign NDAs on request]

### Form heading

**Request your website audit**
Fields: Name · Email · Company · Website URL · What would you most like to improve? (the service list) · Anything else we should know? (optional) · Consent checkbox
**Button:** Request my audit
**Privacy line:** We use your details only to reply to your request. See our privacy policy.

---

## 4. Ways to work with us

No prices are shown until you supply them.

**1. Audit**
- **What it is:** a one-off review of your website, analytics, search visibility, and conversion path.
- **Best for:** businesses that want a clear picture before spending more.
- **Output:** a report, a prioritised action list, and a walkthrough call.

**2. Project**
- **What it is:** a defined piece of work with a fixed scope and timeline, for example rebuilding your GA4 setup, fixing technical SEO issues, or improving a key landing page.
- **Best for:** businesses that know what needs fixing and want it done properly.
- **Output:** the agreed changes, documented, plus a before-and-after measurement.

**3. Ongoing support**
- **What it is:** a monthly cycle of measure, improve, and report.
- **Best for:** businesses that want steady improvement and someone watching the numbers.
- **Output:** agreed monthly work, a plain-language report, and a review call.
- **Notice period:** [PLACEHOLDER: e.g. one month's notice; confirm]

---

## 5. Buyer FAQ (8 questions)

These appear on Home (5) and Services (all 8), and they generate FAQPage structured data.

1. **How long does it take to see results?**
   It depends on the work. Fixes to tracking and conversion can show an effect within weeks. SEO and AI-answer visibility usually take several months, because search engines and AI tools need time to notice changes. We agree a realistic timeline at the start and measure against it.

2. **What do you need from me to get started?**
   Your website address, your main business goal, and read-only access to Google Analytics 4 and Google Search Console if you have them. We also ask you to answer a short questionnaire about your customers.

3. **How do you report progress?**
   You get a short written report [PLACEHOLDER: e.g. monthly] that shows what we did, what changed, and what we recommend next. It is written in plain language, with the numbers explained.

4. **Who owns the accounts and data?**
   You do. Analytics, Search Console, and advertising accounts stay in your business's name. We work with access you grant and can remove at any time. If we stop working together, you keep everything.

5. **Can you work with businesses in other time zones?**
   Yes. Most of our work is done in writing and shared documents, so it doesn't depend on being online at the same time. We schedule calls in hours that overlap with yours. We are based in [PLACEHOLDER: time zone].

6. **What don't you do?**
   We don't guarantee rankings or revenue, buy links, post fake reviews, or use tactics that break search engine rules. [PLACEHOLDER: confirm other exclusions, e.g. "We don't build new websites from scratch, but we work with your developer."]

7. **How do I start?**
   Request a website audit. It gives you, and us, a clear picture of where you stand. If you'd rather talk first, book a consultation.

8. **How do you handle confidentiality?**
   We treat everything you share as confidential. We use read-only access where possible, don't share your data with anyone else, and don't name you as a client without written permission. [PLACEHOLDER: confirm "We are happy to sign a non-disclosure agreement."]

---

## 6. Full page copy

**Reading level:** short sentences and common words, aimed at grades 6–8. Unavoidable terms (GA4, SEO, GEO, AEO) are explained the first time they appear. Measured grade levels are in the appendix.

### 6.1 Home

**SEO title:** Digi World | Digital growth consultancy: SEO, GA4, AI search and conversion
**Meta description:** Digi World helps small and mid-sized businesses get more of the right visitors and more enquiries. We measure first, then recommend. Start with a website audit.

**Hero**
- **Eyebrow:** Digital growth consultancy
- **H1:** Know what's working. Fix what isn't.
- **Subheadline:** Digi World measures how your website performs today, then gives you a clear plan to get more of the right visitors and turn more of them into customers.
- **Buttons:** [Request a Website Audit] · Book a Consultation →

**Who it's for**
- **H2:** Built for businesses with a website but no clear answers
- **For you if:**
  - You run or market a small or mid-sized business, locally or in several countries.
  - You have a website, but you can't say how many enquiries or sales it brings in.
  - You get reports full of numbers but no clear next step.
- **Probably not for you if:**
  - You don't have a website yet.
  - You want guaranteed rankings or a quick trick.

**The problem**
- **H2:** Too much data. Not enough answers.
- **Body:** Analytics dashboards, ranking reports, ad platforms, and now AI search tools all produce numbers. Most of it is noise. The hard part is knowing which few numbers matter for your business, and what to change because of them.

**How we're different**
- **H2:** We measure first. Then we recommend.
- **Body:** Many agencies start with a standard package. We start with your own data. We check that your tracking works, find where visitors come from and where they leave, and only then suggest changes. That way, every recommendation is tied to evidence from your business, and we can show you whether it worked.
- **Three short points:**
  - **Your data, not a template:** advice is based on what your visitors actually do.
  - **Fewer, better changes:** we rank fixes by impact and effort, so you start with what matters.
  - **Honest reporting:** you see what changed, including what didn't work.

**Services overview**
- **H2:** What we help with
- **Intro:** Eight services that work best together. Most clients start with an audit, which shows which ones you need.

| Service | Card text |
|---|---|
| Digital marketing | Campaigns across search, social, and email, aimed at the customers you want and measured against clear goals. |
| GA4 analytics and measurement | A Google Analytics 4 setup that records the actions that matter, so you can trust your numbers. |
| SEO | Technical fixes and clearer content that help search engines find and show your pages. |
| Generative Engine Optimization (GEO) | Making your business easy for AI tools like ChatGPT to understand and mention. |
| Answer Engine Optimization (AEO) | Clear, direct answers that search engines and voice assistants can show to people asking questions. |
| Website and data audits | A full review of your site and data, with a ranked list of what to fix first. |
| Conversion rate optimization | Finding where visitors drop off, and testing changes that turn more of them into enquiries. |
| Digital strategy consulting | A practical plan for where to spend time and money online, and how to tell if it's working. |

- **Link:** See all services →

**Process**
- **H2:** How it works
- **Steps:**
  1. **Audit:** we measure where you stand today.
  2. **Strategy:** we agree priorities and a realistic plan.
  3. **Implement:** we make the changes, or support your team to make them.
  4. **Measure and improve:** we report what changed and adjust.
- **Link:** See our full process →

**Your first 30 days**
- **H2:** What your first 30 days look like
- **Weeks:**
  - **Week 1:** We agree goals, get read-only access, and check your tracking.
  - **Weeks 2–3:** We review your site, search visibility, and conversion path.
  - **Week 4:** You get your report and action list, and we walk through it together.
- **Footnote:** Timings are typical and depend on how quickly we receive access. [PLACEHOLDER: confirm timings]

**Inside the audit**
- **H2:** What's inside a Digi World audit
- **Body:** Analytics, technical SEO, content, AI-answer readiness, and your conversion path. Every finding is ranked by impact and effort.
- **Button:** [See what the audit covers]

**FAQ**
- **H2:** Questions businesses ask us
- **Questions:** buyer FAQ items 1, 2, 4, 6, and 7.

**Closing CTA**
- **H2:** Start with a clear picture of where you stand.
- **Body:** Request a website audit and get a ranked list of what to fix first.
- **Buttons:** [Request a Website Audit] · Prefer to talk first? Book a consultation →

---

### 6.2 Services

**SEO title:** Services: SEO, GA4, GEO, AEO, CRO and digital strategy | Digi World
**Meta description:** Eight services from Digi World, from GA4 setup and SEO to AI-answer visibility and conversion work. See what each includes and how to start.

**Hero**
- **H1:** Services
- **Lead:** Eight ways we help you get more of the right visitors and turn more of them into customers. Every service starts from your own data.
- **Jump links:** one per service

Each service section has the same structure: H2, a short description, a "Good fit if" line, and a "What you get" line.

**Digital marketing**
- **Description:** We plan and run campaigns across search, social, and email. Each campaign has a clear goal and is measured from the start, so budget moves to what works.
- **Good fit if:** you spend on marketing but can't tell which channels bring customers.
- **What you get:** a channel plan, campaign setup and management, and regular plain-language reports.

**GA4 analytics and measurement**
- **Description:** Google Analytics 4 (GA4) is Google's free tool for measuring what visitors do on your website. We set it up or repair it so it records the actions that matter to you, such as enquiries, calls, and purchases.
- **Good fit if:** you don't trust your numbers, or you don't know where enquiries come from.
- **What you get:** a documented GA4 setup with key events, consent-aware tracking, and a simple dashboard, plus a handover call.

**SEO**
- **Description:** Search engine optimization (SEO) is the work of helping search engines like Google find, understand, and show your pages. We fix technical problems, improve key pages, and make your site structure clear.
- **Good fit if:** you aren't showing up for searches your customers make.
- **What you get:** a prioritised SEO plan, technical and on-page fixes, and regular visibility reporting.

**Generative Engine Optimization (GEO)**
- **Plain-English definition:** GEO means making your business easy for AI tools like ChatGPT, Gemini, and Perplexity to understand, trust, and mention in their answers.
- **Description:** We check how AI tools describe your business today. Then we improve your content and your presence on other trusted sites, so the description is accurate and more complete.
- **Good fit if:** customers are starting to ask AI tools for recommendations in your field.
- **What you get:** an AI-visibility review, a content plan, and regular checks of how AI tools describe you.
- **Honesty line:** no one controls what AI tools say. We improve the information they draw on.

**Answer Engine Optimization (AEO)**
- **Plain-English definition:** AEO means writing your content as clear, direct answers to real questions, so search engines and voice assistants can show those answers.
- **Description:** We find the questions your customers ask, write short answers to them, and structure your pages so those answers are easy to find and quote.
- **Good fit if:** your customers ask a lot of similar questions before they buy.
- **What you get:** a list of your customers' key questions, answer-led page content, and structured data on key pages.

**Website and data audits**
- **Description:** A full review of your analytics, search visibility, content, and conversion path. It is the fastest way to see what is holding you back.
- **Good fit if:** you want a clear picture before spending more.
- **What you get:** a written report, a ranked action list, and a walkthrough call.
- **Button:** [See what the audit covers]

**Conversion rate optimization**
- **Description:** Conversion rate optimization (CRO) means helping more of your current visitors take the next step. We find where people hesitate or leave, then test specific changes.
- **Good fit if:** you get visitors but few enquiries or sales.
- **What you get:** a review of key pages and forms, a ranked list of changes to test, and test results.

**Digital strategy consulting**
- **Description:** A practical plan for where to spend time and money online, based on your goals and your data, with clear ways to tell if it's working.
- **Good fit if:** you're unsure where to focus, or you're about to make a big digital decision.
- **What you get:** a written strategy, a 90-day action plan, and agreed measures of success.
- **Link:** Book a Consultation →

**Ways to work with us**
- **H2:** Ways to work with us
- **Content:** the three options from section 4 (Audit, Project, Ongoing support).

**In scope and not in scope**
- **H2:** What we do, and what we don't
- **We do:**
  - Analytics setup and repair
  - Technical and on-page SEO
  - Content for search and AI answers
  - Conversion reviews and testing
  - Campaign planning and management
  - Strategy and reporting
- **We don't:**
  - Guarantee rankings or revenue
  - Buy links or use tactics that break search engine rules
  - Write fake reviews
  - [PLACEHOLDER: confirm, e.g. "build new websites from scratch"]

**FAQ:** all 8 buyer FAQ questions.

**CTA band**
- **H2:** Not sure which service you need?
- **Body:** The audit shows which services will make a difference for your business, and which you can skip.
- **Button:** [Request a Website Audit]

---

### 6.3 Our Process (methodology)

**SEO title:** Our process and methodology | Digi World
**Meta description:** How Digi World works: audit, strategy, implement, measure. See what you provide, what you receive, the tools we use, and what happens in your first 30 days.

**Hero**
- **H1:** How we work
- **Lead:** Four steps, built around one rule: measure before you change anything. You always know what we're doing, what we need from you, and what you'll get.

**1. Audit**
- **Body:** We review your analytics, search visibility, content, and conversion path, and record your current numbers as a baseline.
- **You provide:** your goals; read-only access to GA4 and Search Console; a short questionnaire.
- **You receive:** a written report, a ranked action list, and a walkthrough call.

**2. Strategy**
- **Body:** We agree what success looks like and turn the findings into a short plan.
- **You provide:** feedback on the findings; your budget range and deadlines.
- **You receive:** a written plan with priorities, timeline, measures, and cost.

**3. Implement**
- **Body:** We make the agreed changes, or give your team clear instructions and review their work.
- **You provide:** access to the site and accounts; timely approvals.
- **You receive:** completed changes, progress updates, and a log of what changed and when.

**4. Measure and improve**
- **Body:** We compare results against the baseline, explain what changed, and plan the next round.
- **You provide:** business context we can't see in the data, such as sales or seasonal patterns.
- **You receive:** a plain-language report and updated recommendations.

**How we measure (methodology)**
- **H2:** Our measurement rules
- **Rules:**
  1. **Baseline first:** we record the key numbers before changing anything.
  2. **Check the tracking:** if the data is wrong, every decision based on it is wrong too.
  3. **Log every change:** each change gets a date, so we can match it to results.
  4. **Compare like with like:** we compare equal periods and allow for seasonal patterns.
  5. **Report what didn't work:** we report a failed test as clearly as a successful one.

**Tools we use**
- **H2:** Tools we use
- **Draft list. Nothing appears on the site until you confirm it:** [PLACEHOLDER: confirm each]
  - Google Analytics 4
  - Google Tag Manager
  - Google Search Console
  - Bing Webmaster Tools
  - PageSpeed Insights / Lighthouse
  - [crawler, e.g. Screaming Frog]
  - [SEO platform, e.g. Semrush or Ahrefs]
  - [testing / session-recording tool]
- **Line:** We use your accounts where possible, so the data stays with you.

**Your first 30 days:** the same timeline as on Home.

**How we report**
- **H2:** How we report
- **Body:** Short written reports [PLACEHOLDER: e.g. monthly], each answering three questions: What did we do? What changed? What do we do next? Numbers are explained in plain language, never just pasted from a dashboard.

**CTA:** [Request a Website Audit]

---

### 6.4 About

**SEO title:** About Digi World: our approach and principles
**Meta description:** Digi World is a digital growth consultancy that starts with measurement. Read our principles and who we work with.

**Hero**
- **H1:** We start with your data, not a sales pitch
- **Lead:** Digi World helps owner-led businesses understand what their website is doing for them, and what to change.

**Why we work this way**
- **H2:** Why we work this way
- **Body:**
  - Many businesses spend money online without knowing what works. Reports are long, advice changes with each trend, and the same package is sold to everyone.
  - We think good advice has to start with your own numbers. So we measure first, explain what we find in plain language, and recommend only the changes the evidence supports. Then we check whether they worked.

**Principles**
- **H2:** Our principles
  1. **Evidence before opinion:** when the data is unclear, we say so.
  2. **Plain reporting:** you should understand every report without a glossary.
  3. **Foundations first:** working tracking and a fast, clear website come before campaigns.
  4. **Small steps, measured:** a few focused changes beat a big project nobody can evaluate.
  5. **No promises we can't keep:** no one controls rankings or AI answers, and we won't pretend to.
  6. **You own everything:** your accounts and data stay in your name.

**Founder**
- **H2:** Who you'll work with
- **Content:**
  - [PLACEHOLDER: founder photo, square, at least 600×600 px, real photo only]
  - [PLACEHOLDER: founder name, role]
  - [PLACEHOLDER: 60–100 word bio: relevant experience, the kinds of businesses helped, why Digi World exists. Verifiable facts only.]
  - [PLACEHOLDER: location / time zone; languages]

**Who we work with**
- **H2:** Who we work with
- **Body:** Owner-led small and mid-sized businesses, locally and internationally, that already have a website and want clearer answers about how it performs.

**CTA**
- **H2:** Want to talk it through?
- **Body:** Book a short consultation to discuss your goals and whether we're a good fit.
- **Button:** [Book a Consultation]
- **Link:** Or request a website audit →

---

### 6.5 Contact

**SEO title:** Contact Digi World
**Meta description:** Send Digi World a message or book a consultation. We reply to every enquiry.

**Hero**
- **H1:** Contact us
- **Lead:** Tell us what you'd like to improve. We'll reply with clear next steps.

**Form**
- **Fields:** Name · Email · Company (optional) · Website URL (optional) · Service of interest · Message · Consent checkbox ("I agree to Digi World using these details to reply to my enquiry.")
- **Button:** Send message
- **Privacy line:** We use your details only to reply. We don't add you to a mailing list or share your details. Privacy policy.

**Side panel**
- **Book a consultation:**
  - Until a booking link is supplied: "Online booking is coming soon. For now, choose 'Consultation' in the form and suggest two or three times that suit you. Please include your time zone."
  - After it is supplied: "Pick a time that suits you." [Book a Consultation] → [PLACEHOLDER: Calendly/Cal.com URL]
- **Response time:** We reply within [PLACEHOLDER: e.g. 2 working days].
- **Looking for an audit?** The audit page has a dedicated form. → Request a Website Audit
- **Email:** [PLACEHOLDER: domain email, shown only once supplied]

---

### 6.6 Thank-you (noindex)

- **H1:** Thank you. We've received your request.
- **What happens next:**
  1. We review what you sent.
  2. We reply within [PLACEHOLDER: e.g. 2 working days] with next steps or a few questions.
  3. For an audit, we'll explain how to grant read-only access.
- **While you wait:** links to the three articles.

---

### 6.7 404

- **H1:** We couldn't find that page.
- **Body:** The link may be out of date. Try one of these:
  - Home
  - Services
  - [Request a Website Audit]

---

### 6.8 Privacy policy (DRAFT: needs legal review)

Shown on the site with a visible banner: "Draft: under legal review."

1. **Who we are:** Digi World, [PLACEHOLDER: legal name, address]. Contact: [PLACEHOLDER: email].
2. **What we collect:** the details you enter in our forms (name, email, company, website address, service of interest, message) and, only if you agree, analytics data about how you use this site.
3. **Why:** to reply to your enquiry and provide services you request (legitimate interest / steps before a contract), and, with your consent, to understand how the site is used.
4. **Who processes it:**
   - Formspree (form delivery)
   - Our email provider
   - Google Analytics (only after consent)
   - GitHub Pages (hosting)
   - [PLACEHOLDER: confirm]
5. **How long we keep it:** enquiries for [PLACEHOLDER: e.g. 24 months]; analytics data for 14 months.
6. **Cookies:** analytics cookies are set only if you choose "Accept" in the cookie banner. You can change your choice at any time with the "Cookie settings" link in the footer.
7. **Your rights:** access, correction, deletion, objection, and withdrawing consent. Contact us to use them. You may also complain to your local data protection authority.
8. **International transfers:** some providers may process data outside your country. [PLACEHOLDER: legal review]
9. **Changes:** last updated [PLACEHOLDER: date].

### 6.9 Terms of use (DRAFT: needs legal review)

1. **Operator:** this site is run by [PLACEHOLDER: legal name].
2. **General information only:** site content is general information, not advice for your specific situation.
3. **Content ownership:** you may share links to our content but not copy it in full without permission.
4. **Third-party links:** we are not responsible for external sites.
5. **Liability:** to the extent the law allows, we are not liable for losses from using this site.
6. **Paid work:** services are governed by a separate written agreement.
7. **Governing law:** [PLACEHOLDER: jurisdiction]. Last updated [PLACEHOLDER: date].

### 6.10 Case Studies template (hidden until enabled)

- **H1:** Case studies
- **Lead:** Real projects, published with client permission. Results are reported as measured, with the time period and data source.
- **Each case study:**
  - Client or sector · Market · Period · Services
  - **Challenge:** two to three sentences
  - **Approach:** two to three sentences
  - **Outcome:** measured results, with source and dates
  - Client quote, only with written permission

### 6.11 Insights index

**SEO title:** Insights: practical guides to analytics, SEO and AI search | Digi World
**Meta description:** Plain-English guides from Digi World on GA4, SEO, GEO, AEO, and turning website visitors into customers.

- **H1:** Insights
- **Lead:** Practical guides for business owners and marketing leads. No jargon, no hype.

---

## 7. Insights articles (full text)

### Article 1: What to check in your GA4 setup

**SEO title:** What to check in your GA4 setup: a 10-point checklist | Digi World
**Meta description:** A plain-English checklist for Google Analytics 4: key events, data retention, internal traffic, consent, Search Console, and more.

# What to check in your GA4 setup

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

**Closing CTA:** Want a second pair of eyes on your setup? A Digi World audit checks all of this and more. [Request a Website Audit]

---

### Article 2: SEO vs GEO vs AEO, explained

**SEO title:** SEO vs GEO vs AEO: what's the difference? | Digi World
**Meta description:** SEO, GEO, and AEO explained in plain English: what each one means, how they overlap, and where a small business should start.

# SEO vs GEO vs AEO: what's the difference?

**Short answer:** SEO helps your pages appear in search results. AEO helps your content become the direct answer people see or hear when they ask a question. GEO helps AI tools like ChatGPT understand your business and mention it in their answers. All three depend on the same foundation: a website that is clear, accurate, and easy for machines to read.

People now find businesses in more ways than a list of search results. They ask voice assistants, read the answer at the top of the search page, and ask AI chat tools for recommendations. This guide explains the terms for each in plain English.

## What is SEO?

**Search engine optimization (SEO) is the work of helping search engines find, understand, and rank your web pages.**

SEO has three main parts:

- **Technical SEO:** making sure search engines can reach and read your pages. This covers site speed, mobile use, broken links, and which pages are allowed to be indexed.
- **On-page SEO:** making each page clearly about one topic, with a useful title, clear headings, and content that matches what people search for.
- **Authority:** other trustworthy websites linking to or mentioning yours, which signals that your site is credible.

SEO is the oldest of the three and still the foundation. If search engines can't crawl and understand your site, AEO and GEO have nothing to work with.

## What is AEO?

**Answer Engine Optimization (AEO) means writing your content as clear, direct answers to real questions, so search engines and voice assistants can show those answers.**

When you ask a question in a search engine, you often see an answer before the list of links: a short paragraph, a list, or a box of related questions. When you ask a voice assistant, it reads out one answer. AEO is about giving these systems a clear answer to use.

In practice, AEO means:

- Finding the questions your customers actually ask (your sales and support teams are a good source).
- Using those questions as headings on your pages.
- Answering each one directly in the first sentence or two, then adding detail.
- Using lists and tables where they make an answer clearer.
- Adding structured data (code that labels what your content is, such as an article, a product, or a business) where it fits.

One caution: Google now shows FAQ rich results mainly for well-known government and health websites. Structured data still helps machines understand your content, but it won't always create a special result.

## What is GEO?

**Generative Engine Optimization (GEO) means making your business easy for AI tools like ChatGPT, Gemini, and Perplexity to understand, trust, and mention in their answers.**

"Generative" refers to AI tools that write a new answer, rather than just listing links. Some of these tools search the web as they answer, and many show links to their sources. Search engines also show AI-written summaries above their normal results.

GEO is a newer field, and nobody outside the AI companies knows exactly how these tools choose what to mention. But some sensible steps follow from how they work:

- **Be clear about who you are:** state plainly what your business does, where, and for whom, in the same words across your website and your profiles elsewhere.
- **Be present on trusted sites:** AI tools draw on many sources, not just your website. Accurate listings, reviews, and mentions on reputable sites help.
- **Write content worth quoting:** specific, factual, well-structured content is easier for an AI tool to summarise correctly than vague marketing copy.
- **Let AI crawlers in, if you want to be included:** your site's `robots.txt` file can allow or block specific AI crawlers. Check that you haven't blocked them by accident, or that you have blocked them on purpose if you prefer.
- **Check what AI tools say about you:** ask the main tools about your business and your services, and note anything wrong or missing.

Be wary of anyone who promises to get you "ranked" in AI answers. These tools change often, and no one controls what they say.

## How do they overlap?

The three overlap far more than the new names suggest:

| | SEO | AEO | GEO |
|---|---|---|---|
| **Goal** | Appear in search results | Be the direct answer | Be understood and mentioned by AI tools |
| **Main audience** | Search engines | Search engines and voice assistants | AI chat and search tools |
| **Key work** | Technical health, relevant pages, authority | Question-led headings, direct answers, structured data | Clear facts, consistent profiles, quotable content |
| **Depends on** | — | Good SEO | Good SEO and AEO |

A page that is technically sound, clearly written, and answers real questions directly helps with all three at once.

## Where should a small business start?

1. **Fix the SEO basics.** Make sure your important pages can be found, load quickly on phones, and each have a clear purpose.
2. **Answer your customers' top ten questions.** Write a clear, direct answer to each, on the most relevant page.
3. **Make your business facts consistent.** Use the same name, description, and contact details everywhere your business appears online.
4. **Check what AI tools say about you.** Correct what you can at the source, which is usually your own site and your main profiles.
5. **Measure.** Use Google Search Console and GA4 to see which searches and pages bring you visitors, and which of those visitors become customers.

## Frequently asked questions

**Is SEO still worth doing now that AI answers exist?**
Yes. AI tools and AI search summaries still draw on web pages, and search engines still send a large share of website visits. Good SEO is the foundation for AEO and GEO.

**Can I see how much traffic comes from AI tools?**
Partly. Some AI tools pass along referral information, so visits from them can appear in GA4 under referral traffic. Not all of them do, so the numbers are incomplete.

**Do I need separate content for each?**
No. Clear, accurate, well-structured pages serve all three. Focus on quality rather than on writing separate content for each acronym.

**Closing CTA:** Want to know how visible your business is in search and AI answers? A Digi World audit checks your SEO, AEO, and GEO readiness. [Request a Website Audit]

---

### Article 3: Why your traffic isn't converting

**SEO title:** Why your website traffic isn't converting (and what to check) | Digi World
**Meta description:** Getting visitors but few enquiries? Seven common reasons website traffic doesn't convert, and how to check each one.

# Why your website traffic isn't converting

**Short answer:** When visitors don't turn into enquiries or sales, the cause is usually one of a few things: the wrong visitors, an unclear offer, too little trust, a slow or awkward experience on mobile, or a contact form that asks too much. Sometimes the site is converting and your tracking just isn't recording it. Check the tracking first, then work through the rest in order.

A "conversion" is any action that matters to your business: a form sent, a call made, a booking, a purchase. If your website gets visitors but few of these actions, the problem is somewhere between the visitor arriving and the visitor acting. Here are seven places to look.

## 1. Your tracking may be wrong

Before you change anything, check that you are measuring conversions correctly. It is common to find that:

- The contact form isn't tracked at all.
- Calls from a "tap to call" button aren't recorded.
- Emails sent by clicking an email link aren't counted.
- The tracking broke during a website update.

**How to check:** send a test enquiry through your own form, then see whether it appears in your analytics (in GA4, use **DebugView** or the **Realtime** report). If it doesn't, fix this first. Otherwise you may "fix" a problem that doesn't exist.

## 2. You're attracting the wrong visitors

More traffic isn't always better. If people arrive looking for something you don't offer, they leave. This happens when pages rank for loosely related searches, or when ads target too broadly.

**How to check:** in Google Search Console, look at the search terms that bring visitors to your site. Ask yourself whether someone typing each term would want what you sell. In GA4, compare engagement and conversions by traffic source. A source with lots of visits and almost no conversions is a sign of a mismatch.

## 3. Your offer isn't clear

Visitors decide very quickly whether a page is relevant to them. If they can't tell what you do, who it's for, and what to do next, many will leave.

**How to check:** show your homepage to someone who doesn't know your business for five seconds, then ask:

- What does this business do?
- Who is it for?
- What should I do next?

If they can't answer, rewrite the top of the page. Use plain words to say what you offer, who it's for, and the single next step.

## 4. Visitors don't have enough reason to trust you

People hesitate to contact or pay a business they know nothing about. Trust comes from specifics: who is behind the business, how you work, what it costs or how pricing works, and what happens after they get in touch.

**How to check:** read your key pages as a sceptical stranger. Is there a real name, a clear process, and a privacy note? Is it clear what happens after someone fills in the form? Real reviews and case studies help, but only real ones. Invented testimonials damage trust when people spot them.

## 5. The mobile experience is slow or awkward

For many businesses, most visitors arrive on a phone. A page that is slow, has tiny buttons, or makes people zoom and scroll sideways will lose them.

**How to check:** open your site on your own phone, ideally on mobile data rather than Wi-Fi. Try to complete your main action, such as sending a form. Google's free **PageSpeed Insights** tool reports how quickly your pages load and what slows them down. In GA4, compare conversion rates for mobile and desktop visitors. A large gap points to a mobile problem.

## 6. The form asks too much

Every extra field is a reason to stop. Forms that ask for a phone number, a budget, a company size, and a long message before someone even knows you will put many people off.

**How to check:** count your form fields and ask whether you need each one before the first conversation. Make sure error messages explain exactly what to fix. Test the form on a phone. If you use form tracking, compare how many people *start* the form with how many *finish* it. A big drop tells you the form itself is the problem.

## 7. There's no clear next step

Some pages have no call to action at all. Others have five competing ones. Visitors need one obvious next step on each page, with clear wording such as "Request a quote" or "Book a call", not "Submit" or "Learn more".

**How to check:** for each important page, find the single action you want visitors to take. Is it visible without scrolling on a phone? Is it repeated at the end of the page? Is the wording specific?

## How to fix it, in order

1. **Fix the tracking** so you can trust your numbers.
2. **Check traffic quality** so you're improving the experience for the right people.
3. **Clarify the offer** at the top of your key pages.
4. **Add real trust signals:** a name, a process, a privacy note.
5. **Fix mobile speed and usability.**
6. **Simplify the form.**
7. **Make one clear call to action** per page.

Change one thing at a time where you can, and note the date of each change. That way you can tell what made the difference.

## Frequently asked questions

**What is a good conversion rate?**
It varies so much by industry, offer, and traffic source that a general average is not very useful. Compare your site with itself over time, and compare traffic sources with each other.

**Should I get more traffic or improve conversions first?**
Usually conversions first. Improving how well your site converts makes every future visitor more valuable, including visitors from SEO or ads.

**How long should I run a test?**
Long enough to collect a meaningful number of conversions and to cover full weekly cycles. For smaller sites, that often means several weeks. Avoid stopping a test early because of a promising first few days.

**Closing CTA:** Not sure which of these is holding your site back? A Digi World audit reviews your tracking, traffic, and conversion path, and ranks what to fix first. [Request a Website Audit]

---

## 8. Five questions to answer with your approval

1. **Is the audit free or paid?** If paid, what is the fee? What turnaround time can you commit to?
2. **Which tools do you actually use?** Strike or add from the list in 6.3.
3. **Hosting:** stay on GitHub Pages (free; forms via Formspree), or move to Netlify? If Formspree, create a free account with wealthop202@gmail.com and send me the form ID.
4. **Founder details:** name, photo, bio, time zone, and whether you want "we" or "I".
5. **Which headline: A, B, or C?** Also confirm the "We don't" list in the buyer FAQ and Services page.

You can approve Phase 1 with placeholders still open. Everything marked `[PLACEHOLDER]` will stay visible and listed in the placeholder table until you fill it.

---

## Appendix: reading-level check

Measured with the Flesch-Kincaid grade formula on the body copy, excluding headings and the product names GA4, SEO, GEO, and AEO.

| Section | Grade level | Words |
|---|---|---|
| Home | 4.4 | 716 |
| Audit page | 5.8 | 740 |
| Services | 5.8 | 807 |
| Our Process | 5.0 | 450 |
| About | 4.7 | 330 |
| Buyer FAQ | 5.6 | 365 |
| Article 1: GA4 checklist | 6.7 | 1000 |
| Article 2: SEO vs GEO vs AEO | 6.2 | 997 |
| Article 3: Traffic not converting | 5.0 | 991 |

Every section measures between grade 4.4 and 6.7, so nothing is above the grade 8 ceiling. The page copy reads simpler than grade 6, which suits scanning readers. Article word counts cover the article body (H1 to the final FAQ) and exclude the SEO title, meta description, and closing CTA. All three are within 800–1,000 words.
