import { TimeGraphData } from 'types/TimeGraphData'


/**
 * Finds the start date for the graph based on the date range, relative to today.
 *
 * @param {string} date the date range, one of {"7d", "30d", "90d", "1y", "all"} 
 * @return {Date} the start date for the graph 
 */
const findStartDate = (date: string): Date => {
	const today = new Date()
	let startDate = new Date()
	switch (date) {
		case '7d':
			startDate.setDate(today.getDate() - 7)
			break
		case '30d':
			startDate.setDate(today.getDate() - 30)
			break
		case '90d':
			startDate.setDate(today.getDate() - 90)
			break
		case '1y':
			startDate.setFullYear(today.getFullYear() - 1)
			break
		default:
			startDate = new Date(0)
	}
	return startDate
}

/**
 * Retrieves the data point before the graph's start date, if it exists.
 *
 * @param {TimeGraphData[]} data the data to search through 
 * @param {Date} start the start date of the graph 
 * @return {TimeGraphData | null} the data point before the start date, or null if 
 * there is no such point
 */
const getPointJustBeforeStartDate = (data: TimeGraphData[], start: Date): TimeGraphData | null => {
	const datesBeforeStart = data.filter((datum) => datum.date < start)
	const datesBeforeStartSorted = datesBeforeStart.sort((a, b) => b.date.getTime() - a.date.getTime())
	if (datesBeforeStartSorted.length === 0) {
		return null
	}
	return datesBeforeStartSorted[0]
}

/*
 * Generates a fake data point for the start date, placing it so that it is 
 * on the line between the last data point before the start date and the first 
 * data point after the start date. Returns a list of either length 0 or 1; 
 * use the spread operator to merge it with the data after the start date. 
 *
 * @param {TimeGraphData[]} data the data to generate the fake point from 
 * @param {Date} start the start date of the graph 
 * @return {TimeGraphData[]} a singleton list containing the fake point, or an empty 
 * list if the start date is before the first data point
 */
const generateFakeStartPoint = (data: TimeGraphData[], start: Date): TimeGraphData[] => {
	const pointBeforeStart = getPointJustBeforeStartDate(data, start)
	if (pointBeforeStart === null) {
		return []
	}
	const pointAfterStart = data.find((datum) => datum.date >= start)
	const valueBefore = pointBeforeStart.value
	if (!pointAfterStart) {
		return [{ value: 0, date: start }]
	}
	const valueAfter = pointAfterStart.value
	const timeBefore = pointBeforeStart.date.getTime()
	const timeAfter = pointAfterStart.date.getTime()
	const timeStart = start.getTime()
	const valueStart = (valueBefore * (timeAfter - timeStart) + valueAfter * (timeStart - timeBefore)) / (timeAfter - timeBefore)
	return [{ value: valueStart, date: start }]
}

/*
 * Adds a "continuity point" to the data, which is the point at the intersection
 * of the graph's left boundary and the line between the last data point before 
 * the start date and the first data point after the start date. 
 *
 * @param {TimeGraphData[]} data the data to add the continuity point to 
 * @param {Date} start the start date of the graph 
 * @return {TimeGraphData[]} the data with the continuity point added
 */
const includeContinuityPoint = (data: TimeGraphData[], start: Date): TimeGraphData[] => {
	const datesAfterStart = dummyData.filter((datum) => datum.date >= start)
	const datesWithStart = [...generateFakeStartPoint(dummyData, start), ...datesAfterStart]
	return datesWithStart
}

// TODO: remove when real data is available via DynamoDB API
const dummyData = [
	{ value: 50, date: new Date('2024-05-01') },
	{ value: 54, date: new Date('2024-05-02') },
	{ value: 52, date: new Date('2024-05-03') },
	{ value: 34, date: new Date('2024-05-05') },
	{ value: 61, date: new Date('2024-05-12') },
	{ value: 62, date: new Date('2024-05-13') },
]

/*
 * Returns a list of TimeGraphData objects for the given exercise and metric. 
 * The date range is one of {"7d", "30d", "90d", "1y", "all"}. Generates a 
 * "continuity point" for the start date, which is the point at the intersection 
 * of the graph's left boundary and the line between the last data point before 
 * the start date and the first data point after the start date. 
 *
 * @param {number} exerciseId the ID of the exercise
 * @param {number} metricId the ID of the metric
 * @param {number} dateRange the number of days to include in the graph
 * @return {TimeGraphData[]} the data for the exercise and metric
 */
const getDataForUserForExercise = (
	exerciseId: number,
	metricId: number,
	dateRange: string = '30d'
): TimeGraphData[] => {
	console.log(`Getting data for exercise ${exerciseId} and metric ${metricId}`)
	console.log(`Date range: ${dateRange}`)
	if (dateRange === 'all') {
		return dummyData
	}

	const startDate = findStartDate(dateRange)
	const continuousData = includeContinuityPoint(dummyData, startDate)
	return continuousData
}

export default getDataForUserForExercise
