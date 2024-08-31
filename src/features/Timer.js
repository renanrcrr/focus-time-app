import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

export const Timer = ({ focusSubject }) => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <View>
      <Text>
        <View style={styles.container}>
          <View style={styles.countdown}>
            <Countdown
              isPaused={!isStarted}
              onProgress={() => {}}
              onEnd={() => {}}
            />
            <View style={{ paddingTop: spacing.xxl }}>
              <Text style={styles.title}>Focusing on:</Text>
              <Text style={styles.task}>{focusSubject}</Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            {!isStarted && (
              <RoundedButton title="start" onPress={() => setIsStarted(true)} />
            )}
            {isStarted && (
              <RoundedButton
                title="pause"
                onPress={() => setIsStarted(false)}
              />
            )}
          </View>
        </View>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    padding: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 140,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
