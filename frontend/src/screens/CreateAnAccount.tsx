import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useDispatch } from 'react-redux';
import { animated } from 'react-spring/native';

import { Button, FloatingLabelInput, Header } from '../components';
import { useCreateAnAccountMutation } from '../generated/graphql';
import { useInputValue, useKeyboard, useTypedSelector } from '../hooks';
import { setToken } from '../reducers/auth';
import { BackButton, Redirect, RouteComponentProps } from '../utils/router';
import { focusNext } from '../utils/scrollToView';

const AnimatedScrollView = animated(ScrollView);

const CreateAnAccount: React.FC<RouteComponentProps & {}> = ({ history }) => {
  const scrollRef = useRef<ScrollView>(null);
  const userRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);

  // Form state
  const email = useInputValue('');
  const user = useInputValue('');
  const pass = useInputValue('');

  // Shift input focus
  const focusUser = useMemo(() => focusNext(userRef, scrollRef), [
    userRef,
    scrollRef,
  ]);
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
  const [accountRes, accountRun] = useCreateAnAccountMutation();

  // Get any errors
  // const emailError = useMemo(
  //   () =>
  //     accountRes.error &&
  //     getValidationError({
  //       error: accountRes.error,
  //       prop: 'email',
  //     }),
  //   [accountRes.error],
  // );

  // const userError = useMemo(
  //   () =>
  //     accountRes.error &&
  //     getValidationError({
  //       error: accountRes.error,
  //       prop: 'username',
  //     }),
  //   [accountRes.error],
  // );

  // const passError = useMemo(
  //   () =>
  //     accountRes.error &&
  //     getValidationError({
  //       error: accountRes.error,
  //       prop: 'password',
  //     }),
  //   [accountRes.error],
  // );

  const onCreateAnAccount = useCallback(async () => {
    try {
      // Run mutation
      const res = await accountRun({
        data: {
          email: email.value,
          username: user.value,
          password: pass.value,
        },
      });

      // Check result
      if (!res || !res.data || !res.data.createAnAccount) {
        return;
      }

      // Create account successfully, store token
      dispatch(setToken(res.data.createAnAccount));
    } catch (error) {
      // ignore: Argument Validation Error
    }
  }, []);

  const onPressBack = useCallback(() => {
    history.goBack();
  }, []);

  if (hasToken) {
    return <Redirect to='/campaigns' />;
  }

  return (
    <Header center='Create an account' leftOnPress={onPressBack}>
      {/*
      // @ts-ignore */}
      <AnimatedScrollView
        style={{ marginBottom: keyboardHeight }}
        contentContainerStyle={styles.container}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        ref={scrollRef}
      >
        <BackButton />

        <View style={styles.content}>
          <FloatingLabelInput
            label='Email'
            autoCapitalize='none'
            autoCompleteType='email'
            autoCorrect={false}
            returnKeyType='next'
            textContentType='emailAddress'
            onSubmitEditing={focusUser}
            blurOnSubmit={false}
            // error={emailError}
            {...email}
          />

          <FloatingLabelInput
            ref={userRef}
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
            onSubmitEditing={onCreateAnAccount}
            blurOnSubmit={false}
            // error={passError}
            {...pass}
          />

          <Button
            title='Create an account'
            onPress={onCreateAnAccount}
            disabled={accountRes.fetching}
          />
        </View>
      </AnimatedScrollView>
    </Header>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '$bgColor',
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default CreateAnAccount;
