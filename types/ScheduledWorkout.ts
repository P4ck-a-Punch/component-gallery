import { UserWorkoutDetails } from './UserWorkoutDetails';

export type ScheduledWorkout = {
	wid: string;
	scheduling: {
		type: string;
		recur: string;
	};
	exercises: UserWorkoutDetails[];
	userId: string;
	name: string;
};
