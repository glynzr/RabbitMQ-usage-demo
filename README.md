# RabbitMQ-usage-demo

## How to run the given project?
- Clone the repository
```bash
git clone https://github.com/glynzr/RabbitMQ-usage-demo.git
cd RabbitMQ-usage-demo
```

- Set up RabbitMQ as container:
```bash
docker compose up -d
```
![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/docker_rabbitmq.png)

RabbitMQ Dashboard is now available on port 15762
![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/rabbitmq_dashboard.png)


Default credentials will be *guest*:*guest*
![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/rabbitmq_overview.png)

- Running microservices
As required in the task, I have added two microservices as consumers,and one publisher microservice. Publisher microservice generates random emails every 5 minutes.
It is needed to install dependencies with npm:
```bash
npm install
```
Then we should add RabbitMQ URL to .env file. .env file should be located on RabbitMQ-usage-demo. (current repository folder) and sample content might be:
```text
RABBITMQ_URL=amqp://localhost:5672
```
Then open 3 terminal for paralel execution of microservices.
On terminal 1:
```bash
cd consumer
node consumer1.js
```

On terminal2:
```bash
cd consumer
node consumer2.js
```

On terminal 3:
```bash
cd publisher
node publisher.js
```

As can be seen from the given screenshots only one consumer microservice handles one email.

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/terminal_1.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/terminal_2.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/terminal_3.png)

At the same time, email queue details could be seen on RabbitMQ dashboard:
![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_1.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_2.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_3.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_4.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_5.png)

![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/dashboard_6.png)

## Project system design
![](https://github.com/glynzr/RabbitMQ-usage-demo/raw/main/images/system.png)

## Learning outcomes
RabbitMQ enables asynchronous communication; a producer (sender)  sends messages that are stored in a queue until a consumer (receiver) is ready to process them as a result we are decoupling producers and consumers. This  improves scalability, reliability, and responsiveness in applications by allowing different components to work independently. 
In this task, I have set up RabbitMQ with docker and monitored message flows and queue states with the help of its dashboard. With RabbitMQ, I observed its load distribution capability.