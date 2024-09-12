import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { InUse } from '../common/inUse';

export type MaterialDocument = HydratedDocument<Material>;

@Schema()
export class Material {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  unitMeasure: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: [InUse] })
  inUse: InUse[];

  @Prop()
  inRepair: number;

  @Prop({ required: true, default: true })
  isAvailable: boolean;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
