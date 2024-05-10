import { UserWorkoutDetails } from './UserWorkoutDetails';

export type PastWorkout = {
	pwid: string;
	date: Date;
	exercises: UserWorkoutDetails[];
	userId: string;
	name: string;
};
