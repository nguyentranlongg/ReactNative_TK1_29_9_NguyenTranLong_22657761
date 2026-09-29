import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';

// TODO: thay bằng URL API của bạn trên mockapi.io
const API_URL = 'https://68d74a50c2a1754b426cff70.mockapi.io/movies';

function MovieScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false); // Câu 5a

  // Câu 2: GET danh sách phim
  const fetchMovies = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      Alert.alert('Lỗi', 'Không tải được danh sách phim');
    }
  };

  useEffect(() => {
    fetchMovies().finally(() => setLoading(false));
  }, []);

  // Câu 6: kéo xuống để làm mới (isTile giữ nguyên vì là state riêng)
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

  // Câu 3c: nhấn item → Alert tên phim
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) Alert.alert('Phim đã chọn', movie.title);
    },
    [movies]
  );

  const numColumns = isTile ? 2 : 1; // Câu 5b

  return (
    // Câu 1b: SafeAreaView + View
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Câu 1c */}
        <Text style={styles.headerTitle}>Movie App</Text>
        {/* Câu 5a: Switch "Dạng lưới" */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        // Câu 2c
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e50914" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          key={String(numColumns)} // Câu 5c
          data={movies}
          keyExtractor={(item) => item.id} // Câu 2
          numColumns={numColumns}
          // Câu 5d: khoảng cách giữa 2 cột
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            // Câu 3 + 5b: dùng MovieCard, truyền layout tương ứng
            <MovieCard
              movie={item}
              layout={isTile ? 'tile' : 'row'}
              onSelect={handleSelect}
            />
          )}
          // Câu 6a
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text style={styles.empty}>Không có phim nào</Text>}
        />
      )}
    </SafeAreaView>
  );
}

// Câu 1a: bọc toàn bộ app trong SafeAreaProvider
export default function App() {
  return (
    <SafeAreaProvider>
      <MovieScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e50914',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#fff',
    marginRight: 6,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
});
