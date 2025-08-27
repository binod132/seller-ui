pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:18
    command:
    - cat
    tty: true
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      tty: true
      command:
        - sleep
      args:
        - infinity
      volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
  volumes:
    - name: kaniko-secret
      secret:
        secretName: dockercrednew
        items:
        - key: .dockerconfigjson
          path: config.json
"""
      defaultContainer 'kaniko'
    }
  }

  environment {
    imageNameDev = "binod1243/fuse"
    imageNameProd = "binod1243/fuse"
  }

  stages {
    stage('Build & Push - Dev') {
      when { expression { env.BRANCH_NAME ==~ /(dev)/ } }
      steps {
        script {
          def DATE_TAG = java.time.LocalDate.now().toString().replaceAll("-", ".")
          // Run Kaniko executor inside the running kaniko container
          container('kaniko') {
            sh """
              /kaniko/executor \
                --dockerfile=Dockerfile \
                --context=\$WORKSPACE \
                --destination=${imageNameDev}:${DATE_TAG}-${BUILD_NUMBER} \
                --destination=${imageNameDev}:dev-latest \
                --verbosity=info
            """
          }
        }
      }
    }

    stage('Build & Push - Prod') {
      when { expression { env.BRANCH_NAME ==~ /(main)/ } }
      steps {
        script {
          def DATE_TAG = java.time.LocalDate.now().toString().replaceAll("-", ".")
          container('kaniko') {
            sh """
              /kaniko/executor \
                --dockerfile=Dockerfile \
                --context=\$WORKSPACE \
                --destination=${imageNameProd}:${DATE_TAG}-${BUILD_NUMBER} \
                --destination=${imageNameProd}:latest \
                --verbosity=info
            """
          }
        }
      }
    }
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }
}
