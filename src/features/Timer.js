import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Vibration,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SEC_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SEC_IN_MS,
  1 * ONE_SEC_IN_MS,
  1 * ONE_SEC_IN_MS,
  1 * ONE_SEC_IN_MS,
  1 * ONE_SEC_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  return (
    <View>
      <Text>
        <View style={styles.container}>
          <View style={styles.countdown}>
            <Countdown
              minutes={minutes}
              isPaused={!isStarted}
              onProgress={setProgress}
              onEnd={() => {
                Vibration.vibrate(PATTERN);
              }}
            />
            <View style={{ paddingTop: spacing.xxl }}>
              <Text style={styles.title}>Focusing on:</Text>
              <Text style={styles.task}>{focusSubject}</Text>
            </View>
          </View>
          <View style={{ paddingTop: spacing.sm }}>
            <ProgressBar
              progress={progress}
              color={colors.progressBar}
              style={{ height: spacing.sm }}
            />
          </View>
          <View style={styles.timingWrapper}>
            <Timing onChangeTime={setMinutes} />
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
          <View style={styles.clearSubjectWrapper}>
            <RoundedButton size={50} title="-" onPress={clearSubject} />
          </View>
        </View>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row',
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    paddingLeft: 150,
    paddingBottom: 50,
    paddingTop: 100,
    paddingRight: 150,
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
