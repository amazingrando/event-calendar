import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../supabaseClient';

export const AuthContext = createContext(false);

const Auth = ({ children }) => {
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSessionInfo(session);
        }
      }
    }

    getInitialSession();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSessionInfo(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={sessionInfo}>{children}</AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.any,
};

export default Auth;
