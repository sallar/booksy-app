import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {useNavigationSearchBarUpdate} from 'react-native-navigation-hooks';
import {searchBooks, GoogleBook} from '../api/books';
import {Navigation} from 'react-native-navigation';

const SearchScreen: React.FunctionComponent<{componentId: string}> = ({
  componentId,
}) => {
  const [query, setQuery] = useState<string>('skyward');
  const [results, setResults] = useState<GoogleBook[]>([]);

  useNavigationSearchBarUpdate(e => {
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
    searchBooks(query).then(res => {
      setResults(res);
    });
  }, [query]);

  const navigateToBookDetails = (book: GoogleBook) =>
    Navigation.push(componentId, {
      component: {
        name: 'app.Booksy.BookDetails',
        passProps: {
          book,
        },
        options: {
          topBar: {
            title: {
              text: book.volumeInfo.title,
            },
          },
        },
      },
    });

  return (
    <ScrollView>
      <View style={styles.listContainer}>
        {results.map(book => {
          return (
            <TouchableHighlight
              onPress={() => navigateToBookDetails(book)}
              key={book.id}
              style={styles.listItem}>
              <>
                <Image
                  resizeMode="contain"
                  style={{width: 150, height: 200}}
                  source={{
                    uri: book.volumeInfo.imageLinks.thumbnail.replace(
                      'http://',
                      'https://',
                    ),
                  }}
                />
                <Text style={styles.listTitle}>{book.volumeInfo.title}</Text>
              </>
            </TouchableHighlight>
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
    color: 'white',
  },
});

export default SearchScreen;
