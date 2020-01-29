# SES Local SMTP Endpoint

This tool is to be run it as local microservice.
It's purpose is to serve as a local SMTP endpoint.
It provides SMTP server which receives email and uses SES:SendRawEmail call to send it.

### Why?

SES provides SMTP endpoints under email-smtp.REGION.amazonaws.com.
However in some setups accessing this endpoint is not practical.

For example you will have a hard time using SES SMTP endpoint if you
want to send emails from service running in private subnet which
whitelists IP address for outgoing traffic. Since AWS uses Network
Load Balancer you will have to open wide variety of addresses. In
practice you would have open outgoing connection to 0.0.0.0/0 on
port 587 to use it.

## Configuration

Configuration is done using environment variables:

* PORT - port to listen on (default 25)

* HOST - host to bind to (default 127.0.0.1)

* FROM_ARN - required ARN of SES identify that will be used for sending emails


## How to run it

Service assumes that you have AWS credentials set up.

### Development


    export FROM_ARN=arn:aws:ses:us-east-1:XXXXXXXXXXXX:identity/email@example.com
    npm start

### As microservice


    docker run -t \
      -e FROM_ARN=arn:aws:ses:us-east-1:XXXXXXXXXXXX:identity/email@example.com \
    rumblefishdev/ses-local-smtp-endpoint
