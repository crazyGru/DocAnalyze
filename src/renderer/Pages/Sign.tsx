import { FunctionComponent, useState, useContext } from 'react';
import { AppContext } from '../App';
import { createNotification } from '../Components/notificationHelper';
import { ActiveButton } from '../Components/ActiveButton';
import { FaLanguage } from 'react-icons/fa';

interface SignProps {}
const SignIn: FunctionComponent<SignProps> = () => {
  const app = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const postData = async () => {
    setIsLoading(true);
    const url = 'http://baba211ss.hopto.org:22384/auth/login';
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin, cors
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem('auth-token', result.Authorization);
      setIsLoading(false);
      createNotification('success', '', 'Sign-In success');
      app?.updateApp(app.showMenu, app.currentPage);
    } catch (error) {
      setIsLoading(false);
      createNotification('danger', '', 'Sign-In failed');
      console.error('There was an error!', error);
    }
  };
  return (
    <div className="rounded w-full flex flex-col justify-center items-center">
      <div className="rounded w-[500px] space-y-6 flex flex-col items-center">
        <input
          className="rounded rounded shadow appearance-none focus:border-b-[1px] w-full py-2 px-4 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />
        <input
          className="rounded rounded shadow appearance-none focus:border-b-[1px] w-full py-2 px-4 text-gray-700 dark:text-white dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500"
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        />
        <ActiveButton
          isEnabled={true}
          isLoading={isLoading}
          text="Sign In"
          onClick={postData}
          size="large"
        />
      </div>
    </div>
  );
};

export default function SignPage() {
  return (
    <div className="rounded w-full h-full flex flex-col items-center justify-center space-y-4">
      <div className="rounded rounded w-[600px] h-[400px] bg-[#ffffff0d] flex items-center flex-col justify-center space-y-6">
        <div className="rounded flex items-center flex-col">
          <FaLanguage size={80} />
          <div className="rounded text-4xl font-bold">Welcome to Troyz</div>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
