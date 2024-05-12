type RootStackParamList = {
    "Workouts": undefined,
    "View Workouts": undefined,
    "Add Workout": { id: number },
    "Edit Workout": { id: number },
    "Search": { filter: string, sourceScreen: 'Add Workout' | 'Edit Workout' }
};

export default RootStackParamList;
