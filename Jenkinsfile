
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    environment {
        ARTIFACT = 'nodejs-app-${BUILD_NUMBER}.tar.gz'
        REMOTE_HOST = 'your.server.ip'
        REMOTE_USER = 'ec2-user'
        REMOTE_PATH = '/home/ec2-user/nodejs-app'
        SSH_CREDENTIALS = 'NodeServerSSHKey'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Bump Version') {
            steps {
                sh 'npm version patch --no-git-tag-version'
            }
        }

        stage('Build Artifact') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Upload to Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'NexusCreds', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASSWORD')]) {
                    sh 'export NEXUS_USER=$NEXUS_USER && export NEXUS_PASSWORD=$NEXUS_PASSWORD && npm run deploy'
                }
            }
        }

        stage('Deploy on Node.js Server') {
            steps {
                sshagent([env.SSH_CREDENTIALS]) {
                    sh '''
                    ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH"
                    ssh $REMOTE_USER@$REMOTE_HOST "wget --user=admin --password=admin123 https://nexus.example.com/repository/nodejs-releases/nodejs-app/1.0.0/nodejs-app-1.0.0.tar.gz -O /tmp/nodejs-app.tar.gz"
                    ssh $REMOTE_USER@$REMOTE_HOST "rm -rf $REMOTE_PATH/* && tar -xzf /tmp/nodejs-app.tar.gz -C $REMOTE_PATH"
                    ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_PATH && npm install && pm2 start app.js --name my-app --update-env"
                    '''
                }
            }
        }
    }
}
