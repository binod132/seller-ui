pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:latest
      command:
        - sleep
        - infinity
      volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
  volumes:
    - name: kaniko-secret
      secret:
        secretName: docker-hub-creds
"""
            defaultContainer 'kaniko'
        }
    }

    environment {
        imageNameDev = "binod1243/fuse/dev/ui"
        imageNameProd = "binod1243/fuse/prod/ui"
        registrySecretName = "docker-hub-creds"
    }

    stages {
        stage('Build & Push - Dev') {
            when {
                expression { env.BRANCH_NAME ==~ /(dev)/ }
            }
            steps {
                script {
                    def DATE_TAG = java.time.LocalDate.now().toString().replaceAll("-", ".")
                    sh """
                    /kaniko/executor \
                      --dockerfile=Dockerfile \
                      --context=${env.WORKSPACE} \
                      --destination=${imageNameDev}:${DATE_TAG}-${env.BUILD_NUMBER} \
                      --destination=${imageNameDev}:dev-latest \
                      --verbosity=info
                    """
                }
            }
        }

        stage('Build & Push - Prod') {
            when {
                expression { env.BRANCH_NAME ==~ /(main)/ }
            }
            steps {
                script {
                    def DATE_TAG = java.time.LocalDate.now().toString().replaceAll("-", ".")
                    sh """
                    /kaniko/executor \
                      --dockerfile=Dockerfile \
                      --context=${env.WORKSPACE} \
                      --destination=${imageNameProd}:${DATE_TAG}-${env.BUILD_NUMBER} \
                      --destination=${imageNameProd}:latest \
                      --verbosity=info
                    """
                }
            }
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
}
