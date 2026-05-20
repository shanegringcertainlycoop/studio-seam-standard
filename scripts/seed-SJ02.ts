/**
 * Seeds Objective SJ02 + Activities SJa2.1–SJa2.5.
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
  // ─── Objective SJ02 ──────────────────────────────────────────────────────
  console.log('Patching Objective SJ02...')
  await client.patch('objective-SJ02').set({
    headlineGoal: 'Establish workplaces where all employees feel valued, respected, and fairly treated, irrespective of their backgrounds or identities, to decrease workplace inequalities.',
    narrative: [
      p('By ensuring fairness, respect, and equal remuneration, we can directly contribute to diminishing systemic biases and prejudices. This leads to a more equitable distribution of resources, opportunities, and recognition within the workplace. As a result, employees from historically underrepresented backgrounds experience increased socio-economic stability, improved mental well-being due to a more inclusive work environment, and enhanced professional growth opportunities. Collectively, these changes contribute to a more just and equitable society where individual worth is recognized and rewarded irrespective of background or identity.'),
      p('Central to this goal is adopting human-centered and inclusive design of environments to meet the needs of a diverse workforce; Owners and Suppliers establishing a culture of inclusivity by upholding principles of fairness and respect in all professional interactions; and closing wage gaps based on diverse characteristics.'),
      p('When more historically underrepresented people can earn fair wages and achieve financial stability, they are better equipped to invest in education, health care, and other areas that promote social welfare. This can lead to stronger families, communities, and economies over time.'),
    ],
  }).commit()

  // ─── New editorial note xxi ──────────────────────────────────────────────
  console.log('Seeding editorial note xxi...')
  await client.createOrReplace({
    _id: 'note-xxi', _type: 'editorialNote', marker: 'xxi', order: 21,
    body: [p('This calculation uses the arithmetic average as there is no weighting difference in the inclusive design categories.')],
  })

  // ─── Master bibs for SJ02 referenced sources ─────────────────────────────
  console.log('Seeding master bibs...')
  await client.createOrReplace({
    _id: 'bib-un-crpd', _type: 'bibliographyEntry',
    citation: 'The United Nations Convention on the Rights of Persons with Disabilities (CRPD)',
  })
  await client.createOrReplace({
    _id: 'bib-ada-standards', _type: 'bibliographyEntry',
    citation: 'Americans with Disabilities Act (ADA) Standards for Accessible Design',
  })
  await client.createOrReplace({
    _id: 'bib-ilo-equal-remuneration', _type: 'bibliographyEntry',
    citation: 'ILO, Equal Remuneration Convention, 1951 (No. 100)',
  })
  await client.createOrReplace({
    _id: 'bib-ilo-fundamental-principles', _type: 'bibliographyEntry',
    citation: 'ILO\'s Declaration on Fundamental Principles and Rights at Work',
  })
  await client.createOrReplace({
    _id: 'bib-udhr-art2', _type: 'bibliographyEntry',
    citation: 'UN Universal Declaration of Human Rights (1948), Article 2',
  })
  await client.createOrReplace({
    _id: 'bib-udhr-art23', _type: 'bibliographyEntry',
    citation: 'UN Universal Declaration of Human Rights (1948), Article 23',
  })
  await client.createOrReplace({
    _id: 'bib-ilo-c190-master', _type: 'bibliographyEntry',
    citation: 'International Labor Organization, Violence and harassment in the world of work, Convention 190, June 2019',
  })

  // ─── SJa2.1 Human-centered inclusive design ──────────────────────────────
  console.log('\nSeeding SJa2.1...')
  await client.createOrReplace({
    _id: 'activity-SJa2-1', _type: 'activity',
    activityId: 'SJa2.1',
    title: 'Follow human-centered inclusive design practices',
    slug: { _type: 'slug', current: 'sja2-1' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      pWithBib('The Owner shall create built environments that are accessible, usable, and welcoming to everyone. ‘Consider the full range of human diversity, with respect to ability, language, culture, gender, age, and other forms of human differences', '70', ''),
      pWithBib('. Aim for environments that are ‘accessible and usable by as many people as reasonably possible, without special adaptation or specialized design’', '71', '.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [pWithBib('Physical Accessibility: Ensure the concerns and experiences of persons with disabilities are an integral dimension of the design and/or operations of the physical asset such that persons with disabilities and aging populations benefit equally, achieving equality of outcomes and creating an inclusive culture', '72', ' through compliance with one of the following:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('ADA 2010: Americans with Disabilities Act')] },
              { _key: k(), letter: 'b', body: [p('BS 8300-2-2018: Design of an accessible and inclusive built environment - Part 1 + 2')] },
              { _key: k(), letter: 'c', body: [p('EN 17210-2021: Accessibility and usability of the built environment – Functional requirements')] },
              { _key: k(), letter: 'd', body: [p('ISO 21542: Building construction - Accessibility and usability of the built environment')] },
              { _key: k(), letter: 'e', body: [p('Country-specific physical accessibility minimums standard will be considered under the Alternative Pathway option')] },
            ],
          },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties + Contribute to Solutions',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Neurodiversity + mental well-being')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Main circulation corridors or pathways are consistent in design (width, floor texture, color)')] },
              { _key: k(), letter: 'b', body: [p('Wayfinding signage visuals & clues are readable with high-contrast and non-glare materials')] },
              { _key: k(), letter: 'c', body: [p('Definition of transition zones using at least two design elements')] },
              { _key: k(), letter: 'd', body: [p('Spatial sequencing to reduce the visual length of any corridor or circulation path')] },
              { _key: k(), letter: 'e', body: [p('Natural light management and lighting choices through dimming and/or color-changing')] },
              { _key: k(), letter: 'f', body: [p('Patterns & graphics (glazing, walls & ceiling) do not have depth implications')] },
              { _key: k(), letter: 'g', body: [p('Flooring patterns & transitions avoid optical illusions')] },
              { _key: k(), letter: 'h', body: [p('Noise management solutions such as soundproofing, white noise, and sound-absorbing materials')] },
              { _key: k(), letter: 'i', body: [p('Diversity and compartmentalization of workspaces and reconfigurable furniture')] },
              { _key: k(), letter: 'j', body: [p('Sensory zoning strategy with no-, low-, medium-, and high-stimuli areas with defining signage')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [p('Sexual orientation + gender identity')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('All gender restrooms')] },
              { _key: k(), letter: 'b', body: [p('All gender changing rooms')] },
              { _key: k(), letter: 'c', body: [p('Equal equipment in restrooms such as ledges, coat hooks, and full-length mirrors')] },
              { _key: k(), letter: 'd', body: [p('Sanitary bins')] },
              { _key: k(), letter: 'e', body: [p('Menstrual product distribution accessory')] },
              { _key: k(), letter: 'f', body: [p('Supportive and empowering imagery and artwork')] },
              { _key: k(), letter: 'g', body: [p('Gender-neutral signage, artwork, and wayfinding')] },
              { _key: k(), letter: 'h', body: [p('Intersectionality in imagery & elements')] },
              { _key: k(), letter: 'i', body: [p('Flexible workspace options')] },
              { _key: k(), letter: 'j', body: [p('Privacy panels for open desks/workstation areas')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 4,
            body: [p('Ethnicity + culture')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Supportive and imagery & elements')] },
              { _key: k(), letter: 'b', body: [p('Intersectionality in artwork, including diverse populations')] },
              { _key: k(), letter: 'c', body: [p('Representative artwork, imagery, and elements of local culture and history')] },
              { _key: k(), letter: 'd', body: [p('Construction material, product, or art linked to local creator')] },
              { _key: k(), letter: 'e', body: [p('Private, enclosed room for meditation, prayer, reflection, etc.')] },
              { _key: k(), letter: 'f', body: [p('Culturally inclusive restroom facilities such as ablution areas and toilet rinse sprays')] },
              { _key: k(), letter: 'g', body: [p('Food provisions offer a variety of culturally inclusive food options')] },
              { _key: k(), letter: 'h', body: [p('Dedicated food preparation/warming of halal, vegan/vegetarian, and/or gluten-free food')] },
              { _key: k(), letter: 'i', body: [p('Multilingual signage and wayfinding for those speaking different languages')] },
              { _key: k(), letter: 'j', body: [p('Meeting rooms and spaces that can be adjusted easily to reflect cultural norms')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 5,
            body: [p('Gender equity')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Breastfeeding or lactation (nursing) room')] },
              { _key: k(), letter: 'b', body: [p('Workstation modesty panels')] },
              { _key: k(), letter: 'c', body: [p('No open risers in staircases')] },
              { _key: k(), letter: 'd', body: [p('Access routes to public transportation or parking is safe and well-lit')] },
              { _key: k(), letter: 'e', body: [p('Mobile phone coverage is available in all areas of the building and parking areas')] },
              { _key: k(), letter: 'f', body: [p('Workspaces and meeting rooms with temperature control')] },
              { _key: k(), letter: 'g', body: [p('Supportive, empowering, and gender-balanced art, imagery & elements')] },
              { _key: k(), letter: 'h', body: [p('Equal equipment in restrooms, such as diaper changing stations')] },
              { _key: k(), letter: 'i', body: [p('Room naming is gender balanced (if applicable)')] },
              { _key: k(), letter: 'j', body: [p('Visible and accessible emergency resources (e.g., panic buttons, emergency contact information) in private and communal spaces')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 6,
            body: [p('Age inclusion + functional accessibility')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Adjustable desk heights')] },
              { _key: k(), letter: 'b', body: [p('Lockers at easy access heights for different body sizes')] },
              { _key: k(), letter: 'c', body: [p('Closed captioning on all videos that include audio')] },
              { _key: k(), letter: 'd', body: [p('Adjustable height task lights')] },
              { _key: k(), letter: 'e', body: [p('Low-glare workstations and surfaces')] },
              { _key: k(), letter: 'f', body: [p('Furniture with contrast from flooring')] },
              { _key: k(), letter: 'g', body: [p('Operable doors are visually distinguishable from walls')] },
              { _key: k(), letter: 'h', body: [p('All glass partitions have easily detectable manifestations to the ceiling')] },
              { _key: k(), letter: 'i', body: [p('Ergonomic furniture with comfortable and neutral body positions')] },
              { _key: k(), letter: 'j', body: [p('Seating of different sizes and heights to accommodate various body sizes')] },
            ],
          },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of project inclusively designed. The context indicator is the number of building occupants (employees, vendors, visitors, etc.) for the building/space/asset.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine the percentage of design requirements achieved for each inclusive design category (not including mandatory requirement #1).', 'number', 1),
              pWithNote('Calculate progress as the percentage average', 'note-xxi', ' of the project’s inclusive and equity-centered design.'),
              p('Step 1'),
            ],
            formula: 'C#% = (# design requirements achieved / # requirements in category) x 100',
          },
          {
            _key: k(),
            instructions: [p('Step 2')],
            formula: 'P = (C1% + C2% + C3% + C4% + C5% + C6% + C7% + C8% / 8) x 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of project inclusively designed' },
              { symbol: 'C#%', meaning: 'percentage of design requirements achieved for each inclusive design category' },
              { symbol: '8', meaning: 'total number of inclusive design categories' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirement #1 must be satisfied to be eligible for points.',
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Project Inclusively Designed',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '20% of project inclusively designed' },
          { _key: k(), pointsLabel: '4 points', criterion: '40% of project inclusively designed' },
          { _key: k(), pointsLabel: '6 points', criterion: '60% of project inclusively designed' },
          { _key: k(), pointsLabel: '8 points', criterion: '80% of project inclusively designed' },
          { _key: k(), pointsLabel: '9 points', criterion: '90% of project inclusively designed' },
          { _key: k(), pointsLabel: '10 points', criterion: '100% of project inclusively designed' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      {
        _type: 'documentationItem', _key: k(), number: 2,
        body: [p('Accessibility compliance verification documentation for one of the following standards:')],
        subItems: [
          { _key: k(), letter: 'a', body: [p('ADA 2010: Americans with Disabilities Act')] },
          { _key: k(), letter: 'b', body: [p('BS 8300-2-2018: Design of an accessible and inclusive built environment - Part 1 and Part 2')] },
          { _key: k(), letter: 'c', body: [p('EN 17210-2021: Accessibility and usability of the built environment – Functional requirements')] },
          { _key: k(), letter: 'd', body: [p('ISO 21542: Building construction - Accessibility and usability of the built environment')] },
        ],
      },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Final as-built construction drawings highlighting all Inclusive Design features.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Images of all installed Inclusive Design features, captured after formal regulatory approval to operate.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Inclusive Design table indicating installed Inclusive Design features matching Activity requirements by category, with specific features listed and cross-referenced to construction drawings and images.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On additional sources of verification',
        body: [
          p('The following is a list of additional verification documents that could provide evidence of achieving the stated inclusive design requirements:'),
          li('Accessibility Audit Reports: These reports, often carried out by specialists, assess the accessibility of a design or environment against established standards. They can provide evidence for a variety of inclusive design principles, such as equitable use, perceptible information, tolerance for error, low physical effort, and size and space for approach and use.', 'number', 1),
          li('User Testing Results: User testing involves observing and recording the experiences of a diverse range of users interacting with the design or environment. These results can demonstrate equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and size and space for approach and use.', 'number', 1),
          li('User Feedback Surveys: Collecting and analyzing user feedback can help identify how well a design meets the needs of different users. This can provide evidence for all-inclusive design principles.', 'number', 1),
          li('Design Plans: Detailed design plans or blueprints can show the incorporation of inclusive design principles. The presence of universal features, flexible features, fail-safe features, and space considerations can be confirmed.', 'number', 1),
          li('Manufacturer Specifications: These documents detail the features and functionalities of specific products or systems. They can provide evidence of flexibility in use, low physical effort, and size and space for approach and use.', 'number', 1),
          li('Cognitive Walkthrough Results: This usability inspection method is designed to evaluate the user interaction of a system. It can provide evidence of simple and intuitive use.', 'number', 1),
          li('Heuristic Evaluation Results: This is another usability inspection method, which involves experts evaluating the compliance of a system with recognized usability principles (the "heuristics"). This can provide evidence of simple and intuitive use.', 'number', 1),
          li('Content Strategy Documents: These outline the approach to clear, consistent, and intuitive information presentation, providing evidence of simple and intuitive use.', 'number', 1),
          li('Auditory and Visual Contrast Test Results: These tests assess the perceptibility of information, providing evidence for perceptible information.', 'number', 1),
          li('Safety Audit Reports: These reports assess the safety features of a design or environment, which can provide evidence of tolerance for error.', 'number', 1),
          li('Incident Reports and Corrective Action Plans: These documents record instances where the design failed to prevent errors or accidents, and outline the steps taken to correct these issues. They provide evidence of tolerance for error.', 'number', 1),
          li('Ergonomic Assessment Reports: These assessments evaluate the interaction between people and the elements of a system they use, to optimize human well-being and overall system performance. They provide evidence of low physical effort.', 'number', 1),
          p("Note: User testing results, user feedback surveys, and accessibility audit reports should include the participation of people with a range of abilities, including those with disabilities, to ensure a comprehensive understanding of the design's effectiveness."),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On human-centered inclusive design requirements',
        body: [
          p('To determine the overarching categories, we drew upon widely accepted principles and best practices in inclusive design from the Center for Universal Design, School of Design, North Carolina State University, and the Commission for Architecture and the Built Environment (CABE), an arm of the UK Design Council. These sources offer insights into the key aspects of inclusive design and provide guidance on creating environments that are accessible, inclusive, and cater to all user needs.'),
          p('According to the Institute of Human Centered Design, accessibility laws and state codes form a foundational baseline, but they alone do not fully encapsulate the potential of design to enhance independence, participation, and wellbeing for a significant portion of the global population. With lifespans increasing due to advancements in healthcare, most individuals will experience periods of functional limitation during their lives. Recognizing this reality demands a shift in perception — design is no longer about catering only to "special" needs.'),
          p('Inclusive or universal design, as advocated by the Institute for Human Centered Design, extends beyond the realm of accessible design. It calls upon the innovative spirit and creativity of designers to create places that seamlessly cater to the broadest possible range of potential users. The ultimate objective is to transition from disabling environments — encompassing physical, informational, communicational, social, and policy aspects — towards enabling ones that are universally accessible.'),
          p('The principle of sustainable design transcends the concept of environmental sustainability, incorporating the facet of social sustainability as well. The demographic evolution of the 21st century underscores the urgency of leveraging the power of design to minimize functional limitations and optimize performance for all individuals. To achieve this, the Institute for Human Centered Design proposes a reimagined agenda for inclusion. This vision of universal design needs to be embedded into sustainable development strategies and organizational policies. By adopting these principles, we can support a more inclusive and equitable world that reflects the diverse needs of our global community.'),
          p('Additional Resources'),
          li('Institute for Human Centered Design (IHCD) - http://www.humancentereddesign.org/'),
          li('Center for Universal Design at the State University of North Carolina at Raleigh - https://www.ncsu.edu/ncsu/design/cud/'),
          li('Commission for Architecture and the Built Environment (CABE) - http://www.cabe.org.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Cross-walks',
        body: [
          li("JLL's DEI Standard for the Built Environment"),
          li('Core rating in DEI Standard equates to 60% progress towards the objective', 'bullet', 2),
          li('Advanced rating in DEI Standard equates to 80% progress towards objective', 'bullet', 2),
          li('Excellence rating in DEI Standard equates to 100% progress towards objective', 'bullet', 2),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-un-crpd' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ada-standards' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa2.1')

  // ─── SJa2.2 Owner fair and respectful treatment ──────────────────────────
  console.log('\nSeeding SJa2.2...')
  await client.createOrReplace({
    _id: 'activity-SJa2-2', _type: 'activity',
    activityId: 'SJa2.2',
    title: 'Owner must provide fair and respectful treatment of employees',
    slug: { _type: 'slug', current: 'sja2-2' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall treat their full-time, part-time, and contract employees well by providing good working conditions, treating everyone with respect, promoting equal opportunities, and preventing any discrimination or harassment to create a respectful and fair workplace.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [pWithBib('An anti-discrimination policy that contains the following', '73', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('No employee shall be discriminated against because of race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences.')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [pWithBib('An anti-harassment policy regarding bullying and harassment which includes', '74', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Protection against violence and harassment for workers and other persons in the world of work, including employees as defined by national law and practice, as well as persons working irrespective of their contractual status, persons in training, including interns and apprentices, workers whose employment has been terminated, volunteers, job seekers and job applicants, and individuals exercising the authority, duties, or responsibilities of an employer.')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('Integration of the policies into project operations through the following', '75', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Actively communicate the policy to employees and store or post in a manner so that all employees have access to it and provide education and training in accessible formats.')] },
              { _key: k(), letter: 'b', body: [p('Reference or incorporate the policy into recruitment and training practices, employee performance evaluations, promotion or advancement decisions, and compensation guidelines.')] },
              { _key: k(), letter: 'c', body: [p('Owner shall provide for sanctions and ensure effective means of inspection and investigation.')] },
              { _key: k(), letter: 'd', body: [p('Owner shall create a mechanism to document feedback submitted through the grievance mechanism established in Activity HRa3.2 for internal reference, along with the steps taken by the company to investigate and address the issues raised.')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Assessment of the effectiveness of anti-discrimination controls at regular intervals and adjust when necessary.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [pWithBib('Flexible working conditions to employees to help them deal effectively with work-life conflicts, including flexibility in timing and location of work', '76', '.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [pWithBib('Provide access to informational guidance or supporting resources (e.g., counseling services) to help address primary sources of stress at work, such as workload demands, lack of control/empowerment, lack of support from colleagues, inadequate resources, conflict relationships, unclear roles, and change fatigue', '77', '.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of fair and respectful treatment of Owner employees according to the requirements. The first context indicator is the total number of Owner employees working on the project. The second context indicator is the total number of Owner employees for which the progress score is 100%, which will be used to assess the impact of this Activity.'),
        p('The fair and respectful treatment of people is scored against the requirements as follows:'),
        li('0%: No requirements are satisfied, or any employee not covered by both anti-discrimination and anti-harassment policies.'),
        li('20%: Adoption of an anti-discrimination + anti-harassment policy is only requirement satisfied.'),
        li('40%: Addition of requirements from #3 is satisfied.'),
        li('60%: Addition of #4 requirement is satisfied.'),
        li('80%: Addition of #5 is satisfied.'),
        li('100%: All requirements are satisfied.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'single',
        steps: [{
          _key: k(),
          instructions: [
            p('To calculate the performance indicator:'),
            li('Determine total number of employees working on the project.', 'number', 1),
            li('Calculate progress as the weighted average of the project’s fair and respectful treatment program across all employees working on the project.', 'number', 1),
            p('This is expressed mathematically as:'),
          ],
          formula: 'P = (0(E0%) + 0.2(E20%) + 0.4(E40%) + 0.6(E60%) + 0.8(E80%) + 1(E100%)) / N x 100',
          variables: [
            { symbol: 'P', meaning: 'percentage of fair and respectful treatment of people' },
            { symbol: 'Ex%', meaning: 'number of employees for which the progress score is x%' },
            { symbol: 'N', meaning: 'total number of employees on the project' },
          ],
        }],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The outcome threshold for this Activity is 60% progress according to the requirements. This represents ‘acting to avoid harm’.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Fair and Respectful Treatment of Owner Employees',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '20% of fair and respectful treatment of Owner employees' },
          { _key: k(), pointsLabel: '4 points', criterion: '40% of fair and respectful treatment of Owner employees' },
          { _key: k(), pointsLabel: '6 points', criterion: '60% of fair and respectful treatment of Owner employees' },
          { _key: k(), pointsLabel: '8 points', criterion: '80% of fair and respectful treatment of Owner employees' },
          { _key: k(), pointsLabel: '10 points', criterion: '100% of fair and respectful treatment of Owner employees' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Document the specific method(s) used to determine the number of employees working on the project, such as headcount reports or time-tracking systems.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Provide a copy of the company’s policies for anti-discrimination and anti-harassment.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Record the steps taken to communicate the project’s anti-discrimination and anti-harassment policies to employees, including the ways the policies have been integrated into recruitment, training, or performance evaluation processes or materials.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Document the feedback procedures or grievance mechanisms in place which facilitate employees’ ability to report cases of discrimination and harassment in the workplace and retain any notes and evidence of actions taken based on employee submissions.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Letter of Assurance and documentation that the project’s anti-discrimination and anti-harassment controls are working as intended. Reviewers may check these controls to determine whether the project is able to identify and address any problems with the concern-reporting mechanism within a reasonable timeframe. If not, there is a risk that instances of discrimination could go undetected by the company.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Documentation outlining the flexible working conditions provided to employees, including how flexibility in timing and location of work is accommodated.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Evidence of the availability of informational guidance or supporting resources for addressing workplace stress, such as brochures, website links, or service contracts with external support providers like counseling services.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
        body: [
          li('Ethical Trading Initiative (ETI) Base Code - founded on the conventions of the ILO and is an internationally recognized code of labor practice.'),
          li('OECD Guidelines for Multinational Enterprises - provide recommendations covering responsible business conduct, including employment and industrial relations.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c190-master' }, footnote: { _type: 'reference', _ref: 'bib-78' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa2.2')

  // ─── SJa2.3 Tier 1 Suppliers fair and respectful treatment ──────────────
  console.log('\nSeeding SJa2.3...')
  await client.createOrReplace({
    _id: 'activity-SJa2-3', _type: 'activity',
    activityId: 'SJa2.3',
    title: 'Tier 1 Suppliers must provide fair and respectful treatment of workers',
    slug: { _type: 'slug', current: 'sja2-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall ensure all Tier 1 Suppliers, which supply services or materials, treat their full-time, part-time, and contract workers well by providing good working conditions, treating everyone with respect, promoting equal opportunities, and preventing any discrimination or harassment to create a respectful and fair workplace.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [pWithBib('Tier 1 anti-discrimination policy that contains the following', '79', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('No worker shall be discriminated against because of race, ethnicity, color, religious beliefs, sex (including pregnancy and related conditions, gender identity, and sexual orientation), national origin, age, disability, genetic information, economic background, or cognitive differences.')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [pWithBib('Tier 1 anti-harassment policy regarding bullying and harassment which includes', '80', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [pWithBib('Protection against violence and harassment for workers and other persons in the world of work, including workers as defined by national law and practice, as well as persons working irrespective of their contractual status, persons in training, including interns and apprentices, workers whose employment has been terminated, volunteers, jobseekers and job applicants, and individuals exercising the authority, duties, or responsibilities of an employer.', '81', '')] },
            ],
          },
          {
            _type: 'requirementItem', _key: k(), number: 3,
            body: [pWithBib('Integration of the policies into Tier 1 project operations through the following', '82', ':')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Actively communicate policy to workers, and store or post in a manner so that all workers have access to it and provide education and training in accessible formats.')] },
              { _key: k(), letter: 'b', body: [p('Reference or incorporate the policy into recruitment and training practices, worker performance evaluations, promotion or advancement decisions, and compensation guidelines.')] },
              { _key: k(), letter: 'c', body: [p('Owner shall provide for sanctions and ensure effective means of inspection and investigation.')] },
              { _key: k(), letter: 'd', body: [p('Owner shall create a mechanism to document feedback submitted through the grievance mechanism established in HRa3.2 for internal reference, along with the steps taken by the company to investigate and address the issues raised.')] },
            ],
          },
          { _type: 'requirementItem', _key: k(), number: 4, body: [p('Assess the effectiveness of Tier 1 anti-discrimination controls at regular intervals and implement adjustments when necessary.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Benefit Impacted Parties',
        items: [
          { _type: 'requirementItem', _key: k(), number: 5, body: [pWithBib('Provide flexible working conditions to Tier 1 workers to help them deal effectively with work-life conflicts, including flexibility in timing and location of work', '83', '.')] },
        ],
      },
      {
        _type: 'requirementGroup', _key: k(), heading: 'Contribute to Solutions',
        items: [
          { _type: 'requirementItem', _key: k(), number: 6, body: [pWithBib('Provide Tier 1 Suppliers access to informational guidance or supporting resources (e.g., counselling services) to help address primary sources of stress at work, such as workload demands, lack of control/empowerment, lack of support from colleagues, inadequate resources, conflict relationships, unclear roles, and change fatigue', '84', '.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of fair and respectful treatment of Tier 1 workers according to the requirements. The first context indicator is the total number of Tier 1 workers working on the project. The second context indicator is the total number of Tier 1 workers for which the progress score is 100% (used to track impact).'),
        p('The fair and respectful treatment of Tier 1 workers is scored against the requirements as follows:'),
        li('0%: No requirements satisfied, or any worker not covered by anti-discrimination + anti-harassment policies.'),
        li('20%: Adoption of an anti-discrimination + anti-harassment policy is only requirement satisfied.'),
        li('40%: Addition of requirements from #3 is satisfied.'),
        li('60%: Addition of #4 requirements is satisfied.'),
        li('80%: Addition of #5 is satisfied.'),
        li('100%: All requirements are satisfied.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine each Tier 1 Supplier’s number of workers working on the project.', 'number', 1),
              li('Calculate each Tier 1 Supplier’s progress as the weighted average of Tier 1 Supplier’s fair and respectful treatment of people according to the requirements.', 'number', 1),
              li('Determine the overall progress as the average of all Tier 1 Supplier’s progress scores.', 'number', 1),
              p('Step 1: Calculate for each Tier 1 Supplier'),
            ],
            formula: 'p# = (0(E0%) + 0.2(E20%) + 0.4(E40%) + 0.6(E60%) + 0.8(E80%) + 1(E100%)) / n# x 100',
            variables: [
              { symbol: 'p#', meaning: 'progress towards objective, expressed as a percentage' },
              { symbol: 'Ex%', meaning: 'number of workers for which the progress score is x%' },
              { symbol: 'n#', meaning: 'total number of workers on the project' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2: Average the percentage scores across all Tier 1 Suppliers')],
            formula: 'P = (p1% + p2% + p3% + p4% + …) / N x 100',
            variables: [
              { symbol: 'P', meaning: 'average progress towards objective across all Tier 1 Suppliers' },
              { symbol: 'p#%', meaning: 'vendor percentage progress towards objective' },
              { symbol: 'N', meaning: 'total number of vendors' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      outcomeThreshold: [p('The outcome threshold for this Activity is 60% of fair and respectful treatment of Tier 1 workers. This represents the progress that is socially sustainable by satisfying all four Act to Avoid Harm requirements.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage of Fair and Respectful Treatment of Tier 1 Workers',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '20% of fair and respectful treatment of Tier 1 workers' },
          { _key: k(), pointsLabel: '3 points', criterion: '40% of fair and respectful treatment of Tier 1 workers' },
          { _key: k(), pointsLabel: '5 points', criterion: '60% of fair and respectful treatment of Tier 1 workers' },
          { _key: k(), pointsLabel: '7 points', criterion: '80% of fair and respectful treatment of Tier 1 workers' },
          { _key: k(), pointsLabel: '9 points', criterion: '100% of fair and respectful treatment of Tier 1 workers' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Document the specific method(s) used to determine the number of workers working on the project, such as headcount reports or time-tracking systems. Reviewers may use this information to assess the risk that workers were inadvertently omitted from the assessment.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Provide a copy of the company’s policies for anti-discrimination and anti-harassment.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Record the steps taken to communicate the project’s anti-discrimination and anti-harassment policies to workers, including the ways the policies have been integrated into recruitment, training, or performance evaluation processes or materials. This can help reviewers understand and evaluate the project’s strategy for communicating the policy to workers according to the requirements.')] },
      { _type: 'documentationItem', _key: k(), number: 5, body: [p('Document the feedback procedures or grievance mechanisms in place which facilitate workers’ ability to report cases of discrimination and harassment in the workplace and retain any notes and evidence of actions taken based on worker submissions. Reviewers may evaluate the concern-reporting mechanism’s design in terms of its appropriateness in identifying and resolving discrimination concerns.')] },
      { _type: 'documentationItem', _key: k(), number: 6, body: [p('Documentation that the project’s anti-discrimination and anti-harassment controls are working as intended. Reviewers may check these controls to determine whether the project is able to identify and address any problems with the concern-reporting mechanism within a reasonable timeframe. If not, there is a risk that instances of discrimination could go undetected by the company.')] },
      { _type: 'documentationItem', _key: k(), number: 7, body: [p('Documentation outlining the flexible working conditions provided to workers, including how flexibility in timing and location of work is accommodated.')] },
      { _type: 'documentationItem', _key: k(), number: 8, body: [p('Evidence of the availability of informational guidance or supporting resources for addressing workplace stress, such as brochures, website links, or service contracts with external support providers like counseling services.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'Additional Resources',
        body: [
          li('Ethical Trading Initiative (ETI) Base Code - founded on the conventions of the ILO and is an internationally recognized code of labor practice.'),
          li('OECD Guidelines for Multinational Enterprises - provide recommendations covering responsible business conduct, including employment and industrial relations.'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-c190-master' }, footnote: { _type: 'reference', _ref: 'bib-85' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa2.3')

  // ─── SJa2.4 Gender wage gap ─────────────────────────────────────────────
  console.log('\nSeeding SJa2.4...')
  await client.createOrReplace({
    _id: 'activity-SJa2-4', _type: 'activity',
    activityId: 'SJa2.4',
    title: 'Owner must ensure equal remuneration, regardless of gender, for work of equal value',
    slug: { _type: 'slug', current: 'sja2-4' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall ensure fair pay policies such that everyone on the team, irrespective of their gender, shall receive the same salary or wage if they are doing work of equal value. In other words, if two people are performing the same tasks with the same level of skill, expertise, and effort, they should be compensated equally. This responsibility promotes a culture of equality and discourages any forms of pay discrimination in the project.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('A gender wage gap analysis for equal work across all work types assigned to the project.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Remediation of the identified gender wage gap, for all Owner employees assigned to the project, for equal work by adjusting remuneration, which includes compensation, benefits, and/or promotion.')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('A regular monitoring program to evaluate wage gaps through self-assessment and public reporting, and/or consistent third-party audits, at an interval not longer than once per year, for all employees assigned to the project.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of the gender wage gap after all remediation efforts are complete. The first context indicator is the total number of female-identifying and nonbinary employees on the project who had wages remediated, which will be used to assess impact. The second context indicator is the percentage of the gender wage gap that was remediated.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine whether employees are doing equal work (see Guidance).', 'number', 1),
              li('Calculate the mean (average) pay for female-identifying and nonbinary employees doing each work type by adding all female-identifying and nonbinary employees’ gross pay amounts and dividing by the number of female-identifying and nonbinary employees.', 'number', 1),
              li('Calculate the mean pay for male employees doing each work type by adding all male employees’ gross pay amounts and dividing by the number of male employees.', 'number', 1),
              li('Calculate the combined mean* for female-identifying and nonbinary employees’ pay across all work types', 'number', 1),
              li('Calculate the combined mean* for Male employees’ pay across all work types.', 'number', 1),
              li('Subtract the female-identifying and nonbinary employees’ combined mean pay from the male employees’ combined mean pay.', 'number', 1),
              li('Divide that result by the male employees’ combined mean pay and multiply by 100.', 'number', 1),
              p('Step 1: Calculate for each work type'),
            ],
            formula: 'FN = (w1(x1) + w2(x2) + … / w1 + w2 + …)',
            variables: [
              { symbol: 'FN', meaning: 'the combined mean of female-identifying and nonbinary employees’ pay across all work types' },
              { symbol: 'w#', meaning: 'the number of female-identifying and nonbinary employees working in the work type' },
              { symbol: 'x#', meaning: 'the mean pay of female-identifying and nonbinary employees across the work type' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2: Calculate for each work type')],
            formula: 'M = (w1(x1) + w2(x2) + … / w1 + w2 + …)',
            variables: [
              { symbol: 'M', meaning: 'the combined mean of male-identifying employees’ pay across all work types' },
              { symbol: 'w#', meaning: 'the number of female-identifying and nonbinary employees working in the work type' },
              { symbol: 'x#', meaning: 'the mean pay of female-identifying and nonbinary employees across the work type' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 3')],
            formula: 'P1 = (M - FN / M) x 100',
            variables: [
              { symbol: 'P1', meaning: 'average equal work gender pay gap before pay adjustments' },
              { symbol: 'M', meaning: 'the combined mean of male-identifying employees’ pay across all work types (from above)' },
              { symbol: 'FN', meaning: 'the combined mean of female-identifying and nonbinary employees’ pay across all work types (from above)' },
            ],
          },
          {
            _key: k(),
            instructions: [
              p('Continue for as many work types as are in the study.'),
              p('* A combined mean is simply a weighted mean, where the weights are the size of each group.'),
              p('To calculate the context indicator:'),
              li('Once pay adjustments are complete, recalculate the gender pay gap.', 'number', 1),
              li('Calculate the percentage of the original wage gap that has been remediated.', 'number', 1),
              p('This is expressed mathematically as:'),
            ],
            formula: 'P = ((P1 – P2) / P2) x 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of wage gap that was remediated' },
              { symbol: 'P1', meaning: 'average equal work gender pay gap before pay adjustments' },
              { symbol: 'P2', meaning: 'average equal work gender pay gap after pay adjustments' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirements 1 and 2 are required to be eligible for scoring.',
      outcomeThreshold: [pWithBib('The outcome threshold for this Activity is that the average equal work gender pay gap after pay adjustments (P2 above) shall not exceed 3%', '86', '. This represents ‘acting to avoid harm’. By supporting all employees receiving equal pay for equal work regardless of their gender, the project is progressing towards equitable development.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Gender Wage Gap',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '5.1 - 10% gender wage gap' },
          { _key: k(), pointsLabel: '4 points', criterion: '3.1 - 5% gender wage gap' },
          { _key: k(), pointsLabel: '6 points', criterion: '.1 - 3% gender wage gap' },
          { _key: k(), pointsLabel: '8 points', criterion: '0% gender wage gap' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #3 satisfied' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Third-party gender wage gap audit report performed that states the gender wage gap as a percentage. Audit reports should not disclose employee/worker data or information and should state only the method used to collect data, the calculation of the percentage, and the percentage wage gap.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Verification of commitment to undergo regular audits at an interval not longer than once per year.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On additional collection of performance indicators',
        body: [
          p('Indicators necessary to report in the UNRISD Sustainable Development Performance Indicators, Tier 2. B. Socioeconomic area, II.B.6 Gender pay gap: Equality of remuneration are:'),
          li('Overall gender pay gap at the organizational level'),
          li('Gender pay gaps at each occupational level'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On types of equal work',
        headingFootnote: { _type: 'reference', _ref: 'bib-87' },
        body: [
          p('There are three kinds of equal work:'),
          li('like work is the same or broadly similar. It involves similar tasks that require similar knowledge and skills, and any differences in the work are not of practical importance.', 'number', 1),
          li('work rated as equivalent has been rated under a valid job evaluation scheme as being of equal value in terms of how demanding it is.', 'number', 1),
          li('work of equal value is not similar and has not been rated as equivalent but is of equal value in terms of demands such as effort, skill, and decision-making.', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On justifying pay differences',
        headingFootnote: { _type: 'reference', _ref: 'bib-88' },
        body: [
          p('“If a woman proves that she is doing equal work to a man, there is a legal presumption that any difference in their pay is because of their sex unless the employer can show that a ‘material factor’ explains the difference. A material factor must:'),
          li('be a genuine reason for the difference in pay'),
          li('cause the difference in pay'),
          li('be significant and relevant'),
          li('explain the pay difference with ‘particularity’ - this means the employer must be able to show how each factor was assessed and how it applied in the woman’s specific case'),
          li('not be tainted by direct or indirect sex discrimination'),
          p('Learn more about material factors and equal pay claims at: https://www.equalityhumanrights.com/guidance/equal-pay'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On closing the gender pay gap',
        headingFootnote: { _type: 'reference', _ref: 'bib-89' },
        body: [
          p('For companies seeking to enhance gender diversity across their organization, it is important to take stock of gender inequalities, including gender pay gaps, which may be part of their organizational culture. Enterprises can take numerous measures to help close the gender pay gap in their organization. As a first step, recognition of the business benefits of improved gender diversity at all levels is critical as well as commitment from top leadership. More specific approaches to narrowing the pay gap include:'),
          li('Promoting a gender-inclusive business culture while adopting a holistic approach to equal remuneration for self-identifying female, nonbinary employees and men for work of equal value.'),
          li('Making equitable salary offers to men, self-identifying female, and nonbinary employees.'),
          li('Basing pay on the position itself rather than previous pay of the employee as the latter perpetuates the gender pay gap.'),
          li('Undertaking a gender pay review in the enterprise to assess whether there is a gender pay gap and to what extent.'),
          li('Making jobs more flexible so that more self-identifying female and nonbinary employees access higher-level jobs and, therefore, higher pay.'),
          li('Ensuring that unconscious gender bias does not affect performance reviews by relying on objective vs subjective criteria.'),
          li('Selecting and applying a job evaluation methodology to assess the skills and responsibilities of the various jobs in the enterprise with a view to adjust job titles, contents, and corresponding pay overtime.'),
          p('Additional Resources'),
          li('Equality and Human Rights Commission’s Equal Value Estimator – assists in determining whether jobs are equal in value'),
          li('Equality and Human Rights Commission’s Sample Collecting and Comparing Pay Info spreadsheet – assists in collection and comparison of pay information across jobs and gender characteristics'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art2' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-fundamental-principles' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-equal-remuneration' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa2.4')

  // ─── SJa2.5 Diversity wage gap ──────────────────────────────────────────
  console.log('\nSeeding SJa2.5...')
  await client.createOrReplace({
    _id: 'activity-SJa2-5', _type: 'activity',
    activityId: 'SJa2.5',
    title: 'Owner must ensure equal remuneration for work of equal value regardless of diversity characteristics',
    slug: { _type: 'slug', current: 'sja2-5' },
    pillar: { _type: 'reference', _ref: 'pillar-social-justice' },
    concept: { _type: 'reference', _ref: 'concept-SJ' },
    objective: { _type: 'reference', _ref: 'objective-SJ02' },
    activityType: 'Impact',
    ratingSystemApplication: RATING_ALL,
    scope: [
      p('The Owner shall ensure fair pay policies such that everyone on the team, irrespective of their diversity characteristics, shall receive the same salary or wage if they are doing work of equal value. In other words, if two people perform the same tasks with the same skill, expertise, and effort, they should be compensated equally. This responsibility promotes a culture of equality and discourages pay discrimination in the project.'),
    ],
    requirements: [
      {
        _type: 'requirementGroup', _key: k(), heading: 'Act to Avoid Harm',
        items: [
          { _type: 'requirementItem', _key: k(), number: 1, body: [p('Diversity wage gap analysis for equal work across all work types assigned to the project, where diversity characteristics are self-identified.')] },
          { _type: 'requirementItem', _key: k(), number: 2, body: [p('Remediation of the diversity wage gap, for all employees assigned to the project, for equal work by adjusting remuneration, which includes compensation, benefits, and/or promotion.')] },
          { _type: 'requirementItem', _key: k(), number: 3, body: [p('A regular monitoring program to evaluate wage gaps through self-assessment and public reporting, and/or consistent third-party audits, at an interval not longer than once per year, for all employees assigned to the project.')] },
        ],
      },
    ],
    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of the diversity wage gap, after all remediation efforts are complete. The first context indicator is the total number of employees from underrepresented groups (EUG) on the project that had wages remediated, which is used to assess impact. The second context indicator is the percentage of the remediated diversity wage gap.'),
      ],
      calculation: {
        _type: 'calculation', mode: 'multi-step',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine whether employees are doing equal work (see Guidance below).', 'number', 1),
              li('Calculate the mean pay for employees from underrepresented groups (EUG) doing each work type by summing gross pay amounts and dividing by the number of employees from underrepresented groups.', 'number', 1),
              li('Calculate the mean pay for employees NOT from underrepresented groups doing each work type by summing gross pay amounts and dividing by the number of employees NOT from underrepresented groups.', 'number', 1),
              li('Calculate the combined mean* for employees from underrepresented groups pay across all work types.', 'number', 1),
              li('Calculate the combined mean for employees NOT from underrepresented groups’ pay across all work types.', 'number', 1),
              li('Subtract the employees from underrepresented groups’ combined mean pay from the employees NOT from underrepresented groups’ combined mean pay.', 'number', 1),
              li('Divide that result by the employees NOT from underrepresented groups’ combined mean pay and multiply by 100.', 'number', 1),
              p('Step 1: Calculate for each work type'),
            ],
            formula: 'D = (w1(x1) + w2(x2) + … / w1 + w2 + …)',
            variables: [
              { symbol: 'D', meaning: 'the combined mean of employees from underrepresented groups’ pay across all work types' },
              { symbol: 'w#', meaning: 'the number of employees from underrepresented groups working in the work type' },
              { symbol: 'x#', meaning: 'the mean pay of employees from underrepresented groups across the work type' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 2: Calculate for each work type')],
            formula: 'ND = (w1(x1) + w2(x2) + … / w1 + w2 + …)',
            variables: [
              { symbol: 'ND', meaning: 'the combined mean of employees not from underrepresented groups pay across all work types' },
              { symbol: 'w#', meaning: 'the number of employees not from underrepresented groups working in the work type' },
              { symbol: 'x#', meaning: 'the mean pay of employees not from underrepresented groups across the work type' },
            ],
          },
          {
            _key: k(),
            instructions: [p('Step 3')],
            formula: 'P1 = (ND - D / ND) x 100',
            variables: [
              { symbol: 'P1', meaning: 'average equal work diversity pay gap' },
              { symbol: 'D', meaning: 'combined mean of employees from underrepresented groups’ pay across all work types (from above)' },
              { symbol: 'ND', meaning: 'the combined mean of employees not from underrepresented groups pay across all work types (from above)' },
            ],
          },
          {
            _key: k(),
            instructions: [
              p('Continue for as many work types as are in the study.'),
              p('* A combined mean is simply a weighted mean, where the weights are the size of each group.'),
              p('To calculate the context indicator:'),
              li('Once pay adjustments are complete, recalculate the diversity pay gap.', 'number', 1),
              li('Calculate the percentage of the original wage gap that has been remediated.', 'number', 1),
              p('This is expressed mathematically as:'),
            ],
            formula: 'P = ((P1 – P2) / P2) x 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of wage gap that was remediated' },
              { symbol: 'P1', meaning: 'average equal work diversity pay gap before pay adjustments' },
              { symbol: 'P2', meaning: 'average equal work diversity pay gap after pay adjustments' },
            ],
          },
        ],
      },
    },
    scoring: {
      _type: 'scoring', mode: 'single',
      eligibility: 'Requirements 1 and 2 are required to be eligible for scoring.',
      outcomeThreshold: [p('The outcome threshold for this Activity is that the average equal work diversity pay gap after pay adjustments shall not exceed 3%. This represents ‘acting to avoid harm’. By ensuring that all employees receive equal pay for equal work regardless of their diversity characteristics, the project is progressing towards equitable development.')],
      pointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Percentage Gender Wage Gap',
        bands: [
          { _key: k(), pointsLabel: '2 points', criterion: '5.1 - 10% gender wage gap' },
          { _key: k(), pointsLabel: '4 points', criterion: '3.1 - 5% gender wage gap' },
          { _key: k(), pointsLabel: '6 points', criterion: '.1 - 3% gender wage gap' },
          { _key: k(), pointsLabel: '8 points', criterion: '0% gender wage gap' },
        ],
      },
      additionalPointsAssignment: {
        _type: 'scoringRubric', criterionLabel: 'Additional Requirements',
        bands: [
          { _key: k(), pointsLabel: '+2 points', criterion: 'Requirement #3 satisfied' },
        ],
      },
    },
    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Third-party diversity wage gap audit performed that states the diversity wage gap as a percentage. Audit reports should not disclose employee/worker data or information and should state only the method used to collect data, the calculation of the percentage, and the percentage wage gap.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Verification of commitment to undergo regular audits at an interval not longer than once per year.')] },
    ],
    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On determining employees from underrepresented groups',
        body: [
          p('Diversity can encompass a large set of characteristics that would make it inordinately difficult to accurately assess the diversity wage gap in this Activity. In following the concept of prioritizing the most salient issues first, we shall define diversity using guidance from the UN Guiding Principles, which are based on internationally recognized human rights. They make clear that companies should pay attention to additional standards covering the human rights of individuals from groups that may be particularly vulnerable to negative impacts. These additional standards identify these specific groups as race, women, children, migrant workers, persons with disabilities, Indigenous peoples, and national or ethnic, religious, and linguistic minoritized groups. Therefore, the SEAM adopted definition of employees from underrepresented groups shall include:'),
          li('Race', 'number', 1),
          li('Sex', 'number', 1),
          li('Gender, including gender identity and sexual orientation', 'number', 1),
          li('Migrant workers', 'number', 1),
          li('Persons with disabilities', 'number', 1),
          li('Indigenous peoples', 'number', 1),
          li('Ethnic minoritized groups', 'number', 1),
          li('Religious minoritized groups', 'number', 1),
          li('Age (aged 50 and above, according to the ILO)', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On types of equal work',
        headingFootnote: { _type: 'reference', _ref: 'bib-92' },
        body: [
          p('There are three kinds of equal work:'),
          li('like work is the same or broadly similar. It involves similar tasks which require similar knowledge and skills, and any differences in the work are not of practical importance.', 'number', 1),
          li('work rated as equivalent has been rated under a valid job evaluation scheme as being of equal value in terms of how demanding it is.', 'number', 1),
          li('work of equal value is not similar and has not been rated as equivalent but is of equal value in terms of demands such as effort, skill and decision-making.', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(), heading: 'On justifying pay differences',
        headingFootnote: { _type: 'reference', _ref: 'bib-93' },
        body: [
          p('“If a woman proves that she is doing equal work to a man, there is a legal presumption that any difference in their pay is because of their sex, unless the employer can show that a ‘material factor’ explains the difference.'),
          p('A material factor must:'),
          li('be a genuine reason for the difference in pay'),
          li('cause the difference in pay'),
          li('be significant and relevant'),
          li('explain the pay difference with ‘particularity’ - this means the employer must be able to show how each factor was assessed and how it applied in the woman’s specific case'),
          li('not be tainted by direct or indirect sex discrimination'),
          p('Learn more about material factors and equal pay claims at: https://www.equalityhumanrights.com/guidance/equal-pay'),
          p('Additional Resources'),
          li('Equality and Human Rights Commission’s Equal Value Estimator – assists in determining whether jobs are equal in value'),
          li('Equality and Human Rights Commission’s Sample Collecting and Comparing Pay Info spreadsheet – assists in collection and comparison of pay information across jobs and gender characteristics'),
        ],
      },
    ],
    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art2' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-udhr-art23' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-fundamental-principles' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-ilo-equal-remuneration' } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: 'bib-iso-30415' } },
    ],
    version: '1.1', status: 'published',
  })
  console.log('  ✓ SJa2.5')
}

run().catch((err) => { console.error(err); process.exit(1) })
