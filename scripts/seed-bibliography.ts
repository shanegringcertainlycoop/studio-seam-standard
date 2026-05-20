/**
 * Seeds the SEAM Standard bibliography from page 330+ of the PDF.
 *
 * Run with:
 *   npx tsx scripts/seed-bibliography.ts
 *
 * Steps:
 *   1. Create a master IAIA SIA 2015 doc (unnumbered) for activity Referenced Sources
 *   2. Repoint every activity's referencedSources from bib-16-iaia-sia-2015 to the master
 *   3. Repurpose bib-16-iaia-sia-2015 with actual entry 16 content
 *   4. Seed all 187 numbered entries
 *
 * Idempotent.
 */

import { createClient } from '@sanity/client'
import { config as loadEnv } from 'dotenv'

loadEnv()

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID is not set')
if (!token) throw new Error('SANITY_AUTH_TOKEN is not set')

const client = createClient({ projectId, dataset, token, apiVersion: '2025-01-01', useCdn: false })

const MASTER_ID = 'bib-iaia-sia-2015-master'
const OLD_IAIA_ID = 'bib-16-iaia-sia-2015'

type EntryRow = [number, string, string?] // [number, citation, url?]

const ENTRIES: EntryRow[] = [
  [1, 'Impact Institute, Framework for Impact Statements Beta, March 2019'],
  [2, 'International Labour Organization, ILO Forced Labour Convention, 1930 (No. 29)'],
  [3, 'The Arc of Human Rights Priorities: A New Model for Managing Business Risk, Mike Baab and Margaret Jungk, The Human Rights and Business Department, The Danish Institute for Human Rights and the United Nations Global Compact, 2009'],
  [4, 'The Global Living Wage Coalition has agreed to a succinct definition of living wage that incorporates the main ideas found in over 60 living wage descriptions and definitions from human rights declarations; national constitutions; NGO, multinational, and corporate codes of conduct; International Labour Organization (ILO) documents; and statements of major historical figures (Anker 2011)'],
  [5, 'United Nations, https://www.un.org/en/observances/slavery-abolition-day', 'https://www.un.org/en/observances/slavery-abolition-day'],
  [6, 'Impact Management Project'],
  [7, 'ISO 26000 Basic training material, Published by ISO 26000 Post Publication Organisation (PPO), March 15, 2016'],
  [8, 'BetterEvaluation.org, https://www.betterevaluation.org/en/themes/impact_evaluation', 'https://www.betterevaluation.org/en/themes/impact_evaluation'],
  [9, 'GRI Standards Glossary, pp 19, Stichting Global Reporting Initiative (GRI).'],
  [10, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment'],
  [11, 'Center for Theory of Change. https://www.theoryofchange.org/what-is-theory-of-change/', 'https://www.theoryofchange.org/what-is-theory-of-change/'],
  [12, 'The weighting methodology is adopted directly from the UNGP Reporting Framework guidance. Available: https://www.ungpreporting.org/resources/salient-human-rights-issues/. Minor revisions to the text is only with regards to terminology used in commercial real estate and the application to a commercial real estate project.', 'https://www.ungpreporting.org/resources/salient-human-rights-issues/'],
  [13, 'Sopact.com, "What is Social Impact?", https://www.sopact.com/social-impact#what-is-social-impact', 'https://www.sopact.com/social-impact#what-is-social-impact'],
  [14, 'Rittel, H., and Webber M; "Dilemmas in a General Theory of Planning", Policy Sciences, Vol. 4, Elsevier Scientific Publishing Company, Inc., Amsterdam, 1973, pp 155-169.'],
  [15, 'Social impact assessment: integrating social issues in development projects /Reidar Kvam. p. cm. — (IDB Monograph; 613)'],
  [16, 'Requirements adopted from SIA Guidance Document, International Association for Impact Assessment, pp. 34-35.'],
  [17, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015), pp. 36-39.'],
  [18, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment, p. 41, Task 7'],
  [19, 'Adapted from Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment, p. 35, Task 3'],
  [20, 'Requirements adopted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Product Quality and Marketing, November 2016.'],
  [21, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015)'],
  [22, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015)'],
  [23, 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015)'],
  [24, 'ISO 26000:2010, Guidance on social responsibility, 7.5.2, Characteristics of information relating to social responsibility'],
  [25, 'Requirements developed by the Danish Ethical Trading Initiative in collaboration with the Ethical Trading Initiatives as published in the Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain, pp. 5-6.'],
  [26, 'ISO 26000:2010, Guidance on social responsibility, 7.5.2, Characteristics of information relating to social responsibility'],
  [27, 'G. I. Broman and K.-H. Robert, "A framework for strategic sustainable development," Journal of Cleaner Production, vol. 140, pp. 17–31, 2017.'],
  [28, 'K. Pickett and R. Wilkinson, The spirit level: Why more equal societies almost always do better. New York, NY: Bloomsbury Press, 2009.'],
  [29, 'Future-Fit Business Benchmark Methodology Guide, 5. Where we are today: a systems view. Available: https://benchmark.futurefitbusiness.org/mg-systems-view.html#ref-Bro15', 'https://benchmark.futurefitbusiness.org/mg-systems-view.html#ref-Bro15'],
  [30, 'Requirements based on ISO 26000:2010, Guidance on social responsibility and ISO 29993:2017, Learning services outside formal education – service requirements.'],
  [31, 'Centola, Damon, Joshua Becker, Devon Brackbill, and Andrea Baronchelli. "Experimental Evidence for Tipping Points in Social Convention." Science 360, no. 6393 (June 8, 2018): 1116–19. https://doi.org/10.1126/science.aas8827.', 'https://doi.org/10.1126/science.aas8827'],
  [32, 'Bunkley, Nick (March 3, 2008). "Joseph Juran, 103, Pioneer in Quality Control, Dies". The New York Times.'],
  [33, 'https://www.iso.org/files/live/sites/isoorg/files/standards/docs/en/iso_26000_basic_training_material_annexslides.pptx', 'https://www.iso.org/files/live/sites/isoorg/files/standards/docs/en/iso_26000_basic_training_material_annexslides.pptx'],
  [34, 'SEAM Certification website, Social Responsibility Workshop Design Plan and Deck, Resources. Available: https://www.seamcertification.org/resources', 'https://www.seamcertification.org/resources'],
  [35, 'Requirements based on ISO 26000:2010, Guidance on social responsibility and ISO 29993:2017, Learning services outside formal education – service requirements.'],
  [36, 'Centola et al., Science 360, 1116–1119 (2018) 8 June 2018, Experimental evidence for tipping points in social convention. Available: https://www.science.org/doi/10.1126/science.aas8827', 'https://www.science.org/doi/10.1126/science.aas8827'],
  [37, 'Bunkley, Nick (March 3, 2008). "Joseph Juran, 103, Pioneer in Quality Control, Dies". The New York Times.'],
  [38, 'https://www.iso.org/files/live/sites/isoorg/files/standards/docs/en/iso_26000_basic_training_material_annexslides.pptx', 'https://www.iso.org/files/live/sites/isoorg/files/standards/docs/en/iso_26000_basic_training_material_annexslides.pptx'],
  [39, 'ISO 26000:2010 Guidance on social responsibility. Available: https://www.iso.org/standard/42546.html', 'https://www.iso.org/standard/42546.html'],
  [40, 'Saghai, Yashar (2013). "Salvaging the concept of nudge". Journal of Medical Ethics. 39 (8): 487–93. Available: doi:10.1136/medethics-2012-100727', 'https://doi.org/10.1136/medethics-2012-100727'],
  [41, 'Parkinson, J.A.; Eccles, K.E.; Goodman, A. (2014). "Positive impact by design: the Wales centre for behaviour change". The Journal of Positive Psychology. 9 (6): 517–522.'],
  [42, 'Bopaiah, Minal. Equity (p. 73). Berrett-Koehler Publishers.'],
  [43, 'Requirements 5 and 6 adapted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Management, November 2016.'],
  [44, 'Requirement 2 sourced from ISO 26000:2010, Guidance on social responsibility.'],
  [45, 'DFGE, Fair operating practices checklist. Online. Available: https://dfge.de/en/csr-checklist-fair-operating/', 'https://dfge.de/en/csr-checklist-fair-operating/'],
  [46, 'Requirements 1, 5, and 6 adapted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Management, November 2016.'],
  [47, 'Requirement 2 sourced from ISO 26000:2010, Guidance on social responsibility.'],
  [48, 'DFGE, Fair operating practices checklist. Online. Available: https://dfge.de/en/csr-checklist-fair-operating/', 'https://dfge.de/en/csr-checklist-fair-operating/'],
  [49, 'Requirements adopted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Product Quality and Marketing, November 2016.'],
  [50, 'ISO 26000:2010, Guidance on social responsibility, 7.5.2, Characteristics of information relating to social responsibility'],
  [51, 'Requirements adopted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Product Quality and Marketing, November 2016.'],
  [52, 'ISO 26000:2010, Guidance on social responsibility, 7.5.2, Characteristics of information relating to social responsibility'],
  [53, 'Requirements adapted from UN Guiding Principles on Business and Human Rights (2011)'],
  [54, 'ISO 26000 Basic Training Material, ISO 26000 Post Publication Organization, March 15, 2106'],
  [55, 'Requirements adapted from UN Guiding Principles on Business and Human Rights (2011)'],
  [56, 'https://www.atlas.party/equitism', 'https://www.atlas.party/equitism'],
  [57, 'ILO, Understanding the gender pay gap, Women in Business and Management, pp. 1-3. Online. Available: https://www.ilo.org/wcmsp5/groups/public/---ed_dialogue/---act_emp/documents/publication/wcms_735949.pdf', 'https://www.ilo.org/wcmsp5/groups/public/---ed_dialogue/---act_emp/documents/publication/wcms_735949.pdf'],
  [58, "Institute for Women's Policy Research, IWPR #Q058, If Current Trends Continue, Hispanic Women Will Wait 232 Years for Equal Pay; Black Women Will Wait 108 Years, 2016."],
  [59, 'Office of National Statistics, "Gender pay gap in the UK: 2022" Statistical Bulletin, 2022.'],
  [60, 'Economic Policy Institute (2022). "Understanding black-white disparities in labor market outcomes requires models that account for persistent discrimination and unequal bargaining power", Wilson, V. and Darity, W. Jr.'],
  [61, 'McKinsey, "Diversity Wins: How inclusion matters", May 2020. https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters', 'https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-wins-how-inclusion-matters'],
  [62, '©ISO. This material is reproduced from ISO 30415:2021 with permission of the American National Standards Institute (ANSI) on behalf of the International Organization for Standardization. All rights reserved.'],
  [63, "Seattle's Commercial Affordability Program, accessible via https://www.seattle.gov/office-of-economic-development/commercial-affordability", 'https://www.seattle.gov/office-of-economic-development/commercial-affordability'],
  [64, "New York City's Affordable Real Estate for Artists program, accessible via https://www.nyc.gov/site/dcla/programs/area.page", 'https://www.nyc.gov/site/dcla/programs/area.page'],
  [65, "Seattle's Commercial Affordability Program, accessible via https://www.seattle.gov/office-of-economic-development/commercial-affordability", 'https://www.seattle.gov/office-of-economic-development/commercial-affordability'],
  [66, "New York City's Commercial Lease Assistance Program, accessible at https://nyc-business.nyc.gov/nycbusiness/article/commercial-lease-assistance-program", 'https://nyc-business.nyc.gov/nycbusiness/article/commercial-lease-assistance-program'],
  [67, "Los Angeles' Small Business Academy, accessible via https://bca.lacity.org/LA-Small-Business-Academy", 'https://bca.lacity.org/LA-Small-Business-Academy'],
  [68, '©ISO. This material is reproduced from ISO 30415:2021 with permission of the American National Standards Institute (ANSI) on behalf of the International Organization for Standardization. All rights reserved.'],
  [69, 'ILO, Violence and Harassment Convention, 2019 (No. 190), Article 2, paragraph 1.'],
  [70, 'Inclusive Design Research Centre. Online. Available: https://idrc.ocadu.ca', 'https://idrc.ocadu.ca'],
  [71, 'University of Cambridge, Inclusive Design Toolkit. Online. Available: https://www.inclusivedesigntoolkit.com/whatis/whatis.html', 'https://www.inclusivedesigntoolkit.com/whatis/whatis.html'],
  [72, 'UN Disability Inclusion Strategy. Online. Available: https://www.un.org/en/content/disabilitystrategy/', 'https://www.un.org/en/content/disabilitystrategy/'],
  [73, 'Protected characteristics are those covered by the International Human Rights legal framework.'],
  [74, 'ILO, Violence and Harassment Convention, 2019 (No. 190), Article 2, paragraph 1.'],
  [75, 'Adapted from Future-Fit Business Benchmark, BE13: Employee Discrimination Break-Even Goal Action Guide. [Online] Available: https://benchmark.futurefitbusiness.org/be13.html', 'https://benchmark.futurefitbusiness.org/be13.html'],
  [76, 'Adapted from Future-Fit Business Benchmark, BE10: Employee Health Break-Even Goal Action Guide, based on guidance from WHO, Healthy workplaces: a model for action, 2010.'],
  [77, 'Same as 30.'],
  [78, 'Violence and harassment in the world of work: A guide on Convention No. 190 and Recommendation No. 206, International Labor Office – Geneva: ILO, 2021'],
  [79, 'Protected characteristics are those covered by the International Human Rights legal framework.'],
  [80, 'ILO, Violence and Harassment Convention, 2019 (No. 190), Article 2, paragraph 1.'],
  [81, 'ILO, Violence and Harassment Convention, 2019 (No. 190), Article 2, paragraph 1.'],
  [82, 'Adapted from Future-Fit Business Benchmark, BE13: Employee Discrimination Break-Even Goal Action Guide. [Online] Available: https://benchmark.futurefitbusiness.org/be13.html', 'https://benchmark.futurefitbusiness.org/be13.html'],
  [83, 'Adapted from Future-Fit Business Benchmark, BE10: Employee Health Break-Even Goal Action Guide, based on guidance from WHO, Healthy workplaces: a model for action, 2010.'],
  [84, 'Same as no. 30.'],
  [85, 'Violence and harassment in the world of work: A guide on Convention No. 190 and Recommendation No. 206, International Labor Office – Geneva: ILO, 2021'],
  [86, 'UNRISD, Sustainable Development Performance Indicators, Tier 2: B. Socioeconomic area, II.B.6 Gender pay gap: Equality of remuneration, Sustainability Threshold or Norm, p. 35.'],
  [87, 'Equality and Human Rights Commission, Equal work. Online. Available: https://www.equalityhumanrights.com/guidance/equal-pay/equal-work', 'https://www.equalityhumanrights.com/guidance/equal-pay/equal-work'],
  [88, 'https://www.equalityhumanrights.com/guidance/equal-pay', 'https://www.equalityhumanrights.com/guidance/equal-pay'],
  [89, 'ILO, Understanding the gender pay gap, Women in Business and Management, p. 8. Online. Available: https://www.ilo.org/wcmsp5/groups/public/---ed_dialogue/---act_emp/documents/publication/wcms_735949.pdf', 'https://www.ilo.org/wcmsp5/groups/public/---ed_dialogue/---act_emp/documents/publication/wcms_735949.pdf'],
  [90, 'Download available online: https://www.equalityhumanrights.com/en/file/12511/download?token=bsA7FMzt', 'https://www.equalityhumanrights.com/en/file/12511/download?token=bsA7FMzt'],
  [91, 'Download available online: https://www.equalityhumanrights.com/en/file/12506/download?token=CClP9j6D', 'https://www.equalityhumanrights.com/en/file/12506/download?token=CClP9j6D'],
  [92, 'Equality and Human Rights Commission, Equal work. Online. Available: https://www.equalityhumanrights.com/guidance/equal-pay/equal-work', 'https://www.equalityhumanrights.com/guidance/equal-pay/equal-work'],
  [93, 'https://www.equalityhumanrights.com/guidance/equal-pay', 'https://www.equalityhumanrights.com/guidance/equal-pay'],
  [94, 'Download available online: https://www.equalityhumanrights.com/en/file/12511/download?token=bsA7FMzt', 'https://www.equalityhumanrights.com/en/file/12511/download?token=bsA7FMzt'],
  [95, 'Download available online: https://www.equalityhumanrights.com/en/file/12506/download?token=CClP9j6D', 'https://www.equalityhumanrights.com/en/file/12506/download?token=CClP9j6D'],
  [96, 'World Bank, "Securing Africa\'s Land for Shared Prosperity", Frank F. K. Byamugisha, 2013.'],
  [97, 'Requirements wording for 1, 1a, and 1b adapted from Future-Fit Business, BE08: Operational Encroachment Break-Even Goal Action Guide. [Online] Available: https://benchmark.futurefitbusiness.org/be08.html', 'https://benchmark.futurefitbusiness.org/be08.html'],
  [98, 'Requirements based on The TOMS Measures Handbook-2021, NT1 and NT2.'],
  [99, 'Using local labour in construction: A good practice resource book, Richard Macfarlane, Joseph Rowntree Foundation by The Policy Press, 2000'],
  [100, 'Using local labour in construction: A good practice resource book, p. 50, Richard Macfarlane, Joseph Rowntree Foundation by The Policy Press, 2000'],
  [101, 'Requirements adopted from UN Guiding Principles on Business and Human Rights (2011)'],
  [102, 'McKinsey & Company, The case for accelerating financial inclusion in black communities, by Aria Florant, JP Julien, Shelley Stewart III, Jason Wright, and Nina Yancy, February 2020'],
  [103, '"Financial inclusion: Bridging economic opportunities and outcomes," International Monetary Fund, September 20, 2016, imf.org.'],
  [104, 'Zippia, accessed online: https://www.zippia.com/real-estate-investor-jobs/demographics/', 'https://www.zippia.com/real-estate-investor-jobs/demographics/'],
  [105, 'Zippia, accessed online: https://www.zippia.com/real-estate-investor-jobs/demographics/', 'https://www.zippia.com/real-estate-investor-jobs/demographics/'],
  [106, 'Urban Land, "Tracking Progress on Diversity, Equity, and Inclusion in Commercial Real Estate", by Karen Jordan, 2022. Urban Land Institute. https://urbanland.uli.org/public/tracking-progress-on-diversity-equality-and-inclusion-in-commercial-real-estate/', 'https://urbanland.uli.org/public/tracking-progress-on-diversity-equality-and-inclusion-in-commercial-real-estate/'],
  [107, 'Rothstein, R. (2017). The Color of Law: A Forgotten History of How Our Government Segregated America. Liveright Publishing.'],
  [108, 'Brookings Metro, "The Devaluation of Assets in Black Neighborhoods: The Case of Commercial Property", Jonathan Rothwell, Tracy Hadden Loh, and Andre Perry, The Brookings Institute, 2022.'],
  [109, 'Requirements adapted from UN Guiding Principles on Business and Human Rights (2011)'],
  [110, 'Design Justice Network, https://designjustice.org/read-the-principles', 'https://designjustice.org/read-the-principles'],
  [111, 'Requirements adapted from UN Guiding Principles on Business and Human Rights (2011)'],
  [112, '"Global estimates of modern slavery: Forced labour and forced marriage", International Labour Office (ILO), Geneva, 2017'],
  [113, 'Design for Freedom website. https://www.designforfreedom.org/', 'https://www.designforfreedom.org/'],
  [114, 'Requirements developed by the Danish Ethical Trading Initiative in collaboration with the Ethical Trading Initiatives as published in the Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain, pp. 5-6.'],
  [115, 'https://gbihr.org/business-practice-portal/training-and-capacity-building', 'https://gbihr.org/business-practice-portal/training-and-capacity-building'],
  [116, 'https://www.designforfreedom.org/download-media/design-for-freedom-sample-specification', 'https://www.designforfreedom.org/download-media/design-for-freedom-sample-specification'],
  [117, 'https://www.responsiblesourcingtool.org', 'https://www.responsiblesourcingtool.org'],
  [118, 'https://portal.mindfulmaterials.com', 'https://portal.mindfulmaterials.com'],
  [119, 'Requirements adapted from or adopted directly from UN Guiding Principles on Business and Human Rights, Principles 17-22.'],
  [120, "US Department of Labor's Bureau of International Labor Affairs \"List of Products Produced with Forced or Indentured Child Labor\""],
  [121, 'https://www.unglobalcompact.org/library/25', 'https://www.unglobalcompact.org/library/25'],
  [122, 'https://www.bsr.org/reports/BSR_Human_Rights_Impact_Assessments.pdf', 'https://www.bsr.org/reports/BSR_Human_Rights_Impact_Assessments.pdf'],
  [123, 'https://www.designforfreedom.org/download-media/design-for-freedom-material-tracking-schedule', 'https://www.designforfreedom.org/download-media/design-for-freedom-material-tracking-schedule'],
  [124, 'https://www.dol.gov/agencies/ilab/reports/child-labor/list-of-goods/', 'https://www.dol.gov/agencies/ilab/reports/child-labor/list-of-goods/'],
  [125, 'https://www.dol.gov/agencies/ilab/reports/child-labor/list-of-products', 'https://www.dol.gov/agencies/ilab/reports/child-labor/list-of-products'],
  [126, 'https://www.dol.gov/agencies/ilab/better-trade-tool', 'https://www.dol.gov/agencies/ilab/better-trade-tool'],
  [127, 'https://www.sedex.com/our-services/sedex-advance/', 'https://www.sedex.com/our-services/sedex-advance/'],
  [128, 'https://sa-intl.org/sa8000-search/', 'https://sa-intl.org/sa8000-search/'],
  [129, 'https://slconvergence.org/manufacturers-using-slcp#manufacturerlist', 'https://slconvergence.org/manufacturers-using-slcp#manufacturerlist'],
  [130, 'Requirements adopted from UN Guiding Principles on Business and Human Rights'],
  [131, 'Direct quotation from Guiding Principles on Business and Human Rights, UN Human Rights Office of the High Commissioner, pp. 21-22'],
  [132, 'Design for Freedom website. https://www.designforfreedom.org/', 'https://www.designforfreedom.org/'],
  [133, 'https://www.globallivingwage.org/about/anker-methodology/', 'https://www.globallivingwage.org/about/anker-methodology/'],
  [134, 'BE11: Living Wage Action Guide, Future-Fit Benchmark. Available: https://benchmark.futurefitbusiness.org/be11.html#fnref108', 'https://benchmark.futurefitbusiness.org/be11.html#fnref108'],
  [135, 'https://www.globallivingwage.org', 'https://www.globallivingwage.org'],
  [136, 'https://www.livingwage.org.uk/what-real-living-wage', 'https://www.livingwage.org.uk/what-real-living-wage'],
  [137, 'https://livingwage.mit.edu', 'https://livingwage.mit.edu'],
  [138, 'https://livingwageforus.org', 'https://livingwageforus.org'],
  [139, 'Requirements format adapted from the Future-Fit Business Benchmark, BE12: Employment Terms. [Online] Available: https://benchmark.futurefitbusiness.org/be12.html', 'https://benchmark.futurefitbusiness.org/be12.html'],
  [140, '1b, c, and d adopted from Social Accountability International SA8000® International Standard (2014)'],
  [141, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [142, "Principle 3 of the United Nations Global Compact's Ten Principles. Also aligns to the ILO standards for Freedom of Association. Requirements adapted from Social Accountability International SA8000® International Standard (2014)."],
  [143, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [144, 'This conforms to the most recent ILO Convention in the area of paid leave, the Holidays with Pay Convention (Revised), 1970 (No. 132). A minimum period of service not exceeding six months may be required for entitlement to any annual holiday with pay. Public and customary holidays are not counted as part of the three-week minimum.'],
  [145, "The employee has the right to be paid no less than two thirds of previous earnings. This is in line with the ILO's Maternity Protection Convention, which has here been expanded to cover all genders."],
  [146, 'Requirements adopted from The Danish Institute for Human Rights, The Human Rights Compliance Tool: Contractors and Supply Chain, p. 11.'],
  [147, 'https://www.globallivingwage.org/about/anker-methodology/', 'https://www.globallivingwage.org/about/anker-methodology/'],
  [148, 'BE11: Living Wage Action Guide, Future-Fit Benchmark. Available: https://benchmark.futurefitbusiness.org/be11.html#fnref108', 'https://benchmark.futurefitbusiness.org/be11.html#fnref108'],
  [149, 'https://www.globallivingwage.org', 'https://www.globallivingwage.org'],
  [150, 'https://www.livingwage.org.uk/what-real-living-wage', 'https://www.livingwage.org.uk/what-real-living-wage'],
  [151, 'https://livingwage.mit.edu', 'https://livingwage.mit.edu'],
  [152, 'https://livingwageforus.org', 'https://livingwageforus.org'],
  [153, 'Requirements format adapted from the Future-Fit Business Benchmark, BE12: Employment Terms. [Online] Available: https://benchmark.futurefitbusiness.org/be12.html', 'https://benchmark.futurefitbusiness.org/be12.html'],
  [154, '1b, c, and d adopted from Social Accountability International SA8000® International Standard (2014)'],
  [155, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [156, "Principle 3 of the United Nations Global Compact's Ten Principles. Also aligns to the ILO standards for Freedom of Association. Requirements adapted from Social Accountability International SA8000® International Standard (2014)."],
  [157, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [158, 'This conforms to the most recent ILO Convention in the area of paid leave, the Holidays with Pay Convention (Revised), 1970 (No. 132). A minimum period of service not exceeding six months may be required for entitlement to any annual holiday with pay. Public and customary holidays are not counted as part of the three-week minimum.'],
  [159, "The employee has the right to be paid no less than two thirds of previous earnings. This is in line with the ILO's Maternity Protection Convention, which has here been expanded to cover all genders."],
  [160, 'https://www.globallivingwage.org/about/anker-methodology/', 'https://www.globallivingwage.org/about/anker-methodology/'],
  [161, 'BE11: Living Wage Action Guide, Future-Fit Benchmark. Available: https://benchmark.futurefitbusiness.org/be11.html#fnref108', 'https://benchmark.futurefitbusiness.org/be11.html#fnref108'],
  [162, 'https://www.globallivingwage.org', 'https://www.globallivingwage.org'],
  [163, 'https://www.livingwage.org.uk/what-real-living-wage', 'https://www.livingwage.org.uk/what-real-living-wage'],
  [164, 'https://livingwage.mit.edu', 'https://livingwage.mit.edu'],
  [165, 'https://livingwageforus.org', 'https://livingwageforus.org'],
  [166, 'Requirements format adapted from Future-Fit Business Benchmark, BE12: Employment Terms. [Online] Available: https://benchmark.futurefitbusiness.org/be12.html', 'https://benchmark.futurefitbusiness.org/be12.html'],
  [167, '1b, c, and d adopted from Social Accountability International SA8000® International Standard (2014)'],
  [168, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [169, "Principle 3 of the United Nations Global Compact's Ten Principles. Also aligns to the ILO standards for Freedom of Association. Requirements adapted from Social Accountability International SA8000® International Standard (2014)."],
  [170, 'Requirements adopted from Social Accountability International SA8000® International Standard (2014)'],
  [171, 'This conforms to the most recent ILO Convention in the area of paid leave, the Holidays with Pay Convention (Revised), 1970 (No. 132). A minimum period of service not exceeding six months may be required for entitlement to any annual holiday with pay. Public and customary holidays are not counted as part of the three-week minimum.'],
  [172, "The employee has the right to be paid no less than two thirds of previous earnings. This is in line with the ILO's Maternity Protection Convention, which has here been expanded to cover all genders."],
  [173, 'Requirements adopted from UN Guiding Principles on Business and Human Rights'],
  [174, 'Direct quotation from Guiding Principles on Business and Human Rights, UN Human Rights Office of the High Commissioner, pp. 21-22'],
  [175, 'Requirements adopted from The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Product Quality and Marketing, November 2016 and The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Management, p. 25.'],
  [176, 'UN Guiding Principles on Business and Human Rights, UNOHCHR, Principle 21.'],
  [177, 'ISO 26000:2010, Guidance on social responsibility, 7.5.2, Characteristics of information relating to social responsibility'],
  [178, 'Requirements developed by the Danish Ethical Trading Initiative in collaboration with the Ethical Trading Initiatives as published in the Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Contractors and Supply Chain, pp. 5-6.'],
  [179, 'UN Office of the High Commissioner on Human Rights, "Human Rights Education and Training". Available online: hchr.org/en/resources/educators/human-rights-education-training'],
  [180, 'Good practices and challenges in promoting decent work in construction and infrastructure projects, Issues paper for discussion at the Global Dialogue Forum on Good Practices and Challenges in Promoting Decent Work in Construction and Infrastructure Projects, Geneva, 19–20 November 2015, Sectoral Policies Department, International Labour Office, Geneva, 2015'],
  [181, 'Guidelines on sanitation and health. Geneva: World Health Organization; 2018. Licence: CC BY-NC-SA 3.0 IGO'],
  [182, 'Fire Protection Research Foundation, Quincy, MA: 2012, FPRF 2012 08, Sprinkler Impact on Fire Injury: Final Report.'],
  [183, 'Recommended Practices for Safety and Health Programs, Occupational Safety and Health Administration, OSHA 3885 October 2016.'],
  [184, 'International Code Council. (2018). International Building Code. Retrieved from https://codes.iccsafe.org/public/document/IBC2018', 'https://codes.iccsafe.org/public/document/IBC2018'],
  [185, 'Occupational Safety and Health Administration. (2020). Safety and Health Regulations for Construction. Retrieved from https://www.osha.gov/laws-regs/regulations/standardnumber/1926', 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926'],
  [186, 'Cozens, P. (2002). Sustainable urban development and crime prevention through environmental design for the British city. Towards an effective urban environmentalism for the 21st century. Cities, 19(2), 129-137. DOI:10.1016/S0264-2751(02)00008-0'],
  [187, 'The Danish Institute for Human Rights, The Human Rights Compliance Assessment Tool: Workplace Health and Safety.'],
]

function idForNumber(n: number): string {
  // Preserve the existing #16 id so cross-references in activities continue to resolve.
  if (n === 16) return OLD_IAIA_ID
  return `bib-${n}`
}

async function run() {
  // ─── 1. Create master IAIA SIA 2015 doc (unnumbered) ────────────────────
  console.log('1. Creating master IAIA SIA 2015 source doc...')
  await client.createOrReplace({
    _id: MASTER_ID,
    _type: 'bibliographyEntry',
    title: 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects (IAIA, 2015)',
    citation: 'Social Impact Assessment: Guidance for assessing and managing the social impacts of projects, International Association for Impact Assessment (2015)',
    sourceType: 'guidance',
  })
  console.log('  ✓ master doc created')

  // ─── 2. Re-point all activities' referencedSources from OLD_IAIA_ID to MASTER_ID
  console.log('\n2. Re-pointing activity referencedSources...')
  const activities: Array<{ _id: string; referencedSources?: Array<{ _key: string; _ref: string }> }> = await client.fetch(
    `*[_type == "activity" && references($oldId)]{
      _id,
      "referencedSources": referencedSources[]{ _key, _ref }
    }`,
    { oldId: OLD_IAIA_ID },
  )
  for (const a of activities) {
    const updated = (a.referencedSources ?? []).map((r) =>
      r._ref === OLD_IAIA_ID
        ? { _type: 'reference', _key: r._key, _ref: MASTER_ID }
        : { _type: 'reference', _key: r._key, _ref: r._ref },
    )
    await client.patch(a._id).set({ referencedSources: updated }).commit()
    console.log(`  ✓ ${a._id}`)
  }

  // ─── 3. Seed all 187 numbered entries ───────────────────────────────────
  console.log('\n3. Seeding 187 bibliography entries...')
  for (const [n, citation, url] of ENTRIES) {
    const doc: Record<string, unknown> = {
      _id: idForNumber(n),
      _type: 'bibliographyEntry',
      number: n,
      citation,
    }
    if (url) doc.url = url
    await client.createOrReplace(doc)
    if (n % 25 === 0 || n === ENTRIES.length) {
      console.log(`  ... ${n} entries seeded`)
    }
  }
  console.log(`  ✓ all ${ENTRIES.length} numbered entries seeded`)

  console.log('\nDone.')
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
