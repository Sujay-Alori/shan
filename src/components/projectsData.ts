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
  location: string;
  area: string;
  status: 'COMPLETED' | 'ONGOING';
  type: string;
  categories: ProjectCategory[];
  image: string;
  description: string;
  isFeatured?: boolean;
  gridSpan?: 'featured' | 'tall' | 'wide' | 'standard';
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
 * Centralized Placeholder Project Dataset for Shan Arch Studio.
 * Standardized placeholder structure ready for client project information and photos.
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
    id: 'project-01',
    number: '01',
    title: 'PROJECT NAME 01',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'RESIDENTIAL', 'EXTERIOR'],
    image: '/images/projects/ext1.jpeg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: true,
    gridSpan: 'featured',
    services: ['Architectural Design', '3D Exterior Visualization', 'Working Drawings'],
    year: 'YEAR',
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
    id: 'project-03',
    number: '03',
    title: 'PROJECT NAME 03',
    location: 'LOCATION',
    area: 'AREA',
    status: 'ONGOING',
    type: 'PROJECT TYPE',
    categories: ['ONGOING', 'COMMERCIAL', 'EXTERIOR'],
    image: '/images/projects/ext2.jpeg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'tall',
    services: ['Commercial Architecture', 'Structural Drawings', 'Site Supervision'],
    year: 'YEAR',
  },
  {
    id: 'project-04',
    number: '04',
    title: 'PROJECT NAME 04',
    location: 'LOCATION',
    area: 'AREA',
    status: 'COMPLETED',
    type: 'PROJECT TYPE',
    categories: ['COMPLETED', 'RESIDENTIAL', 'EXTERIOR'],
    image: '/images/projects/ext3.jpeg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'wide',
    services: ['Complete Home Solutions', '3D Visuals', 'Landscape Coordination'],
    year: 'YEAR',
  },
  {
    id: 'project-05',
    number: '05',
    title: 'PROJECT NAME 05',
    location: 'LOCATION',
    area: 'AREA',
    status: 'ONGOING',
    type: 'PROJECT TYPE',
    categories: ['ONGOING', 'RESIDENTIAL', 'EXTERIOR'],
    image: '/images/projects/ext4.jpeg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'standard',
    services: ['Architectural Design', 'Permit Drawings', 'Electrical Planning'],
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
    id: 'project-07',
    number: '07',
    title: 'PROJECT NAME 07',
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
    status: 'ONGOING',
    type: 'PROJECT TYPE',
    categories: ['ONGOING', 'COMMERCIAL', 'EXTERIOR'],
    image: '/images/projects/ext5.jpeg',
    description:
      'Temporary placeholder project description. High-resolution project photography, architectural specifications, and detailed case study information will be inserted here.',
    isFeatured: false,
    gridSpan: 'tall',
    services: ['Master Planning', 'Architectural Design', 'Site Supervision'],
    year: 'YEAR',
  },
  {
    id: 'project-09',
    number: '09',
    title: 'PROJECT NAME 09',
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
];
