pipeline {
  agent none
  environment {
    ENV = "dev"
    NODE = "Jenkin-build-test"
  }
  

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE"
        }
      }

      environment {
        TAG = sh(returnStdout: true, script "git rev-parse -short=10 HEAD | tail -n +2").trim()
      }

      steps {
        sh "docker build -t devopstest-$ENV:latest ."

        sh "cat docker.txt | docker login -u dangminhduc --password-stdin"

        sh "docker tag devopstest-$ENV:lastest dangminhduc/devopstest:$TAG"

        sh "docker push dangminhduc/devopstest:$TAG"

        sh "docker rmi -f dangminhduc/devopstest:$TAG"
      }
    }
  }
}