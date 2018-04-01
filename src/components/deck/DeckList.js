// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { receiveDecks } from '../../actions';
import { getDecks } from '../../utils/api';
import type { DecksType, NavigationType } from '../../utils/types';
import Deck from './Deck';
import { commonColor } from '../../utils/variables';

type PropsType = {
  decks: DecksType,
  navigation: NavigationType,
  receiveDecks: (decks: DecksType) => void,
}

type StateType = {
  loading: boolean,
}

/**
  * DeckList renders list of decks, it's consider as a home page.
  * It receives decks props and dispatch receiveDecks action.
  */
class DeckList extends PureComponent<PropsType, StateType> {
  state = {
    loading: false,
  }
  componentDidMount() {
    this.setState({ loading: true });
    getDecks()
      .then(decks => this.props.receiveDecks(decks))
      .then(() => this.setState(() =>({
        loading: false,
      })))
  }
  onPressDeck(title) {
    this.props.navigation.navigate('DeckDetail', {
      deckId: title
    })
  }
  render() {
    const { navigation, decks } = this.props;
    const { loading } = this.state;
    const length = Object.keys(decks).length;
    if (loading) {
      return <Text>Loading...</Text>
    }

    return (
      <View style={styles.container}>
          {length > 0
            ? (
                <ScrollView>
                  {Object.keys(decks).map((deck, index) => {
                  const { title, questions } = decks[deck];
                  const questionLength = questions ? questions.length : null;
                  return (
                    <View key={index} style={styles.deck}>
                      <Deck
                        title={title}
                        onPress={() => this.onPressDeck(title)}
                        questionLength={questionLength}
                      />
                    </View>
                  )})}
                </ScrollView>
              )
            : (
                <View style={styles.noData}>
                  <Text style={styles.noDataText}>There are no decks here.</Text>
                </View>
              )
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: commonColor.backgroundColor
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDataText: {
    color: commonColor.brown,
  },
  deck: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: commonColor.brownVeryLight,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  }
});

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { receiveDecks })(DeckList);
