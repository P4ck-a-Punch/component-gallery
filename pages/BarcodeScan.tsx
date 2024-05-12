import { useEffect, useState } from 'react';
import { Camera, CameraView } from 'expo-camera/next';
import {
	Box,
	View,
	Button,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb
} from '@gluestack-ui/themed';
import { Keyboard, StyleSheet } from 'react-native';
import { Zap, ZapOff } from 'lucide-react-native';

interface BarcodeProps {
	type: string;
	data: string;
}

export default function BarcodeScreen({ navigation, route }: any) {
	const [hasPermission, setHasPermission] = useState<null | boolean>(null);
	const [navigationOccurred, setNavigationOccurred] = useState(false);
	const [flashOn, setFlashOn] = useState(false);

	const [sliderValue, setSliderValue] = useState(0.01);

	const handleChange = (value: number) => {
		setSliderValue(value);
	};

	const { onBarcodeScan } = route.params;

	useEffect(() => {
		const getCameraPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getCameraPermissions();
	}, []);

	useEffect(() => {
		setNavigationOccurred(false);
	}, [onBarcodeScan]);

	const handleBarCodeScanned = ({ type, data }: BarcodeProps) => {
		if (!navigationOccurred) {
			setFlashOn(false);
			onBarcodeScan(data);
			navigation.navigate('Food List');
			setNavigationOccurred(true);
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Box display="flex" alignItems="center" p={30} marginTop={100}>
				<Text fontSize={20} p={10} fontWeight={'$semibold'}>
					Scan Barcode
				</Text>
			</Box>
			<Box w={400} h={400}>
				<CameraView
					onBarcodeScanned={handleBarCodeScanned}
					barcodeScannerSettings={{
						barcodeTypes: ['qr', 'upc_e', 'upc_a', 'ean13']
					}}
					style={StyleSheet.absoluteFillObject}
					zoom={sliderValue}
					enableTorch={flashOn}
				/>
			</Box>
			<Text alignSelf="center" marginTop={20}>
				Adjust Zoom
			</Text>
			<Slider
				defaultValue={0.01}
				size="md"
				w={200}
				marginTop={20}
				alignSelf="center"
				orientation="horizontal"
				value={sliderValue}
				step={0.001}
				maxValue={0.02}
				onChange={(v) => {
					handleChange(v);
				}}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Button
				alignSelf="center"
				marginTop={30}
				w={10}
				borderWidth={1}
				borderRadius={16}
				bgColor="transparent"
				onPress={() => setFlashOn(!flashOn)}
			>
				{flashOn ? <ZapOff /> : <Zap />}
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%'
	}
});
