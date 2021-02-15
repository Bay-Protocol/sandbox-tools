AWS:=aws
AWS_REGION:=us-east-1
AWS_ACCOUNT_ID=$(shell aws sts get-caller-identity --query 'Account' --output text)
DOCKER:=docker
IMAGE_NAME:=oracle-service
COMMIT_ID_SHORT:=$(shell git rev-parse --short HEAD)
DOCKER_REPOSITORY_URL:=$(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(IMAGE_NAME)

.PHONY: docker-login
docker-login:
	$(AWS) ecr get-login-password --region $(AWS_REGION) | \
	docker login --username AWS --password-stdin \
	$(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

.PHONY: docker-build
docker-build:
	$(DOCKER) build -t $(IMAGE_NAME):$(COMMIT_ID_SHORT) .
# oracle-service:75a6d3b
# 843137275421.dkr.ecr.us-east-1.amazonaws.com/oracle-service:75a6d3b
.PHONY: docker-tag
docker-tag:
	$(DOCKER) tag $(IMAGE_NAME):$(COMMIT_ID_SHORT) $(DOCKER_REPOSITORY_URL):$(COMMIT_ID_SHORT)

.PHONY: docker-push
docker-push:
	$(DOCKER) push $(DOCKER_REPOSITORY_URL):$(COMMIT_ID_SHORT)