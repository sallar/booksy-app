import { GoogleBook, searchBooks } from '@api/books';
import { Navigation } from '@navigation/utils';
import { useDebounce } from '@react-hook/debounce';
import Colors from '@utils/colors';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationSearchBarUpdate } from 'react-native-navigation-hooks';
import Routes from '../navigation/routes';

const SearchScreen: NavigationFunctionComponent = ({ componentId }) => {
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
    Navigation.push(componentId, {
      name: Routes.BookDetails,
      passProps: { book },
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

const styles = StyleSheet.create({
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
    color: Colors.label,
  },
});

SearchScreen.options = () => ({
  topBar: {
    searchBar: {
      visible: true,
      hideTopBarOnFocus: true,
      placeholder: 'Search by Title, Author or ISBN...',
    },
    title: {
      text: 'Search',
    },
  },
});

export default SearchScreen;
