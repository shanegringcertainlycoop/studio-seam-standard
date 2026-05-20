/**
 * Seeds Activity TGa1.3 — "Promote community education on social responsibility
 * through creative education and awareness signage campaigns"
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

function liBoldAll(text: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [{ _type: 'span', _key: k(), text, marks: ['strong'] }],
    markDefs: [],
  }
}

function liWithNote(before: string, noteId: string, after: string, listItem: 'bullet' | 'number' = 'bullet', level = 1, bold = false) {
  const markKey = k()
  const marks = bold ? ['strong'] : []
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [
      { _type: 'span', _key: k(), text: before, marks },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks },
    ],
    markDefs: [
      { _type: 'editorialNoteRef', _key: markKey, note: { _type: 'reference', _ref: noteId } },
    ],
  }
}

function pWithBibs(parts: Array<string | { bib: string }>) {
  const children: Array<Record<string, unknown>> = []
  const markDefs: Array<Record<string, unknown>> = []
  for (const part of parts) {
    if (typeof part === 'string') {
      children.push({ _type: 'span', _key: k(), text: part, marks: [] })
    } else {
      const markKey = k()
      children.push({ _type: 'span', _key: k(), text: '', marks: [markKey] })
      markDefs.push({
        _type: 'bibliographyRef',
        _key: markKey,
        entry: { _type: 'reference', _ref: `bib-${part.bib}` },
      })
    }
  }
  return { _type: 'richText', _key: k(), style: 'normal', children, markDefs }
}

function liWithBib(before: string, bibNum: string, after: string, listItem: 'bullet' | 'number' = 'bullet', level = 1) {
  const markKey = k()
  return {
    _type: 'richText',
    _key: k(),
    style: 'normal',
    listItem,
    level,
    children: [
      { _type: 'span', _key: k(), text: before, marks: [] },
      { _type: 'span', _key: k(), text: '', marks: [markKey] },
      { _type: 'span', _key: k(), text: after, marks: [] },
    ],
    markDefs: [
      {
        _type: 'bibliographyRef',
        _key: markKey,
        entry: { _type: 'reference', _ref: `bib-${bibNum}` },
      },
    ],
  }
}

const IDS = {
  noteXVI: 'note-xvi',
  bibISO26000: 'bib-iso-26000',
  bibUNDIS: 'bib-un-disability-inclusion-strategy',
  activity: 'activity-TGa1-3',
}

async function run() {
  console.log('Seeding editorial note xvi...')
  await client.createOrReplace({
    _id: IDS.noteXVI,
    _type: 'editorialNote',
    marker: 'xvi',
    order: 16,
    body: [p('Go to https://native-land.ca/ to determine the Indigenous community associated with the land of the project.')],
  })
  console.log('  ✓ note xvi')

  console.log('\nSeeding UN Disability Inclusion Strategy master source...')
  await client.createOrReplace({
    _id: IDS.bibUNDIS,
    _type: 'bibliographyEntry',
    title: 'UN Disability Inclusion Strategy',
    citation: 'UN Disability Inclusion Strategy',
    url: 'https://www.un.org/en/content/disabilitystrategy/',
    sourceType: 'guidance',
  })
  console.log('  ✓ UN Disability Inclusion Strategy doc')

  console.log('\nSeeding Activity TGa1.3...')
  await client.createOrReplace({
    _id: IDS.activity,
    _type: 'activity',
    activityId: 'TGa1.3',
    title: 'Promote community education on social responsibility through creative education and awareness signage campaigns',
    slug: { _type: 'slug', current: 'tga1-3' },
    pillar: { _type: 'reference', _ref: 'pillar-social-responsibility' },
    concept: { _type: 'reference', _ref: 'concept-TG' },
    objective: { _type: 'reference', _ref: 'objective-TG01' },
    activityType: 'Driver',
    ratingSystemApplication: {
      _type: 'ratingSystemApplication',
      bi_developer: true,
      bi_occupier: true,
      om_developer: true,
      om_occupier: true,
      cd: false,
    },

    scope: [
      pWithBibs([
        "Owner shall design and implement informative signage campaigns within the property in alignment with the SEAM Standard's emphasis on promoting social responsibility awareness. Drawing inspiration from the principles of nudges, as defined as the automatic triggering of cognitive processes to favor desired outcomes",
        { bib: '40' },
        { bib: '41' },
        ', these signs aim to educate building occupants about socially responsible actions they might be unaware of. The ultimate objective is to subtly influence and encourage individuals towards more socially responsible behaviors, thereby promoting an environment that inherently supports and advances the principles of social responsibility.',
      ]),
    ],

    requirements: [
      {
        _type: 'requirementGroup', _key: k(),
        items: [
          {
            _type: 'requirementItem', _key: k(), number: 1,
            body: [p('At least fifty percent (50%) of common areas shall have signs that present and promote social responsibility concepts and behaviors.')],
          },
          {
            _type: 'requirementItem', _key: k(), number: 2,
            body: [p('Signage content shall cover at least four of these inclusive design concepts and focus on point-of-decision prompts to encourage socially responsible behavior:')],
            subItems: [
              { _key: k(), letter: 'a', body: [p('Physical accessibility')] },
              { _key: k(), letter: 'b', body: [p('Neurodiversity and mental health')] },
              { _key: k(), letter: 'c', body: [p('Sexual orientation and gender identity')] },
              { _key: k(), letter: 'd', body: [p('Gender equity')] },
              { _key: k(), letter: 'e', body: [p('Social responsibility and belonging / socioeconomic')] },
              { _key: k(), letter: 'f', body: [p('Ethnicity and culture')] },
              { _key: k(), letter: 'g', body: [p('Age inclusion')] },
            ],
          },
        ],
      },
    ],

    indicators: {
      _type: 'indicators',
      performanceIndicator: [
        p('The performance indicator is the percentage of common areas including social responsibility signage. The first context indicator is the total number of individuals exposed to posted signage (using average traffic data or more specific occupancy sensor data). The second context indicator is the total number of individuals reporting behavior changes due to signage (assessed through impacted party surveys).'),
      ],
      calculation: {
        _type: 'calculation',
        mode: 'single',
        steps: [
          {
            _key: k(),
            instructions: [
              p('To calculate the performance indicator:'),
              li('Determine total number of common areas throughout the project.', 'number', 1),
              li('Determine number of common areas that include social responsibility signs.', 'number', 1),
            ],
            formula: 'P = (C_S / N) × 100',
            variables: [
              { symbol: 'P', meaning: 'percentage of signed common areas' },
              { symbol: 'C_S', meaning: 'number of common areas that include signage' },
              { symbol: 'N', meaning: 'total number of common areas (not common area types, but the total count of each area throughout the project)' },
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
        criterionLabel: 'Percentage of Signed Common Areas',
        bands: [
          { _key: k(), pointsLabel: '1 point', criterion: '50% common areas with signage' },
          { _key: k(), pointsLabel: '2 points', criterion: '65% common areas with signage' },
          { _key: k(), pointsLabel: '3 points', criterion: '85% common areas with signage' },
        ],
      },
    },

    documentationItems: [
      { _type: 'documentationItem', _key: k(), number: 1, body: [p('List of financial, human, and material resources utilized for this activity.')] },
      { _type: 'documentationItem', _key: k(), number: 2, body: [p('Technical drawings such as the project installed (as-built) signage shop or permit drawings indicating every signage location, size and materiality of signs, and content of signs.')] },
      { _type: 'documentationItem', _key: k(), number: 3, body: [p('Submit a signage table indicating which concept each sign is intended to address showing that Requirement #2 is satisfied with a column indicating image name for photo evidence of installation.')] },
      { _type: 'documentationItem', _key: k(), number: 4, body: [p('Submit photo or video evidence of installed signage coordinated with signage table.')] },
    ],

    guidance: [
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On determining common areas and best signage locations',
        body: [
          {
            _type: 'richText', _key: k(), style: 'normal',
            children: [
              { _type: 'span', _key: k(), text: 'BOMA International defines "common areas" as ', marks: [] },
              { _type: 'span', _key: k(), text: 'portions of the building or project that are available for use by all tenants or occupants on a non-exclusive basis', marks: ['strong'] },
              { _type: 'span', _key: k(), text: '. This often includes such shared spaces as lobbies, stairwells, corridors, and entranceways.', marks: [] },
            ],
            markDefs: [],
          },
          p("It's important to balance visibility with aesthetics and practicality. Overloading with signs can lead to visual fatigue and subsequently reduce the effectiveness of the message."),
          p('Prioritize areas where people tend to pause or slow down, like entrances, elevators, waiting areas, conference or huddle rooms, or near amenities like water coolers or coffee machines. These spots are more likely to have stationary or slow-moving individuals who have time to absorb the information on the signage.'),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On recommendations for influential signage',
        body: [
          pWithBibs([
            'Creative signage is a good way to "nudge" people towards social responsibility. A good nudge is invisible, preserves choice, and reduces the mental bandwidth required to engage in inclusive and equitable behaviors',
            { bib: '42' },
            ' (see examples below in "On ideas and examples of signage"). The purpose of nudges is to guide people towards making better choices for themselves and society, while still preserving their freedom of choice. These strategies can be adapted and implemented in various ways depending on the specific context and goals of the built environment.',
          ]),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'Signage recommendations for "nudging":',
        body: [
          li('Feedback: Display statistics and facts about social issues on digital screens to inspire change. For example, "X% of our staff volunteered in community services last month. Join us in making a difference!" or "Our team represents X different cultures, ages, and abilities. Let\'s celebrate our diversity!"', 'number', 1),
          li('Expect Error: Use signs to remind people of common oversights that could undermine social equity. For instance, a sign in meeting rooms could say, "In meetings, let\'s ensure all voices are heard. Remember to allow for turn-taking in discussions" or use transcription applications to prevent defaulting to asking the lowest ranking female in the room to take notes for the group.', 'number', 1),
          li('Complexity: Simplify the understanding of complex social issues via infographics and other visual aids displayed prominently. For example, display infographics about the benefits of diverse teams in the workplace.', 'number', 1),
          li('Incentives: Promote socially responsible behavior with incentives. For example, a sign might read, Join our company\'s diversity and inclusion committee—help us shape an inclusive future and develop your leadership skills!"', 'number', 1),
          li('Salience: Use eye-catching graphics and quotes that promote social responsibility. For example, a large mural that says, "We rise by lifting others" can create a powerful visual impact or a mural/imagery depicting individuals from underrepresented groups working together can serve as a powerful, constant reminder of the value of inclusivity.', 'number', 1),
          li('Social Proof: Display stories of employees making socially responsible choices. For example, have a "Wall of Fame" that showcases staff members who\'ve made significant social contributions to their communities.', 'number', 1),
          li('Priming: Use subtle visual cues to promote socially responsible behavior. For instance, art depicting community cooperation and diversity or art depicting inclusive interactions can inspire similar behaviors.', 'number', 1),
          li('Mapping: Use visual aids to show the impact of social contributions. For example, a map showing locations where the company has made charitable contributions or where employees volunteer in their communities can make the impact more tangible.', 'number', 1),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'On ideas and examples for signage',
        body: [
          // 1. Community Involvement + Development
          li('Community Involvement + Development', 'number', 1),
          li('Highlight specific ways the company is involved in the local community, such as partnerships, projects, or volunteering initiatives.', 'bullet', 2),
          li('Use success stories or case studies to show the impact of community involvement.', 'bullet', 2),
          li('Detail how individuals in the building can contribute to these initiatives.', 'bullet', 2),
          li('"This community garden is the result of the partnership with _____ to provide fresh organic produce." Include photos or quotes from community members of their positive experience and the need that has been met. Signage can be used to highlight the success of the garden', 'bullet', 2),
          // 2. Social Investment
          li('Social Investment', 'number', 1),
          li('Use real-world examples of successful social investments the company has made.', 'bullet', 2),
          li('"This SEAM project provided ___ rain barrels to community residents through the Atlanta Watershed Alliance."', 'bullet', 2),
          // 3. Impact Assessment (with land acknowledgment quotes — bold + note xvi on first)
          li('Impact Assessment', 'number', 1),
          liWithNote('"We acknowledge that we are on the traditional land of the ______ People', IDS.noteXVI, '."', 'bullet', 2, true),
          liBoldAll('"I want to respectfully acknowledge the _______ People, who have stewarded this land throughout the generations."', 'bullet', 2),
          // 4. Social Equity + Justice
          li('Social Equity + Justice', 'number', 1),
          li('Present specific actions the company is taking to promote social equity and justice, such as diversity initiatives or fair trade partnerships', 'bullet', 2),
          li('"This project procured % from diverse companies?"', 'bullet', 2),
          // 5. Human Rights
          li('Human Rights', 'number', 1),
          li("Detail the company's commitment to respecting human rights, including any relevant policies or practices.", 'bullet', 2),
          li('"This SEAM certified project ensured all our direct suppliers provided a living wage"', 'bullet', 2),
          // 6. Health + Safety
          li('Health + Safety', 'number', 1),
          li("Highlight the company's policies and commitment to maintaining a safe and healthy work environment. This can include information about safety equipment, ergonomic office setups, or mental health resources.", 'bullet', 2),
          li('Detail steps for common safety procedures in the workplace, such as what to do in case of a fire, how to use safety equipment, or how to report a hazard. This can be done through simple diagrams or flow charts for clarity.', 'bullet', 2),
          li('Promote personal health practices like regular breaks for movement, stress management techniques, or healthy eating habits.', 'bullet', 2),
          li('Use a QR code to link to a more detailed health and safety handbook or online resources.', 'bullet', 2),
          li('"Please note: ____ room is the designated tornado safety shelter in case of emergency." Include map to location.', 'bullet', 2),
        ],
      },
      {
        _type: 'guidanceSubsection', _key: k(),
        heading: 'Inclusive Design examples',
        body: [
          li('Physical accessibility', 'number', 1),
          li('"Please face the camera and enunciate when speaking to help those who are hearing impaired read your lips." Set up sign in video conference rooms near video screen camera', 'bullet', 2),
          li('Neurodiversity and mental health', 'number', 1),
          li('"Remember to take a 10-minute time out when needed, it can help reset your attention span." Post near open workspaces', 'bullet', 2),
          li('Ethnicity and culture', 'number', 1),
          li('"Please do not use this microwave to cook foods that contain blood, pork, reptiles, birds of prey, and carnivorous animals to respect those with halal diets." Post on front of designated microwave in a kitchen with multiple microwaves.', 'bullet', 2),
          li('Social responsibility and belonging / socioeconomic', 'number', 1),
          li('Signage denoting organized celebration related to a minoritized group (e.g., Black History Month Celebration signage)', 'bullet', 2),
          li('Gender equity', 'number', 1),
          li('Signage promoting equal pay (e.g., "Equal Work Deserves Equal Pay" signage)', 'bullet', 2),
          li('Sexual orientation and gender identity', 'number', 1),
          li('Use inclusive restroom signage – individual toilet rooms are inherently all-gender. Signage that appeals to the most people (inclusive) without causing stress or confusion is the most socially responsible. Therefore, individual restrooms can simply be indicated by a toilet without need to specify gender signs (adding ADA indications if applicable). If referencing the word "gender", using "all gender" vs. "gender neutral" is preferred.', 'bullet', 2),
        ],
      },
      {
        _type: 'guidanceResources', _key: k(),
        heading: 'Additional Resources',
        resources: [
          {
            _key: k(),
            label: 'The Inclusion Nudges Guidebook: 100 how-to behavioral designs to de-bias and make inclusive behavior, culture, and systems the default and norm',
            description: [p('Paperback – April 1, 2020 by Lisa Kepinski (Author), Tinna C. Nielsen (Author)')],
          },
          {
            _key: k(),
            label: 'Equity: How to Design Organizations Where Everyone Thrives',
            description: [p('by Minal Bopaiah')],
          },
          {
            _key: k(),
            label: 'Nudge: Improving Decisions About Health, Wealth, and Happiness',
            description: [p('by Richard H. Thaler and Cass R. Sunstein')],
          },
        ],
      },
    ],

    referencedSources: [
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibISO26000 } },
      { _type: 'referencedSource', _key: k(), source: { _type: 'reference', _ref: IDS.bibUNDIS } },
    ],

    version: '1.1',
    status: 'published',
  })
  console.log('  ✓ Activity TGa1.3')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
