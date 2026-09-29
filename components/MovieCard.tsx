import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Câu 3a: Kiểu dữ liệu
export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({ movie, layout = 'row', onSelect }: MovieCardProps) {
  const isTile = layout === 'tile';
  // Câu 3b: "⭐ 8.5" (1 chữ số thập phân)
  const ratingText = `⭐ ${Number(movie.rating).toFixed(1)}`;
  const statusText = movie.isShowing ? '✅ Đang chiếu' : '❌ Ngừng chiếu';

  return (
    // Câu 3c: bọc bằng TouchableOpacity, nhấn gọi onSelect(movie.id)
    <TouchableOpacity
      testID="movie-card"
      activeOpacity={0.7}
      onPress={() => onSelect(movie.id)}
      // Câu 4c: kết hợp style theo mảng
      style={[styles.card, isTile && styles.cardTile]}
    >
      <View style={isTile && styles.posterWrapTile}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, isTile && styles.posterTile]}
          resizeMode="cover"
        />
        {/* Câu 4b: nhãn ⭐ đè lên góc poster */}
        {isTile && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{ratingText}</Text>
          </View>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text
          style={[styles.title, isTile && styles.titleTile]}
          numberOfLines={isTile ? 1 : 2}
        >
          {movie.title}
        </Text>

        {/* Câu 4a: row hiển thị thể loại + năm; tile thì ẩn */}
        {!isTile && (
          <>
            <Text style={styles.meta}>{movie.genre}</Text>
            <Text style={styles.meta}>{movie.year}</Text>
            <Text style={styles.rating}>{ratingText}</Text>
          </>
        )}

        <Text style={[styles.status, isTile && styles.statusTile]}>{statusText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Câu 4a: row – bố cục ngang
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  // Câu 4b: tile – bố cục dọc, rộng đều (48%) để item lẻ cuối không bị kéo giãn
  cardTile: {
    flexDirection: 'column',
    width: '48%',
    padding: 0,
    overflow: 'hidden',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  posterWrapTile: {
    position: 'relative',
  },
  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  infoTile: {
    marginLeft: 0,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleTile: {
    fontSize: 14,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
  },
  statusTile: {
    fontSize: 12,
  },
});

// Câu 3d: export qua React.memo
export default React.memo(MovieCard);
