import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {GoogleBook} from '../api/books';

interface BookDetailsProps {
  componentId: string;
  book: GoogleBook;
}

const BookDetails: React.FunctionComponent<BookDetailsProps> = ({book}) => {
  return (
    <ScrollView>
      <View style={styles.cover}>
        <Image
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          resizeMode="contain"
          style={styles.coverImage}
        />
        <View style={styles.coverTitles}>
          <Text style={styles.coverTitle}>{book.volumeInfo.title}</Text>
          <Text style={styles.coverSubtitle}>
            By {book.volumeInfo.authors.join(', ')}
          </Text>
          <Text
            style={styles.coverDescription}
            numberOfLines={10}
            textBreakStrategy="simple"
            ellipsizeMode="tail">
            {book.volumeInfo.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
    height: 200,
  },
  coverTitles: {
    paddingHorizontal: 8,
    flex: 1,
  },
  coverImage: {
    width: 150,
    height: 200,
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  coverSubtitle: {
    color: 'white',
  },
  coverDescription: {
    marginTop: 8,
    fontSize: 12,
    color: 'rgba(255, 255, 255, .8)',
    overflow: 'hidden',
  },
});

export default BookDetails;
