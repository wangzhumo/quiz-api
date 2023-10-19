import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({
    timestamps: true,
})
export class RecommendQuiz extends Document {
    @Prop()
    recommend: boolean

    @Prop()
    startAt: number

    @Prop()
    endAt: number

    /**
     * quiz , compilation
     */
    @Prop()
    type: string

    @Prop()
    externalId: string
}

export const RecommendSchema = SchemaFactory.createForClass(RecommendQuiz)
export type RecommendQuizDocument = RecommendQuiz & Document
