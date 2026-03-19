import { writable } from 'svelte/store';

export type TravelCriteria = {
	music: 'none' | 'quiet' | 'rock' | 'pop' | 'any';
	chat: 'none' | 'some' | 'very';
	punctuality: 'relaxed' | 'on-time' | 'early';
	maxDetour: number; // in minutes
};

export type NotificationSettings = {
	enabled: boolean;
	frequency: 'instant' | 'daily' | 'weekly';
	channels: {
		push: boolean;
		sms: boolean;
		email: boolean;
	};
	limitPerDay: number;
};

export type UserProfile = {
	pseudo: string;
	avatar: string;
	visible: boolean;
	criteria: TravelCriteria;
	notifications: NotificationSettings;
};

export const defaultCriteria: TravelCriteria = {
	music: 'any',
	chat: 'some',
	punctuality: 'on-time',
	maxDetour: 5
};

export const defaultNotifications: NotificationSettings = {
	enabled: true,
	frequency: 'instant',
	channels: {
		push: true,
		sms: false,
		email: true
	},
	limitPerDay: 5
};

export const currentUser = writable<UserProfile>({
	pseudo: 'Utilisateur',
	avatar: '👤',
	visible: false,
	criteria: { ...defaultCriteria },
	notifications: { ...defaultNotifications }
});

export const connectionRequests = writable<string[]>([]);
