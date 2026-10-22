---
layout: ../../../layouts/2025.astro
publishDate: 2026-10-22
title: "Where are our manners? A protocol for NHS software"
slug: 2026/10/22/where-are-our-manners
draft: false
tagline: "The NHS must draw the line between its data and the software market, not the vendors."
emoji: "🩺"
---

# *Where are our manners?* A protocol for NHS software

**Diagnosis:** Digitisation of the NHS is being driven by the software vendors, and is moving at the pace of the procurement process: one multi-million pound, decade long contract at a time.

The market has not delivered interoperable patient record systems. The incentives are wrong and a clear boundary or protocol where co-ordination and enforcement could happen is missing.

**Response:** We need to *shape the market* with a clearly defined interface between the publicly funded core of the NHS and the privately funded market of software vendors. That line is currently drawn by the vendors.

**The test:** Can a clinician A/B test two apps on live data, one patient to the next?

The software market can work if we are genuinely free to choose. NHS sites must be able to seamlessly switch between providers, and try out alternatives. To get there we need to:

1. **Separate our data from the apps:** Store health data in open formats that allow every site to try out digital systems without having to migrate our health records out of a proprietary database first.  
     
2. **Record data in shared public schemas at the point of care**: We need "semantic coherence at the edge". Records created anywhere must be meaningful everywhere, without translation. The alternatives cost too much: Translating the data at the centre moves too much power there with it ([FDP](https://github.com/olizilla/fdp#problems-with-the-federated-data-platform)). Crafting lower fidelity summaries or bespoke translations between the many sites creates a vast amount of expensive work that degrades our health records with each translation.

**The goal** is to create a healthy digital ecosystem that delivers what we need:

- Health records that retain their nuance over our lifetime; available wherever they are needed.  
- Software for clinicians that reduces toil rather than just enforcing rules. It must surface insights and highlight what matters, rather than simply permitting access to proprietary databases and PDFs.

The current system has no intrinsic incentive for interoperability between sites, and lets private companies draw their moat around our data. The NHS must define the shape, storage and meaning of that data, and govern the protocol that sets the ground rules for its use, so that the market can compete on the software that creates and operationalises it.

## Following protocol

Protocols are exceedingly British. They define who may do what, when.

Software protocols are not APIs or digital platforms. They are the ground rules of a multiplayer system that, if actively governed and designed to be governed, can avoid the usual accumulation of power to the entity that provides the API or holds all the data.

[Tim O'Reilly surfaced this idea](https://www.oreilly.com/radar/the-missing-mechanisms-of-the-agentic-economy/) from Venkatesh Rao:

> a protocol is an “engineered argument”, in contrast with an API, which ...is an “engineered agreement” enforced by one dominant actor.

This is the difference between: *"You may use our API if you agree to our terms"* versus *"here are the rules of the road, let's drive"*. The former is what you get if one actor provides a platform; the latter is what you get when you design public infrastructure.

## Market shaping

Done well, protocols can create a level playing field for healthy competition. Done badly, without an embedded social purpose or clear mechanisms for long term governance, they are susceptible to market capture. Email sits on open protocols that are multiplayer (the ground rules of an "engineered argument" between equals), but the rise of Gmail has transformed it into an API; an owned platform for which they set the terms.

The UCL Institute for Innovation and Public Purpose (IIPP) has a motto for it: Innovation is political. Our choices have consequences. Choices that assign authority, create shared resources, and impact people that often lack a voice at the decision making table are all political. Here the motto rings true again: *protocols are political*, and should be treated as such.

In that frame: a *good* protocol for clinical data is one that creates a healthy digital ecosystem on top. It must allow the private sector to innovate and do what it does best, while setting a clear boundary, defined by the NHS, between the public funded core and the privately funded suppliers.

That line represents the interface between two completely different incentive models. It has to exist as a protocol that is carefully designed and intrinsically enforced, not set by vendors and tested occasionally, and it must be defended against the now default outcome: "biggest vendor wins" over decades of discovery through billion pound procurement exercises.

## Protocols as policy

Protocols that shape markets should be designed as Digital Public Infrastructure (DPI), like a common rail gauge that public and private services build on. This is not new ground. Rahul Matthan, an expert at the intersection of law and technology, documented it extensively in 2023 in The Third Way:

> Market forces can be leveraged to keep the tech industry in check. But in order to do that we need to create the playground in which these private entrepreneurs can play. We need to do this the old fashioned way - by designing the protocols within which they are constrained to operate.

And the design of that playground is where policy work lives:

> When DPI implements in code various regulatory objectives, it presents an opportunity to reflect ideals of governance into code. ...it is important to ensure that the *correct* principles are reflected in the protocol and the standards that describe this infrastructure.

The big judgement call is: who gets to define "correct" in this context.

## Good manners

For Matthan, public protocol design happens when the government and the private sector collaborate under an impartial, technically competent, non-profit steward, and set the explicit goal of producing outcomes that are fair for participants **and** deliver what the public needs.

The playing field should be level, allowing many small vendors to provide value and thrive, without punishing large vendors for their success, but bounding any implicit power over the space that their size may otherwise create.

And the public must retain enough leverage to tilt the playing field towards social goals, e.g. coherent medical records for patients that are available and legible wherever we are, and tools that respect clinicians' time and energy.

Those goals are worth the effort, but there is also the opportunity to reduce the regulations and compliance checking when we take the work of protocol design seriously.

## Codified behaviour

Demonstrating compliance is a significant burden for primary care electronic patient software vendors. So much so that the space is now essentially a duopoly. The survivors are the ones that were best set up to jump through those hoops.

For Matthan, as a lawyer who deeply understands the tech, this is the payoff: get lawyers into the protocol design so the system ensures that illegal moves are impossible, or are so visible that they are trivial to enforce.

In return, once the engineers demonstrate that the protocol only allows legal moves, and the "engineered argument" delivers the desired social outcomes, then the regulation can shrink to just "must implement the protocol" and the set of issues that cannot be codified.

Drafting law is slow work. As Jennifer Pahlka shows in Recoding America, the real impact of a new law takes years to discover. Implementers are left to fill in the blanks for all those edge cases the law as written cannot possibly cover, and there's no mechanism for iterating on the law using feedback from those trying to enforce it.

Getting the state to co-create the protocols it needs can provide the missing loop. It would allow the market the freedom to innovate, and the state the chance to iterate on the rules of the game in an open forum, to ensure the ecosystem remains balanced and continues to deliver public value as it evolves.

I am not advocating code-as-law more generally, only that when we try to regulate a **digital** ecosystem, there is an opportunity to simplify the regulations by actively participating in the definition and maintenance of the protocols that it runs on.

## Bad manners

If we fail to do that work, those "codified behaviours" appear anyway, but in an ungovernable or unfair shape. Even technically *good* protocols can fail to deliver socially beneficial outcomes.

Laurens Hof studies the shape and impact of open protocols for social media (think Bluesky & Mastodon). The remit is different but the insights are instructive. Hof's [The purpose of protocols](https://connectedplaces.online/the-purpose-of-protocols/) essay gives us the tools to see that *"Protocol design is a form of political design"* and puts in the spotlight the consequences where a protocol does not consider affordances for governance or enforce any opinion on who should control the shared resources they create.

> protocol design choices do not merely leave governance unaddressed but actively shape it, because every architectural decision makes some governance arrangements natural and others difficult or impossible  
>   
> The purpose of a protocol is what it does, and what the current generation of open protocols has produced is a commons without a governance framework adequate to the commons’ own complexity.

The key difference here is we are not talking about decentralised social media, we are talking about our National Health Service. The useful similarity we must respect is the autonomy and authority of NHS sites across the country to make their own decisions in the best interests of their patients and staff. Any solution here must recognise and support that, rather than become another attempt to enforce legibility on those that *do* by those that *manage*.

With the NHS as our focus, the governance questions become even more important, but easier to answer. Where we are talking about DPI, nationally important infrastructure, the state must be the governance anchor, and when the shared resources it creates are our health records, there is no option to leave the governance of that to the market or engineers.

Being the backstop for the protocol is not the same as trying to control the sites: the centre governs the shared rails, and sites retain authority over everything built on them. The work can happen via an impartial non-profit steward, with the public retaining a guiding seat at the table to define the public value of the endeavour. But it must do that work to defend it from capture and to ensure that the "public" in digital public infra refers to [maximising value returned to the public](https://www.ucl.ac.uk/bartlett/publications/2024/mar/digital-public-infrastructure-and-public-value-what-public-about-dpi), rather than just: paid for and underwritten by the public.

## Application

In the NHS case this means being responsible for a "thin-waist" protocol for its data. A mechanism that enables clinicians to define the shape and meaning of the data they need, and the rules for how it is stored and shared. Everything else, the private sector can compete to deliver more effectively by demonstrating the value to trusts and GPs in situ.

Intrinsic enforcement of the ground rules is essential. The current mess of partially adopted standards happens when any software stack gets to mark its own homework by bundling together the creation, storage, and display of data all in the same app. It can claim full conformance to any standard, but we won't know for sure until we try and use it somewhere else, which is the exception rather than rule, and within the NHS it is currently *the* reason why integrating systems takes ages and requires bespoke translation work every time, between every site.

Compare that with how browsers and websites work, our largest experiment to date in open world interoperability. A handful of browsers are rigorously tested by the Web Platform Test suite to demonstrate the set of web standards they support. That is still out-of-band, certification style enforcement, but it works here because it is applied rigorously, automatically, and continuously.

Then those browsers enforce those web standards in-band by sitting as an enforcement boundary between you and billions of websites. An entity outside the control of the website intrinsically enforces the rules of what a "valid" document is. If the website does not follow the rules, it's either an error, or visibly corrupted. Browsers are notoriously tolerant, but that is a choice you make for an open web, not a requirement of an enforcing boundary object.

The key idea is that website authors do not get to mark their own homework. They test their sites in the same browsers you use, a tool they don't control, and ensure it looks like they expect it to. Any interoperability standard where a vendor says they support it, but their proprietary tool handles creating, storing, and displaying it, is just a claim.

Any system for health records must intrinsically enforce the rules at a layer that software vendors have to use. Trying to enforce rules at the display layer does not make sense in the NHS context. The data itself is what matters most here, so an open protocol for storage is the next obvious choice.

The payoffs, once we have such a protocol, are decentralised co-ordination without meetings, health records that don't degrade with every software update, and a radical simplification of the integration work to get that data to where it needs to be.

## Next

When the software lacks a shared protocol the staff have to bridge the gaps between systems that won't talk to each other. When a step is missed, [bad things happen](https://oli.zilla.org.uk/2026/05/21/digital-interop-in-the-nhs/). We have to give them better tech. This is well known. What is missing is a strategy to deliver it at scale. I'm going to keep working on that. I'm surfacing my thinking and assumptions to see if they resonate or so you can tell me where I am wrong. If either of those applies to you, or you are working on this too, then please [get in touch](mailto:oli@zilla.org.uk).

The question I'm using as a guide is: What would need to be true for a clinician to A/B test two apps on live data, one patient to the next?

Up next: Semantic convergence for the data across the NHS is the hard part. We already have things like SNOMED-CT for coding and GP Connect and FHIR for transport, openEHR for decentralised schemas for medical data, and OMOP for analytics. So what's missing? In the next essay I'm going to follow Laurens Hof's example and analyse the protocols we have already to see if they fit.

_This work is licensed under CC BY 4.0_
