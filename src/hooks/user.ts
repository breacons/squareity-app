import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import { User } from '@/interfaces/user';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

export const useProfile = (): User => {
  const [user, setUser] = useState<User>({ email: '' });

  useEffect(() => {
    const fetch = async () => {
      const { attributes } = await Auth.currentAuthenticatedUser({ bypassCache: false });
      setUser({
        id: attributes.sub,
        email: attributes.email,
        firstName: attributes.given_name,
        lastName: attributes.family_name,
      });
    };

    fetch();
  }, []);

  return user;
};
