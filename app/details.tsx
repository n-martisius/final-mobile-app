import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { commonStyles } from './styles/commonStyles';

export default function DetailsScreen() {
  const router = useRouter();
  const { name, email } = useLocalSearchParams<{
    name?: string;
    email?: string;
  }>();

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Details</Text>

      {name && email ? (
        <>
          <Text style={commonStyles.text}>
            Name: {name}
          </Text>
          <Text style={commonStyles.text}>
            Email: {email}
          </Text>
        </>
      ) : (
        <Text style={commonStyles.text}>
          No details provided
        </Text>
      )}

      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.back()}
      >
        <Text style={commonStyles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
