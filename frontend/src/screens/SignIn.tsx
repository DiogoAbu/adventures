import React, { useCallback, useMemo, useRef } from 'react';
import { Platform, ScrollView, TextInput, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch } from 'react-redux';
import { animated } from 'react-spring/native';

import { Button, FloatingLabelInput, Header, NotifyLocal } from '../components';
import { useSignInMutation } from '../generated/graphql';
import { useInputValue, useKeyboard, useTypedSelector } from '../hooks';
import { setToken } from '../reducers/auth';
import { Redirect, RouteComponentProps } from '../utils/router';
import { focusNext } from '../utils/scrollToView';

const AnimatedScrollView = animated(ScrollView);

const SignIn: React.FC<RouteComponentProps & {}> = ({ history }) => {
  const scrollRef = useRef<ScrollView>(null);
  const passRef = useRef<TextInput>(null);

  // Form state
  const user = useInputValue('');
  const pass = useInputValue('');

  // Shift input focus
  const focusPass = useMemo(() => focusNext(passRef, scrollRef), [
    passRef,
    scrollRef,
  ]);

  // Listen to keyboard
  const keyboardHeight = useKeyboard();

  // Check token
  const hasToken = useTypedSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  // Get mutation data and function
  const [signInRes, signInRun] = useSignInMutation();

  // Get any errors
  // const userError = useMemo(
  //   () =>
  //     signInRes.error &&
  //     getValidationError({
  //       error: signInRes.error,
  //       prop: 'username',
  //     }),
  //   [signInRes.error],
  // );

  // const passError = useMemo(
  //   () =>
  //     signInRes.error &&
  //     getValidationError({
  //       error: signInRes.error,
  //       prop: 'password',
  //     }),
  //   [signInRes.error],
  // );

  // Submit form
  const onSignIn = useCallback(async () => {
    try {
      // Run mutation
      const res = await signInRun({
        data: {
          username: user.value,
          password: pass.value,
        },
      });
      // console.log(JSON.stringify(res.error, null, 2));

      // Check result
      if (!res || !res.data || !res.data.signIn) {
        return;
      }

      // Logged in successfully, store token
      dispatch(setToken(res.data.signIn));
    } catch (error) {
      // ignore: Argument Validation Error
    }
  }, []);

  // Redirect to register form
  const onCreateAnAccount = useCallback(() => {
    history.push('/create-an-account');
  }, []);

  if (hasToken) {
    return <Redirect to='/campaigns' />;
  }

  return (
    <Header center='Sign In'>
      {/*
      // @ts-ignore */}
      <AnimatedScrollView
        style={{ marginBottom: keyboardHeight }}
        contentContainerStyle={[
          styles.container,
          Platform.OS === 'web' && styles.maxWidth,
        ]}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        ref={scrollRef}
      >
        <View style={styles.containerInput}>
          {signInRes.data && signInRes.data.signIn === null && (
            <NotifyLocal text='No username/password matchs found' />
          )}

          <FloatingLabelInput
            label='Username'
            autoCapitalize='none'
            autoCompleteType='username'
            autoCorrect={false}
            returnKeyType='next'
            textContentType='username'
            onSubmitEditing={focusPass}
            blurOnSubmit={false}
            // error={userError}
            {...user}
          />

          <FloatingLabelInput
            ref={passRef}
            label='Password'
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            returnKeyType='go'
            secureTextEntry={true}
            textContentType='password'
            onSubmitEditing={onSignIn}
            blurOnSubmit={false}
            // error={passError}
            {...pass}
          />

          <Button
            title='Sign in'
            onPress={onSignIn}
            disabled={signInRes.fetching}
          />
        </View>

        <Button
          title='Create an account'
          onPress={onCreateAnAccount}
          brand='violet'
        />
      </AnimatedScrollView>
    </Header>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },

  maxWidth: {
    maxWidth: 900,
    alignSelf: 'center',
  },

  containerInput: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default SignIn;
