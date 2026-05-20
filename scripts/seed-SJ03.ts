/**
 * Seeds Objective SJ03 (Equity + Inclusion in the Community) + 4 activities.
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
  return { _type: 'richText', _key: k(), style: 'normal',
    children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [] }
}

function li(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return { _type: 'richText', _key: k(), style: 'normal', listItem, level,
    children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [] }
}

function liBold(boldTerm: string, rest: string, level = 1, listItem: 'bullet' | 'number' = 'bullet') {
  return { _type: 'richText', _key: k(), style: 'normal', listItem, level,
    children: [
      { _type: 'span', _key: k(), text: boldTerm, marks: ['strong'] },
      { _type: 'span', _key: k(), text: rest, marks: [] },
    ],
    markDefs: [] }
}

function pWithBib(before: string, bibNum: string, after: string) {
  const m = k()
  return { _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [m] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [{ _type: 'bibliographyRef', _key: m, entry: { _type: 'reference', _ref: `bib-${bibNum}` } }],
  }
}

function pWithNote(before: string, noteId: string, after: string) {
  const m = k()
  return { _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [m] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [{ _type: 'editorialNoteRef', _key: m, entry: { _type: 'reference', _ref: noteId } }],
  }
}

const RATING_ALL: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
}

async function run() {
  console.log('Patching Objective SJ03...')
  await client.patch('objective-SJ03').set({
    headlineGoal: 'Ensure all persons within the impacted community have the same access to social resources and that rights are respected to increase economic stability.',
    narrative: [
      p('This objective addresses the dynamics between development projects and the communities they impact, emphasizing the importance of equitable and inclusive practices. Communities are complex ecosystems with deeply rooted cultural, historical, and social fabrics that can be vulnerable to external interventions.'),
      pWithBib('A base-level requirement is established to avoid involuntary displacement to uphold the dignity and rights of every community member. Involuntary displacement can lead to a multitude of socio-economic challenges, from loss of livelihoods to disruptions in social structures, and can have long-lasting repercussions on the community’s overall well-being. The World Bank has reported that land disputes are a significant concern in many countries, with over 90% of land in Africa not having clear title', '96', '. This can lead to disputes and potential human rights violations when land is acquired for real estate development.'),
      p('Projects that do not adequately consider the impacts of their physical presence may undermine the well-being of local communities. The characteristics, functions, diversity, and state of preservation of each community must be protected from negative impacts arising from the project’s presence.'),
      p('Promoting local community employment is another key goal. By integrating local talents and skills into the project, it not only boosts the local economy but also fosters a sense of ownership and belonging among community members. It’s a step towards ensuring that the benefits of the project are equitably distributed and that the community is an active impacted party in the development process.'),
      p('By focusing on equity and inclusion in the community, SEAM seeks to create a blueprint for projects that are not only sensitive to the needs and rights of communities but are also actively invested in their holistic well-being and socially sustainable growth.'),
    ],
  }).commit()

  console.log('Seeding editorial notes xxii–xxiv...')
  await client.createOrReplace({
    _id: 'note-xxii', _type: 'editorialNote', marker: 'xxii', order: 22,
    body: [p('A company is not required to restore any significant area degraded by factors beyond its control and from which it does not benefit. This includes areas affected by natural disasters, climate change, and the actions of third parties with whom the company does not have – and has never had – a commercial relationship (e.g. public infrastructure projects, indigenous settlements).')],
  })
  await client.createOrReplace({
    _id: 'note-xxiii', _type: 'editorialNote', marker: 'xxiii', order: 23,
    body: [p('A responsible Owner should aim to fulfill all these requirements, not just one. These actions are interconnected and together form a comprehensive response. The goal is to fully address and redress the harm done, hold those responsible accountable, and prevent such abuses from happening again in the future.')],
  })
  await client.createOrReplace({
    _id: 'note-xxiv', _type: 'editorialNote', marker: 'xxiv', order: 24,
    body: [p('A commercial relationship IS established between buyer and seller of a site.')],
  })

  console.log('Seeding master bibs...')
  await client.createOrReplace({
    _id: 'bib-ilo-c169', _type: 'bibliographyEntry',
    citation: 'ILO Indigenous and Tribal Peoples Conventions (C169), 1989',
  })
  await client.createOrReplace({
    _id: 'bib-icescr-1966', _type: 'bibliographyEntry',
    citation: 'International Covenant on Economic, Social, and Cultural Rights (1966)',
  })
  await client.createOrReplace({
    _id: 'bib-unesco-world-heritage', _type: 'bibliographyEntry',
    citation: 'UNESCO Convention concerning the Protection of the World Cultural and Natural Heritage (1972)',
  })
  await client.createOrReplace({
    _id: 'bib-undrip-2007', _type: 'bibliographyEntry',
    citation: 'UN Declaration on the Rights of Indigenous Peoples (2007)',
  })
  await client.createOrReplace({
    _id: 'bib-ungp-principle16', _type: 'bibliographyEntry',
    citation: 'UN Guiding Principles on Business and Human Rights (2011), Principle 16',
  })

  // ─── SJa3.1 No involuntary displacement ─────────────────────────────────
  console.log('\nSeeding SJa3.1...')
  await client.createOrReplace({
    _id: 'activity-SJa3-1', _type: 'activity',
    activityId: 'SJa3.1',
    title: 'The Owner shall not acquire land or building assets through eminent domain, compulsory acquisition, resumption, expropriation, or other involuntary displacement',
    slug: { _type: 'slug', current: 'sja3-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p("The Owner shall ensure that the specific land or building asset acquisition for the project does not involve any form of involuntary displacement, including eminent domain, compulsory acquisition, resumption, expropriation, or other similar methods. This scope is confined to the acquisition processes and practices of the Owner for the specific land or building asset and not acquisitions outside of the project's context."),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Owner shall ensure no acquisitions of land or building assets occur through eminent domain, compulsory acquisition, resumption, expropriation, or other involuntary displacement.')] },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [
              pWithBib('If the project is in an area with a historical precedent for compulsory acquisition, resumption, eminent domain, or expropriation, Owner shall verify that its site was not subject to any of the above', '97', '. '),
              pWithNote('This means that', 'note-xxii', ':'),
            ],
            subItems: [
              { _key: k(), letter: 'a', body: [p('The right to own or operate on the land is not contested by local communities or Indigenous peoples who either have documented claims or whose use of the land has historical precedent.')] },
              { _key: k(), letter: 'b', body: [p("Projects on land used by or adjoining to communities are subject to those communities' free, prior, and informed consent.")] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of area acquired without involuntary displacement. The context indicator is the total area acquired without involuntary displacement within the project.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine total area of building or site that meets the requirements.', 'number', 1),
            li('Determine total area of buildings or sites within the project.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (Total area acquired without involuntary displacement / total area of buildings + sites within project) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Points assignment',
        bands: [
          { _key: k(), pointsLabel: 'REQUIREMENT SATISFIED', criterion: 'if P = 100%' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Legal agreements or contracts detailing the voluntary terms and conditions of the land or building asset acquisition, mutually agreed upon by all parties involved.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Comprehensive reports that detail the investigations carried out before the acquisition, highlighting potential issues related to involuntary displacement and resolutions.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation of meetings, communications, or consultations with previous owners, occupants, or other relevant impacted parties. These records should demonstrate that the acquisition process was transparent, inclusive, and consensual.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('If any compensation was provided to previous owners or occupants, detailed records of the compensation agreements, amounts, and payment receipts should be maintained.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('No-objection Certificates or Letters of Consent obtained from previous owners or occupants, indicating their voluntary agreement to the acquisition terms and conditions (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Any necessary permits, licenses, or approvals from local government or regulatory bodies that validate the acquisition process.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
        body: [
          li("World Bank's Operational Policy on Involuntary Resettlement - provides guidelines on how to address the issues of involuntary displacement and resettlement. It emphasizes avoiding or minimizing displacement where possible and ensuring that displaced people receive assistance to improve or at least restore their livelihoods and living standards."),
          li("International Finance Corporation's (IFC) Performance Standard 5 on Land Acquisition and Involuntary Resettlement - provides guidance on avoiding or minimizing displacement and ensuring that the livelihoods of displaced people are improved or restored. It also emphasizes the importance of meaningful consultation with affected communities."),
          li("Asian Development Bank's (ADB) Safeguard Policy Statement - provides a framework to avoid, minimize, and mitigate adverse project impacts on the environment and affected people. It includes specific requirements related to involuntary resettlement."),
          li("United Nations' Basic Principles and Guidelines on Development-based Evictions and Displacement - provides practical guidance to States on how to ensure respect for human rights when carrying out development-based evictions."),
          li('Guidance Note on Land and Natural Resource Tenure for the UN System - provides guidance on land and natural resource tenure as it relates to the realization of human rights, peace and security, and sustainable development.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa3.1')

  // ─── SJa3.2 Projects do not infringe on communities ─────────────────────
  console.log('\nSeeding SJa3.2...')
  await client.createOrReplace({
    _id: 'activity-SJa3-2', _type: 'activity',
    activityId: 'SJa3.2',
    title: 'Projects do not infringe on communities',
    slug: { _type: 'slug', current: 'sja3-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p("The Owner shall ensure that the physical presence of a project in any location respects community land rights, protects culturally significant areas, does not use natural resources in a manner that restricts or limits community use of resources, and does not cause or contribute to a negative change to the socio-economic condition of community members."),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p("Owner shall ensure construction or operations do not detrimentally affect the local community's cultural heritage, spiritual, or religious life.")] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('The project shall not limit or restrict access to public space, basic services, or natural resources.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Project shall avoid, minimize, and mitigate the effects of noise, pollution, traffic congestion, and other disruptions in residential areas near the project’s location.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('If the project contains housing, Owner shall mandate that a minimum of 15% of new units be affordable for low-income residents, with clear eligibility criteria, or replace the same percentage of affordable units that existed on the property before re-development, whichever is higher.')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('If the project is in a low socio-economic, marginalized, or underserved area, Owner shall research local, regional, state, and national programs for repair and upgrade programs and implement a communication and/or assistance program to ensure all community residents can participate.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [p('If the project is in a low socio-economic, marginalized, or underserved area, Owner shall advocate to establish public policies for property tax freeze or other tax relief to prevent displacement due to rising property taxes for established residents impacted by the project.')] },
          { _type: 'requirementItem', _key: k(), number: 7, body: [p('If the project is in a low socio-economic, marginalized, or underserved area, Owner shall remediate loss of basic services (e.g., if project removes a discount supermarket serving the neighborhood through redevelopment, Owner can negotiate with future grocery tenant to provide “rewards card” to disadvantaged residents allowing for lower pricing.)')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of adherence to community protection requirements according to the requirements. The first context indicator is the total number of households within the social area of influence (as determined in IAa1.5). The second context indicator is the number of households within the community on the project for which the progress score is 100% (used to track impact).'),
        p('The percentage of adherence to community protection requirements is scored according to the following:'),
        li('0%: Any household not satisfying requirements #1 and #2.'),
        li('20%: Requirements #1 and #2 are satisfied.'),
        li('40%: Addition of requirements #3, #4, and #5 are satisfied.'),
        li('60%: Addition of requirement #6 is satisfied.'),
        li('80%: All additional requirements are satisfied.'),
        li('100%: All additional requirements are satisfied, and the Owner is successful in securing property tax freeze or other tax relief programs for established residents impacted by the project.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine the total number of households within the project area of impact.', 'number', 1),
            li('Calculate progress as the weighted average across all households.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (0(H0%) + 0.2(H20%) + 0.4(H40%) + 0.6(H60%) + 0.8(H80%) + 1(H100%) / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of adherence to community protection' },
            { symbol: 'Hx%', meaning: 'number of households for which the progress score is x%' },
            { symbol: 'N', meaning: 'total number of households' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Adherence to Community Protection',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '20% of adherence to community protection' },
          { _key: k(), pointsLabel: '3 points', criterion: '40% of adherence to community protection' },
          { _key: k(), pointsLabel: '4 points', criterion: '60% of adherence to community protection' },
          { _key: k(), pointsLabel: '5 points', criterion: '80% of adherence to community protection' },
          { _key: k(), pointsLabel: '6 points', criterion: '100% of adherence to community protection' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Historical land use records or studies to verify no historical precedent of contested land rights.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Documentation of consultations with local communities or Indigenous peoples, including minutes of meetings, attendance lists, and any agreements made.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Evidence of free, prior, and informed consent from communities, especially if the project is on or adjoining their land.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Reports or assessments confirming that the project does not detrimentally affect the cultural, spiritual, or religious life of the local community.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation or studies confirming that the project does not limit or restrict access to public spaces, basic services, or natural resources.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Reports detailing how the project avoids, minimizes, and mitigates disruptive or harmful activities in nearby residential areas, and any complaints from nearby residential areas received and how they were resolved.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p("Documentation detailing the provision of affordable housing within the project (if applicable), especially if it's in a low socio-economic, marginalized, or underserved area.")] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Community Assistance Program reports or plans (if applicable) detailing the research conducted on local, regional, state, and national programs for repair and upgrade and communication plans or outreach materials ensuring community residents are informed and can participate in these programs.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p("Documentation or correspondence showing the owner's advocacy for property tax freezes or reductions and home repair programs for impacted residents (if applicable).")] },
      { _type: 'documentationItem', _key: k(), number: 11, body: [p('Plans or agreements detailing remediation efforts for loss of basic services (e.g., agreements with future grocery tenants to provide rewards cards or other benefits to disadvantaged residents).')] },
      { _type: 'documentationItem', _key: k(), number: 12, body: [p("Periodic reports detailing the ongoing monitoring of the project's impact on the community and any corrective actions taken.")] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
        body: [
          li('USA.gov website: Repairing and Improving a Home – financial assistance programs for home repairs of modifications. Available online at https://www.usa.gov/repairing-home'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c169' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-unesco-world-heritage' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-undrip-2007' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa3.2')

  // ─── SJa3.3 Promote local community employment ──────────────────────────
  console.log('\nSeeding SJa3.3...')
  await client.createOrReplace({
    _id: 'activity-SJa3-3', _type: 'activity',
    activityId: 'SJa3.3',
    title: 'Promote local community employment',
    slug: { _type: 'slug', current: 'sja3-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p("The Owner shall establish and implement policies and programs that prioritize hiring individuals and suppliers from the local community (defined as the social area of influence in IAa1.5) for the project. The scope is confined to the Owner's responsibility to create these opportunities within the project and does not extend to the broader organizational operations or the evaluation of the effectiveness of these policies beyond the project's boundaries."),
    ],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-98' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Use of targeted recruiting efforts to reach out to local and local disadvantaged individuals and Suppliers such that the number shall equal at least fifty percent (50%) of the pool of potential workers and Suppliers or two (2) per subcontract, whichever is less, for all contracts and subcontracts for work performed on the project or operating property.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Commitment to procure materials, supplies, and goods from local suppliers, creating employment opportunities for local residents.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [pWithBib('Initiatives for improving job skills for the local community (e.g., creating training opportunities, apprenticeships, etc.), including using targeted communications to local and local disadvantaged individuals and Suppliers about the training opportunities, such that accommodation for 3 adult trainees per $1M total cost of work for a period not less than 12 weeks', '99', '.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of local employment. The first context indicator is the total number of local people employed on the project. The second context indicator is the number of local disadvantaged workers employed on the project. The third context indicator is the percentage of spend procured locally. The fourth context indicator the total number of local workers participating in job skills training (or number of hours of training). The fifth context indicator is the total number of local disadvantaged workers participating in job skills training (or number of hours of training).'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine total number of people employed on the project.', 'number', 1),
              li('Determine the total number of local people employed on the project.', 'number', 1),
              li('Calculate progress as the percentage of local employment on the project.', 'number', 1),
              p('This is expressed mathematically as:'),
            ],
            formula: '(Number of local people employed* / number of people employed) x 100',
          },
          {
            _key: k(),
            instructions: [
              p('*local disadvantaged individuals or suppliers shall be weighted with a 1.20 multiplier (e.g., 15 local disadvantaged hires would be scored as 15 x 1.20 = 18 hires) and payment of a living wage shall be weighted with a 1.15 multiplier (e.g., 15 hires earning a living wage would be scored as 15 x 1.15 = 17.25)'),
              p('To calculate the context indicator:'),
              li('Determine total spend on locally sourcing on the project.', 'number', 1),
              li('Determine the total spend on sourcing on the project.', 'number', 1),
              li('Calculate progress as the percentage of local spend on the project.', 'number', 1),
              p('This is expressed mathematically as:'),
            ],
            formula: '(Total spend on local sourcing / total spend) x 100',
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Local Employment*',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '10% local employment' },
          { _key: k(), pointsLabel: '2 points', criterion: '20% local employment' },
          { _key: k(), pointsLabel: '3 points', criterion: '30% local employment' },
          { _key: k(), pointsLabel: '4 points', criterion: '40% local employment' },
          { _key: k(), pointsLabel: '5 points', criterion: '50+% local employment' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Local Spend or Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: '5 - 20% local spend' },
          { _key: k(), pointsLabel: '+2 points', criterion: '21%+ local spend' },
          { _key: k(), pointsLabel: '+3 points', criterion: 'Requirement #3 satisfied' },
        ],
      },
      notes: [pWithBib('*Benchmarks for local employment set as measures that are achievable by different approaches when they are applied with some rigor', '100', '')],
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Recruitment policies and procedures outlining the strategies and methods used to target and recruit local and local disadvantaged individuals and suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Recruitment reports showing the breakdown of recruitment efforts, highlighting the number of local and local disadvantaged individuals and Suppliers approached versus non-underrepresented groups.')] },
      {
        _type: 'documentationItem', _key: k(), number: 4,
        body: [p('Employment records (GDPR-compliant) providing comprehensive data showing the total number of people employed on the project including:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('the duration of their employment')] },
          { _key: k(), letter: 'b', body: [p('disadvantaged status')] },
          { _key: k(), letter: 'c', body: [p('their employment status (e.g., full-time, part-time, contact)')] },
          { _key: k(), letter: 'd', body: [p('their employment role on the project')] },
          { _key: k(), letter: 'e', body: [p('their home postcode')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Procurement reports and Supplier contracts and invoices (if applicable) indicating the total spend on the project, with a breakdown highlighting local sourcing.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Descriptions of training programs (if applicable) detailing initiatives aimed at improving job skills for the local community, including training opportunities and apprenticeships.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p("Attendance records (if applicable) show local workers' participation in training programs, focusing on the number of hours of training or sessions attended.")] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Communication materials (if applicable) showcasing the promotion of training opportunities to local and disadvantaged individuals and suppliers.')] },
    ],
    definitions: [
      { _key: k(), term: 'Local', body: [p('those living within the geographic social area of influence identified in Activity IAa1.5. Local employees include skilled workers and trainees, new employees, and existing employees who live locally.')] },
      { _key: k(), term: 'Employment', body: [p('both direct employment by the Owner as well as workers of Tier 1 Suppliers assigned to the project. The format of employment, whether employee or independent contractor, is not a disqualifier as both shall count as “employed”.')] },
      {
        _key: k(), term: 'Disadvantaged individuals',
        body: [
          p('for the purposes of this activity the criterion for disadvantaged individuals is the following:'),
          li('Individuals earning below the country’s national poverty amount'),
          li('Individuals experiencing unemployment for a period of 12 months or more'),
          li('Individuals with a disability defined as someone with a physical or mental impairment that substantially limits a major life activity, has a record of such an impairment, or is regarded as having such an impairment'),
          li('Individuals who have been incarcerated'),
          li('Individuals without housing'),
          li('Ethnic minoritized groups'),
          li('Veterans'),
          li('Women'),
          li('Individuals over the age of fifty (50) years'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa3.3')

  // ─── SJa3.4 Remediate negative community impacts ────────────────────────
  console.log('\nSeeding SJa3.4...')
  await client.createOrReplace({
    _id: 'activity-SJa3-4', _type: 'activity',
    activityId: 'SJa3.4',
    title: 'Owner shall remediate damage from negative community impacts',
    slug: { _type: 'slug', current: 'sja3-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall remediate negative impacts on the community through defined actionable steps for all impacts the Project caused, contributed, or is linked to that could not be prevented or mitigated. The aim is to neutralize past negative effects through remediation and restoration, not just halting future negative impacts. This activity is confined to the project and not the broader organizational operations.'),
    ],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-101' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('For each negative community impact, Owner level of attribution identified as caused, contributed, or directly linked (see Guidance below).')] },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [pWithNote('Corrective actions for each negative community impact according to the level of attribution', 'note-xxiii', '.')],
            subItems: [
              {
                _key: k(), letter: 'a',
                body: [
                  p('Projects/properties that have directly caused negative community impacts shall take the following actions for remediation:'),
                  p('i. Immediate Cessation: Cease the actions causing the negative community impacts immediately. If possible, reverse the abusive activity.'),
                  p('ii. Compensation: Provide compensation to the affected individuals or communities for losses suffered. This can include financial reimbursement, psychological support, medical care, etc.'),
                  p('iii. Accountability: Hold accountable those individuals within the organization responsible for the negative community impacts. This could involve disciplinary action, dismissal, or in extreme cases, referral to legal authorities for potential criminal charges.'),
                  p('iv. Preventative Measures: Implement strategies, policies, and procedures to prevent recurrence, such as due diligence processes, staff training, and regular monitoring and review.'),
                ],
              },
              {
                _key: k(), letter: 'b',
                body: [
                  p('Projects/properties that have contributed to negative community impacts shall take the following actions for remediation:'),
                  p('i. Disengage: Where feasible, cease business relationships with entities causing the negative community impacts.'),
                  p('ii. Mitigate: If disengagement is not immediately possible, take steps to mitigate ongoing harm, such as by using influence over the contributing partner to halt or prevent further negative community impacts.'),
                  p('iii. Remediate: Assist in remediating harm, potentially through joint efforts with other entities. This could involve participating in community restoration projects, funding rehabilitation programs, etc.'),
                  p("iv. Public Disclosure: Where appropriate, publicly disclose the business's contribution to the negative community impacts and the steps it has taken to address it."),
                ],
              },
              {
                _key: k(), letter: 'c',
                body: [
                  p('Projects/properties directly linked to negative community impacts via their business relationships shall take the following actions for remediation:'),
                  p('i. Leverage: Use their influence over business relationships to mitigate or prevent negative impacts.'),
                  p('ii. Collaborate: Work with other businesses, governments, or non-governmental organizations to pressure the entity causing the negative impact to reform its practices.'),
                  p('iii. Policy Implementation: Implement stricter policies for partners, including contractual clauses that stipulate adherence to standards.'),
                  p('iv. Transparency and Reporting: Regularly report on their efforts to address the linked negative impact, which could include internal audits, third-party audits, and public reports.'),
                  p('Note: If the above remedies are not successful, consider ending the business relationship.'),
                ],
              },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Compliance with all applicable laws and respect internationally recognized human rights wherever they operate. When faced with conflicting requirements, businesses should seek ways to honor the principles of internationally recognized human rights.')] },
          {
            _type: 'requirementItem', _key: k(), number: 4,
            body: [p('Evaluation of the effectiveness and appropriateness of the remediation efforts through at least one of the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('collect feedback from affected individuals or communities regarding their satisfaction with the remediation efforts.')] },
              { _key: k(), letter: 'b', body: [p('solicit the opinion(s) of independent third-party assessors or auditors to provide an unbiased evaluation of remediation efforts.')] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of community impacts remediated. The first context indicator is the total number of affected individuals compensated with the type of compensation received (financial, psychological support, medical care, etc.). The second context indicator is the number of preventative measures in place, such as policies and procedures designed to prevent recurrence, due diligence processes, staff training programs, etc.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine the total number of negative impacts identified during Activity IAa1.4.', 'number', 1),
              li('For each negative impact, determine the level of attribution (caused, contributed to, or directly linked to) and the progress of implemented corrective actions as listed in the Requirements above: 25% for the first action, 50% for the second action, 75% for the third action, or 100% for all four actions (corrective actions under each attribution level in the Requirements are listed in a progressive order so they must be implemented in order to achieve progressive percentages of completion).', 'number', 1),
              li('Calculate the weighted remediation percentage for each negative impact by multiplying the level of attribution by the corrective action progress (weights are 1.0 for caused, 0.7 for contributed to, or 0.5 for directly linked to).', 'number', 1),
              li('Calculate the overall KPI as the average of all the weighted remediation percentages.', 'number', 1),
              p('Step 1: Calculate the Weighted Remediation Percentage for Each Negative Impact'),
            ],
            formula: 'R# = A# x C#',
            variables: [
              { symbol: 'R#', meaning: 'the weighted remediation percentage of # negative impact' },
              { symbol: 'A#', meaning: 'the level of attribution of the # negative impact (from 03. above)' },
              { symbol: 'C#', meaning: 'the corrective action progress of the # negative impact (25% for the 1st action, 50% for the 2nd action, 75% for the 3rd action, or 100% for all 4 actions)' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2: Calculate the Overall KPI')],
            formula: 'P = (R1 + R2 + R3 + … / N) x 100',
            variables: [
              { symbol: 'P', meaning: 'the percentage of remediated impacts' },
              { symbol: 'R#', meaning: 'the weighted remediation percentage for the # negative impact (calculated in Step 1)' },
              { symbol: 'N', meaning: 'the total number of negative impacts identified' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Must include 100% remediation of all severe negative impacts to be eligible for points',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Remediated Impacts',
        bands: [
          { _key: k(), pointsLabel: '3 points', criterion: '55% - 64% remediated impacts' },
          { _key: k(), pointsLabel: '5 points', criterion: '65% - 74% remediated impacts' },
          { _key: k(), pointsLabel: '7 points', criterion: '75% - 100% remediated impacts' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A comprehensive list of all identified negative impacts. It should include details about each impact, such as the nature of the impact, the parties involved, and the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Remediation Action Plans outlining the corrective actions to be taken for each negative impact, based on the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Regular progress reports (if applicable) would provide evidence of the implementation of the corrective actions. These should include details of the actions taken, the results achieved, and any challenges encountered. This may not be applicable if the remediation actions are completed in a short timeframe.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('A completion report for each negative impact when all corrective actions have been successfully implemented.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('A summary report of all remediation completion reports, providing a count of the total number of negative impacts and the number that have been successfully remediated.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Independent audit reports (if applicable) providing third-party verification of the successful remediation of negative impacts include a detailed assessment of the effectiveness of the corrective actions and the extent of the remediation.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Testimonials or statements from impacted parties (if applicable), including affected communities and other relevant parties, could provide additional evidence of the successful remediation of the negative impacts.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Any legal documents (if applicable) related to the negative impacts, such as court rulings or settlement agreements, could provide further evidence of the level of attribution and the successful remediation of the impacts.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Internal records (if applicable), such as meeting minutes, emails, or memos, could provide additional evidence of the actions taken to remediate the negative impacts.')] },
    ],
    definitions: [
      { _key: k(), term: 'Severe negative impact', body: [p('is one that causes significant and lasting harm to individuals or communities such as serious injury, loss of life, child labor, forced labor, discrimination, and displacement.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On identifying level of Attribution',
        body: [
          p('Attribution is defined as the action of regarding something as being caused by an Owner. There are three levels of attribution:'),
          liBold('Directly causing', ' an adverse community impact refers to a situation where an Owner’s actions or omissions are the immediate and primary cause of the adverse impact. In this context, the Owner is directly responsible for the harm inflicted on individuals or communities.', 1, 'number'),
          liBold('When an Owner contributes', ' to adverse community impacts, it means that the Owner plays a role in facilitating or enabling the detrimental effects on the community, even if it is not the sole or direct cause of the impacts. The contribution can take various forms, such as providing financial support, resources, technology, or expertise to another entity that is directly responsible for the adverse community impacts. It can also involve benefiting from or being complicit in the actions of others that result in harmful effects on communities. Contributing to adverse community impacts implies that the Owner has some level of involvement or influence that enables or exacerbates the harm inflicted on communities.', 1, 'number'),
          liBold('Being directly linked', ' to an adverse community impact means that an Owner has a clear and undeniable connection to the impact. This connection implies a direct and active involvement in the impact, either through its own actions or through its business relationships. It suggests that the Owner has a direct relationship or association with the individuals, groups, or entities responsible for the adverse community impact. This link can be established through various means, such as direct business partnerships, supply chains, investments, or contractual agreements. Being directly linked to a human rights abuse indicates a level of responsibility and accountability for the harm caused, and the Owner should take appropriate measures to address and remedy the situation.', 1, 'number'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On factors beyond business control',
        body: [
          pWithNote('An Owner is not required to restore any significant area degraded by factors beyond its control and from which it does not benefit. This includes areas affected by natural disasters, climate change, and the actions of third parties with whom the company does not have – and has never had – a commercial relationship', 'note-xxiv', ' (e.g., public infrastructure projects, Indigenous settlements).'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-principle16' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa3.4')
}

run().catch((err) => { console.error(err); process.exit(1) })
