pipeline {
  agent none
  

  stages {
    stage('Build Image') {
      agent {
        node {
          label "Jenkin-build-test"
        }
      }

      steps {
        sh "echo build success"
      }
    }
  }
}