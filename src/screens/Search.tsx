import { useDebounce } from '@react-hook/debounce';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigationSearchBarUpdate } from 'react-native-navigation-hooks';
import { useTheme } from 'react-native-themed-styles';
import { GoogleBook, searchBooks } from '../api/books';
import { navigateTo, NavigationComponent } from '../navigation';
import { styleSheetFactory } from '../themes';
import Routes from './routes';

const themedStyles = styleSheetFactory((theme) => ({
  listContainer: {
    paddingVertical: 16,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    marginTop: 8,
    color: theme.textColor,
  },
}));

const SearchScreen: NavigationComponent = ({ componentId }) => {
  const [styles] = useTheme(themedStyles);
  const [query, setQuery] = useDebounce('skyward', 500);
  const [results, setResults] = useState<GoogleBook[]>([]);

  useNavigationSearchBarUpdate((e) => {
    if (e.isFocused) {
      setQuery(e.text);
    } else {
      setQuery('');
    }
  }, componentId);

  useEffect(() => {
    if (query === '') {
      return;
    }
    searchBooks(query).then((res) => {
      setResults(res);
    });
  }, [query]);

  const navigateToBookDetails = (book: GoogleBook) =>
    navigateTo(componentId, Routes.BookDetails, {
      book,
    });

  return (
    <ScrollView>
      <View style={styles.listContainer}>
        {results.map((book) => {
          return (
            <TouchableOpacity
              onPress={() => navigateToBookDetails(book)}
              key={book.id}
              style={styles.listItem}>
              <>
                <Image
                  resizeMode="contain"
                  style={{ width: 150, height: 200 }}
                  source={{
                    uri: book.volumeInfo.imageLinks.thumbnail.replace(
                      'http://',
                      'https://',
                    ),
                  }}
                />
                <Text style={styles.listTitle}>{book.volumeInfo.title}</Text>
              </>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

SearchScreen.options = () => ({
  topBar: {
    searchBar: true,
    searchBarPlaceholder: 'Search by Title, Author or ISBN...',
    title: {
      text: 'Search',
    },
  },
});

export default SearchScreen;
