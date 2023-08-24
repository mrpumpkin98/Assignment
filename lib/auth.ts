import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<FirebaseAuthTypes.UserCredential> {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}): Promise<FirebaseAuthTypes.UserCredential> {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async userCredential => {
      const user = userCredential.user;
      if (user) {
        await user.updateProfile({
          displayName: nickname,
        });
      }
      return userCredential;
    });
}

export function subscribeAuth(
  callback: (user: FirebaseAuthTypes.User | null) => void,
): () => void {
  const unsubscribe = auth().onAuthStateChanged(callback);
  return unsubscribe;
}

export function signOut(): Promise<void> {
  return auth().signOut();
}
