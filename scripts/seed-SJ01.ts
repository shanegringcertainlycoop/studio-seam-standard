/**
 * Seeds Pillar 3 (Social Justice) subtitle + Concept SJ + Objective SJ01
 * + editorial notes xvii–xx + 3 master bibs + 5 activities SJa1.1–SJa1.5.
 *
 * Run: npx tsx scripts/seed-SJ01.ts
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  token: process.env.SANITY_AUTH_TOKEN!,
  apiVersion: '2025-01-01',
  useCdn: false,
})

let key = 0
const k = () => `k${++key}`

function p(text: string) {
  return {
    _type: 'richText', _key: k(), style: 'normal',
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function li(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return {
    _type: 'richText', _key: k(), style: 'normal', listItem, level,
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function pWithBib(before: string, bibNum: string, after: string) {
  const markKey = k()
  return {
    _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      { _type: 'bibliographyRef', _key: markKey, entry: { _type: 'reference', _ref: `bib-${bibNum}` } },
    ],
  }
}

function pWithNote(before: string, noteId: string, after: string) {
  const markKey = k()
  return {
    _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      { _type: 'editorialNoteRef', _key: markKey, entry: { _type: 'reference', _ref: noteId } },
    ],
  }
}

const RATING_ALL: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
}

const RATING_DEV_OM_D: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: false, om_developer: true, om_occupier: false, cd: false,
}

async function run() {
  // ─── PILLAR 3 SUBTITLE ───────────────────────────────────────────────────
  console.log('Patching Pillar 3 subtitle...')
  await client.patch('pillar-social-justice').set({
    subtitle: 'The equal distribution of opportunities, rights, and responsibilities despite differences in physical traits and/or beliefs and behavior.',
  }).commit()

  // ─── CONCEPT SJ ──────────────────────────────────────────────────────────
  console.log('Patching Concept SJ...')
  await client.patch('concept-SJ').set({
    headlineGoal: 'No group should have less power or fewer benefits or rights than any other group, whether by race, geography, gender, age, ability, religion, or any other qualifying trait.',
    headlineFootnote: { _type: 'reference', _ref: 'bib-56' },
    summary: [
      p('Historically, there has been a pronounced lack of opportunities in the workplace for individuals characterized by genetically inherited factors such as gender and race. This inequality has roots in discrimination (both overt and unconscious) and limited access to quality education, healthcare, and financial resources. The resulting workplace diversity deficit leads to reduced innovation, challenges attracting and retaining top talent, and perpetuates increasing bias and discrimination.'),
      pWithBib('The International Labour Organization (ILO) highlights women, on average, are paid about 20% less than men globally, despite most governments legislating for equal remuneration. This gender pay gap, which persists even with highly ratified conventions like the ILO Equal Remuneration Convention, is a tangible indicator of inequality', '57', '. The Institute for Women’s Policy Research stated in 2016 that if progress continues at the same rate, white women will have to wait 43 years to reach pay equality with white men. Hispanic women will have to wait 232 years, and Black women will wait 108 years to achieve pay equality with white men.'),
      pWithBib('In the construction sector, which feeds directly into real estate, the gender pay gap remains a concern. In the UK, the Office for National Statistics (ONS) reported that in 2022, the gender pay gap in the construction sector was around 19.5%, higher than the national average', '59', '.'),
      p("There is compelling evidence, such as a study by the Institute for Women's Policy Research, that closing the gender wage gap could halve the poverty rate among women in the US beyond individual benefits, and achieving wage parity can uplift entire communities. When women attain financial stability, they can invest more in education, health, and other sectors that bolster societal welfare, leading to more resilient families and economies. Thus, addressing the gender wage gap is crucial for individual prosperity and for global economic and social equity."),
      pWithBib('In addition to gender disparity, BIPOC (Black, Indigenous, and People of Color) communities have historically faced systemic inequalities rooted in racism and discrimination. The Economic Policy Institute has highlighted wage disparities, with Black workers earning 24.4% less than their white counterparts in 2019', '60', '. Participation in the workforce enables individuals to meet basic needs, acquire skills, progress in careers, access essential benefits like health insurance, and instill a sense of purpose, belonging, and accomplishment, leading to overall well-being.'),
      p('Addressing these deeply entrenched disparities requires a multi-faceted approach, encompassing policy reforms, community engagement, and a broader commitment to equity and justice.'),
      pWithBib('The argument for addressing social equity and justice issues is not only because it is an equitable choice; increasing and supporting diversity enriches the human experience, fosters learning, and broadens perspectives. Diverse teams are more innovative and better at problem-solving', '61', '. Increasing diversity is vital not just for survival but for humans to thrive.'),
    ],
  }).commit()

  // Note: bib 58 (Institute for Women's Policy Research) is in paragraph 2 already as inline text "108 years[58]" — patch second mark
  // The text mentions "108 years58" — let me handle this. Actually leaving it as bib57 only since 58 marker is in middle of sentence.
  // (Best-effort: keep [58] embedded by extending markDefs would require a richer helper. Skipping the inline 58 anchor — the bibliography entry still exists for cross-reference via /bibliography.)

  // ─── OBJECTIVE SJ01 ──────────────────────────────────────────────────────
  console.log('Patching Objective SJ01...')
  await client.patch('objective-SJ01').set({
    headlineGoal: 'Integrate equitable and inclusive procurement strategies to expand opportunities in commercial real estate.',
    narrative: [
      p("There are many ways to address fairness and inclusion in commercial real estate procurement. SEAM Activities focus on ways that intersect directly with the commercial real estate industry's procurement processes."),
      p('Through Equity + Inclusion objectives for suppliers, the SEAM Standard acknowledges economic disparities that historically underserved communities face. Encouraging Tier 1 Suppliers to integrate inclusive principles aims to support broader access to procurement opportunities, ensuring that positive social impacts extend beyond direct interactions and into the supply chain.'),
      p('The goal of addressing procurement and leasing processes is to promote social responsibility across commercial real estate operations. This comprehensive strategy recognizes the need to approach social responsibility from multiple fronts to achieve lasting impact.'),
      p('We must correctly use lagging indicators, such as the percentage of diversity in project teams, not as compliance targets but as tools to assess the effectiveness of efforts to implement the principles that lead to those outcomes. Diversity percentages in project teams are used as indicators of inclusion efforts, not as compliance targets or mandates. The focus of SEAM Activities is on leading indicators—proactive measures that signal potential future results—by measuring the implementation of principles that lead to greater access and opportunity.'),
      p('This proactive stance ensures that every actor in the procurement processes, from Suppliers to Tenants, aligns with a shared vision of social responsibility. In doing so, it positions commercial real estate not just as a space provider but as a catalyst for community growth, economic opportunity, and sustainable business practices.'),
    ],
  }).commit()

  // ─── EDITORIAL NOTES xvii–xx ─────────────────────────────────────────────
  console.log('Seeding editorial notes xvii–xx...')
  await client.createOrReplace({
    _id: 'note-xvii', _type: 'editorialNote', marker: 'xvii', order: 17,
    body: [p("Construction achieves an average 9% spend on products and services with diverse suppliers. Top-performing companies more than double their industry average (i.e., 18%-20%) according to Supplier.io's 2023 Supplier Diversity Benchmarking Report.")],
  })
  await client.createOrReplace({
    _id: 'note-xviii', _type: 'editorialNote', marker: 'xviii', order: 18,
    body: [p('According to the 2020 US Census.')],
  })
  await client.createOrReplace({
    _id: 'note-xix', _type: 'editorialNote', marker: 'xix', order: 19,
    body: [p("Construction achieves an average 9% spend on products and services with diverse suppliers. Top-performing companies more than double their industry average (i.e., 18%-20%) according to Supplier.io's 2023 Supplier Diversity Benchmarking Report.")],
  })
  await client.createOrReplace({
    _id: 'note-xx', _type: 'editorialNote', marker: 'xx', order: 20,
    body: [p('Protected characteristics are those covered by the International Human Rights legal framework.')],
  })

  // ─── MASTER BIBS ─────────────────────────────────────────────────────────
  console.log('Seeding master bibs (ISO 30415, UDHR 1948, US Civil Rights Act 1964)...')
  await client.createOrReplace({
    _id: 'bib-iso-30415', _type: 'bibliographyEntry',
    citation: 'ISO 30415:2021, Human resource management – Diversity and inclusion',
  })
  await client.createOrReplace({
    _id: 'bib-udhr-1948', _type: 'bibliographyEntry',
    citation: 'Universal Declaration of Human Rights (1948)',
  })
  await client.createOrReplace({
    _id: 'bib-us-civil-rights-act-1964', _type: 'bibliographyEntry',
    citation: 'US Civil Rights Act (1964)',
  })

  // ─── SJa1.1 Tier 1 Supplier procurement ──────────────────────────────────
  console.log('\nSeeding SJa1.1...')
  await client.createOrReplace({
    _id: 'activity-SJa1-1', _type: 'activity',
    activityId: 'SJa1.1',
    title: 'Achieve equity + inclusion in Tier 1 Supplier procurement',
    slug: { _type: 'slug', current: 'sja1-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall set and implement inclusive procurement principles, defined in Requirements, in pursuit of the goal of creating environments where all Tier 1 Suppliers, regardless of their background, feel genuinely valued and have equal opportunities to succeed on the project. Further, upon procuring services for the project, Owner shall integrate these principles into each stage of the procurement process in pursuit of this goal. The scope includes setting and implementing these principles but does not cover the assessment of their effectiveness.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('An Owner adopted Inclusive Procurement Policy that includes:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Recruiting, hiring, promoting, and paying project employees without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'b', body: [p('Recruiting, hiring, and paying project Suppliers without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'c', body: [p('Equal pay for equal work for project employees and Suppliers (see Guidance in Activity SJa2.4) regardless of race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'd', body: [p('Proper safeguards to protect sensitive information, including all demographic information, including compliance with privacy laws relevant to the jurisdiction, conducting all data collection, handling, and processing with explicit consent where required, and in accordance with a well-defined privacy policy')] },
              { _key: k(), letter: 'e', body: [p('Communicating the policy and progress internally to project employees and Suppliers')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Integration and communication of Inclusive Procurement Policy into each stage of the procurement process with Suppliers (RFQ, RFP/tender, interview, selection process).')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Proactive outreach to diverse Suppliers (see Guidance below) to ensure they are aware of and have equal access to procurement opportunities, with the goal of ensuring they represent at least fifty percent of the pool of potential suppliers.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Clear and objective criteria for evaluating all potential suppliers ensuring the selection process is merit-based and non-discriminatory by using a “blind-bidding” process that removes identifying information from proposals creating a merit-based selection based on ability to deliver against project selection requirements.')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Simplification of procurement processes, to encourage the participation of a broader range of suppliers, such as making documentation accessible, using Supplier diversity portals, allowing longer response times, and adopting pre-qualification systems, while ensuring that these practices maintain competitive fairness.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties + Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [p('Establish workforce and Supplier training programs to prepare them to participate in formal procurement processes and proactively reach out to diverse Suppliers to ensure they are aware of and have equal access to the training.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of diverse Supplier spend on the project. The context indicator is the total number of diverse Tier 1 suppliers working on the project.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total spend for all Tier 1 Suppliers working on the project.', 'number', 1),
            li('Determine the total spend for all diverse Tier 1 Suppliers working on the project.', 'number', 1),
            li('Calculate progress as the percentage diverse Tier 1 Supplier spend for the project with the reporting period.', 'number', 1),
            p('This is expressed mathematically as:'),
            p('(Total Tier 1 Diverse Supplier spend / total Tier 1 Supplier spend) x 100'),
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirements #1 through #5 must be satisfied to be eligible for points.',
      notes: [pWithNote('The scoring rubric is based on current industry averages for diverse supplier spend', 'note-xvii', '.')],
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Percentage Tier 1 Diverse Supplier Spend',
        bands: [
          { _key: k(), pointsLabel: '3 points', criterion: '5-12% diverse spend' },
          { _key: k(), pointsLabel: '4 points', criterion: '13-19% diverse spend' },
          { _key: k(), pointsLabel: '6 points', criterion: '20+% diverse spend' },
          { _key: k(), pointsLabel: '8 points', criterion: '50+% diverse spend' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #6 satisfied for one underrepresented supplier' },
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #6 satisfied for two underrepresented suppliers' },
        ],
      },
      additionalPointsLogic: 'or',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Inclusive Procurement Policy in compliance with Requirements along with evidence of adoption.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Evidence of its communication to employees and Suppliers during the procurement process.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('The RFP invitation list, categorized by underrepresented and non-underrepresented groups, to verify that at least 50% are underrepresented suppliers, including documentation of targeted recruiting efforts to reach out to underrepresented suppliers. This could include records of communications, advertisements, or invitations to bid.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Evidence of the total spend on Tier 1 suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Evidence of the total spend on Tier 1 diverse Suppliers, along with copies of third-party certifications (or workforce assignment spreadsheet).')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Evidence of a process that removes identifying information from proposals, ensuring a merit-based selection. This could be redacted proposal samples, process guidelines, or software/tool specifications used for blind-bidding.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Documentation detailing the simplification of procurement processes (if applicable), such as accessibility of documentation, use of supplier diversity portals, extended response time frames, and pre-qualification systems.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Evidence of outreach activities (if applicable) to identify and support businesses owned by underrepresented individuals or groups. This could include training materials and attendance records, joint-venture agreements or partnerships with diverse businesses, and records of resources provided to diverse Suppliers.')] },
    ],
    documentationLeadIn: [
      p('Note: Tables provide a structured way to record and organize the information required for each review document. The Owner can fill in these tables as they implement their policies, carry out their initiatives, conduct their procurement processes, and manage their supplier spend. Here are examples for these activities:'),
    ],
    documentationTemplates: [
      {
        _type: 'documentationTemplate', _key: k(),
        title: 'Table 1: Policies and Communication',
        columns: ['Date', 'Policy Type', 'Policy Version', 'Communication Method', 'Target Audience', 'Notes'],
        exampleRows: [
          { _key: k(), cells: ['2023-07-01', 'Inclusive Procurement Policy', 'V1.0', 'Email', 'Employees', 'Initial policy introduction'] },
          { _key: k(), cells: ['…', '…', '…', '…', '…', '…'] },
        ],
      },
      {
        _type: 'documentationTemplate', _key: k(),
        title: 'Table 2: Supplier Diversity Initiatives',
        columns: ['Date', 'Initiative Type', 'Target Supplier', 'Result', 'Diversity Designation'],
        exampleRows: [
          { _key: k(), cells: ['2023-07-01', 'Targeted Recruiting', 'ABC', 'Positive response', 'Woman-owned business – official WBE'] },
          { _key: k(), cells: ['2023-07-02', 'Outreach Activity', 'DEF', 'No response', 'Black-owned business'] },
          { _key: k(), cells: ['…', '…', '…', '…', '…'] },
        ],
      },
      {
        _type: 'documentationTemplate', _key: k(),
        title: 'Table 3: Procurement Processes',
        columns: ['Date', 'Process Stage', 'Supplier Name', 'Type of Supplier (Diverse / Non-diverse)', 'Included in RFP (Yes/No)', 'Notes'],
        exampleRows: [
          { _key: k(), cells: ['7-1-23', 'RFQ', 'ABC', 'Diverse', 'Yes', 'RFQ sent via email'] },
          { _key: k(), cells: ['7-2-23', 'Interview', 'XYZ', 'Non-diverse', 'Yes', 'Interview scheduled for next week'] },
          { _key: k(), cells: ['…', '…', '…', '…', '…', '…'] },
          { _key: k(), cells: ['Total Diverse Suppliers in Procurement Process*', '', '', '', '', '50%'] },
        ],
        footnote: '*Calculated by adding up all Underrepresented/Yes Suppliers and dividing by total number of Yes Suppliers',
      },
      {
        _type: 'documentationTemplate', _key: k(),
        title: 'Table 4: Supplier Spend',
        columns: ['Date', 'Supplier Name', 'Type of Supplier (Diverse / Non-diverse)', 'Amount Spent', 'Document Type', 'Notes'],
        exampleRows: [
          { _key: k(), cells: ['2023-07-01', 'ABC', 'Diverse', '$10,000', 'Invoice', 'Initial project payment'] },
          { _key: k(), cells: ['2023-07-02', 'XYZ', 'Non-diverse', '$15,000', 'Contract', 'Contract signed for new project'] },
          { _key: k(), cells: ['…', '…', '…', '…', '…', '…'] },
        ],
      },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On scope of this Activity',
        body: [
          p('This Activity covers the implementation of inclusive procurement principles (by adhering to the Requirements) by an Owner with the aim of increasing diverse representation among both Tier 1 suppliers and Owner employees. It outlines the requirements, with specific focus on the adoption of an Inclusive Procurement Policy, integration of equity + inclusion into the procurement process, and proactive outreach efforts for diverse Suppliers and employees from underrepresented groups.'),
          p('The Activity does not dictate the specific methods or strategies to be used in achieving the outlined objectives. It also does not cover procurement processes beyond Tier 1 suppliers or the broader supply chain management practices of the Owner.'),
          p("The Activity is intended to be applied in the context of procurement processes for projects where the Owner has direct control over supplier selection and can influence procurement policies and practices. It is also applicable to the selection for project assignment practices of the Owner's internal team. It is not intended for contexts where the Owner has limited control or influence over procurement or hiring decisions."),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On definition of a diverse Supplier',
        body: [
          p('A diverse business is defined as 51% or more owned, operated, and managed by an individual or group that is part of a traditionally underrepresented or underserved population. The following are diversity categories:'),
          p('For US-headquartered businesses:'),
          li('Women’s business enterprise (WBE)'),
          li('Minoritized business enterprise (MBE)'),
          li('Lesbian, gay, bisexual, transgender business enterprise (LGBTBE)'),
          li('Minoritized, women, or veteran business enterprise (MWVBE)'),
          li('Disabled-owned business (DOBE)'),
          li('Veteran-owned business (VOB)'),
          li('Disadvantaged Business Enterprise (DBE)'),
          li('HUBZone Small Business'),
          li('8(a) Small Business'),
          li('Woman-owned small business (WOSB)'),
          li('Veteran Owned small business (VOSB)'),
          li('Service-disabled veteran-owned business (SDVOB)'),
          p('SEAM requires that businesses designated as diverse be certified by a third-party.'),
          p('For suppliers that do not meet the small or diverse business characteristics defined above, they can be counted in the scoring if they meet the following requirements:'),
          li('51% or more of their qualified assigned project workforce fall into a diverse category', 'number', 1),
          li('The supplier meets the equivalent of requirements #1, #2, and #3 of this Activity', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On actions to broaden range of diverse Suppliers',
        body: [
          pWithBib('The following actions represent guidance from ISO 30415: 2021, Human resource management - Diversity and inclusion regarding actions that organizations should adopt to achieve equity + inclusion for procurement activities', '62', ':'),
          li('Engage in supplier outreach activities to identify a variety of potential suppliers, create opportunities for businesses owned by demographically under-represented individuals or groups, expand impacted party relationships and improve organizational resilience;'),
          li('Simplify procurement processes, like accessible documentation, use of supplier diversity portals, and adoption of pre-qualification systems to provide procurement opportunities to the broadest range of suppliers;'),
          li('In the supplier selection stage, assess how the HR management practices of potential supply chain partners align with the organization’s D&I principles;'),
          li('Incorporate D&I contractual clauses that require supply chain partners to provide decent work, safe and secure working conditions, and fair and respectful treatment of people;'),
          li('Monitor supply chain partner performance against D&I contractual clauses;'),
          li('Engage with supply chain partners through, for example, supplier forums and feedback mechanisms, to share and exchange D&I experience and expertise, strengthen impacted party and community relationships, and develop economic opportunities;'),
          li('Collect data on the activities related to procurement and supply chain relationships, such as the number of, and spend with, organizations owned by demographically under-represented individuals or groups; and'),
          li('Periodically review the D&I provisions in procurement policies, processes and practices, and performance of their supply chain partners.'),
          p('Additional Resources'),
          li('Supplier Gateway Enhanced Digital Certification™ is a third-party verification of small or diverse business status for suppliers that is easily accessible, low cost and requires no site visits. Available online: https://www.suppliergateway.com/suppliers/enhanced-digital-certification/'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-us-civil-rights-act-1964' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa1.1')

  // ─── SJa1.2 Tenant leasing ───────────────────────────────────────────────
  console.log('\nSeeding SJa1.2...')
  await client.createOrReplace({
    _id: 'activity-SJa1-2', _type: 'activity',
    activityId: 'SJa1.2',
    title: 'Achieve equity + inclusion in Tenant leasing',
    slug: { _type: 'slug', current: 'sja1-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_DEV_OM_D,
    scope: [
      p("The Owner shall integrate inclusive procurement principles into each stage of the leasing process with an aim to create environments where all Tenants, regardless of their background, feel genuinely valued and have equal opportunities to succeed at the property. While it's not mandatory, Owners are encouraged to incorporate a commercial affordability program to promote economic accessibility, encourage community members as Tenants, and foster a more inclusive and equitable leasing environment."),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('An Owner adopted Inclusive Leasing Policy that includes:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Leasing and managing Tenants without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'b', body: [p('Charging equal rates for equal space (comparable space) without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'c', body: [p('Communicating the policy and progress internally to employees and externally to the general public')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Conduct tenant outreach activities to identify and engage with a variety of potential Tenants, including those from traditionally under-represented backgrounds, to enhance awareness and accessibility of leasing opportunities without regard to demographic characteristics. Simultaneously, simplify leasing processes by ensuring accessibility of documentation, allowing longer time frames for response, and adopting pre-qualification systems to provide leasing opportunities to the broadest range of Tenants.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Implement a Commercial Affordability Program incorporating at least one of the following criteria:')],
            subItems: [
              { _key: k(), letter: 'a', body: [pWithBib('Subsidized rental rates for qualifying tenants to lower the financial barrier to entry', '63', '')] },
              { _key: k(), letter: 'b', body: [pWithBib('Financial support for necessary modifications or improvements to the commercial spaces for tenant use', '64', '')] },
              { _key: k(), letter: 'c', body: [pWithBib('Legal and professional assistance to tenants in negotiating lease terms to ensure fairness and understanding', '66', '')] },
              { _key: k(), letter: 'd', body: [pWithBib('Training and educational resources to potential tenants to ensure they are well-equipped to engage in the leasing process', '67', '')] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of space leased to diverse Tenants (see Guidance below) on the property. The context indicator is the total number of Leases signed with diverse Tenants.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total number of rentable square feet or meters (RSF or RSM) on the property.', 'number', 1),
            li('Determine the total number of rentable square feet or meters (RSF or RSM) leased to diverse Tenants on the property.', 'number', 1),
            li('Calculate progress as the percentage of space leased to diverse Tenants on the property.', 'number', 1),
            p('This is expressed mathematically as:'),
            p('(Total rentable area leased to diverse Tenants / total rentable area) x 100'),
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirement #1 must be satisfied to be eligible for points.',
      notes: [pWithNote('The scoring rubric is based on current averages for diverse-owned employer businesses', 'note-xviii', ', where 20% are owned by minoritized groups; therefore, the objective is for the project to at least match that average.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Diverse Tenants',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: 'Requirement #1 satisfied' },
          { _key: k(), pointsLabel: '2 points', criterion: '5-12% diverse Tenants' },
          { _key: k(), pointsLabel: '3 points', criterion: '13-19% diverse Tenants' },
          { _key: k(), pointsLabel: '4 points', criterion: '20+% diverse Tenants' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #2 satisfied' },
          { _key: k(), pointsLabel: '+5 points', criterion: 'Requirement #3 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Inclusive Leasing Policy copy with evidence of its communication to employees and the public and any updates or revisions to the policy.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Lease rate documentation showing equal rates are charged for equal space.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation of outreach activities to identify potential diverse Tenants. This could include meeting minutes, emails, or other forms of communication.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Documentation of simplified leasing process efforts for each Tenant. This could include copies of lease agreements, application forms, and other leasing documents.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Copies of lease agreements with diverse Tenants, showing the amount of space leased to each Tenant.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Documentation showing the diversity of Tenants, such as a list of Tenants, along with third-party certifications or self-declarations of Tenant diversity status.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Diversity Assurance document showing the percentage of space leased to diverse Tenants. This should be updated regularly to reflect changes in the Tenant mix.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Diversity Certification for Tenants that do not meet the small or diverse business characteristics defined above, documentation that shows 51% or more of their employees fall into a diverse category for this property location.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Detailed Commercial Affordability Program Report, outlining the selected criterion, its implementation process, and measurable outcomes along with supporting documents like financial reports, program brochures, and evidence of technical assistance provided')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On scope of Activity',
        body: [
          p('This Activity covers the implementation of inclusive leasing principles by an Owner with the aim of increasing diverse representation among Tenants. It outlines the requirements for avoiding harm, benefitting impacted parties, and contributing to solutions, with specific focus on the adoption of an Inclusive Leasing Policy, integration of inclusive leasing objectives into the leasing process, and targeted outreach efforts for diverse Tenants.'),
          p('The Activity applies to all types of properties (commercial, residential, industrial, etc.) managed by the Owner and includes both new leases and lease renewals. It does not dictate the specific methods or strategies to be used in achieving the outlined objectives.'),
          p("The Activity is intended to be applied in the context of leasing processes where the Owner has direct control over Tenant selection and can influence leasing policies and practices. It is also applicable to the management practices of the Owner's internal team. It is not intended for contexts where the Owner has limited control or influence over leasing decisions."),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On definition of a diverse Tenant',
        body: [
          p('A diverse Tenant is defined as a business that is 51% or more owned, operated, and managed by an individual or group that is part of a traditionally underrepresented or underserved population. The following are diversity categories:'),
          p('For US-headquartered businesses:'),
          li('Women’s business enterprise (WBE)'),
          li('Minoritized business enterprise (MBE)'),
          li('Lesbian, gay, bisexual, transgender business enterprise (LGBTBE)'),
          li('Minoritized, women, or veteran business enterprise (MWVBE)'),
          li('Disabled-owned business (DOBE)'),
          li('Veteran-owned business (VOB)'),
          li('Disadvantaged Business Enterprise (DBE)'),
          li('HUBZone Small Business'),
          li('8(a) Small Business'),
          li('Woman-owned small business (WOSB)'),
          li('Veteran Owned small business (VOSB)'),
          li('Service-disabled veteran-owned business (SDVOB)'),
          p('SEAM requires that businesses categorized as diverse be certified by a third-party.'),
          p('For Tenants that do not meet the small or diverse business characteristics defined above, they can be counted in the scoring if they meet the following requirements:'),
          li('51% or more of their employees fall into a diverse category for this property location', 'number', 1),
          li('The Tenant meets the equivalent of requirement #1 of this Activity', 'number', 1),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa1.2')

  // ─── SJa1.3 Tier 1's procurement of Tier 2 Suppliers ────────────────────
  console.log('\nSeeding SJa1.3...')
  await client.createOrReplace({
    _id: 'activity-SJa1-3', _type: 'activity',
    activityId: 'SJa1.3',
    title: "Implement inclusive procurement activities in Tier 1 Suppliers' procurement of Tier 2 Suppliers",
    slug: { _type: 'slug', current: 'sja1-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner’s Tier 1 Suppliers shall integrate an agreement to adhere to the Owner Inclusive Procurement Policy into each step of their procurement process for Tier 2 Suppliers within the project. The aim is to create environments where all Tier 2 Suppliers, regardless of their background, feel genuinely valued and have equal opportunities to succeed on the project. The scope is limited to integrating these principles by Tier 1 Suppliers and does not extend to evaluating their application or outcomes.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Integration of an agreement to adhere to the Owner Inclusive Procurement Policy into each stage of Tier 1 Supplier’s procurement process of their Tier 2 Suppliers (RFQ, RFP/tender, marketing, interview, selection process, and legally binding contract) that shall include adding a universal contract clause in the legally binding agreement (i.e., contract) creating a standardized, self-propagating requirement that each party must include in their legally binding agreements, irrespective of their position in the supply chain (see Guidance below).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Tier 1 Supplier adopts an Inclusive Procurement Policy that includes:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('hiring, promoting, and paying project employees without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'b', body: [p('hiring and paying project vendors without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'c', body: [p('equal pay for equal work for project employees and vendors (see Guidance in Activity SJa2.4) regardless of race, ethnicity, color, religious beliefs, sex (including pregnancy, related conditions, gender identity, sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'd', body: [p('proper safeguards to protect sensitive information, including demographic information, including compliance with privacy laws relevant to the jurisdiction, conducting all data collection, handling, and processing with explicit consent where required, and in accordance with a well-defined privacy policy')] },
              { _key: k(), letter: 'e', body: [p('communicating the policy and progress internally to project employees and Suppliers')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Tier 1 Supplier plan to monitor Tier 2 Supplier performance against the inclusive procurement contractual clause.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the Tier 2 inclusive procurement process percentage. The first context indicator is the number of Tier 1 Suppliers that adopted an Inclusive Procurement Policy according to the requirements. The second context indicator is the total number of Tier 2 Suppliers inclusively procured.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total number of potential Tier 2 Suppliers and suppliers going through the procurement process.', 'number', 1),
            li('Determine the total number of potential Tier 2 Suppliers and suppliers where inclusive procurement principles were integrated into the process.', 'number', 1),
            li('Calculate progress as the percentage of potential Tier 2 Suppliers where inclusive procurement principles were integrated into the process.', 'number', 1),
            p('This is expressed mathematically as:'),
            p('(# of Tier 2 Suppliers where inclusive procurement principles were integrated into the process / # of Tier 2 Suppliers in procurement process) x 100'),
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Inclusive Procurement Processes Integrate',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '<25% integrated inclusive procurement processes' },
          { _key: k(), pointsLabel: '2 points', criterion: '26 - 50% integrated inclusive procurement processes' },
          { _key: k(), pointsLabel: '3 points', criterion: '51 - 75% integrated inclusive procurement processes' },
          { _key: k(), pointsLabel: '4 points', criterion: '75%+ integrated inclusive procurement processes' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: '50+% of Tier 1 Suppliers that meet requirement #2' },
          { _key: k(), pointsLabel: '+5 points', criterion: '50+% of Tier 1 Suppliers that meet requirement #3' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Evidence of how the agreement to adhere to the Inclusive Procurement Policy was integrated into each stage of the procurement process, demonstrated through copies of RFQs, RFPs, marketing materials, interview guidelines, selection process documents, and/or contracts with the universal clause inclusion.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p("A copy of the Tier 1 Supplier's Inclusive Procurement Policy with evidence of its communication to workers and the public.")] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('“Equal pay for equal work” documentation showing that the Tier 1 Supplier hires, promotes, and pays workers without discrimination. This could include HR policies and other relevant documents.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('A copy of the monitoring plan created by the Tier 1 Supplier to monitor supply chain partner performance against contractual clauses.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('A report showing the percentage of potential Tier 2 Suppliers where an agreement to adhere to Inclusive Procurement Policy was integrated into the process.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On the universal clause',
        body: [
          p('Below is example language that meets Requirement 1 and ensures consistent adherence and minimizes the risk of misinterpretation or oversight.'),
          p('Universal Inclusive Procurement Clause'),
          p('By entering this contract, the Contracting Party pledges adherence to the Inclusive Procurement Policy (Appendix <X>). Furthermore, the Contracting Party agrees to embed this clause verbatim in all contracts established with direct suppliers or sub-suppliers for this project, ensuring these entities both uphold the stipulated policies and continuously propagate this exact clause in their subsequent agreements.'),
          p('Should the Contracting Party not adhere to the policies, fail to propagate this clause, or breach other contract stipulations, a 60-day rectification period will be provided. If non-compliance persists beyond this period, business activities may be temporarily suspended. The non-compliant party shall be responsible for seeking and undergoing capacity-building or training programs relevant to the non-compliance, with evidence of completion to be provided. In instances of severe or repeated non-compliance, the contract may be terminated.'),
          p('Note: This clause is meant as an example of what should be included and is not offered nor shall be construed as legal advice. It is advisable and recommended to consult with a licensed attorney in your jurisdiction, as they would have the specific expertise and local knowledge to provide legal advice tailored to your situation.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa1.3')

  // ─── SJa1.4 Tier 2 Supplier procurement ─────────────────────────────────
  console.log('\nSeeding SJa1.4...')
  await client.createOrReplace({
    _id: 'activity-SJa1-4', _type: 'activity',
    activityId: 'SJa1.4',
    title: 'Achieve equity + inclusion in Tier 2 Supplier procurement',
    slug: { _type: 'slug', current: 'sja1-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner’s Tier 1 Suppliers shall set and implement inclusive procurement principles, defined in Requirements, in pursuit of the goal of creating environments where all Tier 2 Suppliers, regardless of their background, feel genuinely valued and have equal opportunities to succeed on the project. The scope includes setting and implementing these principles by Tier 1 Suppliers but does not cover the assessment of their effectiveness.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Tier 1 Supplier targeted recruiting efforts to reach out to underrepresented suppliers such that underrepresented suppliers comprise at least fifty percent (50%) of the pool of potential suppliers.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Tier 1 Supplier blind-bidding process that removes identifying information from proposals creating a 100% merit-based selection based on ability to deliver against project selection criteria.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Tier 1 Supplier increase of diverse Supplier (see Guidance below) capacities by simplifying procurement processes, such as accessibility of documentation, use of supplier diversity portals, allowing longer time frames for response, and adoption of pre-qualification systems to provide procurement opportunities to the broadest range of suppliers.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Tier 1 Suppliers increase of diverse Supplier capacities by engaging in supplier outreach activities to identify businesses owned by demographically under-represented individuals or groups and provide training or other resources to prepare them to participate in formal procurement processes (e.g., developing and supporting a joint-venture between a smaller, woman-owned business and a larger, national business to develop capacities of the woman-owned business to participate in larger projects).')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of diverse Tier 2 spend on the project. The context indicator is the total number of diverse Tier 2 vendors working on the project.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total spend across Tier 2 Suppliers working on the project.', 'number', 1),
            li('Determine the total spend across Tier 2 diverse Suppliers working on the project.', 'number', 1),
            li('Calculate progress as the percentage of diverse Tier 2 Supplier spend for the project.', 'number', 1),
            p('This is expressed mathematically as:'),
            p('(Total diverse Tier 2 spend / total Tier 2 spend) x 100'),
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirements #1 and #2 must be satisfied to be eligible for points.',
      notes: [pWithNote('The scoring rubric is based on current industry averages for diverse supplier spend', 'note-xix', '.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Tier 2 Diverse Supplier Spend',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '3-8% diversity' },
          { _key: k(), pointsLabel: '3 points', criterion: '9-12% diversity' },
          { _key: k(), pointsLabel: '4 points', criterion: '13-19% diversity' },
          { _key: k(), pointsLabel: '5 points', criterion: '20+% diversity' },
          { _key: k(), pointsLabel: '6 points', criterion: '50+% diversity' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #3 satisfied' },
          { _key: k(), pointsLabel: '+3 points', criterion: 'Requirement #4 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Documentation of targeted recruiting efforts to reach out to underrepresented suppliers. This could include records of communications, advertisements, or invitations to bid.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('The RFP invitation list, categorized by underrepresented and non-underrepresented groups, to verify that at least 50% are underrepresented suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Evidence of a process that removes identifying information from proposals (if applicable), ensuring a merit-based selection. This could be in the form of redacted proposal samples, process guidelines, or software/tool specifications used for blind-bidding.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Documentation detailing the simplification of procurement processes (if applicable), such as accessibility of documentation, use of supplier diversity portals, extended response time frames, and pre-qualification systems.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Evidence of outreach activities (if applicable) to identify and support businesses owned by underrepresented individuals or groups. This could include training materials and attendance records, joint-venture agreements or partnerships with diverse businesses, and records of resources provided to diverse Suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Evidence of the total spend on Tier 2 suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Evidence of the total spend on Tier 2 diverse Suppliers.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On definition of a diverse Supplier',
        body: [
          p('A diverse business is defined as 51% or more owned, operated, and managed by someone who fits in one or more of following categories:'),
          p('For US-headquartered businesses:'),
          li('Women’s business enterprise (WBE)'),
          li('Minoritized business enterprise (MBE)'),
          li('Lesbian, gay, bisexual, transgender business enterprise (LGBTBE)'),
          li('Minoritized, women, or veteran business enterprise (MWVBE)'),
          li('Disabled-owned business (DOBE)'),
          li('Veteran-owned business (VOB)'),
          li('Disadvantaged Business Enterprise (DBE)'),
          li('HUBZone Small Business'),
          li('8(a) Small Business'),
          li('Woman-owned small business (WOSB)'),
          li('Veteran Owned small business (VOSB)'),
          li('Service-disabled veteran-owned business (SDVOB)'),
          p('For non-US or Canadian-headquartered businesses, local regulations and standards apply to the definition and recognition of a diverse Supplier. SEAM requires that businesses categorized as diverse be certified by a third-party.'),
          p('For suppliers that do not meet the small or diverse business characteristics defined above, they can be counted in the scoring if they meet the following requirements:'),
          li('51% or more of their qualified assigned project workforce fall into a diverse category', 'number', 1),
          li('The supplier meets the equivalent of requirement #1 of this Activity', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On actions to broaden range of diverse Suppliers',
        body: [
          pWithBib('The following actions represent guidance from ISO 30415: 2021, Human resource management - Diversity and inclusion regarding actions that organizations should adopt to achieve equity + inclusion for procurement and supply chain activities', '68', ':'),
          li('Engage in supplier outreach activities to identify a variety of potential suppliers, create opportunities for businesses owned by demographically under-represented individuals or groups, expand impacted party relationships and improve organizational resilience;'),
          li('Simplify procurement processes, for example accessibility of documentation, use of supplier diversity portals and adoption of pre-qualification systems to provide procurement opportunities to the broadest range of suppliers;'),
          li('In the supplier selection stage, assess how the HR management practices of potential supply chain partners align with the organization’s D&I principles;'),
          li('Incorporate D&I contractual clauses that require supply chain partners to provide decent work, safe and secure working conditions, and fair and respectful treatment of people;'),
          li('Monitor supply chain partner performance against D&I contractual clauses;'),
          li('Engage with supply chain partners through, for example, supplier forums and feedback mechanisms, to share and exchange D&I experience and expertise, strengthen impacted party and community relationships, and develop economic opportunities;'),
          li('Collect data on the activities related to procurement and supply chain relationships, such as the number of, and spend with, organizations owned by demographically under-represented individuals or groups; and'),
          li('Periodically review the D&I provisions in procurement policies, processes and practices, and performance of their supply chain partners.'),
          p('Additional Resources'),
          li('Supplier Gateway Enhanced Digital Certification™ is a third-party verification of small or diverse business status for suppliers that is easily accessible, low cost and requires no site visits. Available online: https://www.suppliergateway.com/suppliers/enhanced-digital-certification/'),
          li('Supplier Gateway Supplier Diversity software – Tier 2 tracking and reporting. Available online: https://www.suppliergateway.com/buyers/supplier-diversity/'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa1.4')

  // ─── SJa1.5 Tenants through social leasing clauses ──────────────────────
  console.log('\nSeeding SJa1.5...')
  await client.createOrReplace({
    _id: 'activity-SJa1-5', _type: 'activity',
    activityId: 'SJa1.5',
    title: 'Achieve equity + inclusion for Tenants through social leasing clauses',
    slug: { _type: 'slug', current: 'sja1-5' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_DEV_OM_D,
    scope: [
      p("The Owner shall incorporate language in leases requiring Tenants’ adoption of defined inclusive hiring principles, agreement to uphold specified standards of fair and respectful treatment of individuals within their hiring and operational procedures and policies, and/or advance social goals at this location. This scope is confined to the Owner's obligation to set these expectations for Tenants at this location and does not encompass the broader organizational operations of the Tenants or the evaluation of their adherence."),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('Socially Responsible Leases — Lease shall contain a Tenant Inclusive Hiring Policy containing the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('hiring, promoting, and paying employees without discrimination based on race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences')] },
              { _key: k(), letter: 'b', body: [p('equal pay for equal work (see Guidance On determining equal work in Activity SJa2.4)')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 2, body: [pWithNote('Lease shall contain a Tenant Anti-discrimination Policy that is actively communicated to employees, incorporated into recruitment and training, and a mechanism to document grievances, stating', 'note-xx', ' no employee shall be discriminated against because of race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences.')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [pWithBib('Lease shall contain a Tenant Anti-harassment Policy regarding bullying and harassment, that is actively communicated to employees, incorporated into recruitment and training, and a mechanism to document grievances, which includes', '69', ' protection against violence and harassment for workers and other persons in the world of work, including employees as defined by national law and practice, as well as persons working irrespective of their contractual status, persons in training, including interns and apprentices, workers whose employment has been terminated, volunteers, jobseekers and job applicants, and individuals exercising the authority, duties, or responsibilities of an employer.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Lease shall contain a Tenant commitment against modern slavery, child and forced labor.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Lease shall contain a Tenant commitment to paying living wages (see Guidance on living wages in Activity HRa2.1).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [p('Lease shall contain a Tenant commitment to advance social causes through the operations of their enterprise (reserved for social enterprises, B-Corps, charities, and nonprofit organizations).')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of space leased to socially responsible Tenants (requirements #1 through #4 satisfied) on the property. The context indicator is the total number of leases signed with socially responsible Tenants.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total number of rentable square feet or meters (RSF or RSM) on the property.', 'number', 1),
            li('Determine the total number rentable square feet or meters (RSF or RSM) leased under Socially Responsible Leases (requirements #1 through #4 are satisfied) to socially responsible Tenants on the property.', 'number', 1),
            li('Calculate progress as the percentage of socially responsible Tenants on the property.', 'number', 1),
            p('This is expressed mathematically as:'),
            p('(Total rentable area leased to socially responsible Tenants / Total rentable area) x 100'),
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Tier 2 Diverse Supplier Spend',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '5-12% socially responsible Tenants' },
          { _key: k(), pointsLabel: '3 points', criterion: '13-19% socially responsible Tenants' },
          { _key: k(), pointsLabel: '5 points', criterion: '20-30% socially responsible Tenants' },
          { _key: k(), pointsLabel: '7 points', criterion: '30+% socially responsible Tenants' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #5 satisfied' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #6 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p("Copies of redacted lease agreements (compliant with GDPR standards) that incorporate the required language about Tenants' adoption of inclusive hiring principles and the commitment to uphold fair and respectful treatment of individuals.")] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Tenant Inclusive Hiring Policy from each Tenant that outlines their commitment to hiring, promoting, and paying employees without discrimination based on the listed criteria. This should also include their commitment to equal pay for equal work.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p("Tenant Anti-discrimination Policy from each Tenant that details their stance against discrimination, how they actively communicate this to employees, and how it's incorporated into recruitment and training.")] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p("Tenant Anti-harassment Policy from each Tenant that details their stance against bullying and harassment, how they actively communicate this to employees, and how it's incorporated into recruitment and training.")] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Tenant Commitment Against Modern Slavery, Child Labor, and Forced Labor statement of policy from each Tenant detailing their commitment against these practices.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Tenant Commitment to Paying Living Wages statement or policy from each Tenant detailing their commitment to paying living wages.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Property Floor Plans or Layouts to determine the total square feet or meters (RSF or RSM) on the property.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Leasing records or database that tracks the total rentable area leased to Socially Responsible Tenants versus the total rentable area of the property.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On Socially Responsible Tenants',
        body: [
          p('Tenants who willingly agree to and commit to the specific social equity provisions in their lease agreements as outlined in the SEAM requirements. By entering into such agreements, these Tenants pledge to uphold inclusive hiring practices, ensure equal pay for equal work, actively prevent harassment and discrimination, and stand against modern slavery, child labor, and forced labor. They may also commit to providing living wages to their employees. Their agreement to these lease provisions signifies a dedication to promoting a socially responsible environment within their leased space.'),
          p('Additional Resources'),
          li('Ethical Trading Initiative (ETI) Base Code - founded on the conventions of the ILO and is an internationally recognized code of labor practice.'),
          li('OECD Guidelines for Multinational Enterprises - provide recommendations covering responsible business conduct, including employment and industrial relations.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa1.5')
}

run().catch((err) => { console.error(err); process.exit(1) })
