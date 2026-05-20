/**
 * Seeds all of IA02 — Impacted Party Engagement.
 *
 * Includes:
 *   - Objective IA02 (narrative + headline goal)
 *   - Bibliography entries 20–25 (placeholders) + the actual referenced sources
 *   - Editorial notes xi, xii, xiii
 *   - Activities IAa2.1, IAa2.2, IAa2.3, IAa2.4, IAa2.5
 *
 * Run with:
 *   npx tsx scripts/seed-IA02.ts
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID is not set')
if (!token) throw new Error('SANITY_AUTH_TOKEN is not set')

const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

let key = 0
const k = () => `k${++key}`

function p(text: string) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function li(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [{ _type: 'span', _key: k(), text, marks: [] }],
    markDefs: [],
  }
}

function pWithNote(before: string, noteId: string, after: string) {
  const markKey = k()
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      { _type: 'editorialNoteRef', _key: markKey, note: { _type: 'reference', _ref: noteId } },
    ],
  }
}

function pWithBib(before: string, bibId: string, after: string) {
  const markKey = k()
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      { _type: 'bibliographyRef', _key: markKey, entry: { _type: 'reference', _ref: bibId } },
    ],
  }
}

const IDS = {
  // Bibliography placeholders for numbered footnotes
  bib16: 'bib-16-iaia-sia-2015',
  bib20: 'bib-20',
  bib21: 'bib-21',
  bib22: 'bib-22',
  bib23: 'bib-23',
  bib24: 'bib-24',
  bib25: 'bib-25',
  // Un-numbered referenced sources (cited in Referenced Source lists only)
  bibISO26000: 'bib-iso-26000',
  bibUNGP: 'bib-un-guiding-principles',
  bibUDHR: 'bib-udhr',
  bibUNOHCHR: 'bib-un-ohchr-mass-media',
  bibDIHR: 'bib-danish-institute-hrcat',

  noteXI: 'note-xi',
  noteXII: 'note-xii',
  noteXIII: 'note-xiii',

  a21: 'activity-IAa2-1',
  a22: 'activity-IAa2-2',
  a23: 'activity-IAa2-3',
  a24: 'activity-IAa2-4',
  a25: 'activity-IAa2-5',
}

async function run() {
  // ─── Objective IA02 narrative ───────────────────────────────────────────
  console.log('Updating Objective IA02 (narrative + headline goal)...')
  await client
    .patch('objective-IA02')
    .set({
      headlineGoal: "Ensure that impacted parties' views, concerns, and values are considered to increase their well-being.",
      narrative: [
        p('The aim is to increase impacted party satisfaction and well-being, due to projects being more attuned to their needs and aspirations. If Owners collect and integrate comprehensive impacted party feedback throughout the development process, there will be an increase in impacted party satisfaction and well-being due to the resulting projects being more attuned to their needs and aspirations.'),
        p("Impacted party engagement involves owners communicating with and seeking feedback from those interested in or impacted by a project's actions. This leads to more informed and sustainable decisions, reducing risks and building trust. To prioritize social equity in real estate development, impacted party engagement must be a foundational rather than an ancillary activity. By centering impacted parties in decision-making, their views, concerns, and values are genuinely considered, creating a more inclusive environment."),
        p('Real estate development is a comprehensive effort beyond creating a tangible asset. Every decision, from initial conception to operation to disposition, creates potential impacts on a wide range of impacted parties. Recognizing these impacts is an essential first step, but to properly address them, it is critical to ensure that impacted parties are consulted to determine how they feel about the impacts. Only when we hear from those experiencing the effects of decisions can we achieve real estate developments that are successful, equitable, socially sustainable, and in harmony with the needs and values of all affected parties.'),
      ],
    })
    .commit()
  console.log('  ✓ IA02 objective updated')

  // ─── Bibliography placeholders 20-25 + named entries ────────────────────
  console.log('\nSeeding bibliography entries...')
  for (const [id, num] of [
    [IDS.bib20, 20],
    [IDS.bib21, 21],
    [IDS.bib22, 22],
    [IDS.bib23, 23],
    [IDS.bib24, 24],
    [IDS.bib25, 25],
  ] as const) {
    await client.createOrReplace({
      _id: id,
      _type: 'bibliographyEntry',
      number: num,
      title: `Bibliography entry ${num} (TBD)`,
      citation: `Bibliography entry #${num} — to be filled in from Appendix B / page 330.`,
      sourceType: 'other',
    })
  }
  console.log('  ✓ Placeholders [20]–[25]')

  await client.createOrReplace({
    _id: IDS.bibISO26000,
    _type: 'bibliographyEntry',
    title: 'ISO 26000:2010, Guidance on social responsibility',
    citation: 'ISO 26000:2010, Guidance on social responsibility (2021)',
    sourceType: 'standard',
  })
  await client.createOrReplace({
    _id: IDS.bibUNGP,
    _type: 'bibliographyEntry',
    title: 'UN Guiding Principles on Business and Human Rights',
    citation: 'UN Guiding Principles on Business and Human Rights (2011)',
    sourceType: 'guidance',
    url: 'https://www.ohchr.org/sites/default/files/documents/publications/guidingprinciplesbusinesshr_en.pdf',
  })
  await client.createOrReplace({
    _id: IDS.bibUDHR,
    _type: 'bibliographyEntry',
    title: 'Universal Declaration of Human Rights',
    citation: 'Universal Declaration of Human Rights (1948), Article 19',
    sourceType: 'declaration',
    url: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
  })
  await client.createOrReplace({
    _id: IDS.bibUNOHCHR,
    _type: 'bibliographyEntry',
    title: 'UN OHCHR Declaration on Mass Media',
    citation: 'UN OHCHR Declaration on Fundamental Principles concerning the Contribution of the Mass Media to Strengthening Peace and International Understanding',
    sourceType: 'declaration',
  })
  await client.createOrReplace({
    _id: IDS.bibDIHR,
    _type: 'bibliographyEntry',
    title: 'Danish Institute for Human Rights — Human Rights Compliance Assessment Tool',
    citation: 'Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain (2016)',
    sourceType: 'guidance',
  })
  console.log('  ✓ Named source entries')

  // ─── Editorial notes xi, xii, xiii ──────────────────────────────────────
  console.log('\nSeeding editorial notes...')
  await client.createOrReplace({
    _id: IDS.noteXI,
    _type: 'editorialNote',
    marker: 'xi',
    order: 11,
    body: [p('This calculation uses the arithmetic average as there is no weighting difference in the inclusive design categories.')],
  })
  await client.createOrReplace({
    _id: IDS.noteXII,
    _type: 'editorialNote',
    marker: 'xii',
    order: 12,
    body: [p('If the community is diverse and includes people who speak different languages, provide translations of the grievance mechanism information, and ensure that language support is available to assist community members in understanding and accessing the mechanism.')],
  })
  await client.createOrReplace({
    _id: IDS.noteXIII,
    _type: 'editorialNote',
    marker: 'xiii',
    order: 13,
    body: [p('CAO is the independent accountability mechanism for the International Finance Corporation (IFC) and Multilateral Investment Guarantee Agency (MIGA), the private sector members of the World Bank Group. CAO reports directly to the President of the World Bank Group, and its mandate is to assist in addressing complaints from people affected by IFC/MIGA-supported projects in a manner that is fair, objective, and constructive, and to enhance the social and environmental outcomes of those projects.')],
  })
  console.log('  ✓ Notes xi, xii, xiii')

  // ─── IAa2.1 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa2.1...')
  const rsa = {
    _type: 'ratingSystemApplication',
    bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
  }
  const pillarRef = { _type: 'reference', _ref: 'pillar-social-impact' }
  const conceptRef = { _type: 'reference', _ref: 'concept-IA' }
  const objRef = { _type: 'reference', _ref: 'objective-IA02' }

  await client.createOrReplace({
    _id: IDS.a21,
    _type: 'activity',
    activityId: 'IAa2.1',
    title: 'Fully inform community members about the project and likely impacts',
    slug: { _type: 'slug', current: 'iaa2-1' },
    pillar: pillarRef, concept: conceptRef, objective: objRef,
    activityType: 'Impact',
    ratingSystemApplication: rsa,
    scope: [p('The Owner shall develop and disseminate responsible communication(s) ("communication") to all potential impacted parties that might be affected by the project, detailing the project\'s nature and anticipated impacts.')],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Act to Avoid Harm',
        headingFootnote: { _type: 'reference', _ref: IDS.bib20 },
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('Identification and assessment of impacts on vulnerable groups related to content and visuals used in its communication, including:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('assessment of the risks and impacts of the communication on vulnerable groups identified in IAa1.5 including analyzing the content and visuals used in its communication to revise any perceived as discriminatory or harmful')] },
              { _key: k(), letter: 'b', body: [p('a land acknowledgment, recognizing the Indigenous peoples and their traditional territories')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Respect for rights shall include:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('information disclosure that a reasonable person would not deem highly offensive or invasive')] },
              { _key: k(), letter: 'b', body: [p('written consent for including information about persons or groups in communication')] },
              { _key: k(), letter: 'c', body: [p('informed consents and recognition to the owners and/or creators if using musical or artistic material in communication')] },
              { _key: k(), letter: 'd', body: [p('accuracy of all sources')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Communication dissemination shall include:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('appropriate methods of communication dissemination based on the demographics and preferences of the impacted party groups')] },
              { _key: k(), letter: 'b', body: [p('communication that is accessible to all, including those with disabilities or those who speak different languages, by providing necessary accommodations such as translations or sign language interpreters')] },
              { _key: k(), letter: 'c', body: [p('a sample size that reflects a 95% confidence level with a 5% margin of error based on the population size of the geographical boundaries identified in Activity IAa1.5')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Benefit Impacted Parties',
        headingFootnote: { _type: 'reference', _ref: IDS.bib21 },
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 4,
            body: [p('Information used to inform community members (see Definition below) fully shall include:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p("the project's goals, objectives, and scope")] },
              { _key: k(), letter: 'b', body: [p('similar projects elsewhere to give them a sense of how they are likely to be affected')] },
              { _key: k(), letter: 'c', body: [p('how they can provide feedback, opinions, and grievances')] },
              { _key: k(), letter: 'd', body: [p('their procedural rights in the regulatory and social performance framework for the project (i.e., provide unambiguous procedures for impacted parties to request information and raise concerns as well as their options for remedy through the applicable legal system should they feel their rights have been violated)')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Contribute to Solutions',
        headingFootnote: { _type: 'reference', _ref: IDS.bib22 },
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 5,
            body: [p('A community survey with a statistically significant sample size (at least 95% confidence level with a 5% margin of error) to determine that impacted parties clearly understand the project and its likely impacts.')],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of likely impacted community members fully informed according to the requirements. The first context indicator is the number of unique individuals reached. The second context indicator is the number of likely impacted community members.')],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Identify the sample size that represents a 95% confidence level with a 5% margin of error for community-impacted parties (see Community member\'s definition below in Guidance).', 'number', 1),
              li('Identify the number of likely impacted parties reached during the Activity (counted as unique views; see Definition below).', 'number', 1),
              li('Calculate the percentage of likely impacted parties informed.', 'number', 1),
            ],
            formula: 'P = (S_R / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of likely impacted community members fully informed' },
              { symbol: 'S_R', meaning: 'number of likely impacted community members reached' },
              { symbol: 'N', meaning: 'total sample size that represents a 95% confidence level with a 5% margin of error' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring',
      mode: 'single',
      outcomeThreshold: [p('The target outcome threshold is seventy-five percent (75%).')],
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Percentage of Impacted Parties Informed',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50% impacted parties informed' },
          { _key: k(), pointsLabel: '2 points', criterion: '75% impacted parties informed' },
          { _key: k(), pointsLabel: '3 points', criterion: '95% impacted parties informed' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      {
        _type: 'documentationItem', _key: k(), number: 2,
        body: [p('Risk assessment that includes:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('a listing of the identified vulnerable groups such as ethnic minoritized groups, religious minoritized groups, children, and marginalized groups')] },
          { _key: k(), letter: 'b', body: [p("documentation of the method of analysis used to assess if the communication's content and visuals could be perceived as discriminatory or harmful to vulnerable groups")] },
          { _key: k(), letter: 'c', body: [p('documentation of the resolution to resolve any deficiencies in 2b')] },
          { _key: k(), letter: 'd', body: [p('a documented land acknowledgment as part of the communication')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('All written consents, informed consents, and a list of the credible corroborating sources for evidence of the accuracy of cited sources.')] },
      {
        _type: 'documentationItem', _key: k(), number: 4,
        body: [p('Table listing:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('all methods used to inform impacted parties fully')] },
          { _key: k(), letter: 'b', body: [p('the number reached through each method')] },
          { _key: k(), letter: 'c', body: [p('impacted party group reached')] },
          { _key: k(), letter: 'd', body: [p('content of communication')] },
          { _key: k(), letter: 'e', body: [p('accommodations made for accessibility')] },
        ],
      },
      {
        _type: 'documentationItem', _key: k(), number: 5,
        body: [p('A copy of communication content and materials, including:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('project goals, objectives, and scope')] },
          { _key: k(), letter: 'b', body: [p('information on similar projects elsewhere (if this is a net new type for the area)')] },
          { _key: k(), letter: 'c', body: [p('procedures for impacted parties to raise concerns and request information')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p("The Community survey report summarizes the results of the community survey to determine impacted parties' clear understanding of the project and its likely impacts. The report should include details of the statistically significant sample size (95% or higher).")] },
    ],
    definitions: [
      {
        _type: 'definition', _key: k(),
        term: 'Unique view',
        body: [p('a term used in marketing analytics which refers to a person who has viewed the communication at least once and is counted only once in the reporting time period.')],
      },
      {
        _type: 'definition', _key: k(),
        term: 'Community members',
        body: [pWithBib('', IDS.bib23, " refer to individuals or groups of people who live near the project site or property as well as those who may be impacted by changes at the site such as workers, visitors, commuters, and shoppers. It can also include second home owners, including people who are 'weekenders' and/or those who regularly holiday there. Additionally, there may be informal settlements, including illegal immigrants or unhoused populations, who may not be considered legitimate impacted parties by project managers but are still rights-holders from a human rights perspective and therefore their impacts must still be considered.")],
      },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On responsible communication characteristics',
        body: [
          pWithBib('According to ISO 26000:2010, Guidance on social responsibility, information relating to social responsibility should be', IDS.bib24, ':'),
          li('Complete – address all significant activities and impacts related to social responsibility', 'bullet', 1),
          li('Understandable – both the language used, and the manner in which the material is presented, including how it is organized, should be accessible for the impacted parties intended to receive the information', 'bullet', 1),
          li('Responsive – be responsive to impacted party interests', 'bullet', 1),
          li('Accurate – be factually correct and should provide sufficient detail to be useful and appropriate for its purpose', 'bullet', 1),
          li("Balanced – be balanced and fair and should not omit relevant negative information concerning the impacts of an organization's activities", 'bullet', 1),
          li('Timely – out of date information can be misleading. Where information describes activities during a specific period of time, identification of the period of time covered will allow impacted parties to compare the performance of the organization with its earlier performance and with the performance of other organizations; and', 'bullet', 1),
          li('Accessible – be available to the impacted parties concerned', 'bullet', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On methods to reach community members',
        body: [
          p('There are several ways to reach all community members, including:'),
          li('Provide clear and legible signage on each project site displaying information on how to contact the executing entity in case of concerns or complaints', 'bullet', 1),
          li('Public meetings can be held in a central location, at multiple times, to be accessible to all community members. This can be an opportunity to provide information about the project and to hear feedback from community members.', 'bullet', 1),
          li('Social media platforms such as Facebook, Twitter, and Instagram can be used to reach a large number of people quickly and easily. This can be an effective way to share information about the project and to engage with community members.', 'bullet', 1),
          li('Flyers and brochures can be distributed throughout the community (individual mailings, posted in community centers, churches, groceries, etc) to provide information about the project and to encourage community members to get involved.', 'bullet', 1),
          li('Working with community leaders such as local government officials, religious leaders, and business owners can help to ensure that information about the project is disseminated throughout the community.', 'bullet', 1),
        ],
      },
    ],
    referencedSources: [
      { _type: 'reference', _ref: IDS.bibISO26000, _key: k() },
      { _type: 'reference', _ref: IDS.bibUNGP, _key: k() },
      { _type: 'reference', _ref: IDS.bibUDHR, _key: k() },
      { _type: 'reference', _ref: IDS.bibUNOHCHR, _key: k() },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ Activity IAa2.1')

  // ─── IAa2.2 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa2.2...')
  await client.createOrReplace({
    _id: IDS.a22,
    _type: 'activity',
    activityId: 'IAa2.2',
    title: 'Collect feedback from impacted parties',
    slug: { _type: 'slug', current: 'iaa2-2' },
    pillar: pillarRef, concept: conceptRef, objective: objRef,
    activityType: 'Driver',
    ratingSystemApplication: rsa,
    scope: [p("The Owner shall systematically gather feedback from all impacted parties as identified in the impacted party analysis in Activity IAa1.5 to ensure diverse perspectives, concerns, and suggestions from every relevant individual or group are considered in the project's decision-making and implementation. Feedback collection methods that do not comprehensively address all identified impacted parties, or that bypass the findings of the impacted party analysis are outside the scope of this activity.")],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('Feedback shall have a 95% confidence level with a 5% margin of error to ensure the responses accurately represent the views and concerns of the respective group.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Analysis of the collected feedback to identify key themes, concerns, and suggestions from impacted parties. For example, categorize feedback into themes like safety concerns, social impacts, and suggested improvements.')],
          },
        ],
      },
    ],
    requirementsLeadIn: [p('Collection of feedback from each impacted party group using the methods outlined in the engagement protocol from Activity IAa1.6.')],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of impacted party feedback collected according to the requirements. The first context indicator is the percentage of impacted party feedback collected from identified marginalized or vulnerable groups. The second context indicator is the total number of impacted parties engaged.')],
      calculation: {
        _type: 'calculation',
        mode: 'multi-step',
        steps: [
          {
            _key: k(), label: 'Step 1',
            instructions: [
              p('To calculate the performance indicator:'),
              li('Identify the sample size for each impacted group that represents a 95% confidence level with 5% margin of error for community members.', 'number', 1),
              li('Identify the number of impacted parties giving feedback.', 'number', 1),
              li('Calculate the percentage of impacted parties feedback collected per impacted party group.', 'number', 1),
            ],
            formula: 'p = (S_H / n) × 100',
            variables: [
              { symbol: 'p', meaning: 'percentage of impacted party feedback for an impacted party group' },
              { symbol: 'S_H', meaning: 'number of impacted party feedback for an impacted party group' },
              { symbol: 'n', meaning: 'sample size that reflects 95% confidence level for an impacted party group' },
            ],
          },
          {
            _key: k(), label: 'Step 2',
            instructions: [pWithNote('Calculate progress as the percentage average', IDS.noteXI, ' of the impacted party feedback collected.')],
            formula: 'P = (p1+p2+p3… / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of impacted party feedback collected' },
              { symbol: 'p#', meaning: 'percentage of impacted party feedback for each group' },
              { symbol: 'N', meaning: 'total number of impacted party groups' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Percentage Impacted Party Feedback Collected',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% of impacted party feedback collected' },
          { _key: k(), pointsLabel: '2 points', criterion: '40% of impacted party feedback collected' },
          { _key: k(), pointsLabel: '3 points', criterion: '60% of impacted party feedback collected' },
          { _key: k(), pointsLabel: '4 points', criterion: '80% of impacted party feedback collected' },
          { _key: k(), pointsLabel: '5 points', criterion: '100% of impacted party feedback collected' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      {
        _type: 'documentationItem', _key: k(), number: 2,
        body: [p('Impacted Party Feedback Collection Report containing the following:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('The process of collecting feedback from each identified impacted party group')] },
          { _key: k(), letter: 'b', body: [p('the number of impacted parties contacted + number of responses received per group')] },
          { _key: k(), letter: 'c', body: [p('list of sample sizes that meet the 95% confidence level for each impacted party group')] },
          { _key: k(), letter: 'd', body: [p('export of collected feedback per group with quantitative and qualitative data')] },
        ],
      },
      {
        _type: 'documentationItem', _key: k(), number: 3,
        body: [p('Impacted Party Feedback Analysis Report detailing the analysis of the collected feedback, including:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('the approach used to analyze the data, such as thematic analysis, sentiment analysis, or any other relevant methods')] },
          { _key: k(), letter: 'b', body: [p('the key themes, concerns, and suggestions identified from the impacted party feedback, providing a clear and concise summary')] },
          { _key: k(), letter: 'c', body: [p('quotes or examples from impacted parties to illustrate the findings')] },
        ],
      },
    ],
    referencedSources: [{ _type: 'reference', _ref: IDS.bib16, _key: k() }],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ Activity IAa2.2')

  // ─── IAa2.3 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa2.3...')
  await client.createOrReplace({
    _id: IDS.a23,
    _type: 'activity',
    activityId: 'IAa2.3',
    title: 'Develop and implement ways of addressing impacts',
    slug: { _type: 'slug', current: 'iaa2-3' },
    pillar: pillarRef, concept: conceptRef, objective: objRef,
    activityType: 'Driver',
    ratingSystemApplication: rsa,
    scope: [p("Owner shall develop strategies based on the likely impacts identified in IAa1.4 and the impacted party feedback from IAa2.2. These strategies will aim to prevent or mitigate any negative impacts and maximize the project's positive impacts. In cases where the project results in significant changes to the community, the Owner shall also establish resources and mechanisms to assist the community in adapting to these changes. The scope includes developing and implementing these strategies but does not cover the evaluation of their effectiveness after they have been implemented.")],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A comprehensive strategy to prevent or mitigate each identified likely negative impact of the project. If applicable, Owner shall create a plan to support communities in coping with change brought about by the project since change could be considered an impact.')],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Benefit Impacted Parties',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Implementation strategies to optimize the positive impacts of the project.')],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p("Long-term solutions that prevent the recurrence of negative impacts and/or optimize the positive impacts. This involves creating strategies that address the current project's impacts and build resilience and capacity within the community for future projects or changes.")],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of identified likely negative impacts where Owner implemented actions to prevent or mitigate the impact. The context indicator is the number of prospective long-term solutions implemented.')],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Identify the total number of negative impacts that were expected from the project.', 'number', 1),
              li('Determine the number of these impacts where Owner implemented actions to prevent or mitigate the impact.', 'number', 1),
              li('Calculate the percentage of identified negative impacts where Owner implemented actions to prevent or mitigate the effect.', 'number', 1),
            ],
            formula: 'P = (M / T) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of identified negative impacts where Owner implemented actions to prevent or mitigate the impact' },
              { symbol: 'T', meaning: 'total number of negative impacts expected' },
              { symbol: 'M', meaning: 'total number of identified negative impacts where Owner implemented actions to prevent/mitigate the impact' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring',
      mode: 'single',
      outcomeThreshold: [p('100% of identified negative impacts where the Owner implemented actions to prevent or mitigate the impact.')],
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Percentage of Negative Impacts Addressed',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50-79% of negative impacts addressed' },
          { _key: k(), pointsLabel: '2 points', criterion: '80+% of negative impacts addressed' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'Additional Requirement Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'requirement for #2 satisfied' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'requirement for #3 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Implementation Reports that provide details and evidence of the strategies being put into action.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Long-term Solutions Strategy Document that outlines the strategies to prevent the recurrence of negative impacts and/or optimize the positive impacts in addition to building resilience and capacity within the community for future projects or changes.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('A strategy table that provides the strategies related to each likely project impact.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On creating effective solutions for impact mitigation and benefit optimization',
        body: [
          p('You can leverage proven methods and solutions from research or other projects to create more effective solutions.'),
          p('Using the list of likely impacts from Activity IAa1.4, research solutions proven to work in similar situations. This could involve reviewing academic research, case studies, or reports from similar projects. Look for methods that have been successful in mitigating similar negative impacts or enhancing similar positive impacts.'),
          p("Next, adapt the identified solutions to the specific context of your project. This might involve modifying the solution to fit your project's scale, location, or other unique characteristics. It's important to consider the specific circumstances of your project since what worked in one context might not work in another."),
          p('Ensure the implementation is completed systematically and organized to ensure the solutions are being implemented as planned.'),
          p("To evaluate effectiveness, you should monitor the project's impacts over time and assess whether the negative impacts have been successfully mitigated and the positive impacts optimized. Use the results of this evaluation to adjust your strategies as needed. Document the findings and lessons learned and use these to inform the planning and implementation of future projects."),
        ],
      },
    ],
    referencedSources: [{ _type: 'reference', _ref: IDS.bib16, _key: k() }],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ Activity IAa2.3')

  // ─── IAa2.4 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa2.4...')
  await client.createOrReplace({
    _id: IDS.a24,
    _type: 'activity',
    activityId: 'IAa2.4',
    title: 'Establish a community grievance mechanism for direct reporting of complaints to the Owner',
    slug: { _type: 'slug', current: 'iaa2-4' },
    pillar: pillarRef, concept: conceptRef, objective: objRef,
    activityType: 'Driver',
    ratingSystemApplication: rsa,
    scope: [p("The Owner shall establish a process for receiving, acknowledging, investigating, resolving, and closing community complaints and grievances that allows community members to submit concerns as they arise. In this way, the grievance mechanism serves as a key component of the Project's approach to community engagement and risk mitigation.")],
    requirementsSectionFootnote: { _type: 'reference', _ref: IDS.bib25 },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A grievance mechanism that includes the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('There shall be a documented grievance mechanism procedure for how concerns and complaints are received, processed, and settled.')] },
              { _key: k(), letter: 'b', body: [pWithNote('The grievance mechanism can be accessed via at least two different access points, ensuring equal and effective access for everyone in the community, including vulnerable groups', IDS.noteXII, '.')] },
              { _key: k(), letter: 'c', body: [p('The process and procedures of the grievance mechanism shall be clear and transparent, ensuring that community members understand how their complaints will be handled and resolved.')] },
              { _key: k(), letter: 'd', body: [p('The grievance mechanism shall be independent and impartial, free from any undue influence or bias, to ensure fair and objective resolution of complaints.')] },
              { _key: k(), letter: 'e', body: [p("The complainant's confidentiality shall be respected throughout the grievance process, protecting them from any potential retaliation or harm.")] },
              { _key: k(), letter: 'f', body: [p("The grievance mechanism shall have a reasonable timeframe for addressing and resolving complaints, but in no case shall exceed 30 days, ensuring that community members' concerns are dealt with in a timely manner.")] },
              { _key: k(), letter: 'g', body: [p('The grievance mechanism shall hold responsible parties accountable for addressing and resolving complaints, ensuring that appropriate actions are taken to address any issues raised.')] },
              { _key: k(), letter: 'h', body: [p('The grievance mechanism shall provide appropriate remedies to address the harm or injustice suffered by the complainant, such as compensation, corrective measures, or changes in policies or practices.')] },
              { _key: k(), letter: 'i', body: [p('The grievance mechanism shall provide feedback to the complainant on the progress and outcome of their complaint.')] },
              { _key: k(), letter: 'j', body: [p('The grievance mechanism shall establish feedback channels where community members can provide suggestions or comments on the effectiveness of the grievance mechanism and on their complaint.')] },
              { _key: k(), letter: 'k', body: [p('The grievance mechanism creates a process where the complainant confirms the resolution addresses their grievance prior to closing and follow-ups are conducted with the complainant after implementation to confirm satisfaction.')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Benefit Impacted Parties',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Awareness by community members they have access to a grievance mechanism and understand the processes and procedures for making a complaint (see Guidance below).')],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(),
        heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Records of all grievances lodged and reporting on grievance resolution trends regularly, both internally and externally. Records must be GDPR compliant and a process in place to ensure compliance with GDPR and other relevant data protection laws.')],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('See scenarios below for performance and context indicators (depends on whether grievances have been filed).')],
      calculation: {
        _type: 'calculation',
        mode: 'multi-scenario',
        scenarios: [
          {
            _key: k(), label: 'Scenario 1: No Grievances Filed',
            description: [
              p('If no grievances have been filed within the reporting period, the performance indicator is the percentage understanding of the grievance mechanism. The first context indicator is the number of individuals surveyed. The second context indicator is the number of individuals understanding the grievance mechanism process. Owner shall administer a structured survey to the community members to assess their awareness and understanding of the grievance mechanism and the process for making a complaint. The survey shall include, but not be limited to:'),
              li('Awareness of grievance mechanism', 'bullet', 1),
              li('Understanding of the process to file a complaint', 'bullet', 1),
              li('Awareness of the types of issues that can be reported', 'bullet', 1),
              li('Confidence in the impartiality and effectiveness of the grievance mechanism', 'bullet', 1),
            ],
            steps: [
              {
                _key: k(),
                instructions: [
                  p('To calculate the performance indicator:'),
                  li('Identify the number of individuals indicating an understanding of grievance mechanism.', 'number', 1),
                  li('Identify the number of individuals surveyed.', 'number', 1),
                  li('Calculate the percentage of understanding of grievance mechanism.', 'number', 1),
                ],
                formula: 'P = (I_U / N) × 100',
                variables: [
                  { symbol: 'P', meaning: 'percentage of understanding of grievance mechanism among surveyed individuals' },
                  { symbol: 'I_U', meaning: 'number of individuals indicating an understanding of grievance mechanism' },
                  { symbol: 'N', meaning: 'total number of surveyed individuals' },
                ],
              },
            ],
          },
          {
            _key: k(), label: 'Scenario 2: Grievances Filed',
            description: [p('If there have been any grievances filed, the performance indicator is the percentage of unique, validated grievances (see Definitions in Guidance below) resolved, where resolution is defined according to Requirement 1.k. The first context indicator is the number and nature of grievances filed. The second context indicator is qualitative feedback from complainant, collected during the grievance process according to Requirements 1.j and k. The third context indicator is the average time for grievance resolution.')],
            steps: [
              {
                _key: k(),
                instructions: [
                  p('To calculate the performance indicator:'),
                  li('Identify the number of unique, validated grievances filed', 'number', 1),
                  li('Identify the number of resolved grievances to the satisfaction of complainant', 'number', 1),
                  li('Calculate the percentage of resolved grievances according to the requirements.', 'number', 1),
                ],
                formula: 'P = (G_R / N) × 100',
                variables: [
                  { symbol: 'P', meaning: 'percentage of resolved violations' },
                  { symbol: 'G_R', meaning: 'number of resolved violations to the satisfaction of complainant' },
                  { symbol: 'N', meaning: 'total number of violations filed' },
                ],
              },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring',
      mode: 'multi-scenario',
      scenarios: [
        {
          _key: k(), label: 'No Grievances Filed',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Percentage of Understanding of Grievance Mechanism',
            bands: [
              { _key: k(), pointsLabel: '1 point', criterion: '20% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '2 points', criterion: '40% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '3 points', criterion: '60% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '4 points', criterion: '80% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '5 points', criterion: '99-100% understanding of grievance mechanism' },
            ],
          },
        },
        {
          _key: k(), label: 'Grievances Filed',
          rubric: {
            _type: 'scoringRubric',
            criterionLabel: 'Percentage of Grievances Resolved',
            bands: [
              { _key: k(), pointsLabel: '1 point', criterion: '20% grievances resolved' },
              { _key: k(), pointsLabel: '2 points', criterion: '40% grievances resolved' },
              { _key: k(), pointsLabel: '3 points', criterion: '60% grievances resolved' },
              { _key: k(), pointsLabel: '4 points', criterion: '80% grievances resolved' },
              { _key: k(), pointsLabel: '5 points', criterion: '99-100% grievances resolved' },
            ],
          },
        },
      ],
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('The written grievance mechanism satisfying all requirements.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('An access table listing the specific access points through which community members and impacted parties can access the grievance mechanism that lists the access point, the intended audience, and the content provided at the access point.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation of content for each access point (screenshots can be provided for digital content).')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Comprehensive records of all grievances lodged (if applicable), including relevant information such as the nature of the grievance, date of submission, actions taken, the resolution of each complaint, follow-up with the complainant, and feedback from complainants regarding satisfaction of the resolution. Records must be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation of communication to community members informing them of the grievance mechanism.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p("Copies of surveys conducted to assess community members' awareness and understanding of the grievance mechanism and the process for making a complaint (if applicable).")] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Records of survey results demonstrating the level of understanding among community members (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Documentation of actions taken in response to survey results to improve awareness and understanding if necessary.')] },
    ],
    definitions: [
      {
        _type: 'definition', _key: k(),
        term: 'Unique Grievance',
        body: [p('is a distinct complaint or expression of dissatisfaction raised by an individual or group, identifiable by its specific context, issue, or set of circumstances. Each unique grievance is counted only once, regardless of the number of times it is reported, or the number of individuals involved, provided the underlying issue or context remains consistent. This ensures accurate representation and tracking of distinct issues within a dataset.')],
      },
      {
        _type: 'definition', _key: k(),
        term: 'Validated Grievance',
        body: [p("is a complaint or expression of dissatisfaction that has been confirmed through an evidence-based verification process. This process evaluates the grievance against legal regulations, standards, and other applicable governance discovered in IAa1.1. A grievance is considered validated if it is directly linked to the project's actions or decisions and can be substantiated with tangible evidence, such as documentation, factual data, or verifiable observations. The validation process should be transparent, consistent, and strictly adhere to applicable project governance, ensuring that grievances are assessed objectively and in line with established legal and professional benchmarks. This method minimizes subjectivity and ensures compliance with relevant and authoritative criteria.")],
      },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On types of access points for submitting complaints',
        body: [
          p('It is important to have a good mix of confidential, anonymous, semi-public, and public ways to access a grievance mechanism. Some examples include:'),
          li('Community Liaison Officers (confidential)', 'bullet', 1),
          li('complaint hotline (confidential or anonymous)', 'bullet', 1),
          li('web page (confidential or anonymous)', 'bullet', 1),
          li('e-mail address (confidential or semi-public)', 'bullet', 1),
          li('text messaging (confidential or semi-public)', 'bullet', 1),
          li('complaint box in a public area (anonymous, confidential, or semi-public)', 'bullet', 1),
          li('community leaders (confidential, semi-public, or public)', 'bullet', 1),
          li('NGOs (anonymous, confidential, semi-public, or public)', 'bullet', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On educating and informing community members of grievance mechanism',
        body: [
          p('This process emphasizes the importance of ensuring that community members are informed and educated about the existence of the grievance mechanism and how they can utilize it. It is crucial that community members understand the processes and procedures involved in making a complaint, so they can effectively exercise their rights.'),
          p('The following are ways to educate and inform community members about the grievance mechanism:'),
          li('Communication: Develop clear, easily understood written materials about the grievance mechanism that are available in the languages spoken by the community through various channels such as churches, grocery stores, post offices, community centers, and ads in newspapers, magazines, etc.', 'bullet', 1),
          li('Online Resources: If community members have access to digital resources, create a section on your public website that provides information about the grievance mechanism and its use.', 'bullet', 1),
          li('Regular Reminders: Periodically remind community members about the grievance mechanism through public communications, such as press releases, emails, or website updates. Reinforce the importance of the mechanism and encourage community members to utilize it if they have any concerns.', 'bullet', 1),
          li('Feedback Channels: Establish feedback channels where community members can provide suggestions or comments on the effectiveness of the grievance mechanism. This can help improve the process and address any potential gaps or challenges.', 'bullet', 1),
          li('Case Studies: Share anonymized case studies in a public forum of how grievances have been successfully resolved. This can help community members understand how the process works and the kinds of outcomes that are possible', 'bullet', 1),
        ],
      },
      {
        _type: 'guidanceResources', _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'The Office of the Compliance Advisor Ombudsman (CAO) Sample Community Grievance Mechanism Procedure',
            description: [pWithNote('The Office of the Compliance Advisor Ombudsman (CAO)', IDS.noteXIII, ' Sample Community Grievance Mechanism Procedure - a general guide for the type of information that could be provided to the public once tailored to local contexts.')],
            url: 'https://www.cao-grm.org/tools-and-resources',
          },
          {
            _key: k(),
            label: 'CAO Grievance Mechanism Toolkit',
            description: [p('The Office of the Compliance Advisor Ombudsman (CAO) Grievance Mechanism Toolkit – provides tools for enhancing the effectiveness of existing grievance mechanisms, as well as implementing best practice in the creation of new grievance mechanisms.')],
            url: 'https://www.cao-grm.org/tools-and-resources',
          },
          {
            _key: k(),
            label: 'Reckitt Grievance Mechanism Toolkit (Oxfam Business Advisory Service)',
            url: 'https://www.oxfamapps.org/grievance-mechanism-toolkit/',
          },
        ],
      },
    ],
    referencedSources: [
      { _type: 'reference', _ref: IDS.bibUNGP, _key: k() },
      { _type: 'reference', _ref: IDS.bibDIHR, _key: k() },
      { _type: 'reference', _ref: IDS.bib16, _key: k() },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ Activity IAa2.4')

  // ─── IAa2.5 ─────────────────────────────────────────────────────────────
  console.log('\nSeeding Activity IAa2.5...')
  await client.createOrReplace({
    _id: IDS.a25,
    _type: 'activity',
    activityId: 'IAa2.5',
    title: 'Draft and publish the Social Impact Management Plan (SIMP)',
    slug: { _type: 'slug', current: 'iaa2-5' },
    pillar: pillarRef, concept: conceptRef, objective: objRef,
    activityType: 'Driver',
    ratingSystemApplication: rsa,
    scope: [p("Owner shall produce a Social Impact Management Plan (SIMP) using data from Activities IAa1.1 through IAa2.4. This plan shall detail the strategies for managing the project's social impacts. After the SIMP is complete, it will be published for relevant parties to ensure transparency in social impact management. The scope covers the creation and publication of the SIMP but does not include its implementation or evaluation.")],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A SIMP that clearly articulates the strategies, actions, and measures implemented during Activities IAa1.1 through IAa2.4, for managing social impact in a concise and coherent manner using language and structure that is easily understood by impacted parties (see Guidance below). The SIMP shall:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('comprehensively report on all of the implementation activities and results from Activities IAa1.1 through IAa2.4')] },
              { _key: k(), letter: 'b', body: [p('be complete, meaning that it covers all aspects of these activities and their results, leaving no significant gaps')] },
              { _key: k(), letter: 'c', body: [p('be accurate, meaning that it correctly describes the activities that were carried out and the results that were achieved, without any significant errors or omissions')] },
              { _key: k(), letter: 'd', body: [p('be clear, meaning that it is written in a way that is easy for impacted parties to understand, with a logical structure, simple language, and effective use of visuals where appropriate')] },
              { _key: k(), letter: 'e', body: [p('be relevant, meaning that it focuses on the most significant and meaningful aspects of the activities and their results, and provides impacted parties with the information they need to understand the social impact of the project')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Publication of the SIMP shall be available in appropriate formats and languages to ensure comprehension by diverse impacted parties.')],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage SIMP transparency, which measures the extent to which the Project is transparent in its publication of the Social Impact Management Plan (SIMP). The context indicator is the total number of people who have access to the report as a result of publishing.'),
        p('Assess SIMP transparency according to the requirements as follows:'),
        li('0%: A SIMP that does not comply with requirements #1.', 'bullet', 1),
        li('25%: A SIMP that complies with Requirement #1.', 'bullet', 1),
        li("50%: Requirements #1 and #2 for an internal audience (Owner's employees or Tier 1 Suppliers, consultants, and suppliers) are satisfied.", 'bullet', 1),
        li('100%: Requirements #1 and #2 for both an internal and external/public audience are satisfied.', 'bullet', 1),
      ],
    },
    scoring: {
      _type: 'scoring',
      mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric',
        criterionLabel: 'SIMP Transparency Achieved',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '25% SIMP transparency achieved' },
          { _key: k(), pointsLabel: '2 points', criterion: '50% SIMP transparency achieved' },
          { _key: k(), pointsLabel: '3 points', criterion: '100% SIMP transparency achieved' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Social Impact Management Plan (SIMP) containing detailed descriptions of the implementation activities and results.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Publication record of where and when the SIMP was published (e.g., link to the webpage where SIMP is posted, screenshot of the webpage, or copy of the publication notice).')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Copies of the SIMP in all the languages in which it was published, if applicable.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Communication records (if applicable) with impacted parties about the publication of the SIMP (e.g., emails, meeting minutes, or other forms of communication).')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On the value of public reporting',
        body: [
          p('Public reporting of progress and social implementations is a key aspect of responsible social impact management. It can contribute to:'),
          li('Transparency: Public reporting allows impacted parties, including community members, investors, and regulators, to see what actions an organization is taking to manage social impacts. This transparency can build trust and credibility and can also hold the organization accountable for its actions.', 'bullet', 1),
          li('Accountability: By publicly reporting on their progress and social implementations, organizations are held accountable to their impacted parties. This can motivate organizations to follow through on their commitments and strive for continuous improvement.', 'bullet', 1),
          li("Impacted Party Engagement: Public reporting can provide a basis for dialogue and engagement with impacted parties. It can help impacted parties understand the organization's actions and their impacts, and it can also provide opportunities for impacted parties to provide feedback and input.", 'bullet', 1),
          li('Learning and Improvement: Public reporting can facilitate learning and improvement, both within the organization and in the wider community. By sharing their experiences and lessons learned, organizations can contribute to the collective understanding of how to manage social impacts effectively.', 'bullet', 1),
          li('Benchmarking and Comparison: Public reporting allows for benchmarking and comparison between different organizations or projects. This can drive competition and innovation and can also help impacted parties make informed decisions.', 'bullet', 1),
          li('Building Social License to Operate: By demonstrating management of social impacts effectively and responsibly, organizations can build their social license to operate. This can enhance their reputation, reduce risks, and create value for both the organization and impacted parties.', 'bullet', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On ensuring a comprehensive SIMP',
        body: [
          p("Provided below is an outline that aligns with the best practices established by the International Association for Impact Assessments' (IAIA) standard 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects':"),
          li('Introduction', 'number', 1),
          li('Background information on the project', 'bullet', 2),
          li('Purpose and objectives of the Social Impact Management Plan', 'bullet', 2),
          li('Impacted Party Engagement', 'number', 1),
          li('Identification of key impacted parties', 'bullet', 2),
          li('Methods and strategies for engaging with impacted parties', 'bullet', 2),
          li('Consideration of impacted party concerns and perspectives', 'bullet', 2),
          li('Social Impact Assessment', 'number', 1),
          li('Description of the social impact assessment process', 'bullet', 2),
          li('Identification and analysis of potential social impacts', 'bullet', 2),
          li('Assessment of the significance of social impacts', 'bullet', 2),
          li('Baseline study to establish pre-project social conditions and context', 'bullet', 2),
          li('Mitigation Measures', 'number', 1),
          li('Identification of measures to minimize or mitigate negative social impacts', 'bullet', 2),
          li('Strategies for enhancing positive social impacts', 'bullet', 2),
          li('Integration of mitigation measures into project design and implementation', 'bullet', 2),
          li('Monitoring and Evaluation', 'number', 1),
          li('Development of a monitoring program to track social impacts', 'bullet', 2),
          li('Establishment of indicators and targets for monitoring', 'bullet', 2),
          li('Regular evaluation of the effectiveness of mitigation measures using adaptive management to adjust mitigation strategies based on monitoring results and changing social conditions', 'bullet', 2),
          li('Communication and Reporting', 'number', 1),
          li('Communication strategies for sharing information with impacted parties', 'bullet', 2),
          li('Reporting requirements and formats', 'bullet', 2),
          li('Transparency and accountability in reporting social impacts and mitigation efforts', 'bullet', 2),
          li('Explanation of the grievance redress mechanism', 'bullet', 2),
          li('Implementation and Management', 'number', 1),
          li('Roles and responsibilities of key personnel involved in social impact management', 'bullet', 2),
          li('Integration of social impact management into project management processes', 'bullet', 2),
          li('Coordination with other relevant plans and initiatives', 'bullet', 2),
          li('Explanation of resources required for effective implementation', 'bullet', 2),
          li('Conclusion', 'number', 1),
          li('Summary of key findings and recommendations', 'bullet', 2),
          li('Reflection on lessons learned and opportunities for improvement', 'bullet', 2),
          li('Future recommendations and opportunities for improvement to enhance effectiveness and incorporate lessons learned for future projects', 'bullet', 2),
        ],
      },
    ],
    referencedSources: [{ _type: 'reference', _ref: IDS.bib16, _key: k() }],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ Activity IAa2.5')

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
