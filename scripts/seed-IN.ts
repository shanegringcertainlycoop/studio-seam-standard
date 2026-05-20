/**
 * Seeds Concept IN (Social Justice Innovation) + Objectives IN01, IN02
 * + Activities INa1, INa2.
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

function liBold(boldTerm: string, rest: string, level = 1) {
  return { _type: 'richText', _key: k(), style: 'normal', listItem: 'bullet' as const, level,
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

const RATING_ALL: any = {
  _type: 'ratingSystemApplication',
  bi_developer: true, bi_occupier: true, om_developer: true, om_occupier: true, cd: false,
}

async function run() {
  console.log('Patching Concept IN...')
  await client.patch('concept-IN').set({
    headlineGoal: 'The commercial real estate industry can become more culturally responsive and racially just through innovation.',
    summary: [
      pWithBib('Like many sectors, the commercial real estate (CRE) industry has historically been influenced by systemic biases, often reflecting broader societal inequalities. These biases manifest in various ways, from the underrepresentation of marginalized communities in leadership roles to the development projects that may inadvertently perpetuate spatial inequalities. For instance, research from the Urban Land Institute highlights the lack of diversity in the commercial real estate sector, with minoritized groups and women often underrepresented, especially in senior roles', '106', '.'),
      pWithBib('The built environment has a profound impact on communities. Historically, redlining and urban renewal have disproportionately affected communities of color, leading to long-term socio-economic disparities', '107', '. The design and development of commercial spaces can either reinforce these disparities or work towards rectifying them.'),
      p('A culturally responsive and racially just CRE industry is not just a moral imperative but also offers tangible benefits. As society becomes more conscious of social justice issues, businesses and industries prioritizing these values will likely see enhanced reputational benefits and impacted party trust.'),
      pWithBib("Additionally, addressing embodied injustices in the built environment can lead to more inclusive spaces catering to a broader demographic's needs while enhancing the social fabric of communities and leading to economic benefits. For instance, equitable developments can attract diverse Tenants and businesses, potentially leading to more vibrant and economically resilient communities", '108', '.'),
      p('Innovation in the CRE industry should prioritize systemic changes within Owner organizations and tangible changes in the built environment. By designing and executing social justice strategies, the sector can elevate its standards, ensuring that equity is at the forefront of all decisions. Furthermore, by recognizing and addressing embodied injustices in design, developments can actively work towards breaking the cycle of inequity, creating genuinely inclusive spaces that reflect the communities they serve.'),
    ],
  }).commit()

  console.log('Patching Objective IN01...')
  await client.patch('objective-IN01').set({
    headlineGoal: 'Advance industry standards through innovative social justice initiatives in commercial real estate to increase equity and improve social outcomes.',
    narrative: [
      p("In commercial real estate, the potential for industry-wide transformation in adopting processes that increase equity and improve social outcomes lies at the intersection of innovation and social justice. It can play a pivotal role in pioneering strategies to elevate the sector's standards and reputation."),
      p('The core activity under this section is for the Owner to design, implement, and critically evaluate a social justice partnership or program. This initiative should uniquely tailor a specific social justice goal identified collaboratively with impacted parties. The objective is not merely to meet existing benchmarks but to surpass them, setting new industry precedents.'),
      p("In this context, innovation is about introducing new ideas and harnessing them to drive tangible, positive social outcomes. While the SEAM Standard provides a robust framework for social equity in construction and real estate, this section encourages projects to think beyond the established parameters. By addressing novel concepts or strategies not explicitly covered in SEAM or surpassing an existing SEAM Activity's requirement, projects can truly position themselves as trailblazers, leading the charge toward a more just and equitable industry landscape."),
    ],
  }).commit()

  console.log('Patching Objective IN02...')
  await client.patch('objective-IN02').set({
    headlineGoal: 'Advance equitable design within projects to challenge systemic inequities and prioritize the needs and voices of marginalized communities.',
    narrative: [
      p('In commercial real estate, design features can inadvertently perpetuate systemic inequities, often reinforcing power dynamics that disadvantage marginalized communities. The objective of designing for embodied justice seeks to rectify this by ensuring that benefits are distributed fairly, especially to those historically sidelined communities.'),
      p("This approach goes beyond mere tokenism or surface-level adjustments. Instead, it aims for a profound transformation in design thinking, prioritizing inclusivity, accessibility, and community-driven solutions. The ultimate goal is to create design features that don't just address the visible symptoms of inequity but actively work against the entrenched systems that cause them."),
      pWithBib('The Design Justice initiative, a growing movement within the design community, emphasizes the importance of challenging the "standard" design practices that often perpetuate systemic inequities. The Design Justice Network states, "Design justice rethinks design processes, centers people who are normally marginalized by design, and uses collaborative, creative practices to address the deepest challenges our communities face."', '110', ''),
      p('For commercial real estate, innovating through design features must be approached with a critical eye, ensuring they do not inadvertently perpetuate these systemic inequities and reinforce power dynamics that disadvantage marginalized communities.'),
    ],
  }).commit()

  console.log('Seeding master bibs (ISO 26000 2021, UNGP 2011)...')
  await client.createOrReplace({
    _id: 'bib-iso-26000-2021', _type: 'bibliographyEntry',
    citation: 'ISO 26000:2010, Guidance on social responsibility (2021)',
  })
  await client.createOrReplace({
    _id: 'bib-ungp-2011', _type: 'bibliographyEntry',
    citation: 'UN Guiding Principles on Business and Human Rights (2011)',
  })

  // ─── INa1 Social Justice Industry Innovation ────────────────────────────
  console.log('\nSeeding INa1...')
  await client.createOrReplace({
    _id: 'activity-INa1', _type: 'activity',
    activityId: 'INa1',
    title: 'Design and execute a social justice strategy, program, partnership, or initiative that elevates the commercial real estate industry',
    slug: { _type: 'slug', current: 'ina1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-IN' },
    objective: { _type: 'reference', _ref: 'objective-IN01' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p("The Owner shall design, implement, and evaluate a social justice partnership or program that is centered around achieving a specific social justice goal identified by project impacted parties that elevates the industry's standards."),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('The program shall be guided by a defined logic model (see Guide to creating a logic model in Appendix E) outlining the intended outcomes and the steps needed to achieve them. Preference should be placed on leveraging existing resources and processes of the Owner to optimize opportunities to create positive impact.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Raise the commercial real estate industry standards, reputation, and overall quality through introducing innovative technologies and practices, upholding ethical and transparent operations, investing in the professional development of its workforce, and/or encouraging inclusivity and diversity, pushing the industry towards broader excellence and increased impact.')] },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('The program shall include the following criteria', '109', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('measurable and positive impact on the well-being of individuals or communities')] },
              { _key: k(), letter: 'b', body: [p('promotes fairness and equality, ensuring that marginalized or disadvantaged groups are not further marginalized or excluded')] },
              { _key: k(), letter: 'c', body: [p('respects the rights, culture, and dignity of the target community and should be culturally sensitive and appropriate, considering the cultural norms, values, and practices of the target community')] },
              { _key: k(), letter: 'd', body: [p('active participation and engagement of the target population, ensuring that their voices and perspectives are heard and considered')] },
              { _key: k(), letter: 'e', body: [p('collaboration and coordination with relevant impacted parties, such as community organizations, government agencies, and other key actors')] },
              { _key: k(), letter: 'f', body: [p('have mechanisms in place to ensure transparency, accountability, and the responsible use of resources')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('The program should use strategies and methods that are evidence-based and have been proven to work in similar contexts.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('The program should aim to build the capacity of impacted parties and organizations to support and sustain the intervention.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the impacted party satisfaction rate (expressed as a percentage). The context indicators are the indicators identified (as outputs) in the logic model in Requirement #1.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Calculate the average score for each question by adding up all the encoded responses (where 1 = Very Dissatisfied/Not at all Relevant/Very Poor/Not at all/Very Unlikely/Strongly Disagree and 5 = Very Satisfied/Very Relevant/Very Good/Very Well/Very Likely/Strongly Agree) and divide by the total number of responses.', 'number', 1),
              li('Calculate the overall average score by adding up all the average scores for all the questions and dividing by the total number of questions.', 'number', 1),
              li('Calculate the impacted party satisfaction rate (%) by dividing the score by the maximum possible score (which is 5) and multiplying by 100.', 'number', 1),
              p('This is expressed mathematically as:'),
              p('Step 1'),
            ],
            formula: 'a# = R1 + R2 + R3 + … / N',
            variables: [
              { symbol: 'a#', meaning: 'the average score for each question' },
              { symbol: 'R#', meaning: 'the response for the # question (where # is 1 to n, and n is the total # questions)' },
              { symbol: 'N', meaning: 'the total number of responses for the # question' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2')],
            formula: 'A = a1 + a2 + a3 + … / Q',
            variables: [
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: 'a#', meaning: 'the average score for each question (from Step 1)' },
              { symbol: 'Q', meaning: 'the total number of questions' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 3')],
            formula: 'S = (A / 5) x 100',
            variables: [
              { symbol: 'S', meaning: 'satisfaction rate (%)' },
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: '5', meaning: 'maximum possible score' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Satisfaction Rate',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '40-59% satisfaction rate' },
          { _key: k(), pointsLabel: '4 points', criterion: '60-79% satisfaction rate' },
          { _key: k(), pointsLabel: '6 points', criterion: '80-100% satisfaction rate' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #4 satisfied' },
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #5 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
      notes: [
        p('Note:'),
        li('Very Low Satisfaction (0-19%): a very small proportion of impacted parties are satisfied with the program. Immediate action is needed to identify and address the issues causing dissatisfaction. No SEAM points awarded.'),
        li('Low Satisfaction (20-39%): less than half of impacted parties are satisfied with the program. There is significant room for improvement. No SEAM points awarded.'),
        li('Moderate Satisfaction (40-59%): around half of impacted parties are satisfied with the program. While this is not bad, there is still considerable potential for improvement.'),
        li('High Satisfaction (60-79%): a majority of impacted parties are satisfied. The program is generally effective, but there may still be areas to improve.'),
        li('Very High Satisfaction (80-100%): a large majority of impacted parties are satisfied. This is an excellent result, suggesting that the program is very effective in meeting impacted party needs and expectations.'),
      ],
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A detailed logic model that outlines the intended outcomes of the program and the steps needed to achieve them. This should include the top Key Performance Indicators (KPIs) identified as outputs.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Program Design and Implementation Plan detailing how the program meets the criteria of being impactful, equitable, ethical, participatory, collaborative, and accountable. It should include strategies and methods that are evidence-based and have been proven to work in similar contexts (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Evaluation Reports that provide evidence of the positive impact on the well-being of individuals or communities, promotion of fairness and equality, respect for the rights, culture, and dignity of the target community, active participation and engagement of the target population, collaboration and coordination with relevant impacted parties, and transparency, accountability, and the responsible use of resources.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Capacity Building Plan that details how the program aims to build the capacity of local community members and organizations to support and sustain the intervention.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('A copy of the Impacted Party Satisfaction Survey content.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Impacted Party Satisfaction Survey Results used to calculate the impacted party satisfaction rate. The results should include encoded responses that can be used to calculate the average score for each question, the overall average score, and the impacted party satisfaction rate.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On leading edge examples of social justice industry innovation initiatives',
        body: [
          liBold('Commercial affordability', ' - Promote affordable rent and leasing options, especially for small and underrepresented individual-owned businesses, nonprofits, and other organizations that serve marginalized communities.'),
          liBold('Community investment trust', ' - A financial inclusion model that enables community members, particularly those in marginalized or underprivileged areas, to invest in and own a stake in local real estate or other business ventures.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On content of the impacted party engagement',
        body: [
          p('A template for an impacted Party Satisfaction Survey can be found in Appendix D.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000-2021' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ INa1')

  // ─── INa2 Design for Embodied Justice ───────────────────────────────────
  console.log('\nSeeding INa2...')
  await client.createOrReplace({
    _id: 'activity-INa2', _type: 'activity',
    activityId: 'INa2',
    title: 'Address root causes of inequity to prevent reproducing inequitable power relationships through an equitably designed feature within the project',
    slug: { _type: 'slug', current: 'ina2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-IN' },
    objective: { _type: 'reference', _ref: 'objective-IN02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall ensure the design of a feature within the project that equitably distributes benefits, particularly to marginalized communities. This involves actively challenging and addressing root causes of inequity within the design and ensuring that the project does not reproduce or reinforce existing power imbalances. Collaborative and participatory design methods shall be employed, centering the voices and experiences of those traditionally marginalized by design. The project will prioritize inclusivity, accessibility, and community-driven solutions, ensuring the design feature addresses symptoms and tackles systemic inequities at their core.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('The design shall address a significant social issue or problem that is relevant to the target population as identified during the impacted party engagement in Activity IAa2.2.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('The design feature shall be guided by a defined logic model (see Guidance on creating a logic model in Appendix E) outlining the intended outcomes and the steps needed to achieve them. Preference should be placed on leveraging existing resources and processes of the Owner to optimize opportunities to create positive impact.')] },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('The design shall include the following criteria', '111', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('measurable and positive impact on the well-being of individuals or communities')] },
              { _key: k(), letter: 'b', body: [p('promotes fairness and equality, ensuring that marginalized or disadvantaged groups are not further marginalized or excluded')] },
              { _key: k(), letter: 'c', body: [p('respects the rights, culture, and dignity of the target community and should be culturally sensitive and appropriate, considering the cultural norms, values, and practices of the target community')] },
              { _key: k(), letter: 'd', body: [p('active participation and engagement of the target population, ensuring that their voices and perspectives are heard and considered')] },
              { _key: k(), letter: 'e', body: [p('collaboration and coordination with relevant impacted parties, such as community organizations, government agencies, and other key actors')] },
              { _key: k(), letter: 'f', body: [p('have mechanisms in place to ensure transparency, accountability, and the responsible use of resources')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('The design should use strategies and methods that are evidence-based and have been proven to work in similar contexts.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [p('The design should aim to build the capacity of impacted parties and organizations to support and sustain the intervention.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the embodied justice design impacted party satisfaction rate (expressed as a percentage). The context indicators are indicators identified (as outputs) in the logic model in Requirement #1.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Calculate the average score for each question by adding up all the encoded responses (where 1 = Very Dissatisfied/Not at all Relevant/Very Poor/Not at all/Very Unlikely/Strongly Disagree and 5 = Very Satisfied/Very Relevant/Very Good/Very Well/Very Likely/Strongly Agree) and divide by the total number of responses.', 'number', 1),
              li('Calculate the overall average score by adding up all the average scores for all the questions and dividing by the total number of questions.', 'number', 1),
              li('Calculate the impacted party satisfaction rate (%) by dividing the score by the maximum possible score (which is 5) and multiplying by 100.', 'number', 1),
              p('This is expressed mathematically as:'),
              p('Step 1'),
            ],
            formula: 'a# = R1 + R2 + R3 + … / N',
            variables: [
              { symbol: 'a#', meaning: 'the average score for each question' },
              { symbol: 'R#', meaning: 'the response for the # question (where # is 1 to n, and n is the total # questions)' },
              { symbol: 'N', meaning: 'the total number of responses for the # question' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2')],
            formula: 'A = a1 + a2 + a3 + … / Q',
            variables: [
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: 'a#', meaning: 'the average score for each question (from Step 1)' },
              { symbol: 'Q', meaning: 'the total number of questions' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 3')],
            formula: 'S = (A / 5) x 100',
            variables: [
              { symbol: 'S', meaning: 'satisfaction rate (%)' },
              { symbol: 'A', meaning: 'overall average score' },
              { symbol: '5', meaning: 'maximum possible score' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Satisfaction Rate',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '40-59% satisfaction rate' },
          { _key: k(), pointsLabel: '4 points', criterion: '60-79% satisfaction rate' },
          { _key: k(), pointsLabel: '6 points', criterion: '80-100% satisfaction rate' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements Satisfied',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #4 satisfied' },
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #5 satisfied' },
        ],
      },
      additionalPointsLogic: 'sum',
      notes: [
        p('Note:'),
        li('Very Low Satisfaction (0-19%): a very small proportion of impacted parties are satisfied with the program. Immediate action is needed to identify and address the issues causing dissatisfaction. No SEAM points awarded.'),
        li('Low Satisfaction (20-39%): less than half of impacted parties are satisfied with the program. There is significant room for improvement. No SEAM points awarded.'),
        li('Moderate Satisfaction (40-59%): around half of impacted parties are satisfied with the program. While this is not bad, there is still considerable potential for improvement.'),
        li('High Satisfaction (60-79%): a majority of impacted parties are satisfied. The program is generally effective, but there may still be areas to improve.'),
        li('Very High Satisfaction (80-100%): a large majority of impacted parties are satisfied. This is an excellent result, suggesting that the program is very effective in meeting impacted party needs and expectations.'),
      ],
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('A detailed logic model that outlines the intended outcomes of the design and the steps needed to achieve them. This should include the top Key Performance Indicators (KPIs) identified as outputs.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Architect Attestation detailing how the design meets the criteria of being impactful, equitable, ethical, participatory, collaborative, and accountable. It should reference strategies and methods that are evidence-based and have been proven to work in similar contexts (if applicable).')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('A copy of the Impacted Party Satisfaction Survey content.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Impacted Party Satisfaction Survey Results used to calculate the impacted party satisfaction rate. The results should include encoded responses that can be used to calculate the average score for each question, the overall average score, and the impacted party satisfaction rate.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On content of the impacted party engagement',
        body: [p('A template for an impacted Party Satisfaction Survey can be found in Appendix D.')],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On embodied injustice',
        body: [
          p('Embodied injustice in commercial real estate refers to the historical and ongoing inequalities embedded within property development, ownership, and utilization. It encompasses practices and policies that have disproportionately disadvantaged certain groups, such as exclusionary zoning and discriminatory lending or leasing practices. This concept also considers the legacy of land use decisions, urban planning, and development patterns perpetuating social disparities, affecting access to opportunities and resources in commercial spaces. This Activity aims to design justice into the project.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On assessing embodied injustice',
        body: [
          p('Assessing embodied injustice in the context of commercial real estate involves assessing how development, ownership, leasing, and utilization practices have historically impacted marginalized or disadvantaged groups. Owners can use the following steps to assess embodied injustice as guidance for designing justice into the project:'),
          li('Review past commercial real estate development decisions, sales, and leasing practices to identify patterns of exclusion or discrimination.', 'number', 1),
          li('Analyze the diversity of businesses and organizations that lease commercial spaces. Are there barriers to businesses owned by underrepresented individuals?', 'number', 1),
          li('Evaluate the affordability of commercial lease rates. Are they prohibitively high for small businesses or startups, especially those owned by individuals from marginalized communities?', 'number', 1),
          li('Examine the location of commercial properties. Are they primarily in affluent areas, or are they also accessible to underserved communities?', 'number', 1),
          li("Assess the level of community involvement in commercial real estate development decisions. Are residents' concerns and inputs considered?", 'number', 1),
          li('Analyze the job opportunities created by commercial tenants. Are they offering employment opportunities to individuals from underrepresented groups, and are they accessible to the local community?', 'number', 1),
          li('Evaluate the environmental practices of commercial developments. Are they contributing to ecological degradation in already vulnerable areas?', 'number', 1),
          li('Assess whether commercial developments respect and integrate local cultural and historical landmarks or if they contribute to cultural erasure.', 'number', 1),
          li('Examine if commercial developments contribute to or detract from local infrastructure and amenities. For instance, do they support public transportation access or green spaces?', 'number', 1),
          li('Engage with local business owners, especially those from marginalized communities, to understand their experiences and challenges in accessing commercial real estate.', 'number', 1),
          li('Analyze the safety measures in place in commercial properties and whether they are accessible and welcoming to everyone, including marginalized groups.', 'number', 1),
          p('By focusing on these specific measures in commercial real estate, Owners can better understand embodied injustice in the property and work towards restoration and more equitable practices.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On restoration',
        body: [
          p('To "restore" means to bring something back to its original or previous state, often after it has been damaged, lost, or disrupted. It involves repairing, renewing, or returning something to its rightful condition or function. In the context of social justice, restoration may refer to efforts aimed at rectifying past injustices, addressing harm, and working towards the reestablishment of fairness, equality, and dignity for individuals or communities who have experienced discrimination or oppression. This can involve various actions such as providing reparations, implementing policies to address systemic inequalities, and promoting reconciliation and healing.'),
          p('The steps to restore can vary depending on the specific situation and context. However, here are some general steps that may be involved in the process of restoration:'),
          liBold('Acknowledgment:', ' The first step in the restoration process is acknowledging the harm or injustice that has occurred. This involves recognizing and accepting the reality of the situation, including the impact it has had on individuals or communities.'),
          liBold('Accountability:', ' Holding those responsible for the harm or injustice accountable is an important step in the restoration process. This may involve legal actions, disciplinary measures, or other forms of accountability mechanisms to ensure that those responsible are held responsible for their actions.'),
          liBold('Repair and Redress:', ' Restoration often involves repairing the harm caused and providing redress to those affected. This can include actions such as providing compensation, restitution, or other forms of remedies to address the specific harm experienced.'),
          liBold('Policy and Systemic Changes:', ' Addressing the root causes of the harm or injustice requires implementing policy and systemic changes. This may involve revising laws, regulations, or practices that perpetuate inequality or discrimination, and implementing measures to promote fairness, equality, and justice.'),
          liBold('Reconciliation and Healing:', ' Restoration also involves promoting reconciliation and healing among individuals or communities affected by the harm or injustice. This can include creating spaces for dialogue, strengthening understanding, and supporting processes that facilitate healing and rebuilding trust.'),
          liBold('Education and Awareness:', ' Promoting education and awareness about the harm or injustice is crucial for preventing future occurrences and creating a culture of social justice. This may involve raising awareness about the history, causes, and consequences of the harm and promoting understanding and empathy among individuals and communities.'),
          p("It's important to note that the steps to restore can be complex and may require the involvement of various impacted parties, including governments, institutions, communities, and individuals. The specific steps and approaches may vary depending on the nature of the harm or injustice and the needs of those affected."),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-26000-2021' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ungp-2011' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ INa2')
}

run().catch((err) => { console.error(err); process.exit(1) })
