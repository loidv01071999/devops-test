pipeline {
  agent none
  environment {
    ENV = "dev"
    USERNAME = "loidv01071999"
    NODE = "worker-node-3"
    CREDS = credentials('loidv-dockerhub')
  }

  stages {
    stage('Build Image') {
      agent {
        node {
          label "$NODE"
        }
      }


      steps {
        script {
          env.TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
        }


        sh "sudo docker build -t devopstest-$ENV:latest ."

        sh "sudo docker login -u $USERNAME -p $CREDS_PSW"

        sh "sudo docker tag devopstest-$ENV:latest $USERNAME/devopstest:$TAG"

        sh "sudo docker push $USERNAME/devopstest:$TAG"

        sh "sudo docker rmi -f $USERNAME/devopstest:$TAG"
        sh "sudo docker rmi -f devopstest-$ENV:latest"
      }
    }

    stage('Deploy') {
      agent {
        node {
          label "$NODE"
        }
      }

      steps {
         sh "kubectl apply -f deployment.yaml"
         sh "kubectl set image deployment/loidv-deployment loidv=$USERNAME/devopstest:$TAG -n python-demo"
      }
    }

    stage('Point domain') {
         agent {
            node {
              label "$NODE"
            }
          }

        steps {
              script {
                  try {
                      sh "kubectl delete -f /home/team1_devops/devops-k8s/ingress/cilium"
                  } catch (err) {
                         sh "kubectl apply -f /home/team1_devops/devops-k8s/ingress/cilium/loidv-ingress.yaml"
                  }
              }
        }

    }
  }
}