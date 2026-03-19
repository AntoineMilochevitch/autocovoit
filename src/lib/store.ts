import { writable } from 'svelte/store';

export type TravelCriteria = {
	music: 'none' | 'quiet' | 'rock' | 'pop' | 'any';
	chat: 'none' | 'some' | 'very';
	punctuality: 'relaxed' | 'on-time' | 'early';
	maxDetour: number; // in minutes
};

export type UserProfile = {
	pseudo: string;
	avatar: string;
	visible: boolean;
	criteria: TravelCriteria;
};

export const defaultCriteria: TravelCriteria = {
	music: 'any',
	chat: 'some',
	punctuality: 'on-time',
	maxDetour: 5
};

export const currentUser = writable<UserProfile>({
	pseudo: 'Utilisateur',
	avatar: '👤',
	visible: false,
	criteria: { ...defaultCriteria }
});

export const connectionRequests = writable<string[]>([]);
