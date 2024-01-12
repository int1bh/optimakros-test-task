import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Car {
    @Prop({isRequired: true})
    name: string;

    @Prop({ required: true })
    modelName: string;

    @Prop()
    color: string;

    @Prop({ required: true })
    manufacturedYear: number;

    @Prop()
    price: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);