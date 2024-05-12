import React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogContent,
	AlertDialogCloseButton,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	Input,
	Box,
	Button,
	ButtonGroup,
	CloseIcon,
	Modal,
	Heading,
	ModalBackdrop,
	ButtonText,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Icon,
	InputField,
	InputSlot,
	HStack,
	VStack,
	CloseCircleIcon,
	Center
} from '@gluestack-ui/themed';

interface Food {
	foodName: string;
	foodCalories: number;
}
interface MealboxProps {
	foodList: Food[] | null;
	setTotal: (value: number) => void;
}

export default function MealsScreen({ navigation }: any) {
	const ref = React.useRef(null);

	const [showAlertDialog, setShowAlertDialog] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [calories, setCalories] = useState('');
	const [total, setTotal] = useState(0);

	const [foodItems, setFoodItems] = useState<Food[] | null>(null);

	const [servingSize, setServingSize] = useState('');
	const [energy100, setEnergy100] = useState('');

	function addFoodItem(name: string, calories: number) {
		let foodItem: Food = {
			foodName: name,
			foodCalories: calories
		};

		if (foodItems === null) {
			setFoodItems([foodItem]);
		} else {
			setFoodItems([...foodItems, foodItem]);
		}

		setTotal(total + foodItem.foodCalories);
	}

	function removeFoodItem(item: Food, key: number): void {
		if (foodItems) {
			const updatedFoodItems = [...foodItems];
			updatedFoodItems.splice(key, 1);
			setFoodItems(updatedFoodItems);
			setTotal(total - item.foodCalories);
		}
	}

	function clearFoodList(): void {
		setFoodItems(null);
		setTotal(0);
	}

	function FoodItemList({ foodList, setTotal }: MealboxProps) {
		if (foodList) {
			return foodList.map((item, index) => {
				const key = index;
				return (
					<Box style={styles.foodBox}>
						<HStack alignItems="center" justifyContent="space-between">
							<VStack>
								<Text
									style={styles.foodName}
									key={key}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{item.foodName}
								</Text>
								<Text style={styles.black}>{item.foodCalories} kcal</Text>
							</VStack>
							<Button
								bgColor="transparent"
								onPress={() => {
									removeFoodItem(item, key);
								}}
							>
								<CloseIcon />
							</Button>
						</HStack>
					</Box>
				);
			});
		}
	}

	async function getNutritionData(barcode: string) {
		try {
			console.log(barcode);

			const response = await fetch(
				`https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=product_name,nutriments`
			);

			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (!showAlertDialog && energy100 && servingSize) {
			const size = parseInt(servingSize);
			const energy = parseInt(energy100);

			let kcals = (energy * size) / 100;

			// Fewer than 5 calories per serving, round down to zero.
			// 50 or fewer calories per serving, round to the nearest 5 increment (i.e. 42 rounds to 40).
			// More than 50 calories per serving, round to the nearest 10 increment (i.e. 106 becomes 110).

			if (kcals < 5) {
				kcals = 0;
			} else if (kcals < 50) {
				kcals = Math.round(kcals / 5) * 5;
			} else {
				kcals = Math.round(kcals / 10) * 10;
			}

			setCalories(kcals.toString());
		}
	}, [showAlertDialog]);

	const handleBarcodeData = async (barcode: string) => {
		setShowModal(true);
		setServingSize('');
		setEnergy100('');

		getNutritionData(barcode).then(async (result) => {
			if (result) {
				if (result.product.product_name) {
					setName(result.product.product_name);
				}

				if (result.product.nutriments['energy-kcal_serving']) {
					let kcals = result.product.nutriments['energy-kcal_serving'];
					setCalories(kcals.toString());
					return;
				}

				if (result.product.nutriments['energy-kcal_100g']) {
					setShowAlertDialog(true);
					let kcals = result.product.nutriments['energy-kcal_100g'];
					setEnergy100(kcals);
				}
			}
		});
	};

	return (
		<Center height="100%" width="100%" backgroundColor="#F8FDFF">
			<Box
				bg="#FAF7F7"
				borderWidth={1}
				borderRadius={20}
				marginTop={60}
				sx={{
					width: 324,
					height: 473,
					display: 'flex',
					alignContent: 'center'
				}}
			>
				<Text
					style={{
						textAlign: 'center',
						color: '#3a55b4',
						fontWeight: 'bold',
						fontSize: 32,
						paddingTop: 30
					}}
				>
					Today's Food List
				</Text>
				<ScrollView>
					<FoodItemList foodList={foodItems} setTotal={setTotal} />
				</ScrollView>
			</Box>
			<VStack>
				<Text style={styles.calories}>Total Calories: {total}</Text>
			</VStack>
			<View style={styles.fixToText}>
				<Button
					onPress={() => {
						setShowModal(true);
						setName('');
						setCalories('');
					}}
					ref={ref}
					backgroundColor={'#99f598'}
					borderColor={'#457844'}
					marginTop={20}
					marginBottom={20}
					borderWidth={1}
					style={({ pressed }) => [
						{
							borderColor: 'black',
							borderWidth: 1,
							marginVertical: 15
							//backgroundColor: pressed ? '#ccff8c' : '#81de76'
						},
						styles.wrapperCustom
					]}
				>
					<Text style={styles.bigBlack}>Add Food Item</Text>
				</Button>
				<Modal
					isOpen={showModal}
					onClose={() => {
						setShowModal(false);
					}}
					paddingBottom={120}
				>
					<View
						style={{
							backgroundColor: 'transparent',
							padding: 35,
							alignItems: 'center',
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 2
							},
							shadowOpacity: 2,
							shadowRadius: 50,
							elevation: 5
						}}
					>
						<ModalContent
							style={{
								height: 360,
								width: 280
							}}
						>
							<ModalHeader>
								<Heading size="lg">Add Food Item</Heading>
							</ModalHeader>
							<ModalBody>
								<Button
									onPress={() => {
										//Open camera to scan barcode
										navigation.navigate('Barcode Scanner', {
											onBarcodeScan: handleBarcodeData
										});
										setShowModal(false);
									}}
									marginBottom={20}
									style={({ pressed }) => [
										{
											height: 60,
											width: 232,
											backgroundColor: pressed ? '#F2E4B2' : 'white',
											alignSelf: 'center'
										}
									]}
								>
									<ButtonText fontSize={24}>Scan Barcode</ButtonText>
								</Button>
								<Text>Item Name:</Text>
								<Input marginBottom={16}>
									<InputField
										placeholder="e.g. Protein Bar"
										value={name}
										onChangeText={(text) => setName(text)}
									/>
								</Input>
								<Text>Calorie Count:</Text>
								<Input>
									<InputField
										placeholder="e.g. 240"
										keyboardType="number-pad"
										value={calories}
										onChangeText={(calories) => {
											setCalories(calories);
										}}
									/>
								</Input>
							</ModalBody>
							<ModalFooter justifyContent="center">
								<ButtonGroup alignItems="center" m={0} p={0}>
									<Button
										width={100}
										bgColor="lightgrey"
										onPress={() => setShowModal(false)}
									>
										<ButtonText>Cancel</ButtonText>
									</Button>
									<Button
										width={90}
										onPress={() => {
											addFoodItem(name, +calories);
											setShowModal(false);
										}}
									>
										<ButtonText>Add</ButtonText>
									</Button>
								</ButtonGroup>
							</ModalFooter>
						</ModalContent>
					</View>
				</Modal>
				<Button
					onPress={() => {
						clearFoodList();
						setTotal((total) => 0);

						//This is where we put our function to delete the list
					}}
					backgroundColor={'#E5F6FD'}
					borderWidth={1}
					style={({ pressed }) => [
						{
							borderColor: 'black',
							borderWidth: 1,
							backgroundColor: '#E5F6FD'
							//backgroundColor: pressed ? 'red' : 'lightgrey'
						},
						styles.wrapperCustom
					]}
				>
					<Text style={styles.bigBlack}>Clear List</Text>
				</Button>
				<AlertDialog
					isOpen={showAlertDialog}
					onClose={() => {
						setShowAlertDialog(false);
					}}
				>
					<AlertDialogBackdrop />
					<AlertDialogContent>
						<AlertDialogHeader>
							<Heading size="lg">Enter Serving Size (g)</Heading>
							<AlertDialogCloseButton>
								<Icon as={CloseIcon} />
							</AlertDialogCloseButton>
						</AlertDialogHeader>
						<AlertDialogBody>
							<Input>
								<InputField
									placeholder="e.g. 30 grams"
									keyboardType="numeric"
									value={servingSize}
									onChangeText={(input) => {
										setServingSize(input);
									}}
								/>
							</Input>
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button
								onPress={() => {
									setShowAlertDialog(false);
								}}
							>
								<ButtonText>Enter</ButtonText>
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</View>
		</Center>
	);
}

const styles = StyleSheet.create({
	foodName: {
		color: 'black',
		fontSize: 20,
		textAlign: 'left',
		paddingLeft: 20,
		fontWeight: '600',
		maxWidth: 220
	},
	calories: {
		color: 'black',
		fontSize: 20,
		textAlign: 'left',
		padding: 10
	},
	black: {
		color: 'black',
		fontSize: 20,
		textAlign: 'left',
		paddingLeft: 20
	},
	bigBlack: {
		color: 'black',
		fontSize: 24,
		alignSelf: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5
	},
	fixToText: {
		alignContent: 'center',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginBottom: 50,
		alignSelf: 'center'
	},
	foodBox: {
		alignSelf: 'center',
		backgroundColor: '#E6F8EB',
		borderRadius: 10,
		borderWidth: 1,
		maxWidth: 270,
		width: 270,
		height: 60,
		display: 'flex',
		justifyContent: 'center',
		marginTop: 20
	},

	wrapperCustom: {
		marginLeft: 10,
		borderRadius: 8,
		padding: 6
	}
	// modalWrapper: {
	//     ...StyleSheet.absoluteFillObject,
	//     zIndex: 10,
	//     backgroundColor: 'red',
	// },
});
