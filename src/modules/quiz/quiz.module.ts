import { Module } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { MongooseModule } from '@nestjs/mongoose'
import { RecommendQuiz, RecommendSchema } from '../../database/schema/recommend.schema'
import { Quiz, QuizSchema } from '../../database/schema/quiz.schema'
import { QTags, QTagsSchema } from '../../database/schema/tag.schema'
import { QuizController } from './quiz.controller'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RecommendQuiz.name, schema: RecommendSchema },
            { name: Quiz.name, schema: QuizSchema },
            { name: QTags.name, schema: QTagsSchema },
        ]),
    ],
    controllers: [QuizController],
    providers: [QuizService],
})
export class QuizModule {}
