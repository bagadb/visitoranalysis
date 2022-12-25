pipeline {
  agent {
    node {
      label 'staging-server'
    }

  }
  stages {
    stage(' Checkout Code') {
      steps {
        git(url: 'https://github.com/bagadb/visitoranalysis', branch: 'development')
      }
    }

    stage('List Files') {
      parallel {
        stage('List Files') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Copy Env File') {
          steps {
            sh 'cp ~/.env .'
          }
        }

      }
    }

    stage('Docker Compose Build') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Docker Compose Up') {
      parallel {
        stage('Docker Compose Up') {
          steps {
            sh 'docker-compose up -d'
          }
        }

        stage('') {
          steps {
            sh 'echo "Connect here: http://$(curl ipinfo.io)"'
          }
        }

      }
    }

  }
}