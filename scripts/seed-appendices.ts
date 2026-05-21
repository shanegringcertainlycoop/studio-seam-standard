/**
 * Seeds Appendices A–E from the SEAM Standard v1.1.
 *
 * Source: SEAM Standard with Guidance v1.1.pdf, pages 319–327.
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

type Block = any

const p = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'normal',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const h3 = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'h3',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const li = (text: string, listItem: 'bullet' | 'number' = 'bullet'): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level: 1,
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})
const liNum = (text: string): Block => li(text, 'number')
const liBold = (boldLead: string, rest: string, listItem: 'bullet' | 'number' = 'bullet'): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level: 1,
  children: [
    { _type: 'span', _key: k(), text: boldLead, marks: ['strong'] },
    { _type: 'span', _key: k(), text: rest, marks: [] },
  ],
  markDefs: [],
})
const liSub = (text: string, letter: string): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem: 'bullet', level: 2,
  children: [
    { _type: 'span', _key: k(), text: `${letter}. `, marks: ['strong'] },
    { _type: 'span', _key: k(), text, marks: [] },
  ],
  markDefs: [],
})

// ── Appendix A: SDG alignment ──────────────────────────────
const SDG_MAP: Array<[string, string]> = [
  ['IAa1.1', '16, 17'],
  ['IAa1.2', '1, 4, 10, 11'],
  ['IAa1.3', '17'],
  ['IAa1.4', '5, 8, 16'],
  ['IAa1.5', '1, 5, 10, 16'],
  ['IAa1.6', '5, 10, 16, 17'],
  ['IAa1.7', '10, 16, 17'],
  ['IAa2.1', '4, 10, 11, 16, 17'],
  ['IAa2.2', '8, 10, 11, 16, 17'],
  ['IAa2.3', '8, 9, 11, 12, 17'],
  ['IAa2.4', '3, 5, 8, 10, 16'],
  ['IAa2.5', '9, 10, 16, 17'],
  ['IAa3.1', '8, 10, 16, 17'],
  ['IAa3.2', '16, 17'],
  ['TGa1.1', '4, 8, 9, 12, 16'],
  ['TGa1.2', '4, 8, 9, 12, 16'],
  ['TGa1.3', '4, 5, 10'],
  ['TGa2.1', '3, 8, 17'],
  ['TGa2.2', '3, 8, 17'],
  ['TGa3.1', '8, 10, 16, 17'],
  ['TGa3.2', '8, 10, 16, 17'],
  ['TGa4.1', '8, 10, 12, 16, 17'],
  ['TGa4.2', '8, 10, 12, 16, 17'],
  ['TGa5.1', '11, 16'],
  ['TGa5.2', '11, 16'],
  ['CIa1.1', '1, 6, 11, 12, 13, 15, 16, 17'],
  ['CIa1.2', '1, 6, 11, 12, 13, 15, 16, 17'],
  ['SJa1.1', '5, 8, 10, 12'],
  ['SJa1.2', '5, 8, 10, 11, 16'],
  ['SJa1.3', '5, 8, 10, 12'],
  ['SJa1.4', '5, 8, 10, 12'],
  ['SJa1.5', '5, 8, 10, 16'],
  ['SJa2.1', '3, 5, 8, 10, 11, 17'],
  ['SJa2.2', '3, 5, 8, 10, 16'],
  ['SJa2.3', '3, 5, 8, 10, 16'],
  ['SJa2.4', '1, 5, 8, 10'],
  ['SJa2.5', '1, 5, 8, 10, 16'],
  ['SJa3.1', '1, 10, 11, 16'],
  ['SJa3.2', '1, 5, 10, 11, 16'],
  ['SJa3.3', '1, 4, 5, 8, 10, 11, 12'],
  ['SJa3.4', '8, 12, 16, 17'],
  ['SJa4.1', '1, 5, 8, 10, 11'],
  ['SJa4.2', '1, 5, 8, 10, 11'],
  ['INa1', '1, 11, 12, 15, 16'],
  ['INa2', '1, 11, 12, 15, 16'],
  ['HRa1.1', '8, 10, 12, 16'],
  ['HRa1.2', '8, 10, 12, 16, 17'],
  ['HRa1.3', '1, 5, 8, 10, 12, 16, 17'],
  ['HRa1.4', '5, 8, 12, 16, 17'],
  ['HRa2.1', '1, 8, 10'],
  ['HRa2.2', '3, 5, 8, 10, 16'],
  ['HRa2.3', '1, 8, 10'],
  ['HRa2.4', '3, 5, 8, 10, 16'],
  ['HRa2.5', '1, 8, 10'],
  ['HRa2.6', '3, 5, 8, 10, 16'],
  ['HRa2.7', '5, 8, 12, 16, 17'],
  ['HRa3.1', '8, 10, 16, 17'],
  ['HRa3.2', '3, 5, 10, 16'],
  ['HRa4.1', '4, 8, 10, 16'],
  ['HRa4.2', '4, 8, 10, 11, 16'],
  ['HSa1.1', 'See healthy building standard'],
  ['HSa1.2', '3, 4, 8, 9, 10, 11, 12, 13, 16, 17'],
  ['HSa1.3', '3, 8, 11'],
  ['HSa1.4', '3, 9, 11'],
]

const appendixA: Block[] = [
  p('Mapping of each SEAM Activity to the relevant United Nations Sustainable Development Goals.'),
  ...SDG_MAP.map(([id, sdgs]) =>
    liBold(`${id} — `, `SDG ${sdgs}`),
  ),
]

// ── Appendix B: Referenced Source descriptions ─────────────
const REFERENCED_SOURCES: Array<[string, string]> = [
  ['Americans with Disabilities Act (ADA) Standards for Accessible Design', 'United States federal regulations setting minimum requirements for designing, constructing, or altering buildings and facilities to ensure accessibility and usability by individuals with disabilities.'],
  ['Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain (2016)', 'A diagnostic tool designed to promote corporate social responsibility by providing companies with useful information on how to avoid human rights violations in all aspects of their operations. It helps in creating a general overview of the human rights risks in their operations through self-assessment, focusing on assessing the company management system for compliance with human rights principles.'],
  ['Fitwel', "Fitwel is the world's leading certification system committed to building health for all®."],
  ['ILO Declaration on Fundamental Principles and Rights at Work', 'Principles concerning the fundamental rights of elimination of all forms of forced or compulsory labor and elimination of discrimination regarding employment and occupation.'],
  ['ILO Indigenous and Tribal Peoples Conventions (C169), 1989', 'Aims to protect the rights of Indigenous and tribal peoples in independent countries and to respect their identity, cultures and ways of life.'],
  ['ILO Equal Remuneration Convention, 1951 (No. 100)', 'Mandates equal remuneration for men and women workers for work of equal value, aimed at promoting gender equality in terms of pay.'],
  ['ILO Minimum Age Convention 138 (1973)', 'Sets the general minimum age for admission to employment or work at 15 years (or 14 years under certain conditions) and aims at the abolition of child labour, ensuring that children do not leave school before a minimum age for employment and that they are not employed in jobs unsuitable for their age.'],
  ['ILO Occupational Health Services Convention (C161, 1985)', 'Provides for establishing occupational health services with essentially preventive functions and maintaining a safe and healthy working environment.'],
  ['ILO Occupational Safety and Health Convention (C155, 1981)', 'Promotes occupational safety and health to improve working conditions.'],
  ['ILO Prevention of Major Industrial Accidents Convention (C174, 1993)', 'Aims to prevent major accidents involving hazardous substances and limit the consequences of such accidents. It applies to major hazard installations and provides a systematic and comprehensive model framework for protecting workers, the public, and the environment against major industrial accidents involving hazardous substances, as well as mitigating the consequences of such accidents.'],
  ['ILO Promotional Framework for OSH Convention, 2006 (No. 187)', "Designed to provide a coherent and systematic treatment of occupational safety and health (OSH) issues, promoting a safe and healthy working environment. It encourages member States to develop a national policy, system, and program for OSH, aiming to prevent occupational injuries and diseases and improve workers' conditions, with provisions outlined for achieving these goals progressively, in consultation with social partners."],
  ['ILO Safety and Health in Construction Convention (C167, 1988)', 'Applies to all construction activities and outlines general provisions to ensure the health and safety of workers on construction sites.'],
  ['International Association for Impact Assessment, Social Impact Assessment: Guidance for assessing and managing the social impacts of projects', 'Provides advice about what is expected in good practice social impact assessment (SIA) and social impact management processes, especially in relation to project development.'],
  ['International Covenant on Economic, Social, and Cultural Rights (1966)', 'Ensures the enjoyment of economic, social and cultural rights.'],
  ['International Labor Organization, Violence and harassment in the world of work, Convention 190, June 2019', 'Recognizes the right of everyone to a world of work free from violence and harassment, including gender-based violence and harassment. It provides guidelines on how to prevent and eliminate violence and harassment in the world of work.'],
  ['ISO 26000:2010, Guidance on social responsibility (2021)', 'Intended to assist organizations in contributing to sustainable development.'],
  ['ISO 30415:2021, Human resource management — Diversity and inclusion (2021)', 'Provides guidelines for organizations looking to develop and enhance their policies and practices regarding diversity and inclusion, encompassing a broad range of topics including strategy, leadership, and impacted party engagement, to ensure an inclusive workplace for all individuals regardless of their personal characteristics.'],
  ['ISO 45001:2018 Occupational Health and Safety', 'A global standard specifying requirements for occupational health and safety management systems. It guides organizations to provide safe and healthy workplaces by preventing occupational injuries and ill health, proactively enhancing occupational health and safety performance, and managing work-related injury and illness by identifying risks and opportunities to eliminate hazards and minimize risks.'],
  ['NABERS Indoor Environment', 'A NABERS Indoor Environment (IE) rating measures the indoor air quality, lighting quality, temperature, and thermal comfort as well as acoustic quality of a building.'],
  ['RESET Air', 'The RESET Air Standard is a data standard for air quality monitoring.'],
  ['Social Accountability International SA8000® International Standard (2014)', "A globally recognized auditable certification standard based on international workplace norms from the International Labour Organisation (ILO) conventions, the Universal Declaration of Human Rights, and the UN Convention on the Rights of the Child. It signifies an organization's dedication to the fair treatment of workers and helps secure ethical and fair labor conditions across various industries. Established by Social Accountability International in 1997, it measures company performance in eight crucial workplace social accountability areas, including child labor, forced labor, health and safety, free association and collective bargaining, discrimination, disciplinary practices, working hours, and compensation."],
  ['The United Nations Convention on the Rights of Persons with Disabilities (CRPD)', 'A legally binding international agreement between Member States who have signed the Convention to uphold, promote, and protect the human rights and dignity of persons with disabilities.'],
  ['UL Verified Healthy Building for Indoor Environment', "The most holistic look at a building's indoor environment, assessing indoor air quality (IAQ) and water quality as well as building cleanliness, lighting, and acoustics."],
  ['UN Declaration on the Rights of Indigenous Peoples (2007)', "A comprehensive international instrument establishing a universal framework of minimum standards for the survival, dignity, and well-being of the world's Indigenous peoples; emphasizing the urgent need to respect and promote the inherent rights of Indigenous peoples derived from their political, economic, social structures, cultures, spiritual traditions, histories, and philosophies, especially their rights to their lands, territories, and resources."],
  ['UN Disability Inclusion Strategy (2019)', "A policy and accountability framework aimed at enhancing the inclusion of persons with disabilities in all United Nations' work."],
  ['UN Guiding Principles on Business and Human Rights (2011)', 'Provide an authoritative global standard for preventing and addressing the risk of negative human rights impacts linked to business activity.'],
  ['UN Universal Declaration of Human Rights (1948)', 'Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, color, sex, language, religion, political or other opinion, national or social origin, property, birth, or other status.'],
  ['UNESCO Convention concerning the Protection of the World Cultural and Natural Heritage (1972)', 'International treaty that seeks to encourage the identification, protection, and preservation of cultural and natural heritage around the world, considered to be of outstanding value to humanity.'],
  ['United Nations Convention on the Rights of the Child (1989)', "A human rights treaty that recognizes and protects the rights of children under 18. It is the most widely ratified international human rights instrument. The Convention sets out the rights of children in various areas, such as survival, development, participation, protection, and education. This treaty has become a historic commitment to the world's children, transforming lives globally by setting out children's civil, political, economic, social, health, and cultural rights."],
  ['United Nations OHCHR Declaration on Fundamental Principles concerning the Contribution of the Mass Media to Strengthening Peace and International Understanding, to the Promotion of Human Rights and to Countering Racialism, Apartheid and Incitement to War (1978), Articles 2(3)', 'With a view to the strengthening of peace and international understanding, to promoting human rights and to countering racialism, apartheid and incitement to war, the mass media throughout the world, by reason of their role, contribute to promoting human rights, in particular by giving expression to oppressed peoples who struggle against colonialism, neo-colonialism, foreign occupation and all forms of racial discrimination and oppression and who are unable to make their voices heard within their own territories.'],
  ['US Civil Rights Act (1964)', 'Outlawed major forms of discrimination against racial, ethnic, national and religious minorities, and women, including racial segregation.'],
  ['US Department of Labor OSHA', 'A regulatory division devoted to ensuring safe and healthful working conditions by setting and enforcing standards, and by providing training, outreach, and education. It administers the Occupational Safety and Health (OSH) Act, regulating safety and health conditions in most private industries, aiming to reduce workplace risks and enhance employee safety.'],
  ['WELL Building Standard', 'WELL is an evidence-based roadmap for applying the WELL Building Standard to support the health and well-being of your people and your organization.'],
]

const appendixB: Block[] = [
  p('Brief descriptions of the international standards, conventions, and frameworks referenced throughout the SEAM Standard.'),
  ...REFERENCED_SOURCES.map(([name, desc]) => liBold(`${name} — `, desc)),
]

// ── Appendix C: Contributors and Reviewers ─────────────────
const CONTRIBUTORS = [
  'Alexandra Bull, JLL',
  'Alex Atkinson, Bud Weed and Flower',
  'Alexandria Self, JLL',
  'Alaina Ladner, JLL',
  'Angela Loder, PhD, IWBI',
  'Anna Grace Mbow, GBCI',
  'Annie Bevan, Mindful Materials',
  'Avani Kavathekar, USGBC',
  'Becca Rushin, Jamestown Properties',
  'Bethany H.Y. Ma, CBRE',
  'Brian Terrell, JLL',
  'Georgia Tech, Building for Equity and Sustainability Vertically Integrated Projects: Rating Systems Sub-team',
  'Chris Atkinson, Bud Weed and Flower',
  'Christian Mayer, JLL',
  'Ellen Dunham-Jones, PhD, Georgia Tech',
  'Emily Talen, PhD, University of Chicago',
  'Grace Beaudin, Link Logistics',
  'Greg Smith, Urban Visions Development',
  'Guy Grainger, JLL',
  'Jaida Holbrook, Code Green Solutions',
  'James Marlow, Southface',
  'Jeff MacDonald, JLL',
  'Jennifer Beyer, Rushing',
  'Jennifer Hirsch, PhD, Georgia Tech',
  'Jennifer Poirier, JLL',
  'Jim Irwin, New City Development',
  'Joanna Frank, CFAD',
  'Joel Kimmons, PhD, CDC',
  'Joel Todd',
  'Karema Seliem, USGBC',
  'Kat West, JLL',
  'Laura Case, Southface',
  'Lina Daniel, JLL',
  'Lisa Conway, Interface',
  'Liz York, CDC',
  'Matt Bronfman, Jamestown Properties',
  'Meredith Leapley, Leapley Construction',
  'Mital Hall, JLL',
  'Moyaro Kamson, Longevity Partners',
  'Nancy Larson, JLL',
  'Nathan Bessette, Southface',
  'Nicole Keeler, Clear Green Consulting',
  'Nora Rizzo, Design for Freedom',
  'Nylah Oliver, JLL',
  'Rebecca Ballard, Rooted Communities',
  'Ryan Gravel',
  'Salone Habibudden, Urban Visions Development',
  'Scott Rosenstock, Urban Visions Development',
  "Sean O'Brien, Urban Visions Development",
  'Stephen Ward, Southface',
  'Summer Barrett, JLL',
  'Susan Kaplan, PhD',
  'Suzy Turner, JLL',
  'Tiim Wedemeyer, JLL',
  'Timmie Foster, EdD',
  'Todd Burns, JLL',
  'Todd Lee, Urban Visions Development',
  'Traci Rose Rider, PhD, NC State University',
  'Valeria Oliver, Goodwin Brothers Shades',
  'Victoria Lanteigne, PhD',
  'Vivian Yeung, Jane Goodall Institute',
  'Whitney White, JLL',
  'Zoe Reich, JLL',
]

const appendixC: Block[] = [
  p('SEAM, Inc. wishes to express its profound appreciation to the following people for their invaluable contribution of time and critical feedback. Company affiliations may have changed since their contribution.'),
  ...CONTRIBUTORS.map((c) => li(c)),
]

// ── Appendix D: Impacted Party Satisfaction Survey ─────────
const appendixD: Block[] = [
  p('A template for the Impacted Party Satisfaction Survey that can be used to determine the Impacted Party Satisfaction Rate. If modification is necessary, these concepts must form the basis for the questions and responses must be presented in a Likert scale to measure satisfaction properly.'),
  h3('Template'),
  p('Introduction: We value your feedback and would like to understand your experience with our program. Your responses will be used by the developers to help improve initiatives and better meet the needs of the community. All responses will be kept confidential.'),
  liNum('How would you rate your overall satisfaction with the program?'),
  liSub('Very Dissatisfied', 'a'),
  liSub('Dissatisfied', 'b'),
  liSub('Neutral', 'c'),
  liSub('Satisfied', 'd'),
  liSub('Very Satisfied', 'e'),
  liNum('How relevant do you find the activities of the program to your needs or the needs of the community?'),
  liSub('Not at all Relevant', 'a'),
  liSub('Slightly Relevant', 'b'),
  liSub('Neutral', 'c'),
  liSub('Quite Relevant', 'd'),
  liSub('Very Relevant', 'e'),
  liNum('How would you rate the quality of services provided by the program?'),
  liSub('Very Poor', 'a'),
  liSub('Poor', 'b'),
  liSub('Neutral', 'c'),
  liSub('Good', 'd'),
  liSub('Very Good', 'e'),
  liNum("How well do you feel your voice and perspective are considered in the program's decision-making process?"),
  liSub('Not at all', 'a'),
  liSub('Slightly', 'b'),
  liSub('Neutral', 'c'),
  liSub('Quite Well', 'd'),
  liSub('Very Well', 'e'),
  liNum('How would you rate the level of communication between you and the program team?'),
  liSub('Very Poor', 'a'),
  liSub('Poor', 'b'),
  liSub('Neutral', 'c'),
  liSub('Good', 'd'),
  liSub('Very Good', 'e'),
  liNum('How likely are you to recommend this program to others in the community?'),
  liSub('Very Unlikely', 'a'),
  liSub('Unlikely', 'b'),
  liSub('Neutral', 'c'),
  liSub('Likely', 'd'),
  liSub('Very Likely', 'e'),
  liNum('Do you believe the program is making a positive impact on the community?'),
  liSub('Strongly Disagree', 'a'),
  liSub('Disagree', 'b'),
  liSub('Neutral', 'c'),
  liSub('Agree', 'd'),
  liSub('Strongly Agree', 'e'),
  liNum('Please provide any additional comments or suggestions for improving the program.'),
]

// ── Appendix E: Guide to creating a logic model ────────────
const appendixE: Block[] = [
  p('A logic model is a visual representation of the resources, activities, and expected outcomes of a program or intervention. It provides a clear and concise overview of the intervention and can be a useful tool for planning, implementation, and evaluation. The following provides guidance on how to complete a logic model for social intervention.'),
  liBold('Identify Inputs: ', 'List all the resources that will be used to implement the intervention. Consider all possible sources of support, including financial resources, human resources, and material resources.', 'number'),
  liBold('Define Activities: ', 'Describe the actions or processes that will be carried out using the inputs. Be specific about what will be done, who will do it, and where and when it will be done.', 'number'),
  liBold('Determine Outputs: ', 'Identify the direct products or deliverables of the activities. These should be quantifiable and measurable.', 'number'),
  liBold('Outline Outcomes: ', 'Define the expected changes or benefits that will result from the intervention. Be sure to consider short-term, medium-term, and long-term outcomes.', 'number'),
  liBold('Specify Impact: ', 'Describe the long-term, sustainable change that the intervention aims to achieve. This should align with the overall mission and goals of the organization.', 'number'),
  liBold('Create the Logic Model: ', 'Use a flowchart or diagram to visually represent the inputs, activities, outputs, outcomes, and impact of the intervention. This will provide a clear and concise overview of the intervention.', 'number'),
  liBold('Review and Refine: ', 'Review the logic model with all relevant impacted parties and refine it as necessary. The logic model should be a living document that is updated and revised as the intervention evolves.', 'number'),
  p("Note: A logic model is not a static document. It should be revisited and revised as necessary throughout the life of the intervention. It is a tool for planning, implementation, and evaluation and should be used to guide decision-making and track progress toward achieving the intervention's goals."),
]

// ── Seeds ──────────────────────────────────────────────────
const appendices = [
  { code: 'A', title: 'United Nations Sustainable Development Goals', slug: 'sdg-alignment', body: appendixA },
  { code: 'B', title: 'Referenced Source descriptions', slug: 'referenced-sources', body: appendixB },
  { code: 'C', title: 'Contributors and Reviewers', slug: 'contributors', body: appendixC },
  { code: 'D', title: 'Impacted Party Satisfaction Survey', slug: 'satisfaction-survey', body: appendixD },
  { code: 'E', title: 'Guide to creating a logic model', slug: 'logic-model-guide', body: appendixE },
]

async function run() {
  for (const a of appendices) {
    const _id = `appendix-${a.slug}`
    console.log(`Seeding ${_id}...`)
    await client.createOrReplace({
      _id,
      _type: 'appendix',
      code: a.code,
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      body: a.body,
    })
  }
  console.log(`Done. Seeded ${appendices.length} appendices.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
