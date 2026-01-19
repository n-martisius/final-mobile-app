import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { clearProfile, loadProfile } from './storage/profileStorage';
import { commonStyles } from './styles/commonStyles';

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  // Load profile when screen opens
  useEffect(() => {
    loadSavedProfile();
  }, []);

  const loadSavedProfile = async () => {
    const profile = await loadProfile();
    setName(profile.name);
    setCity(profile.city);
  };

  const handleClearProfile = async () => {
    await clearProfile();
    setName(null);
    setCity(null);
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Profile</Text>

      {name && city ? (
        <>
          <Text style={commonStyles.text}>
            Name: {name}
          </Text>
          <Text style={commonStyles.text}>
            City: {city}
          </Text>
        </>
      ) : (
        <Text style={commonStyles.text}>
          No profile saved
        </Text>
      )}

      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleClearProfile}
      >
        <Text style={commonStyles.buttonText}>Clear Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={commonStyles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}
