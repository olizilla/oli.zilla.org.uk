---
layout: ../../layouts/2025.astro
slug: 2025/02/26/a-blueprint-for-modern-digital-government
published: false
---

# A blueprint for modern digital government
<!-- Updating the gov.uk app, the APIs, and the operating environment -->

In January 2025, GDS & DSIT published a 6 point plan for digital reform entitled [A blueprint for modern digital government](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html).

**It's fantastic.** It's also very long, and you have much to do, so here are just 4 of the 33 **"Priority reforms"** ordered from the achievable to the incredible.

- A gov.uk app will be rolled out this year including digital driving license as it's headline feature. *(The blueprint promises a Digital Wallet. we'll dig into that in more detail in a moment)*
- Every department must publish an open API for their service. *(perhaps this is the nudge we need to get all departments thinking digital-and-service-first. It's reminiscent of ["the platform rant"](https://gist.github.com/chitchcock/1281611), we only get "government as a platform" once departments )* 

Sounds good! But what about the legacy human operating system of intellectuals and mechanicals, and the treacherous operating conditions for running digital projects in a government setting?

*They're fixing that too!* 

- They intend to fix how the treasury funds digital projects 
	- *(This is huge. Mike Bracken has been campaigning about the harm
	- Launch tailored funding models for digital products and services, legacy remediation and risk reduction, and staged, agile funding that better enables exploratory work with new technologies"
- They want to fix how legislation is written and iterated on in collaboration with those implementing it *(This in incredible. Jen Pahlka identifies one way street of legislation to implementation as the root cause of failures of contemporary government)* 
	- Work towards all legislation being ‘digital ready’ to reduce complexities in service delivery and improve efficiencies, drawing on [Denmark’s approach](https://en.digst.dk/digital-transformation/digital-ready-legislation/what-is-digital-ready-legislation/)

The blueprint is surprisingly coherent, tackling the problem from many angles. Channelling Wardley, if we begin with the most publicly visible part, the GOV.UK app, and trace it's dependencies we can start to see how the policy reforms serve to reinforce each other.
## The gov.uk app

In the blueprints own words the exact policy priority is:

> Introduce a Digital Wallet to store government credentials, and require services to issue a digital verified credential alongside any paper/card based credential or proof of entitlement eligibility by the end of 2027.
> – [Blueprint: Point 1. Join up public sector services](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#priority-reforms)

This doesn't give the full story. The [launch event video](https://youtu.be/V5C5z45odYU?si=BT5FKR7F2WySw9H7) goes into more detail, explaining that the Digital Wallet will be rolled out as part of the new GOV.UK app. \[[source](https://youtu.be/V5C5z45odYU?si=BT5FKR7F2WySw9H7&t=1271)\]

It also comes with a bold statement of intent:

> "We are going to transform the relationship between citizen and the state."
>
> – [Rt Hon Peter Kyle MP](https://www.youtube.com/watch?v=V5C5z45odYU)

### Why an app, why now?

The app aims to provide the visible value to us, the users. If it's useful it will give legitimacy for the other policy goals.

Apps use APIs to get things done. The gov.uk app will need these APIs to deliver on it's promises. This gives the new APIs an in-house customer to provide early feedback so they can iterate together towards providing a service that is at least useful for someone, and therefore serves a better chance of being useful for others. Meanwhile, reframing departments around open, documented APIs serves to nudge towards digital-first thinking or an opportunity entirely reimagine how they work.

The justification given in the launch video is that todays' 18 year olds (*newly minted voting citizens*) were born in 2007, the same year the iPhone was launched (😱). It is reasonable to assume that, to them, apps are the default. It's how we do everything from banking to socialising already. And GDS doesn't assume. Point 1 of the [Service Standard](https://www.gov.uk/service-manual/service-standard) is "Understand users and their needs" by doing the user research.

For the private sector point of view, offering an app is the UK skating to where the puck has been sitting for the last 10 years. But there is a proper order of events to nation-scale digital transformation, and you don't get to skip web day.

### Light app, huge web platform

The solid foundations of the GOV.UK web platform is exactly why Peter Kyle can promise that the 6 month old app will be ready for public use by June '25. The app is a thin wrapper around the existing website; like a personalisable version of the home page at https://gov.uk/ .

The search feature of the android app is using an gov.uk API to do the work of fetching results:

*Be Neo for a second and look past the code. We're going to pick some words out, nothing more. Hold on.* 

```kotlin
object SearchConfig {
    const val BASE_URL = "https://www.gov.uk"
    //    Search API V2 ===>
    const val API_BASE_URL = "https://search.publishing.service.gov.uk"
    const val SEARCH_PATH = "/v0_1/search.json"
```
Source: [github.com/alphagov/govuk-mobile-android-app](https://github.com/alphagov/govuk-mobile-android-app/blob/846cd58762543e1bc40267d54508dffae5393e35/feature/search/src/main/kotlin/uk/govuk/app/search/domain/SearchConfig.kt#L11-L2)

This gives a clue that the app pulls search results from an api at 
https://search.publishing.service.gov.uk/v0_1/search.json 

You can click that link and try it. The response won't be pretty but it will be data that you (or an app) can use:

```json
  "results": [{
      "title": "Sign in to your Universal Credit account",
      "link": "/sign-in-universal-credit",
```

The `title` for the first search result is *"Sign in to your Universal Credit account"* which is text the app will show for this search result and the `link` is `/sign-in-universal-credit` which points to the web page https://gov.uk. If you select it, it can show you the linked gov.uk web page, in the app, just as you would see it in you web browser.

<!-- <div style="width:380px">
<div style="border:solid 8px black; border-radius:8px 8px 0 0; padding:2px; font-family:monospace">https://gov.uk/sign-in-universal-credit</div>
<iframe src="https://www.gov.uk/sign-in-universal-credit" style="width:100%;height:600px;border:solid 8px black; border-radius:0 0 8px 8px; border-top:0px;pointer-events:none"></iframe></div> -->

The point is this reuse of the website works because of all the effort that has gone into gov.uk to make it work well on small screens, and thanks to the [Design System](https://design-system.service.gov.uk/), that allows the app builders to create buttons and links and a vibe that exactly matches the gov.uk web pages. When the app shows an existing web page it looks like it belongs in the app.

This saves years of work. The task is not "rebuild all 700,000 pages as features of the app", but instead to "do only the work that makes apps interesting", like keeping track locally, on your device only, of what your most commonly used serves are, so you end up with your own government service speed dial app, and moving notifications off of sms and email, where they have non-zero cost to government to send, and where you are used to receiving them, so less likely to be missed.

Just moving the gov.uk homepage into an app could have been a hard sell. However following the growth-hacking, clear value-propositioning playbook they are launching it with the promise of a ~~killer app~~  exciting initial use-case: **digital drivers licenses** with an eKYC feature to"prove my age" to allow citizens to answer that challenge without also having to share the other info on the driving license. And they stick the landing, with a clear statement that it will be available by the end of 2025.

The alpha/beta release pattern card is ticked too! Before it's rolled out across the country the 250,000 UK Veterans will get first access to the digital wallet feature to make it easier to access their veteran card and the benefits it offers. Just pause and admire that framing for a second. Honouring heros first and finding a diverse enough beta test group of the right scale that may also have self-selected as being more willing than average to report back on their experiences as early adopters.

## Anything else?

There was one line in the blueprint that seemed out of place

> For example, we will support the introduction of a single unique identifier for children to improve data linkage.

Stating that they are going to use children as the beta testers for a new digital identifier, without adding further context seems ill-judged. As we've seen in the [Aadhaar case](https://drive.google.com/file/d/1-xdMyc_3Fn7NVdyoV7u9kLB8MOm0fcJm/view), making it easier to join previously siloed data sets can create new privacy and safety issues. No doubt there is a considered rationale here, but it would calm the curious to link directly to it from the statement.
