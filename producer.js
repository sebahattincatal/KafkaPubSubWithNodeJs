const { Kafka } = require("kafkajs");

createProcedure();

async function createProcedure() {
    try {
        
        const kafka = new Kafka({
            clientId : "kafka_pub_sub_client",
            brokers : ["127.0.0.1:9092"]
        });
    
        const producer = kafka.producer();
        console.log("producer'a bağlanılıyor.");
        await producer.connect();


        const message_result = await producer.send({
            topic : "raw_video_topic",
            messages : [
                {
                    value : "Yeni Video İçeriği",
                    partition : 0 
                }
            ]
        });

        console.log("Gönderim işlemi başarılı", JSON.stringify(message_result));
        producer.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu...", error);
    } finally {
        process.exit(0);
    }
}