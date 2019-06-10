import { ObjectId } from 'mongodb';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  arrayProp as ArrayProp,
  prop as Prop,
  Ref,
  Typegoose,
} from 'typegoose';

import { User } from './user';

@ObjectType()
export class Char extends Typegoose {
  @Field(() => ID, { nullable: true })
  readonly _id: ObjectId;

  /////////////////
  // Description //
  /////////////////
  @Field({ nullable: true })
  @Prop({ required: true, trim: true })
  name: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  xp: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  age: number;

  @Field({ nullable: true })
  @Prop({ required: true })
  sex: boolean;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  height: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  weight: number;

  @Field({ nullable: true })
  @Prop({ required: true })
  size: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  hairColor: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  eyeColor: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  skinColor: string;

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  personalityTraits: string[];

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  ideals: string[];

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  bonds: string[];

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  flaws: string[];

  @Field({ nullable: true })
  @Prop({ required: true })
  backstory: string;

  //////////
  // Race //
  //////////
  @Field({ nullable: true })
  @Prop({ required: true })
  race: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  subRace: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  raceVariant: string;

  ////////////////////////////
  // Ability Scores / Feats //
  ////////////////////////////
  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  str: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  dex: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  con: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  int: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  wis: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: true })
  cha: number;

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  feats: string[];

  ////////////////
  // Background //
  ////////////////
  @Field({ nullable: true })
  @Prop({ required: true })
  alignment: string;

  @Field({ nullable: true })
  @Prop({ required: true })
  background: string;

  ///////////////////
  // Class / Level //
  ///////////////////
  @Field({ nullable: true })
  @Prop({ required: true })
  class: string;

  ///////////////////
  // Proficiencies //
  ///////////////////
  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  skillProficiency: string[];

  @Field(() => [String], { nullable: true })
  @ArrayProp({ items: String, required: true, default: [] })
  languages: string[];

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User>;
}

export const CharModel = new Char().getModelForClass(Char);
