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
      steps {
        sh 'ls -la'
      }
    }

  }
}