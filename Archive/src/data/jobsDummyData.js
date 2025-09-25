import AvatarIcon from '@/assets/avatar-user-icon.svg';
import PassportIcon from '@/assets/passport-icon.svg';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import InspoIcon from '@/assets/inspo-icon.svg';
// data/users.js

// data/users.js

export const jobsDataDetails = [
  {
    jobId: '#DH450123',
    client: {
      name: 'Chisom Eze',
      icon: AvatarIcon,
    },
    serviceProvider: {
      name: 'Chika Nwosu',
      role: 'Makeup Artist',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '13,500',
    status: 'Pending',
    jobDesc:
      'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
    jobInspo: InspoIcon,
    timeline: {
      accepted: { date: '12 Dec, 2025', time: '11:00' },
      started: { date: '12 Dec, 2025', time: '09:30' },
      ended: { date: '-', time: '-' },
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
    client: {
      name: 'Gabriel Afolabi',
      icon: AvatarIcon,
    },
    serviceProvider: {
      name: 'Tunde Okafor',
      role: 'Fashion Designer',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '5,700',
    status: 'InProgress',
    jobDesc: 'Hey! I need help cleaning my room...',
    jobInspo: InspoIcon,
    timeline: {
      accepted: { date: '23 Jun, 2025', time: '11:00' },
      started: { date: '20 Oct, 2025', time: '11:00' },
      ended: { date: '-', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },
  {
    jobId: '#DH234567',
    client: {
      name: 'Kunle Daniels',
      icon: AvatarIcon,
    },
    serviceProvider: {
      name: 'Adaobi Ibe',
      role: 'Nail Technician',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '21,230',
    status: 'Canceled',
    statusReason: 'Failed identity verification',
    jobDesc: 'Hey! I need help cleaning my room...',
    jobInspo: InspoIcon,
    timeline: {
      accepted: { date: '23 Jun, 2025', time: '11:00' },
      started: { date: '23 Jun, 2025', time: '11:00' },
      ended: { date: '-', time: '-' },
      resolution: { date: '-', time: '-' },
    },
  },
  {
    jobId: '#DH778899',
    client: {
      name: 'Adaobi Nwosu',
      icon: AvatarIcon,
    },
    serviceProvider: {
      name: 'Chukwuma Eke',
      role: 'Photographer',
      icon: AvatarIcon,
      badgeIcon: PlatinumIcon,
    },
    amount: '25,000',
    status: 'Disputed',
    jobDesc: 'Hey! I need help cleaning my room...',
    jobInspo: InspoIcon,
    disputeDetails: {
      issue: 'Provider didn’t complete the work',
      description: 'The cleaner left the room halfway through...',
      images: InspoIcon,
    },
    resolutionDetails: {
      issue: 'Partial refund',
      description:
        'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
      refundAmount: '12,500',
    },
    timeline: {
      accepted: { date: '23 Jun, 2025', time: '11:00' },
      started: { date: '18 May, 2025', time: '11:00' },
      ended: { date: '14 Aug, 2025', time: '11:00' },
      resolution: { date: '23 Jun, 2025', time: '11:00' },
    },
  },
  {
    jobId: '#DH334455',
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
    jobId: '#DH334456',
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
    jobId: '#DH334435',
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
    jobId: '#DH324455',
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
    jobId: '#DH334785',
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
    jobId: '#DH309855',
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
    jobId: '#DH765455',
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
    jobId: '#DH334055',
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
    jobId: '#DH734455',
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
    jobId: '#DH334955',
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
    jobId: '#DH334095',
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
    jobId: '#DH356855',
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
    jobId: '#DH3367455',
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
    jobId: '#DH334565',
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
    jobId: '#DH094455',
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
    jobId: '#DH362455',
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
    jobId: '#DH334465',
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
];
