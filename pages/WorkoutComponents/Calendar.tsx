import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';

const getDates: () => Date[][] = () => {
	const today: Date = new Date();
	const todayUTC: number = Date.UTC(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);

	const UTC_DAY = 86400000;

	const startDate = new Date(
		todayUTC - 14 * UTC_DAY - UTC_DAY * today.getDay()
	);
	const endDate = new Date(
		todayUTC + 14 * UTC_DAY + UTC_DAY * (6 - today.getDay())
	);

	let dates: Date[][] = [];
	let currWeek: Date[] = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		currWeek.push(new Date(currentDate));
		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
		if (currWeek.length == 7) {
			dates.push(currWeek);
			currWeek = [];
		}
	}
	return dates;
};

const today: Date = new Date();
const dates: Date[][] = getDates();
const dayStrings = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type CalendarBarProps = {
	selectedDate: Date;
	setSelectedDate: (selectedDate: Date) => void;
};

const CalendarBar: React.FC<CalendarBarProps> = ({
	selectedDate,
	setSelectedDate
}) => {
	const [page, setPage] = useState<number>(2);

	return (
		<PagerView
			style={styles.container}
			initialPage={page}
			onPageSelected={(position) => setPage(position.nativeEvent.position)}
		>
			{dates.map((week: Date[], i) => {
				return (
					<View key={i}>
						<View style={styles.row}>
							{week.map((day: Date, j: number) => {
								const selected: boolean =
									selectedDate.getUTCDate() == day.getUTCDate() &&
									selectedDate.getUTCMonth() == day.getUTCMonth();
								const isToday: boolean = today.getDate() == day.getUTCDate();
								return (
									<TouchableOpacity
										key={j}
										style={styles.dayButton}
										onPress={() => setSelectedDate(day)}
									>
										<Text style={{ paddingBottom: 5, fontWeight: '300' }}>
											{dayStrings[day.getUTCDay()]}
										</Text>
										<View
											style={[
												selected ? styles.selected : styles.default,
												isToday
													? { borderColor: '#FF0000', borderWidth: 1 }
													: {}
											]}
										>
											<Text style={{ fontSize: 22, fontWeight: '600' }}>
												{day.getUTCDate()}
											</Text>
										</View>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				);
			})}
		</PagerView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	dayButton: {
		borderRadius: 90,
		padding: 10,
		alignItems: 'center'
	},
	selected: {
		borderRadius: 360,
		aspectRatio: 1,
		alignItems: 'center',
		backgroundColor: '#A8CCEC',
		padding: 10
	},
	default: {
		borderRadius: 360,
		aspectRatio: 1,
		alignItems: 'center',
		padding: 10
	},
	today: {
		color: 'red'
	}
});

export default CalendarBar;
