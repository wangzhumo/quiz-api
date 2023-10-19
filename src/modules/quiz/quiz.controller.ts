import { Body, Controller, Get, Inject, Logger, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { StatusCheck } from '../../common/status'
import { Pagination } from './dto/pagination.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('quiz')
export class QuizController {
    constructor(
        private readonly quizService: QuizService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    /**
     * recommend quiz
     * limit 10 size
     */
    @Get('recommend')
    @ApiTags('quiz')
    async recommend() {
        const ret = await this.quizService.recommend(null, 10)
        // has 10 ?
        const queryRet = await this.quizService.queryByRecommend(ret.results)
        if (queryRet.length === 10) {
            // query subData
            return StatusCheck.Ok({
                list: queryRet,
                lastId: queryRet[9].id,
                more: false,
            })
        } else {
            // query from quiz & append quiz
            const limit = 10 - ret.results.length
            const appendQuery = await this.quizService.queryQuizList(null, limit)
            return StatusCheck.Ok({
                list: queryRet.concat(appendQuery.results),
            })
        }
    }

    /**
     * recommend quiz
     * limit 10 size
     */
    @Get('recommend/list')
    @ApiTags('quiz')
    async recommendList(@Query() { lastId, limit }: Pagination) {
        const ret = await this.quizService.recommend(lastId, limit)
        const queryRet = await this.quizService.queryByRecommend(ret.results)
        const hasMore = ret.count > queryRet.length
        return StatusCheck.Ok({
            list: queryRet,
            lastId: queryRet.at(-1)?.id,
            more: hasMore,
        })
    }

    @Get('tags')
    @ApiTags('quiz')
    async tags() {
        const ret = await this.quizService.tags()
        return StatusCheck.Ok({
            list: ret,
        })
    }

    @Post('tags/:tag')
    @ApiTags('quiz')
    async tagList(@Body() params: Pagination, @Param('tag') tag: string) {
        const { lastId, limit } = params ?? {}
        const ret = await this.quizService.queryQuizList(lastId, limit, tag)
        return StatusCheck.Ok({
            list: ret.results,
            count: ret.count,
        })
    }
}
