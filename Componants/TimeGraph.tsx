import React from 'react'
import { XAxis, AreaChart, Grid, Path, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native'

type TimeGraphData = {
	value: number
	date: Date
}

type TimeGraphProps = {
	data: TimeGraphData[]
	dateRange: string
}

const getStartDate = (dateRange: string) => {
	const today = new Date()
	let startDate = new Date()
	switch (dateRange) {
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

const getDaysInPast = (dateRange: string) => {
	switch (dateRange) {
		case '7d':
			return 7
		case '30d':
			return 30
		case '90d':
			return 90
		case '1y':
			return 365
		default:
			return 0
	}
}

const calculateElapsedDays = (date: Date) => {
	const today = new Date()
	return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
}

// Determines whether the array of dates contains today's date, without 
// regard to the time of day.
const dataContainsToday = (data: TimeGraphData[]) => {
	const today = new Date()
	return data.some((datum) => {
		const date = new Date(datum.date)
		return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
	})
}

// Determines whether the array of dates contains the start date, without
// regard to the time of day.
const dataContainsStart = (data: TimeGraphData[], startDate: Date) => {
	return data.some((datum) => {
		const date = new Date(datum.date)
		return date.getDate() === startDate.getDate() && date.getMonth() === startDate.getMonth() && date.getFullYear() === startDate.getFullYear()
	})
}

/*
 * Plots a simple positive area graph with the given data
 * across the past n days, months, or years.
 */
const TimeGraph = (props: TimeGraphProps) => {
	// A JSON array of value-date pairs.

	// @ts-expect-error - TODO: What type is line? What is the d prop?
	const Line = ({ line }) => (
		<Path key={'line'} d={line} stroke={'rgb(134, 65, 244)'} fill={'none'} />
	)

	// The start date of the graph, if there is one.
	const startDate = props.dateRange != 'all' ? getStartDate(props.dateRange) : props.data[0].date

	// Add the start date if it is not already in the data
	let dataToPlot: TimeGraphData[] = dataContainsStart(props.data, startDate) ? props.data : [{ value: 0, date: startDate }, ...props.data]

	// Add today's date if it is not already in the data 
	dataToPlot = dataContainsToday(props.data) ? dataToPlot : [...dataToPlot, { value: 0, date: new Date() }]

	console.log(dataToPlot)

	const daysInPast = getDaysInPast(props.dateRange)

	const chart = (
		<View style={{ width: "auto", height: "auto", flexDirection: "row", justifyContent: 'space-between' }}>
			<YAxis
				data={dataToPlot}
				contentInset={{ top: 10, bottom: 10 }}
				yAccessor={({ item }) => item.value}
				svg={{
					fill: 'grey',
					fontSize: 10,
				}}
				numberOfTicks={10}
				formatLabel={(value) => `${value}`}
				style={{ width: "10%" }}
			/>
			<AreaChart
				style={{ height: 200, width: '90%', paddingRight: 10 }}
				data={dataToPlot}
				contentInset={{ top: 10, bottom: 10 }}
				yAccessor={({ item }) => item.value}
				xAccessor={({ item }) => daysInPast - calculateElapsedDays(item.date)}
				curve={shape.curveLinear}
				svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
			>
				<Line />
				<Grid />
				<XAxis
					data={dataToPlot}
					contentInset={{ left: 10, right: 10 }}
					xAccessor={({ item }) => daysInPast - calculateElapsedDays(item.date)}
					formatLabel={() => " "}
				/>
			</AreaChart>
		</View>
	)

	return (
		<View style={{ height: "auto", width: '100%', marginTop: 5, marginBottom: 10 }}>
			{chart}
		</View>
	)
}

export default TimeGraph
