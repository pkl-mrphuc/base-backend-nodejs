const amqp = require('amqplib/callback_api')
const process = require('process')

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }
        var queue = 'EventBusRabbitMQ'
        var msg = process.argv.slice(2).join(' ') || 'Hello world'

        channel.assertQueue(queue, {
            durable: true
        })

        for(let i = 0; i < 4; i ++) {
            channel.sendToQueue(queue, Buffer.from(msg + (i+1)), {
                persistent: true
            })
            console.log(" [x] Sent %d %s", i+1, msg)
        }
    })
})