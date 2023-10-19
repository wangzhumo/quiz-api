import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: true,
})
export class Quiz extends Document {
    @Prop()
    type: number

    @Prop()
    coverUrl: string

    @Prop()
    mediaType: number

    @Prop()
    mediaUrl: string

    @Prop()
    description: string

    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    options: string

    @Prop()
    tags: string
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)
