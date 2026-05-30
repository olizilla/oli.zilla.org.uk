---
layout: ../../../layouts/2025.astro
slug: 2026/05/21/digital-interop-in-the-nhs
---

<style>
article img { border: solid 1px #ddd;  }
article > figure { background: white; padding: 8px; border: solid 1px #fff; border-radius: 4px;}
article > figure > p > img { margin: 0 !important; }
article > figure > figcaption { padding: 0 1em;}
</style>

# Digital Interoperability in the NHS

_A talk I presented in May 2026 to the [NHS DPSP](https://www.digital-prevention-services.nhs.uk/) team._

<figure>

![Slide 1](./slide-1.png)

<figcaption>

I’m going to talk about digital interop in the NHS, starting with my motivation:
- the bad things that happen when it fails
- The realities of what is holding up progress
- Some ideas from academia on patterns of nation scale digital transformation.
- And then look at work that is happening here and in Catalonia.

</figcaption>
</figure>
<figure>

![Slide 2](./slide-2.png)

<figcaption>

To declare my biases up front
I believe open source code, open data formats and open digital protocols are the essential ingredients for interoperability.
My credentials:
- I’ve been and open source software engineer for 20 years.
- I’ve spent 6 years working on open data formats and protocols to bring the magic of content addressing to the web.
And for the last 2 years I’ve been studying a Masters of Public Administration focusing on collaboration, governance, economics and public value.
…and it’s where I built the Digital Public Infrastructure map with the team at UCL IIPP

</figcaption>
</figure>
<figure>

![Slide 3](./slide-3.png)

<figcaption>

Its live at [dpimap.org](https://dpimap.org)
It lets you view info about the spread of nationally owned digital infra for ID systems, payment rails, and data exchanges around the world.

The data is available in open formats like CSV, JSON
The code is open source…

</figcaption>
</figure>
<figure>

![Slide 4: A candle for open source](./slide-4.png)

<figcaption>

I also want to take a moment to acknowledge that it feels like a rough time work in open source, with new supply chain attacks and the scrutiny and noise of AI models.

It is understandable to want to hide from it, but all the arguments against security through obscurity still stand.
And we really need to be collecting and sharing the fixes for these vulnerabilities in the public domain.

NHS DPSP Team: I see your good open source work, and I support it.

</figcaption>
</figure>
<figure>

![Slide 5: open source = collaboration at build time open formats + open protocols = collaboration at run time](./slide-5.png)

<figcaption>

In the meantime we can still make progress on interop!
Open source lets us collaborate at **build** **time**,
reusing work, and sharing solutions to common problems

Open data formats and open protocols let diverse systems collaborate at **run** **time**

Using open formats let us
- store data outside of apps
- save our work so we can open it again without paying a tithe to a proprietary vendor.

Using Open protocols let us
- define the rules of a multiplayer system, in a way that can
- shape the market for public and private vendors to collaborate,
- protect it from lock-in and
- support a healthy digital ecosystem 
- ...where vendors can demonstrate their tool by plugging it in to a well defined interface and show that it works, rather than promising it will once the procurement marathon is done.

</figcaption>
</figure>
<figure>

![Slide 6: Bad things happen when interop fails](./slide-6.png)

<figcaption>

So to the motivation:
why am i trying to fit any of the complexity of the NHS digital universe into my head.
Bad things happen when interop fails:
1. There are process errors that harm patients and staff
2. Data loss and degradation of our health records
3. And Digital sprawl that wastes our time and money

</figcaption>
</figure>
<figure>

![Slide 7](./slide-7.png)

<figcaption>

My other motivation is I have a thesis to write!
Please do reach out and tell me what else is going wrong, or anything i have got wrong.

In the meantime: I am going to share back to you what i have heard in interviews, data preservation groups, and from other researchers.

</figcaption>
</figure>
<figure>

![Slide 8](./slide-8.png)

<figcaption>

I reached out to a network of GPs in south london and asked
What problems does the current lack of interop cause?

I got a response that basically said “all of them”

> Interoperability relevant to every Learning Event in last 2 months.
> These aren't the most heinous, just examples of how frequently
> there are issues and how severe the consequences are

They signed off with “if you want to see more, just ask again next month”

</figcaption>
</figure>
<figure>

![Urgent cancer referral not sent. Patient consultation recorded on one platform (EMIS), then referral form raised in a separate platform (DXS), then referral manually sent off to hospital via 3rd platform (eRS), then safety netted by the practice in a fourth platform (Excel). …lots of potential moments to make a mistake. Manager at a GP in South London](./slide-9.png)

<figcaption>

**Urgent** **cancer** **referral** **not** **sent.**
Patient consultation recorded on one platform (EMIS),
then referral form raised in a separate platform (DXS),
then referral manually sent off to hospital via 3rd platform (eRS),
then safety netted by the practice in a fourth platform (Excel).
***…lots*** ***of*** ***potential*** ***moments*** ***to*** ***make*** ***a*** ***mistake.***
**Manager** **at** **a** **GP** **in** **South** **London**

</figcaption>
</figure>
<figure>

![Child protection issue missed in A&E document Important info buried in 100s of letters / PDFs / Word docs in different formats received each day from services. …Time consuming and prone to error due to sheer volume Manager at a GP in South London](./slide-10.png)

<figcaption>

**Child** **protection** **issue** **missed** **in** **A&E** **document**
Important info buried in 100s of letters / PDFs / Word docs
in different formats received each day from services.
***…Time*** ***consuming*** ***and*** ***prone*** ***to*** ***error*** ***due*** ***to*** ***sheer*** ***volume***
**Manager** **at** **a** **GP** **in** **South** **London**

</figcaption>
</figure>
<figure>

![Death notification not actioned notifications sent by post/email, have to be manually uploaded, duty DR notified, then task sent to manager to process the deduction. Manager at a GP in South London](./slide-11.png)

<figcaption>

**Death** **notification** **not** **actioned**
notifications sent by post/email, have to be manually uploaded, duty DR notified, then task sent to manager to process the deduction.
**Manager** **at** **a** **GP** **in** **South** **London**

</figcaption>
</figure>
<figure>

![Staff are covering the Interoperability gaps. Gaps create errors that harm patients. Err 0 rs](./slide-12.png)

<figcaption>

In summary
- Staff are manually covering the interoperability gaps - it’s draining, mechanical work.
- And Those gaps create room for errors that harm patients.

</figcaption>
</figure>
<figure>

![L o s s Data gets degraded Health records are lost](./slide-13.png)

<figcaption>

Next up: Data loss!
I attended the inaugural **Digital** **Preservation** **Coalition** meeting focused on Health records
Conveened by Marcus Baw, and attended by clinicians and health data archivists across the UK!
The takeaway was that we we are storing health records in many different proprietary formats.
As we move data from EPR to EPR it gets degraded,
as it has to be translated from one custom schema to another.
We have retention policies to keep health records for 30 years, and in places like Barts that increase that to 40 years for cancer records.
But if that data is repeatedly degraded along the way it will fail to serve its purpose to inform clinical decisions.

</figcaption>
</figure>
<figure>

![Records moved between 2 EPRs: from the same vendor: 68% fidelity from the different vendors: 22% fidelity](./slide-14.png)

<figcaption>

This paper from 2021 puts a number on it.
When moved between EPRs from the same vendor the mean score was 0.68
for how closely the representation of the info matched the source system.
When moved between EPRs from the different vendors the mean score was 0.22

</figcaption>
</figure>
<figure>

![Bit List: Endangered Digital Materials Immediate action required Loss has already occured](./slide-15.png)

<figcaption>

These problem are reiterated by “the bit list of endangered digital materials”
it lists medical records as “endangered”, with “immediate action required” and “loss has already occurred”

</figcaption>
</figure>
<figure>

![L o s s Letting vendors pick terminology creates confusion. Letting vendors pick our data formats causes degradation of our health records.](./slide-16.png)

<figcaption>

Letting vendors pick terminology
creates confusion.
Letting vendors pick our data formats
causes degradation of our health records.

</figcaption>
</figure>
<figure>

![S p r a w l Some hospitals have over 400 IT Systems. Treating a patient can involve 10 or more systems.](./slide-17.png)

<figcaption>

Digital Sprawl - the NHS has A LOT of IT systems.
Some hospitals have over 400 IT Systems.
Treating a patient can involve 10 or more systems.
This drains clinicians time.

</figcaption>
</figure>
<figure>

![44 thousand IT systems connected to the NHS Spine There are many more ad-hoc and shadow IT systems out there too.](./slide-18.png)

<figcaption>

Not a problem in itself, but just for a sense of scale,
there are 44 thousand IT systems connected to the NHS SPINE now,
from 26 thousand organisations.
There are many more ad-hoc shadow IT systems out there too.

</figcaption>
</figure>
<figure>

![Distinct EPR Systems per County Some have more than 10. That’s ok! Convergence on a single provider cannot be the goal. (Monopoly rent extraction!) source: 6b.health](./slide-19.png)

<figcaption>

Using data from 6b.health pieced together data on the EPR in use at every trust
So I built a chart to show the number of distinct EPR systems per county.
Some have 10! That’s ok!
This is a somewhat risky chart to share.
…one way to interpret it is we should have fewer distinct EPR systems!
That we should standardise on one.
But economists would call that a market failure, a monopoly.
Historically, monopolies lead to predictable outcomes:
the product gets more expensive while the quality stalls or declines.

</figcaption>
</figure>
<figure>

![Convergence on a single provider is not interoperability. Removing diversity is a failure mode.](./slide-20.png)

<figcaption>

Diversity in the market is good. You want competition!
What we need are open data formats and protocols
so we can easily swap between providers without laborious and “degrading”, translation work.
Convergence on a single provider is not interoperability!
- It’s worth calling this out, as it seems to come up a lot.
- For example
- The GPs in south london have been told by the ICB that if they will only get tech support for EMIS.
- If you use anything else, you are on your own.
- …Add you will have additional manual reporting overhead that you have to do!
- Consequently south london GPs all use EMIS accept for one maverick who is trialling Medicus!
This isn’t how it should work!

</figcaption>
</figure>
<figure>

![– Intermission –](./slide-21.png)

<figcaption>

How we doing? Any questions so far?

</figcaption>
</figure>
<figure>

![Good Sources: Dr. Victoria Betton & 6b.health](./slide-22.png)

<figcaption>

A quick plug for good sources of information:
If you are interested in this stuff too,
I highly recommend Dr Betton’s book “Towards a digital ecology”,
which surfaces the many challenges that software projects in the NHS face.
And 6b.health - they just keep publishing really useful open data on IT systems the NHS uses today.

</figcaption>
</figure>
<figure>

![What are the blockers?](./slide-23.png)

<figcaption>

Next up, what is blocking progress on interoperability!
I’m going to summarise some themes that came up in interviews.

</figcaption>
</figure>
<figure>

![Political Pressure - The centre feels pressured to deliver efficiency improvements ASAP. - Working with EPR vendors to add an API takes over 2 years to get it deployed in enough trusts to show any improvements. - Bespoke work to translate between whatever APIs are already there delivers small improvements quickly. # Whack-a-mole interop. Case-by-case. Expensive. Politically viable.](./slide-24.png)

<figcaption>

Political Pressure
The centre feels pressured to deliver efficiency improvements ASAP.
Working with EPR vendors to add an API takes over 2 years to get it deployed in enough trusts to show any improvements.
Bespoke work to translate between whatever APIs are already there delivers small improvements quickly.
*Whack-a-mole* *interop.* *Case-by-case.* *Expensive.* *Politically* *viable.*

</figcaption>
</figure>
<figure>

![Organisational Churn 2016 NHS Digital created # I deliver software now. 2019 NHS X created # I decide digital strategy now! 2021 Now ICSs exist # Shift the focus of all interop work! 2022 NHS X folds into NHSE # But! 2023 NHS Digital folds into NHSE # Whut!? 2025 NHSE to fold into DHSC in 2027 # … There has been a significant org change roughly every 2 years. Digital interop work at scale requires steady focus over a decade.](./slide-25.png)

<figcaption>

Organisational churn!
I’m not gonna narrate the blow by blow… but its a lot.
In England there has been a A significant org change roughly every 2 years.
Digital interop work at scale requires steady focus over a decade!
This reinforces a short term focus.
Work that can be completed in less than a year stands a greater chance of getting done.

</figcaption>
</figure>
<figure>

![Priorities - Hospitals prioritise local needs first. - Interop with other sites will never be their top priority. - ICBs should be pushing cross site interop. - Do they have resources, support, and people to drive it? - Coercing all GPs to use the same is not ERP is not the way.](./slide-26.png)

<figcaption>

Priorities
Hospitals prioritise local needs first.
- Interop with other sites will never be their top priority.
ICSs should be pushing cross site interop.
- Do they have resources, support, and people to drive it?
- (i dont know yet, but the implication is no, …pls tell me if you know more here)
- Coercing all GPs to use the same is not ERP is not the way.

</figcaption>
</figure>
<figure>

![What is happening?](./slide-27.png)

<figcaption>

So what work is happening?
I’m going to share some ideas from the digital transformation experts.

</figcaption>
</figure>
<figure>

![Patterns of Digital Transformation Come in high: Start with a user facing part and work down the stack. Services: Start with an end-to-end service, UI to data. Keep going. Components: create building blocks. Compose and reuse. Come in low: Start with the data layer and build up.](./slide-28.png)

<figcaption>

David Eaves discusses patterns that we see in large scale Digital transformation efforts
Theres: “Come in high: where you start with the user facing part and work down.
Get in between the user and the current mess, show value to the public quickly.
- GDS started here with gov.uk - built a common publishing platform for all gov services to present themselves to citizens.
Or start with one end-to-end service, tackling everything from the UI to the data layer for a specific user need.
Or build out fundamental components first like Identity and payment systems, that you then reuse to build user facing services.
- India’s national DPI stack started here with Aadhar digital id scheme.
OR you can “Come in low”: start with the data layer and build up.
- Estonia’s x-road is an example of this. They focused on getting existing data out of the silos.

</figcaption>
</figure>
<figure>

![Original slide by David Eaves](./slide-29.png)

<figcaption>

To visualise this I’m gonna reuse open source components!
- A slide from the Digital public infrastructure expert David Eaves!
- with an open licensed image created by Digital government expert Richard Pope!
But let’s update it for the NHS!

</figcaption>
</figure>
<figure>

![NATIONAL HEALTHCARE NHS App NHS Notify FDP Original slide by David Eaves MAVIS](./slide-30.png)

<figcaption>

Taa daa
here The NHS App is a service that represents the “come in high” strategy.
Hide the current complexity from the users behind a uniform behind a user interface you control.
- while we work on upgrading the old plumbing that feeds it
- It creates a focal point for interoperability work - all new services should share data with patient via NHS App.
MAVIS tackles a whole service end-to-end to ensure it works seamlessly for the users and the data gets to where it needs to be…
- build enough of these and you have a digital platform!
NHS notify - a shared component that lifts a burden from all other services that adopt it, and creating a more consistent experience for users.
The FDP: This represents the “Come in low” strategy organise the data - And then build up from there.
My assertion is we need a more radically interoperable strategy for the data layer, so let’s look at how the FPD works.

</figcaption>
</figure>
<figure>

![Federated Data Platform # Foundry platform everywhere Leave messy data in trusts - copy data up to foundry - clean up data in foundry - use data via foundry](./slide-31.png)

<figcaption>

I can talk about this alot, but I’d summarise the strategy as “use the palantir foundry platform everywhere”
As a plan it acknowledges that changing things at every trust may take too long.
so to speed things up it leaves the data in trusts as it is.
- It copies it up to the foundry platform
- Cleans it up in the foundry platform
- And provides access to it via the foundry platform

</figcaption>
</figure>
<figure>

![# Palantir Foundry platform everywhere open format: no open protocol: no compatible alternatives: 0 pattern: single vendor platform Case: Federated Data Platform](./slide-32.png)

<figcaption>

- But it’s not an interoperable solution:
- Its not using open formats
- The governance of the Canonical Data Model isn’t open
- It’s not using an open protocol to move the data
- We are using a proprietary data collection agent to copy data up to Foundry
- We can’t reuse that tool to send data elsewhere like the new Health Data Research Service project.
- We can only access the data via foundry
So we are back in that single vendor mode, that looks like interop but isn’t.

</figcaption>
</figure>
<figure>

![# Challenge! Vendor lock in (everywhere!) - Dependant on foundry for clinical work - No incentive to change old EPRs in trusts - Result: weak negotiating position Case: Federated Data Platform](./slide-33.png)

<figcaption>

The obvious challenge is what to do about the vendor lock in.
- As the amount data in it grows
- And hospitals update workflows to depend on Foundry for operational and clinical work
- We lack a credible exit.
- And end up in a weak negotiating position when the contract comes up for renewal.
It also cements in the old EPRs in the trusts as well.
- Once we have written the custom transforms for it
- There is an incentive to keep the old one in place, otherwise we have to redo that work.

</figcaption>
</figure>
<figure>

![What is happening elsewhere?](./slide-34.png)

<figcaption>

**What** **is** **happening** **elsewhere****?**

</figcaption>
</figure>
<figure>

![Example: Catalonia’s knowledge driven platform](./slide-35.png)

<figcaption>

The Catalonian national health service also taking this “come in low” approach

</figcaption>
</figure>
<figure>

![Case: Catalonia’s knowledge driven platform # Fix the data at the source Upgrade the EPRs in hospitals to: - Store data in an open format - Split data store from apps - Share access via open protocol - Copy good data to centre (backup & share)](./slide-36.png)

<figcaption>

They call it “driving semantic coherence”
I’d summarise it as “fix the data at the source”
They are 2 years into a 6 year plan to
- Upgrade the EPRs in every hospital
- To store the data in an open format
- Split the data store from the EPR app services (letting change EPRs and a/b test them without harming the data)
- And sharing access with other systems via open protocols
They also copy that data up to a central regional repository,
for resilience and to replicate it to other hospitals as needed.
It’s moving the exact same data around in the same open data format to all locations.
That avoids the degradation issue when moving between different EPR data models.

</figcaption>
</figure>
<figure>

![# openEHR everywhere open format: yes open protocol: yes compatible alternatives: 10+ pattern: interop via open standards Case: Catalonia’s knowledge driven platform](./slide-37.png)

<figcaption>

So they have are moving to
- An Open format
- And open protocol
- And an ecosystem of vendors
Vendors:
- Better (./slovina)
- Vitagroup and EHRbase (germany
- DIPS (Norway
- more…

</figcaption>
</figure>
<figure>

![Case: Catalonia’s knowledge driven platform # Challenge! Upgrading the EPRs in every hospital! - old EPR writes to new open format locally - new systems to integrate with open format - next: Replace EPR with native openEHR one - result: incremental improvement at the edge](./slide-38.png)

<figcaption>

Challenge!
Upgrading the EPRs in every hospital!
Then plan is to start by getting
- The old EPRs to write to new open format locally
- Any new systems will integrate with open format rather than the old EPR
- When the contract expires: replace EPR with one that uses the open format natively.
- The result they are aiming fo is incremental improvement at the edge
- Or “semantic coherence”

</figcaption>
</figure>
<figure>

![Elsewhere - Australia: FHIR everywhere + Aus Clinical Data for Interoperability (AUCDI) - Norway: openEHR everywhere - India: National DPI components and open protocols everywhere](./slide-39.png)

<figcaption>

What’s going on elsewhere?
I need to dig deeper on these but at a high level
Australia: is moving to FHIR as its open protocol
And the Ausralian Clinical Data for Interoperability team are deciding the open formats to us
Norway: is openEHR everywhere for the format and protocol
India: is an interesting case, it’s healthcare data solution is still TBD, but in general they are focused
On building out National DPI components and open protocols everywhere, deciding the rules of the game at the national level
But getting private companies to build implementations of those protocols.

</figcaption>
</figure>
<figure>

![What should we do?](./slide-40.png)

<figcaption>

so, what should we do?

</figcaption>
</figure>
<figure>

![♔ KEEP CALM! A N D OPEN SOURCE OPEN FORMAT OPEN PROTOCOL](./slide-41.png)

<figcaption>

Keep calm and open source, open format and open protocol!
The DPSP should keep on building high quality end-to-end services that solve a problem well.
If you keep adding more services you will end up with a digital “platform”
and the shared components like notify that make it easier to build more.

</figcaption>
</figure>
<figure>

![Slide 42](./slide-42.png)

<figcaption>

Better still, if you find the open protocols we need that allow public and private teams
to collaborate on building pieces of the puzzle that work together.
Choose plug sockets and the data formats that let us to plug in different solutions and a/b test them, in-situ,
rather than locking us in to their service, or capturing all the data.
Notably AWS kept on adding services.
It now has hundreds and it is definitely a “platform”
millions of developers now build solutions on top of it.
A nationally owned digital platform could allow public and private delivery of interoperable solutions.
But that puts a lot of work on the NHS to build all the services.
AWS also accidentally built a de-facto protocol with it’s S3 API.
Now there are dozens of services and hundreds of tools that implement that API. it started as an API for a single service, as part of a platform, but has become a protocol that many systems understand.
For healthcare we’ll need well governed, open protocols that are multiplayer… and don’t assume that the FPD or EPIC etc will always be the thing that holds the data.

</figcaption>
</figure>
<figure>

![interoperability that is loosely coupled across a diverse ecosystem](./slide-43.png)

<figcaption>

We need solutions that lead to a form of digital interoperability
that is loosely coupled
across a diverse ecosystem
not a single vendor monoculture.

</figcaption>
</figure>
<figure>

![If you’ve spotted errors or have suggestions please get in touch! mailto:oli@zilla.org.uk](./slide-44.png)

<figcaption>

For me: I’m about to start digging into what is needed
To coax the duopoly of EHR providers for GPs in the UK to use open data format
and what would help open solutions compete in that market.
If you have any info on that please share
If you’ve spotted errors or have suggestions, please get in touch:
[oli@zilla.org.uk](mailto:oli@zilla.org.uk)
TAA DAA.

</figcaption>
</figure>

---

_Original Deck: [docs.google.com/presentation/d/1p-vwbdQgK_wU4Lzj75cWnt5rxd60FQexiFR76XqP5Mg](https://docs.google.com/presentation/d/1p-vwbdQgK_wU4Lzj75cWnt5rxd60FQexiFR76XqP5Mg/edit)_

_Published: 2026-05-28_
