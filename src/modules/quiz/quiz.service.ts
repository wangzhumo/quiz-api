import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { RecommendQuiz, RecommendQuizDocument } from '../../database/schema/recommend.schema'
import { Model } from 'mongoose'
import { Quiz, QuizDocument } from '../../database/schema/quiz.schema'
import { RecommendData } from './interfaces/recommend.interface'
import { QTags, QTagsDocument } from '../../database/schema/tag.schema'
import { TimeFormat } from '../../common/timeformat'

@Injectable()
export class QuizService {
    constructor(
        @InjectModel(RecommendQuiz.name) private recommendDocument: Model<RecommendQuizDocument>,
        @InjectModel(Quiz.name) private quizDocument: Model<QuizDocument>,
        @InjectModel(QTags.name) private tagDocument: Model<QTagsDocument>,
    ) {}

    async recommend(lastId?: string, limitOfDocuments?: number) {
        const currentTime = TimeFormat.getSTime()
        const findQuery = this.recommendDocument
            .find({
                recommend: true,
                startAt: { $lte: currentTime },
                endAt: { $gte: currentTime },
            })
            .sort({ _id: 1 })

        if (lastId) {
            findQuery.and([{ _id: { $gt: lastId } }])
        }

        if (limitOfDocuments) {
            findQuery.limit(limitOfDocuments)
        }

        const results = await findQuery
        const count = await this.recommendDocument.count()
        return { results, count }
    }

    async insertRecommend(recommend: RecommendQuiz): Promise<RecommendQuiz> {
        return await this.recommendDocument.create(recommend)
    }

    async removeRecommend(ids: string[]): Promise<void> {
        this.recommendDocument.deleteMany({ _id: ids })
    }

    async editRecommend(_id: string, startAt?: number, endAt?: number) {
        return this.recommendDocument.updateOne(
            {
                _id: _id,
            },
            {
                $set: { startAt: startAt, endAt: endAt },
            },
        )
    }

    async queryQuiz(ids: string[]) {
        const findQuery = this.quizDocument.find({
            _id: ids,
        })
        const results = (await findQuery).map((value) => {
            return {
                id: String(value._id),
                title: value.title,
                description: value.description,
                coverUrl: value.coverUrl,
                mediaType: value.mediaType,
                mediaUrl: value.mediaUrl,
                count: value.count,
            } as RecommendData
        })
        const count = await this.quizDocument.count()
        return { results, count }
    }

    async queryQuizList(lastId?: string, limitOfDocuments?: number, tag?: String) {
        const findQuery = this.quizDocument.find().sort({ _id: 1 })
        if (lastId) {
            findQuery.and([{ _id: { $gt: lastId } }])
        }

        if (tag) {
            findQuery.and([{ tags: { $in: [tag] } }])
        }

        if (limitOfDocuments) {
            findQuery.limit(limitOfDocuments)
        }

        const results = (await findQuery).map((value) => {
            return {
                id: String(value._id),
                title: value.title,
                description: value.description,
                coverUrl: value.coverUrl,
                mediaType: value.mediaType,
                mediaUrl: value.mediaUrl,
                count: value.count,
            } as RecommendData
        })
        const count = await this.quizDocument.count()
        return { results, count }
    }

    async queryByRecommend(quiz: RecommendQuiz[]) {
        // query quiz
        const ids = quiz.filter((value) => value.type === 'quiz').map((value) => String(value._id))
        const quizResult = await this.queryQuiz(ids)
        // query compilation
        // empty impl
        return quizResult.results
    }

    async tags() {
        return this.tagDocument.find()
    }
}
