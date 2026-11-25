---
layout: ../../../layouts/2025.astro
publishDate: 2026-11-24
title: "The NHS App"
slug: 2026/11/24/nhs-app-data-map
draft: false
tagline: "Mapping how our data gets there. Recommendations for what to do next."
toc: false
emoji: '📲'
---

<p class="lede">The NHS App shows us an aggregated view of our interactions with the NHS. Patients assume NHS staff can see the same view. They can't, and it's frustrating for both parties. <i>What would need to happen to <a href="/nhs-data-strategy/v2/">make that possible</a>?</i></p>

In the meantime **patients are showing the NHS App on their phone directly to clinicians** as a quick way to share their info. _Let's pave that cow path!_

If their app explained that it shows a more complete view than any one clinician has access to, it would give a more accurate mental model, reduce frustration, and may even be seen as a _good thing_.

It also sets us up for _consent-based sharing_ where they choose to hand over their phone, or show a QR code, that lets a clinician read the records on the spot. A dedicated sharing mode could let the patient scope the data to be shared if they wish, or simply log what aspects of the full record the clinician views in a way that both parties can see.

### How data gets into the NHS App

<div class="letterbox"><img
	data-inline
	src="/res/img/posts/2026-11-24-nhs-app-data-map.svg"
	alt="Diagram of how data reaches the NHS App. On the left are national services, GP practices and hospital trusts and regional services. Their lines run to the NHS App backend in the middle, or straight to the NHS App on the right as web views. Red lines are IM1, from EMIS and TPP. Orange lines are FHIR. Dashed lines are web views, where the data stays with the source."
/></div>

<small>Select a box to see its sources, or [open the image on its own page](/res/img/posts/2026-11-24-nhs-app-data-map.svg). Drawn from the [public sources](#sources). The main ones are NHS England's data protection impact assessment (DPIA) for the NHS App, its master data specification (MDS) and its technical specification.</small>

### Recommendations

- When patients download or share their record, give them a patient summary in one published UK profile of the [International Patient Summary](https://international-patient-summary.net/).
- Have the App coerce supplier data into that profile for now, and publish a validator that suppliers can test their own output against. As suppliers converge on it, the App can delete its translation code.
  - Shared care record providers already produce IPS-shaped summaries with coded medicines, but they claim different profiles: the international IPS profiles, UK Core, or their own. See the [samples collected at INTEROPen's Hack Heavy](https://github.com/INTEROPen/uk-ps-examples) in March 2026.

### Findings

- Data from over 99% of GP practices, using EPRs from EMIS or TPP, reaches the App over IM1: supplier-specific, not FHIR, specs under licence.
- Medicus EPR uses GP Connect (FHIR), but GP Connect's record API lists production as "Not yet available", yet "in use with the NHS App as the consumer".
- Inbox messages are stored in the NHS App backend.
- The inbox may be an accidental longitudinal record store. However it is free text and defined by each sender.
- Clinical records aren't copied: GP record, appointment and prescription items are fetched live.
- FHIR is used at several versions: STU3 (GP Connect record), R4 on UK Core 0.5.1, a 2022 pre-release (EPS; claimed by the NHS App API), 1.0.0 (PDS), 1.1.3 (GP Connect repeats), Wayfinder profiles with no stated UK Core version (PCA).
- Hospital data comes through the Patient Care Aggregator (FHIR R4), or as web views where the data stays in the portal.
- Inbox messages arrive over the NHS App API as FHIR R4 CommunicationRequests with free-text Markdown. Its extension and identifier systems are defined only in OpenAPI, not published as FHIR artefacts.
- Backend to App: app-specific JSON. Codes are passed through as supplied: in my own record, all codes are SNOMED description IDs, not concept IDs (Evans, 2026).
- ICS shared care records are not in the DPIA's list of integrations.
- User actions stored keyed on NHS number, for up to 8 years.
- Usage analytics stored for up to 8 years (10 if needed for NHS England's National Digital Channels programme).
- Email, consents, nominated pharmacy, stored for 12 months.

### Gaps in public sources

- The App's store schemas aren't published, only item lists and retention periods. Short-lived server-side caching is neither confirmed nor ruled out.
- IM1 wire formats are in supplier packs, available only under licence.
- The MDS says GP record items come "via GP Connect"; the technical specification and the DPIA name IM1 for EMIS and TPP.
- DPIA Annex E applies a two-year retention to "MVP past appointment data" without naming the system; the MDS marks appointment items as not retained.
- The MDS marks the NHS number as not retained, while the DPIA says audit data is captured against it.
- The data opt-out: the technical specification calls it a link out, the DPIA an in-app feature.
- Not confirmed: whether the App calls the e-Referral Service directly or only through the PCA.

## Sources

<!-- nhs-app-map:sources: generated from views/data-in.json --also IPS,UKPS-EXAMPLES by scripts/post-sources.mjs; edits between these markers are overwritten -->

<div class="letterbox sources-table">

| Source | By | Year | Describes |
|---|---|---|---|
| [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf) | NHS England | 2026 | [GP practice messaging](#src-gp-messaging), [Hospital trust messaging](#src-trust-messaging), [National programmes](#src-national-programmes), [EMIS Web and TPP SystmOne](#src-emis-tpp), [Medicus](#src-medicus), [NHS login](#src-nhs-login), [EPS on Spine](#src-eps), [Patient engagement portals](#src-patient-portals), [NHS App backend](#src-app-backend), [Online consultations](#src-gp-online-consultations), [Health records and care plans](#src-phr-care-plans), [National web services](#src-national-web) |
| [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification) | NHS England | 2026 | [EMIS Web and TPP SystmOne](#src-emis-tpp), [Medicus](#src-medicus), [NHS login](#src-nhs-login), [PDS](#src-pds), [NHS Notify](#src-nhs-notify), [e-Referral Service](#src-e-rs), [NHS App backend](#src-app-backend), [NHS App](#src-nhs-app), [Online consultations](#src-gp-online-consultations), [National web services](#src-national-web) |
| [*nhs-app-api*](https://github.com/NHSDigital/nhs-app-api) | NHS Digital | 2026 | [GP practice messaging](#src-gp-messaging), [Hospital trust messaging](#src-trust-messaging), [National programmes](#src-national-programmes), [NHS Notify](#src-nhs-notify) |
| [*NHS App API*](https://digital.nhs.uk/developer/api-catalogue/nhs-app) | NHS England | 2025 | [GP practice messaging](#src-gp-messaging), [Hospital trust messaging](#src-trust-messaging), [National programmes](#src-national-programmes), [NHS Notify](#src-nhs-notify) |
| [*NHS App master data specification*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/nhs_app_master_data_specification_v2.00.xlsx) | NHS England | 2026 | [NHS login](#src-nhs-login), [PDS](#src-pds), [EPS on Spine](#src-eps), [NHS App backend](#src-app-backend) |
| [*nhs-app-data*](https://github.com/olizilla/nhs-app-data) | Evans | 2026 | [EMIS Web and TPP SystmOne](#src-emis-tpp), [NHS App backend](#src-app-backend), [NHS App](#src-nhs-app) |
| [*How the Patient Care Aggregator works*](https://digital.nhs.uk/services/patient-care-aggregator/how-the-patient-care-aggregator-works) | NHS England | 2026 | [Hospital trust messaging](#src-trust-messaging), [e-Referral Service](#src-e-rs), [Patient engagement portals](#src-patient-portals) |
| [*NHS App privacy notice: messaging services*](https://www.nhs.uk/nhs-app/about/privacy-legal-information/privacy-notices/messaging-services/) | NHS England | 2026 | [EMIS Web and TPP SystmOne](#src-emis-tpp), [Online consultations](#src-gp-online-consultations), [Health records and care plans](#src-phr-care-plans) |
| [*NHS App roadmap*](https://digital.nhs.uk/services/nhs-app/roadmap) | NHS England | 2026 | [EPS on Spine](#src-eps), [NHS App backend](#src-app-backend) |
| [*Patient Care Aggregator - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir) | NHS England | 2026 | [Patient Care Aggregator](#src-pca-merged), [Patient engagement portals](#src-patient-portals) |
| [*fhir.r4.ukcore.stu1*](https://simplifier.net/packages/fhir.r4.ukcore.stu1/0.5.1) | HL7 UK | 2022 | [EPS on Spine](#src-eps) |
| [*GP Connect (Patient Facing) Access Record - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/gp-connect-patient-facing-access-record-fhir) | NHS England | 2026 | [Medicus](#src-medicus) |
| [*GP Connect Prescriptions Management FHIR API*](https://digital.nhs.uk/restapi/oas/503471) | NHS England | no date | [Medicus](#src-medicus) |
| [*IM1 pairing integration*](https://digital.nhs.uk/services/digital-services-for-integrated-care/im1-pairing-integration) | NHS England | 2026 | [EMIS Web and TPP SystmOne](#src-emis-tpp) |
| [*Interface Mechanism 1 PFS Auth*](https://digital.nhs.uk/developer/api-catalogue/im1-pfs-auth-api) | NHS England | 2026 | [EMIS Web and TPP SystmOne](#src-emis-tpp) |
| [*PDS FHIR API - integrated products*](https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir/integrated-products) | NHS England | 2026 | [PDS](#src-pds) |
| [*Personal Demographics Service - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir) | NHS England | 2026 | [PDS](#src-pds) |
| [*Prescriptions for Patients FHIR API v2*](https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2) | NHS England | 2026 | [EPS on Spine](#src-eps) |
| [*fhir.nhs.uk.wayfinder*](https://simplifier.net/packages/fhir.nhs.uk.wayfinder/1.0.3) | Wayfinder Aggregator | 2024 | [Patient Care Aggregator](#src-pca-merged) |
| [*uk-ps-examples*](https://github.com/INTEROPen/uk-ps-examples) | INTEROPen | 2026 |  |
| [*The International Patient Summary: key health data, worldwide*](https://international-patient-summary.net/) | IPS Web | no date |  |

</div>

<div id="src-pca-merged" class="box-sources" hidden="until-found" data-title="Patient Care Aggregator (Wayfinder)" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Hospital referrals, bookings and waiting lists. FHIR R4, Wayfinder profiles (published); UK Core version not stated: referrals, bookings, waiting lists with waits, letters, questionnaires.

- [*Patient Care Aggregator - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir):
  - [Endpoints, get-referrals-and-bookings, summary](https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir#:~:text=Get%20patients%20referrals%2C%20bookings%2C,questionnaires%20and%20waiting%20lists): “Get patients referrals, bookings, documents, questionnaires and waiting lists”
  - [Technology](https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir#:~:text=specifically%20to%20FHIR%20R4%20%28v4.0.1%29): “specifically to FHIR R4 (v4.0.1) ... It includes some country-specific FHIR extensions, which have been built against FHIR UK Core.”

</div>

<div id="src-eps" class="box-sources" hidden="until-found" data-title="EPS on Spine" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Prescriptions for Patients. FHIR R4, UK Core 0.5.1 (2022 pre-release): prescriptions and barcodes; status tracking rolling out.

- [*Prescriptions for Patients FHIR API v2*](https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2):
  - [Overview](https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2#:~:text=For%20use%20in%20patient%2Dfacing,view%20their%20digital%20prescriptions.): “For use in patient-facing applications such as NHS App, to allow patients to view their digital prescriptions. ... limited information about the status of their prescriptions”
  - [Technology](https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2#:~:text=It%20conforms%20to%20the,to%20FHIR%20UK%20Core.): “It conforms to the FHIR global standard for health care data exchange, specifically to FHIR UK Core. ... It includes some country-specific FHIR extensions, which are built against FHIR UK Core, specifically UKcore.stu1 0.5.1.”
- [*fhir.r4.ukcore.stu1*](https://simplifier.net/packages/fhir.r4.ukcore.stu1/0.5.1#:~:text=fhir.r4.ukcore.stu1%200.5.1%20UK%20Core,and%20Assets%20FHIR%20R4): “fhir.r4.ukcore.stu1 0.5.1 UK Core FHIR profiles and Assets FHIR R4 ... Created: 2022-05-17 11:45 Organization HL7 UK ... updating to the latest versions of the FHIR assets for Sprint 5 of the UK Core Clinical and Technical Assurance.”

</div>

<div id="src-pds" class="box-sources" hidden="until-found" data-title="PDS" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Read and update: nominated pharmacy; FHIR R4, UK Core 1.0.0.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=A%20user%20can%20find,change%20their%20nominated%20pharmacy.), section 3.2.4, Nominated pharmacy: “A user can find out which pharmacy their prescriptions will be sent to. They can also change their nominated pharmacy. ... API integrations to Personal Demographics Service (PDS) and NHS Service Search.”
- [*Personal Demographics Service - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir#:~:text=It%20conforms%20to%20the,support%20the%20capabilities%20interaction.), Technology: “It conforms to the FHIR global standard for health care data exchange, specifically to FHIR R4 (v4.0.1), except that it does not support the capabilities interaction. ... It includes some country-specific FHIR extensions, which are built against FHIR UK Core, specifically UK.core.r4 1.0.0.”

</div>

<div id="src-nhs-notify" class="box-sources" hidden="until-found" data-title="NHS Notify" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Relays messages from GPs, trusts and programmes. FHIR R4, claims UK Core 0.5.1, no profiles: CommunicationRequest, Markdown, max 5,000 chars; App-only IDs, unpublished extension.

- [*NHS App API*](https://digital.nhs.uk/developer/api-catalogue/nhs-app#:~:text=specifically%20to%20FHIR%20R4%20%28v4.0.1%29), Technology: “specifically to FHIR R4 (v4.0.1) ... which conform to FHIR UK Core, specifically fhir.r4.ukcore.stu1 0.5.1.”
- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=The%20NHS%20App%20API,sent%20through%20NHS%20Notify.), section 3.4.1, Notifications and messaging, Integrations: “The NHS App API is used by third-party services to send notifications and messages to NHS App users. This includes those sent through NHS Notify.”

</div>

<div id="src-national-programmes" class="box-sources" hidden="until-found" data-title="National programmes" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

E.g. vaccination invitations. Direct, or via a communications supplier: FHIR R4 CommunicationRequest.

- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=94), p. 94: “The sending service will curate all messages and send them to NHS App Messaging ... Appointed by the Sending Service, a 3rd party Communication Supplier could: ... Have the integration with NHS App Messaging to process the sending of messages”
- [*NHS App API*](https://digital.nhs.uk/developer/api-catalogue/nhs-app#:~:text=send%20in%2Dapp%20messages%20to,of%20the%20NHS%20App), Overview; in-app message endpoint description: “send in-app messages to specific users of the NHS App ... The body of requests made to this endpoint are instances of HL7 FHIR R4 CommunicationRequest resources.”

</div>

<div id="src-nhs-login" class="box-sources" hidden="until-found" data-title="NHS login" data-line="other" data-line-colour="#1f1f1f" data-line-text="#1f1f1f" data-line-shape="OAuth">

P5 or P9 identity: name, DOB, address, NHS number. OAuth sign-in: name, DOB, address, contact details; NHS number via PDS match.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=The%20authentication%20is%20handed%2Doff,using%20the%20OAuth%20protocol.), section 3.1.2, User login: “The authentication is handed-off to NHS login using the OAuth protocol.”
- [*NHS App master data specification*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/nhs_app_master_data_specification_v2.00.xlsx), Master sheet, how each item is processed: first name, date of birth, street address, email address (rows 130, 126, 123, 127): “Retrieved from NHS Login identity data and displayed in the App interface. Not derived ... Supplied through NHS Login identity data; consumed directly by the NHS App for verification. Not derived ... Retrieved from the NHS Login identity service during authentication or profile retrieval. ... Captured and maintained through NHS Login; the App uses it for correspondence and authentication.”

</div>

<div id="src-e-rs" class="box-sources" hidden="until-found" data-title="e-Referral Service" data-line="web-or-planned" data-line-colour="#888" data-line-text="#555" data-line-dash="6 4" data-line-shape="web view">

Web view: choose and book.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=Web%20integrations%20to%20Electronic,and%20Patient%20Engagement%20Portals.), section 3.3.1, Secondary care, Appointments, Integrations: “Web integrations to Electronic Referral Service and Patient Engagement Portals.”

</div>

<div id="src-national-web" class="box-sources" hidden="until-found" data-title="National web services" data-line="web-or-planned" data-line-colour="#888" data-line-text="#555" data-line-dash="6 4" data-line-shape="web view">

Data opt-out, 111 online, vaccine booking, NIHR research. Web integration, mostly NHS login SSO; opt-out opens in a browser.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification):
  - [section 2, System context](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=Web%20integrations%20%2D%20where,to%20continue%20their%20journey.): “Web integrations - where the NHS App directs a user to another NHS or third-party website. Many of these include single sign-on with NHS login, which means that the user does not need to re-authenticate to continue their journey.”
  - [section 3.4.7, Health data sharing; section 4, integration patterns table (Link out)](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=Users%20can%20view%20or,for%20research%20and%20planning.): “Users can view or change their National Data Opt-Out choice at any time and to decide whether their confidential patient information can be used for research and planning. ... The NHS App opens an external web application in a new web browser window. ... Health data sharing preferences”

</div>

<div id="src-emis-tpp" class="box-sources" hidden="until-found" data-title="EMIS Web and TPP SystmOne" data-line="im1" data-line-colour="#c0392b" data-line-text="#c0392b" data-line-shape="IM1">

IM1 PFS: not FHIR, supplier-specific API, licensed spec: record, results, appointments, repeats, messages, as far as the practice allows.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=IM1%20API%20integration%20for,EMIS%20or%20TPP%20software), section 3.2, Primary care: “IM1 API integration for GP practices that use EMIS or TPP software ... The date range, information available and level of detail is controlled by the GP.”
- [*IM1 pairing integration*](https://digital.nhs.uk/services/digital-services-for-integrated-care/im1-pairing-integration#:~:text=you%20will%20be%20asked,the%20provider%20suppliers%27%20APIs.): “you will be asked to execute a Model Interface Licence with each of the provider suppliers, this will cover your use of the provider suppliers' APIs.”

</div>

<div id="src-medicus" class="box-sources" hidden="until-found" data-title="Medicus" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

GP Connect Patient Facing APIs, FHIR. GP record: Access Record API, STU3, live status unclear. Repeat prescriptions: Prescriptions Management API, R4, UK Core 1.1.3.

The App's documents say Medicus practices' records come over GP Connect. GP Connect's Access Record API page says the API is 'in development', with production 'Not yet available', yet 'in use with the NHS App as the consumer'.

- [*GP Connect (Patient Facing) Access Record - FHIR API*](https://digital.nhs.uk/developer/api-catalogue/gp-connect-patient-facing-access-record-fhir):
  - [API status and roadmap; Environments and testing](https://digital.nhs.uk/restapi/oas/503861): “This API is in development. ... Production | Not yet available”
  - [Onboarding](https://digital.nhs.uk/restapi/oas/503861): “The GP Connect Patient Facing APIs are currently only available for New Market Entrant suppliers as data providers, and are in use with the NHS App as the consumer.”
- [*GP Connect Prescriptions Management FHIR API*](https://digital.nhs.uk/restapi/oas/503471):
  - [Overview; Technology](https://digital.nhs.uk/restapi/oas/503471): “Use this API to manage a patient's prescriptions as held by their GP practice. ... request a new instance of a repeat prescription ... specifically to FHIR R4 (v4.0.1)”
  - [Technology](https://digital.nhs.uk/restapi/oas/503471): “It includes some country-specific FHIR extensions, which are built against FHIR UK Core, specifically UKcore.stu2 1.1.3”
- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=GP%20Connect%20PFS%20API,that%20use%20Medicus%20software), section 3.2, Primary care: “GP Connect PFS API integration for GP practices that use Medicus software”

</div>

<div id="src-gp-messaging" class="box-sources" hidden="until-found" data-title="GP practice messaging" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Via suppliers, e.g. Accurx, iPlato, MJOG. Direct, or via a communications supplier: FHIR R4 CommunicationRequest.

- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=94), p. 94: “The sending service will curate all messages and send them to NHS App Messaging ... Appointed by the Sending Service, a 3rd party Communication Supplier could: ... Have the integration with NHS App Messaging to process the sending of messages”
- [*NHS App API*](https://digital.nhs.uk/developer/api-catalogue/nhs-app#:~:text=send%20in%2Dapp%20messages%20to,of%20the%20NHS%20App), Overview; in-app message endpoint description: “send in-app messages to specific users of the NHS App ... The body of requests made to this endpoint are instances of HL7 FHIR R4 CommunicationRequest resources.”

</div>

<div id="src-gp-online-consultations" class="box-sources" hidden="until-found" data-title="Online consultations" data-line="web-or-planned" data-line-colour="#888" data-line-text="#555" data-line-dash="6 4" data-line-shape="web view">

Ask your GP, e.g. Accurx, eConsult, Patchs, Engage, iPlato. Web view in the App, NHS login SSO; hosted by the supplier.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=Web%20integrations%20with%20Online,NHS%20App%20mobile%20app.), section 3.3.2, Online consultations: “Web integrations with Online Consultation (OLC) tools, displayed within the NHS App mobile app. ... NHS login integration so that the user's identity is securely handed over to the OLC tool and they do not need to re-authenticate.”
- [*NHS App privacy notice: messaging services*](https://www.nhs.uk/nhs-app/about/privacy-legal-information/privacy-notices/messaging-services/#:~:text=Although%20accessed%20through%20your,service%20and%20see%20messages.), Online consultation services: “Although accessed through your NHS App, they are hosted by a supplier contracted by your healthcare provider. You may be taken to the supplier's system to access this service and see messages.”

</div>

<div id="src-patient-portals" class="box-sources" hidden="until-found" data-title="Patient engagement portals" data-line="web-or-planned" data-line-colour="#888" data-line-text="#555" data-line-dash="6 4" data-line-shape="web view">

DrDoctor, Zesty, PKB, Healthcall. Web view: letters, questionnaires, booking changes, paperless preference.

- [*How the Patient Care Aggregator works*](https://digital.nhs.uk/services/patient-care-aggregator/how-the-patient-care-aggregator-works#:~:text=The%20hyperlink%20takes%20them,the%20portal%20web%20application.), Bookings and referrals, how it works: “The hyperlink takes them to a ‘patient portal’ - an NHS-styled, standardised web application within the secondary care booking system (or e-RS) that shows them the details for the booking. In some cases, the patient can amend or cancel their booking via the portal web application.”
- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=99), p. 99: “Zesty ... Appointments (2); Paperless preference; Documents (2); Questionnaires (2)” _The row for Induction Healthcare's Zesty portal._

</div>

<div id="src-trust-messaging" class="box-sources" hidden="until-found" data-title="Hospital trust messaging" data-line="fhir" data-line-colour="#d68910" data-line-text="#9c640c" data-line-shape="FHIR">

Via patient portals, e.g. DrDoctor. Direct, or via a communications supplier: FHIR R4 CommunicationRequest.

- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=94), p. 94: “The sending service will curate all messages and send them to NHS App Messaging ... Appointed by the Sending Service, a 3rd party Communication Supplier could: ... Have the integration with NHS App Messaging to process the sending of messages”
- [*NHS App API*](https://digital.nhs.uk/developer/api-catalogue/nhs-app#:~:text=send%20in%2Dapp%20messages%20to,of%20the%20NHS%20App), Overview; in-app message endpoint description: “send in-app messages to specific users of the NHS App ... The body of requests made to this endpoint are instances of HL7 FHIR R4 CommunicationRequest resources.”

</div>

<div id="src-phr-care-plans" class="box-sources" hidden="until-found" data-title="Health records and care plans" data-line="web-or-planned" data-line-colour="#888" data-line-text="#555" data-line-dash="6 4" data-line-shape="web view">

Patients Know Best, Universal Care Plan. Web integration; hosted by the supplier, may need its own log-in.

- [*NHS App privacy notice: messaging services*](https://www.nhs.uk/nhs-app/about/privacy-legal-information/privacy-notices/messaging-services/#:~:text=Although%20accessed%20through%20your,sent%20through%20this%20service.), Personal health record services: “Although accessed through your NHS App, they are hosted by a supplier contracted by your healthcare provider. You'll often be taken to the supplier's system to log in and view any messages sent through this service.”
- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=100), p. 100: “Care Plans: Access to shared care planning, including collaborative care plans with the ability for all parties involved to access and update”

</div>

<div id="src-app-backend" class="box-sources" hidden="until-found" data-title="NHS App backend" data-line="other" data-line-colour="#1f1f1f" data-line-text="#1f1f1f" data-line-shape="app-specific JSON">

Inbox messages stored. Clinical data fetched on demand.

- [*NHS App data protection impact assessment*](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf):
  - [p. 19](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=19): “when users use the App to access their GP health record, the data is retrieved in real-time from the GP surgery's systems of the user. It is then displayed on their device.”
  - [p. 22](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf#page=22): “The NHS App maintains and stores only the following types of data to ensure its functionality and improve user experience. ... Messaging Data: The content of messages sent and received through NHS Notify and viewed using the App's messaging service.”

App-specific JSON, not FHIR; GET /v1/patient/my-record; codes as supplied; medicines, clinician and place as text.

- [*nhs-app-data*](https://github.com/olizilla/nhs-app-data):
  - [README.md, line 149](https://github.com/olizilla/nhs-app-data/blob/3dc82ffedb4927c5e50c7004c891bdaccbb51ca2/README.md#L149): “That app pulls down data from \`https://api.nhsapp.service.nhs.uk/v1/patient/my-record\`, which returns a JSON object containing the same medical records you see in the NHS App.”
  - [synthetic\_emis.json, lines 89-91](https://github.com/olizilla/nhs-app-data/blob/3dc82ffedb4927c5e50c7004c891bdaccbb51ca2/tests/fixtures/synthetic_emis.json#L89-L91): `"term": "Renal profile", "supplierTypeCode": "132851000000110", "snomedConceptId": null,` _From the tool's EMIS test fixture, a cut-down copy of the author's own NHS App record with personal details replaced. The GP system's code is in supplierTypeCode; snomedConceptId is empty._

</div>

<div id="src-nhs-app" class="box-sources" hidden="until-found" data-title="NHS App">

iOS, Android and web.

- [*NHS App technical specification*](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification#:~:text=Users%20access%20the%20NHS,or%20the%20web%20interface.), section 5, Architecture overview: “Users access the NHS App through Android or iOS mobile apps or the web interface.”

</div>

<script src="/res/js/box-sources.js" defer></script>

<!-- /nhs-app-map:sources -->

<div class="ledger">

## Related

- [Where are our manners? A protocol for NHS software](/2026/10/22/where-are-our-manners/) <span>22 Oct 2026</span>
- [Talk: Digital Interoperability in the NHS](/2026/05/21/digital-interop-in-the-nhs/) <span>21 May 2026</span>

</div>
