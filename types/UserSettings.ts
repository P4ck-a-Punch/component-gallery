import { ValueStatePair } from './ValueStatePair';

export type UserSettings = {
	userInfo: {
		userName: string;
		profilePicture: string;
		phoneNumber: string;
		email: string;
		usesMetricSystem: boolean;
	};
	permsSettings: ValueStatePair[];
	notifsSettings: {
		type: ValueStatePair[];
		mode: ValueStatePair[];
	};
};
