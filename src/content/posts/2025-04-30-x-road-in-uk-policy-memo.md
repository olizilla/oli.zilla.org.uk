---
layout: ../../layouts/2025.astro
slug: 2025/04/30/x-road-in-uk-policy-memo
published: true
tagline: "Reducing the time-tax of government services through digital interoperability"
---

# Adopting X-Road in the UK

_An essay for the IIPP Innovation and Public Purpose MPA: Digital Transformation module._

The ask was to *"Write an extended policy memo to your head of government explaining the risks and opportunities associated with adopting the X-Road for your country."*

That felt like the cart leading the horse, so I framed the memo around _"Demonstrating progress on interoperability"_ reducing the [time-tax of government services on users](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#what-we-want-to-deliver). Leadership should focus on defining desired outcomes rather than dictating the implementation.

My aim is to indulge the interest in X-Road, but position our current national focus on public APIs as the way to get the benefits of X-Road without the disruption. Combining it with open logging and auth standards gives us a way to demonstrate progress quickly, and preserves flexibility to change our minds later.

## Acknowledgments

Specific thanks go to Petteri Kivimäki, CTO of NIIS, who fielded my questions in the X-Road Community Slack, and whose extensive and open [blogging about X-Road](https://www.niis.org/blog-summary) and clarity on what it does and *does not do* has been extremely helpful in forming this memo.

I acknowledge a fascinating conversation with Google's Gemini LLM chatbot about X-Road and delegated auth strategies that brought [RFC 8693 for OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html) to my attention. I assert that all the writing and summarising here is my own. No generated content has been included in this work.

---

<div style="page-break-after: always;"></div>

# Demonstrating progress on interoperability

_To: Rt Hon Sir Keir Starmer_<br/>
_From: Chief Digital Advisor_

Per the blueprint we must demonstrate progress on interoperability and reducing the [time-tax of government services on users](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#what-we-want-to-deliver).

I propose creating a dashboard to show reductions in this time-tax, focusing on API utilisation and performance, as well as reductions in service complexity tracking total questions asked to achieve an outcome, percentage of questions that can be pre-filled thanks to interoperable APIs, and tracking the failure cost for each service in terms of time spent resolving issues via our call-centres and online help to ensure progress is not at the cost of leaving some behind.

To get there we will need every department to present their service as an API with clear metrics on usage and performance, and a technology foundation that catalyses cross-department data sharing in a safe and legible way.

[**X-road** has pedigree here](https://www.x-tee.ee/factsheets/EE/#eng), but there are significant challenges to adopting it in the UK given our existing platforms, discussed in option 1.

I recommend continuing with our current strategy: building **public APIs** on open standards, along with the adoption of key learnings from X-Road, as discussed in option 2.

## Option 1: X-Road

X-Roads responsibilities are *authentication*: asserting which departments may access data from which others; and *logging*: recording all data that passes between systems. It can lift bureaucratic concerns out from the implementation details of APIs, making legible "who has access to what", and ensuring consistent records of that access are kept.

### Overview: How X-Road works today

Every department that has data to offer (provider) or needs data from another (consumer) must run a "Security Server" to represent them on the X-Road network. A data provider's Security Server implements authentication by defining which other Security Servers on the network may request data from it.

Membership of the network is controlled by the X-Road Central Server. A Security Server and hence the department (or business) it represents may only participate if blessed by the Central Server.

A request for data is sent from the consumer system to its local Security Server and is relayed on to the providers Security Server. If the request is from a department that the provider allows, then the request is relayed on to the providers API which then sends a response back through both Security Servers. The request and response may be *logged* in both Security Servers. 
#### Key points

- All data transferred over X-Road is proxied through 2 Security Servers and logged at each.
- Access control is per department not per user.
- API consumers must run X-Road software or have that service provided to them.

<div style="page-break-after: always;"></div>

### Context: A product of its time

X-Road was started in 2001 when Estonia had few APIs and many data silos.

Also in 2001 Java became the most popular programming language (X-Road is written in Java), and auto-generating "Simple Object Access Protocol" (SOAP) APIs from your existing codebase was a hot topic in that ecosystem. Enterprise developers were not used to thinking in terms of public APIs. Generating the interface from the code they had already saved expensive developer time.

In 2002 X-Road adopted SOAP as it's API standard. To add an information system to an X-Road network it had to expose a SOAP API. In return, X-Road would handle the request logging and authentication logic, essential functions that are critical to get right.

Where you had no APIs previously, there was now a clear path where each data silo only needed to generate a rudimentary SOAP interface, and have X-Road take on cross-cutting, high stakes issues around trust, access control, and observability.

But [SOAP lost the API race](https://www.niis.org/blog/2018/4/3/x-road-and-rest). Everything is HTTP and REST now. In 2019 [X-road added support for proxying REST](https://www.niis.org/blog/2019/10/6/get-some-more-rest)as well as SOAP interfaces. It does not translate between the two. You must guide your many data providers to standardise on one. If left unmanaged you have two parallel networks with no interoperability between systems expecting to talk SOAP and those expecting HTTP.

### Where it's heading: Standardisation

X-Road is under active development by Nordic Institute of Interoperability Solutions (NIIS), a partnership between Estonia and Finland. It was published as open source and moved to a compatible MIT license in 2015.

To date X-Road has been developed as a product based on standards rather than a standard itself. This means there are currently no competing compatible alternatives to X-Road and NIIS has complete control over the direction of the project. 

The next major release (version 8 aka "Spaceship") aims to [replace X-Road's custom protocols with standardised ones from the EU Gaia-X endeavour](https://www.niis.org/blog/2023/12/20/niis-announces-proof-of-concept-for-revolutionary-x-road-8-spaceship). This will allow it to interoperate with other nation's data-exchange systems and pave the way for alternative X-Road implementations. It will also reduce the control that NIIS has over the details of the subsystems that move to standards defined by other agencies.

### Benefits of adopting X-Road

In an ideal deployment X-Road is fully responsible for authentication, providing strong cryptographic guarantees that the data consuming system and the provider are both trusted, and allowed to share data.

A data provider only has to make their API available to their local Security Server and there is then a clear path for many other departments to make use of that data. Once there is a MoU between the departments, it can be codified in X-Road config, and the consumer can start working on integrating the providers data into their system.

New APIs can be developed quickly with less pressure to write bespoke access control code. The non-reputable access logging encourages data providers to share everything, All the data is available, but consumers accessing data they should not will be evident in the logs.

<div style="page-break-after: always;"></div>

### Challenges to adopting X-Road in the UK today

- Multiple sources of truth for authentication logic risks data security errors.
- X-Road logs must either contain PII and auth tokens or have the non-reputable aspect disabled.
- Data consumers required to run unfamiliar software to access APIs.

**Authentication:** The UK has hundreds of published APIs already. ([243 under gov.uk alone](https://www.api.gov.uk/index/#index).) Each API has its own authentication and authorisation flow established. If we roll out X-Road today, we would likely have to avoid using X-Roads support for the same features to ensure we retain a single source of truth. This reduces the value of one of X-Roads main features.

Alternatively we would have to devote engineering time to removing auth logic from existing APIs and replacing it with the equivalent X-Road config. This would involve significant, high skill work, with no immediate improvement to end-user experience.

**Logging:** X-Roads non-reputable logs that can be used as evidence under eIDAS are another key feature. That requires full message body logging to be enabled. This means the X-Road logs will contain PII data and any authentication tokens required for the consumer to access the provider system. This makes those logs a GDPR and security risk.

This problem is common enough that X-Road makes it simple to disable message body logging, such that only the metadata of the interaction is recorded, but this also means the logs are no longer verifiable. Their primary use becomes tracking metrics as they are no longer a strong deterrent to unauthorised data access. This diminishes the value of the other key feature. 

Alternatively if we require each API provider to take ownership of the Security Server such that it is deployed as part of their information system, we can [avoid creating a separate PII repository](https://www.niis.org/blog/2018/6/3/x-road-logs-explained-part-2). Combine that with doing the work to move all auth logic for each existing API into X-Road, and we can avoid the security hazard of logging auth tokens. But again this is nuanced work that would not deliver visible improvements to end-users.

**Data consumers must run unfamiliar software:** Per our [API technical guidelines](https://www.gov.uk/guidance/gds-api-technical-and-data-standards) most of our APIs are already available directly over HTTP. This is familiar to developers and every language ecosystem has robust tooling to for that job. We want to encourage people to experiment and build on our APIs. Requiring every org that wants to consume data from our APIs to run an X-Road server is a high bar; direct access is the norm, and there are very few developers who have worked with X-Road.  There is also evidence that a Security Server is not currently a lightweight process to run. [1](#footnotes) [2](#footnotes)

On the other hand if we limit the use of X-Road only to internal inter-government use cases then we reduce another of X-Roads key value propositions of cross-sector and cross-border federated access.

Adopting X-Road for existing APIs would be a very visible change with many stakeholders: every government department with an API and the many businesses who consume those services. It is also notable that a Security Server is not a transparent proxy. It changes the shape of the APIs it proxies, prefixing the target information system in all URL paths. Every consumer of the APIs would have to update their existing integration code too.

<div style="page-break-after: always;"></div>

## Option 2: Public APIs *(recommended)*

The purpose of an API is to be accessed by other systems. They should be designed to do that job well. This includes being very clear about who should be allowed to access the data, as well as recording access, performance, and observability metrics.

This is our current strategy, and with very little additional work we can quickly demonstrate progress on interoperability, adopting ideas from X-Road to strengthen our position on authentication and logging.

**Authentication**: The GOV.UK One Login service solves end-user authentication for our APIs, and conforms to well adopted standards (OpenID, OAuth). By clearly documenting auth delegation patterns we can also use it to solve system-to-system auth at a granular level by relaying the end user information between systems. It is a well documented issue and [RFC 8693 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html) is the standard extension to OAuth to converge on for system-to-system auth.

APIs are not freed from having to decide which users should have access to what data, and we must continue to support that work with clear guidance, training, and rules on data governance.

**Logging:** An API gateway is a transparent proxy that sits in front of the data providers API. Using an API gateway to manage common deployment issues is already [part of our recommendations](https://www.gov.uk/guidance/gds-api-technical-and-data-standards). Systems using one will already have access logs in a standard format. Those that don't already can adopt one with no impact on existing integrations. There are many open source options for aggregating logs to derive performance metrics, and the problem is well contained so we retain the flexibility to adapt how we do it in the future.

## Comparison

| X-Road                                        | Public APIs with API Gateway                              |
| --------------------------------------------- | --------------------------------------------------------- |
| Auth is per org                               | Authentication is flexible but left to each api to decide |
| Incremental adoption possible                 | Incremental adoption possible                             |
| Reliable (HA) deployment requires extra nodes | API gateway already part of a reliable deployment         |
| Changes shape of existing interfaces          | Transparent - no impact on existing interfaces            |
| Requires consumer to run specific app         | No additional requirements on consumers                   |
| Captures all access logs                      | Captures all access logs                                  |
| Is clear when logs have been altered          | Would need extra work to make logs tamper evident         |
| Logs contain PII and security sensitive info  | Custom log scrubbing is trivial                           |

<div style="page-break-after: always;"></div>


## Recommendation

- Continue to invest in GOV.UK One Login. Document delegated access patterns that work today. Work on adding [RFC 8693 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html) support as the standard to converge on for system-to-system auth.
- Require collection of common access logging across all APIs, either via an API Gateway or a shared logging module.
- Use the data to create a dashboard to visualise reductions in the time-tax of our services in terms of system performance metrics
	- Also include data on reductions in service complexity in terms of total questions asked per service, percentage of questions that can now be pre-filled thanks to interoperable APIs.
	- Track the failure cost for each API in terms of minutes spent resolving issues via our call-centres and online help, so we can verify that increased digitalisation is not at the cost of leaving some behind.

This will show visible progress quickly, retains the flexibility for future, and aligns well with our published [digital priorities](https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html#a-six-point-plan-for-government-digital-reform) points 3, and 6:

- Strengthen and extend our digital public infrastructure: **expanding GOV.UK One Login and other common components.**
- Commit to transparency, drive accountability: **publishing and acting more on performance data.**

Sincerely,

Chief Digital Advisor


<div style="page-break-after: always;"></div>

## Footnotes

1. X-road is not a light: "even if the Security Server is containerized, the footprint of the Sidecar container is still relatively massive compared to the footprint of average containers." - https://www.niis.org/blog/2020/9/1/security-server-sidecar-part-3
2. X-road 8 promises a "light context" to reduce the burden on consumers : https://x-road.global/development-roadmap

---

## Bibliography

_A blueprint for modern digital government (HTML)_. (2025, January 21). GOV.UK. https://www.gov.uk/government/publications/a-blueprint-for-modern-digital-government/a-blueprint-for-modern-digital-government-html

_API technical and data standards_. (2024, July 19). GOV.UK. https://www.gov.uk/guidance/gds-api-technical-and-data-standards

Blake Jackson, E., Dreyling, R., & Pappel, I. (2021, October). *A historical analysis on interoperability in Estonian data exchange architecture: perspectives from the past and for the future.* In Proceedings of the 14th international conference on theory and practice of electronic governance (pp. 111-116).

Centre for Public Impact. (2024, September 18). _e-Estonia, the information society since 1997 - Centre for Public Impact_. https://centreforpublicimpact.org/public-impact-fundamentals/e-estonia-the-information-society-since-1997

_Estonia’s X-Road: data exchange in the world’s most digital society_. (n.d.). https://govinsider.asia/intl-en/article/estonias-x-road-data-exchange-in-the-worlds-most-digital-society

_How GOV.UK One Login works - One Login_. (n.d.). One Login. https://tech-docs.account.gov.uk/how-gov-uk-one-login-works/

Kivimäki, P. (2019a, October 28). _Nordic Institute for Interoperability Solutions — Get some more REST_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2019/10/6/get-some-more-rest

Kivimäki, P. (2019b, October 29). _Nordic Institute for Interoperability Solutions — X-Road Logs Explained – Part 3_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2018/6/12/x-road-logs-explained-part-3

Kivimäki, P. (2019c, October 31). _Nordic Institute for Interoperability Solutions — X-Road Logs Explained – Part 1_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2018/5/27/x-road-logs-basics

Kivimäki, P. (2019d, October 31). _Nordic Institute for Interoperability Solutions — X-Road Logs Explained – Part 2_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2018/6/3/x-road-logs-explained-part-2

Kivimäki, P. (2022a, January 18). _Nordic Institute for Interoperability Solutions — Message Logging in X-Road 7_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2021/9/29/message-logging-in-x-road-7

Kivimäki, P. (2022b, January 18). _Nordic Institute for Interoperability Solutions — Protecting Data at Rest in X-Road 7_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2021/10/2/protecting-data-at-rest-in-x-road-7

Kivimäki, P. (2022c, April 11). _Nordic Institute for Interoperability Solutions — Interoperability puzzle_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2020/1/20/interoperability-puzzle

Kivimäki, P. (2025, January 8). _Nordic Institute for Interoperability Solutions — X-Road Myth Busting – Part 1_. Nordic Institute for Interoperability Solutions. https://www.niis.org/blog/2018/9/3/x-road-myth-busting-part-1

_Manage your data for access and reuse_. (2020, November 27). GOV.UK. https://www.gov.uk/guidance/manage-your-data-for-access-and-reuse

Nordic APIs. (2019, November 5). _X-Road – Open source Data Exchange Layer_ [Video]. YouTube. https://www.youtube.com/watch?v=YWWknjpZCLs

nordic-institute. (2025, April 11). _X-Road/doc/Architecture/arc-sec_x_road_security_architecture.md at develop · nordic-institute/X-Road_. GitHub. https://github.com/nordic-institute/X-Road/blob/develop/doc/Architecture/arc-sec_x_road_security_architecture.md


