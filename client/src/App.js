import { useEffect, useState } from 'react';
import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from './config/firebase.config';
import { validateUser } from './api';

function App() {
	const [auth, setAuth] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
	const [user,setUser]=useState({})
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider(); 

	const loginWithGoogle = async () => {
		await signInWithPopup(firebaseAuth, provider).then((userCred) => {
			if (userCred) { 
				setAuth(true);
				window.localStorage.setItem('auth', 'true');
			} 
		});
  };
  useEffect(() => {
		firebaseAuth.onAuthStateChanged((userCred) => {
			if (userCred) {
				userCred.getIdToken().then((token) => {
					window.localStorage.setItem('auth', 'true');
					validateUser(token).then((data) => {
						setUser(data.user);
					});
				});
			} else {
				setAuth(false);
				window.localStorage.setItem('auth', 'false');
			}
		});
  }, []);
	return (
		<div className="App">
			{auth ? (
				<div>
					<h1>App </h1>
					<h1>{user?.name}</h1>
					<h1>{user?.email}</h1>
					<img src={user?.image_url} alt="user profile pic" />
				</div>
			) : (
				<button onClick={loginWithGoogle}>Login</button>
			)}
		</div>
	);
}

export default App;
