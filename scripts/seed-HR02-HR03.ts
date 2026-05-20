/**
 * Seeds Objectives HR02 (Ethical Suppliers Procurement, 7 activities) + HR03
 * (Human Rights Reporting, 2 activities).
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
const li = (text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level,
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

const RATING_ALL: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
}

const RATING_BI_OM_D: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: false, om_developer: true, om_occupier: false, cd: false,
}

// Living wage docs reused across HRa2.1/HRa2.3/HRa2.5
const livingWageDocs = (subjectWorker: string) => [
  { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
  { _type: 'documentationItem', _key: k(), number: 2, body: [p('Third-party living wage audit report, confirming wage compliance without disclosing employee data, detailing data collection methods, and calculating living wage gaps.')] },
  { _type: 'documentationItem', _key: k(), number: 3, body: [p(`Methodology for determining and categorizing the number of project ${subjectWorker}.`)] },
  { _type: 'documentationItem', _key: k(), number: 4, body: [p('Methodology for identifying sites requiring unique living cost assessments.')] },
  { _type: 'documentationItem', _key: k(), number: 5, body: [p('Data sources used for determining living wage thresholds, with reasoning for final choices.')] },
  { _type: 'documentationItem', _key: k(), number: 6, body: [p('Analysis documentation if living wage and cost data are outdated, assessing the relevancy of figures.')] },
  { _type: 'documentationItem', _key: k(), number: 7, body: [p('Document the approach (if applicable) used to determine whether additional region-specific costs of living should be incorporated into the assessment, including any formal parameters used to decide if an identified item qualifies for inclusion.')] },
]

const livingWageGuidance = () => [
  {
    _type: 'guidanceSubsection', _key: k(), heading: 'Living wage threshold',
    body: [
      p('The Global Living Wage Coalition (GLWC) is recognized as a global leader in creating high quality, detailed, and transparent estimates of living wage that are both normative and specific. They utilize the Anker methodology as the basis for consistent and objective information about living wages and wage gaps. Since the GLWC doesn’t produce living wages in all countries and regions, it is acceptable to use other credible third-party information provided it is current and follows guidance in ‘Minimum requirements in a living wage calculation’ in the next section. The GLWC methodology provides living wages for a family. Other third-party data should specify whether it is for a single individual or a family. International best practice is to use the family wage.'),
    ],
  },
  {
    _type: 'guidanceSubsection', _key: k(), heading: 'Minimum requirements in a living wage calculation',
    body: [
      p('It is not likely that a regional living wage would not be available to use as a guideline for meeting the requirements. The Additional Resources below serve to determine living wage but are not the only sources available. Should other sources be used, verification shall include the method used to determine living wage.'),
      p('Should no data be available after an exhaustive search, the following criteria can be used to manually calculate a living wage. This requirement is based on methodology from the GLWC to calculate a living wage. The minimum expenses to be included in addressing basic needs are:'),
      li('A low cost, nutritious diet meeting WHO recommendations for calories, macro- and micronutrients, consistent with local food preferences.'),
      li('Potable water for consumption and sanitary / hygienic purposes.'),
      li('Clothing costs, as regionally appropriate.'),
      li('Transportation needs, as regionally appropriate.'),
      li('Costs of any other regionally relevant basic needs identified, if applicable.'),
      li('Education fees for the workers’ children.'),
      li('Decent housing, as defined by UN-HABITAT and applicable regional standards for decent housing.'),
      li('Healthcare needs.'),
      li('A provision for unexpected events.'),
      p('In addition to covering the above expense types, the calculation should include consideration of the following contexts:'),
      li('A clear statement of the area it is meant to apply to.'),
      li('The time period that it is calculated for.'),
      li('If the living wage is being calculated for anything other than the reporting period, an explanation must be provided as to why the figure being used is appropriate.'),
      p('In accordance with the Global Living Wage Coalition methodology, a company should exclude the following:'),
      li('Overtime pay, because a living wage must be earned in standard working hours.'),
      li('Productivity bonuses and allowances unless they are guaranteed.'),
    ],
  },
  {
    _type: 'guidanceSubsection', _key: k(), heading: 'Identifying wage levels of employees',
    body: [
      p('Employees’ wages shall be calculated using net or "take-home" pay, rather than gross pay for comparison to the living wage for each region. If employees receive benefits that assist them in meeting basic needs, such as health insurance, those amounts should be considered supplements toward the net pay amount.'),
      p('Additional Resources'),
      li('The Global Living Wage Coalition – 44 countries living wage data using the Anker Method along with Living Income Reference Values'),
      li('The Living Wage Foundation – UK and London-specific living wage estimates'),
      li('Living Wage Calculator – living wage data for the United States developed and maintained by MIT'),
      li('Living Wage for US - living wage data for the United States using a hybrid Anker Method'),
    ],
  },
]

// Six decent-work requirements reused across HRa2.2/HRa2.4/HRa2.6
const decentWorkReqs = (subject: 'Owner' | 'Supplier' | 'Tenant', leadText: string, bibStart: number) => [
  {
    _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
    items: [
      {
        _type: 'requirementItem', _key: k(), number: 1,
        body: [pWithBib(`${subject === 'Owner' ? 'No child labor' : subject + ' shall not use child labor'}`, String(bibStart), '')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('Adherence to ILO Convention no. 138 for minimum working age')] },
          { _key: k(), letter: 'b', body: [p('Restriction on child presence in production work areas')] },
          { _key: k(), letter: 'c', body: [p('No acceptance of fraudulent identification during the recruitment')] },
          { _key: k(), letter: 'd', body: [p('Maintenance of verifiable proof of age documentation')] },
        ],
      },
      {
        _type: 'requirementItem', _key: k(), number: 2,
        body: [pWithBib(`${subject === 'Owner' ? 'No forced or compulsory labor' : subject + ' shall not use forced or compulsory labor'}`, String(bibStart + 1), '')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('No unreasonable restraints on personnel’s freedom of movement, including movement in the cafeteria, during breaks, and related to toilet use, access to water, access to necessary medical attention or access to religious facilities')] },
          { _key: k(), letter: 'b', body: [p('Security measures implemented by the organization do not intimidate or unduly restrict the movement of workers')] },
          { _key: k(), letter: 'c', body: [p('Terms of employment outlined at the time of recruitment do not differ in any way from the terms offered during the course employment')] },
          { _key: k(), letter: 'd', body: [p('Personnel are free from pressure, coercion, or threats that would in any way force them to accept a job or maintain employment')] },
        ],
      },
      {
        _type: 'requirementItem', _key: k(), number: 3,
        body: [pWithBib(`${subject === 'Supplier' ? 'Supplier shall support freedom of association' : 'Freedom of association'}`, String(bibStart + 2), ' (unless it is unlawful in the jurisdiction, in which case is not applicable)')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('The organization does not propose or initiate worker elections or show bias towards any specific type of worker organization or to workers from any specific organization')] },
          { _key: k(), letter: 'b', body: [p('Workers indicate that worker organizations have had the opportunity to present to the workforce, are allowed regular and reasonably free access to workers during free time, and are permitted to post notices in conspicuous and agreed-upon places')] },
          { _key: k(), letter: 'c', body: [p('All provisions of collective agreements are honored')] },
          { _key: k(), letter: 'd', body: [p('The organization is open to dialogue with trade unions and demonstrates good faith in bargaining with trade unions')] },
        ],
      },
      {
        _type: 'requirementItem', _key: k(), number: 4,
        body: [pWithBib(`${subject === 'Supplier' ? 'Supplier shall provide decent working time for workers' : 'Decent working time'}`, String(bibStart + 3), '')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('Reasonable steps are taken to inform workers about the nature and expected duration of extraordinary business circumstances that may necessitate longer working hours with sufficient advance warning to allow workers to accommodate this situation')] },
          { _key: k(), letter: 'b', body: [p('All overtime hours are voluntary; coercion, threats, or penalties are not used to pressure personnel into overtime work')] },
          { _key: k(), letter: 'c', body: [p('Timecards, attendance sheets, or an equivalent are used to measure actual working hours and break times for all workers, regardless of whether they are paid by hour, piece rate, job, or other form, and includes in and out times at the start and end of each day')] },
          { _key: k(), letter: 'd', body: [p('If attendance sheets are used, they include workers’ signatures or thumbprints to confirm (on at least a weekly basis) the accuracy and completeness of the attendance sheets, which are maintained for at least one year')] },
          { _key: k(), letter: 'e', body: [p('Workers maintain their own time records; for example, they punch in and out themselves')] },
        ],
      },
    ],
  },
  {
    _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
    items: [
      {
        _type: 'requirementItem', _key: k(), number: 5,
        body: [pWithBib(`${subject === 'Supplier' ? 'Supplier shall provide holiday leave for workers' : 'Holiday'}`, String(bibStart + 4), ':')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('The employee has the right to annual paid leave of at least three working weeks for one year of service, during which they receive at least their normal or average remuneration for the corresponding period. People in their first year of employment are entitled to holiday with pay, proportional to their length of service during that year.')] },
          { _key: k(), letter: 'b', body: [p('The employee has the right to take at least one unpaid rest day for every six consecutive days worked.')] },
        ],
      },
    ],
  },
  {
    _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
    items: [
      {
        _type: 'requirementItem', _key: k(), number: 6,
        body: [pWithBib(`${subject === 'Supplier' ? 'Supplier shall provide maternity, paternity, and parental leave for workers' : 'Maternity, paternity, and parental leave'}`, String(bibStart + 5), ': The Owner must comply with national labor laws or widely adopted standards, but as a minimum the employee, regardless of gender, has the right to:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('A minimum of 14 weeks of paid maternity or paternity leave; and')] },
          { _key: k(), letter: 'b', body: [p('Parental leave during a period following the expiry of maternity or paternity leave*.')] },
        ],
      },
    ],
  },
]

const decentWorkDocs = () => [
  { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
  { _type: 'documentationItem', _key: k(), number: 2, body: [p('Methodology determining and categorizing the number of project employees.')] },
  { _type: 'documentationItem', _key: k(), number: 3, body: [p('Documentation of company policies and employee handbook (or equivalent) regarding child labor, forced labor, freedom of association, work hours, overtime compensation, parental leave, and supplementary benefits.')] },
  { _type: 'documentationItem', _key: k(), number: 4, body: [p("Detailed description of the company's age verification process and a statistical summary of workforce age distribution (GDPR compliant).")] },
  { _type: 'documentationItem', _key: k(), number: 5, body: [p('Description of time-tracking and verification methods and aggregated data on regular hours and overtime hours (GDPR compliant).')] },
  { _type: 'documentationItem', _key: k(), number: 6, body: [p('Anonymized statistics on leave utilization.')] },
  { _type: 'documentationItem', _key: k(), number: 7, body: [p('Methodology assessing unique employment terms across different sites, regions, and job types (if applicable).')] },
]

const decentWorkRefSources = () => [
  { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-uncrc-1989' } },
  { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c138' } },
  { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
  { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
  { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-sa8000-2014' } },
]

async function run() {
  // ─── Objectives HR02 + HR03 ─────────────────────────────────────────────
  console.log('Patching Objective HR02...')
  await client.patch('objective-HR02').set({
    headlineGoal: 'Protect, promote, and advance human rights in the labor supply chain to decrease labor exploitation, forced labor, and modern slavery.',
    narrative: [
      pWithBib('Design for Freedom by Grace Farms states, “Systemic change within the construction sector is difficult because of its very nature. In the U.S. alone, 75% of construction firms are owned and operated by one individual with no payroll, working either as freelance contractors or reliant on subcontractors for additional labor. The layers of subcontractors and middlemen along the supply chain add to the opacity. But the use of big data and other innovative technology can drive slave-free building', '132', '.”'),
      p("Ethical Suppliers Procurement focuses on the network of relationships within the commercial real estate industry, emphasizing the critical role of labor rights. According to the International Labour Organization (ILO), over 25 million people are subjected to forced labor globally, with a significant portion involved in construction-related activities. This Objective approaches human rights holistically, recognizing that a project's impact extends beyond its immediate boundaries and the complexities inherent in the construction industry."),
      p("To effect meaningful change, we have to focus attention past the project Owner to their entire network, including Suppliers, as far down the supply chain as possible. Owners and Suppliers actively promoting fair wages that reflect the actual value of labor, ensuring working conditions that respect the dignity and safety of every worker, and being vigilant in identifying and rectifying deviations from these standards is the way to elevate the entire industry's ethical standards, so that every impacted party, regardless of their role, contributes to a more just and equitable construction ecosystem."),
    ],
  }).commit()

  console.log('Patching Objective HR03...')
  await client.patch('objective-HR03').set({
    headlineGoal: 'Ensure transparency and accountability in addressing and communicating human rights impacts to increase identification and rectification of systemic issues.',
    narrative: [
      p("Human Rights Reporting and Evaluation addresses the necessity of transparency and accountability in upholding human rights standards within the commercial real estate industry. Effective communication about human rights impacts demonstrates a project's commitment to ethical practices and educates impacted parties and the broader public on the measures taken to address potential violations."),
      p('By establishing a grievance mechanism, the project provides a direct channel for individuals to report human rights infringements. This mechanism serves as both a tool for redress for those affected and a means for the enterprise to continually evaluate and improve its human rights practices.'),
      p("Together, these activities emphasize the project's dedication to maintaining a proactive stance on human rights, ensuring that violations are addressed and prevented in the future."),
    ],
  }).commit()

  console.log('Seeding editorial notes xxviii–xxxiv + master bibs...')
  const noteBodies: Record<string, string> = {
    'note-xxviii': 'This satisfies the Transformative Disclosure requirements of the UNRISD Sustainable Development Performance Indicators 2022, Tier 2: B. Socioeconomic area, II.B.4 Living wage gap.',
    'note-xxix':  'This satisfies the Transformative Disclosure requirements of the UNRISD Sustainable Development Performance Indicators 2022, Tier 2: B. Socioeconomic area, II.B.4 Living wage gap.',
    'note-xxx':   'This satisfies the Transformative Disclosure requirements of the UNRISD Sustainable Development Performance Indicators 2022, Tier 2: B. Socioeconomic area, II.B.4 Living wage gap.',
    'note-xxxi':  'A responsible Owner should aim to fulfill all these requirements, not just one. These actions are interconnected and together form a comprehensive response. The goal is to fully address and redress the harm done, hold those responsible accountable, and prevent such abuses from happening again in the future.',
    'note-xxxii': 'Such as discrimination, harassment, unsafe working conditions, labor violations, etc.',
    'note-xxxiii':'If your workforce is diverse and includes employees who speak different languages, provide translations of the grievance mechanism information, and ensure that language support is available to assist workers in understanding and accessing the mechanism.',
    'note-xxxiv': 'CAO is the independent accountability mechanism for the International Finance Corporation (IFC) and Multilateral Investment Guarantee Agency (MIGA), the private sector members of the World Bank Group. CAO reports directly to the President of the World Bank Group, and its mandate is to assist in addressing complaints from people affected by IFC/MIGA-supported projects in a manner that is fair, objective, and constructive, and to enhance the social and environmental outcomes of those projects.',
  }
  let order = 28
  for (const [id, body] of Object.entries(noteBodies)) {
    const marker = id.replace('note-', '')
    await client.createOrReplace({ _id: id, _type: 'editorialNote', marker, order: order++, body: [p(body)] })
  }
  await client.createOrReplace({
    _id: 'bib-iaia-sia-master2', _type: 'bibliographyEntry',
    citation: 'International Association for Impact Assessment, Social Impact Assessment: Guidance for assessing and managing the social impacts of projects',
  })
  await client.createOrReplace({
    _id: 'bib-udhr-art19', _type: 'bibliographyEntry',
    citation: 'Universal Declaration of Human Rights (1948), Article 19',
  })
  await client.createOrReplace({
    _id: 'bib-danish-hrcat-contractors', _type: 'bibliographyEntry',
    citation: 'Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain (2016)',
  })

  // ─── HRa2.1 Owner living wage (pass/fail) ───────────────────────────────
  console.log('\nSeeding HRa2.1...')
  await client.createOrReplace({
    _id: 'activity-HRa2-1', _type: 'activity',
    activityId: 'HRa2.1', title: 'Owner shall provide a living wage',
    slug: { _type: 'slug', current: 'hra2-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall ensure that all employees assigned to the project are paid a wage that, at minimum, meets the living wage standard of their respective region, enabling them to cover basic needs and provide some disposable income.')],
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [{ _type: 'requirementItem', _key: k(), number: 1, body: [p('Each employee assigned to the project shall be paid a wage equal to or greater than the living wage for their respective region (see Guidance below).')] }],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of Owner employees earning a living wage. The first context indicator is the total number of Owner employees working on the project. The second context indicator is the gap between the actual wages of workers on the project and the living wage, reporting in the aggregate.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the living wage for the region', 'number', 1),
            li('Identify the wages being paid to each employee', 'number', 1),
            li('Determine if wages of each employee meet or exceed the living wage', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (EL / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of employees earning a living wage' },
            { symbol: 'EL', meaning: 'number of employees earning at least a living wage' },
            { symbol: 'N', meaning: 'total number of employees working on the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Points assignment',
        bands: [{ _key: k(), pointsLabel: 'REQUIREMENT SATISFIED', criterion: 'if P = 100%' }],
      },
    },
    documentationItems: livingWageDocs('workers'),
    guidance: livingWageGuidance(),
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.1')

  // ─── HRa2.2 Owner decent work ───────────────────────────────────────────
  console.log('\nSeeding HRa2.2...')
  await client.createOrReplace({
    _id: 'activity-HRa2-2', _type: 'activity',
    activityId: 'HRa2.2', title: 'Owner shall ensure decent work conditions',
    slug: { _type: 'slug', current: 'hra2-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall ensure that employment contracts for all assigned employees provide basic protections, freedoms, and rights, in alignment with the principles of decent work. This includes prohibiting child and forced labor, assurance of freedom of association, fair working hours, and provision for leave periods.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-139' },
    requirementsNotes: [p('The following six elements must be embedded in employment contracts to qualify as decent work:')],
    requirements: decentWorkReqs('Owner', 'employment contracts', 140),
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the progress toward ensuring decent work for each Owner employee according to the requirements. The first context indicator is the total number of Owner employees working on the project. The second context indicator is the total number of Owner employees for which the progress score is 100%, which is used to assess impact.'),
        p('Assess decent work for employees according to the requirements as follows:'),
        li('0%: Any employee whose employment terms have not been assessed and any employee whose employment terms do not comply with requirements #1 and #2.'),
        li('20%: Requirements #1 and #2 are satisfied.'),
        li('40%: One additional requirement from #3 or #4 is satisfied.'),
        li('60%: Both #3 and #4 requirements are satisfied.'),
        li('80%: Three additional requirements are satisfied.'),
        li('100%: All additional requirements are satisfied.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine total number of employees on the project.', 'number', 1),
            li('Calculate progress as the weighted average of the employment terms across all employees.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = 0(E0%) + 0.2(E20%) + 0.4(E40%) + 0.6(E60%) + 0.8(E80%) + 1(E100%) / N X 100',
          variables: [
            { symbol: 'P', meaning: 'percentage progress toward decent work' },
            { symbol: 'Ex%', meaning: 'number of employees on the project for which the progress score is x%' },
            { symbol: 'N', meaning: 'total number of employees working on the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The threshold for the REQUIREMENT of do no harm is 60% progress toward decent work. Since this Activity is a REQUIREMENT for a SEAM Certification, no points are awarded towards the final points total for achieving this percentage.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Progress Toward Decent Work',
        bands: [
          { _key: k(), pointsLabel: 'REQUIREMENT MET', criterion: '60% progress toward decent work' },
          { _key: k(), pointsLabel: '+1 point', criterion: '80% progress toward decent work' },
          { _key: k(), pointsLabel: '+2 points', criterion: '100% progress toward decent work' },
        ],
      },
    },
    documentationItems: decentWorkDocs(),
    referencedSources: decentWorkRefSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.2')

  // ─── HRa2.3 Suppliers living wage ───────────────────────────────────────
  console.log('\nSeeding HRa2.3...')
  await client.createOrReplace({
    _id: 'activity-HRa2-3', _type: 'activity',
    activityId: 'HRa2.3', title: 'Suppliers shall provide a living wage',
    slug: { _type: 'slug', current: 'hra2-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('Suppliers shall ensure that all employees assigned to the project are paid a wage that, at minimum, meets the living wage standard of their respective region, enabling them to cover basic needs and provide some disposable income.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-146' },
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [
        { _type: 'requirementItem', _key: k(), number: 1, body: [p('A living wage requirement shall be included in the Owner’s contract terms with Suppliers and vendors.')] },
        { _type: 'requirementItem', _key: k(), number: 2, body: [p('Assessment of Suppliers’ ability to comply with the living wage requirement during qualification and proposal stages prior to selection of new suppliers and vendors.')] },
        { _type: 'requirementItem', _key: k(), number: 3, body: [p('Regular monitoring of Suppliers’ compliance through self-assessments, verified through third-party evaluations during the period of review.')] },
      ],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of Tier 1 workers earning a living wage. The first context indicator is the total number of Supplier workers working on the project. The second context indicator is the gap between the actual wages of Supplier workers on the project and the living wage reporting in the aggregate.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the living wage for the region', 'number', 1),
            li('Identify the wages being paid to each worker', 'number', 1),
            li("Determine if each worker's wages meet or exceed the living wage.", 'number', 1),
            li('Calculate the percentage of workers earning a living wage across all Tier 1 Suppliers', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (ELS1 + ELS2 + ELS3 + … / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of workers earning a living wage' },
            { symbol: 'ELS#', meaning: 'number of workers earning at least a living wage for each Supplier' },
            { symbol: 'N', meaning: 'total number of Supplier workers working on the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The do no harm threshold requires all workers to earn a living wage.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Tier 1 Workers Earning a Living Wage',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% of Tier 1 workers earning a living wage' },
          { _key: k(), pointsLabel: '2 points', criterion: '40% of Tier 1 workers earning a living wage' },
          { _key: k(), pointsLabel: '3 points', criterion: '60% of Tier 1 workers earning a living wage' },
          { _key: k(), pointsLabel: '4 points', criterion: '80% of Tier 1 workers earning a living wage' },
          { _key: k(), pointsLabel: '5 points', criterion: '100% of Tier 1 workers earning a living wage' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: '60% Tier 2 workers earning a living wage' },
          { _key: k(), pointsLabel: '+3 points', criterion: '60% Tier 3 workers earning a living wage' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: livingWageDocs('workers'),
    guidance: livingWageGuidance(),
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.3')

  // ─── HRa2.4 Suppliers decent work ───────────────────────────────────────
  console.log('\nSeeding HRa2.4...')
  await client.createOrReplace({
    _id: 'activity-HRa2-4', _type: 'activity',
    activityId: 'HRa2.4', title: 'Suppliers shall ensure decent work conditions',
    slug: { _type: 'slug', current: 'hra2-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('Suppliers shall ensure that all employment contracts provide workers basic protections, freedoms, and rights. Suppliers must ensure no child or forced labor is utilized, workers have freedom of association, fair working hours, as well as provide for periods of leave from employment.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-153' },
    requirementsNotes: [p('The following six elements must be embedded in Owner’s contract terms with Suppliers, along with assessment of Suppliers’ ability to comply during procurement of new Suppliers, to qualify as decent work:')],
    requirements: decentWorkReqs('Supplier', 'contract terms with Suppliers', 154),
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the progress toward providing decent work for each Supplier worker according to the requirements. The first context indicator is the total number of Supplier workers on the project. The second context indicator is the number of Supplier workers for which the progress score is 100%.'),
        p('Assess decent work for workers according to the requirements as follows:'),
        li('0%: Any worker whose employment terms haven’t been assessed or don’t comply with requirements 1 + 2.'),
        li('20%: Requirements #1 and #2 are satisfied.'),
        li('40%: One additional requirement from #3 or #4 is satisfied.'),
        li('60%: Both #3 and #4 requirements are satisfied.'),
        li('80%: Three additional requirements are satisfied.'),
        li('100%: All additional requirements are satisfied.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine the number of workers on the project for each Supplier.', 'number', 1),
              li('Calculate progress as the weighted average of the employment terms across all workers for each Supplier.', 'number', 1),
              li('Calculate the average percentage progress toward decent work for all Tier 1 Suppliers.', 'number', 1),
              p('Step 1'),
            ],
            formula: 'p# = 0(E0%) + 0.2(E20%) + 0.4(E40%) + 0.6(E60%) + 0.8(E80%) + 1(E100%) / n# X 100',
            variables: [
              { symbol: 'p#', meaning: 'percentage progress toward decent work for a Supplier' },
              { symbol: 'Ex%', meaning: 'number of workers on the project for which the progress score is x%' },
              { symbol: 'n#', meaning: 'total number of workers working on the project for respective Supplier' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2')],
            formula: 'P = (p1% + p2% + p3% ... / N)',
            variables: [
              { symbol: 'P', meaning: 'average percentage progress toward decent work across all Tier 1 Suppliers' },
              { symbol: 'p#%', meaning: 'vendor percentage progress towards objective' },
              { symbol: 'N', meaning: 'total number of vendors' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The threshold for do no harm is 60% progress toward decent work.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Progress Toward Decent Work',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% progress toward decent work' },
          { _key: k(), pointsLabel: '2 points', criterion: '40% progress toward decent work' },
          { _key: k(), pointsLabel: '3 points', criterion: '60% progress toward decent work' },
          { _key: k(), pointsLabel: '4 points', criterion: '80% progress toward decent work' },
          { _key: k(), pointsLabel: '5 points', criterion: '100% progress toward decent work' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+3 points', criterion: 'Tier 2 vendors achieving 60% progress' },
          { _key: k(), pointsLabel: '+5 points', criterion: 'Tier 2 and Tier 3 vendors achieving 60% progress' },
        ],
      },
      additionalPointsLogic: 'or',
    },
    documentationItems: decentWorkDocs(),
    referencedSources: decentWorkRefSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.4')

  // ─── HRa2.5 Tenants living wage ─────────────────────────────────────────
  console.log('\nSeeding HRa2.5...')
  await client.createOrReplace({
    _id: 'activity-HRa2-5', _type: 'activity',
    activityId: 'HRa2.5', title: 'Tenants shall provide a living wage',
    slug: { _type: 'slug', current: 'hra2-5' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_BI_OM_D,
    scope: [p('Tenants shall ensure that all employees located at the project are paid a wage that, at minimum, meets the living wage standard of their respective region, enabling them to cover basic needs and provide some disposable income. This activity covers the inclusion of a living wage provision in signed lease agreements but does not extend to verifying, validating, or monitoring tenant compliance with this provision.')],
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [{ _type: 'requirementItem', _key: k(), number: 1, body: [p('A living wage requirement shall be included in the Owner’s lease terms with Tenants.')] }],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of Tenant employees earning a living wage. The first context indicator is the number of Tenant employees working at the project. The second context indicator is the gap between the actual wages of Tenant employees and the living wage reporting in the aggregate.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the living wage for the region', 'number', 1),
            li('Identify the wages being paid to each employee', 'number', 1),
            li('Determine if wages of each Tenant’s employee meet or exceed than the living wage', 'number', 1),
            li('Calculate the overall percentage of Tenant employees earning a living wage', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (ELT1 + ELT2 + ELT3 + … / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of Tenant employees earning a living wage' },
            { symbol: 'ELT#', meaning: 'number of Tenant employees earning a living wage' },
            { symbol: 'N', meaning: 'total number of Tenant employees on the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The threshold for do no harm is all employees must earn a living wage.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Tenant Employees Earning a Living Wage',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% of Tenant employees earning a living wage' },
          { _key: k(), pointsLabel: '2 points', criterion: '40% of Tenant employees earning a living wage' },
          { _key: k(), pointsLabel: '3 points', criterion: '60% of Tenant employees earning a living wage' },
          { _key: k(), pointsLabel: '4 points', criterion: '80% of Tenant employees earning a living wage' },
          { _key: k(), pointsLabel: '5 points', criterion: '100% of Tenant employees earning a living wage' },
        ],
      },
    },
    documentationItems: livingWageDocs('workers'),
    guidance: livingWageGuidance(),
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.5')

  // ─── HRa2.6 Tenants decent work ─────────────────────────────────────────
  console.log('\nSeeding HRa2.6...')
  await client.createOrReplace({
    _id: 'activity-HRa2-6', _type: 'activity',
    activityId: 'HRa2.6', title: 'Tenants shall ensure decent work conditions',
    slug: { _type: 'slug', current: 'hra2-6' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_BI_OM_D,
    scope: [p('Tenants shall ensure that all employment contracts provide employees basic protections, freedoms, and rights. Tenants must ensure no child or forced labor is utilized, employees have freedom of association, fair working hours, as well as provide for periods of leave from employment. This activity covers the inclusion of decent work provisions in signed lease agreements but does not extend to verifying, validating, or monitoring tenant compliance with this provision.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-166' },
    requirementsNotes: [p('The following six elements must be embedded in employment contracts to qualify as decent work:')],
    requirements: decentWorkReqs('Owner', 'employment contracts', 167),
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the progress toward providing decent work for each Tenant employee according to the requirements. The first context indicator is the total number of Tenant employees working on the project. The second context indicator is the total number of Tenant employees for which the progress score is 100% (used to track impact).'),
        p('Assess decent work for employees according to the requirements as follows:'),
        li('0%: Any employee whose employment terms have not been assessed, and any employee whose employment terms do not comply with requirements #1 and #2.'),
        li('20%: Requirements #1 and #2 are satisfied.'),
        li('40%: One additional requirement from #3 or #4 is satisfied.'),
        li('60%: Both #3 and #4 requirements are satisfied.'),
        li('80%: Three additional requirements are satisfied.'),
        li('100%: All additional requirements are satisfied.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine number of Tenant employees on the project for each Tenant.', 'number', 1),
              li('Calculate progress as the weighted average of the employment terms across all workers for each Tenant.', 'number', 1),
              li('Calculate the average percentage progress toward decent work for all Tenants.', 'number', 1),
              p('Step 1'),
            ],
            formula: 'p# = 0(E0%) + 0.2(E20%) + 0.4(E40%) + 0.6(E60%) + 0.8(E80%) + 1(E100%) / n# X 100',
            variables: [
              { symbol: 'p#', meaning: 'percentage progress toward decent work for a Tenant' },
              { symbol: 'Ex%', meaning: 'number of employees on the project for which the progress score is x%' },
              { symbol: 'n#', meaning: 'total number of employees working on the project for respective Tenant' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2')],
            formula: 'P = (p1% + p2% + p3% ... / N)',
            variables: [
              { symbol: 'P', meaning: 'average percentage progress toward decent work across all Tenants' },
              { symbol: 'p#%', meaning: 'Tenant percentage progress towards objective' },
              { symbol: 'N', meaning: 'total number of Tenants' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The threshold for do no harm is 60% progress toward decent work.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Progress Toward Decent Work',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% progress toward decent work' },
          { _key: k(), pointsLabel: '2 points', criterion: '40% progress toward decent work' },
          { _key: k(), pointsLabel: '3 points', criterion: '60% progress toward decent work' },
          { _key: k(), pointsLabel: '4 points', criterion: '80% progress toward decent work' },
          { _key: k(), pointsLabel: '5 points', criterion: '100% progress toward decent work' },
        ],
      },
    },
    documentationItems: decentWorkDocs(),
    referencedSources: decentWorkRefSources(),
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.6')

  // ─── HRa2.7 Owner remediate Supplier procurement impacts ────────────────
  console.log('\nSeeding HRa2.7...')
  await client.createOrReplace({
    _id: 'activity-HRa2-7', _type: 'activity',
    activityId: 'HRa2.7', title: 'Owner shall remediate Supplier procurement negative impacts to human rights',
    slug: { _type: 'slug', current: 'hra2-7' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall provide for or cooperate in the remediation of negative human rights impacts during Supplier procurement where the Project caused, contributed, or is linked to that could not be prevented or mitigated through defined actionable steps. The aim is to neutralize past negative effects through remediation and restoration, not just halting future negative impacts. This activity is confined to the project and not the broader organizational operations.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-173' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Identification of Owner level of attribution as caused, contributed, or linked (see Guidance below).')] },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Corrective actions for each negative impact according to the level of attribution.')],
            subItems: [
              { _key: k(), letter: 'a', body: [
                p('Projects/properties that have directly caused negative impacts shall take the following actions for remediation:'),
                p('i. Immediate Cessation: Cease the actions causing the negative impacts immediately. If possible, reverse the abusive activity.'),
                p('ii. Compensation: Provide compensation to the affected individuals or communities for losses suffered. This can include, but is not limited to, financial reimbursement, psychological support, medical care, and payment of backpay (in wage and hour violations).'),
                p('iii. Accountability: Hold accountable those individuals within the organization responsible for the negative impacts. This could involve disciplinary action, dismissal, or in extreme cases, referral to legal authorities for potential criminal charges.'),
                p('iv. Preventative Measures: Implement strategies, policies, and procedures to prevent recurrence, such as due diligence processes, staff training, and regular monitoring and review.'),
              ] },
              { _key: k(), letter: 'b', body: [
                p('Projects/properties that have contributed to negative impacts shall take the following actions for remediation:'),
                p('i. Disengage: Where feasible, cease business relationships with entities causing the negative community impacts.'),
                p('ii. Mitigate: If disengagement is not immediately possible, take steps to mitigate ongoing harm, such as by using influence over the contributing partner to halt or prevent further negative impacts.'),
                p('iii. Remediate: Assist in remediating harm, potentially through joint efforts with other entities. This could involve participating in restoration projects, funding rehabilitation programs, etc.'),
                p("iv. Public Disclosure: Where appropriate, publicly disclose the business's contribution to the negative impacts and the steps it has taken to address it."),
              ] },
              { _key: k(), letter: 'c', body: [
                p('Projects/properties directly linked to negative impacts via their business relationships shall take the following actions for remediation:'),
                p('i. Leverage: Use their influence over business relationships to mitigate or prevent negative impacts.'),
                p('ii. Collaborate: Work with other businesses, governments, or non-governmental organizations to pressure the entity causing the negative impact to reform its practices.'),
                p('iii. Policy Implementation: Implement stricter policies for partners, including contractual clauses that stipulate adherence to standards.'),
                p('iv. Transparency and Reporting: Regularly report on their efforts to address the linked negative impact, which could include internal audits, third-party audits, and public reports.'),
                p('Note: If the above remedies are not successful, consider ending the business relationship.'),
              ] },
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
      performanceIndicator: [p('The performance indicator is the percentage of remediated Suppliers procurement negative impacts. The first context indicator is the total number of affected individuals compensated with the type of compensation received (financial, psychological support, medical care, etc.). The second context indicator is the number of preventative measures, such as policies and procedures designed to prevent recurrence, due diligence processes, staff training programs, etc.')],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine the total number of negative impacts identified during Activity HRa1.2', 'number', 1),
              li('For each negative impact, determine the level of attribution (caused, contributed, linked) and the progress of implemented corrective actions as listed in the Requirements above: 25% for the first action, 50% for the second action, 75% for the third action, or 100% for all four actions (corrective actions under each attribution level in the Requirements are listed in a progressive order so they must be implemented in the order they are listed to achieve progressive percentages of completion).', 'number', 1),
              li('Calculate the weighted remediation percentage for each negative impact by multiplying the level of attribution by the corrective action progress (weights are 1.0 for caused, 0.7 for contributed, 0.5 for linked).', 'number', 1),
              li('Calculate the overall KPI as the average of all the weighted remediation percentages.', 'number', 1),
              p('Step 1: Calculate the Weighted Remediation Percentage for Each Negative Impact'),
            ],
            formula: 'R# = A# x C#',
            variables: [
              { symbol: 'R#', meaning: 'the weighted remediation percentage of # negative impact' },
              { symbol: 'A#', meaning: 'the level of attribution of the # negative impact (1.0 for caused, 0.7 for contributed, 0.5 for linked)' },
              { symbol: 'C#', meaning: 'corrective action progress of the # negative impact (25% for the 1st action, 50% for the 2nd action, 75% for the 3rd action, or 100% for all 4 actions)' },
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
      outcomeThreshold: [p('The target outcome threshold is 100% of negative impacts remediated.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Remediate Impacts',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '40 – 69% remediated impacts' },
          { _key: k(), pointsLabel: '4 points', criterion: '70 - 84% remediated impacts' },
          { _key: k(), pointsLabel: '6 points', criterion: '85 -95% remediated impacts' },
          { _key: k(), pointsLabel: '8 points', criterion: '96 - 99% remediated impacts' },
          { _key: k(), pointsLabel: '10 points', criterion: '100% remediated impacts' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('This is a comprehensive list of all identified negative impacts. It should include details about each impact, such as the nature of the impact, the parties involved, and the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Remediation Action Plans outlining the corrective actions to be taken for each negative impact, based on the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Regular progress reports (if applicable) providing evidence of the implementation of the corrective actions. These should include details of the actions taken, the results achieved, and any challenges encountered. This may not be applicable if the remediation actions are completed in a short timeframe.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('For each negative impact, a completion report should be prepared when all corrective actions have been successfully implemented. This report would provide evidence of the successful remediation of the impact.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('A summary report of all remediation completion reports, providing a count of the total number of negative impacts and the number that have been successfully remediated.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Independent audit reports (if applicable) could provide third-party verification of the successful remediation of the negative impacts. These reports should include a detailed assessment of the effectiveness of the corrective actions and the extent of the remediation. This may not be applicable if an independent audit is not feasible or necessary.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Testimonials or statements from impacted parties (if applicable), including affected communities and other relevant parties, could provide additional evidence of the successful remediation of the negative impacts. This may not be applicable if impacted parties are not available or willing to provide testimonials.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Any legal documents (if applicable) related to the negative impacts, such as court rulings or settlement agreements, could provide further evidence of the level of attribution and the successful remediation of the impacts. This may not be applicable if there are no legal proceedings related to the negative impacts.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Internal records (if applicable), such as meeting minutes, emails, or memos, could provide additional evidence of the actions taken to remediate the negative impacts. This may not be applicable if internal records are not kept or are not relevant to the remediation process.')] },
    ],
    definitions: [
      { _key: k(), term: 'Severe negative impact', body: [p('is one that causes significant and lasting harm to individuals or communities such as serious injury, loss of life, child labor, forced labor, discrimination, and displacement.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On identifying level of Attribution',
        headingFootnote: { _type: 'reference', _ref: 'bib-174' },
        body: [
          p('Where a business enterprise causes or may cause an adverse human rights impact, it should take the necessary steps to cease or prevent the impact. This situation is considered to exist for Tier 1 Suppliers, or those directly hired by the project Owner.'),
          p('Where a business enterprise contributes or may contribute to an adverse human rights impact, it should take the necessary steps to cease or prevent its contribution and use its leverage to mitigate any remaining impact to the greatest extent possible. Leverage is considered to exist where the enterprise has the ability to effect change in the wrongful practices of an entity that causes a harm. This condition exists in Tier 2 Suppliers, or those Suppliers hired by Tier1 directly hired Suppliers.'),
          p('Where a business enterprise has not contributed to an adverse human rights impact, but that impact is nevertheless directly linked to its operations, products, or services by its business relationship with another entity, the situation is more complex. Among the factors that will enter into the determination of the appropriate action in such situations are the enterprise’s leverage over the entity concerned, how crucial the relationship is to the enterprise, the severity of the abuse, and whether terminating the relationship with the entity itself would have adverse human rights consequences. This condition occurs in Tier 3 and beyond where the project Owner has little control or influence over Suppliers or vendors hired at this level in the supply chain.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-uncrc-1989' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c138' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-sa8000-2014' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa2.7')

  // ─── HRa3.1 Communicate externally about human rights impacts ───────────
  console.log('\nSeeding HRa3.1...')
  await client.createOrReplace({
    _id: 'activity-HRa3-1', _type: 'activity',
    activityId: 'HRa3.1', title: 'Communicate externally about human rights impacts and how the Project addresses them',
    slug: { _type: 'slug', current: 'hra3-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall communicate externally how the Project addresses identified negative human rights impacts, particularly when concerns are raised by or on behalf of affected parties. Communication methods may include meetings, public events, forums, reports, newsletters, advertising, videos, podcasts, website pages, press releases, media interviews, editorials, articles, or formal public reports. Demographics of the external audience should guide the choice of delivery methods to effectively inform likely impacted parties.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-175' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('Identification, assessment, and monitoring of risks to and impacts on vulnerable groups related to content and visuals used in the communication so that it shall not pose any risks to affected impacted parties or personnel.')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('A land acknowledgment recognizing the Indigenous peoples and their traditional territories shall be included as part of this requirement.')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Respect for the right to privacy by ensuring the accuracy of sources and respecting the rights of others, and communication shall not impair the rights or dignity of any individual group nor pose a risk to commercial confidentiality:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Communication shall not disclose information that a reasonable person would deem highly offensive and invasive')] },
              { _key: k(), letter: 'b', body: [p('Owner shall obtain written consent before including information about persons or groups in communication')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('The communication shall:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('comprehensively report on the identified high-risk human rights impacts from the Human Rights Due Diligence assessment in Activity HRa1.2 as well as the actions taken to prevent, mitigate (from Activity HRa1.3), or remediate (from Activity HRa1.4) those impacts')] },
              { _key: k(), letter: 'b', body: [p('be complete, meaning that it covers all aspects of these activities and their results, leaving no significant gaps')] },
              { _key: k(), letter: 'c', body: [p('be accurate, meaning that it correctly describes the activities that were carried out and the results that were achieved without any significant errors or omissions')] },
              { _key: k(), letter: 'd', body: [p('be clear, meaning that it is written in a way that is easy for impacted parties to understand, with a logical structure, simple language, and effective use of visuals where appropriate')] },
              { _key: k(), letter: 'e', body: [p('be relevant, meaning that it focuses on the most significant and meaningful aspects of the activities and their results and provides impacted parties with the information they need to understand the social impact of the project')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('The communication is accessible to the intended audience in a format that the intended audience can understand.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of reported human rights impacts. The first context indicator is the number of human rights impacts addressed in external communications. The second context indicator is the total number of identified human rights impacts.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the number of human rights impacts reported,', 'number', 1),
            li('Identify the total number of human rights impacts,', 'number', 1),
            li('Calculate the percentage of reported human rights impacts according to the requirements.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (HRI / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of reported human rights impacts according to the requirements' },
            { symbol: 'HRI', meaning: 'number of human rights impacts reported' },
            { symbol: 'N', meaning: 'total number of human rights impacts' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The target outcome threshold is one hundred percent (100%).')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Reported Human Rights Impacts',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '75% percentage of reported human rights impacts' },
          { _key: k(), pointsLabel: '2 points', criterion: '90% percentage of reported human rights impacts' },
          { _key: k(), pointsLabel: '3 points', criterion: '100% percentage of reported human rights impacts' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A copy of the full content of the communication.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Publication Record including where and when the communication was published. This could include a link to the webpage where the communication is posted, a screenshot of the webpage, or a copy of the publication notice.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Copies of the publication in all the languages in which it was published. This would provide evidence that the publication was made accessible to impacted parties in their native languages.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Records of communication with impacted parties (if applicable) about the publication of the communication. This could include emails, meeting minutes, or other forms of communication that show impacted parties were informed about the publication of the communication.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Guidance on communication reach',
        body: [
          p('There are multiple ways to communicate information and to track reach. Email is an effective communication tool if you have the impacted parties’ email addresses. It is immediately available, easy to customize content, and engagement rates are easy to track. Email also has the added advantage of targeting specific impacted party groups with more certainty. An option to create a mailing list for interested impacted parties on the project website that could be subscribed to is a way to get impacted party contact information. Social media post and website page impressions (how many times the post is displayed) are easily trackable, but harder to ascertain the impacted party group that was reached. In-person and virtual information sessions are highly accurate for targeting specific impacted party groups, easily trackable for number reached, but are most costly and time consuming to execute. Press releases are customizable for content, easily tracked for impressions and unique impressions (the number of times the content was shown to a unique individual), a good way to get a lot of information into one communication method, but can be expensive, and not as accurate in determining which impacted party groups were reached. The method of communication with impacted parties should be designed as part of the Impact Assessment.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Guidance on responsible communication characteristics',
        body: [
          pWithBib('According to ISO 26000:2010, Guidance on social responsibility, information relating to social responsibility should be', '177', ':'),
          li('Complete – address all significant activities and impacts related to social responsibility'),
          li('Understandable – provided with regard for the knowledge and the cultural, social, educational, and economic background of those who will be involved in the communication. Both the language used, and the manner in which the material is presented, including how it is organized, should be accessible for the impacted parties intended to receive the information'),
          li('Responsive – be responsive to impacted party interests'),
          li('Accurate – be factually correct and should provide sufficient detail to be useful and appropriate for its purpose'),
          li("Balanced – be balanced and fair and should not omit relevant negative information concerning the impacts of an organization's activities"),
          li('Timely – out of date information can be misleading. Where information describes activities during a specific period of time, identification of the period of time covered will allow impacted parties to compare the performance of the organization with its earlier performance and with the performance of other organizations; and'),
          li('Accessible – be available to the impacted parties concerned'),
          p('Additional Resources'),
          li('UN Office of the High Commissioner for Human Rights (OHCHR)'),
          li('UN Working Group on Business and Human Rights'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iaia-sia-master2' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000-2021' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art19' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa3.1')

  // ─── HRa3.2 Grievance mechanism (multi-scenario) ────────────────────────
  console.log('\nSeeding HRa3.2...')
  await client.createOrReplace({
    _id: 'activity-HRa3-2', _type: 'activity',
    activityId: 'HRa3.2', title: 'Establish a grievance mechanism for direct reporting of human rights violations to the enterprise',
    slug: { _type: 'slug', current: 'hra3-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR03' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall create a system that enables workers and impacted parties to directly report incidents of human rights violations to the organization. This mechanism serves as a dedicated channel for individuals to express concerns or complaints regarding actions or conditions that infringe upon their fundamental rights. Its purpose is to provide a straightforward and accessible process for reporting and addressing human rights violations for the Project or Property.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-178' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A project-level grievance mechanism that includes the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('There shall be a documented grievance mechanism procedure for how concerns and complaints are received, processed, and settled.')] },
              { _key: k(), letter: 'b', body: [p('The grievance mechanism can be accessed via at least two different access points, ensuring equal and effective access for all workers, including vulnerable groups.')] },
              { _key: k(), letter: 'c', body: [p('The process and procedures of the grievance mechanism shall be clear and transparent, ensuring that workers understand how their complaints will be handled and resolved.')] },
              { _key: k(), letter: 'd', body: [p('The grievance mechanism shall be independent and impartial, free from any undue influence or bias, to ensure fair and objective resolution of complaints.')] },
              { _key: k(), letter: 'e', body: [p("The complainant's confidentiality shall be respected throughout the grievance process, protecting them from any potential retaliation or harm.")] },
              { _key: k(), letter: 'f', body: [p("The grievance mechanism shall have a reasonable timeframe for addressing and resolving complaints, but in no case shall exceed 30 days, ensuring that workers' concerns are dealt with in a timely manner.")] },
              { _key: k(), letter: 'g', body: [p('The grievance mechanism shall hold responsible parties accountable for addressing and resolving complaints, ensuring that appropriate actions are taken to address any violations or issues raised.')] },
              { _key: k(), letter: 'h', body: [p('The grievance mechanism shall provide appropriate remedies to address the harm or injustice suffered by the complainant, such as compensation, corrective measures, or changes in policies or practices.')] },
              { _key: k(), letter: 'i', body: [p('The grievance mechanism shall provide feedback to the complainant on the progress and outcome of their complaint.')] },
              { _key: k(), letter: 'j', body: [p('The grievance mechanism shall establish feedback channels where workers can provide suggestions or comments on the effectiveness of the grievance mechanism and on their complaint.')] },
              { _key: k(), letter: 'k', body: [p('The grievance mechanism creates a process where the complainant confirms the resolution addresses their grievance prior to closing and follow-ups are conducted with the complainant after implementation to confirm satisfaction.')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Awareness by workers in Tier 1 they have access to a grievance mechanism and understand the processes and procedures for making a complaint (see Guidance below).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Awareness by workers in Tier 2 they have access to a grievance mechanism and understand the processes and procedures for making a complaint (see Guidance below).')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Records of all grievances lodged and reporting on grievance resolution trends regularly, both internally and externally. Records must be GDPR compliant and a process in place to ensure compliance with GDPR and other relevant data protection laws.')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Awareness by workers in Tier 3 and beyond they have access to a grievance mechanism and understand the processes and procedures for making a complaint (see Guidance below).')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('Scenario 1: No Grievances Filed'),
        p('If no grievances have been filed within the reporting period, the performance indicator is the percentage understanding of the grievance mechanism. Owner shall administer a structured survey to the workers to assess their awareness and understanding of the grievance mechanism and the process for making a complaint. The survey shall include, but not be limited to:'),
        li('Awareness of grievance mechanism'),
        li('Understanding of the process to file a complaint'),
        li('Awareness of the types of issues that can be reported'),
        li('Confidence in the impartiality and effectiveness of the grievance mechanism'),
        p('Scenario 2: Grievances Filed'),
        p('If there have been any grievances file, the performance indicator is the percentage of unique, validated grievances (see Definitions in Guidance below) resolved, where resolution is defined according to Requirement 1.k. The first context indicator is the number and nature of grievances filed. The second context indicator is qualitative feedback from complainant, collected during the grievance process according to Requirements 1.j and k. The third context indicator is the average time for grievance resolution.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-scenario',
        scenarios: [
          {
            _key: k(), label: 'Scenario 1: No Grievances Filed',
            steps: [{
              _key: k(),
              instructions: [
                p('To calculate the performance indicator:'),
                li('Identify the number of individuals indicating an understanding of grievance mechanism.', 'number', 1),
                li('Identify the number of individuals surveyed.', 'number', 1),
                li('Calculate the percentage of understanding of grievance mechanism.', 'number', 1),
                p('This is expressed mathematically as:'),
              ],
              formula: 'P = (IU / N) x 100',
              variables: [
                { symbol: 'P', meaning: 'percentage of understanding among surveyed individuals' },
                { symbol: 'IU', meaning: 'number of individuals indicating an understanding' },
                { symbol: 'N', meaning: 'total number of surveyed individuals' },
              ],
            }],
          },
          {
            _key: k(), label: 'Scenario 2: Grievances Filed',
            steps: [{
              _key: k(),
              instructions: [
                p('To calculate the performance indicator:'),
                li('Identify the number of unique, validated grievances filed', 'number', 1),
                li('Identify the number of resolved grievances to the satisfaction of complainant', 'number', 1),
                li('Calculate the percentage of resolved grievances according to the requirements.', 'number', 1),
                p('This is expressed mathematically as:'),
              ],
              formula: 'P = (GR / N) x 100',
              variables: [
                { symbol: 'P', meaning: 'percentage of resolved violations' },
                { symbol: 'GR', meaning: 'number of resolved violations' },
                { symbol: 'N', meaning: 'total number of violations filed' },
              ],
            }],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'multi-scenario',
      eligibility: 'Requirements 1-3 must be satisfied to be eligible for No Grievances Filed points.',
      scenarios: [
        {
          _key: k(), label: 'No Grievances Filed',
          pointsAssignment: {
            _type: 'scoringRubric', criterionLabel: 'Percentage of Understanding of Grievance Mechanism',
            bands: [
              { _key: k(), pointsLabel: '1 point', criterion: '60-79% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '2 points', criterion: '80-89% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '3 points', criterion: '90-99% understanding of grievance mechanism' },
              { _key: k(), pointsLabel: '4 points', criterion: '100% understanding of grievance mechanism and Requirement #4' },
              { _key: k(), pointsLabel: '5 points', criterion: '100% understanding of grievance mechanism and Requirement #4 & #5' },
            ],
          },
        },
        {
          _key: k(), label: 'Grievances Filed',
          pointsAssignment: {
            _type: 'scoringRubric', criterionLabel: 'Percentage of Grievances Resolved',
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
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('A table listing the specific access points through which workers and impacted parties can access the grievance mechanism including access point, intended audience, and content provided at the access point.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Documentation of content for each access point (screenshots can be provided for digital content).')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Comprehensive records of all grievances submitted (if applicable), including nature of the grievance, date of submission, actions taken, the resolution of each complaint, follow-up with the complainant, and feedback from complainants regarding satisfaction of the resolution. Records must be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation of communication to workers informing them of the grievance mechanism.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p("Copies of surveys conducted to assess workers' awareness and understanding of the grievance mechanism and the process for making a complaint (if applicable).")] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Records of survey results demonstrating the level of understanding among workers (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Documentation of actions taken in response to survey results to improve awareness and understanding if necessary.')] },
    ],
    definitions: [
      { _key: k(), term: 'Unique Grievance', body: [p('is a distinct complaint or expression of dissatisfaction raised by an individual or group, identifiable by its specific context, issue, or set of circumstances. Each unique grievance is counted only once, regardless of the number of times it is reported, or the number of individuals involved, provided the underlying issue or context remains consistent. This ensures accurate representation and tracking of distinct issues within a dataset.')] },
      { _key: k(), term: 'Validated Grievance', body: [p("is a complaint or expression of dissatisfaction that has been confirmed through an evidence-based verification process. This process evaluates the grievance against legal regulations, standards, and other applicable governance discovered in IAa1.1. A grievance is considered validated if it is directly linked to the project's actions or decisions and can be substantiated with tangible evidence, such as documentation, factual data, or verifiable observations. The validation process should be transparent, consistent, and strictly adhere to applicable project governance, ensuring that grievances are assessed objectively and in line with established legal and professional benchmarks. This method minimizes subjectivity and ensures compliance with relevant and authoritative criteria.")] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On types of access points for submitting complaints',
        body: [
          p('It is important to have a good mix of confidential, anonymous, semi-public, and public ways to access a grievance mechanism. Some examples include:'),
          li('Community Liaison Officers (confidential);'),
          li('complaint hotline (confidential or anonymous);'),
          li('web page (confidential or anonymous);'),
          li('e-mail address (confidential or semi-public);'),
          li('text messaging (confidential or semi-public);'),
          li('complaint box in a public area (anonymous, confidential, or semi-public);'),
          li('community leaders (confidential, semi-public, or public); and'),
          li('NGOs (anonymous, confidential, semi-public, or public).'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On educating and informing workers of grievance mechanism',
        body: [
          p('This process emphasizes the importance of ensuring that workers are informed and educated about the existence of the grievance mechanism and how they can utilize it. It is crucial that workers understand the processes and procedures involved in making a complaint, so they can effectively exercise their rights.'),
          p('The following are ways to educate and inform workers about the grievance mechanism:'),
          li('Incorporate information about the grievance mechanism into the induction training for all new hires as well as in the onboarding of new vendors and suppliers. This can include how to use the mechanism, what to expect from the process, and assurances about non-retaliation.'),
          li('Develop clear, easily understood written materials about the grievance mechanism that are available in the languages spoken by the workforce through various channels such as:'),
          li('employee handbooks', 'bullet', 2),
          li('posters', 'bullet', 2),
          li('notice boards', 'bullet', 2),
          li('company-wide meetings', 'bullet', 2),
          li('If workers have access to digital resources, create a section on your internal website or intranet that provides information about the grievance mechanism and its use.'),
          li('Periodically remind workers about the grievance mechanism through internal communications, such as newsletters, emails, or intranet updates. Reinforce the importance of the mechanism and encourage workers to utilize it if they have any concerns.'),
          li('Establish feedback channels where workers can provide suggestions or comments on the effectiveness of the grievance mechanism. This can help improve the process and address any potential gaps or challenges.'),
          li('Run regular workshops or information sessions that are open to all workers to attend, focused on understanding and using the grievance mechanism. These sessions should be interactive, allowing workers to ask questions and receive real-time responses.'),
          li('Integrate information about the grievance mechanism into ongoing training programs. This ensures regular reinforcement of the information.'),
          li('Train managers and supervisors on the grievance mechanism so they can accurately inform their team members, answer questions, and support employees who wish to use it.'),
          li('Train a group of workers as peer educators who can then train their peers on the grievance mechanism. This can be particularly effective in reaching workers who might be less comfortable in formal training environments.'),
          li('Share anonymized case studies of how grievances have been successfully resolved. This can help workers understand how the process works and the kinds of outcomes that are possible.'),
          p('Additional Resources'),
          li('The Office of the Compliance Advisor Ombudsman (CAO) Guide to Designing and Implementing Grievanec Mechanisms for Development Projects – Available online: https://www.cao-ombudsman.org/resources/guide-designing-and-implementing-grievance-mechanisms-development-projects'),
          li('Reckitt Grievance Mechanism Toolkit, developed by Oxfam Business Advisory Service. Available online: https://www.oxfamapps.org.uk/grievance-mechanism-toolkit/'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-danish-hrcat-contractors' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa3.2')
}

run().catch((err) => { console.error(err); process.exit(1) })
