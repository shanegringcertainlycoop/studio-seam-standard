/**
 * Seeds Objective SJ04 (Equity + Inclusion in Capital) + 2 activities.
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
const p = (text: string) => ({ _type: 'richText', _key: k(), style: 'normal',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [] })

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

const RATING_BI_ONLY: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: false, om_occupier: false, cd: false,
}

async function run() {
  console.log('Seeding editorial note xxv (pre-patch)...')
  await client.createOrReplace({
    _id: 'note-xxv', _type: 'editorialNote', marker: 'xxv', order: 25,
    body: [p('2016 dollars; 2016 Survey of Consumer Finances, The Federal Reserve, September 2017, federalreserve.gov.')],
  })

  console.log('Patching Objective SJ04...')
  // Compose the third narrative paragraph with both an editorial note and a bib ref
  const noteMark = k()
  const bibMark = k()
  const compositePara = {
    _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: '“As of 2016, the average black American family had total wealth of $17,600—about one-tenth the wealth of the average white American family, which stands at $171,000', marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [noteMark] },
      { _type: 'span', _key: k(), text: '. This gap leaves many black families at a significant economic disadvantage, with less financial security and less ability to fully participate in the economy. Less wealth also means black Americans are underrepresented in the market for financial products and services.”', marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [bibMark] },
    ],
    markDefs: [
      { _type: 'editorialNoteRef', _key: noteMark, entry: { _type: 'reference', _ref: 'note-xxv' } },
      { _type: 'bibliographyRef', _key: bibMark, entry: { _type: 'reference', _ref: 'bib-102' } },
    ],
  }

  await client.patch('objective-SJ04').set({
    headlineGoal: 'Create equitable economic opportunities and achieve social justice goals within communities.',
    narrative: [
      p('Equity + Inclusion in Capital is fundamentally rooted in the concept of creating equitable economic opportunities to achieve social justice goals within communities. This objective aligns with a growing body of research that underscores the critical role of financial inclusion and equitable investment in promoting sustainable economic development and social equity.'),
      p('Research indicates that financial inclusion is essential for reducing poverty and boosting prosperity. According to the World Bank, access to financial services enables individuals and businesses to manage life’s risks, invest in opportunities, and ultimately improve their quality of life. By prioritizing equity and inclusion in capital, SEAM aims to dismantle barriers to financial investments, ensuring that marginalized communities have access to the instruments needed to generate wealth and prosperity.'),
      compositePara,
      pWithBib('The importance of including marginalized communities as investors is supported by research highlighting the profound impacts of financial exclusion on wealth generation and economic mobility. Financial exclusion not only perpetuates income and wealth disparities but also limits access to financial products that can drive wealth creation. “Financial inclusion is the bridge between economic opportunity and outcomes”', '103', '.'),
      p('Inclusion doesn’t just benefit marginalized communities. There is a business bottom-line benefit too. By integrating marginalized communities into the investment landscape, financial institutions could unlock significant annual revenue, highlighting the economic potential of inclusion. Furthermore, addressing financial exclusion could mitigate the intergenerational consequences of wealth disparities, creating more equitable economic opportunities and enhancing overall market resilience.'),
    ],
  }).commit()

  console.log('Seeding master bib SDG 10...')
  await client.createOrReplace({
    _id: 'bib-un-sdg-10', _type: 'bibliographyEntry',
    citation: 'United Nations Sustainable Development Goal 10: Reduced Inequalities',
  })

  // ─── SJa4.1 Equity capital ───────────────────────────────────────────────
  console.log('\nSeeding SJa4.1...')
  await client.createOrReplace({
    _id: 'activity-SJa4-1', _type: 'activity',
    activityId: 'SJa4.1',
    title: 'Achieve equity and inclusion in securing equity capital and investors',
    slug: { _type: 'slug', current: 'sja4-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ04' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_BI_ONLY,
    scope: [
      p('The Owner shall set and implement inclusive equity capital principles, defined in Requirements, to promote ownership and investment in commercial real estate by historically underrepresented groups, including but not limited to people of color, women, and people from low-income backgrounds. Upon seeking capital for the project, the Owner shall integrate these principles into each stage of the process. The scope includes setting and implementing these principles but does not extend to the assessment of their effectiveness.'),
      p('Note: If projects in rating systems other than B+I: Developer and B+I: Occupier are seeking external debt or capital to fund the project, this Activity shall apply, and points can be pursued to achieve certification.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Conduct educational and outreach programs to inform potential underrepresented investors about project investment opportunities to increase capital investment from a diverse spectrum of investors, including underrepresented investors or organizations led by racial and ethnic minoritized groups.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Engage at least one minoritized institutional investor such as a Historically Black College and University (HBCU), Emerging Manager, racial or ethnic minoritized organization, or a Foundation supporting underrepresented communities for sourcing investment capital.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Support or initiate at least one program/initiative to enhance underrepresented individuals’ or groups’ access to investment, such as collaborations with social equity funds or similar entities focusing on addressing the racial and gender wealth gaps through investment.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Utilize or develop investment platforms that lower barriers to entry, enabling a broader range of investors to participate.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 5,
            body: [p('Implement a community ownership model to promote wealth building and anti-displacement, including:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Opportunities for local community members to invest, promoting local economic development and inclusivity.')] },
              { _key: k(), letter: 'b', body: [p('Underrepresented shareholder protections to ensure equitable treatment of all investors regardless of their investment size.')] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p("The performance indicator is the percentage of inclusive equity capital (capital invested by minoritized groups). The first context indicator is the total number of individual underrepresented investors on the project. The second context indicator is the total number of underrepresented or minoritized organizational investors on the project. The third context indicator is the total amount of capital invested by minoritized groups on the project."),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            p('1. Determine total amount of capital investment invested by minoritized groups.'),
            p('2. Determine the total amount of total capital investment in the project.'),
            p('3. Calculate progress as the percentage of inclusive capital.'),
            p('This is expressed mathematically as:'),
          ],
          formula: '(Amount of invested underrepresented capital / amount of capital invested) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      notes: [pWithBib('The scoring rubric is based on current industry demographics for real estate investors', '104', '.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Inclusive Capital',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '5-19% inclusive capital' },
          { _key: k(), pointsLabel: '2 points', criterion: '20-34% inclusive capital' },
          { _key: k(), pointsLabel: '3 points', criterion: '35-49% inclusive capital' },
          { _key: k(), pointsLabel: '4 points', criterion: '50+% inclusive capital' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirements #3 and #4 satisfied' },
          { _key: k(), pointsLabel: '+4 points', criterion: 'Requirement #5 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Evidence of educational and outreach programs conducted, including dates, locations, content, attendance records, feedback or testimonials, and any resulting underrepresented investor engagement.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Documentation of engagement with at least one underrepresented-affiliated institutional investor, including agreements, communications, and investment records.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Description of a program enhancing underrepresented individuals’ access to investment, including objectives, target demographic, evidence of engagement, and outcomes.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Documentation of the functionality (e.g., user manuals or guides) and accessibility (e.g., user testimonials) of investment platforms utilized or developed, including user testimonials where available.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Legal documents outlining the community ownership model, including the rights and protections for underrepresented shareholders.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Investment records showing the amount of capital invested by local community investors and other underrepresented investors.')] },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-un-sdg-10' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa4.1')

  // ─── SJa4.2 Debt capital ────────────────────────────────────────────────
  console.log('\nSeeding SJa4.2...')
  await client.createOrReplace({
    _id: 'activity-SJa4-2', _type: 'activity',
    activityId: 'SJa4.2',
    title: 'Achieve equity and inclusion in securing debt capital',
    slug: { _type: 'slug', current: 'sja4-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ04' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_BI_ONLY,
    scope: [
      p('The Owner shall set and implement inclusive debt capital principles, defined in Requirements, to promote the inclusion of minoritized banking institutions (MBI), including but not limited to people of color and women, as lenders in commercial real estate projects. The scope includes setting and implementing these principles but does not extend to assessing their effectiveness.'),
      p('Note: If projects in rating systems other than B+I: Developer and B+I: Occupier are seeking external debt or capital to fund the project, this Activity shall apply, and points can be pursued to achieve certification.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Establish a relationship with at least two MBIs for sourcing debt capital for the project through construction loans, project financing, and/or lines of credit.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Establish operating accounts with an MBI, increasing their stable source of deposits.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Prominently feature MBI partnership in marketing and communications to raise their public profile.')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Introduce MBI to networks of real estate investors, developers, and property managers to grow relationships.')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Refer Tenants to the MBI for their banking needs.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p("The performance indicator is the percentage of MBI debt capital on the project. The first context indicator is the project's total debt capital secured from MBI. The second context indicator is the total deposit amount placed with the MBI. The third context indicator is the total number of tenant referrals sent to MBI. The fourth context indicator is the total number of referrals to commercial real estate network contacts."),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [p('The performance indicator can be calculated as follows:')],
          formula: '(Amount of debt capital sourced from MBI / amount of project debt capital) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      notes: [
        p('These benchmarks aim to significantly stretch participation for impact while still recognizing most MBIs have balance sheet and regulatory constraints from playing an oversized role, especially on more significant transactions. But meaningful participation should be the goal to expand minoritized banking institutions while prudently managing scale realities.'),
        pWithBib('The scoring rubric is based on current industry demographics for real estate investors', '105', ' as a proxy due to lack of an established industry standard for debt capital benchmarks.'),
      ],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of MBI Debt Capital',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50-69% of MBI financing target' },
          { _key: k(), pointsLabel: '3 points', criterion: '70-84% of MBI financing target' },
          { _key: k(), pointsLabel: '5 points', criterion: '85-99% of MBI financing target' },
          { _key: k(), pointsLabel: '7 points', criterion: '100% of MBI financing target' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #3 satisfied' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #4 satisfied' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #5 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationLeadIn: [
      p('Benchmark targets'),
    ],
    documentationTemplates: [
      {
        _type: 'documentationTemplate', _key: k(),
        title: 'Benchmark targets',
        columns: ['Project size', 'Project cost', 'MBI financing target*'],
        exampleRows: [
          { _key: k(), cells: ['Small project', 'Under $10 million', '20%'] },
          { _key: k(), cells: ['Smaller mid-size project', '$10 - $25 million', '15%'] },
          { _key: k(), cells: ['Larger mid-size project', '$25 - $50 million', '10%'] },
          { _key: k(), cells: ['Large project', '$50 - $500 million', '5%'] },
          { _key: k(), cells: ['Major development', '$500 million or more', '2%'] },
        ],
        footnote: '*In markets with a limited or nascent minoritized banking sector, the more conservative targets of 2% or 5% may apply with complete and detailed explanation for the lowered target.',
      },
    ],
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Documentation of engagement with at least two MBIs, including loan agreements, communications, and records.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Evidence of operating accounts with an MBI, including account records, statements, and evidence of deposit amounts.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Copies of marketing and communications featuring MBI partnership, along with evidence and dates of publication.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Documentation of introduction of MBI to networks of real estate investors, developers, and/or property managers.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation of referral of MBI to Tenants.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Complete and detailed explanation for utilizing a lowered MBI financing target due to a limited or nascent minoritized banking sector (if applicable).')] },
    ],
    definitions: [
      { _key: k(), term: 'Minoritized banking institution', body: [p('any depository institution where 51% or more of the stock is owned by one or more socially and economically disadvantaged individuals.')] },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-un-sdg-10' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa4.2')
}

run().catch((err) => { console.error(err); process.exit(1) })
