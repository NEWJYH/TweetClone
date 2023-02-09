import { authService } from "fbase";
import {
  GithubAuthProvider, // - git Auth
  GoogleAuthProvider, // - google Auth
  signInWithPopup, // popup -with api login
} from "firebase/auth";
import AuthForm from "components/AuthForm";

function Auth() {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </>
  );
}

export default Auth;

// firebase - Persistence browserSessionPersistence
// https://firebase.google.com/docs/auth/web/auth-state-persistence?authuser=1&hl=ko

// firebase - login signInWithEmailAndPassword, createUserWithEmailAndPassword
// https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=1

// Google - https://firebase.google.com/docs/reference/js/auth.googleauthprovider?hl=ko#googleauthprovidergoogle_sign_in_method
