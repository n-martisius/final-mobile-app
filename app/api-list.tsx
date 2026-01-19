import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { commonStyles } from './styles/commonStyles';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function ApiListScreen() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setError(null);

      if (!refreshing) {
        setLoading(true);
      }

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 🔍 Filter users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Users</Text>

      {/* 🔍 Search input */}
      <TextInput
        style={commonStyles.input}
        placeholder="Search by name"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#ffffff" />
      )}

      {/* Error message */}
      {error && (
        <Text style={{ color: '#ff6b6b', marginBottom: 12 }}>
          {error}
        </Text>
      )}

      {/* User list */}
      {!loading && !error && (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchUsers();
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={commonStyles.card}
              onPress={() =>
                router.push({
                  pathname: '/details',
                  params: {
                    name: item.name,
                    email: item.email,
                  },
                })
              }
            >
              <Text style={commonStyles.text}>
                Name: {item.name}
              </Text>
              <Text style={commonStyles.text}>
                Email: {item.email}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Back button */}
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={commonStyles.buttonText}>Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}
