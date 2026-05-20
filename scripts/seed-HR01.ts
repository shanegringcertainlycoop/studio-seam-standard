/**
 * Seeds Pillar 4 (Social Accountability) subtitle, Concept HR (Human Rights),
 * Objective HR01 (Ethical Materials Procurement), and activities HRa1.1–HRa1.4.
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

function pWithNote(before: string, noteId: string, after: string) {
  const m = k()
  return { _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [m] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [{ _type: 'editorialNoteRef', _key: m, note: { _type: 'reference', _ref: noteId } }],
  }
}

const RATING_ALL: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
}

async function run() {
  console.log('Patching Pillar 4 subtitle...')
  await client.patch('pillar-social-accountability').set({
    subtitle: 'The obligation of power holders to account for and take responsibility for their actions.',
  }).commit()

  console.log('Patching Concept HR...')
  await client.patch('concept-HR').set({
    headlineGoal: 'Every human is entitled to equal and inalienable rights and fundamental freedoms that should be recognized and protected.',
    summary: [
      p('The Universal Declaration of Human Rights, adopted by the United Nations in 1948, asserts that every individual is entitled to equal and inalienable rights and fundamental freedoms. This principle, foundational to modern human rights discourse, underscores the inherent dignity and worth of every human being, irrespective of race, gender, nationality, or any other distinction.'),
      p('In the commercial real estate industry context, this translates to a responsibility to ensure that all aspects of the built environment — from the materials used to the suppliers engaged and from the wages paid to the rights protected — uphold these universal human rights standards.'),
      pWithBib('The International Labour Office estimated that in 2016, 25 million people were in forced labor, 25% of which were children and 71% women and girls', '112', '. The construction sector, which directly impacts the real estate industry, is one of the sectors most prone to forced labor, especially in regions like the Middle East and parts of Asia.'),
      p('In regions like the Gulf Cooperation Council (GCC), migrant workers comprise a significant portion of the construction workforce. Reports from organizations like Human Rights Watch and Amnesty International have highlighted concerns about the treatment of these workers, including issues like passport confiscation, unpaid wages, and poor living conditions. Free the Slaves, an international charity organization working to eradicate slavery, states that "slavery is the result of vulnerability: the poor, the uneducated, and the marginalized are exploited and coerced to work without pay."'),
      p("Incorporating human rights objectives and activities into the commercial real estate industry's practices is about more than just compliance or risk mitigation. It's about recognizing the industry's power and responsibility to shape spaces that respect and uphold the dignity of all to prevent the exploitation of vulnerable populations and contribute to eradicating slavery and human rights abuses in the construction and commercial real estate sectors."),
    ],
  }).commit()

  console.log('Patching Objective HR01...')
  await client.patch('objective-HR01').set({
    headlineGoal: 'Implement ethical sourcing practices to protect, promote, and advance human rights in the materials supply chain.',
    narrative: [
      p("Ethical Materials Procurement stresses prioritizing the ethical provenance of sourced materials. Every material choice carries a history of production, transportation, and labor. It's essential to strive to ensure that this history is free from human rights violations, such as forced labor, child labor, and unsafe working conditions. This objective goes beyond compliance with regulations, which are increasing globally, but actively seeks materials promoting fair labor practices and respect for human rights."),
      pWithBib('Design for Freedom by Grace Farms states, “The complexity and the sheer number of unique raw and composite materials per building make it nearly impossible to purchase slave-free materials. But a growing list of risky raw and composite materials and global “hot spots” can provide direction to help make ethical decisions', '113', '.”'),
      p('By emphasizing the specification of ethical materials, the industry takes a proactive stance in reducing human rights abuses in the supply chain. The industry can then engage in corrective actions when discrepancies or violations are identified. The Activities supporting this objective aim to create built environments that are symbols of progress and ethical integrity rather than physical structures built on the suffering of others.'),
    ],
  }).commit()

  console.log('Seeding editorial notes xxvi–xxvii...')
  await client.createOrReplace({
    _id: 'note-xxvi', _type: 'editorialNote', marker: 'xxvi', order: 26,
    body: [p('Prioritization of human rights risks is based on the Arc of Human Rights Priorities model from The Danish Institute for Human Rights and the United Nations Global Compact')],
  })
  await client.createOrReplace({
    _id: 'note-xxvii', _type: 'editorialNote', marker: 'xxvii', order: 27,
    body: [p('A responsible Owner should aim to fulfill all these requirements, not just one. These actions are interconnected and together form a comprehensive response. The goal is to fully address and redress the harm done, hold those responsible accountable, and prevent such abuses from happening again in the future.')],
  })

  console.log('Seeding master bibs (UNCRC, ILO C138, SA8000 2014)...')
  await client.createOrReplace({
    _id: 'bib-uncrc-1989', _type: 'bibliographyEntry',
    citation: 'United Nations Convention on the Rights of the Child (1989)',
  })
  await client.createOrReplace({
    _id: 'bib-ilo-c138', _type: 'bibliographyEntry',
    citation: 'ILO Minimum Age Convention 138 (1973)',
  })
  await client.createOrReplace({
    _id: 'bib-sa8000-2014', _type: 'bibliographyEntry',
    citation: 'Social Accountability International SA8000® International Standard (2014)',
  })

  // ─── HRa1.1 Ethical materials specification ──────────────────────────────
  console.log('\nSeeding HRa1.1...')
  await client.createOrReplace({
    _id: 'activity-HRa1-1', _type: 'activity',
    activityId: 'HRa1.1',
    title: 'Owner shall proactively specify ethical materials in design and planning documents',
    slug: { _type: 'slug', current: 'hra1-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall establish a governance framework for ethical procurement, including the adoption of a Socially Sustainable Procurement Policy, integration of Ethical Design Requirements, and procurement of slave-free materials to promote ethical sourcing. This activity encompasses continuous monitoring, training, and regular supplier evaluations. Direct management of Supplier internal operations are outside the scope of this Activity.'),
    ],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-114' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A Socially Sustainable Procurement Policy that includes the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Commit to address and work to eliminate any forms of discrimination, harassment, abuse, and modern slavery, including forced labor and human trafficking, within the supply chain.')] },
              { _key: k(), letter: 'b', body: [p('Prioritize decent work and safe working conditions, ensuring the right to collective bargaining and freedom of association for all workers (where legal).')] },
              { _key: k(), letter: 'c', body: [p('Demonstrate a clear commitment to promoting diversity and inclusion throughout the procurement processes and organizational structures.')] },
              { _key: k(), letter: 'd', body: [p('Commitment to promoting that all workers receive a living wage and establish clear guidelines for voluntary and fairly compensated overtime.')] },
              { _key: k(), letter: 'e', body: [p('Implement clear channels for impacted parties, especially workers, to voice concerns or grievances without fear of retaliation.')] },
              { _key: k(), letter: 'f', body: [p('Dedicate efforts to continuous improvement in social performance and transparently report on key social sustainability indicators.')] },
              { _key: k(), letter: 'g', body: [p("Ensure regular training on this policy's principles and invest in capacity-building initiatives promoting sustainable practices for staff, particularly those in decision-making roles.")] },
              { _key: k(), letter: 'h', body: [p('Extend these requirements to all suppliers and conduct regular risk assessments and due diligence to maintain a socially sustainable supply chain.')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Incorporate the Ethical Design Requirements from the Design for Freedom initiative in all project design documents. Position these requirements in either Division XX – Conditions of the Contract or Division XX-General Requirements to ensure contractual compliance by all Contractors and Suppliers. Additional details for slave-free materials shall be included in product specifications. For operating assets, Owner must include a Slave-free Materials Requirement in rules or other documents to ensure compliance by all Suppliers.')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Include a universal contract clause in agreements with Suppliers creating a standardized, self-propagating requirement that each party must include in their contracts, irrespective of their position in the supply chain (see Guidance below).')] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Assessment of the ability of Suppliers (architects, engineers, designers, suppliers, vendors, and any other consultant that controls the choice of goods and materials supplied to the project) to comply with the requirement during the qualification and selection of new suppliers and vendors.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Training on human rights and labor standards for relevant management and procurement staff.')] },
          { _type: 'requirementItem', _key: k(), number: 6, body: [p('Contract clauses that require Suppliers to continuously monitor and report on their adherence to slave-free material standards.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 7, body: [p('The project and procurement practices, such as prices, delivery times and internal incentive structures, encourage improved human rights standards in suppliers and business partners.')] },
          { _type: 'requirementItem', _key: k(), number: 8, body: [p('Supplier monitoring as part of ongoing evaluation of suppliers and contractors through self-assessment, site visits, and/or audits.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of ethical procurement governance compliance rate according to the requirements. The first context indicator is the percentage of materials procured that meet all requirements. The second context indicator is the total number of hours of training on human rights and labor standards for relevant management and procurement staff.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine compliance with each of the requirements (Complied or Not Complied).', 'number', 1),
            li('Determine ethical procurement governance compliance rate.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'Ethical procurement governance rate = (# of requirements satisfied / # of requirements) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirements #1 through #4 must be satisfied to be eligible for points.',
      outcomeThreshold: [p('The minimum threshold is a 50% ethical procurement governance compliance rate for satisfying all Act to Avoid Harm requirements (4 out of 8 requirements satisfied), which is a requirement for SEAM Certification. No points are awarded for the minimum. However, additional points are assigned for achieving higher levels of progress in the Benefit Impacted Parties and Contribute to Solutions requirements.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Ethical Procurement Governance Compliance',
        bands: [
          { _key: k(), pointsLabel: 'REQUIREMENT MET', criterion: '50% ethical procurement governance compliance rate' },
          { _key: k(), pointsLabel: '+1 point', criterion: '75% ethical procurement governance compliance rate' },
          { _key: k(), pointsLabel: '+2 points', criterion: '87.5% ethical procurement governance compliance rate' },
          { _key: k(), pointsLabel: '+3 points', criterion: '100% ethical procurement governance compliance rate' },
        ],
      },
      notes: [
        p('Example:'),
        p('After an internal audit of their operations and project contracts, XYZ Corporation finds the following:'),
        li("They've updated their Socially Sustainable Procurement Policy."),
        li("They've recently revised their Supplier Code of Conduct."),
        li("They haven't included Ethical Design Requirements Specifications or a Slave-free Materials Requirement in their project documents."),
        li("They've integrated the universal contract clause."),
        li("They've conducted a human rights assessment during supplier/vendor qualification."),
        li("They haven't yet provided training on human rights and labor standards to their staff."),
        li('Their procurement practices moderately support human rights.'),
        li("They've initiated, but haven't completed, monitoring of suppliers/contractors for compliance."),
        p('Based on this, XYZ Corporation complies with 5 out of the 8 requirements.'),
        p('Percentage Compliance = (5/8) x100 = 62.5%'),
        p('Given the scoring bands: 62.5% falls within the 62-74% Compliance, awarding them 4 points.'),
        p('Result: XYZ Corporation scores 4 points on the Conditional Human Rights Compliance Scoring Rubric. They should focus on integrating Ethical Design Requirements, conducting staff training, and completing supplier/contractor monitoring to improve their score in the next assessment.'),
      ],
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Copy of the adopted or updated Socially Sustainable Procurement Policy according to requirements.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p("Internal memos or circulars showcasing the policy's dissemination and implementation.")] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Project design documents incorporating Ethical Design Requirements from the Design for Freedom initiative and detailed product specifications outlining the Slave-free Materials Requirement.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Sample contracts demonstrating the inclusion of the universal contract clause with Suppliers.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Training schedules, content and materials, and attendance sheets for human rights and labor standards training (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Sample contract clauses requiring Suppliers to monitor and report on slave-free material standards (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Supplier self-assessment forms or reports, documentation from site-visits, including observation reports and findings, and/or audit reports detailing supplier and contractor adherence to standards (if applicable).')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On the universal contract clause',
        body: [
          p('Below is example language that meets Requirement 1 and ensures consistent adherence and minimizes the risk of misinterpretation or oversight.'),
          p('Universal Socially Sustainable Procurement Clause'),
          p('By entering this contract, the Contracting Party pledges adherence to the Socially Sustainable Procurement Policy (Appendix <X>). Furthermore, the Contracting Party agrees to embed this clause verbatim in all contracts established with direct suppliers or sub-suppliers for this project, ensuring these entities both uphold the stipulated policies and continuously propagate this exact clause in their subsequent agreements.'),
          p('Should the Contracting Party not adhere to the policies, fail to propagate this clause, or breach other contract stipulations, a 60-day rectification period will be provided. If non-compliance persists beyond this period, business activities may be temporarily suspended. The non-compliant party shall be responsible for seeking and undergoing capacity-building or training programs relevant to the non-compliance, with evidence of completion to be provided. In instances of severe or repeated non-compliance, the contract may be terminated.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On awareness raising, training and capacity building',
        headingFootnote: { _type: 'reference', _ref: 'bib-115' },
        body: [
          p('"The UN Guiding Principles on Business and Human Rights, or UNGPs, recognize the importance of strengthening awareness and know-how. Key guidance on awareness raising, training and capacity building includes:'),
          p('A company\'s responsibility to respect extends across all internationally recognized human rights. Companies need to build the capacity to identify, address and communicate about issues related to any internationally recognized human right.'),
          p("Employees need to be aware of the company's policy commitment and receive relevant training and operational guidance. A company's human rights policy statement – and related policies, processes and lines of accountability – need to be communicated clearly."),
          p('Companies should build the capacity of employees to identify and address human rights risks. To carry out effective human rights due diligence, employees in relevant functions will need specific knowledge and capacity. You may need to "translate" human rights-related concepts into operational language, and ensure employees know where to find more information.'),
          p('Additional Resources'),
          li('Design for Freedom toolkit – a comprehensive resource for design and construction professionals to implement ethical, forced labor-free material sourcing strategies into their practices'),
          li('Sample Specification – Ethical Design Requirements can be downloaded at the designforfreedom.org website (link in footnote)', 'bullet', 2),
          li('Responsible Sourcing Tool – a collaboration between Verite, US Department of State, Made in a Free World, and the Aspen Institute.'),
          li('Mindful Materials mM portal – a common materials framework with searchable database.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-principle16' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-fundamental-principles' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa1.1')

  // ─── HRa1.2 Supply chain risk assessment ─────────────────────────────────
  console.log('\nSeeding HRa1.2...')
  await client.createOrReplace({
    _id: 'activity-HRa1-2', _type: 'activity',
    activityId: 'HRa1.2',
    title: 'Conduct a supply chain risk assessment and action plan',
    slug: { _type: 'slug', current: 'hra1-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall thoroughly assess its highest risks within the supply chain to identify, prevent, and mitigate negative human rights impacts. The process shall include assessing actual and potential human rights impacts (e.g., forced labor, child labor, or unsafe working conditions), prioritization of risks based on severity and attribution, creating an action plan based upon the findings, and creating a mechanism for tracking responses. Implementation of the action plan is outside the scope of this Activity.'),
    ],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-119' },
    requirementsNotes: [
      p('Due diligence shall cover negative human rights impacts that the Project may cause or contribute to through its own activities, or which may be directly linked to its operations or activities by its business relationships.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('A risk assessment for the top ten (10) products/materials with the highest spend plus any from the top riskiest materials list if not already in top 10 products with highest spend (see Guidelines below) that includes the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Supply chain mapping that contains the agents, vendors, producers, manufacturers, distributors, contractors, or relevant entities (Suppliers) at as many levels of the supply chain, including their location, as can reasonably be identified, but no less than Tier 1, Tier 2, and Tier 3 at a minimum.')] },
              { _key: k(), letter: 'b', body: [p('Identification and assessment of the actual or potential high-priority human rights risks that includes Step 4, 5, and 6 from Guidelines below')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('List actions to prevent or mitigate identified high-priority human rights risks from Requirement 01 above.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('Mechanisms to track the effectiveness of implemented actions, ensuring continuous improvement.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Ongoing processes to monitor human rights risks as they change over time.')] },
          { _type: 'requirementItem', _key: k(), number: 5, body: [p("A preferred list that includes products and materials that meet the Project's ethical materials procurement requirements to serve as a reference for procurement decisions.")] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of high-risk supply chain assessed for human rights risks. The first context indicator is total number of Suppliers assessed for human rights risks in the supply chain. The second context indicator is total number of products and materials assessed for human rights risks.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [p('This is expressed mathematically as:')],
          formula: '(# of Suppliers assessed for human rights risks / # of Suppliers in the supply chain) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of High-Risk Supply Chain Assessed',
        bands: [
          { _key: k(), pointsLabel: '4 points', criterion: '0-16% high-risk supply chain assessed' },
          { _key: k(), pointsLabel: '5 points', criterion: '17-33% high-risk supply chain assessed' },
          { _key: k(), pointsLabel: '6 points', criterion: '34-50% high-risk supply chain assessed' },
          { _key: k(), pointsLabel: '7 points', criterion: '51-66% high-risk supply chain assessed' },
          { _key: k(), pointsLabel: '8 points', criterion: '67-83% high-risk supply chain assessed' },
          { _key: k(), pointsLabel: '9 points', criterion: '84-100% high-risk supply chain assessed' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Requirements met',
        bands: [
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #3 met' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #4 met' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'Requirement #5 met' },
        ],
      },
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      {
        _type: 'documentationItem', _key: k(), number: 2,
        body: [p('Supply chain highest risks table (see template below) including:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('list of suppliers, vendors, and contractors categorized by Tiers (Tier 1, Tier 2, etc.), including profiles for each supplier with location and products/services provided.')] },
          { _key: k(), letter: 'b', body: [p('List of identified impacted parties within each tier of the supply chain, with records of any surveys, interviews, or on-site visits conducted, including findings or insights.')] },
          { _key: k(), letter: 'c', body: [p('Report detailing the analysis of impacted party engagement results, consultation records with third-party experts, software application outputs, or desktop research findings for identified highest human rights risks.')] },
          { _key: k(), letter: 'd', body: [p('Scoring sheet detailing severity of each identified human rights risk, with calculations and justifications for each score assigned.')] },
          { _key: k(), letter: 'e', body: [p('Report detailing the attribution level for each identified human rights risk, with justifications and reasoning for each attribution level assigned.')] },
          { _key: k(), letter: 'f', body: [p('Comprehensive list of company policies addressing high-priority human rights issues, supported by records of impacted party engagements, drafts of new policies, approval records, and communication records ensuring policy awareness.')] },
          { _key: k(), letter: 'g', body: [p('Detailed mitigation plans for each high-priority risk, supported by training materials and attendance records, impacted party engagement records, implemented safeguards, and periodic process review records.')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Matrix or chart plotting each human rights issue based on impact and attribution, with visual representation highlighting high-priority risks and accompanying notes.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On limits of Owner responsibility',
        body: [
          p('Mapping supply chains does not necessarily imply that an Owner is responsible for all impacts and risks associated with every entity in the chain. As stated in the UN Guiding Principles on Business and Human Rights, "where business enterprises have large numbers of entities in their value chains, it may be unreasonably difficult to conduct due diligence for adverse human rights impacts across them all. If so, business enterprises should identify general areas where the risk of adverse human rights impacts is more significant, whether due to certain suppliers\' or clients\' operating context, the particular operations, products, or services involved, or other relevant considerations and prioritize those for human rights due diligence."'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'How to identify high-priority human rights risks',
        headingFootnote: { _type: 'reference', _ref: 'note-xxvi' },
        body: [
          p('Step-by-step guidance for identifying high-priority human rights risks in supply chains:'),
          p('Step 1: Supply Chain Mapping'),
          li('Begin by listing all agents, vendors, producers, manufacturers, distributors, contractors, or relevant entities (Suppliers) involved in your supply chain. This can be achieved through the following:'),
          li('Requiring Tier 1 Suppliers to list their Tier 2 and so on as well as each Supplier listing products and materials to be sourced as part of the project', 'bullet', 2),
          li('Using supply chain mapping software that has database connections to shipping bills of lading or other technology innovations', 'bullet', 2),
          li('Third-party supply chain mapping entity', 'bullet', 2),
          li('Categorize suppliers based on tiers: Tier 1 (direct suppliers), Tier 2 (suppliers of Tier 1), and so on.'),
          li('Document the location, products/services provided, and scale of operation for each supplier.'),
          li('Map all specified products and materials in your supply chain, especially beyond Tier 3, as they might pose a high risk. By doing so, you can identify and include Suppliers linked to these high-risk items on your map.'),
          p('Step 2: Impacted Party Engagement (where possible)'),
          li('Identify impacted parties within each tier of your supply chain.'),
          li('Prioritize engagement with vulnerable groups within these tiers.'),
          li('Use surveys, interviews, and on-site visits to gather insights on potential human rights concerns.'),
          p('Step 3: Comprehensive Rights Assessment'),
          li('Identify and list all potential human rights risks using any of the following methods:'),
          li('Analyze impacted party engagement results', 'bullet', 2),
          li('Consult a third-party expert in human rights assessment', 'bullet', 2),
          li('Utilize a software application that identifies human rights risks in supply chains (see Guidance below)', 'bullet', 2),
          li('Conduct desktop research using materials lists (see Guidance below), official databases, and other open-source intelligence resources', 'bullet', 2),
          p('Step 4: Determine severity of Impact'),
          li('Number of people affected (scope) is given a score of 1 to 3 where:'),
          li('3 = >20% total population in impact area or >50% identifiable group', 'bullet', 2),
          li('2 = >10% total population or 11-49% identifiable group', 'bullet', 2),
          li('1 = >5% total population or <10% identifiable group', 'bullet', 2),
          li('Severity of issue (scale) is given a score of 1 to 3 where:'),
          li('3 = Will cause death or adverse health effects that could lead to significant reduction in quality of life and/or longevity', 'bullet', 2),
          li('2 = A tangible human right infringement of access to basic life necessities (including education, livelihood, etc.)', 'bullet', 2),
          li('1 = all other impacts', 'bullet', 2),
          li('Remediability (whether the consequence can be reversed) is given a score of 1 to 3 where:'),
          li('3 = difficult', 'bullet', 2),
          li('2 = moderate', 'bullet', 2),
          li('1 = easy', 'bullet', 2),
          p('Score each impact by adding scores for each aspect of Severity. A score of 3 is considered low severity. A score of 4 is considered medium severity. A score of 5 or higher for any impact is considered high severity.'),
          p('Step 5: Assign an attribution level (connection to company)'),
          li('Directly caused = high – the actions of the Owner alone are sufficient to cause the negative impact'),
          li('Contributes = medium – the actions of the Owner lead to or create incentive for another entity to cause the negative impact'),
          li('Directly linked = low – the Owner has a direct and active involvement in the impact, either through its own actions or through its business relationships'),
          p('Step 6: Risk Prioritization'),
          li('Plot each human rights issue on an x-y axes matrix where impact is on the y-axis with high at the top and low at the bottom, and attribution (connection to company) is on the x-axis with high on the right and low on the left. Use the following model to determine if plotted points fall into the red, which are high-priority risks.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On creating the action plan',
        body: [
          p('Owner should ensure reasonable policy coverage of all high-priority human rights issues.'),
          p('Policy Development'),
          p('Establish clear policies that address high-priority human rights issues identified through the Arc exercise.'),
          p('Steps:'),
          li('Examine existing company policies to identify gaps related to high-priority human rights issues.', 'number', 1),
          li('Engage with internal and external impacted parties to gather insights and recommendations for policy formulation.', 'number', 1),
          li('Develop clear and comprehensive policies addressing each high-priority issue.', 'number', 1),
          li('Seek approval from senior management or the board for the newly drafted policies.', 'number', 1),
          li('Ensure that all employees, suppliers, and relevant impacted parties are aware of and understand the new policies.', 'number', 1),
          p('Process Implementation'),
          p('Implement internal controls and processes to prevent and mitigate potential human rights abuses.'),
          p('Steps:'),
          li('For each high-priority risk identified, develop a specific mitigation plan. This should detail the actions to be taken, responsible parties, timelines, and expected outcomes.', 'number', 1),
          li('Develop and implement training programs on human rights best practices for employees, especially those in high-risk areas.', 'number', 1),
          li('Regularly engage with impacted parties, including local communities and NGOs, to gather feedback on company operations.', 'number', 1),
          li('Implement safeguards, such as identity document checks for new hires, to prevent issues like child labor.', 'number', 1),
          li('Regularly review and update processes based on feedback and changing circumstances.', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On top riskiest materials list',
        headingFootnote: { _type: 'reference', _ref: 'bib-120' },
        body: [
          li('Bamboo (furnishings, construction materials)'),
          li('Bricks'),
          li('Calcium carbonate (limestone)'),
          li('Carpets'),
          li('Copper'),
          li('Cotton (textiles, furnishings)'),
          li('Electronics (integrated technology solutions)'),
          li('Glass'),
          li('Gold (electronic components, luxury fittings)'),
          li('Granite'),
          li('Gravel (crushed stones)'),
          li('Polysilicon (solar panels)'),
          li('Rubber'),
          li('Sandstone'),
          li('Sodium carbonate (soda ash)'),
          li('Steel'),
          li('Stones'),
          li('Tantalum ore (coltan) (electronics)'),
          li('Tin ore (cassiterite) (electronics)'),
          li('Textiles (interior furnishings)'),
          li('Timber'),
          li('Tungsten ore (wolframite) (electronics)'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa1.2')

  // ─── HRa1.3 Ethical sourcing of products and materials ──────────────────
  console.log('\nSeeding HRa1.3...')
  await client.createOrReplace({
    _id: 'activity-HRa1-3', _type: 'activity',
    activityId: 'HRa1.3',
    title: 'Ethical sourcing of products and materials',
    slug: { _type: 'slug', current: 'hra1-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall strive to source products and materials used in construction and/or operations and maintenance that are free from human rights violations such as forced labor, child labor, and unsafe working conditions. Based on the previously conducted risk assessment, the Owner shall enact the established action plan to address identified high-priority human rights risks. A mechanism for tracking responses and compliance shall be instituted. Ongoing adjustments of the action plan are outside the scope of this Activity.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Comprehensive records of all products and materials from the high-priority list created in HRa1.2, which are used in construction and/or operations and maintenance, including their sources.')] },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('For products and materials with high-priority human rights risks, verification that manufacturers are compliant with human rights standards by at least one of the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('ensuring manufacturers possess relevant certifications or declarations concerning human rights (see Additional Resources below)')] },
              { _key: k(), letter: 'b', body: [p('adopting technologies or systems to trace the origin of materials and ensure ethical sourcing')] },
              { _key: k(), letter: 'c', body: [p('acquiring third-party verified documentation affirming materials are free from forced, bonded, or child labor connections')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 3, body: [p("Impacted Party engagement with NGOs, local communities, and workers to gather insights on identified manufacturers' practices, observable changes, and any concerns related to material sourcing.")] },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('A mechanism to track responses, including periodic reviews, shall be established to monitor and continuously review compliance with human rights standards.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('Collaboration with industry peers, NGOs, and human rights organizations to share best practices and drive collective action against human rights violations in the supply chain.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of ethically sourced products and materials. The first context indicator is total number of products and materials ethically sourced. The second context indicator is the total number of workers positively impacted by ethical sourcing decisions.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('The performance indicator is calculated as follows:'),
            li('Identify and list all high-priority products and materials identified in the risk assessment in Activity HRa1.2.', 'number', 1),
            li('Determine the number of high-priority products and materials that have been verified as ethically sourced.', 'number', 1),
            li('Calculate the percentage of ethically sourced high-priority products and materials.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: '(Number of ethically sourced High-Priority items / total number of High-Priority items) x 100',
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The objective is to achieve total elimination of child and forced labor in sourcing practices. Recognizing the current state of industry standards and inherent complexities within global supply chains, interim targets are established to acknowledge and incentivize incremental progress. It is understood that complete realization of this objective is a long-term endeavor, and these phased targets facilitate a structured approach towards its eventual achievement.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Ethically Sourced',
        bands: [
          { _key: k(), pointsLabel: '0 points', criterion: '0-10% ethically sourced' },
          { _key: k(), pointsLabel: '3 points', criterion: '11-30% ethically sourced' },
          { _key: k(), pointsLabel: '6 points', criterion: '31-50% ethically sourced' },
          { _key: k(), pointsLabel: '9 points', criterion: '51-70% ethically sourced' },
          { _key: k(), pointsLabel: '12 points', criterion: '71-100% ethically sourced' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Detailed inventory logs of all identified high-priority products and materials used in construction and/or operations and maintenance, including their sources and accompanying certifications or declarations.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Documentation or evidence of technologies, systems, or third-party verifications used to trace and ensure the ethical sourcing of high-priority materials.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Records of interactions, communications, meetings, or consultations with NGOs, local communities, workers, industry peers, and human rights organizations.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('A system or tool used to track responses, compliance, and periodic reviews undertaken to ensure ongoing compliance with human rights standards.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('A list of all high-priority products and materials identified in the risk assessment, evidence of their ethical sourcing, and calculations demonstrating the percentage ethically sourced.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Documentation showing total number of products and materials that have been ethically sourced and total number of estimated workers affected by ethical sourcing with an explanation of how it was estimated.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On definition of ethically sourced',
        body: [
          p('For the context of the SEAM Standard, ethically sourced is the deliberate selection and use of products and materials for which comprehensive records have been maintained and verified, ensuring their compliance with recognized human rights standards. This includes validation that manufacturers of said products and materials have no associations with practices like child labor, forced labor, and other human rights abuses. The sourcing process actively incorporates insights from NGOs, local communities, and workers and is continuously monitored and reviewed for adherence to these standards. The following certifications and third-party assurances are SEAM-approved:'),
          li('SA8000® Standard (2025)'),
          li('BRE: BES 6002 Ethical Labour Sourcing Standard (v1)'),
          li('Cradle to Cradle Certification (v4.0) Social Fairness category'),
          li('Forest Stewardship Council (FSC), FSC Chain of Custody certification'),
          li('Initiative for Responsible Mining Assurance (IRMA-STD-001)'),
          li('Copper Mark Certification'),
          li('ResponsibleSteel Certification (v3.0)'),
          li('Natural Stone Sustainability Standard (ANSI/NSC 373)'),
          li('Fair Stone Standard (4th Edition)'),
          li('Global Organic Textile Standard (GOTS)'),
          li('World Fair Trade Organization’s Fair Trade Standard (v4.2)'),
          li('Fair Rubber'),
          li('Better Brick Nepal'),
          li('Concrete Sustainability Council'),
          li('Xertifix Standard, Plus, and Plus Factory Only Certification'),
          li('SMETA Third-party social audit'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa1.3')

  // ─── HRa1.4 Remediate materials procurement negative impacts ────────────
  console.log('\nSeeding HRa1.4...')
  await client.createOrReplace({
    _id: 'activity-HRa1-4', _type: 'activity',
    activityId: 'HRa1.4',
    title: 'Owner shall remediate materials procurement negative impacts to human rights',
    slug: { _type: 'slug', current: 'hra1-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall provide for or cooperate in the remediation of negative human rights impacts during materials procurement where the Project caused, contributed, or is linked to that could not be prevented or mitigated through defined actionable steps. The aim is to neutralize past negative effects through remediation and restoration, not just halting future negative impacts. This activity is confined to the project and not the broader organizational operations.'),
    ],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-130' },
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Identification of Owner level of attribution as caused, contributed, or linked (see Guidance below).')] },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [pWithNote('Corrective actions for each negative human rights impact according to the level of attribution', 'note-xxvii', '.')],
            subItems: [
              {
                _key: k(), letter: 'a',
                body: [
                  p('Projects/properties that have directly caused negative human rights impacts shall take the following actions for remediation (impacts created by Owner or Tier 1 Suppliers):'),
                  p('i. Immediate Cessation: Cease the actions causing the negative human rights impacts immediately. If possible, reverse the abusive activity.'),
                  p('ii. Compensation: Provide compensation to the affected individuals or groups for losses suffered. This can include financial reimbursement, psychological support, medical care, etc.'),
                  p('iii. Accountability: Hold accountable those individuals within the organization responsible for the negative human rights impacts. This could involve disciplinary action, dismissal, or in extreme cases, referral to legal authorities for potential criminal charges.'),
                  p('iv. Preventative Measures: Implement strategies, policies, and procedures to prevent recurrence, such as due diligence processes, staff training, and regular monitoring and review.'),
                ],
              },
              {
                _key: k(), letter: 'b',
                body: [
                  p('Projects/properties that have contributed to negative human rights impacts shall take the following actions for remediation (impacts created by Tier 2 Suppliers):'),
                  p('i. Disengage: Where feasible, cease business relationships with entities causing the negative human rights impacts.'),
                  p('ii. Mitigate: If disengagement is not immediately possible, take steps to mitigate ongoing harm, such as by using influence over the contributing partner to halt or prevent further negative human rights impacts.'),
                  p('iii. Remediate: Assist in remediating harm, potentially through joint efforts with other entities. This could involve participating in restoration projects, funding rehabilitation programs, etc.'),
                  p("iv. Public Disclosure: Where appropriate, publicly disclose the business's contribution to the negative human rights impacts and the steps it has taken to address it."),
                ],
              },
              {
                _key: k(), letter: 'c',
                body: [
                  p('Projects/properties directly linked to negative human rights impacts via their business relationships shall take the following actions for remediation (impacts created by Tier 3 Supplier):'),
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
              { _key: k(), letter: 'a', body: [p('collect feedback from affected individuals or groups regarding their satisfaction with the remediation efforts.')] },
              { _key: k(), letter: 'b', body: [p('solicit the opinion(s) of independent third-party assessors or auditors to provide an unbiased evaluation of remediation efforts.')] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of remediated materials procurement negative impacts. The first context indicator is the total number of affected individuals compensated with the type of compensation received (financial, psychological support, medical care, etc.). The second context indicator is the number of preventative measures in place, such as policies and procedures designed to prevent recurrence, due diligence processes, staff training programs, etc.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine the total number of negative impacts identified during Activity HRa1.2', 'number', 1),
              li('For each negative impact, determine the level of attribution (caused, contributed, linked) from Requirement 2 above.', 'number', 1),
              li('Determine level of remediation achieved out of the 4 corrective actions listed under your selected attribution level in Requirement 2 above.', 'number', 1),
              li('Assign a value of 25% if you completed the first action, 50% if you completed the second action, 75% if you completed the third action, or 100% if you completed all four actions. Note: corrective actions under each attribution level in Requirement 2 are listed in a progressive order so they must be implemented in the order they are listed to achieve progressive percentages of completion.', 'number', 1),
              li('Calculate the weighted remediation percentage for each negative impact by multiplying the level of attribution by the corrective action achieved (weights are 1.0 for caused, 0.7 for contributed, 0.5 for linked).', 'number', 1),
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
          { _key: k(), pointsLabel: '2 points', criterion: '20 – 39% remediated impacts' },
          { _key: k(), pointsLabel: '4 points', criterion: '40 – 69% remediated impacts' },
          { _key: k(), pointsLabel: '6 points', criterion: '70 - 84% remediated impacts' },
          { _key: k(), pointsLabel: '8 points', criterion: '85 -95% remediated impacts' },
          { _key: k(), pointsLabel: '10 points', criterion: '96 - 99% remediated impacts' },
          { _key: k(), pointsLabel: '12 points', criterion: '100% remediated impacts' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Comprehensive list of all identified negative impacts. It should include details about each impact, such as the nature of the impact, the parties involved, and the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Remediation Action Plans outlining the corrective actions to be taken for each negative impact, based on the level of attribution.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Regular progress reports (if applicable) providing evidence of the implementation of the corrective actions, including details of the actions taken, the results achieved, and challenges encountered.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('For each negative impact, a completion report should be prepared when all corrective actions have been successfully implemented.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Remediation Summary Report of all the remediation completion reports. It should provide a count of the total number of negative impacts and the number that have been successfully remediated.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Independent audit reports (if applicable) could provide third-party verification of the successful remediation of the negative impacts. These reports should include a detailed assessment of the effectiveness of the corrective actions and the extent of the remediation. This may not be applicable if an independent audit is not feasible or necessary.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Testimonials or statements from impacted parties (if applicable), including affected groups and other relevant parties, could provide additional evidence of the successful remediation of the negative impacts. This may not be applicable if impacted parties are not available or willing to provide testimonials.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Any legal documents (if applicable) related to the negative impacts, such as court rulings or settlement agreements, could provide further evidence of the level of attribution and the successful remediation of the impacts. This may not be applicable if there are no legal proceedings related to the negative impacts.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Internal records (if applicable), such as meeting minutes, emails, or memos, could provide additional evidence of the actions taken to remediate the negative impacts. This may not be applicable if internal records are not kept or are not relevant to the remediation process.')] },
    ],
    definitions: [
      { _key: k(), term: 'Severe negative impact', body: [p('is one that causes significant and lasting harm to individuals or communities such as serious injury, loss of life, child labor, forced labor, discrimination, and displacement.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On identifying level of Attribution',
        headingFootnote: { _type: 'reference', _ref: 'bib-131' },
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
  console.log('  ✓ HRa1.4')
}

run().catch((err) => { console.error(err); process.exit(1) })
