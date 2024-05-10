import React from 'react';
import { useState } from 'react';
import styles from './StyleSheet';
import {
	CheckIcon,
	Checkbox,
	CheckboxIcon,
	CheckboxIndicator,
	CheckboxLabel
} from '@gluestack-ui/themed';

type SettingsCheckboxProps = {
	label: string;
	state: boolean;
	onChange: any;
};

//React.Dispatch<React.SetStateAction<boolean>>
//path: any[],
//    stateModifier: (path: any[], value: string) => number,

const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({
	label,
	state,
	onChange
}) => {
	let modified = false;
	const [innerState, stateModifier] = useState(state);

	const handleClick = () => {
		onChange();
		stateModifier(!innerState);
	};

	return (
		<Checkbox
			value={label}
			size="lg"
			style={styles.CheckBoxes}
			aria-label={label}
			isChecked={innerState}
			onChange={handleClick}
		>
			<CheckboxIndicator mr="$2">
				<CheckboxIcon as={CheckIcon} />
			</CheckboxIndicator>
			<CheckboxLabel>{label}</CheckboxLabel>
		</Checkbox>
	);
};

export default SettingsCheckbox;
