// Settings dummy data for Categories tab
// Each item represents a main category with an icon and subcategories
import type { SettingsCategoryItem } from '@/types/types';

export const settingsData: SettingsCategoryItem[] = [
  {
    jobId: '#CT0001',
    category: 'Home & Cleaning',
    subCategories: [
      'House Cleaner',
      'Deep Cleaning Specialist',
      'Laundry Assistant',
      'Dishwasher',
      'Upholstery Cleaner',
      'Pest Control Expert',
      'Waste Disposal Agent',
      'Move-in Cleaner',
    ],
    icon: '/settings-icon1.png',
    reportReasons: {
      reportingServiceProvider: 'Damaged property during service',
      reportingClient: 'Refused to pay after completion',
      jobReports: [{ reason: 'Damaged property during service', autoBlock: true }],
    },
    jobTips: {
      title: 'Complete more jobs',
      description: 'The more jobs you finish, the more offers you’ll get.',
    },
  },

  {
    jobId: '#CT0002',
    category: 'Repairs & Maintenance',
    subCategories: [
      'Electrician',
      'Plumber',
      'AC Technician',
      'Carpenter',
      'Handyman',
      'Painter',
      'Tiler',
      'Generator Repair',
    ],
    icon: '/settings-icon2.png',
    reportReasons: {
      reportingServiceProvider: 'Unsafe electrical practices',
      reportingClient: 'Requested off-platform payment',
      jobReports: [{ reason: 'Incorrect wiring detected', autoBlock: true }],
    },
    jobTips: {
      title: 'Offer detailed diagnostics',
      description: 'Explain the issue and repair steps clearly to build trust.',
    },
  },
  {
    jobId: '#CT0003',
    category: 'Food & Kitchen',
    subCategories: [
      'Private Chef',
      'Caterer',
      'Pastry Chef',
      'Meal Prep',
      'Baker',
      'Barista',
      'Bartender',
      'Kitchen Assistant',
    ],
    icon: '/settings-icon3.png',
    reportReasons: {
      reportingServiceProvider: 'Poor hygiene observed',
      reportingClient: 'Withheld allergy information',
      jobReports: [{ reason: 'Used expired ingredients', autoBlock: true }],
    },
    jobTips: {
      title: 'Showcase recent work',
      description: 'Upload clear photos of dishes and list specialties to attract clients.',
    },
  },
  {
    jobId: '#CT0004',
    category: 'Family & Personal Care',
    subCategories: [
      'Nanny',
      'Babysitter',
      'Caregiver',
      'Fitness Trainer',
      'Masseuse',
      'Beautician',
      'Hair Stylist',
      'Makeup Artist',
    ],
    icon: '/settings-icon4.png',
    reportReasons: {
      reportingServiceProvider: 'Inappropriate behavior',
      reportingClient: 'Demanded personal contact outside app',
      jobReports: [{ reason: 'Left early without notice', autoBlock: false }],
    },
    jobTips: {
      title: 'Confirm schedules early',
      description: 'Align on availability and preferences to avoid last‑minute changes.',
    },
  },
  {
    jobId: '#CT0005',
    category: 'Transport & Delivery',
    subCategories: [
      'Dispatch Rider',
      'Driver',
      'Haulage',
      'Courier',
      'Errand Runner',
      'Truck Driver',
      'Mover',
      'Logistics Assistant',
    ],
    icon: '/settings-icon5.png',
    reportReasons: {
      reportingServiceProvider: 'Reckless driving reported',
      reportingClient: 'Provided fake pickup address',
      jobReports: [{ reason: 'Damaged package in transit', autoBlock: true }],
    },
    jobTips: {
      title: 'Share ETA and updates',
      description: 'Confirm pickup details and message clients if running late.',
    },
  },
  {
    jobId: '#CT0006',
    category: 'Tech & Digital Help',
    subCategories: [
      'IT Support',
      'Laptop Repair',
      'Phone Repair',
      'Web Developer',
      'Graphics Designer',
      'Photographer',
      'Video Editor',
      'Data Entry',
    ],
    icon: '/settings-icon6.png',
    reportReasons: {
      reportingServiceProvider: 'Delivered plagiarized or copied work',
      reportingClient: 'Shared malicious files',
      jobReports: [{ reason: 'Delivered malware or unsafe links', autoBlock: true }],
    },
    jobTips: {
      title: 'Show progress clearly',
      description: 'Provide milestones and share screenshots or links for quick reviews.',
    },
  },
  {
    jobId: '#CT0007',
    category: 'Skilled Labor',
    subCategories: [
      'Welder',
      'Mason',
      'Mechanic',
      'Bricklayer',
      'Aluminum Fabricator',
      'POP Specialist',
      'Roofing',
      'Flooring',
    ],
    icon: '/settings-icon7.png',
    reportReasons: {
      reportingServiceProvider: 'Used substandard materials',
      reportingClient: 'Refused agreed project terms',
      jobReports: [{ reason: 'Unsafe worksite practices', autoBlock: true }],
    },
    jobTips: {
      title: 'Estimate materials upfront',
      description: 'Send a simple breakdown of materials, labor and timelines.',
    },
  },
  {
    jobId: '#CT0008',
    category: 'Events & Setup',
    subCategories: [
      'Event Planner',
      'Decorator',
      'Sound Engineer',
      'DJ',
      'MC',
      'Caterer',
      'Usher',
      'Bartender',
    ],
    reportReasons: {
      reportingServiceProvider: 'Inappropriate behavior',
      reportingClient: 'Demanded personal contact outside app',
      jobReports: [{ reason: 'No soundcheck before event', autoBlock: false }],
    },
    icon: '/settings-icon8.png',
    jobTips: {
      title: 'Confirm venue logistics',
      description: 'Verify power, space and setup times to avoid event delays.',
    },
  },
  {
    jobId: '#CT0009',
    category: 'Automobile Services',
    subCategories: [
      'Car Wash',
      'Detailing',
      'Mechanic',
      'Tire Service',
      'Battery Service',
      'Tow Service',
      'Panel Beater',
      'Spray Painter',
    ],
    reportReasons: {
      reportingServiceProvider: 'Reckless driving reported',
      reportingClient: 'Provided fake pickup address',
      jobReports: [{ reason: 'Damaged vehicle during service', autoBlock: true }],
    },
    // Reuse an available icon
    icon: '/settings-icon7.png',
    jobTips: {
      title: 'Document condition before work',
      description: 'Take photos and note issues to align expectations and avoid disputes.',
    },
  },
];
