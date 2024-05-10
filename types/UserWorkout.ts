import { UserWorkoutDetails } from './UserWorkoutDetails';

export type UserWorkout = {
	wid: string;
	name: string;
	exercises: UserWorkoutDetails[];
	date?: string;
	scheduling?: {
		type: string;
		recur: string;
	};
};
