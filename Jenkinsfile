pipeline {
  agent {label 'build-dev'}
  environment {
    ENV_DEV = "dev"
    ENV_PROD = "prod"
    NODE_DEV = "build-dev"
    NODE_PROD = "build-prod"
    DOCKER_HUB = "loidv01071999"
    DOCKERHUB_CREDENTIALS = credentials('loidv-dockerhub')
    POSTGRES_USER = credentials("loidv-postgres-user")
    POSTGRES_DB = credentials("loidv-postgres-dbname")
    POSTGRES_PASSWORD = credentials("loidv-postgres-password")
  }

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE_DEV"
        }
      }

      steps {
        sh "docker build -t devopstest-$ENV_DEV:latest ."

        sh "docker images"

        sh "echo $DOCKERHUB_CREDENTIALS | docker login -u $DOCKER_HUB --password-stdin"

        sh "docker tag devopstest-$ENV_DEV:latest $DOCKER_HUB/loidv-devops-training:$ENV_DEV"

        sh "docker push $DOCKER_HUB/loidv-devops-training:$ENV_DEV"

        sh "docker rmi -f $DOCKER_HUB/loidv-devops-training:$ENV_DEV"
        sh "docker rmi -f devopstest-$ENV_DEV:latest"
      }
    }
    stage('Deploy') {
      agent {
        node {
          label "$NODE_DEV"
        }
      }

      steps {
        sh "echo $DOCKERHUB_CREDENTIALS | docker login -u $DOCKER_HUB --password-stdin"
        sh "docker pull $DOCKER_HUB/loidv-devops-training:$ENV_DEV"
        sh "docker tag $DOCKER_HUB/loidv-devops-training:$ENV_DEV loidv-devops-training-$ENV_DEV:latest"
        sh "docker rm -f devops-training-$ENV_DEV"
        sh "docker-compose -f docker-compose.yaml up -d"
        // sh "docker run -d -p 3000:3000 $DOCKER_HUB/loidv-devops-training:$ENV"
      }
    }
  }
}