import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: true,
})
export class QResult extends Document {
    @Prop()
    count: number

    @Prop()
    short: string

    @Prop()
    result: string
}

export const QResultSchema = SchemaFactory.createForClass(QResult)
