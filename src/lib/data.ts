import type { TravelCriteria } from './store';

export interface AnonymousProfile {
	id: string;
	pseudo_anonyme: string;
	avatar: string;
	match_percentage: number;
	criteria: TravelCriteria;
}

export const anonymousProfiles: AnonymousProfile[] = [
	{
		id: '1',
		pseudo_anonyme: 'Voyageur_1',
		avatar: '🦊',
		match_percentage: 95,
		criteria: {
			music: 'quiet',
			chat: 'some',
			punctuality: 'on-time',
			maxDetour: 10
		}
	},
	{
		id: '2',
		pseudo_anonyme: 'Voyageur_2',
		avatar: '🐨',
		match_percentage: 82,
		criteria: {
			music: 'none',
			chat: 'none',
			punctuality: 'early',
			maxDetour: 5
		}
	},
	{
		id: '3',
		pseudo_anonyme: 'Voyageur_3',
		avatar: '🐼',
		match_percentage: 75,
		criteria: {
			music: 'rock',
			chat: 'very',
			punctuality: 'relaxed',
			maxDetour: 15
		}
	}
];

export interface Message {
	id: string;
	senderId: string;
	text: string;
	timestamp: Date;
}

export interface Chat {
	id: string;
	participant: AnonymousProfile;
	lastMessage: string;
	messages: Message[];
}

export const mockChats: Chat[] = [
	{
		id: 'chat_1',
		participant: anonymousProfiles[0],
		lastMessage: 'Bonjour ! En effet, ça a l\'air pas mal du tout.',
		messages: [
			{
				id: 'm1',
				senderId: '1',
				text: 'Bonjour ! J\'ai vu que nos trajets correspondaient bien.',
				timestamp: new Date('2026-03-19T08:30:00')
			},
			{
				id: 'm2',
				senderId: 'me',
				text: 'Bonjour ! En effet, ça a l\'air pas mal du tout.',
				timestamp: new Date('2026-03-19T08:35:00')
			}
		]
	},
	{
		id: 'chat_2',
		participant: anonymousProfiles[1],
		lastMessage: 'D\'accord pour 8h demain ?',
		messages: [
			{
				id: 'm3',
				senderId: '2',
				text: 'Salut ! Tu passes par le centre-ville ?',
				timestamp: new Date('2026-03-18T18:20:00')
			},
			{
				id: 'm4',
				senderId: 'me',
				text: 'Oui tout à fait.',
				timestamp: new Date('2026-03-18T18:25:00')
			},
			{
				id: 'm5',
				senderId: '2',
				text: 'D\'accord pour 8h demain ?',
				timestamp: new Date('2026-03-18T18:30:00')
			}
		]
	},
	{
		id: 'chat_3',
		participant: anonymousProfiles[2],
		lastMessage: 'Pas de soucis pour la musique !',
		messages: [
			{
				id: 'm6',
				senderId: '3',
				text: 'Hey ! J\'espère que tu aimes le rock !',
				timestamp: new Date('2026-03-17T14:10:00')
			},
			{
				id: 'm7',
				senderId: 'me',
				text: 'Pas de soucis pour la musique !',
				timestamp: new Date('2026-03-17T14:15:00')
			}
		]
	}
];
