/**
 * Seeds the five front-matter prose sections (PDF pages 3, 6, 7-8, 16-25, 26-32):
 *   intro-acknowledgments
 *   intro-introduction
 *   intro-development-overview
 *   intro-framework
 *   intro-design
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

const h4 = (text: string): Block => ({
  _type: 'richText', _key: k(), style: 'h4',
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})

const li = (text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level,
  children: [{ _type: 'span', _key: k(), text, marks: [] }], markDefs: [],
})

const liBold = (boldTerm: string, rest: string, listItem: 'bullet' | 'number' = 'number', level = 1): Block => ({
  _type: 'richText', _key: k(), style: 'normal', listItem, level,
  children: [
    { _type: 'span', _key: k(), text: boldTerm, marks: ['strong'] },
    { _type: 'span', _key: k(), text: rest, marks: [] },
  ],
  markDefs: [],
})

const pBoldLead = (boldLead: string, rest: string): Block => ({
  _type: 'richText', _key: k(), style: 'normal',
  children: [
    { _type: 'span', _key: k(), text: boldLead, marks: ['strong'] },
    { _type: 'span', _key: k(), text: rest, marks: [] },
  ],
  markDefs: [],
})

const pWithLink = (before: string, linkText: string, href: string, after: string): Block => {
  const m = k()
  return {
    _type: 'richText', _key: k(), style: 'normal',
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: linkText, marks: [m] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [{ _type: 'link', _key: m, href }],
  }
}

// ---------------------------------------------------------------------------

const acknowledgmentsBody: Block[] = [
  p('The SEAM Standard is the product of many contributors who shaped its content, structure, and underlying principles. SEAM, Inc. gratefully acknowledges everyone who has informed this work.'),
  h3('Lead author'),
  p('Rainey Shane — Founder, SEAM, Inc.'),
  h3('Technical Advisory Group'),
  p('Subject-matter experts from architecture, real estate development, social impact measurement, human rights, and sustainability advised on the structure of pillars, concepts, objectives, and activities, and reviewed scoring methodology.'),
  h3('Founding Sponsors'),
  p('Organizations that supported the early development of the SEAM Standard provided the foundation that made the framework — and this reference document — possible.'),
  h3('Reviewers + contributors'),
  p('Practitioners and researchers tested early drafts against real projects and surfaced the practical guidance that informs activity requirements and documentation expectations throughout the standard.'),
]

const introductionBody: Block[] = [
  h3('What SEAM is'),
  p('SEAM is an acronym for Social Equity Assessment Method. SEAM is the world\'s first independent certification system designed exclusively to measure, manage, and improve social equity outcomes in commercial real estate projects.'),
  p('A SEAM Certification recognizes a commercial real estate project for advancing social equity through a structured set of activities tied to international standards on human rights, social responsibility, and social sustainability.'),
  h3('Certification levels'),
  p('SEAM Certification is offered at four levels — Bronze, Silver, Gold, and Platinum — corresponding to a project\'s progress along a continuum from acting to avoid harm, through preventing harm, to contributing to sustainable solutions.'),
  li('Bronze — Acting to avoid harm by making progress towards international social targets.'),
  li('Silver — Preventing harm with a commitment to grow into achieving positive social impact.'),
  li('Gold — Achieving positive social impact and sustainable benefits for impacted parties.'),
  li('Platinum — Setting the standard for positive social impact and contributing to sustainable solutions.'),
  h3('Administered by SEAM, Inc.'),
  p('SEAM Certification is administered by SEAM, Inc., a US-based nonprofit organization. The SEAM Standard is published as a public reference for Owners, Administrators, Reviewers, and impacted parties.'),
]

const developmentOverviewBody: Block[] = [
  h3('Foundation'),
  p('The SEAM Standard is the result of six years of research and development. It synthesizes leading international frameworks on human rights, decent work, social responsibility, and social impact measurement into an actionable certification system designed for commercial real estate.'),
  p('A central methodological principle of the SEAM Standard is the "do no harm" threshold: Activities are designed first to ensure projects avoid causing or contributing to harm, before extending to benefit and contribution goals. This is operationalized throughout the standard by separating Requirements into Act to Avoid Harm, Benefit Impacted Parties, and Contribute to Solutions tiers.'),
  h3('About this document'),
  p('This document is the implementation guidance edition of the SEAM Standard. It contains every Pillar, Concept, Objective, and Activity defined by version 1.1 of the standard, with the supporting requirements, indicators, scoring rubrics, documentation expectations, and referenced sources required to pursue SEAM Certification.'),
  p('Where this document references external standards, those references are intended as authoritative sources for the activity in question. Owners and Administrators are expected to consult the cited source for the full text of any standard cited within an Activity.'),
  h3('Alignment with other certifications'),
  p('The SEAM Standard is designed to complement, not replace, environmental and well-being certifications such as WELL, Fitwel, LEED, and Living Building Challenge. SEAM focuses on social equity outcomes and references the relevant social provisions of those frameworks where applicable.'),
  p('SEAM Activities also align directly with the UN Sustainable Development Goals, the UN Guiding Principles on Business and Human Rights, ISO 26000:2010, and the International Bill of Human Rights. Appendix A maps SEAM Activities to the relevant UN SDG targets.'),
]

const frameworkBody: Block[] = [
  h3('Pillars, Concepts, Objectives, and Activities'),
  p('The SEAM Standard is a structured framework to advance social equity in construction and real estate projects. It organizes this guidance into four key Pillars: Social Impact, Social Responsibility, Social Justice, and Social Accountability.'),
  p('Within these Pillars, the standard defines eight distinct Concepts that focus on specific social themes. Each Concept contains Objectives, which set the specific goals we aim to achieve. Each Objective has Activities or specific actions to reach these goals. Due to the "roadmap" structure of the framework, Activities are the steps you take to achieve the Objectives.'),
  p('To ensure effectiveness, each Activity lists Requirements or specific rules that must be followed to ensure the Activity is completed successfully. Recognizing that not every Activity applies to all types of projects, the standard includes four active Rating Systems. Each Activity specifies which Rating System it aligns with.'),
  p('This structured approach provides a comprehensive system for achieving the vital components of social sustainability.'),

  h3('Document Structure'),
  p('The presentation of Pillars, Concepts, Objectives, and Activities information follows a consistent outline structure. Each Activity page presents:'),
  liBold('Activity header — ', 'Activity number, the Concept and Objective the Activity belongs to, the Activity type (Driver or Impact), and the Rating Systems the Activity applies to.'),
  liBold('Scope — ', 'Describes the specific aspects covered in this Activity, defining its boundaries and focus.'),
  liBold('Requirements — ', 'List of specific requirements that must be satisfied for the Activity, with citations to sources where applicable, separated into Act to Avoid Harm, Benefit Impacted Parties, and Contribute to Solutions sections where applicable.'),
  liBold('Indicators — ', 'The performance indicator used to measure the Activity\'s output and assign scoring, and any context indicators collected to support measuring impact.'),
  liBold('Scoring — ', 'Outcome threshold, points assignment rubric, and additional-points assignment where applicable.'),
  liBold('Documentation — ', 'Specifies the type of documentation required to demonstrate compliance and support the calculated scores.'),
  liBold('Referenced Source — ', 'The internationally accepted source from which the Activity is based.'),

  h3('Activity Naming Convention'),
  p('In the SEAM Standard, "Activities" are the basic units used for measurement in SEAM Certification. To refer to an Activity, the format is as follows: each Activity is identified uniquely, starting with the term "Activity." This is followed by an upper-case two-letter abbreviation representing the specific Concept. A lowercase "a" is then used to designate it as an Activity. The next part of the name includes a number indicating the relevant Objective within the Concept. After a decimal point, another number specifies the particular Activity\'s sequence within that Objective. This systematic approach ensures clarity and precision in referencing Activities within the SEAM Standard.'),
  p('Example: Activity IAa1.1 — "Activity" + "IA" (Impact Assessment) + "a" (Activity) + "1" (Objective 1 within IA) + ".1" (first Activity within Objective 1).'),

  h3('Rating systems'),
  p('Not all Activities are universally applicable to every project as their relevance depends on the type of project and the Owner\'s role. Project types can be construction/renovation projects or operating/managing assets. The Owner role is separated into the role of a Developer and the role of an Occupier. Rating systems are combinations of project type and Owner role. They aim to ensure that Owners have a Rating system that includes only the relevant Activities for application of the SEAM Standard to their project. SEAM v.1 is organized into 5 (4 active + 1 future) Rating Systems which are:'),
  liBold('Buildings + Interiors: Developer (B+I:D) — ', 'Construction projects where a building or interior is undergoing ground-up construction — from raw, undeveloped land, tear-down of an existing structure, from a previously developed site ground, or major renovations of an existing building — as the Developer, where the Owner assumes Developer responsibilities including project ownership, vision establishment, financing procurement, construction supervision, landlord duties, and tenant leasing management.', 'number'),
  liBold('Buildings + Interiors: Occupier (B+I:O) — ', 'Construction projects of an existing building or space where the Owner is either a Tenant or Property Owner that has no Landlord duties or control over Tenant leasing.', 'number'),
  liBold('Operations + Maintenance: Developer (O+M:D) — ', 'Projects that involve the ongoing operations and maintenance of a building or space that\'s already constructed, where the Owner is the entity that owns the building or space and oversees its long-term operations, maintenance, and acts as Landlord.', 'number'),
  liBold('Operations + Maintenance: Occupier (O+M:O) — ', 'Projects that involve the ongoing operations and maintenance of a building or space that\'s already constructed, where the Owner is either a Tenant or property owner with no Landlord duties or control over Tenant leasing.', 'number'),
  liBold('Community Development (CD) — ', 'This Rating System is TBD.', 'number'),

  h3('Sustainability interdependency'),
  p('The SEAM Standard focuses solely on commercial real estate\'s direct impacts on people and addresses a system of interdependent social issues that do not necessarily contain goals for environmental impact. While environmental goals are not within the scope of the SEAM Standard, it must be noted that environmental and social goals are often inextricably linked.'),
  p('Therefore, an overarching theme is that activities to address social issues shall not cause negative environmental impacts to achieve. In turn, any other certifications undertaken in addition to SEAM must also address this interdependency similarly. Activities to address environmental sustainability shall not create nor allow negative social impacts.'),
  p('This kind of holistic decision-making must become the norm to avoid and eventually reverse damage to our social systems. This creates system value, and the SEAM Standard was developed specifically to help Owners put this concept into practice.'),

  h3('Cross-cutting themes'),
  p('This document includes a comprehensive glossary, but it is essential to highlight a few key concepts that are central to SEAM Certification. These guiding principles should permeate every aspect of a project\'s life cycle to achieve meaningful and lasting social impact.'),
  pBoldLead('Impacted party engagement. ', 'This is the fundamental step of any social impact initiative and improves transparency, builds trust, and strengthens relationships.'),
  pBoldLead('Prevent, mitigate, remediate. ', 'Drawing from the UNGPs on Business and Human Rights, it\'s vital to identify potential adverse impacts, take measures to prevent or reduce them and address any harm caused, ensuring overall positive impact.'),
  pBoldLead('Transparent communication. ', 'Transparency and access to information are essential to a rights-based social protection system. To effectively guarantee transparency, information should be available, accessible, and disseminated among the population of applicable impacted parties.'),

  h3('Certification'),
  pWithLink('For detailed information about certification to the SEAM Standard, see the SEAM Certification Guidebook, which can be found on the SEAM website: ', 'www.seamcertification.org', 'https://www.seamcertification.org', ' in the Resources section.'),

  h3('Activity types'),
  p('Activities are the foundation of the standard. There are two types of Activities in the SEAM Standard.'),
  h4('Driver Activities'),
  p('The SEAM framework incorporates Driver Activities to lay a strong foundation for Impact Activities. These Driver Activities adhere to best practices and ensure that preparatory steps are done correctly. They serve as critical indicators of future performance and can be actively modified to improve the odds of success. While these activities may not directly measure social impact, they act as essential building blocks leading to it. For instance, Activity IAa1.2 involves completing a value chain map, helping the Owner identify all impacted parties. An accurate impacted party list is crucial for the success of later Impact Activities.'),
  h4('Impact Activities'),
  p('Impact Activities in the SEAM framework refer to the actions that directly indicate progress toward achieving social equity goals and impact. These activities directly show the project\'s progress in achieving social equity goals. For example, assessing the living wage gap directly measures the Owner\'s performance against a societal threshold for paying wages that allow individuals to cover their basic needs.'),
  p('An indication of Activity type is provided for each Activity in the Standard.'),

  h3('Requirements'),
  p('Requirements are the qualifications or criteria that must be satisfied to ensure an Activity is completed correctly. They are based on principles from established internationally accepted standards and best practices set by governmental and professional organizations for social equity and social sustainability. Requirements must be satisfied depending on scoring targets for each Activity.'),
  p('Where applicable, Requirements for each Activity have been separated into Act to Avoid Harm, Benefit Impacted Parties, and Contribute to Solutions sections. Where this subdivision applies, the achievement of Requirements follows a progressive model. The Owner cannot claim credit for fulfilling any Requirements in the "Benefit Impacted Parties" or "Contribute to Solutions" sections until all Requirements under "Act to Avoid Harm" are satisfied. This structure ensures that progress does not allow the possibility of offsetting negative impacts through positive actions.'),
  p('Where Requirements do not cite specific references, Requirements are sourced from the Referenced Source for the Activity.'),
  p('When country or location-specific regulations differ from SEAM requirements, projects are expected to achieve whichever is more stringent. If less stringent levels or measures are appropriate given specific project circumstances, a complete and detailed justification for any proposed alternatives is necessary as part of the application documentation. This justification should demonstrate that the choice for any alternative performance level protects human rights.'),

  h3('Indicators'),
  p('Owners need to measure progress and impact and understand how to prioritize where action is most needed.'),
  h4('Performance indicators'),
  p('Performance indicators are direct measures of progress toward fulfilling the Requirements of each Activity. They provide the basis for assigning scores in a certification. Where possible, performance indicators are calculated and expressed as percentages.'),
  p('Performance indicators are comprised of the following types:'),
  liBold('Scoring-table progress measurement — ', 'allows for measuring social challenges, which must be addressed with broad and interconnected solutions across multiple criteria. For example, a project\'s progress toward providing fair and decent work could be rated as 60% if they fulfill some of the specific criteria requirements used to measure progress but are missing others.', 'number'),
  liBold('Proxy indicator — ', 'an indirect measure of the desired outcome which is itself strongly correlated to that outcome. It is commonly used when direct measures of the outcome are unobservable and/or unavailable. The specific proxy measures were selected as the most effective indicators of influencing the desired outcomes or as an existing and commonly accepted proxy. The proxy indicator allows for measuring a leading indicator that is positively correlated to the desired outcome.', 'number'),
  liBold('Binary indicators — ', 'Yes/No type indicators track the presence or absence of specific practices, policies, or documentation. They are mostly found in Driver activities and require verification documentation to provide evidence of compliance to the Requirements.', 'number'),
  h4('Context indicators'),
  p('A context indicator is a specific piece of data or information that helps understand the broader circumstances or conditions within which a project, program, or property operates. These indicators include demographic data, economic conditions, cultural aspects, and more. They provide a holistic picture of the environment and help to understand the different factors that may affect the outcomes of an initiative or intervention. They provide the basis for determining impact and do not factor into scoring in a certification.'),
  p('By adequately utilizing context indicators, impact reports can provide a robust, nuanced, and comprehensive picture of a project\'s effectiveness. This helps to maintain transparency, inform future strategy, and illustrate the project\'s social value to impacted parties and the wider community.'),

  h3('Scoring'),
  p('To assess compliance with the SEAM Standard during a certification implementation, a scoring rubric indicates the score assigned to the performance indicator achieved in each Activity. Scores reflect the progress achieved according to the requirements.'),

  h3('Documentation'),
  h4('Introduction to SEAM Documentation'),
  p('SEAM Certification requires Owners to provide documentation as evidence that the project meets SEAM Standard requirements. When reporting performance on a SEAM Certification Application, an Owner or Administrator should proactively ensure and communicate that its data and calculations are correct.'),
  p('To ensure the integrity of SEAM Certification Applications, the evaluation process by SEAM Reviewers involves thoroughly examining the provided information. They look into the authenticity of the reported activities and outcomes, ensuring that all critical details are included and accurately attributed to the project. The assessment also covers the accuracy of data calculations and the clarity in its presentation, ensuring that the information is transparent and understandable.'),
  p('When a SEAM Certification Application is being reviewed, the reviewing team\'s objective is to determine whether documentation provides evidence that SEAM Standard requirements were met. The Documentation section within each Activity guides the Owner or Administrator in collecting the required information.'),
  p('In select activities under the SEAM Standard, verification is focused on ensuring adherence to prescribed guidelines and process steps rather than evaluating the factual accuracy of document data. These occur primarily during Driver activities; a notation will indicate where this type of verification occurs.'),
]

const designBody: Block[] = [
  h3('Social metrics based on principles'),
  p('The SEAM Standard for social impact measurement emphasizes understanding and referencing the guiding principles that lead to change. By grounding metrics in the measurement of these principles, measures are accurate, ethical, and transformative. Prioritizing principles to measure outputs advances a deeper understanding of the issues and promotes strategies that lead to lasting positive change.'),

  h3('Framework design'),
  p('Recognizing the complexity inherent in social sciences, SEAM has developed a framework that integrates social equity principles into the fabric of its rating system design. The SEAM Standard framework embeds social equity into the scorecard design in six ways.'),

  h4('1. Timely Contextual Analysis'),
  pBoldLead('People are complex, and they change. ', 'The SEAM Standard requires conducting a Social Impact Assessment (SIA) for every certification. An SIA is the process of identifying and managing the social issues of project development. It includes the effective engagement of affected communities in participatory processes of identification, assessment, and management of social impacts. By thoroughly understanding the context and specificity of the project and engaging with the relevant impacted parties at the time of the project, it increases the chances that actions and interventions will be successful.'),
  p('Careful design of solutions and interventions can prevent irreversible effects on people, such as displacement, social inequality, and cultural erosion. These consequences can undermine the project\'s objectives and lead to resistance from local communities, causing delays, cost overruns, and reputational damage. By integrating SIA into the early stages of project planning, Owners can mitigate risks and design projects to maximize value for local communities and minimize social costs.'),
  p('In addition to the challenge of preventing negative consequences, the conditions and constraints affecting social issues and possible solutions change over time, changing both the problem and the range of options designed to address it. Conducting an SIA for each project allows the Owner to address the issues that are current and relevant.'),

  h4('2. No offsetting of negative impacts'),
  pBoldLead('Human harm cannot be offset. ', 'As noted in the United Nations Guiding Principles (UNGP), a company\'s commitment to maximize opportunities for positive impact and contribute to advancing human rights does not offset its failure to respect human rights throughout its operations.'),
  p('Therefore, wherever applicable, the requirements for each Activity have been separated into Act to Avoid Harm, Benefit Impacted Parties, and Contribute to Solutions sections. In all cases where this delineation occurs, the Owner will only be credited for achieving requirements in Benefit Impacted Parties or Contribute to Solutions once all Act to Avoid Harm requirements are met. This design ensures that the SEAM Certification does not allow offsetting of adverse impacts.'),

  h4('3. Social science logic model structure'),
  pBoldLead('Logic-based outcome models. ', 'Social issues can be complex with intertwined challenges that may have multiple possible solutions. A clear plan is necessary to ensure our actions effectively lead to desired outcomes. The SEAM Standard uses a well-organized process, known as a logic model, to create Activities with the highest chance of creating those desired outcomes. This logic model, rooted in standardized methods for measuring and managing impact, has five stages: what we need (Inputs), what we do (Activities), what we produce (Outputs), what changes (Outcomes), and the overall effect (Impact).'),
  p('"Through this approach, the precise link between activities and the achievement of the long-term goals are more fully understood. This leads to better planning, in that activities are linked to a detailed understanding of how change happens. It also leads to better evaluation, as it is possible to measure progress toward the achievement of longer-term goals beyond identifying program outputs."'),
  h4('Definitions for the five phases of the logic model'),
  pBoldLead('Inputs ', 'are the resources the Owner will use to accomplish the Activities (e.g., finances, architect, contractors, materials, human resources). Inputs will be collected by the SEAM Administrator for each Activity and reported on the SEAM Certification Application. Collecting this information allows SEAM to understand trends and averages and more properly prepare an Owner for pursuing certification.'),
  pBoldLead('Activities ', 'are actions that will be taken or tasks completed during certification. The Activities on the SEAM scorecard represents the Activities in our logic model.'),
  pBoldLead('Output — ', 'Each Activity produces an Output which is a direct and quantifiable product of the Activity. It is represented in the SEAM scorecard by the performance indicator, or key performance indicator (KPI), and is expressed in numbers, percentages, amounts, or other units. These outputs are necessary to standardize performance measurement for comparison, measuring progress over time, and to base the SEAM points awarded for each Activity.'),
  pBoldLead('Outcome — ', 'The Outcome is the changes or benefits resulting from the Activities. These changes may occur at the individual, group, community, or organizational level. Outcomes can be immediate, intermediate, or long-term impacts. It is typically expressed as "increasing" or "decreasing" conditions.'),
  pBoldLead('Impact — ', 'Finally, the impact is the portion of the Outcome or change in long-term condition, attributable to the Project\'s Activities. This requires subtracting the counterfactual, or the change that would have happened regardless, and subtracting any change that can be attributed to the action of another party. What is left is the impact that is attributable to the project.'),

  h4('4. Score weighting based on salient human rights'),
  pBoldLead('Structured prioritization of human rights impacts. ', 'UN Guiding Principle 24 states, "Where it is necessary to prioritize actions to address actual and potential adverse human rights impacts, business enterprises should first seek to prevent and mitigate those that are most severe or where the delayed response would make them irremediable."'),
  p('This principle shapes the scoring system on the SEAM scorecard for each SEAM Activity, whereby points are awarded based on the importance and potential negative impact of the social issue being addressed, referred to as its saliency. The issues that could cause the most severe harm are identified as the project\'s salient issues.'),
  p('For each SEAM Activity, the Severity and Management aspects were evaluated, reflecting a typical commercial real estate project. Various factors were examined following the guidelines from the UN Guiding Principles on Business and Human Rights. Under the Severity dimension, scope, scale, and possibility of remedying the impacts were assessed. Under the Management dimension, the likelihood, attribution, and level of effort to address the issues were evaluated.'),
  h4('Assessed Dimensions Definitions'),
  pBoldLead('Scope ', 'addresses how many people could be affected and was rated from 1 to 3, with 3 being greater than 20% of the total population in the impact area or greater than 50% of an identifiable group; 2 being greater than 10% of the total population or 11–49% of an identifiable group; and 1 being greater than 5% of total population or less than 10% of an identifiable group.'),
  pBoldLead('Scale ', 'represents how serious the impacts would be for the person and was rated from 1 to 3, with 3 for an impact that will cause death or adverse health effects that could lead to a significant reduction in quality of life and/or longevity; 2 for a tangible human right infringement of access to basic life necessities (e.g., education, livelihood); and 1 for all other impacts.'),
  pBoldLead('Remediability ', 'considers whether the remedy will restore the victim to the same or equivalent position before the harm and was rated from 1 to 3, with 3 being difficult to restore; 2 being moderately difficult to restore; and 1 being easy to restore.'),
  pBoldLead('Likelihood ', 'estimates the likelihood that the risk of negative impact or opportunity for positive impact will happen in the next two years and was rated from 1 to 3, with 3 being the risk or opportunity has or is occurring; 2 for risks/opportunities that may occur in the future; and 1 if it is unlikely to occur.'),
  pBoldLead('Attribution ', 'looks at how closely the project is connected to the impact and was rated from 1 to 3, 3 being the project caused the impact; 2 being it contributed to the impact; and 1 for being linked to the impact (through business contracts and relationships).'),
  pBoldLead('Level of effort ', 'assesses the resources necessary to prevent or mitigate the negative impact or capitalize on the opportunity to create positive impact and was rated from 1 to 3, with 3 being high; 2 being moderate; and 1 being low.'),
  p('Each aspect of Severity was assigned a value for every SEAM Activity; these values were summed up and then doubled, emphasizing the higher importance of Severity compared to Management. Subsequently, the values for the Management aspect were totaled for each SEAM Activity and combined with the Severity total. This combined total was then halved to determine the Available Points.'),
  p('The design of this scoring system aims to guide the prioritization of activities, aligning with the UN Guiding Principles, by incentivizing Owners to focus on SEAM Activities with higher Available Points. This way, activities of higher significance concerning human rights issues are attended to diligently, promoting responsible and ethical project management.'),

  h4('5. Roadmap design'),
  pBoldLead('Guidance to do the right things in the right ways. ', 'The SEAM Certification framework has been constructed to navigate the complexity of implementing social initiatives based on international standards, frameworks, and principles. It assigns specific preliminary activities within the Social Responsibility and Social Impact pillars that are essential prerequisites for the more advanced activities within the Social Justice and Social Accountability pillars. This structure addresses a common issue in social initiatives: the failure to achieve meaningful outcomes often stems from the need to complete or adequately execute these foundational activities.'),
  p('For example, a flawed or omitted impacted party mapping process can compromise the effectiveness of subsequent impacted party feedback collection. You can only ensure you\'ve consulted all relevant parties if the initial mapping is complete or correct. Therefore, SEAM Certification incorporates these essential preliminary activities to lay the groundwork, ensuring that the more advanced activities can achieve their intended outcomes.'),

  h4('6. Certification levels aligned to impact goals'),
  pBoldLead('The goal is impact. ', 'The SEAM Certification adopts a structured approach to evaluating projects based on the "ABC" Impact Goals outlined by the Impact Management Project (IMP), a globally recognized framework for measuring social impact. The ABC Impact Goals are defined as:'),
  pBoldLead('A. Act to avoid harm: ', 'This goal emphasizes identifying and addressing any negative impacts a project may have on people\'s well-being, intending to improve these outcomes towards a sustainable range defined by a specific benchmark known as the outcome threshold. Under this goal, the focus is on improving the adverse outcomes, even if the project may only partially achieve a sustainable outcome within the set objective period.'),
  pBoldLead('B. Benefit impacted parties: ', 'This goal extends beyond Acting to Avoid Harm. It requires maintaining or enhancing the well-being of one or more groups of people to fall within a sustainable range established by the societal threshold.'),
  pBoldLead('C. Contribute to solutions: ', 'This goal takes a step further by not only Benefitting impacted parties but also improving the well-being of a group of people so that the outcome is within the sustainable range for many people and/or has a long-term duration.'),
  p('During the SEAM Certification process, the outcomes of each project Activity are evaluated and categorized under one of the ABC Impact Goals. This categorization of individual Activities subsequently informs the classification of the entire project, which allows for determining the certification levels, as each level corresponds to one of the ABC Impact Goals.'),
  p('Figure 3 in the printed standard illustrates the ABC Impact Goals in relation to the outcome threshold, which is the point where impacted parties experiencing an impact consider the outcome to be positive. Any outcome falling below this benchmark is viewed negatively. This illustration aligns the ABC Impact Goals with the SEAM Certification levels, visually representing how projects are evaluated and classified based on their impact.'),
  p('All Projects should be Acting to avoid harm for all significant negative impacts. Projects causing negative impacts that are not improving are classified as Does or may cause harm. Until performance improves, the project is not eligible for a SEAM Certification.'),
]

// ---------------------------------------------------------------------------

const sections = [
  {
    _id: 'intro-acknowledgments',
    title: 'Acknowledgments',
    slug: 'acknowledgments',
    order: 1,
    summary: 'Lead author, Technical Advisory Group, Founding Sponsors, and contributors who shaped the SEAM Standard.',
    body: acknowledgmentsBody,
  },
  {
    _id: 'intro-introduction',
    title: 'Introduction',
    slug: 'introduction',
    order: 2,
    summary: 'What SEAM is, what a SEAM Certification means, and who administers it.',
    body: introductionBody,
  },
  {
    _id: 'intro-development-overview',
    title: 'Development overview',
    slug: 'development-overview',
    order: 3,
    summary: 'Six years of R&D, the "do no harm" threshold, and how SEAM aligns with other certifications.',
    body: developmentOverviewBody,
  },
  {
    _id: 'intro-framework',
    title: 'Framework',
    slug: 'framework',
    order: 4,
    summary: 'Pillars, Concepts, Objectives, and Activities; document structure; rating systems; cross-cutting themes; activity types; requirements; indicators; scoring; documentation.',
    body: frameworkBody,
  },
  {
    _id: 'intro-design',
    title: 'Standard design',
    slug: 'design',
    order: 5,
    summary: 'The six design principles embedding social equity into the SEAM scorecard.',
    body: designBody,
  },
]

async function run() {
  for (const s of sections) {
    console.log(`Seeding ${s._id} (${s.body.length} blocks)...`)
    await client.createOrReplace({
      _id: s._id,
      _type: 'introSection',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      order: s.order,
      summary: s.summary,
      body: s.body,
    })
  }
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
