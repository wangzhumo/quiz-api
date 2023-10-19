import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: true,
})
export class QTags extends Document {
    @Prop()
    tagId: number

    @Prop()
    tag: string
}
export const QTagsSchema = SchemaFactory.createForClass(QTags)
