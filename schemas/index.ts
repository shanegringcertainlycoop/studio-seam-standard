import pillar from './pillar'
import concept from './concept'
import objective from './objective'
import activity from './activity'
import bibliographyEntry from './bibliographyEntry'
import editorialNote from './editorialNote'
import glossaryTerm from './glossaryTerm'
import appendix from './appendix'

import ratingSystemApplication from './objects/ratingSystemApplication'
import requirementGroup from './objects/requirementGroup'
import requirementItem from './objects/requirementItem'
import indicators from './objects/indicators'
import calculation from './objects/calculation'
import calculationStep from './objects/calculationStep'
import calculationScenario from './objects/calculationScenario'
import scoring from './objects/scoring'
import scoringRubric from './objects/scoringRubric'
import scoringBand from './objects/scoringBand'
import scoringScenario from './objects/scoringScenario'
import definition from './objects/definition'
import documentationItem from './objects/documentationItem'
import documentationTemplate from './objects/documentationTemplate'
import guidanceSubsection from './objects/guidanceSubsection'
import guidanceSteps from './objects/guidanceSteps'
import guidanceResources from './objects/guidanceResources'
import guidanceExample from './objects/guidanceExample'
import guidanceNote from './objects/guidanceNote'
import guidanceImage from './objects/guidanceImage'
import referencedSource from './objects/referencedSource'
import richText from './objects/richText'

export const schemaTypes = [
  // Documents
  pillar,
  concept,
  objective,
  activity,
  bibliographyEntry,
  editorialNote,
  glossaryTerm,
  appendix,

  // Objects
  ratingSystemApplication,
  requirementGroup,
  requirementItem,
  indicators,
  calculation,
  calculationStep,
  calculationScenario,
  scoring,
  scoringRubric,
  scoringBand,
  scoringScenario,
  definition,
  documentationItem,
  documentationTemplate,
  guidanceSubsection,
  guidanceSteps,
  guidanceResources,
  guidanceExample,
  guidanceNote,
  guidanceImage,
  referencedSource,
  richText,
]
