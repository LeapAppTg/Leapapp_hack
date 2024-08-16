pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Clean Workspace') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'uat'
                }
            }
            steps {
                cleanWs()
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('Checkout') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'uat'
                }
            }
            steps {
                checkout scm
            }
        }
        stage('Set Env') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'uat'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        env.AWS_DEFAULT_REGION = 'us-west-2'
                        env.AWS_S3_BUCKET      = 'leap-prod-app-fe-cdn-origin'
                        env.AWS_CLOUDFRONT_ID  = 'E2XG8IXXIMREQS'
                        env.API_URL            = 'https://api.leapapp.fun'
                        env.APP_URL            = 'https://leapapp.fun'
                    }
                    else if (env.BRANCH_NAME == 'dev') {
                        env.AWS_DEFAULT_REGION = 'us-east-1'
                        env.AWS_S3_BUCKET      = 'leap-dev-app-fe-cdn-origin'
                        env.AWS_CLOUDFRONT_ID  = 'E1OEDALGBRCTOI'
                        env.API_URL            = 'https://api.dev.leapapp.fun'
                        env.APP_URL            = 'https://dev.leapapp.fun'
                    }
                    else if (env.BRANCH_NAME == 'uat') {
                        env.AWS_DEFAULT_REGION = 'us-east-1'
                        env.AWS_S3_BUCKET      = 'leap-uat-app-fe-cdn-origin'
                        env.AWS_CLOUDFRONT_ID  = 'EI1G94KUT944V'
                        env.API_URL            = 'https://api.dev.leapapp.fun'
                        env.APP_URL            = 'https://dev.leapapp.fun'
                    }
                }
            }
        }
        stage('Update Env') {
            when {
                anyOf {
                    branch 'master'
                    branch 'dev'
                    branch 'uat'
                }
            }
            steps {
                script {
                    dir('services/app') {
                        sh "sed -i 's|^ENV VITE_API_URL=.*|ENV VITE_API_URL=${env.API_URL}|g' Dockerfile"
                        sh "sed -i 's|^ENV VITE_HOSTNAME=.*|ENV VITE_HOSTNAME=${env.APP_URL}|g' Dockerfile"
                    }
                }
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