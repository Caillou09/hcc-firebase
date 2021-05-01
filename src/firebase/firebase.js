import app from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebase/auth'
import 'firebase/firestore'


import firebaseConfig from './config'

class Firebase {
  constructor () {
    app.initializeApp(firebaseConfig)

    this.auth = app.auth()
    this.db = app.firestore()


    // if (window.location.hostname === 'localhost') {
    //   this.db.useEmulator('localhost', 8080);
    //   this.auth.useEmulator('http://localhost:9099/', { disableWarnings: true });
    // }

    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()

}

  login = async (provider) => {
    await this.auth.signInWithPopup(this[`${provider}Provider`])
  }

  logout = async () => {
    await this.auth.signOut()
  }

}

const firebase = new Firebase()

export default firebase
