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

    stage('') {
      steps {
        sh 'ls -la'
      }
    }

  }
}