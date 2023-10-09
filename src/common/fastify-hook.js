export default function addHeaderHook(fastifyInstance) {
    fastifyInstance.addHook('onRequest', (request, reply, done) => {
        reply.setHeader = function (key, value) {
            return this.raw.setHeader(key, value)
        }
        reply.end = function () {
            this.raw.end()
        }
        request.res = reply
        done()
    })
}
