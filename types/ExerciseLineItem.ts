export type ExerciseLineItem = {
	name: string;
	equipment: string[];
	muscle_groups_targeted: string[];
	intensity?: number;
	reps: number;
	sets: number;
	time?: number;
};
