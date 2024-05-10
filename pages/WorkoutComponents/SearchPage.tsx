import { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Exercise } from '../../types/Exercise';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RootStackParamList from '../../types/RootStackParamList';

type SearchPageProps = {
	navigation: StackNavigationProp<RootStackParamList, 'Search'>;
	route: RouteProp<RootStackParamList, 'Search'>;
	exercises: Exercise[];
	setId: (id: number) => void;
};

const SearchPage: React.FC<SearchPageProps> = ({ navigation, route, exercises, setId }) => {
    const [ searchText, setSearchText ] = useState('');
  
    const filter = route.params && route.params.filter !== '' ? route.params.filter : '';
    const filteredExercises = exercises.filter((exercise) => exercise.workout_name.toLowerCase().includes(searchText.toLowerCase()) && (filter !== '' ? exercise.category === filter : true));
  
    const categories = [...new Set(exercises.map((exercise) => exercise.category))];
  
    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput 
            style={{ borderRadius: 10, width: '100%'}}
            placeholder="Search..." 
            value={searchText} 
            onChangeText={(text) => setSearchText(text)}
            />
        </View>
        <View style={styles.searchContainer}>
          <ScrollView style={{height: '100%'}}>
            {searchText !== '' || filter !== '' ? filteredExercises.map((exercise, i) => (
              <TouchableOpacity 
                key={i}
                style={styles.searchOption} 
                onPress={() => {
                    setId(exercise._id);
                    if (route.params.sourceScreen === 'Add Workout') navigation.navigate('Add Workout', { id: exercise._id});
                    else navigation.navigate('Edit Workout', { id: exercise._id });
                }}>
                <Text>{exercise.workout_name}</Text>
              </TouchableOpacity>)) : categories.map((category, i) => 
              <TouchableOpacity 
                key={i}
                style={styles.searchOption}
                onPress={() => navigation.push('Search', { filter: category, sourceScreen: route.params.sourceScreen })}>
                <Text>{category}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchBarContainer: { 
      backgroundColor: '#DDDDDD', 
      padding: 10, 
      margin: 10, 
      flexDirection: 'row', 
      width: '95%', 
      borderRadius: 10, 
      alignItems: 'center'
    },
    searchBar: {
  
    },
    searchContainer: {
      flex: 1, 
      alignSelf: 'stretch', 
      width: '100%', 
      backgroundColor: '#DDDDFF'
    },
    searchOption: {
      width: '100%',  
      height: 50, 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'white', 
      borderColor: '#CCCCCC', 
      borderWidth: 1
    }
});

export default SearchPage;
