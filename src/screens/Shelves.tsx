import {
  getInternalBookId,
  GoogleBook,
  googleBookToBookSource,
} from '@api/books';
import { AddBookToShelf } from '@api/mutations';
import { Shelf } from '@api/types';
import { Navigation } from '@navigation/utils';
import Colors from '@utils/colors';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { useMutation, useQuery } from 'urql';

interface Props {
  book: GoogleBook;
}

const ShelvesScreen: NavigationFunctionComponent<Props> = observer(
  ({ componentId, book }) => {
    const [internalBookId, setInternalBookId] = useState<string | null>(null);
    const [addResults, addBookToShelf] = useMutation(AddBookToShelf);
    const [res] = useQuery({
      query: `
      query { me {
        shelves {
          data {
            _id,
            title,
            key
          }
        }
      } }
    `,
    });

    useEffect(() => {
      getInternalBookId(googleBookToBookSource(book)).then((res) => {
        setInternalBookId(res);
      });
    }, [book.id]);

    const shelves: Shelf[] = res?.data?.me?.shelves?.data ?? [];

    useNavigationButtonPress((e) => {
      switch (e.buttonId) {
        case 'cancel':
          Navigation.dismissModal(componentId);
          break;
        default:
          break;
      }
    }, componentId);

    const handleShelfPress = useCallback(
      (shelf: Shelf) => {
        if (!internalBookId) {
          return;
        }
        addBookToShelf({ shelfId: shelf._id, internalBookId }).then(() => {
          Navigation.dismissModal(componentId);
        });
      },
      [internalBookId, componentId],
    );

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {shelves.map((shelf) => (
          <TouchableOpacity
            key={shelf._id}
            style={styles.shelf}
            disabled={!internalBookId}
            onPress={() => handleShelfPress(shelf)}>
            <Text style={styles.text}>{shelf.title}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  },
);

ShelvesScreen.options = () => ({
  topBar: {
    largeTitle: {
      visible: false,
    },
    title: {
      text: 'Add to Shelves...',
    },
    rightButtons: [
      {
        id: 'save',
        text: 'Save',
      },
    ],
    leftButtons: [
      {
        id: 'cancel',
        text: 'Cancel',
      },
    ],
  },
});

const styles = StyleSheet.create({
  text: {
    color: Colors.label,
  },
  shelf: {
    padding: 10,
    borderBottomColor: Colors.separator,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ShelvesScreen;
