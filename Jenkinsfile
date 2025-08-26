pipeline {
    agent any

    environment {
        imageNameDev = "binod1243/fuse/dev/ui"
        imageNameProd = "binod1243/fuse/prod/ui"
        registryCredential = 'docker-hub-creds'
    }

    stages {

        stage('Build & Push - Dev') {
            when {
                expression { env.BRANCH_NAME ==~ /(dev)/ }

            }
            steps {
                script {
                    def DATE_TAG = java.time.LocalDate.now().toString().replaceAll("-", ".")
                    docker.withRegistry('https://harbor.fonepay.com', registryCredential) {
                        def app = docker.build("${imageNameDev}")
                        app.push("${DATE_TAG}-${env.BUILD_NUMBER}")
                        app.push("dev-latest")
                    }
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
                    docker.withRegistry('https://harbor.fonepay.com', registryCredential) {
                        def app = docker.build("${imageNameProd}")
                        app.push("${DATE_TAG}-${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
}
