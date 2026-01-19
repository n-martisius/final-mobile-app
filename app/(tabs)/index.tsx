import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { loadProfile, saveProfile } from '../storage/profileStorage';
import { commonStyles } from '../styles/commonStyles';

export default function HomeScreen() {
  const router = useRouter();

  // Input state
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  // Saved data state
  const [savedName, setSavedName] = useState<string | null>(null);
  const [savedCity, setSavedCity] = useState<string | null>(null);

  // Load saved profile when Home screen opens
  useEffect(() => {
    loadSavedProfile();
  }, []);

  const loadSavedProfile = async () => {
    const profile = await loadProfile();
    setSavedName(profile.name);
    setSavedCity(profile.city);
  };

  const handleSaveProfile = async () => {
    if (!name.trim() || !city.trim()) {
      return;
    }

    await saveProfile(name.trim(), city.trim());
    setName('');
    setCity('');
    loadSavedProfile();
  };

  return (
    <View style={commonStyles.container}>
      {/* Display image */}
        <Image
          source={{
            uri: 'https://www.freeiconspng.com/uploads/flat-blue-home-icon-4.png',
          }}
          style={commonStyles.homeIcon}
        />
      <Text style={commonStyles.title}>Home</Text>

      {/* Inputs */}
      <TextInput
        style={commonStyles.input}
        placeholder="Enter name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={commonStyles.input}
        placeholder="Enter city"
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
      />

      {/* Save button */}
      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleSaveProfile}
      >
        <Text style={commonStyles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push('/profile')}
      >
        <Text style={commonStyles.buttonText}>Open Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push('/api-list')}
      >
        <Text style={commonStyles.buttonText}>Open API List</Text>
      </TouchableOpacity>

      {/* Saved data display */}
      <View style={{ marginTop: 20 }}>
        {savedName && savedCity ? (
          <>
            <Text style={commonStyles.text}>
              Saved name: {savedName}
            </Text>
            <Text style={commonStyles.text}>
              Saved city: {savedCity}
            </Text>
          </>
        ) : (
          <Text style={commonStyles.text}>
            No profile saved
          </Text>
        )}
      </View>
    </View>
  );
}
