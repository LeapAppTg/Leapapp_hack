pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    environment {
        AWS_DEFAULT_REGION = 'us-west-2'
        AWS_S3_BUCKET      = 'leap-prod-app-fe-cdn-origin'
        AWS_CLOUDFRONT_ID  = 'E2XG8IXXIMREQS'
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                dir('services/app') {
                    sh "docker build -t frontend-image ."
                    sh "docker run --name frontend-container frontend-image"
                    sh "docker cp frontend-container:/app/dist ."
                }
            }
        }
        stage('Test Build') {
            steps {
                script {
                    timeout(time: 1, unit: 'MINUTES') {
                        sh 'until [ -d "services/app/dist" ] && [ -f "services/app/dist/index.html" ]; do sleep 10; done'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: '93135ab4-dc98-4e83-b61c-73daa9a78d05',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws s3 sync services/app/dist s3://${AWS_S3_BUCKET} --delete'
                }
            }
        }
        stage('Test Deploy') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: '93135ab4-dc98-4e83-b61c-73daa9a78d05',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws s3api wait object-exists --bucket ${AWS_S3_BUCKET} --key index.html'
                }
            }
        }
        stage('Invalidation') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: '93135ab4-dc98-4e83-b61c-73daa9a78d05',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh "aws cloudfront create-invalidation --distribution-id ${AWS_CLOUDFRONT_ID} --paths '/*'"
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -a --volumes -f'
            }
        }
    }
}