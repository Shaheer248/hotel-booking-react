import React, { useState } from 'react';
import '../styles/register.css';
import firebase from 'firebase';
import swal from 'sweetalert';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    function signUpWithEmail(){
        document.getElementById('spinner').style.display = 'block';
        if (password == cpassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    localStorage.setItem('user', user.email);
                    window.location.href = '/home';
                    document.getElementById('spinner').style.display = 'none';
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    swal(errorMessage);
                    document.getElementById('spinner').style.display = 'none';
                });
        } else { swal("Passwords don't match.");document.getElementById('spinner').style.display = 'none'; }
    }

    function signUpWithGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                localStorage.setItem('user', user.email);
                sessionStorage.setItem('token', token);
                window.location.href = '/home';
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage);
            });
    }

    function signUpWithFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                if(user.displayName == null || user.displayName == undefined){
                    if(user.email == null || user.email == undefined){
                      localStorage.setItem('user', user.phoneNumber)
                      sessionStorage.setItem('token', accessToken)
                      window.location.href = '/home';              
                    }else{
                      localStorage.setItem('user', user.email)
                      sessionStorage.setItem('token', accessToken)
                      window.location.href = '/home';
                    }
                }else{
                  localStorage.setItem('user', user.displayName)
                  sessionStorage.setItem('token', accessToken)
                  window.location.href = '/home';
                }
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                swal(errorMessage);
            });
    }

    function signUpWithGithub(){
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          var token = credential.accessToken;
          var user = result.user;
          if(user.displayName == null || user.displayName == undefined){
              if(user.email == null || user.email == undefined){
                localStorage.setItem('user', user.phoneNumber)
                sessionStorage.setItem('token', token)
                window.location.href = '/home';              
              }else{
                localStorage.setItem('user', user.email)
                sessionStorage.setItem('token', token)
                window.location.href = '/home';
              }
          }else{
            localStorage.setItem('user', user.displayName)
            sessionStorage.setItem('token', token)
            window.location.href = '/home';
          }
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          swal(errorMessage)
        });      
    }

        return (
            <section className="login-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                                <div className="auth-box card">
                                    <div className="card-block">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 className="text-center heading">Signup to book hotels</h3>
                                            </div>
                                        </div>
                                        <div className="form-group form-primary"> <input type="text" className="form-control" name="email" value={email} placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)} /> </div>
                                        <div className="form-group form-primary"> <input type="password" className="form-control" name="password" placeholder="Password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} /> </div>
                                        <div className="form-group form-primary"> <input type="password" className="form-control" name="password_confirm" placeholder="Confirm password" value={cpassword} id="password_confirm" onChange={(e) => setCPassword(e.target.value)} /> </div>
                                        <div className="row">
                                            <button className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" name="submit" value="Login" onClick={() => signUpWithEmail()}><span className="spinner-border spinner-border-sm" role="status" id='spinner' style={{ display: 'none' }} aria-hidden="true"></span> Signup using Email/Password</button>                                        </div>
                                    </div>
                                    <div className="or-container">
                                        <div className="line-separator"></div>
                                        <div className="or-label">or</div>
                                        <div className="line-separator"></div>
                                    </div>
                                    <div className="row">
                                            <button className="btn btn-lg btn-google btn-block btn-outline" onClick={() => signUpWithGoogle()}><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</button>
                                            <br />
                                            <div className="line-separator"></div>
                                            <div className="line-separator"></div>
                                            <div className="line-separator"></div>
                                            <button className="btn btn-lg btn-facebook btn-block btn-outline" onClick={() => signUpWithFacebook()}><img src="https://static.vecteezy.com/system/resources/previews/023/986/613/non_2x/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png" width={19} height={19} /> Signup Using Facebook</button>
                                            <div className="line-separator"></div>
                                        <div className="line-separator"></div>
                                        <div className="line-separator"></div>
                                        <button className="btn btn-lg btn-github btn-block btn-outline" onClick={() => signUpWithGithub()}><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width={19} height={19} /> Signup Using Github</button>
                                        </div> <br />
                                    <p className="text-inverse text-center">Already have an account? <a href="/login" data-abc="true">Login</a></p>
                                </div>
                        </div>
                </div>
            </div>
            </section >
        )
}