import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string; // FIXME: do we really need a username? can't we just use email validation?

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dni: number;

  @Prop()
  matricula?: number; // FIXME: Why do we need this? also let's pick a name for this attribute

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  isEditor: boolean; // FIXME: Why do we need this? shouldn't it be a role?

  @Prop()
  isAdmin?: boolean; // FIXME: Why do we need this? shouldn't it be a role?

  @Prop({ required: true })
  email: string;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    throw new Error('Failed to create hashed password: ' + error);
  }
});
