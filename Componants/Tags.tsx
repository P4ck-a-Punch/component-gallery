import React, { useState } from 'react'
import {
	TouchableHighlight,
	View,
	Text,
	Modal,
	StyleSheet,
	ScrollView,
} from 'react-native'

// The maximum number of tags to display before the "show more" tag is shown.
const MAX_TAGS = 5

const tagStyle = StyleSheet.create({
	tag: {
		backgroundColor: '#fff',
		borderRadius: 16,
		borderColor: '#000',
		borderWidth: 1,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 4,
		paddingBottom: 4,
	},
	tag_text: {
		fontFamily: 'IBMPlexSansCondensed_400Regular',
		fontSize: 12,
	},
	tag_container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		rowGap: 5,
		columnGap: 5,
		marginBottom: 12,
	},
	tag_highlight: {
		borderRadius: 16,
	},
})

const tagModalStyle = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		marginBottom: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 30,
		alignItems: 'center',
		borderColor: '#000',
		borderWidth: 1,
		shadowColor: '#000',
		height: '50%',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	closeButton: {
		borderRadius: 16,
		padding: 10,
		borderColor: '#000',
		borderWidth: 1,
	},
})

/**
 * A single tag component that can be used to display a tag.
 */
const Tag = (props: { key: string; text: string }) => {
	return (
		<TouchableHighlight
			activeOpacity={0.6}
			underlayColor={'pink'}
			onPress={() => true}
			style={tagStyle.tag_highlight}
		>
			<View style={tagStyle.tag}>
				<Text style={tagStyle.tag_text}>{props.text}</Text>
			</View>
		</TouchableHighlight>
	)
}

type TagsModalProps = {
	tags: string[]
	modalVisible: boolean
	setModalVisible: (isVisible: boolean) => void
}

/**
 * A modal that displays all tags when a "show more" tag is clicked.
 */
const TagsModal = (props: TagsModalProps) => {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={props.modalVisible}
			onRequestClose={() => {
				props.setModalVisible(!props.modalVisible)
			}}
		>
			<View style={tagModalStyle.centeredView}>
				<View style={tagModalStyle.modalView}>
					<ScrollView>
						{props.tags.map((tag, index) => (
							<Text key={index} style={tagModalStyle.modalText}>
								{tag}
							</Text>
						))}
					</ScrollView>
					<TouchableHighlight
						activeOpacity={0.6}
						underlayColor={'pink'}
						onPress={() => props.setModalVisible(false)}
						style={tagModalStyle.closeButton}
					>
						<Text>Close</Text>
					</TouchableHighlight>
				</View>
			</View>
		</Modal>
	)
}

/**
 * A "show more" tag that opens a modal with all tags when clicked.
 * @param {object} props
 * @param {string} props.key The key of the tag.
 * @param {string[]} props.tags The list of tags to display.
 */
const ShowMoreTag = (props: { key: string; tags: string[] }) => {
	const [modalVisible, setModalVisible] = useState(false)
	// The first child is the tag itself. The second is the modal, conditionally
	// rendered and with state managed by tag clicks.

	// The text this tag displays, providing information about
	// the number of tags that are hidden.
	const textDescribingHidden = `+${props.tags.length - MAX_TAGS}`

	return (
		<>
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor={'pink'}
				onPress={() => setModalVisible(true)}
				style={tagStyle.tag_highlight}
			>
				<View style={tagStyle.tag}>
					<Text style={tagStyle.tag_text}>{textDescribingHidden}</Text>
				</View>
			</TouchableHighlight>

			<TagsModal
				tags={props.tags}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</>
	)
}

/**
 * Organizes a list of tags into a horizontal flexbox container that
 * fills to the width of its parent.
 *
 * @param {object} props tags to display.
 * @param {string[]} props.tags The list of strings to display as tags.
 */
const Tags = (props: { tags: string[] }) => {
	const num_tags = props.tags.length
	let tagsToDisplay: React.ReactNode[] = []

	if (num_tags > MAX_TAGS) {
		// Display the first MAX_TAGS tags, then the "show more" tag.
		tagsToDisplay = props.tags
			.slice(0, MAX_TAGS)
			.map(tag => <Tag key={tag} text={tag} />)
		tagsToDisplay.push(<ShowMoreTag key='show_more' tags={props.tags} />)
	} else {
		// Display all tags.
		tagsToDisplay = props.tags.map(tag => <Tag key={tag} text={tag} />)
	}

	return <View style={tagStyle.tag_container}>{tagsToDisplay}</View>
}

export default Tags
