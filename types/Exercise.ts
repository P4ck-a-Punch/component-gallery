export type Exercise = {
	_id: number;
	workout_name: string;
	description: string;
	category: string;
	equipment: string[];
	muscle_groups_targeted: string[];
	intensity?: number;
};
