import {
	Icon,
	HStack,
	Divider,
	Center,
	Box,
	Button,
	ButtonText,
	Select,
	SelectTrigger,
	Text,
	SelectItem,
	SelectPortal,
	SelectContent,
	SelectInput,
	SelectBackdrop,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	Heading,
	VStack,
	SelectScrollView,
	RemoveIcon,
	Input,
	InputField,
	Modal,
	ModalBody,
	ModalFooter,
	ModalContent,
	ModalBackdrop,
	ModalCloseButton,
	ModalHeader,
	useToast,
	Toast,
	ToastTitle,
	ToastDescription
} from '@gluestack-ui/themed';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Exercise } from '../types/Exercise';
import { AddIcon } from '@gluestack-ui/themed';
import { UserWorkout } from '../types/UserWorkout';
import { Info, Star, Minimize2, TextSearch } from 'lucide-react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

interface TimerProps {
	exercises: Exercise[];
	scheduledWorkouts: UserWorkout[];
}

export default function TimerScreen({
	exercises,
	scheduledWorkouts
}: TimerProps) {
	const [timerStarted, setTimerStarted] = useState(false);
	const [timerText, setTimerText] = useState('Start');

	const [currentWeight, setCurrentWeight] = useState(0);
	const [currentSets, setCurrentSets] = useState(0);
	const [currentReps, setCurrentReps] = useState(0);

	const [personalRecord, setPersonalRecord] = useState(0);

	const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
	const [exerciseSaved, setExerciseSaved] = useState(false);

	const [exerciseData, setExerciseData] = useState(exercises);
	const [favoriteExercises, setFavoriteExercises] = useState<Exercise[] | null>(
		null
	);
	const [searchInput, setSearchInput] = useState('');

	const confettiRef = useRef<LottieView>(null);

	useEffect(() => {
		setPersonalRecord(currentWeight);
	}, [currentWeight]);

	// Currently only local state, we want a favorite array in the database
	useEffect(() => {
		if (exerciseSaved && currentExercise) {
			if (favoriteExercises === null) {
				setFavoriteExercises([currentExercise]);
			} else {
				if (
					!favoriteExercises?.find(
						(exercise: Exercise) => exercise._id === currentExercise._id
					)
				) {
					setExerciseSaved(true);
					setFavoriteExercises([...favoriteExercises, currentExercise]);
				}
			}
		}

		if (!exerciseSaved && currentExercise) {
			setFavoriteExercises((oldValues: Exercise[] | null) => {
				if (oldValues === null) return null;
				return oldValues?.filter(
					(exercise) => exercise._id !== currentExercise._id
				);
			});
		}
	}, [exerciseSaved]);

	useEffect(() => {
		const filteredExercises = exercises
			.filter((exercise: Exercise) =>
				exercise.workout_name.startsWith(searchInput)
			)
			.map((exercise: Exercise) => exercise);

		setExerciseData(filteredExercises);
	}, [searchInput]);

	useEffect(() => {
		// Check if current exercise is in the user's exercises, update state of exerciseSaved
		// We will use this state variable for an easy way of adding/removing the selected workout to the user's favorites

		setExerciseSaved(false);

		if (
			currentExercise &&
			favoriteExercises?.find(
				(exercise: Exercise) => exercise._id === currentExercise._id
			)
		) {
			setExerciseSaved(true);
		}
	}, [currentExercise]);

	function triggerConfetti() {
		if (confettiRef.current) {
			confettiRef.current.play(0);
		}
	}

	function handleExerciseSaved() {
		if (
			!exerciseSaved &&
			currentExercise &&
			favoriteExercises?.find(
				(exercise: Exercise) => exercise._id === currentExercise._id
			)
		) {
			setFavoriteExercises((oldValues: Exercise[] | null) => {
				if (oldValues === null) return null;
				return oldValues?.filter(
					(exercise) => exercise._id !== currentExercise._id
				);
			});
		}

		if (
			exerciseSaved &&
			currentExercise &&
			!favoriteExercises?.find(
				(exercise: Exercise) => exercise._id === currentExercise._id
			)
		) {
			if (favoriteExercises === null) {
				setFavoriteExercises([currentExercise]);
			} else {
				setFavoriteExercises([...favoriteExercises, currentExercise]);
			}
		}

		toast.show({
			placement: 'top',
			duration: 1500,
			render: (id: number) => {
				const toastId = 'toast-' + id;
				return (
					<Toast
						nativeID={toastId}
						action="success"
						variant="accent"
						marginTop={80}
					>
						<VStack space="xs">
							{exerciseSaved ? (
								<ToastTitle>Exercise removed from favorites</ToastTitle>
							) : (
								<ToastTitle>Exercise added to favorites</ToastTitle>
							)}
						</VStack>
					</Toast>
				);
			}
		});
	}

	const [time, setTime] = useState({
		sec: 0,
		min: 0,
		hr: 0
	});

	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	const updateTimer = () => {
		setTime((prev) => {
			let newTime = { ...prev };

			if (newTime.sec < 59) {
				newTime.sec += 1;
			} else {
				newTime.min += 1;
				newTime.sec = 0;
			}

			if (newTime.min === 60) {
				newTime.min = 0;
				newTime.hr += 1;
			}

			return newTime;
		});
	};

	const pauseOrResume = () => {
		if (!intervalId) {
			let id = setInterval(updateTimer, 1000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	};

	const reset = () => {
		setTimerText('Start');
		setTimerStarted(false);

		if (intervalId !== null) {
			clearInterval(intervalId);
			setIntervalId(null);
		}

		setTime({
			sec: 0,
			min: 0,
			hr: 0
		});
	};

	function updateColor() {
		setTimerStarted(!timerStarted);
		pauseOrResume();

		if (!timerStarted) {
			setTimerText('Pause');
		} else {
			setTimerText('Start');
		}
	}

	const filterExercisesByCategory = (category: string) =>
		exerciseData
			.filter((exercise: Exercise) => exercise.category === category)
			.map((exercise: Exercise) => exercise);

	const allWorkouts = () => {
		const categories = [
			'Chest',
			'Legs',
			'Arms',
			'Back',
			'Shoulders',
			'Core',
			'Full Body',
			'Cardio'
		];

		return (
			<>
				{categories
					.filter(
						(category: string) => filterExercisesByCategory(category).length > 0
					)
					.map((category: string, index: number) => (
						<View key={index}>
							<Divider marginTop={10} />
							<Text
								fontWeight="bold"
								paddingLeft={20}
								paddingTop={10}
								paddingBottom={10}
							>
								{category}
							</Text>
							<Divider marginBottom={5} />
							{filterExercisesByCategory(category).map((exercise: Exercise) => (
								<SelectItem
									label={exercise.workout_name}
									value={exercise.workout_name}
									backgroundColor={
										currentExercise && currentExercise._id === exercise._id
											? 'lightgrey'
											: 'transparent'
									}
									key={exercise._id}
									onPress={() => {
										setCurrentExercise(exercise);
										setIsOpen(false);
									}}
								/>
							))}
						</View>
					))}
			</>
		);
	};

	function increasePRWeight() {
		setPersonalRecord(personalRecord + 15);
	}

	function decreasePRWeight() {
		if (personalRecord - 15 >= 0) {
			setPersonalRecord(personalRecord - 15);
		}
	}

	function increaseWeight() {
		setCurrentWeight(currentWeight + 15);
	}

	function decreaseWeight() {
		if (currentWeight - 15 >= 0) {
			setCurrentWeight(currentWeight - 15);
		}
	}

	function increaseSets() {
		if (currentSets + 1 <= 99) {
			setCurrentSets(currentSets + 1);
		}
	}

	function decreaseSets() {
		if (currentSets - 1 >= 0) {
			setCurrentSets(currentSets - 1);
		}
	}

	function increaseReps() {
		if (currentReps + 1 <= 99) {
			setCurrentReps(currentReps + 1);
		}
	}

	function decreaseReps() {
		if (currentReps - 1 >= 0) {
			setCurrentReps(currentReps - 1);
		}
	}

	const [showModal, setShowModal] = useState(false);
	const [showPRModal, setShowPRModal] = useState(false);
	const ref = React.useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const toast = useToast();

	const favorites = () => {
		return (
			<>
				{favoriteExercises?.map((exercise: Exercise, index: number) => (
					<SelectItem
						label={exercise.workout_name}
						value={exercise.workout_name}
						backgroundColor={
							currentExercise && currentExercise._id === exercise._id
								? 'lightgrey'
								: 'transparent'
						}
						key={exercise._id}
						onPress={() => {
							setCurrentExercise(exercise);
							setIsOpen(false);
						}}
					/>
				))}
			</>
		);
	};

	return (
		<Center>
			<VStack
				display={'flex'}
				justifyContent="center"
				alignItems="center"
				bg={'#F8FDFF'}
				height={'100%'}
				width={'100%'}
			>
				<HStack paddingBottom={20} paddingTop={50} alignItems="center">
					{currentExercise && (
						<Star
							onPress={() => {
								setExerciseSaved(!exerciseSaved);
								handleExerciseSaved();
							}}
							fill={exerciseSaved ? '#ffff00' : 'transparent'}
							color={exerciseSaved ? 'black' : 'darkgrey'}
						/>
					)}
					<Select
						width={'$48'}
						marginLeft={20}
						marginRight={20}
						paddingBottom={currentExercise ? 0 : 20}
					>
						<SelectTrigger
							variant="outline"
							size="md"
							borderColor="black"
							onPressIn={() => setIsOpen(!isOpen)}
						>
							<SelectInput
								placeholder="Select Workout"
								textAlign="center"
								fontSize={currentExercise ? 20 : 24}
								color="$black"
								placeholderTextColor={'black'}
								value={currentExercise?.workout_name}
							/>
						</SelectTrigger>
						<SelectPortal
							isOpen={isOpen}
							onClose={() => {
								setIsOpen(false);
								setSearchInput('');
							}}
						>
							<SelectBackdrop />
							<SelectContent height={600}>
								<SelectDragIndicatorWrapper>
									<SelectDragIndicator />
								</SelectDragIndicatorWrapper>
								<SelectScrollView>
									<Text
										fontWeight="bold"
										paddingTop={10}
										paddingBottom={10}
										textAlign="center"
									>
										All Workouts
									</Text>
									<Input
										marginBottom={20}
										width={360}
										alignSelf="center"
										alignItems="center"
									>
										<InputField
											placeholder="Search"
											value={searchInput}
											onChangeText={(text) => setSearchInput(text)}
										/>
									</Input>
									{favoriteExercises && favoriteExercises.length > 0 && (
										<>
											<Divider marginTop={10} />
											<HStack alignItems="center" paddingLeft={10}>
												<Star size={20} fill={'#ffff00'} color={'black'} />
												<Text
													fontWeight="bold"
													paddingLeft={10}
													paddingTop={10}
													paddingBottom={10}
												>
													Favorites
												</Text>
											</HStack>
											<Divider marginBottom={5} />
											{favorites()}
										</>
									)}
									{allWorkouts()}
								</SelectScrollView>
							</SelectContent>
						</SelectPortal>
					</Select>
					{currentExercise && currentExercise.description && (
						<Info color="#007FFF" onPress={() => setShowModal(true)} />
					)}
					<Modal
						isOpen={showModal}
						onClose={() => {
							setShowModal(false);
						}}
						finalFocusRef={ref}
					>
						<ModalBackdrop />
						<ModalContent>
							<ModalHeader>
								<Heading size="lg">Exercise Info</Heading>
								<ModalCloseButton>
									<Minimize2 />
								</ModalCloseButton>
							</ModalHeader>
							<ModalBody>
								<Text>{currentExercise?.description} </Text>
							</ModalBody>
							<ModalFooter></ModalFooter>
						</ModalContent>
					</Modal>
				</HStack>

				{currentExercise && currentExercise.category !== 'Cardio' && (
					<VStack display="flex" alignItems="center" paddingBottom={20}>
						<Heading>Weight (lbs)</Heading>
						<HStack
							display="flex"
							justifyContent="center"
							alignContent="center"
						>
							<Button onPress={() => decreaseWeight()} bgColor={'transparent'}>
								<Icon as={RemoveIcon} />
							</Button>

							<Text fontSize={24} lineHeight={40}>
								{currentWeight}
							</Text>

							<Button onPress={() => increaseWeight()} bgColor={'transparent'}>
								<Icon as={AddIcon} />
							</Button>
						</HStack>

						<Text color="#8A8A8A">PR: 225lbs</Text>
					</VStack>
				)}

				<Button
					onPress={() => updateColor()}
					bg={timerStarted ? '#E35252' : '#5BD968'}
					h="$48"
					w="$48"
					style={styles.timerButton}
				>
					<Text color="black" fontSize={30} lineHeight={35}>
						{timerText}
					</Text>
				</Button>

				<Text
					fontSize={48}
					lineHeight={48}
					paddingTop={30}
					color="$trueGray500"
				>
					{time.min} : {time.sec < 10 ? 0 : ''}
					{time.sec}
				</Text>

				<HStack space="lg" paddingBottom={20} paddingTop={30}>
					<VStack display="flex" alignItems="center">
						<Heading>Target Sets</Heading>
						<HStack
							paddingBottom={10}
							display="flex"
							justifyContent="center"
							alignContent="center"
						>
							<Button onPress={() => decreaseSets()} bgColor={'transparent'}>
								<Icon as={RemoveIcon} />
							</Button>

							<Text fontSize={24} lineHeight={40} w={30} textAlign="center">
								{currentSets}
							</Text>

							<Button onPress={() => increaseSets()} bgColor={'transparent'}>
								<Icon as={AddIcon} />
							</Button>
						</HStack>
					</VStack>
					<VStack display="flex" alignItems="center">
						<Heading>Target Reps</Heading>
						<HStack
							paddingBottom={10}
							display="flex"
							justifyContent="center"
							alignContent="center"
						>
							<Button onPress={() => decreaseReps()} bgColor={'transparent'}>
								<Icon as={RemoveIcon} />
							</Button>

							<Text fontSize={24} lineHeight={40} w={30} textAlign="center">
								{currentReps}
							</Text>

							<Button onPress={() => increaseReps()} bgColor={'transparent'}>
								<Icon as={AddIcon} />
							</Button>
						</HStack>
					</VStack>
				</HStack>

				<Button
					onPress={() => setShowPRModal(true)}
					style={styles.recordPRButton}
				>
					<Text textAlign="center">Record PR</Text>
				</Button>

				<Modal
					isOpen={showPRModal}
					onClose={() => {
						setShowPRModal(false);
					}}
					finalFocusRef={ref}
				>
					<ModalBackdrop />
					<ModalContent>
						<Center>
							<ModalHeader>
								<Heading size="lg">Personal Record</Heading>
								<ModalCloseButton></ModalCloseButton>
							</ModalHeader>
							<ModalBody>
								<Text textAlign="center">Weight (lbs)</Text>
								<HStack
									display="flex"
									justifyContent="center"
									alignContent="center"
								>
									<Button
										onPress={() => decreasePRWeight()}
										bgColor={'transparent'}
									>
										<Icon as={RemoveIcon} />
									</Button>

									<Text fontSize={24} lineHeight={40}>
										{personalRecord}
									</Text>

									<Button
										onPress={() => increasePRWeight()}
										bgColor={'transparent'}
									>
										<Icon as={AddIcon} />
									</Button>
								</HStack>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="outline"
									size="sm"
									action="secondary"
									mr="$3"
									onPress={() => {
										setShowPRModal(false);
									}}
								>
									<ButtonText>Cancel</ButtonText>
								</Button>
								<Button
									size="sm"
									action="positive"
									borderWidth="$0"
									onPress={() => {
										triggerConfetti();
										setShowPRModal(false);
									}}
								>
									<ButtonText>Set Record</ButtonText>
								</Button>
							</ModalFooter>
						</Center>
					</ModalContent>
				</Modal>

				<Button onPress={() => reset()} style={styles.resetButton}>
					<Text textAlign="center">Reset</Text>
				</Button>

				<LottieView
					source={require('../assets/confetti.json')}
					style={styles.lottie}
					resizeMode="cover"
					ref={confettiRef}
					loop={false}
				/>
			</VStack>
		</Center>
	);
}

const styles = StyleSheet.create({
	lottie: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1000,
		pointerEvents: 'none',
		width: '100%',
		height: '100%'
	},
	timerButton: {
		borderRadius: 200,
		borderColor: 'black',
		borderWidth: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	targetBox: {
		backgroundColor: '#E0E5EA',
		borderRadius: 30,
		borderWidth: 1,
		width: 224,
		height: 88,
		display: 'flex',
		justifyContent: 'center'
	},
	targetText: {
		lineHeight: 30,
		fontSize: 24,
		paddingLeft: 20
	},
	recordPRButton: {
		backgroundColor: '#E5F6FD',
		borderWidth: 1,
		width: 175,
		height: 35,
		display: 'flex',
		justifyContent: 'center'
	},
	resetButton: {
		marginTop: 20,
		backgroundColor: '#FFFFED',
		borderColor: '#8B8000',
		borderWidth: 1,
		width: 175,
		height: 35,
		display: 'flex',
		justifyContent: 'center'
	}
});
