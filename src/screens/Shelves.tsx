import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigationButtonPress } from 'react-native-navigation-hooks/dist';
import { useTheme } from 'react-native-themed-styles';
import { useMutation, useQuery } from 'urql';
import { GoogleBook, googleBookToBookSource } from '../api/books';
import { CreateBookSource } from '../api/mutations';
import { Shelf } from '../api/types';
import { dismissModal, NavigationComponent } from '../navigation';
import { styleSheetFactory } from '../themes';

interface Props {
  book: GoogleBook;
}

const ShelvesScreen: NavigationComponent<Props> = observer(
  ({ componentId, book }) => {
    const [styles] = useTheme(themedStyles);
    const [bookSource, createBookSource] = useMutation(CreateBookSource);
    const [res, executeQuery] = useQuery({
      query: `
      query { me: findUserByID(id: "265679114390733313") {
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

    // useEffect(() => {
    //   const { id, ...data } = googleBookToBookSource(book);
    //   createBookSource({
    //     data: {
    //       googleBookId: id,
    //       ...data,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, [book]);

    const shelves: Shelf[] = res?.data?.me?.shelves?.data ?? [];

    useNavigationButtonPress((e) => {
      switch (e.buttonId) {
        case 'cancel':
          dismissModal(componentId);
          break;
        default:
          break;
      }
    }, componentId);

    const handleShelfPress = (shelf: Shelf) => {
      console.log('BINGO!');
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {shelves.map((shelf) => (
          <TouchableOpacity
            key={shelf._id}
            style={styles.shelf}
            onPress={() => handleShelfPress(shelf)}>
            <Text style={{ color: 'white' }}>{shelf.title}</Text>
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

const themedStyles = styleSheetFactory((theme) => ({
  shelf: {
    padding: 10,
    borderBottomColor: theme.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
}));

export default ShelvesScreen;
