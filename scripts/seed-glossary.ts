/**
 * Seeds the Key Terms + Definitions glossary (PDF pages 9–15).
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

const p = (text: string) => ({
  _type: 'richText', _key: k(), style: 'normal',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})

const li = (text: string): any => ({
  _type: 'richText', _key: k(), style: 'normal', listItem: 'bullet', level: 1,
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[,]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

type Entry = { term: string; body: any[]; slug?: string }

const entries: Entry[] = [
  { term: 'Activity', body: [p('the action that drives the social impact. In the SEAM Standard, it is the topic that has requirements that allow Owners to make progress and achieve a score.')] },
  { term: 'Administrator', body: [p('the party responsible for gathering information, evidence, and data for the SEAM Certification activities and correctly reporting them via the SEAM Certification application process. The Administrator aims to obtain sufficient appropriate evidence to express a conclusion designed to enhance the degree of confidence in the measurement or evaluation of the underlying subject matter against requirements.')] },
  { term: 'Attribution', body: [p('the action of regarding something as being caused by an Owner. The three types of attribution are "directly caused," "contributed to," and "directly linked," in order of highest magnitude to lowest.')] },
  { term: 'Basic needs', body: [p('the essential resources and services required to sustain a decent quality of life that includes but is not limited to, food, water, housing, healthcare, and education.')] },
  { term: 'Capacity', body: [p('the resources, knowledge, and skills to deal with changes and participate in opportunities.')] },
  { term: 'Community', body: [p("persons or groups living and/or working in any area that is economically, socially, or environmentally impacted (positively or negatively) by an organization's operations (Global Reporting Initiative).")] },
  { term: 'Confidence level', body: [p('the probability that your sample accurately reflects the attitudes of your population.')] },
  { term: 'Corruption', body: [p('includes practices such as bribery, facilitation payments, fraud, extortion, collusion, undisclosed referral commissions, and money laundering, as well as the offer or receipt of gifts, loans, fees, rewards, or other advantages as an inducement to do something dishonest, illegal, or represents a breach of trust. It can function as illicit enrichment, concealment, and obstruction of justice (consistent with GRI 205 and UNCTAD).')] },
  { term: 'Decent work', body: [p('work performed in conditions of freedom, equity, security, and human dignity (source: ISO 26000:2010, Guidance on social responsibility).')] },
  { term: 'Disadvantaged person(s)', slug: 'disadvantaged-persons', body: [p('an individual or group of people that experience identified barriers in their pursuit to lead fulfilling lives (varies by community — may include, but not limited to, racial and ethnic minoritized groups, low-income individuals, women, veterans, people experiencing long-term unemployment (over one year), people experiencing homelessness, formerly incarcerated individuals, elderly, individuals with physical or cognitive disabilities). These should not be treated as defining characteristics but to assist with identifying relevant interventions.')] },
  { term: 'Disposable income', body: [p('the money an individual has to save or spend after taxes and essential expenses are deducted.')] },
  { term: 'Diverse Supplier', body: [p('a supplier business at least 51% owned and operated by an individual or group that is part of a traditionally underrepresented or underserved population. For certification purposes, diverse supplier organizations shall have a third-party verified certification or designation.')] },
  { term: 'Diverse Tenant', body: [p('a Tenant business that is at least 51% owned and operated by an individual or group that is part of a traditionally underrepresented or underserved population. For certification purposes, diverse tenant organizations shall have a third-party verified certification or designation.')] },
  { term: 'Diversity', body: [p('means individual differences that include, but are not limited to, ability, learning styles, life experiences, race and ethnicity, socioeconomic status, gender, sexual orientation, country of origin, politics, and religion. Diversity refers to the variety of human experiences and characteristics. They can be both apparent and non-apparent. Apparent characteristics are those that are easily seen, such as race, ethnicity, and gender. Non-apparent characteristics are not easily seen, such as sexual orientation, socioeconomic status, education, religion, cultural identity, experience, neurodiversity, and disability.')] },
  { term: 'Driver', body: [p('a factor that significantly impacts the performance of an overall effort. It is a determining or causal element or factor.')] },
  { term: 'Driver activity', body: [p('a key activity that determines and causes the performance of later activities. It is a leading indicator of performance and can be proactively altered to affect the chance for success.')] },
  { term: 'Employee', body: [p('the same designation for "employees" used for tax purposes, where applicable. It generally refers to those workers for whom the employer controls when, how, and where they complete the work. In the SEAM Standard, they are those directly employed by the Owner of the project.')] },
  { term: 'Evidence', body: [p('documents and other forms demonstrating compliance against a SEAM requirement.')] },
  { term: 'Experienced well-being', body: [p('the well-being experienced by a set of impacted parties during a given timeframe.')] },
  { term: 'Forced (or compulsory) labor', slug: 'forced-labor', body: [p('all work or service which is exacted from any person under the threat of a penalty and for which the person has not offered himself or herself voluntarily.')] },
  { term: 'Fundamental rights', body: [p('are those that protect against bodily harm to an individual. Examples of such rights include the Right to Life, Liberty and Security of Person (Universal Declaration of Human Rights article 3), Freedom from Slavery and Servitude (UDHR art. 4) and Freedom from Torture (UDHR art. 5).')] },
  { term: 'Gender identity', body: [p("a person's perception of their gender, which may or may not correspond with their birth sex.")] },
  { term: 'Impact', body: [p('a change in an outcome caused by an activity (in this case, a commercial real estate project activity). An impact can be positive or negative during a given timeframe.')] },
  { term: 'Impact activity', body: [p('an action that directly indicates progress toward achieving social equity goals and impact. They are actions that directly lead to changes in social impact.')] },
  { term: 'Impact management', body: [p('identifying the positive and negative impacts an enterprise has on people and the planet, then reducing the negative and increasing the positive.')] },
  { term: 'Impacted parties', body: [p("the individuals or groups affected by an organization's business activities and the individuals or groups who affect an organization's value-creation ability.")] },
  { term: 'Importance level', body: [p("also called the significance to impacted parties, is the level of concern, interest, or value that impacted parties place on specific topics or issues. It's determined through impacted party engagement processes, such as surveys, interviews, and focus groups.")] },
  { term: 'Inclusion or inclusiveness', body: [p('the practice of including all impacted parties in organizational contexts (source: ISO 30400:2022, Human resource management — Vocabulary).')] },
  { term: 'Inputs', body: [p('the resources (human, financial, equipment, space) necessary to complete an Activity.')] },
  { term: 'Lagging indicator', body: [p('a measure that shows what a situation has been like in the past, rather than what it will be like in the future. They are used to confirm trends and changes in trends.')] },
  { term: 'Leading indicator', body: [p('a measure that shows what a situation will be like in the future rather than what it is like now or has been in the past. It attempts to look forward and predict the future.')] },
  { term: 'Living wage', body: [p('the remuneration received for a standard workweek by a worker in a particular place sufficient to afford a decent standard of living for the worker and their family. Elements of a decent standard of living include food, water, housing, education, health care, transportation, clothing, and other essential needs, including provision for unexpected events.')] },
  { term: 'Local', body: [p("refers to the project's geographic area of impact directly surrounding the project.")] },
  { term: 'Margin of error', body: [p('a percentage that tells you how much you can expect your survey results to reflect the views of the overall population. The smaller the margin of error, the closer you are to having the exact answer at a given confidence level.')] },
  { term: 'Marginalized person(s)', slug: 'marginalized-persons', body: [p('sometimes also called socially excluded, refers to the relegation to the fringes of society due to a lack of access to rights, resources, and opportunities.')] },
  { term: 'Material issues', body: [p('topics or concerns deemed significant to both a project and its impacted parties that can influence the decisions, actions, and performance of a project. Material issues often have financial, operational, reputational, legal, or strategic implications.')] },
  { term: 'Modern slavery', body: [p('an umbrella term covering practices such as forced labour, debt bondage, forced marriage, and human trafficking. Essentially, it refers to situations of exploitation that a person cannot refuse or leave because of threats, violence, coercion, deception, and/or abuse of power.')] },
  { term: 'Neurodiversity', body: [p('the range of differences in individual brain function and behavioral traits, regarded as part of normal variation in how people think, learn, behave, and experience/react to sensory stimuli. It is commonly used in, but not limited to, the context of autistic spectrum disorders and ADHD.')] },
  { term: 'Outcomes', body: [p('changes in conditions that stem from the outputs and activities.')] },
  { term: 'Outcome threshold', body: [p('the level of outcome the impacted party considers positive, whereas anything below this level is considered negative. This can be an internationally agreed standard, a societal standard identified by science, or a social norm. Societal thresholds determine what level society should seek to operate within to prevent harm to people.')] },
  { term: 'Outputs', body: [p('unit counts which give us a way to measure progress.')] },
  { term: 'Owner', body: [p('the individual or organization that is the majority shareholder in the ownership of the project or operating property and is the responsible party with final decision-making authority and, where required, has the appropriate authority from a professional, legal, or regulatory body. For the purposes of the SEAM Certification engagement, they are responsible for the engagement, its performance, and the submitted SEAM Certification application.')] },
  { term: 'Performance indicator', body: [p('a key quantifiable indicator of progress toward an intended result. It can be either a leading or lagging indicator and provides a focus for improvement.')] },
  { term: 'Population size', body: [p('the total number of people in the group you are trying to study.')] },
  { term: 'Project', body: [p('the entire gross square footage under consideration, including basements, mezzanines, intermediate floors, penthouses, non-enclosed (or non-enclosable) roofed-over areas, air shafts, pipe trenches, chimneys, and floor areas dedicated to vehicular parking and circulation, regardless of if it is under construction or development, or is existing and operational.')] },
  { term: 'Project-level (construction phase)', slug: 'project-level', body: [p("the phase of real estate development that encompasses all activities related to a property's entitlement, planning, design, and construction. This includes site preparation, material procurement, impacted party engagement during construction, and the implementation of sustainable and socially equitable building practices.")] },
  { term: 'Property-level (operational phase)', slug: 'property-level', body: [p('the phase that commences once a property becomes operational, post-construction, involving property management, maintenance, daily operations, tenant relationships, facility management, and ongoing community engagement.')] },
  { term: 'Property rights', body: [p('cover physical and intellectual property and include interest in land and other physical assets, copyrights, patents, geographical indicator rights, funds, moral rights, and other rights (source: ISO 26000:2010, Social responsibility).')] },
  { term: 'Proxy', body: [p('an indirect measure of the desired outcome, which is strongly correlated to that outcome and is commonly used when direct measurements are unobservable and/or unavailable.')] },
  { term: 'Remediation', body: [p('providing an effective remedy for impacted people, including reversing or stopping the harm from a negative human rights impact.')] },
  { term: 'Remuneration', body: [p("the ordinary, basic, or minimum wage or salary and any additional compensations payable directly or indirectly, whether in cash or in-kind, by the employer to the worker and arising from the worker's employment.")] },
  { term: 'Reporting period', body: [p('for B+I certifications is the period between the start and end dates for a development and construction project; for O+M certifications is one year from the date of the baseline measurements performed in SEAM Activity IAa1.7.')] },
  { term: 'Resilience', body: [p('the ability to withstand and recover from negative (or harmful) situations.')] },
  { term: 'Reviewer', body: [p('the independent, third-party organization that measures or evaluates the information, data, and evidence provided in the SEAM Certification application according to the requirements to determine the certification level.')] },
  { term: 'Sample size', body: [p('the number surveyed that reflects a statistically significant representation of your target population.')] },
  {
    term: 'Social responsibility',
    body: [
      p('the responsibility of an organization for the impacts of its decisions and activities on society [specifically communities and impacted parties] and the environment through transparent and ethical behavior that:'),
      li('Contributes to sustainable development, including the health and welfare of society'),
      li('Considers the expectations of impacted parties'),
      li('Complies with applicable law and consistent with international norms of behavior'),
      li('Is integrated throughout the organization and practiced in its relationships.'),
    ],
  },
  { term: 'Social sustainability', body: [p('the continuation of benefits from the intervention after assistance has ceased. Where the emphasis is not on external assistance, sustainability can be defined as the ability of key impacted parties to sustain intervention benefits with efforts that use locally available resources.')] },
  { term: 'Tier 1, Tier 2, and Tier 3', slug: 'tier-1-2-3', body: [p('indicate the level in the supply chain, with Tier 1 being directly contracted or hired, Tier 2 being contracted or hired by Tier 1, and Tier 3 being contracted or hired by Tier 2.')] },
  {
    term: 'Underrepresented social group',
    body: [
      p('a group of individuals who are less represented within a subset (e.g., a body or committee, employees of an organization) relative to their numbers in the general population and who, therefore, have less opportunity to express their economic, social, or political needs and views.'),
      p('Note 1: Under-represented social groups may include minoritized groups.'),
      p("Note 2: The groups included under this definition depend on the organization's operating context and are not uniform for every organization."),
    ],
  },
  { term: 'Value chain', body: [p('the different sets of activities involved in creating a project or operating a property that take it from concept to the final product experienced by the end consumer. The value chain is the step-by-step process of business activities that transform a service or an idea into a marketable product.')] },
  { term: 'Vulnerable persons', body: [p('those exposed to a range of possible harms and are unable to deal with them adequately.')] },
  { term: 'Worker (or workforce)', slug: 'worker', body: [p("any person employed by any company within the project's supply chains, including independent contractors and their employees and self-employed contractors, as opposed to workers contracted or subcontracted to work for the Owner.")] },
]

async function run() {
  for (const e of entries) {
    const slug = e.slug ?? slugify(e.term)
    const _id = `glossary-${slug}`
    console.log(`Seeding ${_id}...`)
    await client.createOrReplace({
      _id,
      _type: 'glossaryTerm',
      term: e.term,
      slug: { _type: 'slug', current: slug },
      body: e.body,
    })
  }
  console.log(`Done. Seeded ${entries.length} terms.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
