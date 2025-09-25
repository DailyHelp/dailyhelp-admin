import AvatarIcon from '@/assets/avatar-user-icon.svg';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import InspoIcon from '@/assets/inspo-icon.svg';
// data/users.js

// data/users.js

export const reportsDataDetails = [
  {
    jobId: '#DH450123',
    reporter: {
      name: 'Chisom Eze',
      icon: AvatarIcon,
      role: 'service Provider',
      service: 'Makeup artist',
    },
    reportedParty: {
      name: 'Chika Nwosu',
      role: 'client',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '13,500',
    reason: 'Fake Identity or Impersonation',
    status: 'Pending',
    reportsDetails: {
      description:
        "I want to bring to your attention a concerning incident that occurred on our platform. Recently, I encountered an individual who was attempting to scam users by presenting a false identity. This person claimed to be a representative of our company, but upon further investigation, it became clear that their information was fabricated.The individual used a convincing story to gain trust, but their inconsistencies raised red flags. I recommend that we enhance our verification processes to prevent such incidents in the future. It's crucial that we protect our users and maintain the integrity of our platform.",
      images: ['/chatinspo.png', '/chatinspo.png'],
    },
    timeline: {
      submitted: { date: '23 May, 2025', time: '09:30' },
      resolution: { date: '-', time: '-' },
    },

    // 🆕 Chat Data
    chat: [
      {
        chatId: 'C001',
        with: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          avatar: AvatarIcon,
        },
        messages: [
          {
            id: 'M001',
            sender: 'user', // or "provider"
            text: 'Hello Chika, can you confirm the appointment?',
            time: '10:15 AM',
            date: '12 Dec, 2025',
            status: 'countered',
            type: 'offer',
            amount: '6,000',
            images: ['/chatinspo.png', '/chatinspo.png', '/chatinspo.png', '/chatinspo.png'],
          },
          {
            id: 'M002',
            sender: 'provider',
            text: 'Yes! I’ll be there by 11:00 AM as scheduled.',
            time: '10:17 AM',
            date: '12 Dec, 2025',
            status: 'delivered',
            type: 'offer',
            amount: '10,000',
          },
          {
            id: 'M003',
            sender: 'user',
            text: 'Perfect. Please don’t forget the bridal kit.',
            time: '10:20 AM',
            date: '12 Dec, 2025',
            status: 'seen',
          },
        ],
      },
    ],
  },

  {
    jobId: '#DH789456',
    reporter: {
      name: 'Gabriel Afolabi',
      role: 'service Provider',
      icon: AvatarIcon,
      service: 'Hair stylist',
    },
    reportedParty: {
      name: 'Tunde Okafor',
      role: 'client',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '5,700',
    status: 'Resolved',
    reason: 'Fraudulent Transaction',
    reportsDetails: {
      description:
        "I want to bring to your attention a concerning incident that occurred on our platform. Recently, I encountered an individual who was attempting to scam users by presenting a false identity. This person claimed to be a representative of our company, but upon further investigation, it became clear that their information was fabricated.The individual used a convincing story to gain trust, but their inconsistencies raised red flags. I recommend that we enhance our verification processes to prevent such incidents in the future. It's crucial that we protect our users and maintain the integrity of our platform.",
      images: ['/chatinspo.png', '/chatinspo.png'],
    },
    timeline: {
      submitted: { date: '23 May, 2025', time: '09:30' },
      resolution: { date: '23 May, 2025', time: '09:30' },
    },
  },
  {
    jobId: '#DH234567',
    reporter: {
      name: 'Kunle Daniels',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Adaobi Ibe',
      role: 'service Provider',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '21,230',
    statusReason: 'Failed identity verification',
    status: 'Resolved',
    reason: 'Fake Identity or Impersonation',
    reportsDetails: {
      description:
        "I want to bring to your attention a concerning incident that occurred on our platform. Recently, I encountered an individual who was attempting to scam users by presenting a false identity. This person claimed to be a representative of our company, but upon further investigation, it became clear that their information was fabricated.The individual used a convincing story to gain trust, but their inconsistencies raised red flags. I recommend that we enhance our verification processes to prevent such incidents in the future. It's crucial that we protect our users and maintain the integrity of our platform.",
      images: InspoIcon,
    },
    timeline: {
      submitted: { date: '23 May, 2025', time: '09:30' },
      resolution: { date: '23 May, 2025', time: '09:30' },
    },
  },
  {
    jobId: '#DH778899',
    reporter: {
      name: 'Adaobi Nwosu',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Chukwuma Eke',
      role: 'service Provider',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '25,000',
    status: 'Resolved',
    reason: 'Phishing Scam',
    reportsDetails: {
      description:
        "I want to bring to your attention a concerning incident that occurred on our platform. Recently, I encountered an individual who was attempting to scam users by presenting a false identity. This person claimed to be a representative of our company, but upon further investigation, it became clear that their information was fabricated.The individual used a convincing story to gain trust, but their inconsistencies raised red flags. I recommend that we enhance our verification processes to prevent such incidents in the future. It's crucial that we protect our users and maintain the integrity of our platform.",
      images: InspoIcon,
    },
    timeline: {
      submitted: { date: '23 May, 2025', time: '09:30' },
      resolution: { date: '23 May, 2025', time: '09:30' },
    },
  },
  {
    jobId: '#DH334455',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'service Provider',
      icon: AvatarIcon,
    },
    reason: 'Fake Identity or Impersonation',
    amount: '80,000',
    status: 'Pending',
    reportsDetails: {
      description:
        "I want to bring to your attention a concerning incident that occurred on our platform. Recently, I encountered an individual who was attempting to scam users by presenting a false identity. This person claimed to be a representative of our company, but upon further investigation, it became clear that their information was fabricated.The individual used a convincing story to gain trust, but their inconsistencies raised red flags. I recommend that we enhance our verification processes to prevent such incidents in the future. It's crucial that we protect our users and maintain the integrity of our platform.",
      images: InspoIcon,
    },
    timeline: {
      submitted: { date: '23 May, 2025', time: '09:30' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH334855',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'service Provider',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'client',
      icon: AvatarIcon,
    },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH394455',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'service Provider',
      icon: AvatarIcon,
    },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH3234455',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'service provider',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'client',
      icon: AvatarIcon,
    },
    amount: '80,000',
    status: 'Pending',
    reason: 'Fake Identity or Impersonation',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH334487',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'service Provider',
      icon: AvatarIcon,
    },
    amount: '80,000',
    status: 'Pending',
    reason: 'Fake Identity or Impersonation',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH387555',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
      role: 'client',
    },
    reportedParty: {
      name: 'Ngozi Umeh',
      role: 'service Provider',
      icon: AvatarIcon,
    },
    amount: '80,000',
    status: 'Pending',
    reason: 'Fake Identity or Impersonation',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH337655',
    reporter: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    reportedParty: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Fake Identity or Impersonation',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH337648',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH338645',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH674455',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH094455',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH330755',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH8747455',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Completed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH763555',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },
  {
    jobId: '#DH744455',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },

  {
    jobId: '#DH376555',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },
  {
    jobId: '#DH334864',
    client: {
      name: 'Ifeoma Anya',
      icon: AvatarIcon,
    },
    serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
    amount: '80,000',
    status: 'Pending',
    reason: 'Service not as agreed',
    timeline: {
      accepted: { date: '-', time: '-' },
      started: { date: '02 Apr, 2025', time: '-' },
      ended: { date: '05 Apr, 2025', time: '-' },
      submitted: { date: '05 Apr, 2025', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },
];
