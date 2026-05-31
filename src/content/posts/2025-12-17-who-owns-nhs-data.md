---
layout: ../../layouts/2025.astro
publishDate: 2025-12-17
title: "Who owns NHS Data"
slug: 2026/01/07/who-owns-nhs-data
draft: false
tagline: "Can we co-create and co-own our health records?"
emoji: "💾"
---

# Who owns NHS Data

Our digital NHS health records are routinely degraded when a GP or Hospital Trust migrates from one 
<abbr title="Electronic Patient Record">EPR</abbr> to another. _"We couldn't map that"_ gets coded as:

```
[XaLGM] - Transfer - degraded record entry
```

In some cases the data is lost altogether. So I'm piecing together how we went from manila "Lloyd George" envelopes of paper records with a standard format, clear legal ownership, and a default 30-year retention policy to this.

Data in the abstract is conceptually slippery, so let's go over the ground rules:

1. You can't "own" data - in 1976 a Liverpool University student stole an exam paper that he intended to return without being detected. He was detected. The court ruled that _"Information is not intangible property"_. Facts are not property. They can't be stolen or damaged.
2. You can "own" a physical expression of data, like a doctors note. Copyright law lives here.

Just from point 1 we can already see where this is going. If no one owns the data like property, then there is no criminal defacement when my medical records are degraded or lost. Even if there was, they have always been owned by the GP or Trust who created them. Unfortunately, you remain free to deface your own property.

When we had an envelope of paper medical records, we had a physical expression of data.

Now we have something much more diffuse. 

- The EPR provider, e.g. Oracle Health owns the Copyright of the database schema - the shape of the data
- The NHS Trust owns the collection of records under Sui Generis Database rights

Then at the level of a single row in the database:
- The NHS Trust owns the copyright for free text "doctors notes" in a given row
- Other observation data or "facts" are unowned.

What obligations does the NHS have to the data? What rights do you have?

- The NHS is the Data controller.
- It is required under data protection laws to maintain accurate and complete records, though systemic transitions often challenge this duty.

## Future work

Some questions that are rattling around my head:

What if the NHS was a Data Trust?

What if health records were co-created & co-owned by patient and clinician?

Privacy as a rivalrous good? If you reveal my data, you remove my ability to reveal it rivalrous digital assets can be recognised as property.

The Department of Health owned the Lloyd George envelope!

> the State provided the stationery, the doctor provided the ink and was guardian of the record until the patient died, at which point the stationery became the property of the State again.
https://medconfidential.org/wp-content/uploads/2015/02/2015-02-16-A-modern-Lloyd-George-Envelope.pdf

Readme: [A Blueprint for a Co-Produced Personal Health Record (CoPHR)](https://apperta.org/coPHR/) - by the [Apperta Foundation](https://apperta.org/#page-top)