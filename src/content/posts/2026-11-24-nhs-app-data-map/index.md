---
layout: ../../../layouts/2025.astro
publishDate: 2026-11-24
title: "The NHS App"
slug: 2026/11/24/nhs-app-data-map
draft: false
tagline: "Mapping how our data gets there. Recommendations for what to do next"
toc: false
emoji: '📲'
---

<p class="lede">The NHS App shows us an aggregated view of our interactions with the NHS. Patients assume the NHS staff can trivially see the same view. They can't and it's frustrating for both parties. <i>What would need to happen to make that possible?</i></p>

In the meantime **patients are showing the NHS App on their phone directly to clinicians** as a quick way to share their info. _Let's pave that cow path!_

If their app explains that it shows a more complete view than any one clinician has access to, it will create a more useful mental model, and set us up for a consent based information sharing flow where they choose to hand over their phone or show a QR code, that lets the records be read by a clinician on the spot.

A dedicated mode could be added that lets the patient scope the data to share if they wish, or simply logs what aspects of the full record the clinician views in a way that both parties can see.

### How data gets into the NHS App

<div class="letterbox"><img
	src="/res/img/posts/2026-11-24-nhs-app-data-map.svg"
	alt="Diagram of how data reaches the NHS App. On the left are national services, GP practices and hospital trusts and regional services. Their lines run to the NHS App backend in the middle, or straight to the NHS App on the right as web views. Red lines are IM1, from EMIS and TPP. Orange lines are FHIR. Dashed lines are web views, where the data stays with the source."
/></div>

[Open the image full size](/res/img/posts/2026-11-24-nhs-app-data-map.svg)

_Drawn from the public sources listed under References. The main ones are NHS England's data protection impact assessment (DPIA) for the NHS App (NHS England, 2026f), its master data specification (MDS) (NHS England, 2026g) and its technical specification (NHS England, 2026j)._

### Findings _(WIP! May change)_

- Data from over 99% of GP practices, using EPRs from EMIS or TPP, reaches the App over IM1: supplier-specific, not FHIR, specs under licence.
- Medicus EPR uses GP Connect (FHIR), but GP Connect's record API lists production as "Not yet available", yet "in use with the NHS App as the consumer".
- Inbox messages are stored in the NHS App backend.
- The inbox may be an accidental longitudinal record store. However it is free text and defined by each sender.
- Clinical records aren't copied: GP record, appointment and prescription items are fetched live.
- FHIR is used at several versions: STU3 (GP Connect record), R4 on UK Core 0.5.1, a 2022 pre-release (EPS; claimed by the NHS App API), 1.0.0 (PDS), 1.1.3 (GP Connect repeats), Wayfinder profiles with no stated UK Core version (PCA).
- Hospital data comes through the Patient Care Aggregator (FHIR R4), or as web views where the data stays in the portal.
- Inbox messages arrive over the NHS App API as FHIR R4 CommunicationRequests with free-text Markdown. Its extension and identifier systems are defined only in OpenAPI, not published as FHIR artefacts.
- Backend to App: app-specific JSON. It looks like codes are passed through as supplied: SNOMED description IDs, not concept IDs (Evans, 2026).
- ICS shared care records are not in the DPIA's list of integrations.
- User actions stored keyed on NHS number, for up to 8 years.
- Usage analytics stored for up to 8 years (10 if needed for NHS England's National Digital Channels programme).
- Email, consents, nominated pharmacy, stored for 12 months.


### Recommendations _(WIP! May change)_

- Make "download or share your record" emit FHIR, ideally the [International Patient Summary](https://international-patient-summary.net/).
- Publish the NHS App API's extension and identifier systems as FHIR artefacts, and bind it to the [draft CommunicationRequest profile](https://simplifier.net/NHSDigital/NHSDigital-CommunicationRequest).
- Publish what the App shows as UK Core profiles, mapping supplier codes to SNOMED concepts.
- Pin one UK Core version across the App's feeds.
- Send clinical documents as documents ([National Record Locator](https://digital.nhs.uk/services/national-record-locator) or [Patient Data Manager](https://digital.nhs.uk/services/patient-data-manager) pointers), not as inbox text.
- Publish the Patient Care Aggregator's DPIA.

### Gaps in public sources

- The App's store schemas aren't published, only item lists and retention periods. Short-lived server-side caching is neither confirmed nor ruled out.
- IM1 wire formats are in supplier packs, available only under licence.
- The MDS says GP record items come "via GP Connect"; the technical specification and the DPIA name IM1 for EMIS and TPP.
- DPIA Annex E applies a two-year retention to "MVP past appointment data" without naming the system; the MDS marks appointment items as not retained.
- The MDS marks the NHS number as not retained, while the DPIA says audit data is captured against it.
- The data opt-out: the technical specification calls it a link out, the DPIA an in-app feature.
- Not confirmed: whether the App calls the e-Referral Service directly or only through the PCA.

<div class="ledger">

## Related

- [Where are our manners? A protocol for NHS software](/2026/10/22/where-are-our-manners/) <span>22 Oct 2026</span>
- [Talk: Digital Interoperability in the NHS](/2026/05/21/digital-interop-in-the-nhs/) <span>21 May 2026</span>

</div>

<div class="ledger references">

## References

<!-- nhs-app-map:references: generated from views/data-in.json --also PDM,NRL-SERVICE,IPS,COMMREQ-DRAFT by scripts/post-sources.mjs; edits between these markers are overwritten -->

6B (no date) *Most commonly used Patient Portal in NHS trusts*. NHS Tech Register. Available at: [https://nhs-tech.6b.health/lists/10/most-common-in-nhs-trusts/patient-portal](https://nhs-tech.6b.health/lists/10/most-common-in-nhs-trusts/patient-portal) (Accessed: 23 November 2026).

Enlivio Health (2026) 'Enlivio: a bold new chapter begins', 11 August. Available at: [https://www.enliviohealth.com/news-insights/enlivio-a-bold-new-chapter-begins](https://www.enliviohealth.com/news-insights/enlivio-a-bold-new-chapter-begins) (Accessed: 23 November 2026).

Evans, O. (2026) *nhs-app-data*. GitHub repository, commit 3dc82ff, 30 June 2026. Available at: [https://github.com/olizilla/nhs-app-data](https://github.com/olizilla/nhs-app-data) (Accessed: 23 November 2026).

IPS Web Editorial Team (no date) *The International Patient Summary: key health data, worldwide*. Available at: [https://international-patient-summary.net/](https://international-patient-summary.net/) (Accessed: 24 November 2026).

NHS Digital (2021) *NHSDigital-CommunicationRequest*. FHIR profile, status draft. NHS England FHIR Implementation Guide (Deprecated), Simplifier. Last updated 2 July 2021. Available at: [https://simplifier.net/NHSDigital/NHSDigital-CommunicationRequest](https://simplifier.net/NHSDigital/NHSDigital-CommunicationRequest) (Accessed: 24 November 2026).

NHS Digital (2026) *nhs-app-api*. GitHub repository, commit c8e61ab, 20 November 2026. Available at: [https://github.com/NHSDigital/nhs-app-api](https://github.com/NHSDigital/nhs-app-api) (Accessed: 23 November 2026).

NHS England (2022) *Requirements specification for NHS Wayfinder*. Last edited 20 October 2022. Available at: [https://digital.nhs.uk/data-and-information/keeping-data-safe-and-benefitting-the-public/how-we-look-after-your-health-and-care-information/directions-and-data-provision-notices/nhs-england-directions/wayfinder-nhs-app-services-directions-2022/requirements-specification/](https://digital.nhs.uk/data-and-information/keeping-data-safe-and-benefitting-the-public/how-we-look-after-your-health-and-care-information/directions-and-data-provision-notices/nhs-england-directions/wayfinder-nhs-app-services-directions-2022/requirements-specification/) (Accessed: 23 November 2026).

NHS England (2025) *NHS App API*. Last edited 30 September 2025. Available at: [https://digital.nhs.uk/developer/api-catalogue/nhs-app](https://digital.nhs.uk/developer/api-catalogue/nhs-app) (Accessed: 23 November 2026).

NHS England (2026a) *GP Connect (Patient Facing) Access Record - FHIR API*. Last edited 9 October 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/gp-connect-patient-facing-access-record-fhir](https://digital.nhs.uk/developer/api-catalogue/gp-connect-patient-facing-access-record-fhir) (Accessed: 23 November 2026).

NHS England (2026b) *How the Patient Care Aggregator works*. Last edited 20 November 2026. Available at: [https://digital.nhs.uk/services/patient-care-aggregator/how-the-patient-care-aggregator-works](https://digital.nhs.uk/services/patient-care-aggregator/how-the-patient-care-aggregator-works) (Accessed: 23 November 2026).

NHS England (2026c) *IM1 pairing integration*. Last edited 16 November 2026. Available at: [https://digital.nhs.uk/services/digital-services-for-integrated-care/im1-pairing-integration](https://digital.nhs.uk/services/digital-services-for-integrated-care/im1-pairing-integration) (Accessed: 23 November 2026).

NHS England (2026d) *Interface Mechanism 1 PFS Auth*. Last edited 24 September 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/im1-pfs-auth-api](https://digital.nhs.uk/developer/api-catalogue/im1-pfs-auth-api) (Accessed: 23 November 2026).

NHS England (2026e) *National Record Locator (NRL)*. Last edited 9 November 2026. Available at: [https://digital.nhs.uk/services/national-record-locator](https://digital.nhs.uk/services/national-record-locator) (Accessed: 24 November 2026).

NHS England (2026f) *NHS App data protection impact assessment*. Version 3.00, 5 October 2026. Available at: [https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/261007-nhs-app-dpia.pdf) (Accessed: 23 November 2026).

NHS England (2026g) *NHS App master data specification*. Version 2.00, 5 October 2026. Available at: [https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/nhs_app_master_data_specification_v2.00.xlsx](https://digital.nhs.uk/binaries/content/assets/website-assets/services/nhs-app/documents/nhs_app_master_data_specification_v2.00.xlsx) (Accessed: 23 November 2026).

NHS England (2026h) *NHS App privacy notice: messaging services*. Page last reviewed 6 January 2026. Available at: [https://www.nhs.uk/nhs-app/about/privacy-legal-information/privacy-notices/messaging-services/](https://www.nhs.uk/nhs-app/about/privacy-legal-information/privacy-notices/messaging-services/) (Accessed: 23 November 2026).

NHS England (2026i) *NHS App roadmap*. Last edited 5 November 2026. Available at: [https://digital.nhs.uk/services/nhs-app/roadmap](https://digital.nhs.uk/services/nhs-app/roadmap) (Accessed: 23 November 2026).

NHS England (2026j) *NHS App technical specification*. Last edited 2 July 2026. Available at: [https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification](https://digital.nhs.uk/services/nhs-app/nhs-app-documents/nhs-app-technical-specification) (Accessed: 23 November 2026).

NHS England (2026k) *Patient Care Aggregator - FHIR API*. Last edited 29 September 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir](https://digital.nhs.uk/developer/api-catalogue/patient-care-aggregator-fhir) (Accessed: 23 November 2026).

NHS England (2026l) *Patient Data Manager (PDM)*. Last edited 4 November 2026. Available at: [https://digital.nhs.uk/services/patient-data-manager](https://digital.nhs.uk/services/patient-data-manager) (Accessed: 23 November 2026).

NHS England (2026m) *PDS FHIR API - integrated products*. Last edited 14 October 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir/integrated-products](https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir/integrated-products) (Accessed: 23 November 2026).

NHS England (2026n) *Personal Demographics Service - FHIR API*. Last edited 25 August 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir](https://digital.nhs.uk/developer/api-catalogue/personal-demographics-service-fhir) (Accessed: 23 November 2026).

NHS England (2026o) *Prescriptions for Patients FHIR API v2*. Last edited 19 November 2026. Available at: [https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2](https://digital.nhs.uk/developer/api-catalogue/prescriptions-for-patients-fhir-api-v2) (Accessed: 23 November 2026).

NHS England (no date) *GP Connect Prescriptions Management FHIR API*. OpenAPI specification. Available at: [https://digital.nhs.uk/restapi/oas/503471](https://digital.nhs.uk/restapi/oas/503471) (Accessed: 23 November 2026).

OneLondon (no date) *Universal Care Plan*. Available at: [https://onelondon.online/universal-care-plan/](https://onelondon.online/universal-care-plan/) (Accessed: 23 November 2026).

<!-- /nhs-app-map:references -->

</div>
