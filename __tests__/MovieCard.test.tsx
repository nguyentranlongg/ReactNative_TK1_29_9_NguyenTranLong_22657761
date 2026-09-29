import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const mockMovie: Movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://picsum.photos/seed/inception/300/450',
  isShowing: true,
};

describe('MovieCard', () => {
  // Câu 7a: render tên phim + rating đúng định dạng
  it('hiển thị đúng tên phim và điểm đánh giá', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} />
    );
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  // Câu 7b: layout row hiển thị thể loại, tile thì không
  it('layout="row" hiển thị thể loại', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={jest.fn()} />
    );
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('layout="tile" không hiển thị thể loại', () => {
    const { queryByText } = render(
      <MovieCard movie={mockMovie} layout="tile" onSelect={jest.fn()} />
    );
    expect(queryByText('Sci-Fi')).toBeNull();
  });

  // Câu 7c: trạng thái ✅ / ❌
  it('isShowing: true hiển thị ✅', () => {
    const { getByText, queryByText } = render(
      <MovieCard movie={{ ...mockMovie, isShowing: true }} onSelect={jest.fn()} />
    );
    expect(getByText(/✅/)).toBeTruthy();
    expect(queryByText(/❌/)).toBeNull();
  });

  it('isShowing: false hiển thị ❌', () => {
    const { getByText, queryByText } = render(
      <MovieCard movie={{ ...mockMovie, isShowing: false }} onSelect={jest.fn()} />
    );
    expect(getByText(/❌/)).toBeTruthy();
    expect(queryByText(/✅/)).toBeNull();
  });

  // Câu 7d: nhấn → onSelect được gọi 1 lần với movie.id
  it('gọi onSelect đúng 1 lần với movie.id khi nhấn', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <MovieCard movie={mockMovie} onSelect={onSelect} />
    );
    fireEvent.press(getByText('Inception'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
