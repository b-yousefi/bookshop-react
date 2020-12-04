pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
		   cp -r /var/jenkins_home/bookshop_config/react/.  /var/jenkins_home/workspace/pipeline-bookshop-react
		   docker-compose -f docker-compose-build.yml build
		'''
            }
        }
    }
}

