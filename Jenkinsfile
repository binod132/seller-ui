pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: jnlp
      image: jenkins/inbound-agent:latest
      args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
    - name: docker
      image: docker:24
      command: ['cat']
      tty: true
      volumeMounts:
        - name: docker-socket
          mountPath: /var/run/docker.sock
  volumes:
    - name: docker-socket
      hostPath:
        path: /var/run/docker.sock
        type: Socket
"""
            defaultContainer 'docker'
        }
    }

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
                    docker.withRegistry('https://index.docker.io/v1/', registryCredential) {
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
                    docker.withRegistry('https://index.docker.io/v1/', registryCredential) {
                        def app = docker.build("${imageNameProd}")
                        app.push("${DATE_TAG}-${env.BUILD_NUMBER}")
