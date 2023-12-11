import { FunctionComponent, useState, useContext } from 'react';
import { AppContext } from '../App';
interface SignProps {
  setIsSignIn: (newState: boolean) => void;
}
const SignIn: FunctionComponent<SignProps> = ({ setIsSignIn }) => {
    const app = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const postData = async () => {
        const url = 'http://172.104.33.232:8000/auth/login';
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
          app?.updateApp(app.showMenu, app.currentPage);
        } catch (error) {
          console.error('There was an error!', error);
        }
      };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#131420]">
      <div className="w-1/4 space-y-4 flex flex-col items-center">
        <input
          className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          id="email"
          type="email"
          value = {email}
          onChange={(event)=>{setEmail(event.target.value)}}
          placeholder="Email"
        />
        <input
          className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          id="password"
          type="password"
          value = {password}
          onChange={(event)=>{setPassword(event.target.value)}}
          placeholder="Password"
        />
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold  "
          type="button"
          onClick={postData}
        >
          Sign In
        </button>
        <br />
        <div
          className="font-light font-sans hover:underline hover:cursor-pointer"
          onClick={() => {setIsSignIn(false)}}
        >
          Don't you have an account?{' '}
        </div>
      </div>
    </div>
  );
};
const SignUp: FunctionComponent<SignProps> = ({ setIsSignIn }) => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
  const postData = async () => {
    const url = 'http://172.104.33.232:8000/user';
    const data = {
      email: email,
      username: user,
      password: password
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
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#131420]">
      <div className="w-1/4 space-y-4 flex flex-col items-center">
        <input
          className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          id="user"
          type="user"
          value = {user}
          onChange={(event)=>{setUser(event.target.value)}}
          placeholder="Username"
        />
        <input
          className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          id="email"
          type="email"
          value = {email}
          onChange={(event)=>{setEmail(event.target.value)}}
          placeholder="Email"
        />
        <input
          className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-500"
          id="password"
          type="password"
          value = {password}
          onChange={(event)=>{setPassword(event.target.value)}}
          placeholder="Password"
        />
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold  "
          type="button"
          onClick={postData}
        >
          Sign Up
        </button>
        <br />
        <div
          className="font-light font-sans hover:underline hover:cursor-pointer"
          onClick={() => {
            setIsSignIn(true);
          }}
        >
          Already have an account?
        </div>
      </div>
    </div>
  );
};
export default function SignPage() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <div className="w-full h-full">
      <div className="w-full h-1/2 flex items-end justify-center p-5">
        <svg
          width="79"
          height="20"
          viewBox="0 0 79 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0312 0.25V1.89062H10.1562V16H8.1875V1.89062H0.3125V0.25H18.0312ZM30.8281 8.03271C30.8281 7.54053 30.7905 7.13379 30.7153 6.8125C30.647 6.48438 30.4795 6.22461 30.2129 6.0332C29.9463 5.83496 29.5498 5.69824 29.0234 5.62305C28.5039 5.54102 27.793 5.5 26.8906 5.5C26.0088 5.5 25.291 5.57861 24.7373 5.73584C24.1836 5.88623 23.7495 6.10156 23.4351 6.38184C23.1206 6.66211 22.9053 6.99707 22.7891 7.38672C22.6797 7.77637 22.625 8.21045 22.625 8.68896V16H20.6562V4.1875H22.625V6.06396C22.6934 5.85205 22.8198 5.61963 23.0044 5.3667C23.189 5.10693 23.4692 4.86768 23.8452 4.64893C24.2212 4.42334 24.7065 4.23535 25.3013 4.08496C25.9028 3.93457 26.6514 3.85938 27.5469 3.85938C28.5723 3.85938 29.4062 3.95166 30.0488 4.13623C30.6914 4.31396 31.1904 4.58057 31.5459 4.93604C31.9082 5.28467 32.1509 5.71875 32.2739 6.23828C32.4038 6.75781 32.4688 7.35596 32.4688 8.03271H30.8281ZM33.4531 10.0117C33.4531 8.80176 33.583 7.80029 33.8428 7.00732C34.1025 6.21436 34.5195 5.58545 35.0938 5.12061C35.668 4.65576 36.4131 4.33105 37.3291 4.14648C38.2451 3.95508 39.3594 3.85938 40.6719 3.85938C41.9844 3.85938 43.0986 3.95508 44.0146 4.14648C44.9307 4.33105 45.6758 4.65576 46.25 5.12061C46.8242 5.58545 47.2412 6.21436 47.501 7.00732C47.7607 7.80029 47.8906 8.80176 47.8906 10.0117C47.8906 11.2217 47.7607 12.2266 47.501 13.0264C47.2412 13.8262 46.8242 14.4619 46.25 14.9336C45.6758 15.4053 44.9307 15.7402 44.0146 15.9385C43.0986 16.1299 41.9844 16.2256 40.6719 16.2256C39.3594 16.2256 38.2451 16.1299 37.3291 15.9385C36.4131 15.7402 35.668 15.4053 35.0938 14.9336C34.5195 14.4619 34.1025 13.8262 33.8428 13.0264C33.583 12.2266 33.4531 11.2217 33.4531 10.0117ZM35.4219 10.0117C35.4219 10.668 35.4458 11.2388 35.4937 11.7241C35.5415 12.2095 35.6304 12.6265 35.7603 12.9751C35.897 13.3237 36.085 13.6074 36.3242 13.8262C36.5635 14.0449 36.8779 14.2192 37.2676 14.3491C37.6572 14.479 38.1289 14.5679 38.6826 14.6157C39.2432 14.6636 39.9062 14.6875 40.6719 14.6875C41.3281 14.6875 41.9126 14.6738 42.4253 14.6465C42.9448 14.6123 43.396 14.5405 43.7788 14.4312C44.1685 14.3218 44.5 14.168 44.7734 13.9697C45.0469 13.7646 45.2656 13.4878 45.4297 13.1392C45.6006 12.7905 45.7236 12.3633 45.7988 11.8574C45.8809 11.3447 45.9219 10.7295 45.9219 10.0117C45.9219 9.30762 45.8809 8.70947 45.7988 8.21729C45.7236 7.71826 45.6006 7.30127 45.4297 6.96631C45.2656 6.63135 45.0469 6.36816 44.7734 6.17676C44.5 5.97852 44.1685 5.83154 43.7788 5.73584C43.396 5.6333 42.9448 5.56836 42.4253 5.54102C41.9126 5.51367 41.3281 5.5 40.6719 5.5C40.0156 5.5 39.4277 5.51367 38.9082 5.54102C38.3955 5.56836 37.9443 5.6333 37.5547 5.73584C37.1719 5.83154 36.8438 5.97852 36.5703 6.17676C36.2969 6.36816 36.0747 6.63135 35.9038 6.96631C35.7397 7.30127 35.6167 7.71826 35.5347 8.21729C35.4595 8.70947 35.4219 9.30762 35.4219 10.0117ZM55.1094 16L48.875 4.1875H51.1719L56.4219 14.6875L61.3438 4.1875H63.6406L57.7344 16L57.4062 16.6562C57.2422 16.9844 57.0781 17.292 56.9141 17.5791C56.7568 17.873 56.5757 18.1396 56.3706 18.3789C56.1655 18.625 55.9229 18.8438 55.6426 19.0352C55.3623 19.2266 55.0171 19.3872 54.6069 19.5171C54.2036 19.6538 53.7217 19.7563 53.1611 19.8247C52.6006 19.8999 51.9375 19.9375 51.1719 19.9375V18.2969C51.8281 18.2969 52.3818 18.2695 52.833 18.2148C53.2842 18.167 53.6602 18.0918 53.9609 17.9893C54.2686 17.8936 54.5146 17.7773 54.6992 17.6406C54.8838 17.5039 55.0376 17.3501 55.1606 17.1792C55.2837 17.0083 55.3862 16.8237 55.4683 16.6255C55.5571 16.4272 55.6562 16.2188 55.7656 16H55.1094ZM66.2656 4.1875H78.0781V5.82812L68.2139 14.5337H78.0781V16H65.6094V14.3594L75.6172 5.6333H66.2656V4.1875Z"
            fill="white"
          />
        </svg>
      </div>
      <div>
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
}
