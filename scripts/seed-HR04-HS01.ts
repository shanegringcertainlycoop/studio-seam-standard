/**
 * Seeds Objective HR04 (Human Rights Awareness, 2 activities) and
 * Objective HS01 / Concept HS (Health + Safety, 4 activities).
 * Final batch — completes the SEAM Standard.
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

async function run() {
  console.log('Patching Objective HR04...')
  await client.patch('objective-HR04').set({
    headlineGoal: "Promote human rights advocacy in commercial real estate through continuous education and awareness to increase respect for impacted parties’ rights.",
    narrative: [
      pWithBib('“Human rights education constitutes an essential contribution to the long-term prevention of human rights abuses and represents an important investment in the endeavor to achieve a just society in which all human rights of all persons are valued and respected', '179', '.”'),
      p('SEAM recognizes that upholding human rights is not a passive act but requires continuous education and awareness. It acknowledges that understanding and upholding these rights goes beyond mere compliance; it necessitates a deep-rooted commitment to ongoing learning and consciousness-raising.'),
      p('With Activities focused on investing in regular employee training sessions, projects can equip employees with the knowledge and tools to identify, prevent, and address potential human rights infringements. By actively sharing lessons learned and best practices, projects can foster a culture of collaboration and continuous improvement within the industry. This positions them as leaders in human rights advocacy and contributes to raising the overall industry standards.'),
    ],
  }).commit()

  console.log('Patching Concept HS...')
  await client.patch('concept-HS').set({
    headlineGoal: 'Everyone deserves a built environment free from hazards that are likely to cause harm.',
    summary: [
      pWithBib('The notion that everyone has a right to live and work in spaces free from avoidable hazards has developed over time as an ethical imperative in modern societies. A significant body of research links poor health, injury, and death to the unhealthy and unsafe environments where people live and work. The ILO reports that approximately 1 in 6 fatalities reported globally are in the construction industry', '180', '. However, these fatalities, along with injuries from unsafe working conditions and occupational disease from exposure to hazards, are preventable.'),
      p('In the last decade, there has been a growing recognition of the broader impacts of the built environment on health and wellness. Research has shown that factors such as air quality, access to green spaces, and building design can significantly influence physical and mental health. This research has led to developing evidence-based building standards and certifications, from health and wellness standards like WELL Building and Fitwel to environmental standards such as LEED and BREEAM, which promote health and sustainability in building design and operation.'),
      p('Studies show that features like sanitation systems, fire sprinklers, and hazard warnings all quantifiably reduce harm and promote well-being. There is sufficient evidence that thoughtfully implemented measures using research to guide evidence-based strategies can significantly improve societal health and safety.'),
    ],
  }).commit()

  console.log('Patching Objective HS01...')
  await client.patch('objective-HS01').set({
    headlineGoal: 'Ensure a safe, healthy built environment that contributes to impacted party wellbeing.',
    narrative: [
      p('The built environment profoundly affects physical health, mental well-being, and overall quality of life. Because of this intrinsic relationship between the built environment and the holistic well-being of its occupants and surrounding communities, SEAM integrates strategies rooted in scientific research to optimize the health, safety, and wellness of building occupants and surrounding communities.'),
      pWithBib('Research consistently highlights the critical importance of safety measures on job sites, building structural integrity, and space design to ensure the well-being of occupants and the broader community. Implementing stringent safety protocols on job sites significantly reduces the risk of accidents and injuries. The Occupational Safety and Health Administration (OSHA) in the United States emphasizes the necessity of adhering to safety standards and providing workers with the training and equipment needed to navigate the inherent risks of construction work', '184', '. This commitment to safety protects workers and minimizes the negative impacts associated with workplace accidents.'),
      pWithBib('The safety of built structures is equally crucial. The International Building Code (IBC) provides a comprehensive framework for ensuring that buildings can withstand environmental stresses and are safe for occupancy', '185', '. Adherence to these codes ensures that structures are not only physically safe but also contribute to the health and safety of their occupants by incorporating fire safety measures, emergency exits, and accessibility features.'),
      pWithBib('Additionally, incorporating safety, health, and well-being into the design can positively impact communities. Well-planned urban spaces incorporating Crime Prevention Through Environmental Design (CPTED) principles can significantly reduce crime rates and enhance community safety', '186', '. Features such as adequate lighting, visibility, natural surveillance, community engagement, and ownership of public spaces foster environments where safety and social well-being are intertwined.'),
      p('Integrating strategies rooted in scientific research aims to ensure that buildings and spaces are safe, health-promoting, and conducive to well-being.'),
    ],
  }).commit()

  console.log('Seeding master bibs...')
  // Healthy-building cert standards (HSa1.1 referenced sources)
  for (const [id, citation] of [
    ['bib-well-building', 'WELL Building Standard'],
    ['bib-fitwel-cert', 'Fitwel Certification System®'],
    ['bib-ul-healthy-building', 'UL Verified Healthy Building for Indoor Environment'],
    ['bib-nabers-ie', 'NABERS Indoor Environment'],
    ['bib-reset-air', 'RESET Air Standard'],
    ['bib-ilo-c167', 'ILO Safety and Health in Construction Convention (C167, 1988)'],
    ['bib-ilo-c155', 'ILO Occupational Safety and Health Convention (C155, 1981)'],
    ['bib-ilo-c161', 'ILO Occupational Health Services Convention (C161, 1985)'],
    ['bib-ilo-c174', 'ILO Prevention of Major Industrial Accidents Convention (C174, 1993)'],
    ['bib-ilo-c187', 'ILO Promotional Framework for OSH Convention, 2006 (No. 187)'],
    ['bib-us-osha', 'US Department of Labor OSHA'],
    ['bib-iso-45001', 'ISO 45001:2018 Occupational Health and Safety'],
  ] as const) {
    await client.createOrReplace({ _id: id, _type: 'bibliographyEntry', citation })
  }

  // ─── HRa4.1 Training on human rights ─────────────────────────────────────
  console.log('\nSeeding HRa4.1...')
  await client.createOrReplace({
    _id: 'activity-HRa4-1', _type: 'activity',
    activityId: 'HRa4.1', title: 'Conduct education and training sessions on human rights standards for relevant procurement employees',
    slug: { _type: 'slug', current: 'hra4-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR04' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p("The Owner shall facilitate training sessions specifically tailored for procurement employees, focusing on the principles of human rights, as stipulated by the UN Guiding Principles on Business and Human Rights. This includes understanding the business's duty to respect human rights, the role of due diligence, and the importance of remediation processes. Excluded from this scope are training sessions aimed at non-procurement staff and topics not directly related to human rights or ethical procurement.")],
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [
        {
          _type: 'requirementItem', _key: k(), number: 1,
          body: [p('An education and training session on human rights standards covering the following curriculum:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('the operational implications of the duty to respect human rights, including due diligence, impact assessment, and integration of findings')] },
            { _key: k(), letter: 'b', body: [p('the need for access to effective remedy when negative human rights impacts occur')] },
            { _key: k(), letter: 'c', body: [p('detailed exploration of issues like non-discrimination, economic, social, and cultural rights, and fundamental principles and rights at work')] },
          ],
        },
        { _type: 'requirementItem', _key: k(), number: 2, body: [p('All procurement employees, including new hires, undergo the training.')] },
        { _type: 'requirementItem', _key: k(), number: 3, body: [p('All training participants must be present for 100% of the training session.')] },
        {
          _type: 'requirementItem', _key: k(), number: 4,
          body: [p('Assessment in one of the following ways:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('Option 1 - implement post-training assessments to gauge understanding and retention of the material')] },
            { _key: k(), letter: 'b', body: [p('Option 2 - training shall assess participant competency through formative assessment – interactive, practical exercise-based training delivery indicating participant competence across key learning outcomes.')] },
          ],
        },
        { _type: 'requirementItem', _key: k(), number: 5, body: [p('Records of all training sessions, attendees, and assessment results.')] },
      ],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of Owner procurement employees assigned to the project that were trained on human rights standards. The first context indicator is the total number of trained Owner employees. The second context indicator is the total number of training hours during the review period.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the total number of employees assigned to the project.', 'number', 1),
            li('Determine the number of employees that were trained according to the requirements.', 'number', 1),
            li('Calculate the percentage of procurement employees trained.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (ET / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of procurement employees trained' },
            { symbol: 'ET', meaning: 'total number of employees that were trained according to the requirements' },
            { symbol: 'N', meaning: 'total number of employees assigned to the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('For critical and sensitive topics like human rights, best practice is to aim for 100% participation.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Procurement Employees Trained',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '34 - 66% of procurement employees trained' },
          { _key: k(), pointsLabel: '2 points', criterion: '67 - 89% of procurement employees trained' },
          { _key: k(), pointsLabel: '3 points', criterion: '90 - 100% of procurement employees trained' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Training Curriculum and Materials that details the topics covered as specified in Requirement 1 and copies of presentations, handouts, case studies, or any other materials distributed during the training sessions.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Attendance Record for the training. This could be a sign-in sheet or digital attendance log, pictures taken during the training, and any other documentation of evidence that shows all participants were present for 100% of the training as stated in Requirement 3.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Assessment Results conducted after the training for Option 1 OR copies of formative assessment results showing participant competence across key learning outcomes for Option 2. These results should clearly indicate the practical exercises that were performed, the outcomes, and the individual scores or grades as applicable.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Participant List for the training including name, company, and role to cross-verify with the attendance and assessment records and provide the ability to track the number of companies represented during the training. This list shall be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Project Team Records including project planning documents, contracts, or other records demonstrating the total number of project team members.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Training Feedback Forms for the training. This is an optional but good practice to collect feedback from participants about the training quality, content, and delivery.')] },
    ],
    guidance: [{
      _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
      body: [
        li('OHCHR Training and Education Materials: The United Nations Office of the High Commissioner for Human Rights offers a range of training materials and publications on human rights topics, including business and human rights.'),
        li('Business & Human Rights Resource Centre Tools & Guidance: This center provides a collection of tools, guidance materials, and best practices for businesses to respect and support human rights.'),
        li('Institute for Human Rights and Business (IHRB) Guidance and Tools: The IHRB provides various resources, including guidance on human rights training for businesses.'),
        li('The Global Business Initiative on Human Rights (GBI) Tools and Insights: The GBI offers tools, case studies, and insights to help businesses integrate human rights into their operations.'),
        li('ILO Training Modules on Labour Standards: The International Labour Organization provides training modules on labor standards, which include aspects of human rights relevant to businesses.'),
      ],
    }],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000-2021' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa4.1')

  // ─── HRa4.2 Educational sessions externally ─────────────────────────────
  console.log('\nSeeding HRa4.2...')
  await client.createOrReplace({
    _id: 'activity-HRa4-2', _type: 'activity',
    activityId: 'HRa4.2', title: 'Conduct educational sessions to share lessons learned + best practices on Human Rights in the commercial real estate industry',
    slug: { _type: 'slug', current: 'hra4-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HR' },
    objective: { _type: 'reference', _ref: 'objective-HR04' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p("The Owner shall organize and facilitate educational sessions to share insights and lessons learned from undergoing the SEAM Certification process, focusing on Human Rights practices within the commercial real estate sector. Sessions shall highlight challenges faced, adopted best practices, and human rights initiatives' tangible impacts. This scope excludes presentations, training, and sessions not directly related to human rights.")],
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [
        {
          _type: 'requirementItem', _key: k(), number: 1,
          body: [p('An education and training session on human rights covering the following curriculum:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('the operational implications of the duty to respect human rights, including due diligence, impact assessment, and integration of findings')] },
            { _key: k(), letter: 'b', body: [p('challenges faced and best practices adopted')] },
            { _key: k(), letter: 'c', body: [p('tangible impacts of human rights initiatives')] },
          ],
        },
        { _type: 'requirementItem', _key: k(), number: 2, body: [p('Educational session must be presented to an external commercial real estate industry or related audience not associated with the project. Educational sessions can take the form of in-person or virtual presentations and encourage interactive discussions with Questions and Answers portion to enhance understanding.')] },
        { _type: 'requirementItem', _key: k(), number: 3, body: [p('Records of all training sessions, including dates, formats, content, and number of attendees.')] },
      ],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the number of hours of educational sessions conducted on human rights in the commercial real estate industry according to the requirements. The context indicator is the total number of people educated on human rights in the commercial real estate industry.')],
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Hours of educational sessions conducted',
        bands: [
          { _key: k(), pointsLabel: '3 points', criterion: '1 hour of educational sessions conducted' },
          { _key: k(), pointsLabel: '4 points', criterion: '2 hours of educational sessions conducted' },
          { _key: k(), pointsLabel: '5 points', criterion: '3 hours of educational sessions conducted' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Detailed agendas for each session, outlining the topics covered, speakers, duration, and any other relevant details.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Sign-in sheets, digital check-ins, or other methods to record the number of participants in each session.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Copies of presentations, handouts, reading materials, and any other resources provided during the sessions.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p("Session recordings (if applicable) can serve as evidence of the session's content and delivery.")] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Post-session feedback forms (if available) filled out by participants, providing insights into the effectiveness and relevance of the sessions.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Copies of emails, flyers, or other promotional materials used to invite or inform participants about the sessions.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Summaries or reports created after each session (if applicable), detailing key takeaways, questions raised, areas of improvement, and any other notable observations.')] },
    ],
    guidance: [{
      _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
      body: [
        li('OHCHR Training and Education Materials: The United Nations Office of the High Commissioner for Human Rights offers a range of training materials and publications on human rights topics, including business and human rights.'),
        li('Business & Human Rights Resource Centre Tools & Guidance: This center provides a collection of tools, guidance materials, and best practices for businesses to respect and support human rights.'),
        li('Institute for Human Rights and Business (IHRB) Guidance and Tools: The IHRB provides various resources, including guidance on human rights training for businesses.'),
        li('The Global Business Initiative on Human Rights (GBI) Tools and Insights: The GBI offers tools, case studies, and insights to help businesses integrate human rights into their operations.'),
        li('ILO Training Modules on Labour Standards: The International Labour Organization provides training modules on labor standards, which include aspects of human rights relevant to businesses.'),
      ],
    }],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000-2021' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HRa4.2')

  // ─── HSa1.1 Healthy building certification ──────────────────────────────
  console.log('\nSeeding HSa1.1...')
  await client.createOrReplace({
    _id: 'activity-HSa1-1', _type: 'activity',
    activityId: 'HSa1.1', title: 'Enhance human health and wellness for occupants of the property through a science-based system of strategies',
    slug: { _type: 'slug', current: 'hsa1-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HS' },
    objective: { _type: 'reference', _ref: 'objective-HS01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall ensure occupant health and wellness by applying evidence-based strategies aligned with an internationally recognized and accepted standard and demonstrate compliance through an official certification.')],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [{
          _type: 'requirementItem', _key: k(), number: 1,
          body: [p('Demonstrate the development of healthier building environments through compliance with one of the following:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('WELL Building Standard Bronze or Silver certification')] },
            { _key: k(), letter: 'b', body: [p('WELL Building Standard Health and Safety Rating')] },
            { _key: k(), letter: 'c', body: [p('Fitwel 1 Star certification')] },
            { _key: k(), letter: 'd', body: [p('UL Verified Healthy Building for Indoor Environment certification')] },
            { _key: k(), letter: 'e', body: [p('NABERS Indoor Environment certification')] },
            { _key: k(), letter: 'f', body: [p('RESET Air certification')] },
          ],
        }],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [{
          _type: 'requirementItem', _key: k(), number: 2,
          body: [p('Demonstrate higher levels of healthier building environments through compliance with one of the following:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('WELL Building Standard Gold certification')] },
            { _key: k(), letter: 'b', body: [p('Fitwel 2 Star certification')] },
          ],
        }],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [{
          _type: 'requirementItem', _key: k(), number: 3,
          body: [p('Demonstrate the highest level of healthier building environments through compliance with one of the following:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('WELL Building Standard Platinum certification')] },
            { _key: k(), letter: 'b', body: [p('Fitwel 3 Star certification')] },
          ],
        }],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of healthy building certification points achieved, quantifying the extent to which a space has satisfied the requirements set forth by a healthy building certification program. The context indicator is the total number of building occupants.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the number of points the project earned under the certification program.', 'number', 1),
            li('Identify the total points available under the certification program.', 'number', 1),
            li('Calculate the percentage of healthy building certification points achieved.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (E / N) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of healthy building certification points achieved' },
            { symbol: 'E', meaning: 'number of points earned under the certification program' },
            { symbol: 'N', meaning: 'total number of points available under the certification program' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Healthy Building Certification Points',
        bands: [
          { _key: k(), pointsLabel: '3 points', criterion: '20 – 40% certification points' },
          { _key: k(), pointsLabel: '6 points', criterion: '41 - 64% certification points or achievement of requirement #1' },
          { _key: k(), pointsLabel: '9 points', criterion: '65 - 79% certification points' },
          { _key: k(), pointsLabel: '12 points', criterion: '80 - 100% certification points' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Official active certification document from a recognized healthy buildings standard that includes official approved record of points achieved.')] },
    ],
    guidance: [{
      _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
      body: [
        li('WELL Building Standard - WELL is an evidence-based roadmap for applying the WELL Building Standard to support the health and well-being of your people and your organization.'),
        li("Fitwel - Fitwel is the world's leading certification system committed to building health for all®."),
        li("UL Verified Healthy Building for Indoor Environment - This is the most holistic look at a building’s indoor environment, assessing indoor air quality (IAQ) and water quality as well as building cleanliness, lighting and acoustics."),
        li('NABERS Indoor Environment - A NABERS Indoor Environment (IE) rating measures the indoor air quality, lighting quality, temperature, and thermal comfort as well as acoustic quality of a building.'),
        li('RESET Air - The RESET Air Standard is a data standard for air quality monitoring.'),
      ],
    }],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-well-building' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-fitwel-cert' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ul-healthy-building' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-nabers-ie' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-reset-air' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HSa1.1')

  // ─── HSa1.2 Safeguard community health, safety, wellness ────────────────
  console.log('\nSeeding HSa1.2...')
  await client.createOrReplace({
    _id: 'activity-HSa1-2', _type: 'activity',
    activityId: 'HSa1.2', title: 'Safeguard community health, safety, and wellness',
    slug: { _type: 'slug', current: 'hsa1-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HS' },
    objective: { _type: 'reference', _ref: 'objective-HS01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner shall assess and aim to eliminate negative impacts its operations may have on the surrounding areas. If they cannot do so, they should mitigate the effects of disruptive and harmful activities in residential and other community areas.')],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [{
          _type: 'requirementItem', _key: k(), number: 1,
          body: [p('Based on the findings from the Social Impact Management Plan (SIMP) from Activity IAa2.5, develop prevention or mitigation plans for community impacted parties if the performance indicator ‘percentage of negative impacts prevented or mitigated’ in Activity IAa2.3 is less than 100%. These plans should include, but not limited to, the following actions if they have not been addressed in the SIMP:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('Continuous monitoring of pollution output, equipment installation in affected communities for residents to monitor pollution levels (if applicable).')] },
            { _key: k(), letter: 'b', body: [p('Ensuring the security program complies with the Voluntary Principles on Security and Human Rights and does not negatively impact human rights (see Additional Resources below).')] },
            { _key: k(), letter: 'c', body: [p('Enhancing safety around the property through measures like surveillance cameras, well-lit areas, and safe pedestrian pathways and crossings.')] },
          ],
        }],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [{
          _type: 'requirementItem', _key: k(), number: 2,
          body: [p('Incorporation of at least two of the following within the project:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('A design element following the Crime Prevention through Environmental Design (CPTED) principles.')] },
            { _key: k(), letter: 'b', body: [p('Health and wellness facilities such as gyms, yoga studios, mental health clinics or counseling centers, and/or wellness centers to promote mental and physical health.')] },
            { _key: k(), letter: 'c', body: [p('Community engagement space for community meetings, workshops, and/or events to promote community engagement and provide venues for educational and cultural programs.')] },
            { _key: k(), letter: 'd', body: [p("Space for local businesses, farmers' markets, and/or artisanal shops to support local economies and provide communities with fresh, local products.")] },
            { _key: k(), letter: 'e', body: [p('Space for cultural and artistic events to provide opportunities for artistic expression.')] },
            { _key: k(), letter: 'f', body: [p('Space for clinics, pharmacies, and other healthcare facilities to ensure that community members have easy access to medical care.')] },
            { _key: k(), letter: 'g', body: [p('Space for educational institutions, training centers, and/or libraries to promote lifelong learning and skill development.')] },
          ],
        }],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [{
          _type: 'requirementItem', _key: k(), number: 3,
          body: [p('Incorporation of at least one of the following within the project:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('Transportation hub or close proximity to public transportation to reduce the reliance on cars, decrease traffic congestion, and promote eco-friendly transportation methods.')] },
            { _key: k(), letter: 'b', body: [p("Public art and/or murals to enrich the community's cultural life.")] },
            { _key: k(), letter: 'c', body: [p('Affordable housing options in commercial properties to address housing shortages and ensure that all community members have access to safe and secure housing.')] },
            { _key: k(), letter: 'd', body: [p('Mixed-use properties that combine residential, commercial, and recreational spaces to reduce the need for long commutes, promote walking, and create a sense of community.')] },
            { _key: k(), letter: 'e', body: [p('Green spaces, gardens, and landscaping to provide areas for relaxation, exercise, and social interaction. Green spaces can also improve air quality and reduce urban heat islands.')] },
          ],
        }],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is the percentage of mitigated community impacts (as confirmed by impacted parties). The first context indicators is the amount of financial expenditures on mitigation activities (including equivalent value of resources invested or donated). The second context indicator is the number of staff hours spent on mitigation activities. The third context indicator is the number of negative community impacts identified.')],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Identify the total number of identified negative impacts.', 'number', 1),
            li('Determine the number of impacts successfully mitigated by the end of the project to the satisfaction of impacted parties.', 'number', 1),
            li('Calculate the percentage of negative impacts successfully prevented or mitigated.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (M / T) x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of mitigated impacts' },
            { symbol: 'M', meaning: 'total number of impacts mitigated' },
            { symbol: 'T', meaning: 'total number of negative impacts expected or discovered' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('Successful prevention or mitigation of 100% of identified negative impacts is the objective to avoid harm.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Mitigated Impacts',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '51-74% of negative impacts mitigated successfully' },
          { _key: k(), pointsLabel: '3 points', criterion: '75-99% of negative impacts mitigated successfully' },
          { _key: k(), pointsLabel: '4 points', criterion: '100% of negative impacts mitigated successfully' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'minimum 2 criteria from requirement #2' },
          { _key: k(), pointsLabel: '+1 point', criterion: 'minimum 1 criterion from requirement #3' },
          { _key: k(), pointsLabel: '+1 point each up to 3', criterion: 'each additional criterion from requirements #2 + #3, up to 3 points' },
        ],
      },
      additionalPointsEligibility: [p('Projects achieving 3 or 4 points are eligible for additional points as follows:')],
      additionalPointsLogic: 'sum',
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A copy of the Social Impact Management Plan (SIMP) detailing the prevention or mitigation plans.')] },
      {
        _type: 'documentationItem', _key: k(), number: 3,
        body: [p('Evidence of SIMP implementation, such as action logs, progress reports, or meeting minutes which could include the following:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('Pollution monitoring reports showing the levels of pollutants over time.')] },
          { _key: k(), letter: 'b', body: [p('Receipts or installation certificates for equipment installed in affected communities for monitoring pollution.')] },
          { _key: k(), letter: 'c', body: [p('A copy of the security program.')] },
          { _key: k(), letter: 'd', body: [p('Evidence of compliance with the Voluntary Principles on Security and Human Rights, such as audit reports or third-party assessments.')] },
          { _key: k(), letter: 'e', body: [p('Installation receipts or certificates for surveillance cameras, lighting systems, and pedestrian pathways.')] },
          { _key: k(), letter: 'f', body: [p('Safety audit reports or assessments.')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Construction drawings or As-Built drawings showing allocated spaces for special uses identified in requirements #2 and #3.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Lease agreements or contracts with Tenants of special use space identified in requirements #2 and #3.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Impacted Party feedback reports or surveys confirming the successful mitigation of identified impacts.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Financial statements or receipts detailing expenditures on initiatives.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Documentation of resources invested or donated, with equivalent financial value.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Timesheets, work logs, or project management software exports showing the number of staff hours spent on initiatives.')] },
    ],
    guidance: [{
      _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
      body: [li('Voluntary Principles on Security and Human Rights - a set of principles that guides companies on how to conduct their security operations while respecting human rights. Available online: https://www.voluntaryprinciples.org')],
    }],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HSa1.2')

  // ─── HSa1.3 Jobsite health & safety ─────────────────────────────────────
  console.log('\nSeeding HSa1.3...')
  await client.createOrReplace({
    _id: 'activity-HSa1-3', _type: 'activity',
    activityId: 'HSa1.3', title: 'Provide safe and healthy jobsites and prevent work-related injury and ill health by eliminating hazards and minimizing occupational health & safety risks',
    slug: { _type: 'slug', current: 'hsa1-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HS' },
    objective: { _type: 'reference', _ref: 'objective-HS01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p('The Owner is responsible for establishing and maintaining a safe and healthy working environment on the project site for all workers, including those employed by suppliers and contractors, during both construction (B+I) projects and operations (O+M) projects. This activity involves identifying, assessing, and mitigating occupational health and safety risks in compliance with the highest applicable health and safety standards—whether national, regional, or international—that provide the greatest level of protection to workers. The scope includes jobsite activities directly related to the project, as well as transportation to and from the site when required for the project. External factors beyond the Owner’s control and activities unrelated to the project site are excluded.')],
    requirementsSectionFootnote: { _type: 'reference', _ref: 'bib-187' },
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [
        { _type: 'requirementItem', _key: k(), number: 1, body: [p('A requirement to comply with health and safety standards shall be included in the Owner’s terms of contract with suppliers and contractors.')] },
        { _type: 'requirementItem', _key: k(), number: 2, body: [p('Owner shall verify that jobsite workers receive adequate and appropriate training for carrying out all work safely, including information about workplace dangers and the risks of mishandling substances, equipment, or machinery, in a way the workers can understand.')] },
        { _type: 'requirementItem', _key: k(), number: 3, body: [p('Owner shall confirm that jobsite employers provide, at no cost to workers, appropriate personal protective equipment and clothing required for performing work safely.')] },
        { _type: 'requirementItem', _key: k(), number: 4, body: [p('Owner shall require that jobsite employers provide safe and suitable transportation for its workers, including those recruited and transported to the job location and provide suitable overnight housing, medical assistance, and meals during the trip, if applicable.')] },
        {
          _type: 'requirementItem', _key: k(), number: 5,
          body: [p('Owner shall confirm that jobsite employers provide the following to jobsite workers who work under unavoidably negative working conditions:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('free and independent medical examinations and health services to all workers who are exposed to hazardous substances or conditions in the workplace including providing vaccination, preventive health measures such as malaria prophylaxis, etc.')] },
            { _key: k(), letter: 'b', body: [p('notification to all workers of all existing dangers in advance of employment')] },
            { _key: k(), letter: 'c', body: [p('emergency procedures are made readily accessible to the workers at all times')] },
          ],
        },
        { _type: 'requirementItem', _key: k(), number: 6, body: [p('Owner shall require jobsite employers to follow industry-appropriate health and safety guidelines which meet international health and safety standards, or the standards of the state of operations, whichever are most protective, including maintaining the safe condition of equipment and working environment to prevent workplace hazards and accidents and verification of regular inspections.')] },
        { _type: 'requirementItem', _key: k(), number: 7, body: [p('Owner shall verify that jobsite employer establishes first aid and emergency preparedness measures for workplace accidents, and ensures that workers are trained to use them, so they can immediately respond to any safety and health-related accidents.')] },
        { _type: 'requirementItem', _key: k(), number: 8, body: [p('The Project has a grievance mechanism for handling worker complaints about health-related issues, which includes the possibility of making confidential and anonymous complaints, which management investigates and resolves in a timely manner.')] },
      ],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the injury incidence rate. The context indicator is the total number of safety incidents reported.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [p('The performance indicator is calculated as follows (Total incidence rate is a measure established by OSHA.):')],
          formula: '(Number of injuries and illnesses X 200,000) / Worker hours worked = Incidence rate',
          variables: [
            { symbol: '200,000', meaning: 'is the base for 100 full-time workers (working 40 hours per week, 50 weeks per year)' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'All requirements must be satisfied in addition to the total injury incidence rate.',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Points Assignment',
        bands: [
          { _key: k(), pointsLabel: 'Compliant', criterion: 'Total injury incidence rate is 3.0 or below' },
          { _key: k(), pointsLabel: 'Non-Compliant', criterion: 'Total injury incidence rate is 3.1 or higher' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Contracts with suppliers and contractors reflecting compliance with health and safety standards.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Details of health and safety training provided to jobsite workers, including topics covered, dates, and attendees.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Records of Personal Protective Equipment (PPE) provided to workers, including type, date, and recipient.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Details of transportation, housing, medical assistance, and meals provided to workers during trips.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation of medical examinations and health services provided to workers exposed to hazardous conditions, including type of examinations, dates, and findings. Records must be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Notification records informing workers of existing dangers before employment.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Documentation or guidelines detailing emergency response procedures, and evidence of their accessibility to workers.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Documentation of health and safety guidelines followed, including inspection records.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Details of training provided to workers on first aid and emergency response.')] },
      { _type: 'documentationItem', _key: k(), number: 11, body: [p('Grievance mechanism records detailing complaints received, investigations conducted, and resolutions, and the timeframe within which resolutions were reached.')] },
      { _type: 'documentationItem', _key: k(), number: 12, body: [p('Detailed logs of all workplace injuries and illnesses, including circumstances, date, and nature of the injury. Records must be GDPR compliant.')] },
      { _type: 'documentationItem', _key: k(), number: 13, body: [p('Records showing total number of hours worked by all workers during project period.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On the project-related total injury incidence rate',
        body: [
          p('The total injury incidence rate is a mathematical calculation that describes the number of recordable incidents that a project experiences per 100 full-time workers in any given time frame. Recordable incidents are injuries or illnesses resulting from exposure or an event in the project workplace that requires some medical treatment or first-aid.'),
          p('A workplace is defined as the project work environment, such as the premises of the property within the scope of this certification. Driving to or from the project is usually considered work-related if the company requires the worker to drive or be transported to a specific location for a particular business purpose.'),
          p('Additional Resources'),
          li('United States Department of Labor, Occupational Safety and Health Administration (OSHA) – source for training and information on workplace health and safety.'),
          li('ISO 45001:2018, Occupational Health and Safety – ISO’s international standard for occupational health and safety'),
          li('The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Workplace Health and Safety'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-icescr-1966' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c167' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c155' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c161' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c174' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c187' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-us-osha' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-45001' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HSa1.3')

  // ─── HSa1.4 Structural integrity + fire safety ──────────────────────────
  console.log('\nSeeding HSa1.4...')
  await client.createOrReplace({
    _id: 'activity-HSa1-4', _type: 'activity',
    activityId: 'HSa1.4', title: 'Provide safe and secure structure of all occupiable spaces by ensuring structural integrity and compliance with fire safety',
    slug: { _type: 'slug', current: 'hsa1-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-accountability' },
    concept: { _type: 'reference', _ref: 'concept-HS' },
    objective: { _type: 'reference', _ref: 'objective-HS01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [p("The Owner shall ensure the structural integrity and safety of all occupiable spaces within the project. This entails rigorous adherence to established structural standards, and the implementation of measures to ensure compliance with fire safety standards for occupants, addressing both internal building elements and external factors that can influence the safety of the building's occupants. Safety elements other than structural integrity and fire safety are outside the scope of this Activity.")],
    requirements: [{
      _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
      items: [
        { _type: 'requirementItem', _key: k(), number: 1, body: [p('All construction projects must comply with the nationally recognized and enforced building code of the respective country or region where the project is located.')] },
        {
          _type: 'requirementItem', _key: k(), number: 2,
          body: [p('Project shall undergo an independent, third-party structural and fire safety audit, if applicable, to verify compliance with both national and international building safety standards. The audit should be comprehensive, covering all aspects of structural integrity and fire safety (see Guidelines below on additional Requirements in cases of audit). The criteria for requiring an audit are as follows:')],
          subItems: [
            { _key: k(), letter: 'a', body: [p('projects located in regions with a Corruption Perception Index (CPI) score below 50 on the Transparency International scale (https://www.transparency.org/en/cpi/2022); OR')] },
            { _key: k(), letter: 'b', body: [p('projects located in regions with a documented incidence rate exceeding 0.5% for building collapses, fires, or other related incidents in the past five years (see Guidance below)')] },
          ],
        },
        { _type: 'requirementItem', _key: k(), number: 3, body: [p("Continuous monitoring and periodic re-evaluation of the building's safety standards, especially after significant events like earthquakes, floods, or other natural disasters.")] },
        { _type: 'requirementItem', _key: k(), number: 4, body: [p('Comprehensive documentation of adherence to the national building code, any additional safety measures implemented, third-party audit reports, and any incidents or deviations from the standard. This documentation should be readily available for review upon request.')] },
      ],
    }],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [p('The performance indicator is compliance with safety and structural integrity standards as verified by a qualified inspector. The context indicator is total number of allowed building occupants for the project.')],
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Points Assignment',
        bands: [
          { _key: k(), pointsLabel: 'Compliant', criterion: 'All occupiable spaces within the building meet the defined safety and structural standards in the Requirements.' },
          { _key: k(), pointsLabel: 'Non-Compliant', criterion: 'Any occupiable space within the building does not meet the defined safety and structural standards in the Requirements.' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A certificate of occupancy or equivalent official document, with a valid date, indicating that the construction project or operating property complies with the nationally recognized and enforced building code of the respective country or region.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Relevant building permits, licenses, or other official documents that indicate compliance with local and national building and safety codes.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p("Documentation of evaluations conducted post significant events to assess the building's safety and any necessary corrective measures if , otherwise a formal statement or document indicating that Owner shall ensure continuous monitoring and periodic re-evaluation of the building's safety standards, especially after significant events like earthquakes, floods, or other natural disasters.")] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('A formal statement or document indicating that all the above documentation is maintained and will be made available for review upon request.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Comprehensive report detailing the findings of the third-party, independent audit, including any areas of non-compliance and recommendations for corrective actions.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Detailed structural report by a licensed structural engineer confirming the structural safety of the building, especially after significant events like earthquakes or floods.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Fire safety report by a licensed architect or fire safety specialist detailing the fire safety measures in place and their compliance with recognized standards.')] },
      { _type: 'documentationItem', _key: k(), number: 9, body: [p('Results from physical tests conducted on structural elements, materials, and systems to ensure they meet or exceed safety standards.')] },
      { _type: 'documentationItem', _key: k(), number: 10, body: [p('Detailed reports of any safety-related incidents that occurred during the construction or operation of the building, including corrective actions taken.')] },
      { _type: 'documentationItem', _key: k(), number: 11, body: [p('Documentation outlining the safety protocols and procedures followed during construction and operation.')] },
      { _type: 'documentationItem', _key: k(), number: 12, body: [p('Records of safety training provided to construction workers, staff, and other relevant personnel, including topics covered and attendees.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On requirements of Structural and Fire Safety Audit',
        body: [
          p('These requirements are mandatory only when projects meet one of the two criteria for audit in Requirement #2.'),
          p('This section provides guidance on conducting a comprehensive structural and fire safety audit. It is designed to ensure that buildings adhere to internationally recognized safety standards, particularly in regions where adherence to building safety codes may vary due to varied factors.'),
          li('Scope of the Audit shall include the following:', 'number', 1),
          li('Structural integrity of the building', 'bullet', 2),
          li('Fire safety measures, including fire exits, fire alarms, sprinkler systems, and other related infrastructure', 'bullet', 2),
          li('Compliance with nationally recognized and enforced building codes', 'bullet', 2),
          li('Auditor Qualifications shall consist of the following:', 'number', 1),
          li('A minimum of a bachelor’s degree in civil engineering, architecture, or related field.', 'bullet', 2),
          li('Must possess a valid license in structural engineering. For fire safety assessment, a licensed architect is mandatory.', 'bullet', 2),
          li('At least seven years of experience in building safety inspections or related fields, with a focus on structural and fire safety.', 'bullet', 2),
          li('Continuous professional development in the areas of structural and fire safety.', 'bullet', 2),
          li('The auditor or auditing firm should have the capability to conduct physical tests on structural elements as required.', 'bullet', 2),
          li('The auditor should have no conflicts of interest with the building owner, management, or any associated impacted parties and should provide a declaration of independence.', 'bullet', 2),
          li('Audit Process shall include the following:', 'number', 1),
          li('Review of building plans, permits, and previous inspection reports.', 'bullet', 2),
          li("A thorough examination of the building's structural elements, fire safety systems, and any potential hazards.", 'bullet', 2),
          li('As required, certain structural elements will undergo physical testing to ensure their integrity and safety.', 'bullet', 2),
          li('Discussions with building management, maintenance personnel, and occupants to understand operational challenges and past incidents.', 'bullet', 2),
          li('Review of all relevant licenses, permits, and maintenance logs.', 'bullet', 2),
          li('Audit Reporting - Upon completion of the audit, a detailed report will be provided, which includes: summary of findings, identified risks and their severity, recommendations for remediation, and a timeline for addressing the identified issues.', 'number', 1),
          li('Remediation shall include:', 'number', 1),
          li('Any critical safety issues identified during the audit that pose an immediate threat must be addressed promptly.', 'bullet', 2),
          li("Recommendations that don't require immediate attention but are essential for long-term safety and compliance.", 'bullet', 2),
          li('Post-Audit Follow-Up shall include:', 'number', 1),
          li('A follow-up inspection will be scheduled to ensure that all recommendations have been implemented.', 'bullet', 2),
          li('Continuous monitoring and periodic re-audits will be recommended for buildings with significant safety concerns.', 'bullet', 2),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On Corruption Perception Index (CPI) and incidence rates thresholds',
        body: [
          p('The CPI scale ranges from 0 (highly corrupt) to 100 (very clean). A score below 50 indicates that a country has a significant corruption problem. In the context of building safety, corruption can lead to shortcuts, the use of substandard materials, and a lack of proper oversight—all of which can compromise the integrity of a structure. By setting the threshold at 50, the intent is to provide additional assurances of building safety in countries where corruption is more likely to influence building practices.'),
          p('More than 0.5% annual incidence rate of building collapses, fires, or other related incidents is indicative of systemic issues in building safety and construction practices. Using a percentage allows for scalability depending on the size and density of the region in question.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On determining national incidence rate for building safety incidents',
        body: [
          p('This guidance assists Owners in determining the incidence rate of building collapses, fires, or other related incidents in their respective countries over the past five years.'),
          li('Research national incidents in the past five years. The following resources can be helpful:', 'number', 1),
          li('official records or databases maintained by national or regional governmental bodies responsible for building safety, construction, or disaster management', 'bullet', 2),
          li('national construction or real estate industry associations often maintain statistics or have access to data regarding building incidents', 'bullet', 2),
          li('national and local news archives for the past five years using keywords like "building collapse," "construction fire," and other related terms', 'bullet', 2),
          li('Compile data gathered data from all sources into a structured format, listing each incident with details like date, location, type of incident, and any known causes or contributing factors.', 'number', 1),
          li('Calculate the Incidence Rate using the formula (Number of Incidents / Total Number of Buildings Constructed in the past five years) x 100.', 'number', 1),
          p('Additional Resources'),
          li('Transparency International – an independent, non-governmental, not-for-profit working in over 100 countries to end the injustice of corruption. Available online: https://www.transparency.org/en/cpi/2022'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-1948' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ HSa1.4')
}

run().catch((err) => { console.error(err); process.exit(1) })
