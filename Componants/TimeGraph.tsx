import React from 'react'
import { XAxis, AreaChart, Grid, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native'

type TimeGraphData = {
	value: number
	date: Date
}

type TimeGraphProps = {
	data: TimeGraphData[]
}

const averageValue = (data: TimeGraphData[]) => {
	let sum = 0
	for (const datum of data) {
		sum += datum.value
	}
	return sum / data.length
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

	const todayMs = new Date().getTime()
	const average = averageValue(props.data)

	const HorizontalLine = ({ y }) => (
		<Line
			key={'zero-axis'}
			x1={'0%'}
			x2={'100%'}
			y1={average}
			y2={average}
			stroke={'grey'}
			strokeDasharray={[4, 8]}
			strokeWidth={2}
		/>
	)

	const chart = (
		<AreaChart
			style={{ height: 200 }}
			data={props.data}
			contentInset={{ top: 20, bottom: 20 }}
			yAccessor={({ item }) => item.value}
			xAccessor={({ item }) => todayMs - item.date.getTime()}
			curve={shape.curveLinear}
			svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
		>
			<Grid />
			<Line />
			<XAxis
				data={props.data}
				contentInset={{ left: 10, right: 10 }}
				xAccessor={({ item }) => todayMs - item.date.getTime()}
				formatLabel={(_, index) => index}
			/>
		</AreaChart>
	)

	return (
		<View style={{ height: 200, width: '100%', marginTop: 5, marginBottom: 0 }}>
			{chart}
		</View>
	)
}

export default TimeGraph
