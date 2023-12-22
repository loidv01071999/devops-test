pipeline {
  agent none
  environment {
    ENV = "dev"
    NODE = "build-dev"
  }
  

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE"
        }
      }

      environment {
        TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
      }

      steps {
        sh "docker build -t devopstest-$ENV:latest ."

        sh "docker images"

        sh "cat docker.txt | docker login -u loidv01071999 --password-stdin"

        sh "docker tag devopstest-$ENV:latest loidv01071999/loidv-devops-training:$TAG"

        sh "docker push loidv01071999/loidv-devops-training:$TAG"

        sh "docker rmi -f loidv01071999/loidv-devops-training:$TAG"
        sh "docker rmi -f devopstest-$ENV:latest"
      }
    }
  }
}