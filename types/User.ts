import { UserWorkoutDetails } from './UserWorkoutDetails';

export type User = {
	_id: number;
	username: string;
	email: string;
	password: string;
	workouts: UserWorkoutDetails[];
};
