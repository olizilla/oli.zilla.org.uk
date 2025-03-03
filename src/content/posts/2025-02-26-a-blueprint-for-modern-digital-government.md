---
layout: ../../layouts/2025.astro
slug: 2025/02/26/a-blueprint-for-modern-digital-government
published: true
tagline: The gov.uk app, the APIs, and the operating environment
---

# A blueprint for modern digital government

In January 2025, GDS & DSIT published [A blueprint for modern digital government](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html), a 6 point plan for digital reform. 

**It's fantastic.** It's also very long, and you have much to do. Here are 3 of the 33 _"priority reforms"_ that stand out, ordered from the achievable to the transformative.

- A GOV.UK app will be rolled out this year with a digital driving license as a headline feature.
- Every department _must_ publish an open <abbr title="Application Programming Interface">API</abbr> for their service.
- They intend to fix how the treasury funds digital projects.

If you like to skim, I've collated the [list of just the 33 reforms as a separate post](/2025/02/25/all-the-priority-reforms-from-a-blueprint-for-modern-digital-government). 

Despite it's length the blueprint is surprisingly coherent, tackling the problem from many angles. Channelling Wardley, if we begin the publicly visible part, the GOV.UK app, and trace it's dependencies we can start to see how the reforms serve to reinforce each other.

## The GOV.UK App

In the blueprints own words, the government will:

> Introduce a Digital Wallet to store government credentials, and require services to issue a digital verified credential alongside any paper/card based credential or proof of entitlement eligibility by the end of 2027.
> <a class='cite' href="https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#priority-reforms">&mdash; Blueprint: Point 1. Join up public sector services</a>

...but this doesn't give the full story. The [launch event video](https://youtu.be/V5C5z45odYU?si=BT5FKR7F2WySw9H7) goes into more detail: the Digital Wallet will be rolled out as a feature of the new GOV.UK app. \[[source](https://youtu.be/V5C5z45odYU?si=BT5FKR7F2WySw9H7&t=1271)\]. It also offers a bold statement of intent:

> "We are going to transform the relationship between citizen and the state."
> <a class="cite" href="https://www.youtube.com/watch?v=V5C5z45odYU">&mdash; Rt Hon Peter Kyle MP</a>

### Why an app, why now?

The app aims to provide the visible value to us, the users. If it's useful it will give legitimacy for the other policy goals.

The justification given in the launch video is that todays' 18 year olds (*newly minted voting citizens*) were born in 2007, the same year the iPhone was launched (😱). It is reasonable to assume that, to them, apps are the default. It's how we do everything from banking to socialising already. And GDS doesn't assume. Point 1 of the [Service Standard](https://www.gov.uk/service-manual/service-standard) is _"Understand users and their needs"_ by doing the user research.

From the private sector point of view, offering an app is the UK skating to where the puck has been sitting for the last 10 years. But there is a proper order of events to nation-scale digital transformation, and you don't get to skip web day.

### A small app on a huge web platform

The solid foundations of the GOV.UK web platform is exactly why Peter Kyle can promise that the 6 month old app will be ready for public use by June this year. It's open source and [published on github](https://github.com/alphagov/govuk-mobile-android-app), so let's take a look.

The android app is a thin wrapper around the existing website; like a personalisable version of the https://gov.uk home page.
The search feature is using an exiting gov.uk API to do the work of fetching search results:

*Be Neo and see past the code. We're going to pick some words out, nothing more. Hold on.* 

```kotlin
object SearchConfig {
    const val BASE_URL = "https://www.gov.uk"
    const val API_BASE_URL = "https://search.publishing.service.gov.uk"
    const val SEARCH_PATH = "/v0_1/search.json"
```
<small class="font-mono block -mt-7 bg-white rounded-b-md px-3 py-2">Source: <a href="https://github.com/alphagov/govuk-mobile-android-app/blob/846cd58762543e1bc40267d54508dffae5393e35/feature/search/src/main/kotlin/uk/govuk/app/search/domain/SearchConfig.kt#L11-L2">github.com/alphagov/govuk-mobile-android-app</a></small>

This tells us the current version of the app pulls search results from an API at:
<div class="overflow-y-auto max-w-full -mt-6">
<a href="https://search.publishing.service.gov.uk/v0_1/search.json">https://search.publishing.service.gov.uk/v0_1/search.json</a>
</div>

You can click that link and try it. The response won't be pretty but it will be data that you (or an app) can use:

```json
  "results": [{
      "title": "Sign in to your Universal Credit account",
      "link": "/sign-in-universal-credit",
```

The `title` for the first search result is *"Sign in to your Universal Credit account"* which is text the app will show for this search result and the `link` is [`/sign-in-universal-credit`](https://www.gov.uk/sign-in-universal-credit). 

If you select that item, it will open the https://gov.uk/sign-in-universal-credit web page [as a view in the app](https://github.com/alphagov/govuk-mobile-android-app/blob/49c1a3173a381e7f36b29d124c995f2bff9a04f0/feature/search/src/main/kotlin/uk/govuk/app/search/ui/SearchResults.kt#L99-L115), just as you would see it in your mobile web browser.

<div class="max-w-full" style="width:380px">
<div class="font-sans text-sm p-2" style="border:solid 10px black; border-radius:10px 10px 0 0;">https://gov.uk/sign-in-universal-credit</div><img src="/res/img/posts/2025-02-26-a-blueprint-for-modern-digital-government-2.png" style="width:100%;height:600px;border:solid 10px black; border-radius:0 0 10px 10px; border-top:0px; margin-top:0" /></div>

<!--    
<div style="width:380px">
<div style="border:solid 8px black; border-radius:8px 8px 0 0; padding:2px; font-family:monospace">https://gov.uk/sign-in-universal-credit</div>
<iframe src="https://www.gov.uk/sign-in-universal-credit" style="width:100%;height:600px;border:solid 8px black; border-radius:0 0 8px 8px; border-top:0px;pointer-events:none"></iframe></div>
-->

<!--
```kotlin
// Extract the URL from the search result data
val url = StringUtils.buildFullUrl(searchResult.link)
// Show the web page
val intent = Intent(Intent.ACTION_VIEW)   
intent.data = Uri.parse(url)
val context = LocalContext.current
context.startActivity(intent)
```
<small class="font-mono block -mt-7 bg-white rounded-b-md px-3 py-2">Source: <a href="https://github.com/alphagov/govuk-mobile-android-app/blob/49c1a3173a381e7f36b29d124c995f2bff9a04f0/feature/search/src/main/kotlin/uk/govuk/app/search/ui/SearchResults.kt#L99-L115">github.com/alphagov/govuk-mobile-android-app</a></small> -->

This reuse of the website works because of all the effort that has gone into gov.uk to make it work well on any device, and the [Design System](https://design-system.service.gov.uk/) that allows the app builders to create buttons and links and a vibe that exactly matches the gov.uk web pages.

This saves years of work. The task is not _"rebuild all 700,000 pages as features of the app"_, but instead to _"do only the work that makes apps interesting"_.

Just moving the gov.uk homepage into an app could have been a hard sell but they are following the growth-hacking, value-propositioning playbook and launching with a ~~killer app~~ exciting initial use-case: a **digital drivers licenses** including an eKYC feature that will let you prove only that you are old enough to by fireworks and alcohol without having to also share the address of that party. 

[![Screenshot showing how to prove you're old enough to buy fireworks using the GOV.UK Wallet](/res/img/posts/2025-02-26-a-blueprint-for-modern-digital-government-1.jpg)](https://youtu.be/V5C5z45odYU?feature=shared&t=1542)

The alpha/beta release pattern card is ticked too! Before it's rolled out across the country, 250,000 UK Veterans will get first access to the digital wallet feature to make it easier to access their veteran card and the benefits it offers. [Just pause and admire that framing for a second](https://youtu.be/V5C5z45odYU?feature=shared&t=1288). Honouring heros with early access and also finding a beta test group of the right scale that may also be more willing than average to report back on their early adopter experiences.

And they stick the landing, with a clear statement that it [will be available by the end of 2025.](https://youtu.be/V5C5z45odYU?feature=shared&t=1613)

## APIs Everywhere

> Mandate the publication of a standard set of APIs and events by public sector organisations. Starting with an expectation that every new service in central government departments will have an open API.
> <a class='cite' href="https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#priority-reforms-2">&mdash; Blueprint: Point 3. Strengthen and extend our digital and data public infrastructure</a>

Apps use APIs to get things done. The gov.uk app will need departments to offer APIs so it can connect users with the service they provide. The app will give the new APIs an in-house customer that can provide early feedback. Meanwhile, reframing departments around open, documented APIs nudges them towards digital-first and service-first delivery. Hey, [it worked for Amazon](https://gist.github.com/chitchcock/1281611).

To calibrate how significant a change "APIs for everything" could be at this point in 2025, it's worth noting that the current [Disability Living Allowance form](https://assets.publishing.service.gov.uk/media/67a0f71cc58a6a5aa9217653/dla-for-children-claim-form.pdf) is 40 pages long, [emotionally draining](https://publicpolicydesign.blog.gov.uk/2023/11/03/distress-and-design/), and still paper-only. **There is no option to fill it out online**. You have to post that physical bundle to a doctor, who may or may not post it back with their part completed, before you get to post it to the <abbr title="Department of Work and Pensions">DWP</abbr> and wait for at least 17 weeks for the verdict.

Digital transformation represents an opportunity to redesign government around providing services that work well for the users who need it most. The section in the blueprint that proposes a performance metric around reducing the 'time tax' of public services will hopefully focus the effort where it is most needed.

> Modern digital government should reduce the ‘time tax’ on people using public services. Not just the time it takes to use a service, but the time to understand what needs to be done.
> <a class='cite' href="https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#what-we-want-to-deliver">&mdash; Blueprint: What we want to deliver</a>


## Fixing funding

_...OK But what about treacherous operating conditions for running digital projects in a government setting?_

Just last week [Mike Bracken](https://mikebracken.com/) reminded us that HM Treasury's process still strongly favours large up-front capital expense projects with a 3 to 5 year plan they can do the cost-benefit analysis on up front, and is completely at odds with the need to quickly spin up small teams for test-and-learn digital projects that may last months, or if successful, require on-going revenue funding. 

This mismatch either kills agile projects before they start or forces them to role-play a waterfall project and pretend they can predict what they will need in 3 years time before they've even started talking to users.

__They want to fix that too!__

> The digital centre will work with HM Treasury to reform the government’s funding approach...
>
> Launch tailored funding models for digital products and services, legacy remediation and risk reduction, and staged, agile funding that better enables exploratory work with new technologies.
> <a class='cite' href="https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#priority-reforms-4">&mdash; Blueprint: Point 5. Fund for outcomes, procure for growth and innovation</a>

## And more...

The promise of digital-first legislation, and a curious line about trialing [a new unique identifer on children]("strengthen-and-extend-our-digital-and-data-public-infrastructure") that would benefit from more context ...there really is something for everyone. I encourage you to give the blueprint a read.

Thoughts? Hurl them at https://bsky.app/profile/olizilla.bsky.social
