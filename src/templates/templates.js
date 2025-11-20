import { v4 as uuidv4 } from 'uuid';

export const templates = [
    {
        id: 'newsletter',
        name: 'Newsletter',
        description: 'Share news and updates with your audience.',
        blocks: [
            {
                id: uuidv4(),
                type: 'text',
                content: { text: 'Weekly Newsletter' },
                styles: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }
            },
            {
                id: uuidv4(),
                type: 'image',
                content: { url: '' },
                styles: {}
            },
            {
                id: uuidv4(),
                type: 'text',
                content: { text: 'Here is the latest news...' },
                styles: { fontSize: '16px' }
            }
        ]
    },
    {
        id: 'invitation',
        name: 'Invitation',
        description: 'Invite people to your event.',
        blocks: [
            {
                id: uuidv4(),
                type: 'text',
                content: { text: 'You are invited!' },
                styles: { fontSize: '28px', fontWeight: 'bold', textAlign: 'center', color: '#4f46e5' }
            },
            {
                id: uuidv4(),
                type: 'date',
                content: { title: 'Event Schedule', startDate: new Date().toISOString().split('T')[0] },
                styles: {}
            },
            {
                id: uuidv4(),
                type: 'map',
                content: { address: 'Event Location' },
                styles: {}
            },
            {
                id: uuidv4(),
                type: 'input',
                content: { label: 'RSVP', placeholder: 'Your Name', buttonText: 'I will attend' },
                styles: {}
            }
        ]
    },
    {
        id: 'promotion',
        name: 'Business Promotion',
        description: 'Promote your business or service.',
        blocks: [
            {
                id: uuidv4(),
                type: 'image',
                content: { url: '' },
                styles: {}
            },
            {
                id: uuidv4(),
                type: 'text',
                content: { text: 'Special Offer!' },
                styles: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', color: '#ef4444' }
            },
            {
                id: uuidv4(),
                type: 'video',
                content: { url: '' },
                styles: {}
            },
            {
                id: uuidv4(),
                type: 'input',
                content: { label: 'Contact Us', placeholder: 'Email Address', buttonText: 'Subscribe' },
                styles: {}
            }
        ]
    }
];
