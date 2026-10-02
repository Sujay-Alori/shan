export type ProjectCategory =
  | 'COMPLETED'
  | 'ONGOING'
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'INTERIOR'
  | 'EXTERIOR'
  | 'RENOVATION';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  client?: string;
  location: string;
  area: string;
  status: 'COMPLETED' | 'ONGOING';
  type: string;
  categories: ProjectCategory[];
  image: string;
  description: string;
  isFeatured?: boolean;
  gridSpan?: 'featured' | 'tall' | 'wide' | 'standard';
  isPortrait?: boolean;
  services?: string[];
  year?: string;
}

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = [
  'COMPLETED',
  'ONGOING',
  'RESIDENTIAL',
  'COMMERCIAL',
  'INTERIOR',
  'EXTERIOR',
  'RENOVATION',
];

/**
 * Centralized Project Dataset for Shan Arch Studio.
 * Standardized structure for client project information and photography.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-interior-01',
    number: '01',
    title: 'Interior Design Project',
    location: 'Kerala',
    area: 'Residential',
    status: 'COMPLETED',
    type: 'Interior Architecture',
    categories: ['INTERIOR'],
    image: '/images/projects/int1.jpg',
    description:
      'A contemporary interior design project in Kerala featuring bespoke architectural detailing, warm materiality, and refined lighting schemes designed for sophisticated modern living.',
    isFeatured: true,
    gridSpan: 'featured',
    services: ['Interior Design', 'Spatial Planning', 'Lighting & Material Curation'],
    year: '2024',
  },
  {
    id: 'project-02',
    number: '02',
    title: 'PROJECT NAME 02',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'RESIDENTIAL', 'INTERIOR'],
    image: '/images/projects/project-02.svg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['House Plan Design', 'Interior Architecture', 'Lighting Details'],
    year: 'YEAR',
  },
  {
    id: 'ongoing-maheedha',
    number: '01',
    title: 'Maheedha Residence',
    client: 'Maheedha',
    location: 'Chelari',
    area: '2600 sqft',
    status: 'ONGOING',
    type: 'Residential Architecture',
    categories: ['ONGOING'],
    image: '/images/projects/Maheedha.jpeg',
    description:
      'An ongoing bespoke contemporary residential architecture project designed for Maheedha in Chelari. Featuring a striking pitched roofline, curated timber louvers, warm earthy materiality, and expansive tropical cross-ventilation across 2,600 sq.ft.',
    isFeatured: true,
    gridSpan: 'featured',
    services: ['Architectural Planning', '3D Exterior Elevation', 'Structural Engineering', 'Site Execution'],
    year: '2025',
  },
  {
    id: 'ongoing-fairoos',
    number: '02',
    title: 'Fairoos Residence',
    client: 'Fairoos',
    location: 'Tanur',
    area: '2450 sqft',
    status: 'ONGOING',
    type: 'Residential Architecture',
    categories: ['ONGOING'],
    image: '/images/projects/Fairoos.jpeg',
    description:
      'An ongoing modern luxury home for Fairoos in Tanur, blending textured stone feature walls, expansive glazed openings, and refined tropical landscaping across 2,450 sq.ft.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Architectural Design', 'Interior Spatial Planning', 'Site Supervision'],
    year: '2025',
  },
  {
    id: 'ongoing-shafi',
    number: '03',
    title: 'Mr. Shafi Residence',
    client: 'Mr. Shafi',
    location: 'Tirur',
    area: '2900 sqft',
    status: 'ONGOING',
    type: 'Residential Architecture',
    categories: ['ONGOING'],
    image: '/images/projects/Shafi.jpeg',
    description:
      'An ongoing grand residential villa for Mr. Shafi in Tirur, characterized by dual dramatic gables, arched vertical fenestrations, warm ambient architectural lighting, and 2,900 sq.ft. of refined living space.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Complete Architectural Solutions', '3D Visualisation', 'Working Drawings', 'Site Supervision'],
    year: '2025',
  },
  {
    id: 'ongoing-nisar',
    number: '04',
    title: 'Nisar Residence',
    client: 'Nisar',
    location: 'Kuttipuram',
    area: '2200 sqft',
    status: 'ONGOING',
    type: 'Residential Architecture',
    categories: ['ONGOING'],
    image: '/images/projects/ext1.jpeg',
    description:
      'An ongoing contemporary residential project for Nisar in Kuttipuram, featuring modern clean lines, functional spatial layout, and refined architectural detailing across 2,200 sq.ft.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Architectural Planning', '3D Exterior Visualization', 'Site Supervision', 'Working Drawings'],
    year: '2025',
  },
  {
    id: 'ongoing-sameer',
    number: '05',
    title: 'Sameer Residence',
    client: 'Sameer',
    location: 'Tanaloor',
    area: '1300 sqft',
    status: 'ONGOING',
    type: 'Residential Architecture',
    categories: ['ONGOING'],
    image: '/images/projects/ext3.jpeg',
    description:
      'An ongoing compact modern residence for Sameer in Tanaloor, thoughtfully planned with optimized space utilization, elegant exterior elevation, and tropical natural lighting across 1,300 sq.ft.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Architectural Design', '3D Exterior Elevation', 'Permit Drawings', 'Site Supervision'],
    year: '2025',
  },
  {
    id: 'project-05',
    number: '05',
    title: 'PROJECT NAME 05',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'RENOVATION', 'RESIDENTIAL'],
    image: '/images/projects/project-06.svg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Renovation Architecture', 'Structural Retrofitting', 'Interior Design'],
    year: 'YEAR',
  },
  {
    id: 'project-06',
    number: '06',
    title: 'PROJECT NAME 06',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'INTERIOR', 'RESIDENTIAL'],
    image: '/images/projects/project-07.svg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: true,
    gridSpan: 'featured',
    services: ['Interior Design', 'Detailed Drawings', 'Material Curation'],
    year: 'YEAR',
  },
  {
    id: 'project-08',
    number: '08',
    title: 'PROJECT NAME 08',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'RENOVATION', 'INTERIOR'],
    image: '/images/projects/project-09.svg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Renovation Planning', 'Interior Architecture', 'Working Drawings'],
    year: 'YEAR',
  },
  {
    id: 'commercial-momosa',
    number: '01',
    title: 'Momosa',
    location: 'Tirur',
    area: 'Commercial Space',
    status: 'COMPLETED',
    type: 'Commercial Architecture',
    categories: ['COMMERCIAL'],
    image: '/images/projects/commercial1.jpeg',
    description:
      'A bespoke modern commercial architecture and dining space design for Momosa in Tirur, curated with distinctive facade styling, ambient lighting, and optimized commercial workflow.',
    isFeatured: true,
    gridSpan: 'featured',
    services: ['Commercial Architecture', 'Facade Design', 'Interior Spatial Planning'],
    year: '2024',
  },
  {
    id: 'commercial-march-cafe',
    number: '02',
    title: 'March Cafe',
    location: 'Tirur',
    area: 'Cafe & Commercial',
    status: 'COMPLETED',
    type: 'Commercial Hospitality',
    categories: ['COMMERCIAL'],
    image: '/images/projects/commercial2.jpeg',
    description:
      'An inviting contemporary commercial cafe space designed for March Cafe in Tirur, blending warm materiality, curated cafe seating layouts, and striking storefront architecture.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Commercial Architecture', 'Hospitality & Cafe Design', 'Lighting Curation'],
    year: '2024',
  },
];

