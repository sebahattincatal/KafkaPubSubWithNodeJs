const { Kafka } = require("kafkajs");

createTopic();

async function createTopic() {
    try {
        
        const kafka = new Kafka({
            clientId : "kafka_pub_sub_client",
            brokers : ["127.0.0.1:9092"]
        });
    
        const admin = kafka.admin();
        console.log("Kafka brokera bağlanılıyor...");
        await admin.connect();
    
        console.log("Kafka brokera bağlantı başarılı, Topic üretilecek");
        await admin.createTopics({
            topics : [
                {
                    topic : "raw_video_topic",
                    numPartitions : 1  // 1 tane partition oluşturulması istedik
                }
            ]
        });
    
        console.log("Topic başarılı bir şekilde oluşturulmuştur...");
        await admin.disconnect();

    } catch (error) {
        console.log("Bir hata oluştu...", error);
    } finally {
        process.exit(0);
    }
}