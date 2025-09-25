import AvatarIcon from '@/assets/avatar-user-icon.svg';
import PassportIcon from '@/assets/passport-icon.svg';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import InspoIcon from '@/assets/inspo-icon.svg';
// data/users.js

// data/users.js

export const usersData = [
  {
    id: 'U001',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],

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
    id: 'U002',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U003',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U004',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U005',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U006',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U007',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U008',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U009',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0010',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0011',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0012',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0013',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0014',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0015',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0016',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0017',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0018',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
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
      },
      {
        jobId: '#DH789456',
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
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },
];
