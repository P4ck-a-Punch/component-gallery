import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Pressable,
	Alert
} from 'react-native';
import {
	Accordion,
	AccordionContent,
	AccordionIcon,
	Icon,
	ChevronDownIcon,
	ChevronUpIcon,
	AccordionTrigger,
	TrashIcon,
	ThreeDotsIcon
} from '@gluestack-ui/themed';
import { UserWorkout } from '../../types/UserWorkout';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RootStackParamList from '../../types/RootStackParamList';

// TODO: Make the days that each workout is scheduled for visible.
// Also, implement accordion funcitonality so you can actaully see what the workouts are

type ViewWorkoutsProps = {
    navigation: StackNavigationProp<RootStackParamList, 'View Workouts'>,
  	route: RouteProp<RootStackParamList, 'View Workouts'>,
    scheduledWorkouts: UserWorkout[],
    setScheduledWorkouts: (workouts: UserWorkout[]) => void,
    setWorkoutToEdit: (workoutToEdit: number) => void
};

const testUserId = '1';

const deleteWorkout = async (wid: string) => {
	const response = await fetch(
		`https://yui8zhx0qj.execute-api.us-west-2.amazonaws.com/testStage/workouts`,
		{
			method: 'DELETE',
			body: JSON.stringify({
				userId: testUserId,
				wid: wid
			}),
			headers: {
				'x-api-key': `${process.env.AWS_API_KEY}`
			}
		}
	);
	if (response.ok) return;
	else
		throw new Error(
			`Recieved error from API: \n ${response.status} ${response.body}`
		);
};

const ViewWorkouts:React.FC<ViewWorkoutsProps> = ({ navigation, route, scheduledWorkouts, setScheduledWorkouts, setWorkoutToEdit}) => {    
    return (
        <View style={styles.container}>
            {/* <View style={{width: '100%', padding: 20, alignItems: 'center'}}>
                <Text style={styles.titleText}>Workouts</Text>
            </View> */}
            <ScrollView style={{maxHeight: '80%', padding: 10, margin: 10}}>
                {scheduledWorkouts === undefined || scheduledWorkouts === null || scheduledWorkouts.length == 0 ? 
                    <></> : scheduledWorkouts.map((workout: UserWorkout, i: number) => {
                    return (
                        <View style={styles.row} key={i}>
                            <View style={styles.expandIcon}>
                                {/* Please put an accordian here */}
                                {false ? 
                                    ( <AccordionIcon as={ChevronUpIcon} ml="$4" />) : 
                                    ( <AccordionIcon as={ChevronDownIcon} ml="$4" /> )
                                }
                            </View>
                            <View style={styles.name}>
                                <Text style={styles.bodyText}>{workout.name}</Text>
                            </View>
                            <View style={styles.options}>
                                <Pressable onPress={() => {
                                        setWorkoutToEdit(i);
                                        navigation.navigate("Edit Workout", { id: -1 });
                                    }} 
                                    style={{ marginBottom: 15 }}>
                                    <Icon size='xl' as={ThreeDotsIcon} color='#00008B'/>
                                </Pressable>
                                <Pressable onPress={() => {
                                    Alert.alert(`Are you sure you want to delete the workout "${workout.name}?"`, '', [
                                        { text: 'Cancel', style: 'cancel',}, 
                                        {text: 'OK', onPress: () => {
                                            deleteWorkout(workout.wid).then(() => {
                                                setScheduledWorkouts(scheduledWorkouts.filter((w: UserWorkout) => w.wid != workout.wid));
                                            }).catch((error) => {
                                                console.log(error);
                                                Alert.alert(`Failed to remove workout: ${workout.name}`);
                                            })}
                                        }]
                                    )}}>
                                    <Icon size='lg' as={TrashIcon} color='#8B0000'/>
                                </Pressable>
                            </View>
                            <AccordionContent>
                                <Text>{workout.name}</Text>
                            </AccordionContent>
                        </View>
                    );
                })}
            </ScrollView>
            <Pressable 
                onPress={() => navigation.navigate("Add Workout", { id: -1 })}
                style={({pressed}) => [{ backgroundColor: pressed ? '#ccff8c': '#81de76'}, styles.addWorkoutButton]}>
                <Text style={styles.titleText}>Add New Workout</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	row: {
		flexDirection: 'row',
		borderRadius: 30,
		marginBottom: 10,
		backgroundColor: '#DFDFDF'
	},
	expandIcon: {
		justifyContent: 'center',
		marginRight: 15
	},
	name: {
		flex: 4,
		height: 100,
		justifyContent: 'center'
	},
	options: {
		flex: 1,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: 10
	},
	titleText: {
		paddingTop: 5,
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	bodyText: {
		fontSize: 20,
		textAlign: 'left',
		fontWeight: 'bold'
	},
	addWorkoutButton: {
		borderRadius: 15,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 15,
		alignSelf: 'center',
		maxWidth: '100%',
		marginBottom: 60
	}
});

export default ViewWorkouts;
