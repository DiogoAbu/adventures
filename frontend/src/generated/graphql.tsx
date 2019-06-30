import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
}

export interface ChangePasswordInput {
  token: Scalars['String'];
  password: Scalars['String'];
  autoSignIn?: Maybe<Scalars['Boolean']>;
}

export interface CreateAnAccountInput {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface ForgotPasswordInput {
  email: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createAnAccount: Scalars['String'];
  signIn?: Maybe<Scalars['String']>;
  /** Find the user, store an expirable token, and send it to the email. */
  forgotPassword: Scalars['Boolean'];
  /** Find the user related to the token, check its validity and update the password. */
  changePassword: Scalars['Boolean'];
}

export interface MutationCreateAnAccountArgs {
  data: CreateAnAccountInput;
}

export interface MutationSignInArgs {
  data: SignInInput;
}

export interface MutationForgotPasswordArgs {
  data: ForgotPasswordInput;
}

export interface MutationChangePasswordArgs {
  data: ChangePasswordInput;
}

export interface Query {
  __typename?: 'Query';
  me?: Maybe<User>;
}

export interface SignInInput {
  username: Scalars['String'];
  password: Scalars['String'];
}

export interface User {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  /** Only for reseting password */
  email?: Maybe<Scalars['String']>;
  passwordResetToken?: Maybe<Scalars['String']>;
  passwordResetExpires?: Maybe<Scalars['DateTime']>;
  chars: User[];
}
export interface CreateAnAccountMutationVariables {
  data: CreateAnAccountInput;
}

export type CreateAnAccountMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createAnAccount'
>;

export interface SignInMutationVariables {
  data: SignInInput;
}

export type SignInMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'signIn'
>;

export interface ForgotPasswordMutationVariables {
  data: ForgotPasswordInput;
}

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'forgotPassword'
>;

export interface ChangePasswordMutationVariables {
  data: ChangePasswordInput;
}

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'changePassword'
>;

export interface MeQueryVariables {}

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<{ __typename?: 'User' } & Pick<User, 'username' | 'email'>>;
};

export const CreateAnAccountDocument = gql`
  mutation CreateAnAccount($data: CreateAnAccountInput!) {
    createAnAccount(data: $data)
  }
`;

export function useCreateAnAccountMutation() {
  return Urql.useMutation<
    CreateAnAccountMutation,
    CreateAnAccountMutationVariables
  >(CreateAnAccountDocument);
}
export const SignInDocument = gql`
  mutation SignIn($data: SignInInput!) {
    signIn(data: $data)
  }
`;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
  );
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const ChangePasswordDocument = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data)
  }
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      username
      email
    }
  }
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {},
) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({
    query: MeDocument,
    ...options,
  });
}
